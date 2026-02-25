---
name: investigate
description: >
  Structured incident and bug investigation powered by Unblocked. Triages issues
  by correlating symptoms with recent deployments, PRs, and historical incidents.
  Builds a timeline, generates hypotheses grounded in organizational context, then
  verifies against code. Produces a fix with regression protection. Use for
  production incidents, complex bugs, or any issue requiring root cause analysis.
---

# Structured Investigation

Investigates incidents and bugs using organizational context to accelerate root cause
analysis. Instead of blind debugging, correlates symptoms with recent changes, prior
incidents, and team knowledge to build hypotheses before diving into code.

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  1. TRIAGE         (Agent + Unblocked)                       │
│     │              Classify severity, gather symptoms,       │
│     │              query recent deployments                  │
│     ▼                                                        │
│  2. TIMELINE       (Unblocked)                               │
│     │              Correlate onset with PRs, deploys,        │
│     │              config changes                            │
│     ▼                                                        │
│  3. HYPOTHESIZE    (Agent + Unblocked)                       │
│     │              2-3 candidates, check if seen before      │
│     ▼                                                        │
│  4. VERIFY         (Agent)                                   │
│     │              Test hypotheses against code              │
│     │              Confirm root cause                        │
│     ▼                                                        │
│  5. FIX + PROTECT  (Agent + Unblocked)                       │
│     │              Fix + regression guard + review            │
│     ▼                                                        │
│     DONE                                                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Principles

- **Correlate before debugging.** Don't read code first — build a timeline of what changed first.
- **Check if it happened before.** Many incidents are regressions. Unblocked remembers even when the team doesn't.
- **Hypothesize, then verify.** Generate candidates from context before diving into code. Blind debugging is slow.
- **Protect, don't just fix.** Every fix should include a regression guard (test, assertion, alert).
- **Document the root cause.** Future investigators will thank you.

---

## Phase 1: Triage (Agent + Unblocked)

Classify the issue and gather initial context before investigating.

### Gather Symptoms

- What is happening vs. what should happen?
- When did it start? Is it intermittent or consistent?
- What system/component is affected?
- What is the blast radius? (one user, all users, one service, cascading)
- Is there an error message, stack trace, or log entry?

### Initial Context Queries

1. `failure_debugging`: "[error message or symptom description]" — this is the centerpiece tool for investigation. Start here.
2. `unblocked_context_engine`: "How does [affected component] work?"
3. `unblocked_context_engine`: "What are the known failure modes for [system]?"

### Classify Severity

- **P0 — Outage:** Core functionality broken for all users. Fix now, investigate in parallel.
- **P1 — Major:** Significant impact, workaround may exist. Investigate immediately.
- **P2 — Minor:** Limited impact. Investigate during normal workflow.
- **P3 — Low:** Cosmetic or edge case. Investigate when convenient.

For P0/P1: Note the start time. Every minute of timeline matters.

---

## Phase 2: Timeline (Unblocked)

Build a chronological picture of what changed around the time the issue started.

**Required queries:**

1. `historical_context`: "What changed recently in [affected system]?"
2. `data_retrieval`: PRs merged in the timeframe around symptom onset
3. `historical_context`: "When was [affected code/config] last modified and why?"
4. `data_retrieval`: recent deployments or releases affecting the area
5. `unblocked_context_engine`: "Were there any config changes or infrastructure updates to [system]?"

**Build the timeline:**

```
[Date/Time] — [Event] — [Source]
Example:
  Mon 2pm  — PR #567 merged: "Refactor retry logic"     — data_retrieval
  Mon 4pm  — Deploy v2.3.4 to production                — data_retrieval
  Tue 9am  — First error reports from users              — symptom data
  Tue 10am — Error rate spikes in monitoring             — symptom data
```

**Correlate:** What changed between "last known good" and "first symptom"?

See `references/incident-timeline.md` for a detailed timeline template.

---

## Phase 3: Hypothesize (Agent + Unblocked)

Generate 2-3 candidate root causes based on the timeline and context.

### For Each Hypothesis

1. **State the hypothesis:** "The issue is caused by [X] because [Y]"
2. **Check if it happened before:**
   - `historical_context`: "Has [this type of issue] occurred before in [system]?"
   - `historical_context`: "Has the fix for [candidate cause] regressed before?"
3. **Assess likelihood:** Based on timeline correlation and prior history
4. **Define verification:** What would you check in the code to confirm or rule out this hypothesis?

### Rank Hypotheses

Order by:
1. Timeline correlation (strongest: change happened right before symptoms)
2. Prior history (the same thing broke before)
3. Blast radius match (the hypothesis explains the observed impact)

**Proceed to verify the most likely hypothesis first.**

---

## Phase 4: Verify (Agent)

Test the top hypothesis against the actual code.

### Verification Steps

1. **Read the suspected code** — Does it behave as the hypothesis predicts?
2. **Trace the execution path** — Follow the code from trigger to failure point
3. **Check the specific change** — If a PR/commit is suspected, read the exact diff
4. **Reproduce if possible** — Can you trigger the issue locally?

### If the hypothesis is confirmed:
- State the root cause clearly
- Explain the chain: [change] → [effect] → [symptom]
- Proceed to Phase 5

### If the hypothesis is disproven:
- State why it was ruled out
- Move to the next hypothesis
- If all hypotheses are disproven, return to Phase 2 with broader queries

---

## Phase 5: Fix + Protect (Agent + Unblocked)

Fix the issue and add protection against regression.

### The Fix

1. **Query Unblocked for fix patterns:**
   - `unblocked_context_engine`: "How have similar issues been fixed in this area?"
   - `unblocked_context_engine`: "What conventions does the team follow for [type of fix]?"

2. **Implement the fix** following team patterns

3. **Review the fix against context:**
   - `unblocked_context_engine`: "Does this fix align with how the team handles [type of issue]?"
   - `historical_context`: "Has this fix approach been tried before? Any issues?"

### Regression Protection

Every fix should include at least one:
- **Test** that would have caught this issue
- **Assertion** in the code that prevents the same failure mode
- **Monitoring/alerting** suggestion if the issue is operational

### Root Cause Summary

Document the investigation for future reference:

1. **Symptom:** What was observed
2. **Root cause:** What caused it (chain of events)
3. **Fix:** What was changed
4. **Protection:** What prevents regression
5. **Timeline:** When it started, when it was fixed

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
| How are similar issues fixed? | `unblocked_context_engine` |
