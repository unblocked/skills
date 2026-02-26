---
name: unblock-enrich
description: >
  Enriches tickets with organizational context before work begins. Gathers
  related PRs, code paths, historical context, and prior attempts — then
  produces a structured enrichment document attached to the ticket. Two modes:
  engineering (code-focused) and support (user/product-focused). Does not solve
  tickets — only enriches them so the person or agent who picks them up starts
  with full context. Use before starting work on a ticket or triaging support issues.
---

# Ticket Enrichment

Enriches tickets with org context **before work begins**. Distinct from `/unblock-investigate`:
investigate diagnoses after symptoms appear; enrich prepares before work starts.

## Rules

- **Enrich, don't solve.** Output is context, not a fix. The enrichment helps whoever picks up the ticket.
- **Cite sources.** Every piece of context references its origin (PR, Slack thread, decision, doc).
- **Two modes.** Engineering mode focuses on code paths and implementation context. Support mode focuses on user-facing behavior and resolution history.

## Input

One of:
- A ticket URL (use `link_resolver` to fetch)
- A ticket ID (use `data_retrieval` to fetch)
- A pasted ticket description

---

## Phase 1: Get Ticket

Extract from the ticket:
- **Summary** — one-line description of the issue or request
- **Affected system** — which component/service
- **Severity/priority** — if specified
- **Reporter** — who filed it
- **Labels/tags** — categorization
- **Linked items** — related tickets, PRs, docs

---

## Phase 2: Classify Mode

Infer the mode from ticket content:
- **Engineering mode** — ticket describes a code change, bug, feature, or technical task
- **Support mode** — ticket describes user-reported behavior, product question, or escalation

If the user specifies a mode, respect the override.

---

## Phase 3: Gather Context

### Common queries (both modes)

1. `unblocked_context_engine`: "How does [affected system] work?"
2. `historical_context`: "What decisions have been made about [affected area]?"
3. `data_retrieval`: recent PRs and issues related to the affected area
4. `historical_context`: "Has [this issue/request] been reported or attempted before?"

### Engineering mode — additional queries

5. `unblocked_context_engine`: "What are the code paths for [affected functionality]?"
6. `unblocked_context_engine`: "What patterns does the team follow for [relevant area]?"
7. `historical_context`: "What prior attempts or related work exist for [this change]?"
8. `failure_debugging`: "[error message]" (if the ticket includes one)

### Support mode — additional queries

5. `unblocked_context_engine`: "What is the expected user-facing behavior for [feature]?"
6. `unblocked_context_engine`: "What are the known limitations of [feature/system]?"
7. `historical_context`: "Have similar user reports been filed before? How were they resolved?"
8. `data_retrieval`: related support tickets or customer-reported issues

---

## Phase 4: Synthesize

Produce the enrichment document using the template in `references/enrichment-template.md`.

### Engineering output

- **Affected systems** — components, services, code paths
- **Relevant code** — key files and entry points
- **Related work** — PRs, tickets, decisions touching this area
- **Historical context** — prior attempts, rejected approaches, known constraints
- **Suggested approach** — based on team patterns (not a full plan — just direction)

### Support output

- **Product behavior** — how the feature works, known limitations
- **User impact** — scope, workarounds if any
- **Related incidents** — similar past reports and their resolutions
- **Resolution history** — how the team has handled this type of issue
- **Escalation context** — which team owns this, domain experts

**Present the enrichment document. Instruct the user to attach it to the ticket.**

---

## Tool Selection

| Question | Tool |
|---|---|
| How does the affected system work? | `unblocked_context_engine` |
| What was decided about this area? | `historical_context` |
| Recent PRs/issues in this area | `data_retrieval` |
| Fetch ticket by URL | `link_resolver` |
| Fetch ticket by ID | `data_retrieval` |
| Debug an error from the ticket | `failure_debugging` |
