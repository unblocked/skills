# Bug Investigation Context Workflow

Structured approach for gathering context when debugging issues. Use alongside
the planning workflow to hydrate with debugging-specific queries.

---

## Phase 1: Understand the Bug

- What is happening vs. what should happen?
- When did it start? Is it reproducible?
- Which system/component is affected? Severity?

**Queries:**
- `unblocked_context_engine`: "How does [affected component] work?"
- `failure_debugging`: "[error message or symptoms]"

---

## Phase 2: Recent Changes

The bug probably started because something changed. Find what.

- `historical_context`: "What changed recently in [file/system]?"
- `historical_context`: "When was [function/code] last modified and why?"
- `data_retrieval`: recent PRs touching the affected files
- `unblocked_context_engine`: "What went out in the last deployment affecting [area]?"

**Look for:** commits in the relevant timeframe, PRs with noted risks, config/dependency changes, deployment timing correlating with onset.

---

## Phase 3: Bug History

Has this happened before? The previous fix may have regressed.

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

The original PR description and review comments often explain constraints not visible in the code.

---

## Phase 5: Root Cause Analysis

Before planning a fix, confirm you can explain:

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
