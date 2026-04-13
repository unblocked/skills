# Issue Tracker Queries

Queries for looking up and filtering issues in project trackers.

## What to Expect

Responses return **structured records**: issue key, title, status, assignee, priority, dates, and description. For filtered queries, expect a list of matching records. For single-issue lookups, expect full issue details including comments and linked items.

## Example Queries

```
What bugs are open in the PAYMENTS project?
```
```
Show me issues assigned to me that were completed last week.
```
```
What issues are in the current sprint for the Platform board?
```
```
What issues did I complete last week in the PAYMENTS project?
```

## Supported Query Types

| Query Type | Example |
|:---|:---|
| Single issue | `Show me the details of PROJ-123.` |
| Filtered list | `What bugs are open in the PAYMENTS project?` |
| By assignee | `What issues are assigned to me?` |
| By date range | `What issues did I complete last week?` |
| By sprint/board | `What issues are in the current sprint for the Platform board?` |
| By epic/label | `Show issues under the "Auth Rewrite" epic.` |

## Filter Notes

- **"completed"** uses *resolved date*, not created date. "Issues I completed last week" = resolved by me in that range.
- **"working on" / "in progress"** is a status filter (open/InProgress), not a time range.
- **"me"** for self-references. Use actual names only for other people.
