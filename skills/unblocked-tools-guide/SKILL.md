---
name: unblocked-tools-guide
description: "Use when an Unblocked tool seems missing, a call fails, you need to run Unblocked headless, or you're unsure which Unblocked tool fits a question."
---

Unblocked reaches agents two ways. The MCP server exposes context_research, context_get_urls, and context_get_rules; its tool names may carry a client prefix such as mcp__unblocked__. The `unblocked` CLI has those three plus source-scoped searches and filtered lists that MCP does not expose, so a short MCP tool list says nothing about the CLI. Check for the CLI once with `command -v unblocked`.

| Need | MCP tool | CLI command |
|:---|:---|:---|
| Answer a question from all sources | context_research | `unblocked context-research --query "..." --effort medium` |
| Read known links | context_get_urls | `unblocked context-get-urls --urls <url> ...` |
| A repo's coding rules | context_get_rules | `unblocked context-get-rules --repo-name owner/repo` |
| Search one source: code, prs, issues, documentation, messages | none | `unblocked context-search-<source> --query "..."` |
| Filtered list of PRs or issues | none | `unblocked context-query-prs` or `context-query-issues --query "..."` |

When a CLI-only search is unavailable, call context_research with an instruction naming the source to prefer. For a complete filtered list without the CLI, say the ranked results may be incomplete. Use effort medium or higher whenever you need an answer; low returns sources with no summary.

The CLI prints JSON on stdout: `{sources: [{title, url, content}]}`, plus a `summary` from context-research. Failures print `{error, message}` and exit 1; a bad flag prints usage and exits 1. For CI and other headless runs, set `UNBLOCKED_API_TOKEN` or `UNBLOCKED_API_TOKEN_FILE`; interactively, `unblocked auth` logs in through the browser.

An auth error means the user needs to log in again. A not-found error covers both a missing resource and one the user cannot access. If neither the MCP tools nor the CLI exist, stop and tell the user Unblocked is not set up here and link https://docs.getunblocked.com/unblocked-mcp/mcp-overview; answering from other sources would hide that.

It is done when the right tool has been called successfully, or the user knows exactly what to set up.
