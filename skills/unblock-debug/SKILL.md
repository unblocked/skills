---
name: unblock-debug
description: >
  Structured bug investigation — diagnoses root cause using org context (PRs,
  Slack, Jira, docs, code history) before any fix is written. Outputs a
  diagnosis, not a fix.
---

# Unblocked Bug Investigation

Structured root-cause analysis hydrated with org context. Diagnoses the bug — does not fix it.

## Rules

- **Diagnose before fixing.** No code changes until root cause is confirmed.
- **Check what changed first.** Most bugs are caused by recent changes.
- **Look for prior occurrences.** If it happened before, the previous fix may have regressed.

---

## Inputs

Error message, stack trace, bug description, or ticket URL. Optional: timeframe, affected component.

---

## Phase 1: Symptoms

Establish the facts before investigating:

- What is happening vs. what should happen?
- When did it start? Is it reproducible?
- Which system/component is affected?
- Severity: user-facing or internal?

---

## Phase 2: Recent Changes

The bug probably started because something changed. Find what.

1. `historical_context`: "What changed recently in [affected file/system]?"
2. `historical_context`: "When was [function/code] last modified and why?"
3. `data_retrieval`: recent PRs touching the affected files
4. `unblocked_context_engine`: "What went out in the last deployment affecting [area]?"

**Correlate** changes with bug onset timing. Look for: commits in the timeframe, PRs with noted risks, config/dependency changes.

---

## Phase 3: Bug History

Has this happened before?

1. `historical_context`: "Has this [error/bug] been reported before?"
2. `historical_context`: "What's the history of issues with [system]?"
3. `historical_context`: "How was [similar bug] fixed previously?"

If a prior fix exists, check whether it was overwritten or bypassed by recent changes.

---

## Phase 4: Code Archaeology

Understand why the affected code works the way it does.

1. `unblocked_context_engine`: "Why does [function] work this way?"
2. `unblocked_context_engine`: "What was the original intent of [code block]?"
3. `data_retrieval`: find the PR that introduced the relevant code

The original PR description and review comments often explain constraints not visible in the code.

---

## Phase 5: Root Cause Confirmation

Before outputting the diagnosis, confirm you can answer:

1. **What** is the bug?
2. **Why** is it happening? (root cause, not symptom)
3. **Why** would the proposed fix work?
4. **What else** might the fix affect?

If you can't answer all four, loop back and gather more context.

---

## Debugging Checklist

- [ ] I know WHEN the bug started
- [ ] I know WHAT changed to cause it
- [ ] I know WHY the code behaves this way
- [ ] I've checked if this happened before
- [ ] I understand the original intent of the code
- [ ] I know what else a fix might affect

---

## Tool Selection

| Question | Tool |
|---|---|
| How/why does X work? | `unblocked_context_engine` |
| What was decided about X? | `historical_context` |
| Recent PRs/issues in area X | `data_retrieval` |
| Contents of a specific PR/issue URL | `link_resolver` |
| Debug a build/runtime failure | `failure_debugging` |
