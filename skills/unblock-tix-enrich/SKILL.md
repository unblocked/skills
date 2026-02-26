---
name: unblock-tix-enrich
description: >
  Ticket enrichment — gathers and adds organizational context to tickets before
  work begins. Supports engineering (code-focused) and support (product-focused)
  modes. Does not solve tickets.
---

# Unblocked Ticket Enrichment

Enriches tickets with organizational context before work begins. Does not solve tickets.

## Rules

- **Enrich, don't solve.** Add context, not solutions.
- **Cite sources.** Every piece of context must reference where it came from (PR, Slack thread, doc, commit).
- **Two modes:** engineering (code-focused) and support (user/product-focused). Infer from ticket content, respect explicit override.

---

## Phase 1: Get Ticket Details

**Inputs:** ticket URL (via `link_resolver`), ticket ID (via `data_retrieval`), or pasted description. Extract:

- Summary and description
- Affected system/area
- Severity/priority
- Reporter and assignee
- Labels and linked items

---

## Phase 2: Classify & Scope

Infer mode from ticket content:

- **Engineering mode:** bug reports, feature requests with technical details, refactoring tasks, performance issues
- **Support mode:** user-reported issues, "how do I" questions, behavior questions, escalations

State the inferred mode. Respect any explicit override from the user.

---

## Phase 3: Gather Context (Unblocked)

### Common queries (both modes):

1. `unblocked_context_engine`: "How does [affected system] work?"
2. `historical_context`: "What's the history of [affected area]? Recent changes?"
3. `data_retrieval`: recent PRs touching the affected area
4. `link_resolver`: resolve any URLs referenced in the ticket

### Engineering mode — add:

5. `unblocked_context_engine`: "What are the code paths for [described behavior]?"
6. `unblocked_context_engine`: "What patterns does the team use in [area]?"
7. `historical_context`: "Has this been attempted or discussed before?"
8. `historical_context`: "What decisions constrain [area]?"
9. `failure_debugging`: "[error message]" (if bug report includes one)

### Support mode — add:

5. `unblocked_context_engine`: "What is the expected user-facing behavior for [feature]?"
6. `unblocked_context_engine`: "What are known limitations of [feature]?"
7. `historical_context`: "Have similar issues been reported before? How were they resolved?"
8. `data_retrieval`: related support tickets or user reports

---

## Phase 4: Synthesize Output

### Engineering output:

- **Affected systems** — what components are involved
- **Relevant code** — key files, functions, patterns
- **Related work** — open/recent PRs, linked tickets
- **Historical context** — decisions, prior attempts, rejected approaches
- **Suggested approach** — based on patterns and history (not a solution, just direction)

### Support output:

- **Product behavior** — how the feature works and known limitations
- **User impact** — scope and severity assessment
- **Related incidents** — similar reports and their resolutions
- **Resolution history** — how the team has handled this before
- **Next steps** — escalation path, workarounds, or information needed

---

## Tool Selection

| Question | Tool |
|---|---|
| How/why does X work? | `unblocked_context_engine` |
| What was decided about X? | `historical_context` |
| Recent PRs/issues in area X | `data_retrieval` |
| Contents of a specific PR/issue URL | `link_resolver` |
| Debug a build/runtime failure | `failure_debugging` |
