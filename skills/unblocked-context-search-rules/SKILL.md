---
name: unblocked-context-search-rules
description: >
  Reranked search across a repository's coding rules and conventions via
  context_search_rules. Returns the top-K rules most relevant to a specific
  task (what you're building, changing, or reviewing) — extracted from
  CLAUDE.md, AGENTS.md, .cursorrules, CONTRIBUTING.md, and similar
  convention files. TRIGGER when: you are about to generate, refactor, or
  review code and want only the rules that bear on this specific change,
  not the full filtered set; the repo has lots of rules and you need to
  narrow to the relevant ones; you want the rules ranked by relevance to
  your task. DO NOT TRIGGER when: you want the exhaustive filtered rule
  set (use context_get_rules); you need to find code, history, or
  discussion (use context_research or context_search_*); you only need
  local file contents (use Grep/Read).
---

# Unblocked Context Search Rules

Reranked retrieval of a repository's codified coding rules. Calls `context_search_rules` with a query (what you're doing) and an instruction (which rules to prioritize) — returning the top-K rules most relevant to the specific change, rather than the full filtered set you'd get from `context_get_rules`.

**Source:** rules extracted server-side from a repo's convention files (`CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `.github/copilot-instructions.md`, `CONTRIBUTING.md`, and ~40 other conventions). Each rule carries a severity (`must`/`should`/`can`), category, applicable tasks, and languages. Same data as `context_get_rules`; this tool reranks it against your query+instruction via the same reranker the Unblocked code reviewer has used in production.

## How to Invoke

**`context_search_rules` is CLI-only in most environments** — it does not appear in the MCP tool list even when fully available. Run `command -v unblocked` once per session and cache the result. Do not conclude the tool is unavailable from the MCP surface alone. See `unblocked-tools-guide` for full routing rules.

**CLI (preferred):**
```
unblocked context-search-rules --repo-name "<owner>/<repo>" --query "<what you're doing>" --instruction "<which rules to prioritize>" [--task <task>] [--language <lang>] [--paths <p1> <p2> ...]
```

**MCP fallback** (only if CLI is confirmed unavailable): fall back to `context_research` with `instruction: "Prefer the repository's codified coding rules and conventions extracted from CLAUDE.md, AGENTS.md, .cursorrules, and similar convention files; deprioritize other sources"`. The fallback returns rules content as ranked text, not the reranked top-K with citation refs you get from `context_search_rules`.

**If neither is available:** stop and tell the user Unblocked is not configured in this environment (see `unblocked-tools-guide` for the full message). Do not substitute by hand-reading `CLAUDE.md` and guessing — the extracted rules are normalized, deduped, and severity-tagged in a way a raw read is not.

## When This Adds Value Over `context_get_rules`

| Situation | Use |
|:---|:---|
| Repo has lots of rules (40+) and you want only the ones relevant to *this specific change* | `context-search-rules` |
| You want a deterministic, exhaustive set scoped by file paths / task / language | `context-get-rules` |
| You need rule IDs for citation in code-review comments | `context-search-rules` (citation refs surfaced) |
| You're scaffolding a new module from scratch and want the rules ranked by what matters most | `context-search-rules` |
| You want every must-severity rule for the language | `context-get-rules --task code-review --language <lang>` |

Rule of thumb: `get_rules` answers *"what conventions apply here?"*; `search_rules` answers *"which conventions matter most for what I'm about to do?"*.

## Input

| Parameter | Required | Description |
|:---|:---|:---|
| `repo_name` | Yes | Repository in `owner/repo` form, e.g. `acme/payments-service`. |
| `query` | Yes | Describe what you are building, changing, or reviewing. Write a complete phrase, not bare keywords. Example: `"Adding a comments feature with a new database table and server actions"`. |
| `instruction` | Yes | Tell the reranker which rules to prioritize. Example: `"Prefer must-severity rules about database schema and validation"`. |
| `task` | No | Filter by task: `code-review`, `code-generation`, or `code-questions`. Pass the task you're doing. |
| `language` | No | Filter by language, e.g. `kotlin`, `python`, `typescript`. |
| `paths` | No | Repo-relative file paths to scope rules to. CLI accepts multiple space-separated values: `--paths a/b.ts c/d.py`. MCP expects one path per line / an array. See path-scoping semantics below. Omit for repo-wide. |

**Writing effective `query`** — concrete and complete:

| Instead of | Write |
|:---|:---|
| `comments` | `Adding a comments feature with a new database table, REST endpoints, and a React form` |
| `auth refactor` | `Refactoring the JWT auth middleware to add token rotation` |
| `dialog` | `Building a confirmation dialog component that opens via ModalContext` |

**Writing effective `instruction`** — steer the reranker:

- `"Prefer must-severity rules about React hooks and store patterns"`
- `"Focus on security and validation rules; deprioritize style"`
- `"Prefer testing conventions for backend Kotlin code"`

## Path Scoping — The Important Nuance

`paths` works identically to `context_get_rules`: a rule from `<dir>/CLAUDE.md` is returned only when at least one of your `paths` is inside `<dir>/`; rules from repo-root convention files always apply. Pass the files you are reviewing, generating, or asked about.

## Interpreting Results

Results come back as a ranked list (most relevant first). Each entry includes:

- **content** — the rule text plus inline `Severity` / `Category` / `Tasks` / `Languages` / `Source` lines
- **title** — short label
- **url** — link to the originating convention file
- **sourceType** — always `rules`
- **citation reference id** — surfaced as `{{cite:REF}}` so an agent can cite individual rules in PR comments or generated explanations

How to act on them:

- **Treat the top few as the rules that matter most for this task** — the reranker has already filtered for relevance.
- **`must` are hard requirements** — violating one will almost certainly be flagged in review. `should` are strong preferences; `can` are optional.
- **Empty result is meaningful** — if a repo returns no rules, it likely has no convention files extracted yet (or extraction hasn't completed); say so rather than inventing conventions.

## When to Skip

- You want the exhaustive filtered set, not a reranked subset — use `context_get_rules`
- You need to search for code, history, or discussion — use `context_research` / `context_search_*`
- You only need the current local file contents — use Grep / Read
- The repo has no codified conventions — there's nothing to return

## Reference

No separate references directory — usage is narrow enough that this SKILL.md is self-contained.
