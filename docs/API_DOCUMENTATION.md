# API Documentation

## `POST /api/resolve`

Validates a support issue, retrieves relevant knowledge, and returns a structured, source-visible resolution.

```json
{ "issue": "My API token returns 401 Unauthorized." }
```

`issue` is trimmed, required, and limited to 10–2,000 characters. A successful response contains a Zod-validated `resolution` (`category`, `priority`, `summary`, `probableCause`, `resolutionSteps`, `explanation`, `needsEscalation`) and retrieval-derived `sources` (`id`, `title`, `category`, `similarity`). Similarity is from pgvector, not a model-confidence score.

| Status | Meaning |
|---|---|
| `200` | Resolution and source metadata returned |
| `400` | Invalid JSON or issue validation failed |
| `503` | Gemini generation remained temporarily unavailable after up to two retries (1s then 2s) |
| `500` | Server configuration, embedding, Supabase/RPC, permanent Gemini, or malformed model-output failure |

Only transient Gemini **generation** capacity errors (429, 503, `RESOURCE_EXHAUSTED`, `UNAVAILABLE`, overload/high-demand indicators) retry. Invalid requests, credentials, permissions, model configuration, and ordinary permanent 4xx errors do not. Gemini and Supabase access remain server-side.
