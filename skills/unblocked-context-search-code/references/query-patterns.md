# Code Query Patterns

Query examples for `context_search_code`, organized by use case.

## Good vs. Bad Queries

| Bad | Why | Good |
|:---|:---|:---|
| `retry logic` | Keyword, no question | `Where is retry-with-backoff implemented across connected repos?` |
| `PaymentProcessor` | Bare class name | `How is PaymentProcessor.charge() implemented and which services call it?` |
| `auth middleware` | Too vague | `Find the JWT validation middleware used in the API gateway.` |
| `pagination` | No context | `How do connected repos implement cursor-based pagination in REST APIs?` |
| `Find everything about orders` | Too broad | `What services read from or write to the Order model?` |
| `rate limiting` | No entity | `Where is the rate limiting logic applied in the API gateway — is it a middleware or per-handler?` |

## Finding Implementations

Use when you know something exists but can't find it locally — it may live in another repo.

```
Where is the rate limiting middleware implemented? I see it referenced in the API gateway config but can't find the source.
```
```
Find the implementation of the retry-with-backoff utility referenced in order-service's fulfillment pipeline.
```
```
Where is the shared authentication token validation logic defined? Multiple services seem to use it.
```
```
Find the base controller class or mixin that API controllers in the platform extend.
```

## Finding Usages and Call Sites

Use when you want to know what consumes an interface, class, or function — especially across repos.

```
Which services call PaymentProcessor.charge() across connected repos?
```
```
What code depends on the LegacyUserProfile model — which repos read from or write to it?
```
```
Find all places that publish to the order.completed event topic across connected repos.
```
```
Which repos import or depend on the shared-utils library's date formatting helpers?
```

## Understanding Patterns Across Repos

Use when you want to know how a cross-cutting concern is handled consistently (or inconsistently) across the codebase.

```
How do connected repos implement cursor-based pagination in REST APIs?
```
```
How is feature flag evaluation handled across frontend repos — is there a shared client or does each implement its own?
```
```
How do services in the platform handle idempotency for webhook processing?
```
```
What patterns do connected repos use for database connection pooling and error retry?
```

## Locating Unfamiliar Code

Use when you encounter a reference in code or config and need to find the actual source.

```
Find the authentication middleware that the API gateway config references as 'auth-validator'.
```
```
Locate the DataPipelineOrchestrator class — I see it imported in several services but can't find the definition.
```
```
Find the schema definition for the OrderCreatedEvent that fulfillment-service consumes.
```
```
Where is the shared constants file that defines the MAX_RETRY_ATTEMPTS value used across services?
```

## Comparing Implementations

Use when you want to understand variation across repos before standardizing or refactoring.

```
How do billing-service and payments-service each handle Stripe webhook signature verification — are they consistent?
```
```
Do connected repos share a single HTTP client configuration or does each service define its own timeout and retry settings?
```
```
How does error serialization differ between the GraphQL and REST layers across connected repos?
```

## Using `instruction` for Fine-Grained Control

The `instruction` parameter shapes which results surface without changing what is searched. Use it when default ranking would pull in noise.

**Prefer entry points over tests:**
```
instruction: "Prefer interface definitions, entry points, and core implementations over test files and mocks"
```

**Scope to specific repos:**
```
instruction: "Focus results on billing-service and payments-service; deprioritize web-client"
```

**Filter file types:**
```
instruction: "Return only TypeScript source files; exclude generated code and vendor directories"
```

**Prefer recent or active code:**
```
instruction: "Deprioritize deprecated or archived modules"
```
