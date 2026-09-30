# Testing Strategy

## Evidence available

`npm run lint` and `npm run build` have passed. Manual end-to-end execution against configured Gemini and Supabase services has produced successful resolution responses. This does not establish measured accuracy, latency, or retrieval quality.

## Manual regression checks

| Issue | Expected retrieval |
|---|---|
| Password reset but cannot log in | Authentication/password-reset knowledge |
| Payment failed but money was deducted | Payment-deduction/order-failure knowledge |
| API token returns 401 | Developer API authentication knowledge |
| Cancel subscription | Billing/subscription knowledge |
| Unrelated question | Few/no strong results and escalation guidance |
| Temporary Gemini generation outage | User-safe `503` message after bounded retries |

## Recommended automation

Unit-test schemas, retry classification, and prompt construction. Integration-test the RPC with known vectors. Mock Gemini success, empty/malformed JSON, permanent failures, and transient 429/503 exhaustion. Browser-test examples, focus, loading, errors, source rendering, and mobile layout. Maintain labeled retrieval queries and adversarial prompt-injection cases before making retrieval-quality claims.
