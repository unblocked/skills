---
name: unblocked-context-query-issues
description: >
  Structured, filtered issue retrieval via context_query_issues. Use this
  instead of context_search_issues when you need a precise filtered list
  — scoped by project and/or person — rather than semantic relevance
  matching. TRIGGER when: the user asks "what bugs are open in PROJECT",
  "what issues is Alice working on", "list in-progress tickets for the
  payments team", "issues I filed last month"; you need a definitive
  list rather than a ranked set of relevant items; you already know the
  project key or person's name and want to enumerate issues under that
  filter. DO NOT TRIGGER when: the question is conceptual ("is there an
  issue about X") or you don't have a project/person anchor — use
  context-search-issues for semantic matching instead.
---

# Unblocked Context Query — Issues

Structured issue retrieval. Calls `context_query_issues` with a natural-language query scoped by `--projects` and/or `--user-name` filters — producing a filtered list rather than a ranked semantic match set.

**Sources:** Jira, Jira Data Center, Linear, Asana, GitHub Issues.

## How to Invoke

Always prefer the Unblocked CLI. Fall back to MCP only if the CLI is unavailable. If neither is available, stop and notify the user. See `unblocked-tools-guide` for the full routing matrix and `context_research` fallback instructions.

1. **Try the CLI first.** Run `unblocked context-query-issues --query "<your query>" [--projects PROJ_KEY another-project] [--user-name "Alice Smith"]`. Verify it's installed with `unblocked --help` or `command -v unblocked` before first use in a session.
2. **If the CLI is not installed or fails to run**, try MCP. Note that `context_query_issues` is not exposed on MCP in most environments — if it's missing, fall back to the MCP `context_research` tool with a steering `instruction` like `"Prefer issue tracker results filtered by project and assignee; deprioritize code and messages"` (see `unblocked-tools-guide` for per-source steering instructions).
3. **If neither CLI nor MCP is available**, stop executing this skill and tell the user: "Unblocked is not available in this environment. See the setup docs at https://docs.getunblocked.com/unblocked-mcp/mcp-overview to install the CLI or configure the Unblocked MCP server, then retry. See the `unblocked-tools-guide` skill for routing details." Do not substitute with other issue-tracker tools as a replacement.

## When This Differs From `context-search-issues`

Both operate on the same issue tracker data, but they optimize for different questions:

| Use case | Use |
|:---|:---|
| "Is there an issue about this race condition?" (conceptual) | `context-search-issues` |
| "List open bugs in PAY project assigned to Alice" (filtered enumeration) | `context-query-issues` |
| "Has the Stripe webhook dedupe bug been reported?" (semantic match) | `context-search-issues` |
| "What did Alice complete last week in LINEAR?" (filtered activity) | `context-query-issues` |

If you don't have a concrete project key or person to filter on, use `context-search-issues` — `context-query-issues` shines when the filters are precise.

## Input

| Parameter | Required | Description |
|:---|:---|:---|
| `query` | Yes | Structured natural-language query describing the issues to retrieve. Include status, time range, and any intent not covered by `projects`/`user-name`. |
| `projects` | No | One or more project names or keys to scope the search. CLI accepts multiple values: `--projects PAY INFRA`. |
| `user-name` | No | Name or username of a person referenced in the query (assignee, creator, or reporter depending on query phrasing). |

**Writing effective queries** — lead with a clear list directive and use the filters for scope:

- Start with an enumeration verb: "List", "Show", "Find all", "Enumerate"
- Include status explicitly when relevant: `open`, `in-progress`, `resolved`, `closed`
- Include time windows when relevant: `last week`, `since 2025-04-01`, `this sprint`
- Use `me` in the query when the user says "I"/"my"; use the actual name via `--user-name` for other people

| Instead of | Write |
|:---|:---|
| `bugs in payments` | `List open bugs in the PAY project`, `--projects PAY` |
| `Alice's tickets` | `Show in-progress issues assigned to Alice`, `--user-name "Alice Smith"` |
| `what I did` | `List issues I completed last week` (with `me` implied) |
| `sprint items` | `List issues in the current sprint for the payments team`, `--projects PAY` |

## Self-Reference (`me`)

When the user says "I"/"my"/"me", put `me` directly in the query — do not pass `--user-name me`. Use `--user-name` only for other people.

**Right:**
- `query: "List issues I'm currently working on in the payments project"`, `projects: ["PAY"]`
- `query: "Show issues assigned to Alice that are in-progress"`, `user-name: "Alice Smith"`

**Wrong:**
- `user-name: "me"` — does not resolve correctly; keep `me` inside the query string

## Splitting Queries

Split distinct filter sets into separate `context-query-issues` calls. Run in parallel when independent.

**One query, two filters (diluted):**
> List open bugs in PAY assigned to Alice and also list issues in INFRA resolved this week.

**Two parallel queries (focused):**
> Query 1: `query: "List open bugs"`, `projects: ["PAY"]`, `user-name: "Alice Smith"`
>
> Query 2: `query: "List issues resolved this week"`, `projects: ["INFRA"]`

## When to Skip

- You need semantic matching or relevance ranking, not a filtered list — use `context-search-issues`
- You need context from multiple sources (PRs, messages, docs) alongside issues — use `context-research`
- You need the current code state, not issues — use Grep/Glob/Read

## Interpreting Results

- Results reflect issue-tracker state at query time — statuses may have changed; verify before acting
- Mine issue keys, project names, and assignee names from results for follow-up queries
- "Completed" semantics use *resolved date*, not created date — filter accordingly
- "What I'm working on" = status filter (open/in-progress), no time range; time ranges are for activity windows
- If the list is empty, re-check the project key and status expectations before concluding nothing exists

## Reference

- `references/query-patterns.md` — query examples organized by use case
