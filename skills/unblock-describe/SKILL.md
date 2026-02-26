---
name: unblock-describe
description: >
  Generates context-grounded PR descriptions powered by Unblocked. Goes beyond
  describing the diff — explains the reasoning, trade-offs, and team context
  behind the change. Gathers ticket context, related PRs, and conventions to
  produce a description that helps reviewers understand not just what changed
  but why. Use when creating or improving PR descriptions.
---

# Context-Grounded PR Description

## Rules

- **Explain the why, not just the what.** The diff shows what changed. The description explains why.
- **Connect to organizational context.** Link to tickets, reference related PRs, cite decisions.
- **Follow team conventions.** If the team has a PR template or description style, match it.

## Input

- The diff (from current branch vs. base, or a PR URL)
- Optionally: a ticket URL or description of the task

---

## Phase 1: Gather Context (Unblocked + Agent)

Read the diff to understand what changed, then query Unblocked.

**Required queries:**

1. `unblocked_context_engine`: "What are the team's conventions for PR descriptions in this area?"
2. `data_retrieval`: linked ticket/issue for requirements and acceptance criteria
3. `historical_context`: "What decisions led to this change? What alternatives were considered?"
4. `data_retrieval`: recent PRs in the same area — how were they described?
5. `unblocked_context_engine`: "What should reviewers know about [area being changed]?"

If a ticket URL is provided:
6. `link_resolver`: resolve the ticket for full context

---

## Phase 2: Draft Description (Agent)

Write the PR description using gathered context. Follow `references/pr-template.md` unless the team has a different convention.

**The description must include:**

1. **Summary** — What and why, in 2-3 sentences.
2. **Motivation** — Problem being solved. Link to ticket.
3. **Approach** — How and why this approach. Reference related PRs or decisions.
4. **What to Review** — What's important, what's mechanical, what's risky.
5. **Testing** — How the change was tested.
6. **Trade-offs** — Downsides, deferred work, known limitations.

Do NOT just describe the diff. "Modified `auth.ts` to add a check" is useless. "Added token expiry validation to prevent stale sessions, following the pattern from PR #234" tells the reviewer what they need.

---

## Phase 3: Review Description (Unblocked)

**Required queries:**

1. `unblocked_context_engine`: "Does this PR description follow the team's conventions?"
2. `unblocked_context_engine`: "Is there relevant context about [change] that should be included?"

Check for: missing context, incorrect references, missing ticket links, convention mismatches.

---

## Phase 4: Finalize (Agent)

Incorporate feedback. Present the final description ready for use.

---

## Tool Selection

| Question | Tool |
|---|---|
| Team conventions for PR descriptions | `unblocked_context_engine` |
| Ticket/issue details | `data_retrieval` or `link_resolver` |
| Prior decisions about the area | `historical_context` |
| Recent PRs for comparison | `data_retrieval` |
| Area context for reviewers | `unblocked_context_engine` |
