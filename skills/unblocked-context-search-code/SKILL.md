---
name: unblocked-context-search-code
description: "Use when Grep can't find a class, function, or pattern because it may live in another connected repo, or you need search by concept. History: research."
---

Use this for semantic code search across every repo connected to Unblocked: finding where something is implemented when it is not in the local checkout, how other services use an API, or code that matches a concept rather than a string. Code in the local workspace is faster to find with Grep and Read.

Run `unblocked context-search-code --query "..." [--instruction "..."]`. Write the query as a full question with the concrete names you have, and use instruction to say what to prefer. It prints `{sources: [{title, url, content}]}` as JSON. This search exists only in the CLI, so it never appears in the MCP tool list; check for the CLI with `command -v unblocked`.

Without the CLI, call the context_research MCP tool with effort medium and instruction "Prefer code and implementation results; deprioritize docs, issues, and messages". If neither the CLI nor the MCP tool exists, stop and tell the user Unblocked is not set up here and link https://docs.getunblocked.com/unblocked-mcp/mcp-overview.

Results come from each repo's default branch as last indexed, not your working tree. Quote the repo and path for every snippet you rely on, and read the local file before changing code that also exists here.

It is done when the answer cites the results it relies on, or says what was searched and found nothing.
