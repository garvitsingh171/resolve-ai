# Interview Guide

## 30-second explanation

ResolveAI is a small full-stack RAG support system. A user issue is embedded with Gemini, matched against a Supabase pgvector knowledge base, then Gemini generates a Zod-validated resolution from the retrieved context. The UI shows the actual source documents, so it is more auditable than a plain chatbot.

## Key answers

- **What is RAG?** Retrieve relevant external knowledge, add it to a generation prompt, then answer with that context.
- **Why embeddings/vector search?** They match semantic meaning, so “charged but order failed” can find a payment-deduction article without exact wording.
- **Why 768 dimensions?** The configured Gemini embedding output and existing `vector(768)` schema must agree.
- **Cosine similarity/top-K/threshold?** Cosine compares vector direction; top-K returns the nearest four; threshold filters weak matches. Similarity is not model confidence.
- **Why PostgreSQL + pgvector/Supabase?** One managed database stores content and vectors, and the RPC performs real retrieval.
- **Why Gemini/direct SDK?** Gemini provides managed embedding and generation; direct calls make the narrow flow easier to review than LangChain.
- **Complete flow?** Validate issue → query embedding → `match_documents` → delimited prompt → structured JSON → Zod parse → render resolution and real sources.
- **How does it reduce hallucinations?** Context instructions, source attribution, thresholding, and escalation reduce unsupported answers; they cannot eliminate hallucinations.
- **What if retrieval is irrelevant?** Weak documents are filtered; empty/insufficient context asks Gemini to escalate. Production would add evaluation and reranking.
- **How to scale?** Chunk and version documents, add tenant filters, HNSW/IVFFlat indexes, caching, async ingestion, rate limits, observability, and retrieval benchmarks.
- **Why no chunking now?** Each curated support article is compact enough for the demo; long documents should be chunked.
- **Secrets?** They are server-only env variables. A leaked Supabase service key must be revoked/rotated immediately.
- **Why structured output and Zod?** Stable UI fields and a hard boundary against malformed model output.
- **Another week?** Add auth/tenancy, ingestion, feedback/evals, security controls, and latency/cost telemetry.

## Cross-questions

Be ready to explain the threshold choice (start conservative, tune against labeled queries), why query/document embedding task types differ, stale/poisoned-document risk, how tenant filters would be enforced in the RPC, and how you would test retrieval independently of the LLM.

## Do not claim

Do not say you trained the model, RAG eliminates hallucination, vector similarity is confidence, pgvector is model training, or this small MVP is production-scale.
