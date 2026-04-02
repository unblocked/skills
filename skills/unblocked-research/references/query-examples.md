# Query Examples for research_task

## Good Queries by Scenario

**Investigating a bug:**
`Investigate why the payment webhook handler in billing-service drops events when Stripe sends retries within 5 seconds of each other. Include recent PRs, any related Slack discussions, and the deduplication logic in WebhookProcessor.`

**Understanding architecture:**
`Explain how the event-driven order fulfillment pipeline works across order-service, inventory-service, and shipping-service, including the message contracts, retry semantics, and any recent architectural changes or RFCs.`

**Evaluating an upgrade:**
`Research the migration path from React Router v5 to v6 in the web-client repo, including compatibility concerns with our custom route guards in AuthenticatedRoute, prior team discussions, and any abandoned PRs that attempted this before.`

**Assessing risk:**
`Assess the risk of removing the legacy sync path in DataExportJob. Identify which downstream consumers still rely on synchronous exports, what monitoring exists, and whether there are recent Slack threads or Jira issues about deprecation timelines.`

**Onboarding to an unfamiliar area:**
`Explain how the notification pipeline works end-to-end — from event emission through the queue to channel adapters (email, SMS, push). Include the key abstractions, which teams own which pieces, any recent migrations or known tech debt, and where the main configuration lives.`

**Investigating an incident:**
`Research what caused the elevated error rates in checkout-service between March 10-12. Include recent deployments, any related Slack incident threads, config changes, and whether similar incidents have occurred before.`

**Pre-refactor impact analysis:**
`Map everything that depends on the LegacyUserProfile model — which services read from it, which write to it, what API contracts expose its fields, and whether there are existing plans or discussions about replacing it.`

## Bad vs Good

| Bad | Good |
|:---|:---|
| `auth` | `Investigate how AuthService.refreshToken() handles concurrent refresh requests from multiple tabs, including the locking mechanism and recent bug fixes.` |
| `gradle upgrade` | `Research the Gradle 8.x upgrade path for the Android monorepo, including plugin compatibility with our custom lint rules, prior attempts in PRs, and any blocking issues raised by the build team.` |
| `why is this slow` | `Explain why SearchIndexer.reindexAll() degrades on catalogs with 100k+ items. Include profiling data from recent incidents, the batching strategy, and what changes the search team has discussed.` |
| `search pipeline` | `Map the end-to-end data flow of the search indexing pipeline from CatalogChangeEvent through to Elasticsearch, including which services transform the data and where backpressure is applied.` |
