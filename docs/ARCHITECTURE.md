# Architecture

ResolveAI uses a single Next.js application: React renders the workspace and an App Router Route Handler is the server trust boundary. Browser code never calls Gemini or Supabase directly.

Gemini produces semantic embeddings and structured generation. pgvector compares the 768-dimensional query vector against stored document vectors. Retrieved content—not model-provided citations—is added to a delimited prompt and source metadata is returned independently. This is RAG: it makes relevant knowledge available at answer time, reducing unsupported generation without guaranteeing truthfulness.

PostgreSQL + pgvector keeps knowledge and vector search in one managed system. Direct SDK calls make the exact path visible: one embedding, one RPC, one generation. A small retry helper handles only temporary Gemini generation capacity failures (maximum two retries with 1s/2s backoff) and otherwise avoids retrying requests that cannot recover. No microservices, framework orchestration, authentication, or ANN index are necessary for this 12-document MVP.
