---
name: unblocked-context-search-documentation
description: >
  Documentation-only search via context_search_documentation. Use this
  instead of context_research when you want docs — wikis, READMEs, runbooks,
  API references, architecture docs, ADRs, and onboarding guides — without
  Slack, PR, or issue noise mixed in. TRIGGER when: looking for setup or
  configuration instructions; finding a runbook or operational procedure;
  understanding an API contract or event schema; locating an architecture
  decision record or design doc; the user asks "is there docs for X",
  "how do I set up Y", "is this documented", or "find the runbook for Z".
  DO NOT TRIGGER when: you need the current code state — use Grep/Glob/Read;
  you need Slack threads, PRs, or issues alongside docs — use context_research
  instead.
---

# Unblocked Context Search — Documentation

Documentation-only retrieval. Calls `context_search_documentation` with a natural-language query to semantically search wikis, READMEs, runbooks, API references, architecture docs, and ADRs — surfacing written guidance that lives outside the codebase.

**Sources:** Confluence, Confluence Data Center, Notion, Google Drive, Google Drive for Workspaces, Coda, Stack Overflow for Teams, External Websites.

## How to Invoke

Always prefer the Unblocked CLI. Fall back to MCP only if the CLI is unavailable. If neither is available, stop and notify the user. See `unblocked-tools-guide` for the full routing matrix and `context_research` fallback instructions.

1. **Try the CLI first.** Run `unblocked context-search-documentation --query "<your query>" [--instruction "<instruction>"]`. Verify it's installed with `unblocked --help` or `command -v unblocked` before first use in a session.
2. **If the CLI is not installed or fails to run**, try MCP. Note that `context_search_documentation` is not exposed on MCP in most environments — if it's missing, fall back to the MCP `context_research` tool with a steering `instruction` like `"Prefer documentation, wikis, and runbooks; deprioritize code and messages"` (see `unblocked-tools-guide` for per-source steering instructions).
3. **If neither CLI nor MCP is available**, stop executing this skill and tell the user: "Unblocked is not available in this environment. See the setup docs at https://docs.getunblocked.com/unblocked-mcp/mcp-overview to install the CLI or configure the Unblocked MCP server, then retry. See the `unblocked-tools-guide` skill for routing details." Do not substitute with other documentation-search tools as a replacement.

## When This Adds Value Over Grep/Read

Grep and Read search local files. Use this tool when:

- **The doc lives outside the repo** — wikis, internal portals, and team docs aren't in the local workspace
- **You need operational guidance** — runbooks, deployment procedures, and incident playbooks are typically documented, not coded
- **You want doc-only results** — `context_research` returns everything (Slack, PRs, issues, code); this returns only documentation, so results stay focused when that's all you need
- **You're looking for explained concepts** — architecture decisions, design rationale, and API contracts are often captured in docs rather than code comments

## When to Use `context_research` Instead

Use `context_research` when you need the full picture alongside docs — PR discussions, Slack threads, issue tracker context, or code history. This tool returns documentation only; broader context requires `context_research`.

## Input

| Parameter | Required | Description |
|:---|:---|:---|
| `query` | Yes | What to find — write a complete question with concrete identifiers, not bare keywords. |
| `instruction` | No | Fine-grained control over which results surface: preferred doc types, teams, or topics to prioritize or deprioritize. |

**Writing effective queries** — include the most concrete identifiers you have:

- Service, component, or feature names (`billing-service`, `API gateway`, `order fulfillment pipeline`)
- Doc types when known (`runbook`, `ADR`, `onboarding guide`, `API reference`, `architecture doc`)
- Concepts or procedures (`local setup`, `deployment`, `event schema`, `rate limiting configuration`)
- Team or project names when relevant (`payments team`, `infrastructure`, `web-client`)

Write a complete question or directive, not a keyword fragment:

| Instead of | Write |
|:---|:---|
| `setup` | `Is there a local development setup guide for billing-service?` |
| `rate limiting` | `Is the rate limiting configuration for the API gateway documented?` |
| `event schema` | `Where is the OrderCreatedEvent payload schema documented?` |
| `deployment` | `Is there a runbook for deploying checkout-service to production?` |

**`instruction` examples:**
- `"Prefer runbooks and operational guides over conceptual docs"`
- `"Focus results on the payments team's documentation"`
- `"Prefer ADRs and architecture docs over README files"`

## Splitting Queries

Split distinct unknowns into separate `context_search_documentation` calls rather than cramming everything into one query. Run them in parallel when the unknowns are independent.

**One query, two unknowns (diluted results):**
> Find the setup guide for billing-service and also the ADR for the event-driven architecture.

**Two parallel queries (focused results):**
> Query 1: Is there a local development setup guide for billing-service?
>
> Query 2: Is there an architecture decision record explaining the event-driven design?

## When to Skip

- You need the current code state — use Grep/Glob/Read
- You also need Slack threads, PRs, or issues — use `context_research` instead

## Interpreting Results

- Docs may be outdated — cross-reference procedural docs against current config or code before following them
- Mine concrete identifiers (doc titles, service names, team names) from results and use them in follow-up queries
- If results are thin, try rephrasing around the doc type (`runbook`, `guide`, `ADR`) or a more specific component name

## Reference

- `references/query-patterns.md` — query examples organized by use case, with good/bad comparisons and `instruction` patterns
