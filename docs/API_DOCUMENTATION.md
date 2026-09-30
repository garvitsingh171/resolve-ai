# API Documentation

## `POST /api/resolve`

Generates a grounded support resolution.

```json
{ "issue": "My API token returns 401 Unauthorized." }
```

`issue` is trimmed, required, 10–2,000 characters. A success response contains:

```json
{
  "resolution": { "category": "Developer API", "priority": "Medium", "summary": "...", "probableCause": "...", "resolutionSteps": ["..."], "explanation": "...", "needsEscalation": false },
  "sources": [{ "id": 9, "title": "API token and HTTP 401 Unauthorized", "category": "Developer API", "similarity": 0.82 }]
}
```

The score example is illustrative; actual scores come from pgvector. `400` means malformed JSON or invalid issue. `500` covers unavailable configuration, Gemini, embeddings, database/RPC, or invalid model JSON; it returns a generic user-safe message. The route validates input and output and accesses Gemini/Supabase only on the server.
