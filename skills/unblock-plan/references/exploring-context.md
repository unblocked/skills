# Exploring Unfamiliar Code

Structured approach for building context when working in an unfamiliar codebase area.
Use alongside the planning workflow to hydrate with exploration-specific queries.

---

## Step 1: Architecture Discovery

- `unblocked_context_engine`: "What is the purpose of [system/repo]?"
- `unblocked_context_engine`: "What are the main components of [system] and how do they interact?"
- `unblocked_context_engine`: "What does [system] depend on and what depends on it?"
- `historical_context`: "Why was [system] designed this way? What alternatives were considered?"

**Capture:** system boundaries, key abstractions, data flow (entry → processing → output), integration points.

---

## Step 2: Code Structure Mapping

- `unblocked_context_engine`: "What are the main entry points for [system]?"
- `unblocked_context_engine`: "Where is the core business logic for [feature area]?"

**Identify:** entry points (routes, handlers), core logic, data layer (models, schemas), config, tests.

---

## Step 3: Convention Detection

- `unblocked_context_engine`: "What coding conventions does the team follow in [area]?"
- `unblocked_context_engine`: "What patterns does the team use for [error handling / testing / API design]?"
- `data_retrieval`: recent PRs in the area — review comments reveal enforced conventions

**Look for:** naming conventions, error handling approach, testing patterns, file organization.

---

## Step 4: Historical Decision Context

- `historical_context`: "What key decisions shaped [system]?"
- `historical_context`: "What technical debt exists in [area]? Known issues?"
- `historical_context`: "What was the original design intent for [component]?"

**Watch for:** ADRs or design docs, rejected alternatives, known tech debt, mid-migration state.

---

## Step 5: Find Domain Experts

- `data_retrieval`: most active contributors to the affected files/directories
- `unblocked_context_engine`: "Who are the experts on [system/area]?"
- `data_retrieval`: recent PR reviewers for the area
