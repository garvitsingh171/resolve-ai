# Interview Guide

## 30-second explanation

ResolveAI is a full-stack RAG support system. It embeds a support issue with Gemini, uses pgvector in Supabase PostgreSQL to retrieve up to four relevant documents, then gives that evidence to Gemini to create a Zod-validated resolution. It returns actual retrieval sources separately, so it is more than a chatbot wrapper.

## Questions and concise answers

1. **What is ResolveAI?** A support-issue resolver that grounds Gemini responses in retrieved support knowledge.
2. **What business problem does it solve?** Generic LLM answers may miss company procedures; this makes relevant procedures available at answer time.
3. **Why is this RAG?** It retrieves external documents before generation and adds them to the prompt.
4. **How is it different from a chatbot wrapper?** It has embedding, vector retrieval, context augmentation, and retrieval-derived source attribution.
5. **What is an embedding?** A numeric representation of text meaning that can be compared semantically.
6. **Why 768 dimensions?** The configured Gemini output and `extensions.vector(768)` database column must have the same size.
7. **`RETRIEVAL_QUERY` vs `RETRIEVAL_DOCUMENT`?** Query represents search intent; document represents content being indexed for search.
8. **What does pgvector do?** It stores vectors in PostgreSQL and supplies vector-distance operators.
9. **What is cosine distance?** A measure of angle/direction difference between vectors; lower is closer.
10. **How does it become similarity?** The RPC returns `1 - (embedding <=> query_embedding)`.
11. **What does `match_threshold` do?** It filters weak results; the app passes `0.55`.
12. **Why top four documents?** It offers multiple relevant procedures while keeping the generation context compact; it is an MVP setting to evaluate.
13. **Why PostgreSQL rather than a standalone vector DB?** One managed system handles structured documents and retrieval for this small project.
14. **Why Supabase?** It provides managed PostgreSQL and a direct client/RPC path without another data layer.
15. **Why Gemini?** It supplies managed embedding and structured generation without operating local ML infrastructure.
16. **Why direct SDK instead of LangChain?** The one-embedding/one-RPC/one-generation path stays explicit and easy to inspect.
17. **Full request lifecycle?** Validate issue → embed query → `match_documents(.55, 4)` → prompt with delimited context → generation → Zod parse → resolution plus sources.
18. **Why return source attribution outside the LLM?** The server maps it from the actual RPC response, so the model cannot invent citations.
19. **How do you reduce hallucinations?** Grounded context, prompt boundaries, source visibility, thresholds, and escalation reduce unsupported output.
20. **Why can RAG still hallucinate?** Retrieval may be weak or stale, context may omit facts, and a model can still make unsupported statements.
21. **What happens with irrelevant retrieval?** Thresholding filters weak results; the prompt asks for escalation if context is insufficient. Evaluation/reranking are future work.
22. **Why escalate?** It is safer to surface insufficient evidence than invent a support procedure.
23. **How does Zod help?** It validates untrusted request data and model JSON before the UI uses either.
24. **What happens when Gemini returns 503?** Generation retries after one then two seconds for transient capacity signals; exhaustion returns a user-safe `503`.
25. **Why exponential backoff?** It gives a temporarily overloaded provider time to recover while bounding added wait.
26. **Why not retry every failure?** Authentication, permissions, invalid model config, malformed input, and ordinary permanent 4xx errors cannot be fixed by waiting.
27. **How would you scale to one million documents?** Chunk/version content, add tenant filters, measure retrieval, use ANN indexing, rate limits, caching, and observability.
28. **HNSW versus exact search?** Exact search is simple for 12 records; HNSW is an approximate graph index that trades resources/build time for large-scale query speed.
29. **How would chunking work?** Split long documents into meaningful, metadata-linked chunks; embed and retrieve chunks rather than whole files.
30. **How would multi-tenancy work?** Add tenant identifiers and enforce them in data access and the retrieval RPC, alongside authorization.
31. **How would authentication be added?** Add an identity provider, protect the route, map identity to tenant/role, and enforce database policy.
32. **How would retrieval quality be measured?** Maintain labeled query-to-document cases, inspect top-K relevance/recall, use human review, and test adversarial queries.
33. **What would improve with one more week?** Ingestion, chunking, evaluation, auth, rate limiting, observability, and feedback.
34. **What trade-offs were conscious?** Small, inspectable RAG scope over feature breadth; direct SDKs over orchestration; exact search over premature indexing.
35. **What did you learn?** Retrieval quality, source attribution, validation, and failure boundaries are as important as the generation call.

## Things I Must Not Claim

- I trained Gemini or built an ML model from scratch.
- RAG eliminates hallucinations.
- Semantic similarity is model confidence.
- This is an AI agent.
- This is production-scale or currently supports millions of documents.
- The system has measured accuracy without evaluation data.
