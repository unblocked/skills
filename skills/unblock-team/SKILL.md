---
name: unblock-team
description: >
  Guides setup and orchestration of multi-agent teams with defined roles. Uses
  Unblocked-powered subagents for planning and review while coding agents handle
  implementation. Enforces the critical constraint that planning runs FIRST with
  a reviewed plan before implementation agents are spawned. Provides team
  templates for small (2-agent), medium (3-agent), and large (4+ agent) setups.
  Use when coordinating multiple agents on a task.
---

# Multi-Agent Team Orchestration

Sets up agent teams with defined roles powered by Unblocked context. The critical
insight: **planning must complete before coding starts.** The most common multi-agent
failure is all agents coding simultaneously without coordination — this skill prevents
that by enforcing a plan-first, implement-second structure.

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  1. ASSESS         (Agent)                                   │
│     │              Evaluate task, select team size           │
│     ▼                                                        │
│  2. DECOMPOSE      (Agent + Unblocked)                       │
│     │              Break task into plannable units            │
│     ▼                                                        │
│  3. PLAN           (Planner Agent)                           │
│     │              Hydrate + plan + review for each unit     │
│     │              ALL planning completes before coding      │
│     ▼                                                        │
│  4. IMPLEMENT      (Implementer Agent(s))                    │
│     │              Execute reviewed plans                    │
│     │              Can run in parallel for independent units │
│     ▼                                                        │
│  5. REVIEW         (Reviewer Agent)                          │
│     │              Context-aware review of all changes       │
│     ▼                                                        │
│  6. INTEGRATE      (Agent)                                   │
│     │              Merge, resolve conflicts, final check     │
│     ▼                                                        │
│     DONE                                                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Principles

- **Plan first, code second.** All planning completes and is reviewed before any implementation starts. This is non-negotiable.
- **Agents have defined roles.** Planner plans. Implementer codes. Reviewer reviews. No agent does everything.
- **Independent units can parallelize.** After planning, truly independent implementation tasks can run in parallel.
- **Dependent units must serialize.** If unit B depends on unit A's output, A must complete before B starts.
- **One reviewer for all.** The reviewer sees all changes together, catching cross-unit issues that per-unit reviews miss.

---

## Phase 1: Assess (Agent)

Evaluate the task and select the right team size.

### Team Size Selection

**Small Team (2 agents)** — Planner + Implementer
- Best for: tasks that need careful planning but have a single implementation thread
- When: the task is too complex for one agent but doesn't benefit from parallel implementation
- Example: "Refactor the authentication middleware"

**Medium Team (3 agents)** — Planner + Implementer + Reviewer
- Best for: standard feature work or complex changes where review independence matters
- When: you want the review to happen with fresh eyes, not polluted by implementation reasoning
- Example: "Add rate limiting to the API with proper testing"

**Large Team (4+ agents)** — Planner + Parallel Implementers + Reviewer
- Best for: tasks that decompose into truly independent implementation units
- When: the task has natural parallelism (e.g., API + UI + tests, or multiple independent services)
- Example: "Add notification preferences with API, UI, and migration"

See `references/team-templates.md` for detailed team configurations.

### Key Questions

1. Can the task be decomposed into independent units?
2. Would parallel implementation actually save time, or create merge conflicts?
3. Does the review benefit from independence (separate agent) or is self-review sufficient?

---

## Phase 2: Decompose (Agent + Unblocked)

Break the task into units that can be planned and implemented.

### Query Unblocked for Decomposition Context

1. `unblocked_context_engine`: "What are the components of [system area] that [task] touches?"
2. `unblocked_context_engine`: "What are the dependencies between [components]?"
3. `historical_context`: "How have similar multi-part changes been structured?"

### Decomposition Rules

See `references/task-decomposition.md` for detailed guidance.

**Each unit must:**
- Have a clear scope (what's in, what's out)
- Have clear inputs and outputs (so it can be planned independently)
- Have defined boundaries (files it touches don't overlap with other units, or overlap is minimal and well-defined)

**Identify dependencies between units:**
- Which units can run in parallel?
- Which must serialize?
- What's the integration order?

---

## Phase 3: Plan (Planner Agent)

**ALL planning completes before ANY implementation starts.**

For each unit, the Planner Agent (see `agents/unblocked-planner.md`) runs:

1. **Hydrate** — gather context from Unblocked for this unit
2. **Draft Plan** — design implementation referencing context
3. **Review Plan** — submit to Unblocked for critical review
4. **Revise Plan** — incorporate feedback

### Planning Output

Each unit gets a self-contained plan document:
- Context gathered
- Approach
- Files to change
- Patterns to follow
- Execution steps
- Risks and mitigations

### Human Review Gate

After all plans are produced, present them to the user for review:
- Summary of all units and their plans
- Dependency graph
- Proposed execution order
- Any concerns or risks

**Do not proceed to implementation without user approval of the plans.**

---

## Phase 4: Implement (Implementer Agent(s))

Execute the reviewed plans.

### For Independent Units (Parallel)

Spawn implementer agents in parallel, each working on their assigned plan:
- Each agent receives its unit's plan as input
- Each agent follows the plan's execution steps
- Each agent works on a feature branch or in isolated file scope

### For Dependent Units (Serial)

Execute in dependency order:
- Complete unit A's implementation
- Verify unit A works
- Pass any outputs or interfaces to unit B
- Complete unit B's implementation

### During Implementation

- Implementer agents follow the plan. Deviations require re-checking with the planner.
- If an implementer encounters something unexpected, it flags the issue rather than improvising.
- Use `failure_debugging` for build/runtime errors during implementation.

---

## Phase 5: Review (Reviewer Agent)

The Reviewer Agent (see `agents/unblocked-reviewer.md`) reviews **all changes together**.

### Why Review All Together

Per-unit reviews miss:
- **Cross-unit inconsistencies** — different naming, error handling, or patterns across units
- **Integration gaps** — units that don't connect properly at the boundaries
- **Duplicate work** — utilities or patterns created independently by different implementers

### Review Process

1. Gather all diffs from all implementation units
2. Hydrate context from Unblocked for the full scope
3. Review for cross-unit consistency, integration, and alignment with team patterns
4. Produce a unified review report

---

## Phase 6: Integrate (Agent)

Merge all implementation units and perform final verification.

1. **Merge** — combine all unit branches/changes
2. **Resolve conflicts** — if any units touched overlapping files
3. **Run tests** — full test suite, not just unit-specific tests
4. **Final check** — does the integrated whole match the original task requirements?

---

## Tool Selection

| Question | Tool |
|---|---|
| System components and dependencies | `unblocked_context_engine` |
| Prior multi-part changes | `historical_context` |
| Team conventions | `unblocked_context_engine` |
| Recent work in the area | `data_retrieval` |
| Build/test failures | `failure_debugging` |
| Specific PR/issue details | `link_resolver` |
