# Issue Query Patterns

Query examples for `context_search_issues`, organized by use case.

## Good vs. Bad Queries

| Bad | Why | Good |
|:---|:---|:---|
| `race condition` | Keyword, no question | `Are there open issues about race conditions in SessionManager.refresh()?` |
| `retry` | Too vague | `Is there a ticket tracking improvements to retry behavior in order-service?` |
| `auth bug` | No entity | `Has the JWT token expiry issue in the API gateway been reported or tracked?` |
| `PaymentProcessor` | Bare class name | `Are there open bugs filed against PaymentProcessor.charge() failing silently?` |
| `pagination` | No question | `What issue or epic tracked the addition of cursor-based pagination to the REST API?` |
| `slow queries` | No context | `Are there performance issues filed against the SearchService query path?` |

## Checking Whether a Bug Is Already Known

Use when investigating a failure or unexpected behavior and you want to know if it's tracked.

```
Are there open issues about race conditions in SessionManager.refresh()?
```
```
Has the "connection reset" error in DatabasePool.acquire() been reported before?
```
```
Are there known issues with duplicate webhook events in billing-service when Stripe retries?
```
```
Is the JWT token expiry bug in the API gateway tracked anywhere?
```

## Finding the Requirement Behind a Feature

Use when you see code and want to understand the original intent or scope.

```
What issue or epic described the requirements for the cursor-based pagination feature?
```
```
Is there a ticket that explains why idempotency keys were added to the payment webhook handler?
```
```
What was the original requirement behind the rate limiting approach in the API gateway?
```
```
Find the issue that describes the expected behavior of the retry-with-backoff logic in order-service.
```

## Finding In-Progress or Planned Work

Use before starting something new to avoid duplicating work already underway.

```
Is there already an issue or epic tracking the migration away from LegacyUserProfile?
```
```
Are there open tickets for refactoring the notification logic out of UserService?
```
```
Is anyone working on adding Redis caching to the SearchService query path?
```
```
Are there planned issues for upgrading the API gateway from Node 18 to Node 20?
```

## Incident and Outage Context

Use when investigating an incident and you want to find related or prior issues.

```
Are there issues tracking the elevated error rates in checkout-service from March?
```
```
Have there been prior incidents related to timeout failures in NotificationDispatcher?
```
```
Find issues filed against the DataPipelineOrchestrator around ETL stage failures.
```
```
Are there open issues about the order fulfillment pipeline dropping events under load?
```

## Understanding Scope of a Change

Use before modifying something to understand whether related work exists.

```
What issues are open against the LegacyUserProfile model — is deprecation planned?
```
```
Are there any known limitations or filed issues with the current database sharding strategy?
```
```
Find issues that describe problems with the current feature flag evaluation in the frontend.
```
```
Are there open issues about the two-phase commit approach in the checkout flow?
```

## Using `instruction` for Fine-Grained Control

The `instruction` parameter shapes which results surface without changing what is searched. Use it when default ranking would pull in noise.

**Prefer open issues:**
```
instruction: "Prefer open or in-progress issues; deprioritize resolved or closed"
```

**Scope to a project or team:**
```
instruction: "Focus results on the payments project; deprioritize unrelated teams"
```

**Prefer bugs over tasks:**
```
instruction: "Prefer bug reports and incidents over feature requests and tasks"
```

**Surface high-priority items:**
```
instruction: "Prefer high-priority or critical issues over low-priority backlog items"
```
