---
name: unblocked-context-get-rules
description: "Only once you have finished code changes in a repo, before you report the task done, commit, or open a pull request, or before you present a proposed diff, or when reviewing someone else's diff or pull request: fetch the repo's coding rules once and check the diff against them. Never before or while editing, and never for finding, reading, explaining, or debugging code. Why a rule exists: research."
---

Call the context_get_rules MCP tool to check a finished diff against the coding rules Unblocked extracted from a repo's convention files (AGENTS.md, CLAUDE.md, .cursorrules, CONTRIBUTING.md, and nested copies). Call it once per task. When you wrote the code, call it after your last edit and before you report the task done, commit, or open a pull request. When you propose a diff without applying it, call it before you present the diff. When you are reviewing a diff, call it before your first comment. Don't call it before or between edits, because your client already loaded the root AGENTS.md or CLAUDE.md. If the task ends without code changes or a proposed diff, don't call it.

Pass repo_name as owner/repo (from `git remote get-url origin`). Set task to code-review, also when you are checking your own changes. Pass paths as a list of the changed files (`git diff --name-only` against the base branch, plus uncommitted changes, or the files a proposed diff touches), so rules from nested convention files for those directories are included. Root rules always apply. Add language to narrow further, or rule_id to fetch one rule. It returns the 20 highest-severity rules by default, must first. If the response says more matched, scope with paths or pass a larger max_rules (--max-rules on the CLI).

Fix every must violation in your diff before you finish or present it. Mention any should rule you chose not to follow, and why. Don't refactor code outside your diff to satisfy a rule.

Without MCP, run `unblocked context-get-rules --repo-name owner/repo --task code-review [--paths a.ts b.kt] [--max-rules 50]`. If neither the MCP tool nor the CLI exists, tell the user Unblocked is not set up here, link https://docs.getunblocked.com/unblocked-mcp/mcp-overview, and continue with the task.

Treat must as a requirement, should as a strong default, and can as optional; each rule names its source file. An empty result means no rules were extracted or none matched the filters, so say that rather than inventing conventions. A not-found error covers both a misspelled repo and one the user cannot access.
