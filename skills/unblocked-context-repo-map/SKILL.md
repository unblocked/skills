---
name: unblocked-context-repo-map
description: >
  Returns a repository's structural map with context_repo_map: ranked
  files, symbol definitions, reference counts, and dependents. Use for
  orientation, impact, and usage questions. Use context_search_code to
  find code by concept.
---

# Unblocked Context Repo Map

Structural index of one repository. Calls `context_repo_map` to answer "where do I start in this repo?", "is X used, and how heavily?", and "who is affected if I change this?" from a precomputed, PageRank-ranked map. One deterministic call, no file reads.

**Source:** a map built during code ingestion at the last indexed commit: parsed files, symbol definitions with line numbers, and cross-file references.

## How to Invoke

**`context_repo_map` is enabled per org.** It appears in the MCP tool list only when the org has turned it on; the CLI subcommand exists either way but returns "not found" when the map is off. Run `command -v unblocked` once per session and cache the result. See `unblocked-tools-guide` for full routing rules.

**CLI (preferred):**
```
unblocked context-repo-map --repo-name "<owner>/<repo>" [--view overview|definitions|dependents] [--files <p...>] [--symbols <s...>] [--languages <l...>] [--max-files <n>] [--token-budget <n>] [--min-callers <n>]
```

**MCP fallback** (use if CLI is confirmed unavailable): call `context_repo_map` with `repo_name` and the same options in snake_case (`max_files`, `token_budget`, `min_callers`). `files`, `symbols`, and `languages` are arrays.

**If the map is not available for the org:** use `context_search_code` for cross-repo code, or Grep / Read locally. Do not guess at reference counts.

## Views

| View | Target | Returns |
|:---|:---|:---|
| `overview` (default) | none | Top files by structural importance (PageRank), each with its leading definitions and reference counts. |
| `definitions` | exactly one of `files` or `symbols` | For `files`: the symbols each file defines, ranked by cross-file references. For `symbols`: each symbol's definition site (`path:line`, kind, signature) and how many files reference or import it. |
| `dependents` | `files`, `symbols`, or both | The files that import or reference the targets, with sample locations. |

Passing both `files` and `symbols` to `definitions`, or no target to `definitions` or `dependents`, returns an error message naming the fix.

## Input

| Parameter | Required | Description |
|:---|:---|:---|
| `repo_name` | Yes | Repository in `owner/repo` form. CLI: `--repo-name`. |
| `view` | No | `overview` (default), `definitions`, or `dependents`. |
| `files` | No | Repo-relative paths to target. `languages` is ignored when `files` is set. |
| `symbols` | No | Symbol names (classes, functions, types) to target. |
| `languages` | No | Case-insensitive allowlist, e.g. `kotlin`, `python`. Applies to `overview` and `symbols`. |
| `max_files` | No | `overview` only. Default 30. CLI: `--max-files`. |
| `token_budget` | No | Approximate cap on output size. Default 4096. Lowest-ranked entries are dropped to fit. CLI: `--token-budget`. |
| `min_callers` | No | `definitions` with `files` only. Keep symbols referenced by at least this many other files. Default 0; use e.g. 3 for blast radius. CLI: `--min-callers`. |

`dependents` (boolean) is deprecated. Use `view: dependents`.

## When to Use This vs. Other Tools

| Situation | Use |
|:---|:---|
| New to a repo and need the important files | `context-repo-map` (overview) |
| Reviewing a diff and want its blast radius | `context-repo-map --view definitions --files <changed files> --min-callers 3` |
| "Is `AuthService` used, and where is it defined?" | `context-repo-map --view definitions --symbols AuthService` |
| "Who breaks if I change this file?" | `context-repo-map --view dependents --files <path>` |
| "How is retry logic implemented?" (concept, not a name) | `context-search-code` |
| "Why was it built this way?" | `context-research` |
| Exact lines of a local file | Grep / Read |

## Interpreting Results

- The header gives the commit the map was built at, total parsed files and definitions, and `TRUNCATED to fit token budget` when output was cut. Raise `token_budget` or narrow the target if truncated.
- **References are matched by name.** Identically named symbols share one count, so treat counts as an upper bound for common names.
- **Counts stay within a language family**: Kotlin, Java, and Scala count together, as do TypeScript and JavaScript, and C and C++. A Python reference never counts toward a Kotlin symbol.
- References are reported as counts and file lists, not individual call sites. Read the files to see the calls.
- The map reflects the last indexed commit. Symbols added locally or in an unmerged diff will be missing.
- **"No repo map is available for this repository yet."** means the repo has not been ingested or ingestion is still running. Fall back to `context_search_code` or Grep.
- **"Repository '…' not found."** covers an unknown repo, one you cannot access, and an org without the map enabled.

## When to Skip

- You need file contents — use Read, or `context_search_code` for other repos
- You need history, decisions, or ownership — use `context_research`
- The question is about code you just wrote and have not pushed

## Reference

No separate references directory — usage is narrow enough that this SKILL.md is self-contained.
