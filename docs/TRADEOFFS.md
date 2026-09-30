# Trade-offs

Direct SDK calls make the one-embedding/one-retrieval/one-generation path transparent, at the cost of not gaining a framework's chain abstractions. Seeded articles make a dependable demo quickly, but are not a document-upload pipeline. One Next.js app avoids backend deployment complexity but couples UI/API release cadence.

Exact pgvector search is reasonable for 12 records. At large volume, investigate HNSW/IVFFlat, chunking, metadata filters, evaluation, and caching. Authentication, streaming, and caching are deferred deliberately. Each request pays both embedding and generation latency/cost; caching repeated embeddings, trimming context, batching ingestion, and streaming output are potential later optimizations.
