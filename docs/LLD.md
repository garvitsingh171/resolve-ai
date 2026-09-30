# Low-Level Design

| Module | Actual responsibility |
|---|---|
| `lib/env.ts` | Lazily Zod-validates required server variables. |
| `lib/gemini.ts` | Reuses one `GoogleGenAI` client. |
| `lib/embeddings.ts` | Creates and validates 768-dimensional query/document embeddings. |
| `lib/gemini-retry.ts` | Retries only transient Gemini generation errors twice, with 1s/2s delay. |
| `lib/supabase-server.ts` | Reuses the privileged server Supabase client with no session persistence. |
| `lib/retrieval.ts` | Creates one query vector and calls `match_documents` with `0.55`, `4`. |
| `lib/schemas.ts` | Validates input and generated resolution fields. |
| `app/api/resolve/route.ts` | Coordinates RAG, response mapping, and safe HTTP errors. |
| `scripts/seed.ts` | Loads environment, replaces known demo titles, and embeds/inserts 12 records. |

```mermaid
sequenceDiagram
  participant C as Client
  participant R as Route
  participant G as Gemini
  participant D as Supabase
  C->>R: POST {issue}
  R->>R: Zod parse
  R->>G: RETRIEVAL_QUERY embedding
  R->>D: match_documents(vector, .55, 4)
  D-->>R: documents + similarity
  R->>G: generation with delimited context
  alt transient generation capacity error
    R->>G: retry after 1s, then 2s
    R-->>C: 503 if still unavailable
  end
  G-->>R: JSON resolution
  R->>R: Zod parse and map retrieved sources
  R-->>C: resolution + sources
```

Retries do not wrap request parsing, embedding, retrieval, output parsing, authentication, permission, or normal permanent 4xx failures. Sources are mapped from retrieval to stop the model from inventing citations.
