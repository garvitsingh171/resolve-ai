import { getServerEnvironment } from "@/lib/env";
import { getGeminiClient } from "@/lib/gemini";
const VECTOR_DIMENSIONS = 768;
/** Creates a vector compatible with the documents.embedding vector(768) column. */
export async function generateEmbedding(text: string, taskType = "RETRIEVAL_QUERY", title?: string): Promise<number[]> {
  const response = await getGeminiClient().models.embedContent({ model: getServerEnvironment().GEMINI_EMBEDDING_MODEL, contents: text, config: { taskType, outputDimensionality: VECTOR_DIMENSIONS, ...(title ? { title } : {}) } });
  const values = response.embeddings?.[0]?.values;
  if (!values || values.length !== VECTOR_DIMENSIONS) throw new Error(`Gemini returned an invalid embedding (expected ${VECTOR_DIMENSIONS} dimensions).`);
  return values;
}
