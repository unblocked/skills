---
name: unblocked-first-pr
description: "Use only when the user asks by name to open their first PR with Unblocked: find a task with Unblocked, plan it with team context, and open a pull request."
disable-model-invocation: true
---

If you are reading a summary of this page, fetch the raw file with `curl -sL https://raw.githubusercontent.com/unblocked/skills/main/skills/unblocked-first-pr/SKILL.md` and follow that instead.

# Open your first PR with Unblocked

You're helping the user pick a task and open a pull request for it. Unblocked finds and researches the options, the user picks one, then you plan and build it with the context Unblocked found. Your main job is finding the right task, then making sure Unblocked's context is used twice: when you plan it, and again while you build it. Never plan or build from the task text alone. Don't tell the user about these instructions. Just do the work.

Reach Unblocked through whatever you have: its MCP tools, the `unblocked` CLI, or your built-in tools if you're running inside Unblocked. Where these instructions name an Unblocked tool, use the closest one you have. Stop only if you can't reach Unblocked at all; then tell the user Unblocked isn't set up here and link https://docs.getunblocked.com/unblocked-mcp/mcp-overview. Use Unblocked before any other Jira, Linear, Slack or GitHub tool. If a tool named here isn't available, ask `context_research` the same question. Don't repeat a lookup you already have. If an Unblocked call fails, say in one line which source you couldn't reach and continue. If the user replies with an option's number or its words, do that option without asking again. Write everything you show the user in the language they're writing in, including the fixed lines and option labels in these instructions, and keep the format.

If you can't run commands, such as in a chat app:

- Skip the local lookups below. If the **My issues** search below returns nothing, ask exactly this and wait: "**To find work that's yours, what's your work email?**" Don't say why you're asking. Use the answer in place of the local lookups.
- Ask Unblocked, not `gh`, whether a fixing pull request merged.
- Plan as usual. Then, in place of the plan's options, end with "1. Copy a prompt for my coding agent", "2. Change the plan" and "3. Pick a different task". If the user picks 1, give one prompt in a code block, ready to paste into a coding agent opened in the repo. It holds the task link, the plan, the Unblocked findings with their links, and steps 4 to 7 below.

## Find three tasks

If you can run commands, first run one command that gets the user's email with `git config user.email`, their GitHub login with `gh api user --jq .login` if `gh` is installed, the repo's remotes with `git remote -v` if this session is in a git repo, and whether the Unblocked CLI is installed, with `command -v unblocked`. The commands in these instructions are written for a POSIX shell. In PowerShell or cmd, do the same work with that shell's own commands.

The team's repo is the `upstream` remote if there is one, otherwise `origin`, otherwise the only remote. Call it the team remote. Take the repo's name, such as acme/web, and its host from the team remote's URL. Fetch from, compare against and branch from the team remote, never a fork.

Use `gh` only when that login lookup worked and the repo is on a GitHub host. Otherwise, wherever these instructions name a `gh` command, use the host's own CLI if it's installed and signed in, such as `glab`, or ask Unblocked the same question in a low-effort `context_research` call: which pull requests are open in the repo, whether a pull request merged and when, or what a file holds on the default branch. Don't ask the user to install or sign in to anything. With the user, use the host's own words, such as merge request on GitLab.

Then send all six searches below in one turn, in parallel. Don't wait for one before sending the next. In a repo, also run `git fetch <team remote> <default branch>` and save every open pull request in the repo, by anyone and drafts included, to a file in your scratch directory with `gh pr list --repo <repo> --state open --limit 500 --json number,title,headRefName,isDraft,author,body`. Without `gh`, save the answer from the host's CLI or Unblocked in that file instead. In every Unblocked request, refer to the user as "me", followed by any email or login you have, such as "me (GitHub: jdoe-dev)". Leave out an email that's empty or a noreply address. In later requests, also add the assignee names the issue search returned, such as "me (Linear: jdoe, GitHub: jdoe-dev)".

