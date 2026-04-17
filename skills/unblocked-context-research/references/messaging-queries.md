# Messaging Queries

Queries for searching and summarizing messaging platform channels and threads.

## What to Expect

Responses come in two modes:

- **Summary mode**: A narrative overview of channel activity or thread discussion — use for "what's been happening" questions.
- **Data mode**: Specific messages matching your criteria — use for finding particular discussions or quotes.

If you get the wrong mode, re-query specifying the other.

## Example Queries

```
Summarize the #incident-response channel from the last 24 hours.
```
```
Find messages mentioning "deployment rollback" in #devops this week.
```
```
Show me the thread in #backend-eng about the database migration.
```

## Supported Query Types

| Query Type | Example |
|:---|:---|
| Channel summary | `Summarize #platform-eng from the last 3 days.` |
| Channel search | `Find messages mentioning "deployment rollback" in #devops this week.` |
| Thread summary | `Summarize the thread in #backend-eng about the database migration.` |
| Thread data | `Show me the full thread in #backend-eng about the database migration.` |

## Filter Notes

- Always include a **channel name** — queries without one scatter results.
- Include a **time range** for activity windows ("last 24 hours", "this week").
- **Filtering criteria** describes what content to include (e.g., "messages containing 'deployment'"), not formatting or sorting.
