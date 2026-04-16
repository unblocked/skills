# Messaging Query Patterns

Query examples for `context_search_messaging`, organized by use case.

## Good vs. Bad Queries

| Bad | Why | Good |
|:---|:---|:---|
| `rate limiting` | Keyword, no question | `Did the team discuss the rate limiting approach for the API gateway in Slack?` |
| `gRPC` | Too vague | `Was there a conversation about switching from REST to gRPC for inter-service calls?` |
| `auth` | No question | `What did the team discuss when planning the JWT token refresh refactor?` |
| `outage` | No entity | `Were there Slack discussions about the checkout-service outage in March?` |
| `pagination` | No context | `Did the team discuss tradeoffs of cursor-based vs offset pagination in the REST API?` |
| `who owns billing` | Too informal | `Are there conversations about who is responsible for billing-service on-call?` |

## Finding Team Decisions Made in Chat

Use when you know a decision was made but it isn't in docs, PRs, or issues.

```
Was there a conversation about switching from REST to gRPC for inter-service calls?
```
```
Did the team discuss and agree on a convention for error handling in the GraphQL resolver layer?
```
```
Were there Slack discussions about the decision to use optimistic locking in OrderService?
```
```
Was there a chat thread where the team decided on the current retry-with-backoff strategy?
```

## Incident and Outage Threads

Use when investigating an incident and you want the real-time discussion or post-mortem context.

```
Were there Slack discussions about the checkout-service outage in March?
```
```
Find the incident thread about elevated error rates in billing-service around Q4.
```
```
Was there a war-room discussion about the database connection pool exhaustion incident?
```
```
Find conversations about the duplicate webhook event issue in billing-service.
```

## Understanding Informal Context Around a Feature

Use when a feature has context that predates or surrounds its implementation.

```
What did the team discuss when planning the JWT token refresh refactor?
```
```
Were there conversations about the tradeoffs of the current rate limiting approach before it was built?
```
```
Did the team discuss any concerns about the two-phase commit design in checkout?
```
```
Find conversations about the LegacyUserProfile migration — what's the plan and who's involved?
```

## Finding Who Has Context on a Topic

Use when you need to know who to ask, not just what was said.

```
Who has been discussing the payments pipeline reliability issues recently?
```
```
Are there conversations that show who owns the API gateway rate limiting configuration?
```
```
Find threads about the SearchService performance issues — who has been investigating?
```
```
Who was involved in the discussion about replacing the legacy sync path in DataExportJob?
```

## Convention and Standards Discussions

Use when the team has discussed conventions informally that haven't been written up formally.

```
Did the team discuss naming conventions for database migration files anywhere in Slack?
```
```
Were there conversations about the preferred approach to feature flag evaluation in the frontend?
```
```
Did the backend team discuss standards for API versioning?
```
```
Find discussions about how services should handle idempotency for webhook processing.
```

## Using `instructions` for Fine-Grained Control

The `instructions` parameter shapes which results surface without changing what is searched. Use it when default ranking would pull in noise.

**Scope to specific channels:**
```
instructions: "Focus results on #payments-team and #backend-review; deprioritize general channels"
```

**Focus on recent discussions:**
```
instructions: "Focus on conversations from the last 3 months; deprioritize older threads"
```

**Prefer substantive threads:**
```
instructions: "Prefer threads with multiple participants and replies over one-off messages"
```

**Surface decision-oriented threads:**
```
instructions: "Prefer threads that include conclusions, decisions, or action items"
```
