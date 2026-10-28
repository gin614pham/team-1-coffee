---
name: start-task
description: Use only when the user explicitly invokes `/start-task` (optionally with an Issue number, e.g. `/start-task 5`) or explicitly asks to start a task from a GitHub Issue. Picks an unassigned Issue, assigns it to the user, creates a fresh branch from the latest main, and shows what to do. Does not write code.
---

# Start a task

Use this skill only when the user explicitly calls `/start-task` or explicitly asks to start a task from an Issue.

A skill for **starting one task without clashing with teammates**: it claims the Issue (assigns it to the user) before any work begins, so two people never build the same thing.

**Do not write code.** Stop once the branch is ready and the task is shown.

## How to run it

### 1. Check that GitHub CLI works

Run `gh auth status`.

If it fails, **stop** and tell the user to do it by hand instead:

1. Open the Issue on GitHub → right side **Assignees** → choose yourself
2. In Cursor: switch to `main` → **Sync Changes** → bottom-left branch name → **Create new branch...** → `feature/<issue number>-<short name>`

### 2. Make sure nothing is left unsaved

Run `git status --porcelain`.

If there are uncommitted changes, **stop** and ask the user what to do with them (commit them on their current branch, or discard them). Do not stash, reset, or discard anything on your own.

### 3. Get the latest main

```bash
git switch main
git pull
```

### 4. Pick the Issue

If the user gave a number (`/start-task 5`), use it and go to step 5.

Otherwise, list the open Issues and show **who has what**:

```bash
gh issue list --state open --json number,title,assignees
```

Show them in two groups:

- **Free** (no assignee) — these can be started
- **Taken** (with the assignee's name) — these cannot

Ask which free Issue to start. If there are no free Issues, say so and stop.

**Task 1 goes first.** If the Issue for Task 1 is still open and the user picks a different one, tell them the other tasks are built on top of Task 1 and ask them to confirm.

### 5. Claim it

Check the Issue once more right before claiming it:

```bash
gh issue view <number> --json number,title,assignees,body,state
```

- If it is **closed**, stop and say so.
- If **someone else is already assigned**, stop. Say who has it and suggest a free Issue instead. **Never add yourself to an Issue someone else has.**

Then assign it to the user:

```bash
gh issue edit <number> --add-assignee "@me"
```

Check again with `gh issue view <number> --json assignees`. If there are now **two or more assignees** (a teammate claimed it at the same moment), stop and tell the user to agree with that teammate on who takes it.

### 6. Create the branch

```bash
git switch -c feature/<number>-<short-name>
```

`<short-name>` is 2–4 lowercase English words from the Issue title joined with hyphens (e.g. `feature/5-seat-selection`).

### 7. Show what to do next

Show, in the user's language:

1. **The Issue**: number, title, "what to do" and "done when" from the body
2. **What to send next**: open a **new chat** and send only the "what to do" part. The "done when" and "do not change other features" are already covered by the team rules (`.cursor/rules/`)
3. **When opening the PR**: write `Closes #<number>` in the PR description. The Issue closes automatically when the PR is merged into main

Then stop.

## Out of scope for this skill

- Writing code, or implementing the task
- Assigning an Issue that someone else already has, or removing another person's assignment
- Discarding, stashing, or resetting uncommitted changes
- Creating Issues (that is `/create-issues`)
- Pushing, opening a PR, or merging
