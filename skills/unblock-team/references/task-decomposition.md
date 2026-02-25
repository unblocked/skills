# Task Decomposition Guide

How to break a task into units suitable for multi-agent execution. Good decomposition
is the difference between effective parallelism and merge conflict hell.

---

## Decomposition Principles

### 1. Decompose by System Boundary

The best decomposition follows system boundaries — API, UI, data layer, infrastructure.
Each system is naturally independent and touches different files.

**Good decomposition:**
- Unit A: API endpoint for notification preferences
- Unit B: UI preferences page
- Unit C: Database migration for preferences table

**Bad decomposition:**
- Unit A: The "happy path" for notification preferences
- Unit B: Error handling for notification preferences
- Unit C: Tests for notification preferences

(The second decomposition has massive overlap — all units touch the same files.)

### 2. Minimize Overlap

Units should touch different files. If two units must modify the same file, define
exactly which sections each unit owns.

**Acceptable overlap:**
- Shared config file (each unit adds its own section)
- Shared index/barrel file (each unit adds its own export)

**Unacceptable overlap:**
- Same function modified by two units
- Same test file modified by two units without clear section ownership

### 3. Define Interfaces at Plan Time

If units need to interact (API serves data, UI consumes it), the interface must be
defined in the plan before implementation starts.

**The plan specifies:**
```
Interface: Notification Preferences API
Endpoint: GET /api/users/:id/preferences
Response: { email: boolean, sms: boolean, push: boolean }
Contract: Both API and UI implementers use this exact shape
```

This lets both implementers work in parallel against the same contract.

### 4. Dependency-Ordered Execution

Some units can't start until others finish. Map dependencies explicitly.

```
Migration (must complete first)
    ├──► API (depends on new schema)
    └──► Background job (depends on new schema)
              │
              ▼
         UI (depends on API being ready)
```

---

## Decomposition Process

### Step 1: List All Changes

What files/systems will the task touch?

### Step 2: Group by Boundary

Group changes by system boundary (API, UI, data, infrastructure, etc.).

### Step 3: Check Independence

For each group:
- Does it touch different files from other groups?
- Can it be implemented without the other groups being done?
- Can it be tested independently?

### Step 4: Define Interfaces

For groups that interact:
- What data flows between them?
- What's the contract (types, formats, protocols)?
- Define the interface in the plan.

### Step 5: Map Dependencies

Draw the dependency graph:
- Which groups can run in parallel?
- Which must serialize?
- What's the critical path?

### Step 6: Validate with Unblocked

Query Unblocked to validate the decomposition:
- `unblocked_context_engine`: "What are the dependencies between [components]?"
- `historical_context`: "How have similar multi-part changes been structured?"

---

## Common Decomposition Patterns

### Frontend + Backend
```
Plan ──► [API impl] ──────────────────► Review
     └─► [UI impl (mocked API)] ───────►
```
Define the API contract in the plan. UI mocks the API until it's ready.

### Migration + Service + Consumer
```
Plan ──► [Migration] ──► [Service] ──► [Consumer] ──► Review
```
Strictly serial — each depends on the previous.

### Feature Flags + Implementation
```
Plan ──► [Feature flag + config] ──► [Implementation behind flag] ──► Review
```
Flag goes first so implementation can be safely deployed.

### Parallel Services
```
Plan ──► [Service A] ──────► Review
     ├─► [Service B] ──────►
     └─► [Service C] ──────►
```
Independent services with no shared state.

---

## Red Flags in Decomposition

**Too many units:** If you have more than 4-5 units, the coordination overhead likely
exceeds the parallelism benefit. Consider grouping related units.

**Circular dependencies:** If A depends on B and B depends on A, the decomposition
is wrong. Refactor so one produces an interface the other consumes.

**Shared mutable state:** If two units both read and write the same state, they
can't safely parallelize. Serialize them or extract the shared state into its own unit.

**Vague boundaries:** If you can't clearly state which files each unit touches, the
decomposition isn't clean enough. Refine until each unit has a clear file list.
