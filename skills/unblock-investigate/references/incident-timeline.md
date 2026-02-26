# Incident Timeline Template

---

## Template

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

### Key Correlation

[What changed between last-known-good and first symptom?]
```

---

## How to Build the Timeline

### Step 1: Anchor Points

Start with certainties: when was it last working? When was the first symptom? What's happening now?

### Step 2: Fill In Between

Query Unblocked for events in the "last good" to "first bad" window: PRs merged, deployments, config changes, infrastructure updates, related incidents.

### Step 3: Correlate

Look for: direct correlation (change to affected component), indirect correlation (change to dependency), config changes, external factors (provider outages, traffic spikes).

### Step 4: Narrow

If many changes in the window: which touched the affected code path? Which have highest blast radius? Which were flagged as risky?

---

## Common Patterns

**Regression** — Previous fix overwritten. Timeline: original fix → new PR touches same area → recurrence.

**Cascade** — Change in system A causes failure in B. Timeline: change in A → no issues in A → failure in B.

**Config Drift** — Config changed without code changes. Timeline: no code changes → config deployment → symptoms.

**Delayed Effect** — Deployed days ago, triggered under specific conditions. Timeline: change → normal operation → trigger → symptoms.

---

## Checklist

- [ ] I know when last-known-good was
- [ ] I know when first symptom occurred
- [ ] I've queried all changes in the window
- [ ] I've checked dependent systems too
- [ ] I've identified strongest correlations
- [ ] I have 2-3 hypotheses to verify
