---
name: unblock-explore
description: >
  Codebase orientation — builds a mental map of unfamiliar code areas using
  org context (architecture, conventions, decisions, experts). Outputs an
  orientation document.
---

# Unblocked Codebase Exploration

Builds a mental map of unfamiliar code. Outputs a structured orientation document.

## Rules

- **Map before you dig.** Understand the system's shape before reading individual files.
- **Ask "why" not just "what."** Decisions and constraints matter more than current state.
- **Identify people, not just code.** Know who to ask when questions arise.

---

## Inputs

System, area, or component name to explore.

---

## Step 1: Architecture

1. `unblocked_context_engine`: "What is the purpose of [system/repo]?"
2. `unblocked_context_engine`: "What are the main components of [system] and how do they interact?"
3. `unblocked_context_engine`: "What does [system] depend on and what depends on it?"
4. `historical_context`: "Why was [system] designed this way? What alternatives were considered?"

**Capture:** system boundaries, key abstractions, data flow (entry → processing → output), integration points.

---

## Step 2: Code Structure

1. `unblocked_context_engine`: "What are the main entry points for [system]?"
2. `unblocked_context_engine`: "Where is the core business logic for [feature area]?"

**Identify:** entry points (routes, handlers), core logic, data layer (models, schemas), config, tests.

---

## Step 3: Conventions

1. `unblocked_context_engine`: "What coding conventions does the team follow in [area]?"
2. `unblocked_context_engine`: "What patterns does the team use for [error handling / testing / API design]?"
3. `data_retrieval`: recent PRs in the area — review comments reveal enforced conventions

**Capture:** naming conventions, error handling approach, testing patterns, file organization.

---

## Step 4: Decisions

1. `historical_context`: "What key decisions shaped [system]?"
2. `historical_context`: "What technical debt exists in [area]? Known issues?"
3. `historical_context`: "What was the original design intent for [component]?"

**Watch for:** ADRs or design docs, rejected alternatives, known tech debt, mid-migration state.

---

## Step 5: Experts

1. `data_retrieval`: most active contributors to the affected files/directories
2. `unblocked_context_engine`: "Who are the experts on [system/area]?"
3. `data_retrieval`: recent PR reviewers for the area

---

## Output

Structured orientation document:

- **Architecture** — purpose, components, data flow, dependencies
- **Key files** — entry points, core logic, config, tests
- **Conventions** — naming, error handling, testing, file organization
- **Decisions** — key decisions, rejected alternatives, constraints
- **People** — domain experts, active contributors, PR reviewers
- **Landmines** — known tech debt, mid-migration areas, gotchas

---

## Tool Selection

| Question | Tool |
|---|---|
| How/why does X work? | `unblocked_context_engine` |
| What was decided about X? | `historical_context` |
| Recent PRs/issues in area X | `data_retrieval` |
| Contents of a specific PR/issue URL | `link_resolver` |
| Debug a build/runtime failure | `failure_debugging` |
