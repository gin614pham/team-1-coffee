---
name: requirements
description: Use only when the user explicitly invokes `/requirements` or explicitly asks to write a requirements document. Do not use for ordinary build requests. Interviews someone about what they want to build and turns it into a requirements document covering four sections — what it does, the screen, the interactions, and what is out of scope. Does not write code.
---

# Write the requirements

Use this skill only when the user explicitly calls `/requirements` or explicitly asks for a requirements document.
If the user simply asks you to build something, do not use this skill; build normally.

A skill for interviewing someone about what they want to build and turning it into **requirements in a shape you can hand to an AI**.

**Do not write code.** Do not start implementing until the requirements are settled.

## How to run it

### 1. Ask everything at once (one round only)

Do not dribble the questions out. **Ask these four together, in one message.**

```
1. What are you building (one sentence)?
2. What has to work before you would call it done (2–4 things)?
3. What is visible on screen, and what can be clicked?
4. Is there anything you are deliberately NOT building this time
   (things you could add later, things it works fine without)?
```

If the answers are thin, you get **one follow-up round at most**. After that, fill the gaps yourself and confirm.

### 2. Fill the gaps

Where an answer is thin, **propose something and ask “is this right?”** Do not make them design it from nothing.

Above all, **do not move on while “out of scope” is empty**. If it is empty, name three things that people commonly leave out for this kind of project and let them pick.

> Example (for a game): difficulty levels / a time limit / score or leaderboard / animation / external libraries / saving (fine if a reload wipes it)

### 3. Write the requirements out

**Keep this shape exactly.**

```markdown
# Requirements — (what you are building)

## What it does

- (bullets, 3–7 of them)

## Screen

- (what is visible / how it is laid out)

## Interactions

- (what happens when the user does something)
- (also write down what does nothing, and what is not allowed)

## Out of scope

- (what you are not building this time)
```

Unless told otherwise, save it to **`docs/requirements.md`**.

### 4. Confirm

Once it is written, check **just these two points** out loud.

- Does “What it does” contain a **rule specific to this project that an AI would not guess on its own**?
- Is there at least one item under “Out of scope”?

## Rules for writing it

| Write it like this | Not like this |
|---|---|
| If the two cards do not match, flip them back after 1 second | Flip them back nicely |
| Lay the cards out in a 4×4 grid | Lay them out so they look good |
| At most two cards can be face up at a time (a third click does nothing) | Prevent weird interactions |

- **Put numbers in** (how many cards, how many seconds, how many items)
- **One idea per line**
- Do not write implementation (library names, function names). Write **what happens**, not how

## When a requirement arrives later

If someone says “oh, and also this”, **do not go and edit the code**. Add one line to the right section of the requirements file first, then ask for the implementation.

## Out of scope for this skill

- Writing code, or creating files other than the requirements file
- Going back and forth with questions (two rounds total, maximum)
- Growing the requirements on your own (never add a feature nobody asked for)
