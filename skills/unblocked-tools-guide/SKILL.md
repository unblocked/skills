---
name: unblocked-tools-guide
description: >
  Tool selection guide and legacy mapping for Unblocked search tools. Use
  this skill whenever you're unsure which Unblocked tool to call; when a
  tool call fails because a tool isn't found or isn't available; when you
  encounter references to deprecated tools such as data_retrieval,
  research_task, or unblocked_context_engine; or when a fine-grained tool
  like context_search_code or context_search_prs isn't available in your
  current environment. This skill explains what's available where and how
  to fall back gracefully.
---

# Unblocked Tools Guide

## What's Available Where

Unblocked exposes different tool sets depending on how it's connected:

**Available everywhere — MCP and Claude Code CLI:**
| Tool | Purpose |
|:---|:---|
| `context_research` | Broad search across all sources: code, PRs, docs, issues, messages |

**Available in Claude Code CLI only:**
| Tool | Purpose |
|:---|:---|
| `context_search_code` | Code-only search across connected repos |
| `context_search_prs` | PR descriptions and review discussions only |
| `context_search_issues` | Issue tracker results only (bugs, tasks, epics) |
| `context_search_documentation` | Wikis, runbooks, ADRs, and docs only |
| `context_search_messages` | Slack and Teams conversations only |

If you're on MCP and a fine-grained tool call fails with "tool not found", that's expected — use `context_research` instead.

## Legacy Tool Mapping

These tools no longer exist. If you see them in older skills, instructions, or conversation history, replace with `context_research`:

| Deprecated tool | Use instead |
|:---|:---|
| `data_retrieval` | `context_research` |
| `research_task` | `context_research` |
| `unblocked_context_engine` | `context_research` |

## Routing and Fallbacks

Use the preferred tool when available. If it isn't (tool not found error), fall back to `context_research` and steer it with the `instruction` parameter:

| What you need | Preferred tool | `context_research` fallback instruction |
|:---|:---|:---|
| Full picture across all sources | `context_research` | — |
| Code (semantic, cross-repo) | `context_search_code` | `"Prefer code and implementation results; deprioritize docs, issues, and messages"` |
| PR history and decision reasoning | `context_search_prs` | `"Prefer PR descriptions and review discussions; deprioritize other sources"` |
| Issue tracker (bugs, tasks, epics) | `context_search_issues` | `"Prefer issue tracker results; deprioritize code and messages"` |
| Docs (wikis, runbooks, ADRs) | `context_search_documentation` | `"Prefer documentation, wikis, and runbooks; deprioritize code and messages"` |
| Team chat (Slack, Teams) | `context_search_messages` | `"Prefer Slack threads and team conversations; deprioritize code and docs"` |
| Current local code | Grep / Glob / Read | — |

For detailed guidance on any tool, see the corresponding skill: `unblocked-context-research`, `unblocked-context-search-code`, `unblocked-context-search-prs`, `unblocked-context-search-issues`, `unblocked-context-search-documentation`, or `unblocked-context-search-messages`.
