---
name: task-breakdown
description: Use only when the user explicitly invokes `/task-breakdown` or explicitly asks to split requirements into tasks. Do not use for ordinary build requests. Splits requirements into tasks small enough to hand to an Agent one at a time, each with its own definition of done, for a team of 3–4 people. Does not write code.
---

# Split it into tasks

Use this skill only when the user explicitly calls `/task-breakdown` or explicitly asks to split requirements into tasks.
If the user simply asks you to build something, do not use this skill; build normally.

A skill for taking requirements and cutting them into tasks **small enough to hand over one per request**.

**Do not write code.** Stop once the task list exists.

## How to run it

### 1. Read the requirements

Read whatever was handed to you (or `docs/requirements.md` if nothing was). If there are no requirements, **push them to write the requirements first**. Do not start from tasks.

### 2. Cut it into tasks — at least one per team member, five at most

This is a **team** project. Ask how many people are on the team if you do not know. Make **at least as many tasks as there are people**, so everyone can own one.

**Five at the very most.** If it genuinely needs more than that, the requirements are too big — suggest moving things into “Out of scope” to shrink it.

Cut in this order:

1. **Something that runs first** (the screen appears / the outermost flow)
2. **The core mechanism** (the processing the thing cannot exist without)
3. **Rules for judging and finishing**
4. **The project-specific rules** (behaviour that only exists in these requirements)
5. **Polish** (appearance, small interactions)

**The first task must always leave the project in a running state.** Never put a task at the front that builds a part but runs nothing.

### 3. Write the list out

**Keep this shape exactly.**

```markdown
# Task list

## 1. (task name)

- What to do: (1–2 lines)
- Done when: (what has to happen. Write it so it can be checked on screen)
- Files touched: (if you know)

## 2. (task name)

...
```

Unless told otherwise, save it to **`docs/tasks.md`**.

Do **not** write who owns each task in `docs/tasks.md`. Ownership is decided on GitHub Issues, not in this file (several people editing the same file causes conflicts).

### 4. Tell them the next step

End with this, in the user's language:

- Put `docs/tasks.md` in a PR so the whole team can read it
- After it is merged, turn each task into a GitHub Issue with `/create-issues`
- Each person starts a task with `/start-task`, which assigns the Issue to them

## How to write “Done when”

**Write something you can confirm on screen.** Not the state of the code — something you can see with your eyes.

| Good | Weak |
|---|---|
| Flip two cards and the screen shows whether they match | The matching logic is implemented |
| When every pair is matched, “Congratulations” appears | The clear-screen handler runs |
| From the third mistake onward, cards flip back faster | The wait time is variable |

If you cannot write a “Done when” for a task, **the task was cut badly**. Cut it again.

## Keeping tasks independent

- If a task cannot be checked until an earlier one is finished, **state the order explicitly**
- If two tasks touch the same part of the same file, **merge them into one**

## Out of scope for this skill

- Writing code, or implementing anything
- Cutting it into six or more tasks
- Creating Issues (that is `/create-issues`), or assigning Issues to people
- Leaving out “Done when”
- Adding tasks that are not in the requirements
