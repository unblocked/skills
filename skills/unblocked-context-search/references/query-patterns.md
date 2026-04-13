# Query Patterns

General guidance for writing effective `context_search` queries.

## Bad vs Good

| Bad | Why | Good |
|:---|:---|:---|
| `auth` | Keyword, no question | `How does AuthService.validateToken() verify JWTs and handle expiration?` |
| `gradle upgrade` | Too vague | `Research the Gradle 8.x upgrade path for the Android monorepo, including plugin compatibility and prior attempts.` |
| `PROJ-123` (bare ID) | Tool needs natural language | `Show me the details of PROJ-123.` |
| `What's happening in messaging?` | No channel, timeframe, or filter | `Summarize #platform-eng from the last 3 days.` |
| `Find my PR about auth` | Vague | `Find my open PRs in the auth-service repo.` |
| `Issues from last week` | Missing project or assignee | `What issues did I complete last week in the PAYMENTS project?` |
| `why is this slow` | No entity or context | `Explain why SearchIndexer.reindexAll() degrades on catalogs with 100k+ items.` |

## Splitting into Parallel Queries

One broad query dilutes ranking. Split unknowns into focused queries and run them in parallel.

**Bad — one umbrella query:**
```
How does auth work and what are the rate limiting conventions?
```

**Good — two parallel queries:**
```
How does AuthService.validateToken() verify JWTs and handle expiration?
```
```
What conventions does the team follow for rate limiting middleware in the API gateway?
```

## Filter Semantics Quick Reference

- **"completed" / "finished"** — maps to *resolved date* (issue trackers) or *merged status* (PRs), not created date.
- **"working on" / "in progress"** — maps to a *status filter* (open, InProgress). Do not add a time range.
- **"last N PRs"** — maps to a *limit*, not a time filter. "My last 5 PRs" = most recent 5 by me.
- **"me" / "my" / "I"** — use `me` for the current user. Use actual names only for other people.
- **Single-day queries** — "on Monday" means start-of-day to end-of-day for that date.
