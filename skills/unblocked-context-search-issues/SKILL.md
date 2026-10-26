---
name: unblocked-context-search-issues
description: "Use when checking if a bug is already known, finding the ticket behind a feature, or seeing if work is planned. Lists by project or assignee: query-issues."
---

Use this to search issue trackers such as Jira and Linear by meaning: whether a bug is already reported, which ticket or epic a feature came from, and whether work is planned or in progress. When you need every issue matching a project, person, or status, use unblocked-context-query-issues instead.

Run `unblocked context-search-issues --query "..." [--instruction "..."]`. Write the query as a full question with the concrete names you have, and use instruction to say what to prefer. It prints `{sources: [{title, url, content}]}` as JSON. This search exists only in the CLI, so it never appears in the MCP tool list; check for the CLI with `command -v unblocked`.

Without the CLI, call the context_research MCP tool with effort medium and instruction "Prefer issue tracker results; deprioritize code and messages". If neither the CLI nor the MCP tool exists, stop and tell the user Unblocked is not set up here and link https://docs.getunblocked.com/unblocked-mcp/mcp-overview.

Give each issue's key, status, and link. Statuses change, so open the issue with context_get_urls before relying on its state.

It is done when the answer cites the results it relies on, or says what was searched and found nothing.
