---
name: unblocked-context-search-prs
description: >
  PR-only search across connected repos via context_search_prs. Use this
  instead of context_research when you want PR results — descriptions, review
  discussions, and change history — without Slack, Jira, or doc noise mixed
  in. TRIGGER when: you need to understand WHY code works the way it does
  (decision history, reasoning, rejected alternatives); investigating what
  PRs introduced or changed a behavior; the user asks "why was this done",
  "what changed", "what PR introduced X", or "was this tried before"; you're
  doing bug archaeology and want to trace a change back to its PR. DO NOT
  TRIGGER when: you need the current code state — use Grep/Glob/Read; you
  need Slack threads, issues, or docs alongside PRs — use context_research
  instead.
---

# Unblocked Context Search — PRs

PR-only retrieval across connected repos. Calls `context_search_prs` with a natural-language query to semantically search PR descriptions and review discussions — surfacing the WHY behind code changes that Grep can't tell you.

**Sources:** GitHub, GitHub Enterprise, GitLab, GitLab Self-Managed, Bitbucket, Bitbucket Data Center, Azure DevOps.

## How to Invoke

**`context_search_prs` is CLI-only in most environments** — it does not appear in the MCP tool list even when fully available. Run `command -v unblocked` once per session and cache the result. Do not conclude the tool is unavailable from the MCP surface alone. See `unblocked-tools-guide` for full routing rules.

**CLI (preferred):**
```
unblocked context-search-prs --query "<your query>" [--instruction "<instruction>"]
```

**MCP fallback** (only if CLI is confirmed unavailable): fall back to `context_research` with `instruction: "Prefer PR descriptions and review discussions; deprioritize other sources"`.

**If neither is available:** stop and tell the user Unblocked is not configured in this environment (see `unblocked-tools-guide` for the full message). Do not substitute with other PR-search tools.

## When This Adds Value Over Grep/Read

Grep and Read show you what the code does now. Use this tool when:

- **You need the WHY** — PR descriptions and review threads contain the reasoning, constraints, and tradeoffs that don't appear in code
- **You're tracing a change** — "what introduced this behavior" requires searching change history, not current state
- **You want PR-only results** — `context_research` returns everything (Slack, Jira, docs, code); this returns only PRs, so results stay focused when that's all you need
- **The PR might be in another repo** — cross-repo PR search surfaces decisions from services outside the local workspace

## When to Use `context_research` Instead

Use `context_research` when you need the full organizational picture alongside PRs — Slack threads, design docs, issue tracker context, architectural decisions from multiple sources. This tool returns PRs only; broader context requires `context_research`.

## Input

| Parameter | Required | Description |
|:---|:---|:---|
| `query` | Yes | What to find — write a complete question with concrete identifiers, not bare keywords. |
| `instruction` | No | Fine-grained control over which results surface: preferred repos, date ranges, or PR attributes to prioritize or deprioritize. |

**Writing effective queries** — include the most concrete identifiers you have:

- Class, method, or module names (`PaymentProcessor.charge()`, `auth-middleware`)
- File paths or service names (`billing-service/src/webhooks`, `order-service`)
- Feature or decision names (`JWT token refresh`, `gRPC migration`, `retry-with-backoff`)
- Repo names when you know them (`payments-service`, `web-client`)

Write a complete question or directive, not a keyword fragment:

| Instead of | Write |
|:---|:---|
| `retry logic` | `What PR introduced the retry-with-backoff logic in order-service?` |
| `auth refactor` | `What was the reasoning behind switching from session cookies to JWT tokens?` |
| `rate limiting` | `What PR added rate limiting to the API gateway and what approach was chosen?` |
| `pagination` | `Were there any rejected approaches to cursor-based pagination in the REST API?` |

**`instruction` examples:**
- `"Focus results on billing-service and payments-service repos"`
- `"Prefer merged PRs; deprioritize draft or abandoned PRs"`
- `"Focus on PRs from the last 6 months"`

## Splitting Queries

Split distinct unknowns into separate `context_search_prs` calls rather than cramming everything into one query. Run them in parallel when the unknowns are independent.

**One query, two unknowns (diluted results):**
> Find the PR that introduced rate limiting and also why we moved to gRPC.

**Two parallel queries (focused results):**
> Query 1: What PR introduced rate limiting to the API gateway?
>
> Query 2: What was the reasoning behind moving from REST to gRPC for inter-service communication?

## When to Skip

- You need the current code state, not history — use Grep/Glob/Read
- You also need Slack threads, issues, or docs — use `context_research` instead

## Interpreting Results

- Results reflect merged and open PRs at query time — verify code claims against local files before acting
- Mine concrete identifiers (PR numbers, file paths, author names, repo names) from results and use them in follow-up queries
- PR descriptions capture intent at the time of writing; the code may have diverged since — cross-reference against current state
- If results are thin, re-query with a more specific identifier extracted from the first pass

## Reference

- `references/query-patterns.md` — query examples organized by use case, with good/bad comparisons and `instruction` patterns
