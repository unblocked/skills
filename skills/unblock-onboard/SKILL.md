---
name: unblock-onboard
description: >
  Produces a persistent orientation document for a codebase or system using
  Unblocked context. Surveys architecture, maps entry points and core logic,
  gathers key decisions and tech debt, then synthesizes everything into a
  structured document the IC saves and refers back to. Use when joining a new
  team, starting on an unfamiliar repo, or onboarding someone else.
---

# Codebase Onboarding

Produces a **persistent orientation document** — a deliverable artifact the IC saves and
refers back to. Combines code exploration with organizational context from Unblocked.

## Rules

- **Produce a deliverable.** The output is a document the IC keeps, not ephemeral chat.
- **Organizational context first.** Code structure is visible; team context (why, who, what's changing) is not.
- **Depth over breadth.** Better to deeply cover the core system than shallowly list everything.

## Input

- A repo or system to onboard to (default: current working directory)
- Optionally: a specific area to focus on

---

## Phase 1: Survey (Agent + Unblocked)

### Code Exploration

- Read top-level files: README, package.json/Cargo.toml/etc., directory structure
- Identify language(s), framework(s), build system
- Map top-level directories and their purposes

### Unblocked Queries

1. `unblocked_context_engine`: "What is the purpose of this system/repo?"
2. `unblocked_context_engine`: "What are the main components and how do they interact?"
3. `unblocked_context_engine`: "What does this system depend on? What depends on it?"
4. `data_retrieval`: "Who are the main contributors and reviewers?"

---

## Phase 2: Map (Agent + Unblocked)

Identify the landmarks a developer needs to know.

### Code Exploration

- **Entry points:** routes, handlers, main functions, CLI commands
- **Core logic:** services, domain models, processors
- **Data layer:** models, schemas, migrations, DB access patterns
- **Config:** configuration approach, environment variables
- **Tests:** testing approach, organization, coverage gaps

### Unblocked Queries

1. `unblocked_context_engine`: "What are the most important files/modules in [system]?"
2. `unblocked_context_engine`: "What coding conventions does the team follow?"
3. `unblocked_context_engine`: "What patterns for [error handling / testing / API design / data access]?"
4. `data_retrieval`: recent PRs — reveals active areas and current patterns

---

## Phase 3: History (Unblocked)

Understand **why** the code looks this way.

1. `historical_context`: "What key architectural decisions shaped this system?"
2. `historical_context`: "What technical debt exists? What's known to be problematic?"
3. `historical_context`: "What's the recent direction? Ongoing migrations or refactors?"
4. `historical_context`: "What alternatives were considered and rejected?"
5. `unblocked_context_engine`: "Who are the domain experts for each area?"

---

## Phase 4: Synthesize (Agent)

Produce the orientation document using `references/orientation-template.md`.

The document should:
1. Stand alone — readable without the conversation
2. Be specific — name files, reference PRs, cite decisions
3. Be opinionated — highlight what matters most
4. Include "watch out for" — tech debt, gotchas, in-progress migrations
5. Include "who to ask" — domain experts per area

**Present the document and instruct the IC to save it.**

---

## Tool Selection

| Question | Tool |
|---|---|
| System purpose and architecture | `unblocked_context_engine` |
| Key decisions and rationale | `historical_context` |
| Contributors and domain experts | `data_retrieval` |
| Tech debt and known issues | `historical_context` |
| Coding conventions and patterns | `unblocked_context_engine` |
