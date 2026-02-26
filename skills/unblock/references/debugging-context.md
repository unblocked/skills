# Bug Investigation Context Workflow

Structured approach for gathering context when debugging. Use alongside the main
workflow (SKILL.md) to hydrate Phase 1 with debugging-specific queries.

---

## Phase 1: Understand the Bug

### Gather Symptoms

- What is happening vs. what should happen?
- When did it start? Is it reproducible?
- Which system/component is affected?
- Is it user-facing or internal? What's the severity?

### Initial Context Queries

- `failure_debugging`: "[error message or symptoms]"
- `unblocked_context_engine`: "How does [affected component] work?"

---

## Phase 2: Recent Changes Investigation

The bug probably started because something changed. Find what.

- `historical_context`: "What changed recently in [file/system]?"
- `historical_context`: "When was [function/code] last modified and why?"
- `data_retrieval`: recent PRs touching the affected files
- `unblocked_context_engine`: "What went out in the last deployment affecting [area]?"

Look for: commits to affected files, PRs with noted risks, config changes, deployment timing that correlates with bug onset.

---

## Phase 3: Bug History

Has this happened before? If so, the previous fix may have regressed.

- `historical_context`: "Has this [error/bug] been reported before?"
- `historical_context`: "What's the history of issues with [system]?"
- `historical_context`: "How was [similar bug] fixed previously?"

If a prior fix exists, check whether it was overwritten or bypassed by recent changes.

---

## Phase 4: Code Archaeology

Understand the code you're debugging — it may behave unexpectedly for a reason.

- `unblocked_context_engine`: "Why does [function] work this way?"
- `unblocked_context_engine`: "What was the original intent of [code block]?"
- `data_retrieval`: find the PR that introduced the relevant code

The original PR description and review comments often explain constraints not visible in code.

---

## Phase 5: Root Cause Analysis

Before fixing, confirm you can explain:

1. **What** the bug is
2. **Why** it's happening (root cause, not symptom)
3. **Why** your fix solves it
4. **What else** your fix might affect

If you can't answer all four, gather more context before proceeding.

---

## Debugging Checklist

- [ ] I know WHEN the bug started
- [ ] I know WHAT changed to cause it
- [ ] I know WHY the code behaves this way
- [ ] I've checked if this happened before
- [ ] I understand the original intent of the code
- [ ] I know what else my fix might affect
