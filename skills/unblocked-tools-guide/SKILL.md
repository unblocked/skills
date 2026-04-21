---
name: unblocked-tools-guide
description: >
  Tool selection guide and legacy mapping for Unblocked search tools. Use
  this skill whenever you're unsure which Unblocked tool to call; when a
  tool call fails because a tool isn't found or isn't available; when you
  encounter references to deprecated tools such as data_retrieval,
  research_task, or unblocked_context_engine; or when a fine-grained tool
  like context_search_code, context_search_prs, context_query_issues,
  context_query_prs, or context_get_urls isn't available in your current
  environment. This skill explains what's available where and how to fall
  back gracefully.
---

# Unblocked Tools Guide

## Access Policy — CLI First, Then MCP, Then Stop

For every Unblocked call, follow this order:

1. **Prefer the Unblocked CLI.** Check availability with `unblocked --help` or `command -v unblocked`. If present, invoke the matching CLI subcommand.
2. **Fall back to MCP only if the CLI is unavailable or fails.** Use the equivalent MCP tool (`context_research`, `context_get_urls`, etc.).
3. **If neither is available, stop and notify the user.** Do not substitute with unrelated tools (web search, Grep-only guessing, etc.). Tell the user:

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

If you're on MCP only and a fine-grained tool call fails with "tool not found", that's expected — fall back to `context_research` with an `instruction` that steers it toward the source type you want (see below).

## Legacy Tool Mapping

These tools no longer exist. If you see them in older skills, instructions, or conversation history, replace with `context_research`:

| Deprecated tool | Use instead |
|:---|:---|
| `data_retrieval` | `context_research` |
| `research_task` | `context_research` |
| `unblocked_context_engine` | `context_research` |
| `link_resolver` | `context_get_urls` (or `context_research` if the URL isn't known) |

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
