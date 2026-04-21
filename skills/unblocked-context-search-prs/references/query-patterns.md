# PR Query Patterns

Query examples for `context_search_prs`, organized by use case.

## Good vs. Bad Queries

| Bad | Why | Good |
|:---|:---|:---|
| `retry logic` | Keyword, no question | `What PR introduced the retry-with-backoff logic in order-service?` |
| `auth refactor` | Too vague | `What was the reasoning behind switching from session cookies to JWT tokens?` |
| `rate limiting` | No entity | `What PR added rate limiting to the API gateway and what approach was chosen?` |
| `PaymentProcessor` | Bare class name | `What PRs changed PaymentProcessor.charge() in the last year and why?` |
| `Find everything about orders` | Too broad | `What PR introduced the idempotency key check in the order creation flow?` |
| `pagination` | No question | `Were there any rejected approaches to cursor-based pagination in the billing-service REST API?` |

## Tracing a Change Back to Its PR

Use when you can see behavior in the code and want to understand why it was introduced.

```
What PR introduced the retry-with-backoff logic in order-service's fulfillment pipeline?
```
```
Which PR added the idempotency key check to the payment webhook handler in billing-service?
```
```
What change introduced the 30-second timeout on DatabasePool.acquire() — was it deliberate?
```
```
Find the PR that switched the API gateway from REST to gRPC for inter-service calls.
```

## Finding Prior Decisions and Reasoning

Use when you know what the code does but want to understand why it was built that way.

```
What was the reasoning behind switching from session cookies to JWT tokens in the auth service?
```
```
Why does the fulfillment pipeline use a polling loop instead of an event subscription for inventory checks?
```
```
What constraints led to the current rate limiting approach in the API gateway?
```
```
Was the decision to use optimistic locking in OrderService.update() documented anywhere?
```

## Finding Rejected Approaches

Use when you want to avoid re-proposing something the team already considered and declined.

```
Were there any rejected approaches to cursor-based pagination in the REST API?
```
```
Has anyone previously attempted to extract the notification logic from UserService into its own service?
```
```
Was there a proposal to add Redis caching to the SearchService query path that was rejected?
```
```
Did the team consider using a saga pattern before settling on the current two-phase commit in checkout?
```

## Bug Archaeology

Use when investigating a regression or unexpected behavior and you want PR-based change history.

```
What PRs changed the authentication flow in the last 3 months — looking for what might have introduced a token expiry bug?
```
```
Which PR changed the timeout configuration in NotificationDispatcher?
```
```
Find PRs that modified the rate limiting logic around the time the throughput issues began in Q4.
```
```
What was the last PR to touch SessionManager.refresh() before the race condition was reported?
```

## Understanding Architectural Evolution

Use when you want to see how a component or pattern developed over time through PRs.

```
How has the payment webhook handling in billing-service evolved across PRs?
```
```
What PRs shaped the current event-driven architecture in the order fulfillment pipeline?
```
```
Find PRs that discuss the tradeoffs of the current database sharding strategy.
```
```
How did the API versioning strategy develop — were there earlier approaches tried and abandoned?
```

## Using `instruction` for Fine-Grained Control

The `instruction` parameter shapes which results surface without changing what is searched. Use it when default ranking would pull in noise.

**Scope to specific repos:**
```
instruction: "Focus results on billing-service and payments-service; deprioritize web-client"
```

**Prefer recent PRs:**
```
instruction: "Focus on PRs merged in the last 6 months; deprioritize older history"
```

**Prefer merged over open/draft:**
```
instruction: "Prefer merged PRs; deprioritize drafts and abandoned branches"
```

**Surface substantive discussions:**
```
instruction: "Prefer PRs with detailed descriptions or review discussions over one-line PRs"
```
