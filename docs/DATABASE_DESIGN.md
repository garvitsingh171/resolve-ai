# Database Design

ResolveAI uses the existing `public.documents` table:

| Column | Type | Use |
|---|---|---|
| `id` | `bigint` | primary key/source identifier |
| `title` | `text` | visible source title |
| `category` | `text` | support grouping |
| `content` | `text` | retrieval and RAG context |
| `embedding` | `vector(768)` | semantic-search representation |
| `created_at` | `timestamptz` | record creation time |

The API calls `match_documents(query_embedding vector(768), match_threshold double precision, match_count integer)`. This project assumes it uses pgvector cosine similarity/distance and returns `id`, `title`, `category`, `content`, and `similarity`. The TypeScript code never calculates or invents similarity.

For the tiny seeded corpus, exact search is adequate. At scale, evaluate an HNSW or IVFFlat index with an appropriate cosine operator class, plus metadata filters and retrieval evaluation. The seed script deletes only rows matching its known demo titles before re-inserting; it does not assume ownership of all documents. The Supabase secret key is server-only; production should use least-privilege database roles and RLS where user access exists.
