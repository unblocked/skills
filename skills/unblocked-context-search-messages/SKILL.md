---
name: unblocked-context-search-messages
description: "Use when asking what the team said in Slack or Teams: discussions, informal decisions, incident threads, or who knows about a topic. Mixed sources: research."
---

Use this to search team chat only, such as Slack and Microsoft Teams: what was discussed or decided informally, incident threads, and who has been talking about a topic. Name the channel, people, and time range in the query when you know them. When you also need PRs, docs, or issues, use context_research instead.

Run `unblocked context-search-messages --query "..." [--instruction "..."]`. Write the query as a full question with the concrete names you have, and use instruction to say what to prefer. It prints `{sources: [{title, url, content}]}` as JSON. This search exists only in the CLI, so it never appears in the MCP tool list; check for the CLI with `command -v unblocked`.

Without the CLI, call the context_research MCP tool with effort medium and instruction "Prefer Slack threads and team conversations; deprioritize code and docs". If neither the CLI nor the MCP tool exists, stop and tell the user Unblocked is not set up here and link https://docs.getunblocked.com/unblocked-mcp/mcp-overview.

Chat decisions are informal and get reversed. Give the date and link of each thread you cite, and check later threads, PRs, or docs before treating a chat decision as final.

It is done when the answer cites the results it relies on, or says what was searched and found nothing.
