# Testing Strategy

## Performed

`npm run lint` passed. `npm run build` passed. The production build validates TypeScript, routes, and client/server module boundaries. Seeding and live Gemini/Supabase retrieval were not run here because they mutate/use the configured external services.

## Manual checks after `npm run seed`

| Issue | Expected retrieval |
|---|---|
| Password reset but cannot login | Authentication/password reset |
| Payment failed but money deducted | payment deduction/order failure |
| API token returns 401 | Developer API authentication |
| Cancel subscription | Billing/subscription |
| Unrelated question | few/no useful results and escalation |

Recommended next tests: unit-test schemas/context construction; integration-test the RPC with known vectors; mock Gemini success, empty, and malformed JSON; browser-test examples, keyboard focus, loading, API errors, and source rendering; maintain a labeled retrieval test set and measure top-K relevance; test adversarial user prompts that ask to ignore instructions or invent policy.
