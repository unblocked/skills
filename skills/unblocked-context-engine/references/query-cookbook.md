# Query Cookbook

Concrete query examples organized by scenario. Each query targets one entity and includes real identifiers.

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

## Understanding Architecture

```
How does the event-bus module route messages between inventory-service and shipping-service?
```
```
What is the DataPipelineOrchestrator class and how does it coordinate the ETL stages?
```
```
What design doc or PR explains why we chose CQRS for the billing domain?
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

## Validating a Plan

```
Has anyone previously attempted to extract the notification logic from UserService into its own module?
```
```
Are there existing helpers or shared utilities for retry-with-backoff in the monorepo?
```
```
What test patterns does the team use for integration tests that hit the Postgres database?
```

## Validating Generated Code

```
Does the error handling pattern in OrderController follow the team's conventions for REST endpoint error responses?
```
```
Is there an existing retry utility in the monorepo that we should use instead of implementing retry logic in PaymentClient?
```
```
Does the team use a shared base class or mixin for API controllers, or does each controller stand alone?
```

## Pre-Modification Understanding

```
Why does UserService.deactivate() soft-delete instead of hard-delete? Is there a compliance or audit requirement driving this?
```
```
What is the contract that downstream consumers expect from the CatalogChangeEvent payload?
```
```
Why does the CircuitBreaker in external-api-client use a 30-second window instead of the typical 60-second default?
```

## Debugging

```
Has the "connection reset" error in DatabasePool.acquire() been seen before? What was the root cause?
```
```
What recent changes touched the timeout configuration in NotificationDispatcher?
```
```
Are there known edge cases in BatchProcessor.flush() when the queue exceeds 10,000 items?
```

## Decomposing into Parallel Queries

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
