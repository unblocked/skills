# Feature Implementation Context Workflow

Structured approach for gathering context before implementing a feature. Use alongside
the main workflow (SKILL.md) to hydrate Phase 1 with feature-specific queries.

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

- `unblocked_context_engine`: "How were similar features like [X] implemented?"
- `unblocked_context_engine`: "What patterns does the team use for [type of feature]?"

### Identify Touch Points

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

- `historical_context`: "Has [feature] been attempted before? What happened?"
- `historical_context`: "Why was [system] designed this way?"
- `historical_context`: "What alternatives were considered for [decision]?"

### Identify Domain Experts

- `data_retrieval`: recent contributors and reviewers for the affected area
- `unblocked_context_engine`: "Who are the experts on [system/area]?"

---

## Phase 4: Synthesize Context

Before planning, confirm you can answer:

1. **What** am I building and why?
2. **What patterns** should I follow?
3. **What systems** will I touch?
4. **What are the risks/unknowns?**
5. **Who** are the domain experts if questions arise?

If you can't answer these, gather more context before proceeding to the plan.
