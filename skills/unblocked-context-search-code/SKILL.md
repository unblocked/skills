---
name: unblocked-context-search-code
description: >
  Code-only search across the current repo and connected repos via
  context_search_code. Use this instead of context_research when you want
  code results without Slack, Jira, or doc noise mixed in. TRIGGER when:
  Grep/Glob/Read can't find a referenced class, function, or module (it may
  live in another connected repo); you need semantic code search rather than
  a literal pattern match; you want to find how something is implemented or
  used across repos; the user asks to "find", "locate", or "search for" code.
  DO NOT TRIGGER when: local Grep/Glob/Read can find what you need; you also
  need PR history, team decisions, Slack context, or issue tracker data —
  use context_research instead.
---

# Unblocked Context Search — Code

Code-only retrieval across the current repo and other connected repos. Calls `context_search_code` with a natural-language query to semantically search code — finding implementations, usages, and patterns that Grep can't reach because the code lives in another repo or the query is conceptual rather than literal.

**Sources:** GitHub, GitHub Enterprise, GitLab, GitLab Self-Managed, Bitbucket, Bitbucket Data Center, Azure DevOps.

## When This Adds Value Over Grep/Read

Grep and Read are fast for literal matches in the local workspace. Use this tool when:

- **The code might live elsewhere** — a referenced class, service, or utility may be in a connected repo that isn't in the local workspace
- **The query is conceptual** — "find all payment processors" or "how is retry logic implemented" won't match a grep pattern
- **You want code-only results** — `context_research` returns everything (Slack, Jira, docs, PRs); this returns only code, so results stay focused when that's all you need

If local Grep can find it, use that. This tool's value is reach (cross-repo) and semantics (concept-level matching).

## When to Use `context_research` Instead

Use `context_research` when you need the full picture alongside the code — PR discussions, team decisions, issue tracker context, Slack threads, architectural docs. This tool returns code only; organizational context requires `context_research`.

## Input

| Parameter | Required | Description |
|:---|:---|:---|
| `query` | Yes | What to find — write a complete phrase with concrete identifiers, not bare keywords. |
| `instructions` | No | Fine-grained control over which results surface: preferred repos, file types, or code patterns to prioritize or deprioritize. |

**Writing effective queries** — include the most concrete identifiers you have:

- Class or method names (`PaymentProcessor.charge()`, `AuthService`)
- File paths or module names (`billing-service/src/webhooks`, `shared/utils/retry`)
- Repo names when you know them (`payments-service`, `web-client`)
- Conceptual descriptions when you don't (`the rate limiting middleware in the API gateway`)

Write a complete question or directive, not a keyword fragment:

| Instead of | Write |
|:---|:---|
| `retry logic` | `Where is retry-with-backoff implemented across connected repos?` |
| `auth middleware` | `Find the authentication middleware that validates JWTs in the API gateway.` |
| `PaymentProcessor` | `How is PaymentProcessor.charge() implemented, and which services call it?` |
| `pagination` | `How do connected repos implement cursor-based pagination in REST APIs?` |

**`instructions` examples:**
- `"Prefer interface definitions and entry points over test files"`
- `"Focus results on the billing-service and payments-service repos"`
- `"Deprioritize generated or vendor code"`

## Splitting Queries

Split distinct unknowns into separate `context_search_code` calls rather than cramming everything into one query. Run them in parallel when the unknowns are independent.

**One query, two unknowns (diluted results):**
> Find the rate limiting middleware and also how authentication tokens are validated.

**Two parallel queries (focused results):**
> Query 1: Where is the rate limiting middleware implemented in the API gateway?
>
> Query 2: How does the authentication service validate JWT tokens?

## When to Skip

- Local Grep/Glob/Read finds what you need — no reason to reach for this tool
- You also need PR history, team discussions, issue context, or docs — use `context_research` instead, which covers all sources in one call
- You already know the exact file and line — direct file reads are faster

## Interpreting Results

- Returned code reflects the default branch of each repo, not your local workspace state — verify against local files before acting on the result
- Mine concrete identifiers (file paths, class names, module names, repo names) from results and use them in follow-up queries for precision
- If results are thin, re-query with a more specific identifier you extracted from the first pass
- Cross-reference key claims against the actual source file before driving implementation decisions

## Reference

- `references/query-patterns.md` — query examples organized by use case, with good/bad comparisons and `instructions` patterns
