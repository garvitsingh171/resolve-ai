# Architecture Decisions

## ADR-001 — Next.js full-stack application
**Context:** one small UI/API product. **Decision:** use App Router and a Route Handler. **Alternatives:** separate API service. **Why:** fewer deployments and a clear server boundary. **Trade-off:** API and UI scale together initially.

## ADR-002 — Gemini API, not local models
**Context:** deadline-conscious MVP. **Decision:** use `@google/genai` for embedding and generation. **Alternatives:** self-hosted models. **Why:** high capability without ML infrastructure. **Trade-off:** API cost, latency, and provider availability.

## ADR-003 — PostgreSQL + pgvector at 768 dimensions
**Context:** existing `documents` schema. **Decision:** generate 768-dimensional vectors compatible with `vector(768)`. **Alternatives:** a separate vector DB. **Why:** one data system and real SQL RPC search. **Trade-off:** index tuning is needed as corpus size grows.

## ADR-004 — Direct SDKs, not LangChain
**Decision:** explicitly compose embedding, RPC, and generation. **Why:** no hidden chains, easy interview explanation. **Trade-off:** future orchestration features must be written directly.

## ADR-005 — Sources outside model output
**Decision:** map source metadata from retrieval, not Gemini. **Why:** prevents invented citations. **Trade-off:** source summaries are not model-authored.

## ADR-006 — Server-only secrets and no authentication
**Decision:** use service credentials only in server modules; defer user identity. **Why:** a focused MVP. **Consequence:** do not expose it publicly without rate limiting and authorization.
