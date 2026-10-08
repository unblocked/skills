---
name: unblocked-context-get-rules
description: >
  Returns a repository's codified coding rules with context_get_rules. Use
  before reviewing, generating, or refactoring code, or when asked for a
  repo's conventions. Use context_research for history or reasoning.
---

# Unblocked Context Get Rules

Direct retrieval of a repository's coding rules. Calls `context_get_rules` to return the conventions a team has written down, so an agent can conform to them before writing or reviewing code rather than being flagged after.

**Source:** rules extracted server-side from the repo's convention files (`CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `CONTRIBUTING.md`, and similar). Each rule carries a severity (`must`/`should`/`can`), category, tasks, languages, and its source file.

## How to Invoke

**`context_get_rules` is exposed on both CLI and MCP.** Prefer the CLI when available for uniform behavior. Run `command -v unblocked` once per session and cache the result. See `unblocked-tools-guide` for full routing rules.

**CLI (preferred):**
```
unblocked context-get-rules --repo-name "<owner>/<repo>" [--task <task>] [--language <lang>] [--paths <p1> <p2> ...] [--rule-id <id>]
```

**MCP fallback** (use if CLI is confirmed unavailable): call `context_get_rules` with `repo_name` and the same optional filters. On MCP, `paths` is a single string with one path per line.

**If neither is available:** stop and tell the user Unblocked is not configured in this environment (see `unblocked-tools-guide` for the full message). Do not substitute by hand-reading `CLAUDE.md` and guessing the rule set.

## When This Adds Value Over Reading CLAUDE.md Yourself

- **Aggregated** — pulls from every convention file in the repo, root and nested, not just the one you have open
- **Severity-tagged** — `must` / `should` / `can`, so hard requirements stand out from preferences
- **Scoped** — filter to the task, language, and files you are working on

If a repo has one short root `CLAUDE.md` and you already have it open, a plain read is fine. The value grows with repo size and nesting.

## Input

| Parameter | Required | Description |
|:---|:---|:---|
| `repo_name` | Yes | Repository in `owner/repo` form, e.g. `acme/payments-service`. CLI: `--repo-name`. |
| `task` | No | `code-review`, `code-generation`, or `code-questions`. |
| `language` | No | e.g. `kotlin`, `python`, `typescript`. Unrecognized values, such as framework names, are matched as raw text. |
| `paths` | No | Repo-relative file paths to scope rules to. CLI: `--paths a/b.ts c/d.py`. MCP: one path per line. Omit for repo-wide. |
| `rule_id` | No | Return only this rule. Other filters are ignored when set. CLI: `--rule-id`. |

## Path Scoping

- A rule from a nested convention file (e.g. `frontend/CLAUDE.md`) is returned only when at least one of your `paths` is inside that directory.
- Rules from repo-root convention files always apply.

Pass the files you are reviewing, generating, or asked about:

```
unblocked context-get-rules \
  --repo-name "acme/payments-service" \
  --task code-review \
  --paths frontend/src/Checkout.tsx backend/src/Charge.kt
```

This returns root rules plus `frontend/` and `backend/` rules, but not `infra/`-only rules.

## When to Use This vs. Other Tools

| Situation | Use |
|:---|:---|
| Reviewing a PR and want the conventions for the changed files | `context-get-rules --task code-review --paths <changed files>` |
| Writing a new module in this repo | `context-get-rules --task code-generation --language <lang>` |
| "What are this repo's coding standards?" | `context-get-rules` with no filters |
| "Why was this pattern chosen?" | `context-research` or `context-search-prs` |
| "Find the code that does X" | `context-search-code` |
| Current contents of a local file | Grep / Read |

## Interpreting Results

Each rule comes back with its title, ID, description, `Severity`, `Category`, `Tasks`, `Languages`, `Source` file, and a URL to that file.

- **Treat `must` as a hard requirement.** `should` is a strong preference; `can` is optional.
- **`Source` tells you the authority** — a rule from `frontend/AGENTS.md` governs frontend code.
- **"No coding rules found for this repository."** means none were extracted, or none matched your filters. Say so rather than inventing conventions.
- **"Repository '…' not found."** covers both an unknown repo and one you cannot access. Check the `owner/repo` spelling before retrying.

## When to Skip

- You need code, history, or discussion — use `context_research` or `context_search_*`
- You only need the current local file contents — use Grep / Read

## Reference

No separate references directory — usage is narrow enough that this SKILL.md is self-contained.
