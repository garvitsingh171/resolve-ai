# High-Level Design

```mermaid
flowchart TD
  B[Browser client] -->|POST issue| N[Next.js Route Handler]
  N -->|RETRIEVAL_QUERY embedding| E[Gemini Embedding API]
  E -->|768-dimensional vector| N
  N -->|match_documents(.55, 4)| P[(Supabase PostgreSQL + pgvector)]
  P -->|documents + similarity| N
  N -->|issue + delimited context| G[Gemini generation]
  G -->|structured JSON| N
  N -->|Zod-validated resolution + sources| B
```

The browser only calls `/api/resolve`; Gemini and Supabase credentials remain in server modules. The handler validates input, embeds once, performs one vector-search RPC, constructs retrieval context, generates once, parses output, and returns source metadata separately. It returns `400` for invalid input, `503` when generation remains transiently unavailable after two bounded retries, and a generic `500` for other server dependencies.

For the 12-record corpus, exact cosine-distance search is sufficient. Scaling requires filtering, chunking, observability, rate limiting, retrieval evaluation, and an ANN pgvector index. Trust boundaries include untrusted browser text, the Supabase knowledge base, Gemini APIs, and server-only credentials.
