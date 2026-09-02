---
name: unblocked-tools-guide
description: >
  Explains Unblocked CLI and MCP availability, tool selection, and fallbacks.
  Use when a tool is missing, a CLI or MCP call fails, or the correct
  Unblocked tool is unclear.
---

# Unblocked Tools Guide

## MCP Surface vs. CLI Availability

The MCP server typically exposes only the broad tools (`context_research`, `context_get_urls`, `context_get_rules`). The fine-grained tools (`context_search_code`, `context_search_prs`, `context_search_issues`, `context_search_documentation`, `context_search_messages`, `context_query_prs`, `context_query_issues`) are CLI-only, so their absence from the MCP tool list says nothing about whether they are installed. Check the CLI separately with `command -v unblocked` before deciding a fine-grained tool is unavailable.

## Access Policy — CLI First, Then MCP, Then Stop

For every Unblocked call, follow this order:

1. **Prefer the Unblocked CLI.** Check availability **once per session** with `command -v unblocked` (or `unblocked --help`). Cache the result — do not re-probe on every call. If present, invoke the matching CLI subcommand directly.
2. **Fall back to MCP only if the CLI is confirmed unavailable or a CLI call fails.** Use the equivalent MCP tool (`context_research`, `context_get_urls`, etc.). On MCP-only, fine-grained tools are not exposed — fall back to `context_research` with a steering `instruction` (see routing table below).
3. **If neither is available, stop and notify the user.** Do not substitute with unrelated tools (web search, Grep-only guessing, etc.) — the user asked for organizational context, and a substitute answer hides the fact that Unblocked is not set up. Tell the user:

   > Unblocked is not available in this environment. See the setup docs at https://docs.getunblocked.com/unblocked-mcp/mcp-overview to install the CLI or configure the Unblocked MCP server, then retry.

The CLI is preferred because it exposes the full set of fine-grained tools, handles auth locally, and is more robust than MCP in most environments.

## CLI ↔ MCP Tool Mapping

| Purpose | CLI subcommand | MCP tool | CLI? | MCP? |
|:---|:---|:---|:---:|:---:|
| Broad search across all sources | `unblocked context-research` | `context_research` | yes | yes |
| Resolve URL content | `unblocked context-get-urls` | `context_get_urls` | yes | yes |
| Code-only search | `unblocked context-search-code` | `context_search_code` | yes | no |
| PR descriptions and review discussions | `unblocked context-search-prs` | `context_search_prs` | yes | no |
| Issue tracker results | `unblocked context-search-issues` | `context_search_issues` | yes | no |
| Documentation (wikis, runbooks, ADRs) | `unblocked context-search-documentation` | `context_search_documentation` | yes | no |
| Messaging (Slack, Teams) | `unblocked context-search-messages` | `context_search_messages` | yes | no |
| Structured issue queries | `unblocked context-query-issues` | — | yes | no |
| Structured PR queries | `unblocked context-query-prs` | — | yes | no |

**Common flags (CLI):**
- `context-research` and `context-search-*`: `--query <text>` (required), `--instruction <text>` (optional); `context-research` additionally accepts `--effort low|medium|high`.
- `context-query-*`: `--query <text>` (required), `--projects <name...>` (optional, array), `--user-name <name>` (optional).
- `context-get-urls`: `--urls <url...>` (required, array). No `--query`.

## Routing and Fallbacks

Use the preferred tool when available via the CLI. If the CLI is present but a fine-grained subcommand errors, or you're on MCP-only and the fine-grained tool isn't exposed, fall back to `context_research` and steer it with the `--instruction` / `instruction` parameter:

| What you need | Preferred tool | `context_research` fallback instruction |
|:---|:---|:---|
| Full picture across all sources | `context_research` | — |
| Code (semantic, cross-repo) | `context_search_code` | `"Prefer code and implementation results; deprioritize docs, issues, and messages"` |
| PR history and decision reasoning | `context_search_prs` | `"Prefer PR descriptions and review discussions; deprioritize other sources"` |
| Issue tracker (bugs, tasks, epics) | `context_search_issues` | `"Prefer issue tracker results; deprioritize code and messages"` |
| Docs (wikis, runbooks, ADRs) | `context_search_documentation` | `"Prefer documentation, wikis, and runbooks; deprioritize code and messages"` |
| Team chat (Slack, Teams) | `context_search_messages` | `"Prefer Slack threads and team conversations; deprioritize code and docs"` |
| Filtered issue enumeration (by project/person) | `context_query_issues` | `"Prefer issue tracker results filtered by project and assignee; enumerate rather than rank"` |
| Filtered PR enumeration (by repo/person) | `context_query_prs` | `"Prefer PR results filtered by repository and author; enumerate rather than rank"` |
| Resolve a known URL to full content | `context_get_urls` | — (this tool is available on MCP; no fallback needed) |
| Current local code | Grep / Glob / Read | — |

## Search vs. Query — Which to Use

The tool family has two shapes for the same sources:

- **`context_search_*`** — semantic relevance matching. Use when the question is conceptual ("is there an issue about X?", "what PR introduced Y?").
- **`context_query_*`** — structured, filtered enumeration. Use when you have precise filters (project key, repo, person) and want a definitive list ("open bugs in PAY assigned to Alice", "merged PRs last week in payments-service").

If you don't have a concrete project/repo/person anchor, reach for `context_search_*`. If you do, `context_query_*` gives cleaner, more deterministic results.

For detailed guidance on any tool, see the corresponding skill: `unblocked-context-research`, `unblocked-context-search-code`, `unblocked-context-search-prs`, `unblocked-context-search-issues`, `unblocked-context-search-documentation`, `unblocked-context-search-messages`, `unblocked-context-query-issues`, `unblocked-context-query-prs`, or `unblocked-context-get-urls`.
