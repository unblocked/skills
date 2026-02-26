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

## Rules

- **Plan first, code second.** All planning completes and is reviewed before any implementation starts. Non-negotiable.
- **Agents have defined roles.** Planner plans. Implementer codes. Reviewer reviews.
- **One reviewer for all.** The reviewer sees all changes together, catching cross-unit issues.

---

## Phase 1: Assess (Agent)

Evaluate the task and select team size.

**Small (2 agents)** — Planner + Implementer. Single implementation thread, no natural parallelism.

**Medium (3 agents)** — Planner + Implementer + Reviewer. Standard feature work where review independence matters.

**Large (4+ agents)** — Planner + Parallel Implementers + Reviewer. Task decomposes into truly independent units.

See `references/team-templates.md` for detailed configurations.

### Key Questions

1. Can the task decompose into independent units?
2. Would parallel implementation save time or create merge conflicts?
3. Does review benefit from a separate agent?

---

## Phase 2: Decompose (Agent + Unblocked)

Break the task into plannable, implementable units.

### Queries

1. `unblocked_context_engine`: "What components does [task] touch?"
2. `unblocked_context_engine`: "What are the dependencies between [components]?"
3. `historical_context`: "How have similar multi-part changes been structured?"

### Rules

See `references/task-decomposition.md` for detailed guidance.

Each unit must have: clear scope, clear inputs/outputs, defined file boundaries (minimal overlap).

Map dependencies: which units parallelize, which serialize, what's the integration order.

---

## Phase 3: Plan (Planner Agent)

**ALL planning completes before ANY implementation starts.**

For each unit, the Planner Agent (`agents/unblocked-planner.md`) runs: Hydrate → Draft Plan → Review Plan → Revise Plan.

Each unit gets a self-contained plan: context, approach, files, patterns, steps, risks.

### Human Review Gate

After all plans are produced, present to user: summary of units, dependency graph, execution order, concerns.

**Do not proceed without user approval.**

---

## Phase 4: Implement (Implementer Agent(s))

### Independent Units (Parallel)

Spawn implementer agents in parallel, each with its unit's plan. Each works on isolated file scope.

### Dependent Units (Serial)

Execute in dependency order. Complete unit A → verify → pass outputs to unit B → complete unit B.

Implementers follow the plan. Deviations require re-checking with planner. Unexpected issues get flagged, not improvised around.

---

## Phase 5: Review (Reviewer Agent)

The Reviewer Agent (`agents/unblocked-reviewer.md`) reviews **all changes together**.

Per-unit reviews miss: cross-unit inconsistencies, integration gaps, duplicate utilities.

Process: gather all diffs → hydrate context for full scope → review for consistency and team patterns → produce unified report.

---

## Phase 6: Integrate (Agent)

1. Merge all unit changes
2. Resolve conflicts from overlapping files
3. Run full test suite
4. Final check: does the integrated whole match original requirements?

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
