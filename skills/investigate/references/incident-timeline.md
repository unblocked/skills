# Incident Timeline Template

Use this template to build a structured timeline during investigation. A good timeline
makes the root cause obvious; a bad one leads to blind debugging.

---

## Timeline Template

```markdown
## Incident: [Brief description]

**Status:** Investigating / Root Cause Found / Resolved
**Severity:** P0 / P1 / P2 / P3
**Affected System:** [component/service]
**First Symptom:** [timestamp]
**Resolved:** [timestamp or "ongoing"]

### Timeline

| Time | Event | Source | Relevance |
|------|-------|--------|-----------|
| [timestamp] | [what happened] | [where you learned this] | [how it relates] |

### Example Timeline

| Time | Event | Source | Relevance |
|------|-------|--------|-----------|
| Mon 1pm | PR #567 "Refactor retry logic" merged | data_retrieval | Changed retry behavior |
| Mon 2pm | PR #568 "Update timeout configs" merged | data_retrieval | Changed timeout values |
| Mon 4pm | Deploy v2.3.4 to production | data_retrieval | Both PRs went live |
| Tue 9am | First user report: "payments timing out" | Support ticket | Symptom onset |
| Tue 10am | Error rate for payment service spikes 10x | Monitoring | Confirms widespread issue |
| Tue 10:15am | Investigation started | This incident | — |

### Key Correlation

[What changed between last-known-good and first symptom?]

In this example: PR #567 merged between last-known-good (Mon morning) and first
symptom (Tue 9am). The deploy at Mon 4pm is the likely trigger point.
```

---

## How to Build the Timeline

### Step 1: Anchor Points

Start with what you know for certain:
- When was the last time things were working?
- When was the first symptom observed?
- What's happening right now?

### Step 2: Fill In Between

Query Unblocked for events in the window between "last good" and "first bad":
- PRs merged
- Deployments
- Config changes
- Infrastructure updates
- Related incidents in other systems

### Step 3: Correlate

Look for:
- **Direct correlation:** A change to the affected component in the window
- **Indirect correlation:** A change to a dependency or upstream system
- **Config changes:** Feature flags, environment variables, infrastructure
- **External factors:** Provider outages, traffic spikes, certificate expirations

### Step 4: Narrow

If the window has many changes, narrow by:
- Which changes touched the affected code path?
- Which changes have the highest blast radius?
- Which changes were flagged as risky in their PRs?

---

## Common Patterns

### The Regression
A previous fix was overwritten by a new change. Timeline shows: original fix → new PR that touches same area → symptom recurrence.

### The Cascade
Change in system A causes failure in system B. Timeline shows: change in A → no issues in A → failure in B.

### The Config Drift
A config value was changed (or reverted to default) without code changes. Timeline shows: no code changes in window → config deployment → symptoms.

### The Delayed Effect
Change was deployed days ago but only triggered under specific conditions. Timeline shows: change deployed → period of normal operation → trigger condition met → symptoms.

---

## Investigation Checklist

Before concluding the timeline phase:

- [ ] I know when the last-known-good state was
- [ ] I know when the first symptom occurred
- [ ] I've queried all changes in the window (PRs, deploys, configs)
- [ ] I've checked for changes in dependent systems too
- [ ] I've identified the strongest correlation(s)
- [ ] I have 2-3 hypotheses to verify
