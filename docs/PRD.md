# Product Requirements Document

ResolveAI is a portfolio MVP for producing source-visible support resolutions from retrieved knowledge, rather than generic answers. Its users are support and developer-support practitioners handling authentication, payments, billing, security, and API issues.

The core flow is: describe issue → validate → embed → retrieve up to four relevant documents → generate from delimited context → validate structured response → show resolution and sources. Goals are genuine RAG, clear engineering boundaries, reliable user-facing errors, and a usable responsive interface.

Functional requirements: 10–2,000 character issue validation; 768-dimensional embeddings; pgvector retrieval at threshold `0.55`/top-K `4`; structured Gemini output; retrieval-only source attribution; escalation for insufficient context; server-only secrets; and a user-safe `503` after exhausted transient generation retries. Non-goals: authentication, uploads, agents, chat history, analytics, streaming, and accuracy claims.

The project is constrained to a 12-document seeded corpus and existing Supabase infrastructure. Future work includes ingestion/chunking, evaluation, auth and tenancy, feedback, and scaling retrieval.
