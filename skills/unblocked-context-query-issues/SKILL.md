---
name: unblocked-context-query-issues
description: "Use when listing issues by project, assignee, status, or date, like 'my open tickets' or 'bugs closed last sprint'. Is this bug known: search-issues."
---

Use this to get a filtered list of issues rather than a relevance ranking: what someone is assigned, what a project closed during a period, or which bugs are open.

Run `unblocked context-query-issues --query "..." [--projects <name> ...] [--user-name "<person>"]`. Start the query with a list verb and include status and time window, for example "List issues resolved in the last 7 days". When the user means themselves, keep "me" in the query and omit --user-name; pass --user-name only for someone else. Pass the project name or key to --projects. It prints `{sources: [{title, url, content}]}` as JSON. This command exists only in the CLI, so it never appears in the MCP tool list; check for the CLI with `command -v unblocked`.

Without the CLI, call the context_research MCP tool with effort medium and instruction "List issues matching these filters; prefer enumeration over relevance". That returns ranked matches, not a complete list, so say the list may be incomplete. If neither the CLI nor the MCP tool exists, stop and tell the user Unblocked is not set up here and link https://docs.getunblocked.com/unblocked-mcp/mcp-overview.

Completed means resolved, so a request about what someone finished filters on resolved date. A request about current work, like what I am working on, needs a status filter and no time range. An empty result can mean a wrong project name as easily as no matches, so check the name and status filter before reporting none. Results stop at about 50, so narrow the time range or status if you hit that.

It is done when the answer gives the filtered list with a link for each item, the filters used, and whether the list may be incomplete.
