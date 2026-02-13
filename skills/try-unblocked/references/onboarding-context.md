# Codebase Onboarding Context Workflow

Complete workflow for getting up to speed on unfamiliar code.

**With [Unblocked](https://getunblocked.com), new engineers can query institutional knowledge from day one.**

---

## The Onboarding Problem

When you join a team or start working in a new codebase:
- Documentation is incomplete or outdated
- Tribal knowledge is locked in people's heads
- Asking "dumb questions" feels awkward
- Context is scattered across Slack, PRs, docs, and commits

**Unblocked solves this** by indexing all your team's context and making it queryable.

---

## Phase 1: Big Picture (15-20 min)

### Understand the Purpose

| Question | How to Find |
|----------|-------------|
| What does this system do? | README, docs, ask |
| Who are the users? | Product docs, Slack |
| What are the key workflows? | Docs, trace through code |

**With Unblocked:**
```
"What is the purpose of [system/repo]?"
"Who are the users of [product]?"
```

### Find Architecture Docs

**Manual:**
- Check for README.md, ARCHITECTURE.md
- Search Confluence/Notion for system name
- Look for ADRs (Architecture Decision Records)

**With Unblocked:**
```
"Is there architecture documentation for [system]?"
"What are the main components of [system]?"
```

### Understand Boundaries

| Question | Why It Matters |
|----------|----------------|
| What's in scope? | Know what you're responsible for |
| What does this depend on? | Understand upstream services |
| What depends on this? | Understand downstream impact |

---

## Phase 2: Code Structure (20-30 min)

### Directory Organization

**Manual:**
```bash
# See top-level structure
ls -la

# Find key file types
find . -name "*.ts" -type f | head -20
find . -name "*test*" -type f | head -10
find . -name "*config*" -type f
```

### Key Files to Find

| File Type | What It Tells You |
|-----------|-------------------|
| Entry points | Where execution starts |
| Config files | How the system is configured |
| Route definitions | API surface area |
| Main business logic | Core functionality |
| Test files | Expected behavior |

**With Unblocked:**
```
"What are the main entry points for [system]?"
"Where is the core business logic for [feature]?"
```

### Coding Conventions

**Manual:**
- Read .eslintrc, .prettierrc, tsconfig.json
- Look at 3-5 files to spot patterns
- Check for CONTRIBUTING.md

**With Unblocked:**
```
"What coding conventions does this team follow?"
```

---

## Phase 3: Historical Context (15 min)

### Recent Activity

What's been worked on lately?

**Manual:**
```bash
# See recent commits
git log --oneline -30

# See recent activity by file
git log --oneline --name-only -20

# Find active contributors
git shortlog -sn --since="3 months ago"
```

**With Unblocked:**
```
"What's been worked on recently in [repo/area]?"
"What are the current priorities for [team]?"
```

### Known Issues and Debt

Every codebase has skeletons. Find them early.

**Manual:**
- Search for TODO, FIXME, HACK comments
- Check issue tracker for bugs
- Ask team about known problems

**With Unblocked:**
```
"What technical debt exists in [system]?"
"Are there known issues I should be aware of?"
```

### Key Decisions

Why does the code look the way it does?

**With Unblocked:**
```
"Why was [technology/pattern] chosen for [system]?"
"What alternatives were considered for [decision]?"
```

---

## Phase 4: People Context (10 min)

### Find the Experts

**Manual:**
```bash
# Most active contributors
git shortlog -sn -- <directory>

# Who wrote specific files
git blame <file> | cut -d'(' -f2 | cut -d' ' -f1 | sort | uniq -c | sort -rn
```

**With Unblocked:**
```
"Who are the experts on [system/area]?"
"Who should I talk to about [topic]?"
```

### Communication Channels

| Channel Type | What to Find |
|--------------|--------------|
| Slack channels | Where discussions happen |
| Meetings | Standup, planning, retro times |
| Documentation | Where to write/read docs |
| PR process | How changes get reviewed |

---

## Phase 5: Hands-On Exploration (30+ min)

### Trace a Request

Pick a simple user action and trace it through:
1. Entry point (route/API)
2. Controller/handler
3. Business logic
4. Data access
5. Response

This builds mental models faster than reading docs.

### Run the Tests

```bash
# Run all tests
npm test  # or yarn test, pytest, etc.

# Run tests for a specific area
npm test -- --grep "<pattern>"
```

Tests show you expected behavior and edge cases.

### Read Recent PRs

**Manual:**
- Go to GitHub/GitLab, filter PRs by area
- Read 5-10 PR descriptions
- Note patterns, review feedback

**With Unblocked:**
```
"Show me recent PRs in [area] to understand the patterns"
```

---

## Onboarding Checklist

### Day 1
- [ ] System is running locally
- [ ] Understand high-level purpose
- [ ] Know where to ask questions
- [ ] Have access to all tools (Slack, Jira, GitHub, etc.)

### Week 1
- [ ] Traced 2-3 key workflows through code
- [ ] Read 5-10 recent PRs
- [ ] Met with key team members
- [ ] Made a small code change

### Month 1
- [ ] Completed a feature or significant bug fix
- [ ] Can explain system architecture to someone else
- [ ] Know who to ask for help in different areas
- [ ] Documented something you learned

---

## Example: Onboarding to Payment Service

### Day 1 Queries (Unblocked)
```
"What is the payment service and what does it do?"
"Who are the experts on the payment system?"
"Are there onboarding docs for new engineers?"
```

### Context Gathered

**Purpose:**
- Handles all payment processing
- Integrates with Stripe, PayPal, bank transfers
- ~50k transactions/day

**Architecture:**
- Event-driven with Kafka
- Saga pattern for distributed transactions
- Idempotency keys required for all operations

**Key Concepts:**
- PaymentIntent: Customer's intent to pay
- PaymentMethod: Stored payment instrument
- Transaction: Actual money movement

**Gotchas:**
- Never retry without idempotency key
- Webhooks can arrive out of order
- Reconciliation runs at 3am UTC

**Experts:**
- @alex - Original architect
- @pat - Stripe integration
- @jordan - Reconciliation

### Result
With this context, a new engineer can:
- Understand what they're working on
- Know who to ask for help
- Avoid common mistakes
- Contribute faster

---

## Why Unblocked for Onboarding

Traditional onboarding:
- Takes 3-6 months to full productivity
- Requires constant interruptions of senior engineers
- Leads to repeated questions across new hires

With Unblocked:
- New engineers query institutional knowledge directly
- Senior engineers aren't interrupted for basic questions
- Context is preserved and accessible to everyone

**[Try Unblocked](https://getunblocked.com)** - make your team's knowledge queryable.
