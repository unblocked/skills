---
name: unblocked-context-get-rules
description: >
  Repository coding rules and conventions via context_get_rules. Returns
  the rules a team has codified — extracted from CLAUDE.md, AGENTS.md,
  .cursorrules, CONTRIBUTING.md, and ~40 other convention files — for a
  given repo, optionally filtered by language, task, or changed file
  paths. TRIGGER when: you are about to review, generate, or refactor
  code and need to know which team conventions apply; the user asks
  "what are the coding standards / rules / conventions for this repo?";
  before opening a PR or proposing a change, to check it conforms; you
  want the must/should/can rules scoped to the files you are touching.
  DO NOT TRIGGER when: you need to find code, history, or discussion (use
  context_research or the context_search_* family); the question is about
  one specific entity's reasoning (use context_research); you only need
  the current local file contents (use Grep/Read). This is rules, not
  search.
---

# Unblocked Context Get Rules

Direct retrieval of a repository's codified coding rules. Calls `context_get_rules` to return the conventions a team has written down — the same rules Unblocked's code reviewer enforces — so an agent can conform to them *before* writing or reviewing code rather than getting flagged after.

**Source:** rules extracted server-side from a repo's convention files (`CLAUDE.md`, `AGENTS.md`, `.cursorrules`, `.github/copilot-instructions.md`, `CONTRIBUTING.md`, and ~40 other conventions). Each rule carries a severity (`must`/`should`/`can`), category, applicable tasks, and languages.

## How to Invoke

**`context_get_rules` is CLI-only in most environments** — it does not appear in the MCP tool list even when fully available. Run `command -v unblocked` once per session and cache the result. Do not conclude the tool is unavailable from the MCP surface alone. See `unblocked-tools-guide` for full routing rules.

**CLI (preferred):**
```
unblocked context-get-rules --repo-name "<owner>/<repo>" [--task <task>] [--language <lang>] [--paths <p1> <p2> ...]
```

**MCP fallback** (only if CLI is confirmed unavailable): fall back to `context_research` with `instruction: "Prefer the repository's codified coding rules and conventions extracted from CLAUDE.md, AGENTS.md, .cursorrules, and similar convention files; deprioritize other sources"`. Note the fallback returns rules content as ranked text, not the structured severity-tagged / path-scoped set you get from `context_get_rules` — prefer the CLI when you need to filter by `task`, `language`, or `paths`.

**If neither is available:** stop and tell the user Unblocked is not configured in this environment (see `unblocked-tools-guide` for the full message). Do not substitute by hand-reading `CLAUDE.md` and guessing the rule set — the extracted rules are normalized, deduped across files, and severity-tagged in a way a raw read is not.

## When This Adds Value Over Reading CLAUDE.md Yourself

- **Aggregated and deduped** — pulls from *all* convention files in the repo (root and nested), not just the one you happen to open, and merges overlapping guidance
- **Severity-tagged** — each rule is marked `must` / `should` / `can`, so you can prioritize hard requirements over preferences
- **Task- and language-scoped** — filter to just the rules that apply to what you're doing (reviewing vs generating) and the language you're in
- **Path-aware** — scope to the files you're touching so nested-directory conventions resolve correctly (see below)
- **Same rules the reviewer uses** — conforming up front avoids review churn

If a repo has a single short root `CLAUDE.md` and you already have it open, a plain read is fine. The value here grows with repo size, number of convention files, and nesting.

## Input

| Parameter | Required | Description |
|:---|:---|:---|
| `repo_name` | Yes | Repository in `owner/repo` form, e.g. `acme/payments-service`. |
| `task` | No | Filter by task: `code-review`, `code-generation`, or `code-questions`. Pass the task you're doing so you get only the relevant rules. |
| `language` | No | Filter by language, e.g. `kotlin`, `python`, `typescript`. |
| `paths` | No | Repo-relative file paths to scope rules to. CLI accepts multiple space-separated values: `--paths a/b.ts c/d.py`. MCP expects one path per line / an array. See path-scoping semantics below. Omit for repo-wide. |

## Path Scoping — The Important Nuance

`paths` is how you get *only* the rules that apply to the files in play. The scoping rule:

- A rule extracted from a **nested** convention file (e.g. `frontend/CLAUDE.md`) is returned **only when at least one of your `paths` is inside that directory** (`frontend/...`).
- Rules from **repo-root** convention files (`./CLAUDE.md`, `./AGENTS.md`) **always apply**, regardless of `paths`.

So pass the files you are **reviewing, generating, or asked about**:

```
unblocked context-get-rules \
  --repo-name "acme/payments-service" \
  --task code-review \
  --paths frontend/src/Checkout.tsx backend/src/Charge.kt
```

This returns root rules + `frontend/`-scoped rules + `backend/`-scoped rules, but not, say, `infra/`-only conventions. Omit `--paths` to pull every rule in the repo.

## When to Use This vs. Other Tools

| Situation | Use |
|:---|:---|
| About to review a PR and want the conventions for the changed files | `context-get-rules` with `--task code-review --paths <changed files>` |
| About to write a new module in this repo | `context-get-rules` with `--task code-generation --language <lang>` |
| "What are this repo's coding standards?" | `context-get-rules` (repo-wide, no filters) |
| "Why was this pattern chosen / what PR introduced it?" | `context-research` or `context-search-prs` |
| "Find the code that does X" | `context-search-code` |
| You just need the current contents of a file | Grep / Read |

`context-get-rules` answers *"what conventions must I follow here?"* — not *what the code does* or *why it exists*.

## Interpreting Results

Results come back as a list of rule sources. Each entry includes:

- **content** — the rule text plus inline metadata lines: `Severity` (`must`/`should`/`can`), `Category` (e.g. `best_practice`, `security`, `maintainability`), `Tasks`, `Languages`, and the originating `Source` file
- **title** — a short label for the rule
- **url** — a link to the convention file the rule was extracted from
- **sourceType** — always `rules`

How to act on them:

- **Treat `must` as hard requirements** — violating one will almost certainly be flagged in review. `should` are strong preferences; `can` are optional.
- **Honor the source file** — when a rule cites `frontend/AGENTS.md`, it applies to frontend code; the path scoping already filtered for relevance, but the `Source` tells you the authority.
- **Empty result is meaningful** — if a repo returns no rules, it likely has no convention files extracted yet (or rules haven't been extracted server-side); say so rather than inventing conventions.

## When to Skip

- You need to search for code, history, or discussion — use `context_research` / `context_search_*`
- You only need the current local file contents — use Grep / Read
- The repo has no codified conventions — there's nothing to return

## Reference

No separate references directory — usage is narrow enough that this SKILL.md is self-contained.
