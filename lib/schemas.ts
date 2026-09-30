import { z } from "zod";
export const resolveRequestSchema = z.object({ issue: z.string().trim().min(10, "Please describe the issue in at least 10 characters.").max(2000, "Please keep the issue under 2,000 characters.") });
export const resolutionSchema = z.object({ category: z.string().trim().min(1), priority: z.enum(["Low", "Medium", "High", "Critical"]), summary: z.string().trim().min(1), probableCause: z.string().trim().min(1), resolutionSteps: z.array(z.string().trim().min(1)).min(1).max(8), explanation: z.string().trim().min(1), needsEscalation: z.boolean() });
export type Resolution = z.infer<typeof resolutionSchema>;
