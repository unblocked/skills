# Query Cookbook

Concrete query examples organized by scenario. Each query includes real identifiers and enough context for the tool to route effectively.

## Investigating a Bug

```
Why does PaymentProcessor.charge() silently swallow the StripeCardError exception?
```
```
What recent PRs changed the retry logic in order-service's fulfillment pipeline?
```
```
Are there any known issues or incidents related to race conditions in SessionManager.refresh()?
```
```
Investigate why the payment webhook handler in billing-service drops events when Stripe sends retries within 5 seconds of each other. Include recent PRs, any related Slack discussions, and the deduplication logic in WebhookProcessor.
```

## Understanding Architecture

```
How does the event-bus module route messages between inventory-service and shipping-service?
```
```
What is the DataPipelineOrchestrator class and how does it coordinate the ETL stages?
```
```
Explain how the event-driven order fulfillment pipeline works across order-service, inventory-service, and shipping-service, including the message contracts, retry semantics, and any recent architectural changes or RFCs.
```
```
Map the end-to-end data flow of the search indexing pipeline from CatalogChangeEvent through to Elasticsearch, including which services transform the data and where backpressure is applied.
```

## Checking Conventions

```
What conventions does the team follow for error handling in the GraphQL resolver layer?
```
```
How are feature flags structured and toggled in the frontend React app?
```
```
What naming and directory conventions does the team use for database migration files?
```

## Finding Prior Decisions

```
What PR or Slack discussion explains why we moved from REST to gRPC for inter-service calls?
```
```
Was there a rejected proposal for adding caching to the SearchService query path?
```
```
What doc or discussion covers the decision to pin Node 18 instead of upgrading to 20?
```

## Planning & Scoping

```
Research the migration path from React Router v5 to v6 in the web-client repo, including compatibility concerns with our custom route guards in AuthenticatedRoute, prior team discussions, and any abandoned PRs that attempted this before.
```
```
Map everything that depends on the LegacyUserProfile model — which services read from it, which write to it, what API contracts expose its fields, and whether there are existing plans or discussions about replacing it.
```
```
Assess the risk of removing the legacy sync path in DataExportJob. Identify which downstream consumers still rely on synchronous exports, what monitoring exists, and whether there are recent Slack threads or Jira issues about deprecation timelines.
```

## Incident Investigation

```
Research what caused the elevated error rates in checkout-service between March 10-12. Include recent deployments, any related Slack incident threads, config changes, and whether similar incidents have occurred before.
```
```
Has the "connection reset" error in DatabasePool.acquire() been seen before? What was the root cause?
```
```
What recent changes touched the timeout configuration in NotificationDispatcher?
```

## Validating a Plan

```
Has anyone previously attempted to extract the notification logic from UserService into its own module?
```
```
Are there existing helpers or shared utilities for retry-with-backoff in the monorepo?
```
```
Does the team use a shared base class or mixin for API controllers, or does each controller stand alone?
```

## Jira Lookups

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

## Slack Lookups

```
Summarize the #incident-response channel from the last 24 hours.
```
```
Find messages mentioning "deployment rollback" in #devops this week.
```
```
Show me the thread in #backend-eng about the database migration.
```

## PR Lookups

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

- **"completed" / "finished"** — maps to *resolved date* (Jira) or *merged status* (PRs), not created date.
- **"working on" / "in progress"** — maps to a *status filter* (open, InProgress). Do not add a time range.
- **"last N PRs"** — maps to a *limit*, not a time filter. "My last 5 PRs" = most recent 5 by me.
- **"me" / "my" / "I"** — use `me` for the current user. Use actual names only for other people.
- **Single-day queries** — "on Monday" means start-of-day to end-of-day for that date.

## Bad vs Good

| Bad | Why | Good |
|:---|:---|:---|
| `auth` | Keyword, no question | `How does AuthService.validateToken() verify JWTs and handle expiration?` |
| `gradle upgrade` | Too vague | `Research the Gradle 8.x upgrade path for the Android monorepo, including plugin compatibility and prior attempts.` |
| `PROJ-123` (bare ID) | Tool needs natural language | `Show me the details of PROJ-123.` |
| `What's happening in Slack?` | No channel, timeframe, or filter | `Summarize #platform-eng from the last 3 days.` |
| `Find my PR about auth` | Vague | `Find my open PRs in the auth-service repo.` |
| `Issues from last week` | Missing project or assignee | `What issues did I complete last week in the PAYMENTS project?` |
| `why is this slow` | No entity or context | `Explain why SearchIndexer.reindexAll() degrades on catalogs with 100k+ items.` |

## Splitting into Parallel Queries

One broad query dilutes ranking. Split unknowns into focused queries and run them in parallel.

**Bad — one umbrella query:**
```
How does auth work and what are the rate limiting conventions?
```

**Good — two parallel queries:**
```
How does AuthService.validateToken() verify JWTs and handle expiration?
```
```
What conventions does the team follow for rate limiting middleware in the API gateway?
```
