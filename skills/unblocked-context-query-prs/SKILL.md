---
name: unblocked-context-query-prs
description: >
  Structured, filtered PR retrieval via context_query_prs. Use this
  instead of context_search_prs when you need a precise filtered list
  — scoped by project/repo and/or person — rather than semantic
  relevance matching. TRIGGER when: the user asks "what PRs did Alice
  open last week", "list merged PRs in payments-service this month",
  "PRs I'm waiting on review for", "what did the team ship yesterday";
  you need a definitive list rather than a ranked set; you already know
  the repo name or person and want to enumerate PRs under that filter.
  DO NOT TRIGGER when: the question is conceptual ("why was this
  introduced", "what PR added feature X") — use context-search-prs for
  semantic matching instead.
---

# Unblocked Context Query — PRs

Structured PR retrieval. Calls `context_query_prs` with a natural-language query scoped by `--projects` and/or `--user-name` filters — producing a filtered list rather than a ranked semantic match set.

**Sources:** GitHub, GitHub Enterprise, GitLab, GitLab Self-Managed, Bitbucket, Bitbucket Data Center, Azure DevOps.

## How to Invoke

Always prefer the Unblocked CLI. Fall back to MCP only if the CLI is unavailable. If neither is available, stop and notify the user. See `unblocked-tools-guide` for the full routing matrix and `context_research` fallback instructions.

1. **Try the CLI first.** Run `unblocked context-query-prs --query "<your query>" [--projects repo-name another-repo] [--user-name "Alice Smith"]`. Verify it's installed with `unblocked --help` or `command -v unblocked` before first use in a session.
2. **If the CLI is not installed or fails to run**, try MCP. Note that `context_query_prs` is not exposed on MCP in most environments — if it's missing, fall back to the MCP `context_research` tool with a steering `instruction` like `"Prefer PR results filtered by repository and author; deprioritize code, issues, and messages"` (see `unblocked-tools-guide` for per-source steering instructions).
3. **If neither CLI nor MCP is available**, stop executing this skill and tell the user: "Unblocked is not available in this environment. See the setup docs at https://docs.getunblocked.com/unblocked-mcp/mcp-overview to install the CLI or configure the Unblocked MCP server, then retry. See the `unblocked-tools-guide` skill for routing details." Do not substitute with GitHub/GitLab CLI tools as a replacement.

## When This Differs From `context-search-prs`

Both operate on the same PR data, but they optimize for different questions:

| Use case | Use |
|:---|:---|
| "What PR introduced the retry-with-backoff logic?" (conceptual) | `context-search-prs` |
| "List merged PRs in payments-service last week" (filtered enumeration) | `context-query-prs` |
| "Were there rejected approaches to JWT refresh?" (semantic match) | `context-search-prs` |
| "What PRs is Alice waiting on review for?" (filtered activity) | `context-query-prs` |

If you don't have a concrete repo or person to filter on, use `context-search-prs` — `context-query-prs` shines when the filters are precise.

## Input

| Parameter | Required | Description |
|:---|:---|:---|
| `query` | Yes | Structured natural-language query describing the PRs to retrieve. Include status (`open`, `merged`, `closed`, `draft`), time range, and any intent not covered by `projects`/`user-name`. |
| `projects` | No | One or more repository names to scope the search. CLI accepts multiple values: `--projects payments-service web-client`. |
| `user-name` | No | Name or username of a person referenced in the query (author, reviewer, or requester depending on query phrasing). |

**Writing effective queries** — lead with a clear list directive and use the filters for scope:

- Start with an enumeration verb: "List", "Show", "Find all", "Enumerate"
- Include status explicitly when relevant: `open`, `merged`, `draft`, `closed`
- Include time windows when relevant: `last week`, `since 2025-04-01`, `this sprint`
- Use `me` in the query when the user says "I"/"my"; use the actual name via `--user-name` for other people

| Instead of | Write |
|:---|:---|
| `PRs in payments` | `List open PRs in payments-service`, `--projects payments-service` |
| `Alice's PRs` | `Show PRs authored by Alice that are open or in-review`, `--user-name "Alice Smith"` |
| `what shipped` | `List PRs merged last week`, `--projects payments-service` |
| `my reviews` | `List PRs where I am a requested reviewer` (with `me` implied) |

## Self-Reference (`me`)

When the user says "I"/"my"/"me", put `me` directly in the query — do not pass `--user-name me`. Use `--user-name` only for other people.

**Right:**
- `query: "List PRs I authored that are still open"`, `projects: ["payments-service"]`
- `query: "Show PRs authored by Alice in the last 30 days"`, `user-name: "Alice Smith"`

**Wrong:**
- `user-name: "me"` — does not resolve correctly; keep `me` inside the query string

## Splitting Queries

Split distinct filter sets into separate `context-query-prs` calls. Run in parallel when independent.

**One query, two filters (diluted):**
> List merged PRs in payments-service this week and also open PRs in web-client waiting on review.

**Two parallel queries (focused):**
> Query 1: `query: "List PRs merged this week"`, `projects: ["payments-service"]`
>
> Query 2: `query: "List open PRs waiting on review"`, `projects: ["web-client"]`

## When to Skip

- You need semantic matching or relevance ranking, not a filtered list — use `context-search-prs`
- You need context from multiple sources (issues, messages, docs) alongside PRs — use `context-research`
- You need the current code state, not PR history — use Grep/Glob/Read

## Interpreting Results

- Results reflect PR state at query time — status (open/merged/closed) may have changed; verify before acting
- Mine PR numbers, repo names, author/reviewer names from results for follow-up queries
- "Completed" / "shipped" semantics = *merged status*, not created; filter accordingly
- "What am I reviewing" = open PRs with `me` as reviewer, no time range
- If the list is empty, re-check repo names and status expectations before concluding nothing exists

## Reference

- `references/query-patterns.md` — query examples organized by use case
