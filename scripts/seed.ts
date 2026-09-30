import { loadEnvConfig } from "@next/env";
import { knowledgeBase } from "../data/knowledge-base";

async function seed() {
  loadEnvConfig(process.cwd());
  const [{ generateEmbedding }, { getSupabaseServerClient }] = await Promise.all([import("../lib/embeddings"), import("../lib/supabase-server")]);
  const supabase = getSupabaseServerClient();
  const titles = knowledgeBase.map((document) => document.title);
  const { error: deleteError } = await supabase.from("documents").delete().in("title", titles);
  if (deleteError) throw new Error(`Could not clear existing demo documents: ${deleteError.message}`);

  for (const [index, document] of knowledgeBase.entries()) {
    try {
      console.log(`[${index + 1}/${knowledgeBase.length}] Embedding ${document.title}`);
      const embedding = await generateEmbedding(document.content, "RETRIEVAL_DOCUMENT", document.title);
      const { error } = await supabase.from("documents").insert({ ...document, embedding });
      if (error) throw new Error(error.message);
    } catch (error) {
      throw new Error(`Failed to seed “${document.title}”: ${error instanceof Error ? error.message : "unknown error"}`);
    }
  }
  console.log(`Seeded ${knowledgeBase.length} knowledge-base documents.`);
}

seed().catch((error) => { console.error(error instanceof Error ? error.message : "Seeding failed."); process.exitCode = 1; });
