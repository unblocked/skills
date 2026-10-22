---
name: unblocked-context-search-documentation
description: "Use when looking for a runbook, setup guide, design doc, ADR, or API contract in Confluence, Notion, Google Drive, or similar. Mixed sources: research."
---

Use this to search connected documentation only: runbooks, setup and onboarding guides, architecture docs, ADRs, API contracts, and wiki pages. When you also need PRs, chat, or issues to answer, use context_research instead.

Run `unblocked context-search-documentation --query "..." [--instruction "..."]`. Write the query as a full question with the concrete names you have, and use instruction to say what to prefer. It prints `{sources: [{title, url, content}]}` as JSON. This search exists only in the CLI, so it never appears in the MCP tool list; check for the CLI with `command -v unblocked`.

Without the CLI, call the context_research MCP tool with effort medium and instruction "Prefer documentation, wikis, runbooks, and design docs; deprioritize code and messages". If neither the CLI nor the MCP tool exists, stop and tell the user Unblocked is not set up here and link https://docs.getunblocked.com/unblocked-mcp/mcp-overview.

Docs go stale. Note when a doc looks old or disagrees with the code, and open the full page with context_get_urls before following its steps.

It is done when the answer cites the results it relies on, or says what was searched and found nothing.
