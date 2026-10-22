---
name: unblocked-context-research
description: "Use when you need why code is the way it is, prior work before a change, or incident history across PRs, docs, chat, and issues. Known link: get-urls."
---

Call the context_research MCP tool when the answer depends on what the team knows rather than what the code says: why something was built this way, what was tried or rejected, the conventions to follow, who owns it, and what broke before. Call it at the start of planning, investigation, or a refactor, alongside your first local search. For current local code alone, Grep and Read are faster.

Write the query as a full question with every concrete name you have: services, classes, file paths, repo names, ticket keys, channels, people, and dates. When the user says I, my, or me, keep "me" in the query. Use instruction to say which results to prefer, for example "Prefer design docs and PR reviews over chat".

Set effort to medium for any question you need answered, and high for planning, architecture, migrations, incidents, and broad cross-system questions. Low returns only a list of sources with no summary; use it only to collect links you will open next. Split unrelated questions into separate calls and run them in parallel.

Without MCP, the CLI does the same: `unblocked context-research --query "..." --effort medium [--instruction "..."]`, which prints `{summary, sources: [{title, url, content}]}` as JSON. If neither the MCP tool nor the CLI exists, stop and tell the user Unblocked is not set up here and link https://docs.getunblocked.com/unblocked-mcp/mcp-overview.

Read the summary, then open the sources it leans on with context_get_urls. Returned code reflects the default branch, so confirm it against local files before acting. If the first pass is thin, run one follow-up query using the file paths, PR numbers, and names it surfaced.

Cite each claim with its source link and say plainly where context was thin or conflicting. Unattended, take the default on any fork, state the choice in the output, and list the forks at the end for review.

It is done when the answer cites sources for each claim, or states what was searched and found nothing.
