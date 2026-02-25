---
name: onboard-codebase
description: >
  Produces a persistent orientation document for a codebase or system using
  Unblocked context. Surveys architecture, maps entry points and core logic,
  gathers key decisions and tech debt, then synthesizes everything into a
  structured document the IC saves and refers back to. Use when joining a new
  team, starting on an unfamiliar repo, or onboarding someone else.
---

# Codebase Onboarding

Produces a **persistent orientation document** — not ephemeral context, but a deliverable
artifact that the IC saves and refers back to. Combines code exploration with
organizational context from Unblocked to build the kind of mental model that usually
takes days of reading code and asking teammates.

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  1. SURVEY         (Agent + Unblocked)                       │
│     │              System purpose, architecture,             │
│     │              boundaries, stakeholders                  │
│     ▼                                                        │
│  2. MAP            (Agent + Unblocked)                       │
│     │              Entry points, core logic,                 │
│     │              data layer, key files                     │
│     ▼                                                        │
│  3. HISTORY        (Unblocked)                               │
│     │              Key decisions, tech debt,                 │
│     │              domain experts, recent direction          │
│     ▼                                                        │
│  4. SYNTHESIZE     (Agent)                                   │
│     │              Structured orientation document           │
│     ▼                                                        │
│     DONE — IC saves the document                             │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Principles

- **Produce a deliverable.** The output is a document the IC keeps, not ephemeral chat context.
- **Organizational context first.** Code structure is visible. Team context (why it's this way, who to ask, what's changing) is not — that's where Unblocked adds value.
- **Opinionated structure.** Use the orientation template. Don't dump raw query results.
- **Depth over breadth.** Better to deeply cover the core system than shallowly list everything.
- **Flag what's changing.** A system mid-migration is different from a stable system. Call it out.

## Input

The skill needs:
- A repo or system to onboard to (default: current working directory)
- Optionally: a specific area to focus on (e.g., "the payment system" vs. the whole codebase)

---

## Phase 1: Survey (Agent + Unblocked)

Understand the high-level shape of the system.

### Code Exploration

- Read top-level files: README, package.json/Cargo.toml/etc., directory structure
- Identify the language(s), framework(s), and build system
- Map the top-level directory structure and what each directory contains

### Unblocked Queries

1. `unblocked_context_engine`: "What is the purpose of this system/repo? What problem does it solve?"
2. `unblocked_context_engine`: "What are the main components and how do they interact?"
3. `unblocked_context_engine`: "What does this system depend on? What depends on it?"
4. `data_retrieval`: "Who are the main contributors and reviewers for this repo?"

**Capture:**
- System purpose and boundaries (what's in scope, what's external)
- Main components and their responsibilities
- Key dependencies (both upstream and downstream)
- Primary stakeholders and domain experts

---

## Phase 2: Map (Agent + Unblocked)

Identify the landmarks — the files and patterns a developer needs to know about.

### Code Exploration

- **Entry points:** Where execution starts (routes, handlers, main functions, CLI commands)
- **Core logic:** Where business rules live (services, domain models, processors)
- **Data layer:** Models, schemas, migrations, database access patterns
- **Config:** How the system is configured, what's tunable, environment variables
- **Tests:** Testing approach, test organization, what's well-tested vs. not

### Unblocked Queries

1. `unblocked_context_engine`: "What are the most important files/modules in [system]?"
2. `unblocked_context_engine`: "What coding conventions does the team follow?"
3. `unblocked_context_engine`: "What patterns does the team use for [error handling / testing / API design / data access]?"
4. `data_retrieval`: recent PRs — reveals active areas and current patterns

**Capture:**
- Key file paths and what they contain
- Coding conventions and patterns
- Testing approach and organization
- Active areas vs. stable areas

---

## Phase 3: History (Unblocked)

Understand why the code looks the way it does — the organizational context that
makes the difference between "I can read the code" and "I understand the system."

**Required queries:**

1. `historical_context`: "What key architectural decisions shaped this system?"
2. `historical_context`: "What technical debt exists? What's known to be problematic?"
3. `historical_context`: "What's the recent direction? Any ongoing migrations or refactors?"
4. `historical_context`: "What alternatives were considered and rejected for major decisions?"
5. `unblocked_context_engine`: "Who are the domain experts for each area of this system?"

**Capture:**
- Key architectural decisions and their rationale
- Known tech debt and areas flagged for improvement
- Ongoing migrations or direction changes
- Rejected alternatives (so the IC doesn't re-propose them)
- Domain experts by area

---

## Phase 4: Synthesize (Agent)

Produce the orientation document using the template in `references/orientation-template.md`.

**The document should:**

1. Stand alone — readable without access to the conversation
2. Be specific — name files, reference PRs, cite decisions
3. Be opinionated — highlight what matters most, not just list everything
4. Include "watch out for" sections — tech debt, gotchas, in-progress migrations
5. Include "who to ask" — domain experts for each area

**Present the document and instruct the IC to save it** (e.g., to the repo wiki,
a local file, or their notes). This is the deliverable.

---

## Tool Selection

| Question | Tool |
|---|---|
| System purpose and architecture | `unblocked_context_engine` |
| Key decisions and rationale | `historical_context` |
| Contributors and domain experts | `data_retrieval` |
| Tech debt and known issues | `historical_context` |
| Coding conventions and patterns | `unblocked_context_engine` |
