# Database Design

Run [supabase/schema.sql](../supabase/schema.sql) to create the reproducible database layer.

| Column | Type | Use |
|---|---|---|
| `id` | `bigint` identity primary key | source identifier |
| `title` | `text` | visible source title |
| `category` | `text` | support grouping |
| `content` | `text` | RAG context |
| `embedding` | `extensions.vector(768)` | semantic-search representation |
| `created_at` | `timestamptz` | creation time |

`public.match_documents(query_embedding extensions.vector(768), match_threshold double precision, match_count integer)` returns documents and `similarity`. It calculates `1 - (embedding <=> query_embedding)`, filters at the supplied threshold, orders by cosine distance (closest first), and limits by top-K. The app supplies a threshold of `0.55` and count of `4`; it does not manufacture scores.

Exact search is appropriate for 12 seeded records. At scale, evaluate HNSW or IVFFlat with the cosine operator class, metadata filters, chunking, and labeled retrieval evaluation. The seed script deletes only matching known demo titles, then inserts freshly embedded replacements. Service credentials stay server-only; production needs least-privilege access and tenant-aware policy design.
