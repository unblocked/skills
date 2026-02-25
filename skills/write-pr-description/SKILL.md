---
name: write-pr-description
description: >
  Generates context-grounded PR descriptions powered by Unblocked. Goes beyond
  describing the diff — explains the reasoning, trade-offs, and team context
  behind the change. Gathers ticket context, related PRs, and conventions to
  produce a description that helps reviewers understand not just what changed
  but why. Use when creating or improving PR descriptions.
---

# Context-Grounded PR Description

PR descriptions should explain the reasoning, trade-offs, and team context behind a
change — not just restate the diff. This skill gathers organizational context from
Unblocked and produces a description that helps reviewers understand the full picture.

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  1. GATHER         (Unblocked + Agent)                       │
│     │              Diff + ticket + conventions +             │
│     │              related PRs + decisions                   │
│     ▼                                                        │
│  2. DRAFT          (Agent)                                   │
│     │              Summary, motivation, approach,            │
│     │              testing, trade-offs                       │
│     ▼                                                        │
│  3. REVIEW         (Unblocked)                               │
│     │              Validate against team conventions         │
│     │              Check for missing context                 │
│     ▼                                                        │
│  4. FINALIZE       (Agent)                                   │
│     │              Incorporate feedback, polish              │
│     ▼                                                        │
│     DONE                                                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Principles

- **Explain the why, not just the what.** The diff shows what changed. The description explains why.
- **Connect to organizational context.** Link to tickets, reference related PRs, cite decisions.
- **Help the reviewer.** Call out what to focus on, what's risky, what's straightforward.
- **Follow team conventions.** If the team has a PR template or description style, match it.
- **Be honest about trade-offs.** If the approach has downsides, state them.

## Input

The skill needs:
- The diff (from current branch vs. base, or a PR URL)
- Optionally: a ticket URL or description of the task

---

## Phase 1: Gather Context (Unblocked + Agent)

### Read the Diff

Understand what actually changed — files modified, patterns used, scope of change.

### Query Unblocked for Context

**Required queries:**

1. `unblocked_context_engine`: "What are the team's conventions for PR descriptions in this area?"
2. `data_retrieval`: linked ticket/issue for requirements and acceptance criteria
3. `historical_context`: "What decisions led to this change? What alternatives were considered?"
4. `data_retrieval`: recent PRs in the same area — how were they described?
5. `unblocked_context_engine`: "What should reviewers know about [area being changed]?"

**If a ticket URL is provided:**
6. `link_resolver`: resolve the ticket for full context (requirements, discussion, acceptance criteria)

**Collect and carry forward:**
- Ticket context (requirements, acceptance criteria, discussion)
- Team conventions for PR descriptions
- Related PRs and how they were described
- Decisions and trade-offs that shaped the approach
- Risks or areas that need reviewer attention

---

## Phase 2: Draft Description (Agent)

Write the PR description using the gathered context. Follow the template in
`references/pr-template.md` unless the team has a different convention.

**The description must include:**

1. **Summary** — What this PR does and why, in 2-3 sentences.
2. **Motivation** — The problem being solved or feature being added. Link to ticket if available.
3. **Approach** — How the change was implemented and why this approach was chosen. Reference related PRs or decisions.
4. **What to Review** — Guide the reviewer: what's important, what's mechanical, what's risky.
5. **Testing** — How the change was tested. What test cases cover.
6. **Trade-offs** — Any downsides, deferred work, or known limitations.

**Do NOT just describe the diff.** A description that says "modified `auth.ts` to add a
check" is useless. A description that says "added token expiry validation to prevent
stale sessions, following the pattern established in PR #234 for session management"
tells the reviewer what they need to know.

---

## Phase 3: Review Description (Unblocked)

Validate the draft against team context.

**Required queries:**

1. `unblocked_context_engine`: "Does this PR description follow the team's conventions for [area]?"
2. `unblocked_context_engine`: "Is there any relevant context about [change] that should be in the PR description?"

**Check for:**
- Missing context that would help reviewers
- Incorrect references to team patterns or decisions
- Missing ticket links or related PR references
- Convention mismatches in description format

---

## Phase 4: Finalize (Agent)

Incorporate any feedback from the review. Polish the description for clarity and
completeness. Present the final description ready for use.

---

## Tool Selection

| Question | Tool |
|---|---|
| Team conventions for PR descriptions | `unblocked_context_engine` |
| Ticket/issue details | `data_retrieval` or `link_resolver` |
| Prior decisions about the area | `historical_context` |
| Recent PRs for comparison | `data_retrieval` |
| Area context for reviewers | `unblocked_context_engine` |
