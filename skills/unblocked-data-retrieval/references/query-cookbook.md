# Query Cookbook for data_retrieval

## Good Queries by Source

**Jira:**
```
What bugs are open in the PAYMENTS project?
```
```
Show me issues assigned to me that were completed last week.
```
```
What issues are in the current sprint for the Platform board?
```

**Slack:**
```
Summarize the #incident-response channel from the last 24 hours.
```
```
Find messages mentioning "deployment rollback" in #devops this week.
```
```
Show me the thread in #backend-eng about the database migration.
```

**PRs:**
```
What PRs did I merge last week?
```
```
Show open PRs in the billing-service repo.
```
```
Get the details of PR #342 in the web-client repo.
```

## Filter Semantics Quick Reference

- **"completed" / "finished"** — maps to *resolved date* (Jira) or *merged status* (PRs), not created date. "Issues I completed last week" = issues resolved by me in that date range.
- **"working on" / "in progress"** — maps to a *status filter* (open, InProgress). Do not add a time range; status already captures currency.
- **"last N PRs"** — maps to a *limit*, not a time filter. "My last 5 PRs" = most recent 5 by me.
- **"me" / "my" / "I"** — pass `"me"` for the current user. Use actual names only when asking about other people.
- **Single-day queries** — "on Monday" means start-of-day to end-of-day for that date.

## Bad vs Good

| Bad | Why | Good |
|:---|:---|:---|
| `PROJ-123` (bare identifier, no question) | Tool needs natural language, not just an ID | `Show me the details of PROJ-123.` |
| `What's happening in Slack?` | No channel, no timeframe, no content filter | `Summarize #platform-eng from the last 3 days.` |
| `Find my PR about auth` | Vague — many PRs could match | `Find my open PRs in the auth-service repo.` |
| `Issues from last week` | Missing project, assignee, or status | `What issues did I complete last week in the PAYMENTS project?` |
