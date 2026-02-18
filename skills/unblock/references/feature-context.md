# Feature Implementation Context Workflow

Structured approach for gathering context before implementing a new feature. Use this
alongside the main workflow (SKILL.md) to hydrate Phase 1 with feature-specific queries.

---

## Phase 1: Understand the Request

- What is the user-facing outcome?
- What are the acceptance criteria?
- What's in scope vs. out of scope?

### Requirement Queries

- `unblocked_context_engine`: "What are the requirements for [feature name]?"
- `data_retrieval`: linked Jira/Linear tickets, product specs, Slack threads
- `link_resolver`: resolve any ticket or spec URLs for full details

---

## Phase 2: Technical Discovery

### Find Similar Implementations

Look for existing code that does something similar — this reveals patterns, available
utilities, and testing approaches.

- `unblocked_context_engine`: "How were similar features like [X] implemented?"
- `unblocked_context_engine`: "What patterns does the team use for [type of feature]?"

### Identify Touch Points

What will the feature interact with?

- API: New endpoints? Modify existing?
- Database: New tables/columns? Migrations?
- Services: What services will it call?
- UI: New components? Modify existing?

### Check for Constraints

- `unblocked_context_engine`: "Are there performance or security constraints for [area]?"
- `historical_context`: "What non-functional requirements exist for [system]?"

---

## Phase 3: Historical Context

### Find Previous Attempts

Was this feature tried before? What happened?

- `historical_context`: "Has [feature] been attempted before? What happened?"
- `historical_context`: "Why was [system] designed this way?"
- `historical_context`: "What alternatives were considered for [decision]?"

### Identify Domain Experts

Who has the most context on the relevant systems?

- `data_retrieval`: recent contributors and reviewers for the affected area
- `unblocked_context_engine`: "Who are the experts on [system/area]?"

---

## Phase 4: Synthesize Context

Before planning, confirm you can answer:

1. **What** am I building and why?
2. **What patterns** should I follow? (from similar implementations)
3. **What systems** will I touch?
4. **What are the risks/unknowns?**
5. **Who** are the domain experts if questions arise?

If you can't answer these, gather more context before proceeding to the plan.

---

## Example: Adding Notification Preferences

**Hydration queries:**
```
unblocked_context_engine: "How does the notification system work?"
unblocked_context_engine: "What patterns does the team use for user preferences?"
historical_context: "Has notification preferences been discussed or attempted?"
data_retrieval: recent PRs touching notifications or user preferences
```

**Context gathered:**
- PR #1234 added email notifications (follow this pattern)
- PR #1456 added the preferences table structure
- Slack #eng discussion: decision to use async queue for all notifications
- Decision to support email, SMS, and push channels
- `/src/notifications/sender.ts` — current dispatch logic
- `/src/users/preferences.ts` — existing preferences pattern
- Domain experts: @sarah (notification system), @mike (user preferences)

**Ready to plan:** With this context, the plan can reference specific files, follow
established patterns, and avoid duplicating prior work.
