# Security

`GEMINI_API_KEY` and `SUPABASE_SECRET_KEY` are read only by server modules and must never receive a `NEXT_PUBLIC_` prefix. `.env*` and `.vercel` are ignored. Browser code calls the same-origin API and receives only a resolution plus retrieval metadata.

Zod trims and limits user input. The prompt treats user text as untrusted and labels knowledge context as reference material rather than instructions. This reduces but cannot eliminate prompt injection; a poisoned or stale knowledge base remains a risk. Generated JSON is Zod-validated before rendering. Server logs retain safe error messages only—no keys or raw third-party payloads.

Production improvements: auth and tenant-scoped retrieval, rate limits, audit logs with redaction, document review/versioning, least-privilege DB roles, secret rotation, CSP, monitoring, and incident response. This MVP is not perfectly secure or ready for unauthenticated public traffic without those controls.