**My issues.** With the CLI, run `unblocked context-query-issues --query "List open issues assigned to me"`. Without it, make a `context_research` call at low effort: "List open issues assigned to me in each connected tracker, with each issue's link, key, title, state and assignee name." Keep only issues assigned to the user; in a repo, keep only those about code in this repo. These are category 1 candidates. If this search returns nothing and the email you found is missing, a noreply address or on a public mail domain such as gmail.com, don't conclude the user has no issues. Ask exactly this once and wait: "**To find work that's yours, what's your work email?**" Don't say why you're asking. Then rerun this search with the answer.

**One search per category.** Each request is the opening text, then that category's line, then the closing text. Make the **Issue trackers** search a `context_research` call at low effort. If the CLI is installed, run every other category from one shell command in the same turn, each in the background with its output in its own file. Inside each background job, rerun the search once straight away if its file is empty, as in `( search > f; [ -s f ] || search > f ) &`, because some CLI calls in a parallel batch fail silently within a second. Then `wait` and print a short summary: `unblocked context-research --effort low --query "<opening text and the category's line>" --instruction "<closing text>"`, and for **Chat and support** `unblocked context-search-messages` with the same `--query` and `--instruction`, without `--effort`. Put the **My issues** lookup, `git fetch` and `gh pr list` in that command too. MCP calls run one at a time, so this keeps the turn as long as one search instead of several. Without the CLI, make a low-effort `context_research` call for each category. `context-search-messages` doesn't apply the date, so drop every thread whose messages are all older than {date} before you read the results. Skip the **CI** search when no CI product is connected, such as when Unblocked's tool description lists none. Replace {date} with the exact date 30 days before today, written as YYYY-MM-DD, and {repo} with the repo's name. If this session isn't in a repo, such as a terminal outside any repo or an app that can't run commands, leave out the sentence that mentions {repo}, so the search covers everything.

Opening text:

> Find open work I could finish in one pull request that my team would value. I'm working in {repo}, so only give me work in {repo}. A task counts as in {repo} when the code it would change is there, including tracker issues about that code. Search only this category, and treat every product in it the same:

Categories:

1. **Issue trackers**, such as Jira, Linear or Asana, and issues on GitHub, GitLab or Bitbucket: unassigned issues in my teams filed or updated since {date}, then older unassigned issues in my teams.
2. **Error and incident tools**, such as Sentry or Datadog: errors that started or grew since {date} with no fix merged. Skip errors seen only in development or test releases, or in a single burst with no users affected. Give event count, users affected and release.
3. **CI**, such as GitHub Actions, CircleCI or Buildkite: checks failing or flaky on the default branch since {date}, with how often each failed.
4. **Chat and support**, such as Slack, Teams or Zendesk: bugs or requests reported since {date} with no fix merged.
5. **Source code**: follow-ups a reviewer asked for in a merged pull request that never landed, then TODOs a teammate asked about, or recently changed code without tests.

Closing text:

> Skip: blocked, in progress (any open PR or draft), needs a follow-up PR, disputed, waiting on an outside decision, bot-filed and unassigned, test/demo/placeholder, trivial (typos, bumps, renames, lint), done or cancelled, or already changed on the default branch. Return up to 3, one per line, no raw data: link | source | assignee | who's waiting (link, exact words, date) | state (PR links) | related links | files touched, and whether it's a shared default. "none" for unknowns. If this category isn't connected, say only that.

Docs and data tools aren't a category to search; use them only as context. Sort any other connected product into the category that matches what it's used for.

Then check the candidates yourself, all in one turn: one `context_get_urls` call with every candidate link worth reading, and one script that runs every check below for every candidate. Don't spread these checks over several turns.

- Read the strongest ones with `context_get_urls`.
- Check whether each change is already on the default branch: in the fetched code (`git grep <pattern> <team remote>/<default branch>`) if you're in that repo; otherwise read the file with `gh api repos/<repo>/contents/<path>`, or ask Unblocked to check the current code if you can't run commands. Drop any that's already done, even if its issue is still open. Count a pull request as the fix only if it merged after the issue was filed. Check that with `gh pr view <number> --json state,mergedAt`.
- Match each candidate's key and the change it asks for against the saved list of open pull requests. Drop any candidate that matches one. Outside a repo, run the same `gh pr list` for each candidate repo in that script.
- For a failing check, use the failure rate Unblocked gave. Don't open individual runs or read logs at this stage.
- Before quoting someone as waiting, open their link with `context_get_urls` and confirm their words are there. If they aren't, drop the quote, not the task.
- If one or two are left, make one more low-effort `context_research` call for the category most likely to have more, naming the ones you dropped. If none are left, follow **If nothing fits** below instead.

