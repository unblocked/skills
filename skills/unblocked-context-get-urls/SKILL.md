---
name: unblocked-context-get-urls
description: >
  Direct URL content resolution via context_get_urls. Use this to fetch
  full content from one or more URLs the agent already has in hand —
  PRs, issues, docs, Slack messages, or arbitrary web pages that were
  surfaced by a prior search or provided by the user. TRIGGER when: you
  already have concrete URLs from a previous context_research /
  context_search_* result and want the full body, not just the title and
  URL; the user pasted one or more links and wants them summarized or
  analyzed; you need to resolve a Jira/Linear/PR/Slack link directly.
  DO NOT TRIGGER when: you need to search for content (use
  context_research or the context_search_* family); the URL is local
  (localhost, file://, private network) — those aren't reachable.
---

# Unblocked Context Get URLs

Direct URL resolution. Calls `context_get_urls` with one or more URLs to return their full content — bypassing semantic search when the agent already knows exactly which documents it wants.

**Sources:** any URL reachable through Unblocked's configured connectors (PRs, issues, docs, messages) and arbitrary public web pages.

## How to Invoke

Run `command -v unblocked` once per session and cache the result. `context_get_urls` is one of the two tools that IS exposed on MCP, so both paths work — prefer the CLI when available. See `unblocked-tools-guide` for full routing rules.

**CLI (preferred):**
```
unblocked context-get-urls --urls "<url1>" "<url2>" ...
```

**MCP fallback** (use if CLI is confirmed unavailable): call `context_get_urls` with `urls` as an array. Exposed on MCP in virtually all environments.

**If neither is available:** stop and tell the user Unblocked is not configured in this environment (see `unblocked-tools-guide` for the full message). Do not substitute with a generic web-fetch tool for private connector resources (Jira, Linear, Slack, private GitHub) — those require Unblocked's auth.

## When This Adds Value Over a Plain Web Fetch

- **Private-system URLs resolve properly** — Jira tickets, Linear issues, Slack threads, and private GitHub PRs require the org's auth; a plain web fetcher gets an empty page or a login redirect
- **Uniform content shape** — results come back in a consistent text form regardless of source type
- **Batching** — pass multiple URLs in one call when you need to resolve a cluster of references

If the URL is truly public (a blog post, public docs) and you don't need auth, a plain fetch also works — but this tool handles both cases.

## When to Use This vs. a Search Tool

| Situation | Use |
|:---|:---|
| User pasted 2 Jira links and asked "summarize these" | `context-get-urls` |
| Prior `context_research` returned 5 PR URLs and you want their full bodies | `context-get-urls` |
| You want to find PRs related to rate limiting | `context-search-prs` (or `context-research`) |
| You want to understand *why* a change was made, with supporting citations | `context-research`, then `context-get-urls` on the top result |
| You need to re-open a specific known link and act on its content | `context-get-urls` |

`context-get-urls` is a **follow-up** tool. Search first, then resolve the most relevant URLs if the titles + snippets aren't enough.

## Input

| Parameter | Required | Description |
|:---|:---|:---|
| `urls` | Yes | One or more URLs to retrieve content from. CLI accepts multiple space-separated values: `--urls <url1> <url2>`. MCP expects an array. |

**Good inputs:**

- Jira: `https://acme.atlassian.net/browse/PAY-1234`
- Linear: `https://linear.app/acme/issue/ENG-567`
- GitHub PR: `https://github.com/acme/payments-service/pull/89`
- GitHub issue: `https://github.com/acme/payments-service/issues/42`
- Slack thread: `https://acme.slack.com/archives/C0123/p1712345678`
- Confluence/Notion: direct page URLs
- Public web pages

**Bad inputs (will fail or return nothing useful):**

- `localhost`, `127.0.0.1`, private network addresses
- `file://` URLs
- Malformed URLs or URLs missing the scheme (`http://`/`https://`)
- Session-scoped URLs that require the user's browser state

## Checking Supported URL Patterns

The exact set of supported URL patterns is **org-specific** — it depends on which connectors (GitHub orgs, Jira/Linear workspaces, Slack, Notion, etc.) have been configured for the current user. Before assuming a URL will resolve, inspect the live list of patterns from the tool itself:

1. **CLI (preferred):** run `unblocked context-get-urls --help`. The output includes a "Supported URL patterns" section listing every regex that the current installation accepts (e.g. which GitHub orgs are wired up, which Slack workspace, which Jira/Linear/Notion hosts).
2. **MCP fallback:** inspect the `context_get_urls` tool description exposed by the MCP server. The same per-org pattern list is embedded in the tool's description field, so `tools/list` (or the equivalent in the agent's MCP client) will surface it.

If a user-supplied URL doesn't match any listed pattern, either the connector isn't configured or the URL belongs to a different org/tenant — stop and tell the user instead of calling the tool and getting an empty result.

## Batching

When you have a related cluster of URLs, pass them all in one call rather than making one call per URL. Example: the top 3 PRs returned from a `context-research` pass.

```
unblocked context-get-urls \
  --urls "https://github.com/acme/payments-service/pull/89" \
         "https://github.com/acme/payments-service/pull/91" \
         "https://acme.atlassian.net/browse/PAY-1234"
```

Keep batches reasonably sized (roughly 5–10 URLs); very large batches can time out or exceed output limits.

## Interpreting Results

- Content reflects the current state of the URL at resolution time — for PRs and issues this is the live state, not a snapshot
- For PRs, you'll typically get the description and comments — not the diff; pair with Grep/Read or `gh pr diff` locally if you need the change
- For Jira/Linear, you'll get the issue body and comments — statuses may have moved since any earlier search
- If a URL resolves to an empty or auth-gated page, the connector for that source may not be configured — tell the user rather than guessing

## When to Skip

- You don't have the URL yet — use a search tool first
- The URL is local or on a private network — this tool can't reach it
- You only need a one-line summary already visible in search results — don't re-fetch

## Reference

No separate references directory — usage is narrow enough that this SKILL.md is self-contained.
