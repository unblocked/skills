# PR Query Patterns (Structured)

Query examples for `context_query_prs`, organized by use case. These are structured, filtered enumerations — complement `context-search-prs` (semantic matching) with repo/user scoping.

## Good vs. Bad Queries

| Bad | Why | Good |
|:---|:---|:---|
| `PRs` | No list intent, no filter | `List open PRs in payments-service` + `--projects payments-service` |
| `Alice's PRs` | No status/time | `Show PRs authored by Alice in the last 30 days` + `--user-name "Alice Smith"` |
| `what shipped` | Missing repo and time | `List PRs merged last week in payments-service` + `--projects payments-service` |
| `review queue` | No repo anchor | `List open PRs in payments-service waiting on review` + `--projects payments-service` |
| `my drafts` | Conflates "me" with filter | `List draft PRs I authored` (keep `me` in the query) |

## Enumerating Work by Person

```
query: "List open PRs I authored"
projects: ["payments-service"]
```
```
query: "Show PRs authored by Alice in the last 30 days"
user-name: "Alice Smith"
projects: ["payments-service", "web-client"]
```
```
query: "List PRs merged by Bob this sprint"
user-name: "Bob Jones"
projects: ["payments-service"]
```
```
query: "Show PRs where I am a requested reviewer and status is open"
projects: ["payments-service", "web-client"]
```

## Status-Filtered Enumerations

Use for standups, release notes, and triage.

```
query: "List all open PRs in payments-service"
projects: ["payments-service"]
```
```
query: "Enumerate PRs merged in the last 7 days"
projects: ["payments-service"]
```
```
query: "Show draft PRs authored by the payments team"
projects: ["payments-service"]
```
```
query: "List closed/unmerged PRs from the last month to triage follow-ups"
projects: ["payments-service"]
```

## Release-Notes / Changelog Support

```
query: "List PRs merged into main between 2025-04-01 and 2025-04-14"
projects: ["payments-service"]
```
```
query: "Enumerate merged PRs tagged as breaking-change"
projects: ["payments-service"]
```
```
query: "Show merged PRs that touched the webhook-handler module in the last 2 weeks"
projects: ["payments-service"]
```

## Review Queue / Waiting On Me

```
query: "List PRs where I am the requested reviewer and status is open"
projects: ["payments-service", "web-client"]
```
```
query: "Show PRs I authored that are waiting on review"
projects: ["payments-service"]
```
```
query: "Enumerate PRs with changes requested that I authored"
projects: ["payments-service"]
```

## Multi-Repo Rollups

Pass multiple repos with `--projects`. Useful for team-wide rollups.

```
query: "List open PRs across the payments platform services"
projects: ["payments-service", "billing-service", "subscriptions-service"]
```
```
query: "Show PRs merged last week across frontend repos"
projects: ["web-client", "mobile-web", "admin-ui"]
```

## Using `user-name` Correctly

`user-name` resolves an actual person. For "me" / "my" / "I", keep `me` inside the query string.

**Right:**
```
query: "List PRs I authored that are still open"
projects: ["payments-service"]
```
```
query: "Show PRs authored by Alice"
user-name: "Alice Smith"
```

**Wrong:**
```
user-name: "me"   # won't resolve — put `me` in the query instead
```
