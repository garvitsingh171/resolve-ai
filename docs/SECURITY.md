# Security

`GEMINI_API_KEY` and `SUPABASE_SECRET_KEY` are read only inside server modules and must never use a `NEXT_PUBLIC_` prefix. `.env.local` remains ignored. The client sends an issue to a same-origin route and receives only a resolution plus retrieval metadata.

Zod limits and trims input. The generation prompt treats user input as untrusted and separates it from knowledge context; this reduces but cannot eliminate prompt injection. Retrieved docs are also treated as reference material, so a poisoned knowledge base remains a risk. Generated JSON is parsed with Zod before use. Server logs record only safe error messages, not keys or raw secrets.

Production improvements: authentication and tenant-scoped retrieval, rate limiting, audit logs with redaction, content moderation, document review/versioning, least-privilege DB credentials, secret rotation, CSP, monitoring, and an incident process for a leaked service key. This MVP is not presented as perfectly secure.
