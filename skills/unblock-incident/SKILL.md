---
name: unblock-incident
description: >
  Incident response — rapid context for on-call engineers investigating
  production issues. Correlates recent deployments with symptoms, surfaces
  prior incidents and mitigations. Speed over thoroughness.
---

# Unblocked Incident Response

Rapid context gathering for active production incidents. Speed over thoroughness.

## Rules

- **Recent changes are the prime suspect.** Check deployments and merges first.
- **Mitigate before fixing.** Stabilize production, then investigate root cause.
- **Parallelize queries.** Run all context gathering concurrently — every minute counts.

---

## Inputs

Alert message, error, or symptoms. Optional: affected service, timeframe.

---

## Phase 1: Triage

Establish scope immediately:

- What system/service is affected?
- What's the severity? (full outage, degraded, intermittent)
- What's the blast radius? (all users, subset, single tenant)
- When did it start? (correlate with deploy times)

---

## Phase 2: Recent Deployments

**Run these concurrently:**

1. `historical_context`: "What changed recently in [affected system]?"
2. `data_retrieval`: PRs merged in the last 24-48 hours touching the affected area
3. `historical_context`: "What was deployed to [service] recently?"
4. `data_retrieval`: recent deployment or release activity

---

## Phase 3: Correlation

Cross-reference deployments with incident onset.

1. `unblocked_context_engine`: "How do [recent changes] interact with [affected system/behavior]?"
2. `unblocked_context_engine`: "What could cause [observed symptoms] in [system]?"

**Look for:** timing match between deploy and onset, changes to error handling/timeouts/retries, config changes, dependency updates.

---

## Phase 4: Prior Incidents

Has this happened before?

1. `historical_context`: "Has [system] had similar outages or issues before?"
2. `historical_context`: "How was [similar incident] mitigated and fixed?"
3. `failure_debugging`: "[error message or symptoms]"

**Capture:** previous mitigations, runbooks, known fragile areas.

---

## Phase 5: Mitigation Options

Based on gathered context, assess:

- **Rollback feasibility** — can the suspected deploy be reverted safely?
- **Known workarounds** — have prior incidents documented mitigations?
- **Feature flags** — can the affected code path be disabled?
- **Escalation** — who is the domain expert for this system?

---

## Output

**Incident brief:**

- **Timeline** — when it started, what deployed before onset
- **Suspected cause** — most likely deployment/change with evidence
- **Blast radius** — who/what is affected
- **Mitigation options** — rollback, workaround, feature flag, with feasibility
- **Domain experts** — who to escalate to
- **Prior incidents** — similar past issues and how they were resolved

---

## Tool Selection

| Question | Tool |
|---|---|
| How/why does X work? | `unblocked_context_engine` |
| What was decided about X? | `historical_context` |
| Recent PRs/issues in area X | `data_retrieval` |
| Contents of a specific PR/issue URL | `link_resolver` |
| Debug a build/runtime failure | `failure_debugging` |
