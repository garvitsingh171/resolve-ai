import { generateEmbedding } from "@/lib/embeddings";
import { getSupabaseServerClient } from "@/lib/supabase-server";
export type RetrievedDocument = { id: number; title: string; category: string; content: string; similarity: number };
export async function retrieveRelevantDocuments(issue: string): Promise<RetrievedDocument[]> {
  const embedding = await generateEmbedding(issue);
  const { data, error } = await getSupabaseServerClient().rpc("match_documents", { query_embedding: embedding, match_threshold: 0.55, match_count: 4 });
  if (error) throw new Error(`Knowledge base search failed: ${error.message}`);
  return (data ?? []) as RetrievedDocument[];
}
