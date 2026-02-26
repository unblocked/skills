# Enrichment Template

Templates for ticket enrichment output. Select the appropriate mode.

---

## Engineering Enrichment

```markdown
# Enrichment: [Ticket ID] — [Summary]

> Enriched on [date] using Unblocked context.
> Mode: Engineering

## Ticket Summary

[One-line summary of the issue or request.]

## Affected Systems

| System | Key Files | Relevance |
|--------|-----------|-----------|
| [component] | [file paths] | [why it's involved] |

## Related Work

| Item | Summary | Relevance |
|------|---------|-----------|
| PR #[N] | [what it did] | [how it relates] |
| Ticket [ID] | [what it describes] | [overlap or dependency] |
| Decision: [topic] | [what was decided] | [constraint it creates] |

## Historical Context

- **Prior attempts:** [what was tried, what happened]
- **Known constraints:** [architectural, performance, or organizational limits]
- **Rejected approaches:** [what was considered and why it was dropped]

## Code Context

- **Entry point:** `[path]` — [what triggers the relevant flow]
- **Core logic:** `[path]` — [where the main behavior lives]
- **Related patterns:** [team conventions relevant to this work]

## Suggested Direction

[Brief guidance based on team patterns — not a full plan, just enough to point the implementer in the right direction.]
```

---

## Support Enrichment

```markdown
# Enrichment: [Ticket ID] — [Summary]

> Enriched on [date] using Unblocked context.
> Mode: Support

## Ticket Summary

[One-line summary of the user-reported issue.]

## Product Behavior

- **Expected behavior:** [how the feature is designed to work]
- **Known limitations:** [documented constraints or edge cases]
- **Affected area:** [which product surface / feature]

## Related Reports

| Report | Summary | Resolution |
|--------|---------|------------|
| [Ticket ID] | [similar issue] | [how it was resolved] |

## Resolution History

- **Common cause:** [if this type of issue has a known root cause]
- **Past fixes:** [what was done previously]
- **Workarounds:** [if any exist for the user]

## Escalation Context

- **Owning team:** [which team owns the affected system]
- **Domain experts:** [who to ask]
- **Related systems:** [upstream/downstream dependencies]
```

---

## Tips

1. **Be specific.** "The payment service" is less useful than "`src/payments/processor.ts` — handles charge creation via Stripe API."
2. **Cite everything.** Every claim should trace back to a PR, decision, or Unblocked query.
3. **Don't solve the ticket.** The enrichment provides context — the implementer or support agent decides the approach.
