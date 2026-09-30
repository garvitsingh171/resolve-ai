# Architecture Decisions

## ADR-001 — Next.js full-stack application
**Context:** one focused UI/API product. **Decision:** App Router and Route Handler. **Alternative:** separate backend. **Why:** clear server boundary with fewer deployments. **Trade-off:** UI/API release together initially.

## ADR-002 — Gemini API, not local models
**Decision:** use `@google/genai` for embedding and generation. **Why:** managed capability without ML operations. **Trade-off:** API availability, cost, and latency.

## ADR-003 — Supabase PostgreSQL + pgvector at 768 dimensions
**Decision:** store `extensions.vector(768)` and query via an RPC. **Why:** one managed data system and real cosine retrieval. **Trade-off:** ANN indexing and tuning come later.

## ADR-004 — Direct SDKs, not LangChain
**Decision:** explicitly compose embedding, RPC, and generation. **Why:** the narrow RAG flow is easy to inspect and explain. **Trade-off:** future orchestration stays custom.

## ADR-005 — Retrieval-derived sources
**Decision:** sources are mapped from RPC results, outside model JSON. **Why:** avoids fabricated citations. **Trade-off:** the model does not summarize source metadata.

## ADR-006 — Server-only secrets; no user identity in MVP
**Decision:** use server environment variables and defer authentication. **Why:** focused scope. **Trade-off:** a public production deployment needs authorization and rate limiting.

## ADR-007 — Bounded retry for transient generation failures
**Decision:** retry generation only twice after 1s and 2s for 429/503/capacity signals; return `503` when exhausted. **Why:** temporary overload can recover without masking permanent errors. **Trade-off:** an affected request waits up to three seconds longer.
