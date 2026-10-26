---
name: unblocked-context-search-prs
description: "Use when asking which PR introduced a behavior, why a change was made, or what was tried and rejected. PRs only. Lists by repo or author: query-prs."
---

Use this to search pull request descriptions and review threads across connected repos when you need the reasoning behind a change: which PR introduced a behavior, what tradeoffs reviewers raised, and which approaches were rejected. When you also need chat, docs, or issues, use context_research instead.

Run `unblocked context-search-prs --query "..." [--instruction "..."]`. Write the query as a full question with the concrete names you have, and use instruction to say what to prefer. It prints `{sources: [{title, url, content}]}` as JSON. This search exists only in the CLI, so it never appears in the MCP tool list; check for the CLI with `command -v unblocked`.

Without the CLI, call the context_research MCP tool with effort medium and instruction "Prefer PR descriptions and review discussions; deprioritize other sources". If neither the CLI nor the MCP tool exists, stop and tell the user Unblocked is not set up here and link https://docs.getunblocked.com/unblocked-mcp/mcp-overview.

A PR shows intent at the time it merged and the code may have moved on, so check current files before acting. Open the strongest PRs with context_get_urls (verbose "true" adds the diff), and use git log or blame locally to tie a PR to the lines in question.

It is done when the answer cites the results it relies on, or says what was searched and found nothing.