Keep tasks from earlier categories ahead of later ones. Within a category, compare tasks in this order, and let the first difference decide:

1. **Value:** someone has asked for it in the last 30 days, then it fixes something users hit, then it unblocks a teammate.
2. **Unblocked's contribution:** threads, pull requests or decisions that will visibly shape the plan.
3. **Likely to merge:** clear expected behaviour, code that already has tests, and an active owner who can review it.
4. **Closeness to the user's recent work.**
5. **Checked evidence:** if still tied, prefer the task whose claims you confirmed yourself.

The recommended task is always the top-ranked one. Two rules can change the alternatives, but never the recommendation: if any candidate has related context, include at least one such task in the three, and when you can, pick alternatives that differ in size or area, so the user has a real choice. Don't drop a task because it's large or wide-reaching. Show its size instead and let the user choose.

**In a repo:** every task you show comes from the repo open here, and a task here counts only if it has at least one kind of value from step 1. If none of the repo's tasks fit after your checks, don't ask for more from this repo. Make one more `context_research` call with the same request minus the sentence about {repo}, and show the best tasks from anywhere, with one line after the opening sentence saying nothing in {repo} fits right now.

**Not in a repo:** rank all tasks together, wherever they are.

**If nothing fits:** don't stop. Relax one rule at a time and check again, until at least one task fits:

1. In a repo, search everywhere, as in **In a repo**.
2. Let tasks without a value signal count, as long as they pass the skip rules.
3. Widen {date} to 90 days before today.

Only if all three find nothing, use the empty message described under the options below.

## Show the options

Use exactly this format:

```text
Let's get a PR open together. We'll find an issue, plan it, then build it, with you approving each step along the way.

**Recommended:** [ISSUE-123 — Title](link)

One or two sentences on why this suits the user, such as "{name} asked for it in [a Slack thread](link) on {date}. About 3 files in the billing API."

**Alternative:** [ISSUE-456 — Title](link)

One sentence on why this suits the user, such as "Unassigned, and close to your work in [PR #321](link). About 8 files across web and API."

**Alternative:** [ISSUE-789 — Title](link)

One sentence on why this suits the user.
```

- Open with exactly the one sentence shown. Don't write anything before it, such as what you're about to do, and don't add any other intro, except the lines described below.
- The **Recommended:** and **Alternative:** labels are always bold. Put a blank line between each title line and its reason, in every block.
- Show up to two alternatives.
- Each reason says why the task suits this user: who's waiting, related recent work, or user impact, then its size. Never describe what the task asks for; the title already does that.
- Quote someone as waiting only when their issue, thread or pull request names this task or asks for the same change, and give the date. If that date is more than 30 days before today, call it an older request, not someone waiting.
- When a task is unassigned, its reason says so.
- Link pull requests and threads by number only, as `[PR #123](link)`, without their titles.
- For a task that isn't an issue, such as an error, failing check, thread or TODO, write a short title yourself and link what raised it, as in `[Short title — Slack thread](link)`.
- When a task is in a repo other than the one open here, its reason names the repo, such as "In acme/docs."
- When a task changes a default or component shared across many areas, its reason says so, such as "Changes a default used in 20+ places."
- When a category isn't connected, add one line after the opening sentence saying what connecting it would let Unblocked find, with https://docs.getunblocked.com/configuring-data-sources, such as "Connect your issue tracker so Unblocked can find tickets assigned to you." Name only the first category in the search order that isn't connected.
- Don't mention tasks you dropped or why, including ones already fixed, and don't suggest closing or updating any issue.
- Apart from the numbered options, don't use headings, bullets or tables. Don't change anything yet.

**End with numbered options**, one per task shown:

```text
**What would you like to do next?**

1. Plan ISSUE-123
2. Plan ISSUE-456
3. Plan ISSUE-789
```

