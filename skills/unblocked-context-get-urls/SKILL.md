---
name: unblocked-context-get-urls
description: "Use when you have a link to a PR, issue, doc, Slack thread, or ticket and need its full content, including private pages. No link yet: research."
---

Call the context_get_urls MCP tool to read links the user pasted or that a search returned. It resolves private pages that a plain web fetch cannot, such as Jira, Linear, Slack, Notion, Confluence, Google Docs, and private GitHub PRs and issues.

Pass urls as one string with one URL per line, and batch related links into one call. Set verbose to "true" when you need PR diffs or issue comments. The tool's description lists the URL patterns your org supports; a link outside those patterns is not connected, so say so instead of calling. For a public page no pattern covers, use a normal web fetch.

Without MCP, run `unblocked context-get-urls --urls <url> [<url> ...]`; `unblocked context-get-urls --help` lists the supported patterns. If neither the MCP tool nor the CLI exists, stop and tell the user Unblocked is not set up here and link https://docs.getunblocked.com/unblocked-mcp/mcp-overview.

Content is the live state at fetch time, so statuses may differ from earlier search results. An empty result usually means that source is not connected for this user; report that rather than guessing at the content.

It is done when each link is either summarized from its fetched content or reported as unsupported or empty.
