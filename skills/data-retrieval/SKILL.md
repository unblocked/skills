---
name: data-retrieval
description: >
  Targeted record retrieval via data_retrieval for Jira issues, Slack
  channels/threads, and pull requests. Use when the agent needs to look up
  specific items (PROJ-123, PR #42, #devops channel), query activity ("what did
  X work on last week"), check status ("open PRs in repo Y"), or pull filtered
  lists (bugs in project Z, messages mentioning deployments). Also use when you
  know which data source has the answer and want a direct lookup instead of a
  broad search. Encodes filter semantics, query shaping, and when a different
  tool is a better fit.
---

# Data Retrieval

Calls `data_retrieval` for targeted record lookups — fetching Jira issues, Slack channel/thread content, and pull requests using structured filters. Lower latency than broad research tools, and returns the actual records rather than a synthesized summary.

## Gotchas

- **Using data_retrieval for knowledge discovery** — this tool retrieves *records*, not guidance. For "how to", best practices, or exploratory questions, use `unblocked_context_engine` or `research_task`.
- **Confusing "completed" date semantics** — "completed" uses *resolved date* (Jira) or *merged status* (PRs), not created date. "Issues I completed last week" = resolved by me in that range.
- **Using filtered queries for known items** — if you have a specific identifier (issue key, PR number), do a single-item lookup. Don't construct a filter query to find something you already have.
- **Using time filters for current status** — "what am I working on" = status filter (open/InProgress), no time range. Time filters are for activity windows ("last week", "since Monday").
- **Not using "me" for self-references** — when the user says "I"/"my"/"me", pass `"me"` as the user reference. Use actual names only for other people.
- **Vague Slack filtering criteria** — filtering describes *what content to include* (e.g., "messages containing 'deployment'"), not formatting or sorting. Use summary mode for overviews; data mode for specific lookups.

## Input

```text
query: A natural-language question including relevant names, date ranges, repositories, statuses, or identifiers.
```

Include the most specific details you have — project keys, channel names, repo names, date ranges, statuses. The tool maps natural language to structured filters, so concrete details produce better results than vague requests.

## Data Sources

| Source | Lookup Types | Key Filters |
|:---|:---|:---|
| Jira | Single issue, filtered lists, by epic/board/sprint/label | project, status, assignee/creator, date ranges, label |
| Slack | Channel summary/data, thread summary/data | channel name, date range, content criteria |
| PRs | Single PR, filtered lists | author, status, repository, time range, limit |

## When to Skip

- Question is about *how* or *why*, not *what happened* — use `unblocked_context_engine`.
- Need a synthesized investigation across multiple sources — use `research_task`.
- Already have the exact URL — use `link_resolver`.
- Need a timeline or decision narrative — use `unblocked_context_engine`.

## Interpreting Results

- Mine identifiers from results (issue keys, PR numbers, author names) for follow-up queries or narrower tool calls.
- For Slack, distinguish summary vs data mode — if you got the wrong mode, re-query with the other.
- Say explicitly when results are empty or sparse so the user knows to adjust filters.

## Reference

See `references/query-cookbook.md` for example queries and filter semantics.
