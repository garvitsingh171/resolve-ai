# Trade-offs

Direct Gemini and Supabase SDK calls keep the RAG path explicit—one embedding, one retrieval RPC, one generation—rather than hiding it behind a framework. The cost is writing small helpers ourselves. A single Next.js application simplifies delivery but couples API/UI deployment.

Seeded articles make a controlled demo without building upload/processing infrastructure, but they are not a production ingestion pipeline. Exact pgvector search is right for 12 documents; HNSW/IVFFlat, filters, chunking, and evaluation matter at larger scale. Authentication, caching, streaming, and queues are intentionally deferred.

Generation retry is deliberately narrow: up to two retries may recover temporary provider overload, but adds up to three seconds and must not hide invalid configuration, permission, or ordinary client errors. Every request pays embedding plus generation cost/latency; context trimming, caching, and batching are later optimizations to validate with measurements.
