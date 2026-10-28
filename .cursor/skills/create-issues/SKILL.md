---
name: create-issues
description: Use only when the user explicitly invokes `/create-issues` or explicitly asks to turn `docs/tasks.md` into GitHub Issues. Creates one GitHub Issue per task in `docs/tasks.md`, skips tasks that already have an Issue, and assigns nobody. Does not write code.
---

# Turn the tasks into Issues

Use this skill only when the user explicitly calls `/create-issues` or explicitly asks to turn `docs/tasks.md` into GitHub Issues.

A skill for putting every task on GitHub as an Issue, so the team can see **who is doing what** (Assignee) and **what is finished** (closed Issues).

**Do not write code.** Do not assign anyone. Stop once the Issues exist.

## How to run it

### 1. Check that GitHub CLI works

Run `gh auth status`.

If it fails, **stop** and tell the user to create the Issues on the GitHub website instead: **Issues → New issue**, one per task, title and body as in step 4, no assignee.

### 2. Read the tasks from main

`docs/tasks.md` must be the version the team agreed on, which is the one on `main`.

```bash
git switch main
git pull
```

If `git switch` fails because of uncommitted changes, **stop** and ask the user what to do with them. Do not stash, reset, or discard anything on your own.

Read `docs/tasks.md`. If it does not exist or has no tasks, stop and tell them to run `/task-breakdown` first and merge it.

### 3. Do not create the same Issue twice

List the Issues that already exist, open **and** closed:

```bash
gh issue list --state all --limit 100 --json number,title,state
```

A task **already has an Issue** if an Issue with the same title (step 4) exists. Skip those tasks and say which ones you skipped.

### 4. Create one Issue per remaining task, in task order

Title: `Task <n>: <task name>` — use the task number and name from `docs/tasks.md` as they are.

Body:

```text
<what to do>

Done when: <done when>

Source: docs/tasks.md
```

```bash
gh issue create --title "Task 1: <task name>" --body "<body>"
```

**Do not add an assignee.** People assign themselves with `/start-task` when they actually start.

### 5. Show the result

Show a list of **number and title** for every task: the ones you created and the ones you skipped. Then tell them, in the user's language:

- The Issues are on the **Issues** tab of the repository
- Nobody is assigned yet. Each person starts a task with `/start-task`, which assigns the Issue to them
- Task 1 goes first. The other tasks are built on top of it

Then stop.

## Out of scope for this skill

- Writing code, or changing `docs/tasks.md`
- Assigning anyone to an Issue
- Creating Issues for things that are not in `docs/tasks.md`
- Closing, editing, or deleting existing Issues
- Committing, pushing, or opening a PR
