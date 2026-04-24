---
name: unblocked-context-search-issues
description: >
  Issue-only search across connected projects via context_search_issues. Use
  this instead of context_research when you want issue tracker results —
  bug reports, feature requests, tasks, and epics — without Slack, PR, or
  doc noise mixed in. TRIGGER when: investigating whether a bug is already
  known or tracked; finding the requirement or ticket behind a feature;
  checking if work is already planned or in progress; the user asks "is
  there an issue for this", "is this a known bug", "what ticket covers X",
  or "has this been reported before". DO NOT TRIGGER when: you need the
  current code state — use Grep/Glob/Read; you need Slack threads, PRs, or
  docs alongside issues — use context_research instead.
---

# Unblocked Context Search — Issues

Issue-only retrieval across connected projects. Calls `context_search_issues` with a natural-language query to semantically search bug reports, feature requests, and tasks — surfacing known work that code and PRs don't capture.

**Sources:** Jira, Jira Data Center, Linear, Asana, GitHub Issues.

## How to Invoke

**`context_search_issues` is CLI-only in most environments** — it does not appear in the MCP tool list even when fully available. Run `command -v unblocked` once per session and cache the result. Do not conclude the tool is unavailable from the MCP surface alone. See `unblocked-tools-guide` for full routing rules.

**CLI (preferred):**
```
unblocked context-search-issues --query "<your query>" [--instruction "<instruction>"]
```

**MCP fallback** (only if CLI is confirmed unavailable): fall back to `context_research` with `instruction: "Prefer issue tracker results; deprioritize code and messages"`.

**If neither is available:** stop and tell the user Unblocked is not configured in this environment (see `unblocked-tools-guide` for the full message). Do not substitute with other issue-search tools.

## When This Adds Value Over Grep/Read

Grep and Read show you what the code does now. Use this tool when:

- **You're investigating a bug** — checking whether it's already reported, tracked, or has a known root cause
- **You need requirement context** — the original intent behind a feature often lives in the issue, not the code
- **You want to avoid duplicate work** — finding in-progress or planned issues before starting something new
- **You want issue-only results** — `context_research` returns everything (Slack, PRs, docs, code); this returns only issues, so results stay focused when that's all you need

## When to Use `context_research` Instead

Use `context_research` when you need the full organizational picture alongside issues — PR discussions, Slack threads, design docs, or code history. This tool returns issues only; broader context requires `context_research`.

## Input

| Parameter | Required | Description |
|:---|:---|:---|
| `query` | Yes | What to find — write a complete question with concrete identifiers, not bare keywords. |
| `instruction` | No | Fine-grained control over which results surface: preferred projects, statuses, or issue types to prioritize or deprioritize. |

**Writing effective queries** — include the most concrete identifiers you have:

- Component, service, or module names (`billing-service`, `SessionManager`, `checkout flow`)
- Error messages or symptoms (`"connection reset"`, `timeout on acquire`, `duplicate webhook events`)
- Feature or epic names (`cursor pagination`, `JWT refresh`, `LegacyUserProfile migration`)
- Project or team names when you know them (`INFRA`, `payments team`, `web-client`)

Write a complete question or directive, not a keyword fragment:

| Instead of | Write |
|:---|:---|
| `race condition` | `Are there open issues about race conditions in SessionManager.refresh()?` |
| `retry logic` | `Is there a ticket tracking improvements to retry behavior in order-service?` |
| `auth bug` | `Has the JWT token expiry issue in the API gateway been reported or tracked?` |
| `pagination` | `What issue or epic tracked the addition of cursor-based pagination to the REST API?` |

**`instruction` examples:**
- `"Prefer open or in-progress issues; deprioritize closed/resolved"`
- `"Focus results on the payments project; deprioritize unrelated teams"`
- `"Prefer bug reports over feature requests"`

## Splitting Queries

Split distinct unknowns into separate `context_search_issues` calls rather than cramming everything into one query. Run them in parallel when the unknowns are independent.

**One query, two unknowns (diluted results):**
> Find issues about the race condition in SessionManager and also the pagination epic.

**Two parallel queries (focused results):**
> Query 1: Are there open issues about race conditions in SessionManager.refresh()?
>
> Query 2: What epic or issue tracked the cursor-based pagination feature in the REST API?

## When to Skip

- You need the current code state — use Grep/Glob/Read
- You also need Slack threads, PRs, or docs — use `context_research` instead

## Interpreting Results

- Results reflect issue state at query time — status may have changed; verify before acting on it
- Mine concrete identifiers (issue keys, project names, component names) from results and use them in follow-up queries
- Issue descriptions capture intent at time of filing; the implementation may have evolved — cross-reference against current code when needed
- If results are thin, re-query with a more specific symptom or component name extracted from the first pass

## Reference

- `references/query-patterns.md` — query examples organized by use case, with good/bad comparisons and `instruction` patterns
