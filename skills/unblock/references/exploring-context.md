# Exploring Unfamiliar Code

Structured approach for building context when working in a codebase area you haven't
seen before. Use this alongside the main workflow (SKILL.md) to hydrate Phase 1 with
exploration-specific queries.

---

## Step 1: Architecture Discovery

Understand the high-level shape before diving into details.

- `unblocked_context_engine`: "What is the purpose of [system/repo]?"
- `unblocked_context_engine`: "What are the main components of [system] and how do they interact?"
- `unblocked_context_engine`: "What does [system] depend on and what depends on it?"
- `historical_context`: "Why was [system] designed this way? What alternatives were considered?"

### What to Capture

- System boundaries — what's in scope, what's external
- Key abstractions and their responsibilities
- Data flow through the system (entry point → processing → output)
- Integration points with other systems

---

## Step 2: Code Structure Mapping

Identify the landmarks in the code.

- `unblocked_context_engine`: "What are the main entry points for [system]?"
- `unblocked_context_engine`: "Where is the core business logic for [feature area]?"

### Key Files to Identify

- **Entry points**: where execution starts (routes, handlers, main functions)
- **Core logic**: where business rules live
- **Data layer**: models, schemas, database access
- **Config**: how the system is configured and what's tunable
- **Tests**: what's tested and how — reveals expected behavior and edge cases

---

## Step 3: Convention Detection

Understand how the team writes code in this area before writing your own.

- `unblocked_context_engine`: "What coding conventions does the team follow in [area]?"
- `unblocked_context_engine`: "What patterns does the team use for [error handling / testing / API design / etc.]?"
- `data_retrieval`: recent PRs in the area — review comments reveal enforced conventions

### Patterns to Look For

- Naming conventions (files, functions, variables, types)
- Error handling approach (exceptions, result types, error codes)
- Testing patterns (unit vs. integration, mocking strategy, test file organization)
- File organization (co-located tests, feature folders, layer-based structure)

---

## Step 4: Historical Decision Context

Understand why the code looks the way it does — not just what it does.

- `historical_context`: "What key decisions shaped [system]?"
- `historical_context`: "What technical debt exists in [area]? Are there known issues?"
- `historical_context`: "What was the original design intent for [component]?"

### What to Watch For

- ADRs (Architecture Decision Records) or design docs
- Rejected alternatives — knowing what was tried and abandoned saves time
- Known tech debt — areas flagged for refactoring that you shouldn't build on
- Recent direction changes — the code may be mid-migration between patterns

---

## Step 5: Find Domain Experts and Recent Contributors

Know who has context when questions arise during implementation.

- `data_retrieval`: most active contributors to the affected files/directories
- `unblocked_context_engine`: "Who are the experts on [system/area]?"
- `data_retrieval`: recent PR reviewers for the area — they know what's expected

---

## Example: Exploring a Notification System

**Exploration queries:**
```
unblocked_context_engine: "What is the notification system and how does it work?"
unblocked_context_engine: "What are the main components of the notification pipeline?"
unblocked_context_engine: "What patterns does the team use for async message processing?"
historical_context: "Why was the notification system designed with an event-driven architecture?"
historical_context: "What technical debt exists in the notification system?"
data_retrieval: recent PRs touching src/notifications/
```

**Context gathered:**
- Event-driven pipeline: event emitter → queue → dispatcher → channel adapters
- Three channel adapters: email (SendGrid), SMS (Twilio), push (Firebase)
- Team convention: all new channels implement the `NotificationChannel` interface
- Recent migration from synchronous to async dispatch (PR #890) — some legacy sync paths remain
- Known debt: retry logic is duplicated across adapters (ticket INFRA-234)
- Key contributors: @sarah (architecture), @mike (channel adapters)

**Ready to proceed:** With this context, hydration for the main workflow can focus on
the specific area being changed rather than re-discovering the system.
