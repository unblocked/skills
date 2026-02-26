# Task Decomposition Guide

How to break a task into units for multi-agent execution.

---

## Decomposition Principles

### 1. Decompose by System Boundary

Follow system boundaries — API, UI, data layer, infrastructure. Each is naturally independent.

**Good:** Unit A: API endpoint, Unit B: UI page, Unit C: DB migration.
**Bad:** Unit A: happy path, Unit B: error handling, Unit C: tests. (Massive overlap.)

### 2. Minimize Overlap

Units should touch different files. If two must modify the same file, define exactly which sections each owns.

### 3. Define Interfaces at Plan Time

If units interact (API serves data, UI consumes), define the interface before implementation:
```
Interface: Notification Preferences API
Endpoint: GET /api/users/:id/preferences
Response: { email: boolean, sms: boolean, push: boolean }
```

### 4. Dependency-Ordered Execution

Map dependencies explicitly:
```
Migration (first)
    ├──► API (needs schema)
    └──► Background job (needs schema)
              └──► UI (needs API)
```

---

## Process

1. **List all changes** — what files/systems will the task touch?
2. **Group by boundary** — API, UI, data, infrastructure
3. **Check independence** — different files? Implementable alone? Testable alone?
4. **Define interfaces** — data flow, contracts, types between groups
5. **Map dependencies** — parallel vs. serial, critical path
6. **Validate with Unblocked** — `unblocked_context_engine` for component dependencies, `historical_context` for prior multi-part changes

---

## Common Patterns

**Frontend + Backend** — Define API contract in plan. UI mocks until API ready. Parallel.

**Migration + Service + Consumer** — Strictly serial. Each depends on previous.

**Feature Flags + Implementation** — Flag first, then implementation behind it.

**Parallel Services** — Independent services, no shared state. Fully parallel.

---

## Red Flags

**Too many units:** >4-5 units means coordination overhead exceeds parallelism benefit.

**Circular dependencies:** A depends on B, B depends on A — decomposition is wrong.

**Shared mutable state:** Two units read/write same state — can't safely parallelize.

**Vague boundaries:** Can't state which files each unit touches — not clean enough.
