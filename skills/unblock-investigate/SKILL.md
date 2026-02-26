---
name: unblock-investigate
description: >
  Structured incident and bug investigation powered by Unblocked. Triages issues
  by correlating symptoms with recent deployments, PRs, and historical incidents.
  Builds a timeline, generates hypotheses grounded in organizational context, then
  verifies against code. Produces a fix with regression protection. Use for
  production incidents, complex bugs, or any issue requiring root cause analysis.
---

# Structured Investigation

## Rules

- **Correlate before debugging.** Build a timeline of what changed before reading code.
- **Check if it happened before.** Many incidents are regressions. Unblocked remembers.
- **Protect, don't just fix.** Every fix includes a regression guard (test, assertion, or alert).

---

## Phase 1: Triage (Agent + Unblocked)

### Gather Symptoms

- What is happening vs. what should happen?
- When did it start? Intermittent or consistent?
- What system/component? What's the blast radius?
- Error message, stack trace, or log entry?

### Initial Context Queries

1. `failure_debugging`: "[error message or symptom]" — start here.
2. `unblocked_context_engine`: "How does [affected component] work?"
3. `unblocked_context_engine`: "What are the known failure modes for [system]?"

### Classify Severity

- **P0 — Outage:** Core functionality broken for all users. Fix now.
- **P1 — Major:** Significant impact, workaround may exist. Investigate immediately.
- **P2 — Minor:** Limited impact. Normal workflow.
- **P3 — Low:** Cosmetic or edge case.

---

## Phase 2: Timeline (Unblocked)

Build a chronological picture of what changed around symptom onset.

**Required queries:**

1. `historical_context`: "What changed recently in [affected system]?"
2. `data_retrieval`: PRs merged in the timeframe around symptom onset
3. `historical_context`: "When was [affected code/config] last modified and why?"
4. `data_retrieval`: recent deployments or releases affecting the area

**Build the timeline:**

```
[Date/Time] — [Event] — [Source]
```

**Correlate:** What changed between "last known good" and "first symptom"?

See `references/incident-timeline.md` for template.

---

## Phase 3: Hypothesize (Agent + Unblocked)

Generate 2-3 candidate root causes based on timeline and context.

For each hypothesis:
1. State it: "The issue is caused by [X] because [Y]"
2. Check history: `historical_context` — "Has [this type of issue] occurred before?"
3. Assess likelihood based on timeline correlation and prior history
4. Define verification: what to check in code to confirm or rule out

Rank by: timeline correlation > prior history > blast radius match.

---

## Phase 4: Verify (Agent)

Test the top hypothesis against actual code.

1. Read the suspected code — does it behave as predicted?
2. Trace the execution path from trigger to failure
3. Check the specific change (PR/commit diff) if one is suspected
4. Reproduce if possible

**Confirmed:** State root cause, explain chain [change] → [effect] → [symptom], proceed to Phase 5.
**Disproven:** State why, move to next hypothesis. If all fail, return to Phase 2 with broader queries.

---

## Phase 5: Fix + Protect (Agent + Unblocked)

### The Fix

1. Query: `unblocked_context_engine` — "How have similar issues been fixed?" and "What conventions for [type of fix]?"
2. Implement following team patterns
3. Review: `unblocked_context_engine` — "Does this fix align with team conventions?"

### Regression Protection

Every fix includes at least one: test, assertion, or monitoring/alerting suggestion.

### Root Cause Summary

1. **Symptom:** What was observed
2. **Root cause:** Chain of events
3. **Fix:** What was changed
4. **Protection:** What prevents regression
5. **Timeline:** When it started, when fixed

---

## Tool Selection

| Question | Tool |
|---|---|
| Debug an error message/symptom | `failure_debugging` |
| How does the affected system work? | `unblocked_context_engine` |
| What changed recently? | `historical_context` |
| Recent PRs in the area | `data_retrieval` |
| Has this happened before? | `historical_context` |
| Fetch a specific PR/issue | `link_resolver` |
