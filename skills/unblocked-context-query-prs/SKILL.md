---
name: unblocked-context-query-prs
description: "Use when listing PRs by repo, author, reviewer, status, or date, like 'my open PRs' or 'what merged last week'. Why a change was made: search-prs."
---

Use this to get a filtered list of pull requests rather than a relevance ranking: what someone authored or is reviewing, what merged in a repo during a period, or which PRs are still open.

Run `unblocked context-query-prs --query "..." [--projects <name> ...] [--user-name "<person>"]`. Start the query with a list verb and include status and time window, for example "List PRs merged in the last 7 days". When the user means themselves, keep "me" in the query and omit --user-name; pass --user-name only for someone else. Pass the bare repo name to --projects (payments-service, not acme/payments-service); a repo named only in the query text is not used as a filter. It prints `{sources: [{title, url, content}]}` as JSON. This command exists only in the CLI, so it never appears in the MCP tool list; check for the CLI with `command -v unblocked`.

Without the CLI, call the context_research MCP tool with effort medium and instruction "List pull requests matching these filters; prefer enumeration over relevance". That returns ranked matches, not a complete list, so say the list may be incomplete. If neither the CLI nor the MCP tool exists, stop and tell the user Unblocked is not set up here and link https://docs.getunblocked.com/unblocked-mcp/mcp-overview.

Merged means completed; a request about what someone shipped is about merged PRs. A request about current work, like what I am reviewing, needs a status filter and no time range. An empty result can mean a wrong project name as easily as no matches, so check the name and status filter before reporting none. Results stop at about 50, so narrow the time range or status if you hit that.

It is done when the answer gives the filtered list with a link for each item, the filters used, and whether the list may be incomplete.
