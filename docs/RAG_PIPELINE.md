# RAG Pipeline

RAG (retrieval-augmented generation) gives a model relevant external knowledge at answer time. ResolveAI uses it to ground support guidance in a curated knowledge base; it reduces unsupported responses but cannot eliminate hallucinations.

## Ingestion

`data/knowledge-base.ts` contains 12 support articles. `npm run seed` deletes only those known titles, creates a Gemini **RETRIEVAL_DOCUMENT** embedding for each, and stores it in `public.documents.embedding`. Embeddings are 768-number semantic representations, matching `extensions.vector(768)`.

## Retrieval

For a user issue, `generateEmbedding` creates one **RETRIEVAL_QUERY** vector. `match_documents` uses cosine distance (`embedding <=> query_embedding`), calculates similarity as `1 - distance`, filters at `0.55`, orders nearest first, and returns at most 4 documents. The database returns similarity; application code does not invent it.

## Generation and attribution

The route places untrusted `[USER ISSUE]` and reference-only `[RETRIEVED KNOWLEDGE BASE]` in separate delimiters. Gemini is instructed to rely on the context, avoid invented policy, and escalate when it is insufficient. Its JSON is constrained then parsed with Zod. The response’s source cards are mapped directly from pgvector results, never model-generated.

## Failure and limits

Transient Gemini **generation** capacity errors retry after one and two seconds, then return a user-safe `503`. Retrieval can still be weak because documents may be stale, missing, or semantically misleading; prompt injection and output errors remain risks. Production should add document governance, chunking, evaluation, reranking, and observability.
