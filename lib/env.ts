import { z } from "zod";

const serverEnvironmentSchema = z.object({
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required."),
  GEMINI_MODEL: z.string().min(1, "GEMINI_MODEL is required."),
  GEMINI_EMBEDDING_MODEL: z.string().min(1, "GEMINI_EMBEDDING_MODEL is required."),
  SUPABASE_URL: z.string().url("SUPABASE_URL must be a valid URL."),
  SUPABASE_SECRET_KEY: z.string().min(1, "SUPABASE_SECRET_KEY is required."),
});
export type ServerEnvironment = z.infer<typeof serverEnvironmentSchema>;
/** Validated on server integration use, rather than while building static UI. */
export function getServerEnvironment(): ServerEnvironment {
  const result = serverEnvironmentSchema.safeParse({ GEMINI_API_KEY: process.env.GEMINI_API_KEY, GEMINI_MODEL: process.env.GEMINI_MODEL, GEMINI_EMBEDDING_MODEL: process.env.GEMINI_EMBEDDING_MODEL, SUPABASE_URL: process.env.SUPABASE_URL, SUPABASE_SECRET_KEY: process.env.SUPABASE_SECRET_KEY });
  if (!result.success) throw new Error(`Server environment configuration error: ${result.error.issues.map((issue) => issue.message).join(" ")}`);
  return result.data;
}
