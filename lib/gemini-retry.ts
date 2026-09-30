const MAX_RETRIES = 2;
const RETRY_DELAYS_MS = [1_000, 2_000];

type ErrorDetails = { status?: unknown; code?: unknown; message?: unknown };

function getErrorDetails(error: unknown): ErrorDetails {
  return typeof error === "object" && error !== null ? error as ErrorDetails : {};
}

/** Restricts retries to Gemini capacity failures, not configuration or request errors. */
export function isTransientGeminiError(error: unknown): boolean {
  const { status, code, message } = getErrorDetails(error);
  const statusCode = Number(status ?? code);
  if (statusCode === 429 || statusCode === 503) return true;

  const diagnostic = `${status ?? ""} ${code ?? ""} ${message ?? ""}`.toLowerCase();
  return diagnostic.includes("resource_exhausted") || diagnostic.includes("unavailable") || diagnostic.includes("overloaded") || diagnostic.includes("high demand") || diagnostic.includes("temporarily unavailable");
}

export async function withGeminiGenerationRetry<T>(operation: () => Promise<T>): Promise<T> {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      if (!isTransientGeminiError(error) || attempt === MAX_RETRIES) throw error;
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAYS_MS[attempt]));
    }
  }
  throw new Error("Unreachable Gemini retry state.");
}
