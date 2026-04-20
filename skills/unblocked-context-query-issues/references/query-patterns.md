# Issue Query Patterns (Structured)

Query examples for `context_query_issues`, organized by use case. These are structured, filtered enumerations — complement `context-search-issues` (semantic matching) with project/user scoping.

## Good vs. Bad Queries

| Bad | Why | Good |
|:---|:---|:---|
| `bugs` | No list intent, no filter | `List open bugs in the PAY project` + `--projects PAY` |
| `Alice's stuff` | Vague, no project | `Show in-progress issues assigned to Alice in PAY` + `--projects PAY --user-name "Alice Smith"` |
| `what I did` | Missing time window | `List issues I completed last week in the INFRA project` + `--projects INFRA` |
| `payments issues` | No status/time scope | `List open issues created in the last 30 days for the payments team` + `--projects PAY` |
| `sprint` | No project or cadence | `List issues in the current sprint for the payments team` + `--projects PAY` |

## Enumerating Work by Person

Use when you want a definitive list of what someone is doing or has done, scoped to a project.

```
query: "List issues currently assigned to me that are in-progress"
projects: ["PAY"]
```
```
query: "Show issues assigned to Alice that are open or in-progress"
user-name: "Alice Smith"
projects: ["PAY", "BILLING"]
```
```
query: "List issues I resolved last week"
projects: ["INFRA"]
```
```
query: "Show tickets Bob filed this month in Linear"
user-name: "Bob Jones"
```

## Status-Filtered Enumerations

Use for dashboards, standups, and scope checks.

```
query: "List all open bugs with priority high or critical"
projects: ["PAY"]
```
```
query: "Show in-progress issues for the current sprint"
projects: ["PAY"]
```
```
query: "List issues marked as blocked or on-hold"
projects: ["INFRA", "PAY"]
```
```
query: "Enumerate issues resolved in the last 2 weeks"
projects: ["PAY"]
```

## Filtering by Component or Label Within a Project

Put component/label constraints in the query; projects scope the overall search.

```
query: "List open issues labeled 'billing' in the PAY project"
projects: ["PAY"]
```
```
query: "Show bugs affecting the webhook-handler component"
projects: ["PAY"]
```
```
query: "List issues tagged as P0 or P1"
projects: ["INFRA"]
```

## Activity Windows

Time filters go in the query text. Remember: "completed" uses *resolved date*, not created.

```
query: "Show issues I opened since Monday"
projects: ["PAY"]
```
```
query: "List issues resolved in the last 7 days by the payments team"
projects: ["PAY"]
```
```
query: "Enumerate issues created last quarter that are still open"
projects: ["PAY"]
```

## Multi-Project Queries

Pass multiple projects with `--projects`. Useful for cross-team rollups.

```
query: "List open critical bugs across platform services"
projects: ["PAY", "BILLING", "INFRA"]
```
```
query: "Show issues assigned to Alice that are open"
user-name: "Alice Smith"
projects: ["PAY", "BILLING"]
```

## Using `user-name` Correctly

`user-name` resolves an actual person. For "me" / "my" / "I", keep `me` inside the query string.

**Right:**
```
query: "List issues I'm currently working on"
projects: ["PAY"]
```
```
query: "Show issues assigned to Alice"
user-name: "Alice Smith"
```

**Wrong:**
```
user-name: "me"   # won't resolve — put `me` in the query instead
```