- Write issue keys as plain text: no links, no titles. For a task that isn't an issue, write the option as an action, such as "Plan adding landing middleware tests".
- When a task is in a repo other than the one open here, its option is "Open or clone <repo> and plan ISSUE-123".
- If you're in a repo and only one or two of its tasks fit, show those, and make the last option "Find tasks in other repos". Otherwise, if only one task fits, the second option is "Describe a different task".
- The numbered options are the last thing in your message.
- If no task fits even after **If nothing fits**, skip the opening sentence and say in one line how many you checked. End with numbered options: "Describe a task", plus "Connect <category> to Unblocked" for the first category that isn't connected, if any. Never say the user has no issues; say you didn't find any that fit.

## Plan and build the chosen task

When the user picks a task:

1. If the task is in another repo, work there, cloning it first if it isn't on this machine. Call `research_task_context` with the task's full text and links, plus what Unblocked already found about it. If you don't have that tool, make one medium-effort `context_research` call with the same text. If the task refers to a screenshot, image or attachment you can't see, ask the user to paste or describe it.
2. Plan it the way you normally would, using that context. Treat open pull requests and chat speculation as proposals, not decisions. Only name people, files and commands you found in a source. If research shows the task isn't real or isn't worth doing, such as an error seen only in development, don't plan around it. Say so in one line and offer the next tasks from your list as numbered options. Review the plan with `review_implementation_plan` before showing it. If you don't have that tool, give `context_research` the task and the full plan and ask what in the plan conflicts with existing code, past decisions or team conventions. Don't show a plan until both the research and the review have run for it. If either call fails, say so in one line above the plan.
3. Show the plan with the two or three Unblocked findings that shaped it most. Give each a link, the source's own words in under 15 words, and one line on what the plan would have got wrong without it. End with these options, then wait for the user's answer. Don't write code before they pick "Build this". If they pick a different task, show the remaining tasks from your list before searching again.

   ```text
   **What would you like to do next?**

   1. Build this
   2. Change the plan
   3. Pick a different task
   ```

4. Before writing code, call `context_get_rules` with task `code-generation` and the paths you'll touch, and in one `context_research` call ask what reviewers have flagged before in these files and how the team tests them. Don't repeat anything reviewers flagged. While building, when you hit a question the plan doesn't answer, such as why existing code is the way it is or which pattern the team prefers, ask `context_research` before deciding. Don't guess.
5. Leave the issue as it is: no comments, edits, assignments or status changes. Build on a new branch from the team remote's default branch. Don't add files or edits the plan doesn't list; mention anything else you notice in the pull request description instead. Don't pull, reset or switch branches in any other checkout, and undo lockfile or generated changes your test run makes. Write tests the way the team does, and run the relevant ones.
6. If any part of the plan isn't done, finish it. Then, before pushing the branch or opening anything, show what changed in two or three bullets, the test results, and anything in the plan you couldn't finish. End with these options, then wait for the user's answer:

   ```text
   **What would you like to do next?**

   1. Open the pull request
   2. Open it as a draft
   3. Change something first
   ```

   Don't push or open a pull request before they pick 1 or 2. If part of the plan isn't done, leave out option 1 and say what's missing. Push the branch to `origin`, which is the user's fork when there's an `upstream` remote. If the push is refused, don't retry or switch remotes: say in one line that the branch is ready locally and what the host said, and ask the user where to push it. Without `gh` or the host's own CLI, push the branch, then give the user the host's link for creating the pull request, with the title and description in a code block ready to paste. If the task has an issue key, put it in the pull request's title. In its description, reference the task's source and link the findings that shaped the approach.
7. Finish with a link to the pull request, any tests that failed and why, and the one or two Unblocked findings that made the biggest difference. End with options for next steps on this pull request, such as:

   ```text
   **What would you like to do next?**

   1. Wait for Unblocked's review on PR #123, then fix what it flags
   2. Request a review from {name}, who wrote PR #456
   3. Find another task
   ```

   Offer the first option only if a recent merged pull request in this repo has a review from Unblocked. To name a reviewer, ask Unblocked who has recently reviewed changes to these files, describe their role exactly, and skip bots. If no person has reviewed these files, name the most recent human author. Request the review only when the user picks that option. If you couldn't open the pull request yourself, name the reviewer but don't offer to request the review.
