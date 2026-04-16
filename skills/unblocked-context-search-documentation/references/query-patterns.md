# Documentation Query Patterns

Query examples for `context_search_documentation`, organized by use case.

## Good vs. Bad Queries

| Bad | Why | Good |
|:---|:---|:---|
| `setup` | Keyword, no question | `Is there a local development setup guide for billing-service?` |
| `rate limiting` | Too vague | `Is the rate limiting configuration for the API gateway documented?` |
| `event schema` | No question | `Where is the OrderCreatedEvent payload schema documented?` |
| `deployment` | No entity | `Is there a runbook for deploying checkout-service to production?` |
| `auth` | Bare keyword | `Is there documentation explaining how JWT token refresh works in the auth service?` |
| `onboarding` | No context | `Is there an onboarding guide for new engineers joining the payments team?` |

## Setup and Configuration

Use when you need instructions to run or configure something locally or in a specific environment.

```
Is there a local development setup guide for billing-service?
```
```
Is the environment variable configuration for the API gateway documented?
```
```
Find documentation for setting up the test database seeding scripts.
```
```
Is there a guide for configuring the feature flag service in a local environment?
```

## Runbooks and Operational Procedures

Use when you need step-by-step guidance for deployments, incidents, or operational tasks.

```
Is there a runbook for deploying checkout-service to production?
```
```
Find the on-call runbook for handling elevated error rates in the payments pipeline.
```
```
Is there a documented rollback procedure for the billing-service database migrations?
```
```
Find the incident response playbook for outages in the order fulfillment pipeline.
```

## API Contracts and Event Schemas

Use when you need the documented shape of an API, event payload, or data contract.

```
Where is the OrderCreatedEvent payload schema documented?
```
```
Is there API reference documentation for the billing-service webhook endpoints?
```
```
Find the documented contract for the gRPC interface between inventory-service and shipping-service.
```
```
Is the LegacyUserProfile model's field definitions documented anywhere?
```

## Architecture Docs and ADRs

Use when you want to understand a design decision, system structure, or architectural rationale.

```
Is there an architecture decision record explaining the move to an event-driven design?
```
```
Find documentation describing the overall architecture of the order fulfillment pipeline.
```
```
Is there an ADR for why the team chose optimistic locking over pessimistic locking in OrderService?
```
```
Is the database sharding strategy for the payments system documented?
```

## Onboarding and Team Guides

Use when you need orientation material for a service, team, or codebase area.

```
Is there an onboarding guide for new engineers joining the payments team?
```
```
Find documentation that explains the overall structure of the billing-service codebase.
```
```
Is there a guide explaining the team's branching and PR review conventions?
```
```
Find the getting-started documentation for contributing to the web-client repo.
```

## Using `instructions` for Fine-Grained Control

The `instructions` parameter shapes which results surface without changing what is searched. Use it when default ranking would pull in noise.

**Prefer operational docs:**
```
instructions: "Prefer runbooks and operational guides over conceptual or reference docs"
```

**Prefer architecture and design docs:**
```
instructions: "Prefer ADRs and architecture decision records over README files and setup guides"
```

**Scope to a team or service:**
```
instructions: "Focus results on payments team documentation; deprioritize infrastructure docs"
```

**Prefer maintained docs:**
```
instructions: "Deprioritize docs marked as deprecated or archived"
```
