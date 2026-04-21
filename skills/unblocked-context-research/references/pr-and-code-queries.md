# PR and Code Context Queries

Queries for PR lookups, bug investigation, architecture understanding, conventions, prior decisions, planning, and incident investigation.

## What to Expect

Responses vary by query complexity:

- **PR lookups**: Structured records — title, status, author, repo, dates, and description.
- **Single-entity questions** (bug, convention, decision): Ranked results from PRs, docs, code, and discussions with excerpts and citations.
- **Multi-entity research** (architecture, planning, incidents): Synthesized research briefs with narrative, citations, and cross-references across multiple sources.

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
Investigate why the payment webhook handler in billing-service drops events when Stripe sends retries within 5 seconds of each other. Include recent PRs, any related team discussions, and the deduplication logic in WebhookProcessor.
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
What PR or team discussion explains why we moved from REST to gRPC for inter-service calls?
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
Assess the risk of removing the legacy sync path in DataExportJob. Identify which downstream consumers still rely on synchronous exports, what monitoring exists, and whether there are recent message threads or issues about deprecation timelines.
```

## Incident Investigation

```
Research what caused the elevated error rates in checkout-service between March 10-12. Include recent deployments, any related incident threads, config changes, and whether similar incidents have occurred before.
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
