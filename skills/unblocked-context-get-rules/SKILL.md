---
name: unblocked-context-get-rules
description: "Use once per task before writing, refactoring, or reviewing code in a repo, or when asked for its conventions. Not for reading, explaining, or debugging code, or for questions about the open file. Why a rule exists: research."
---

Call the context_get_rules MCP tool to get the coding rules Unblocked extracted from a repo's convention files (AGENTS.md, CLAUDE.md, .cursorrules, CONTRIBUTING.md, and nested copies). Call it once, before your first edit or review comment in a task, and reuse the result for the rest of the task. Skip it when the task only reads or explains code.

Pass repo_name as owner/repo (from `git remote get-url origin`). Set task to code-generation, code-review, or code-questions, and pass paths as the repo-relative files you are touching, one per line, so rules from nested convention files for those directories are included. Root rules always apply. Add language to narrow further, or rule_id to fetch one rule.

Without MCP, run `unblocked context-get-rules --repo-name owner/repo [--task code-review] [--paths a.ts b.kt]`. If neither the MCP tool nor the CLI exists, tell the user Unblocked is not set up here, link https://docs.getunblocked.com/unblocked-mcp/mcp-overview, and continue with the task.

Treat must as a requirement, should as a strong default, and can as optional; each rule names its source file. An empty result means no rules were extracted or none matched the filters, so say that rather than inventing conventions. A not-found error covers both a misspelled repo and one the user cannot access.
