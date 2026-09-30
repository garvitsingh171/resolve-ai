# Architecture

ResolveAI uses Next.js because the App Router gives a responsive React UI and a same-repository backend boundary. Browser code never imports Gemini or Supabase clients. The route handler runs server-side, so credentials are not bundled into client JavaScript.

Gemini provides both semantic embeddings and generation. Embeddings map related language into nearby vectors; PostgreSQL with pgvector compares the 768-dimensional query vector with stored document vectors. RAG means the model receives retrieved evidence before answering, rather than relying only on model parameters. The response includes those retrieved records separately for verification.

PostgreSQL + pgvector keeps structured support content and vector search in one managed database. Direct SDKs are clearer than LangChain for this narrow pipeline: one embedding, one RPC, one generation. One Next.js application avoids premature microservice coordination. Authentication is omitted because this is a single-user portfolio MVP; a production deployment would add identity, authorization, rate limits, and tenant filtering.
