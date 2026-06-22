# Coding Interviews Phase 2A Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Integrate Phase 2A of the Coding Interviews book (面试题 16, 17, 18) under slug `coding-interviews` with MDX chapters, visual steppers, and review questions.

**Architecture:** Mathematical & pointer-based step tutorials are written in MDX files. Interactive SVG diagrams are developed as React components and embedded. Review questions are integrated into the global review database.

**Tech Stack:** Next.js, MDX, TypeScript, Vanilla CSS, Lucide Icons.

---

### Task 1: Setup & SECTION_ORDER Configuration

**Files:**
- Modify: `src/lib/content.ts`
- Create: `content/coding-interviews/math/power.mdx` (stub)
- Create: `content/coding-interviews/recursion/print-numbers.mdx` (stub)
- Create: `content/coding-interviews/linked-lists/delete-node.mdx` (stub)

**Step 1: Write SECTION_ORDER configuration**
Open `src/lib/content.ts`, navigate to `SECTION_ORDER` array, and append `"数学"` and `"回溯与递归"` at the end:
```typescript
  "栈和队列",
  "数学",
  "回溯与递归",
] as const;
```

**Step 2: Create stub MDX files**
Write a temporary placeholder for all three files:
`content/coding-interviews/math/power.mdx`:
```markdown
---
title: 数值的整数次方
type: B
section: 数学
order: 1
description: 实现 pow(x, n)，深入理解快速幂算法与底数/指数边界条件。
demo: false
math: true
sourceUrl: https://github.com/zhedahht/CodingInterviews
draft: false
---
Stub
```
`content/coding-interviews/recursion/print-numbers.mdx`:
```markdown
---
title: 打印从 1 到最大的 n 位数
type: C
section: 回溯与递归
order: 1
description: 通过递归全排列模拟大数输出，防范整型溢出极限。
demo: true
math: false
sourceUrl: https://github.com/zhedahht/CodingInterviews
draft: false
---
Stub
```
`content/coding-interviews/linked-lists/delete-node.mdx`:
```markdown
---
title: 删除链表节点
type: C
section: 链表
order: 2
description: 掌握 O(1) 拷贝删除后继与双指针去重断链。
demo: true
math: false
sourceUrl: https://github.com/zhedahht/CodingInterviews
draft: false
---
Stub
```

**Step 3: Run verification to ensure it builds**
Run: `pnpm build`
Expected: SUCCESS

**Step 4: Commit**
```bash
git add src/lib/content.ts content/coding-interviews/math/power.mdx content/coding-interviews/recursion/print-numbers.mdx content/coding-interviews/linked-lists/delete-node.mdx
git commit -m "chore(coi): initialize Phase 2A file structure and configure section order"
```

---

### Task 2: 数值的整数次方 (power) Chapter & Review Questions

**Files:**
- Create: `src/data/review/coi-power.ts`
- Modify: `content/coding-interviews/math/power.mdx`
- Modify: `src/data/review/types.ts`

**Step 1: Write review questions file**
Create `src/data/review/coi-power.ts` with 10 questions of levels 1 to 4 on binary exponentiation (quick multiplication/division), base cases (base=0, exponent<=0), and error processing options.

**Step 2: Write MDX chapter content**
Write full MDX content for `content/coding-interviews/math/power.mdx`. Include:
- Objectives (Learning Goals)
- Intuitive Introduction (no technical terms, using a folding paper or compounding factor analogy)
- Concept Explanation (standard exponentiation $O(n)$ vs binary exponentiation $O(\log n)$ using recursion $x^n = x^{n/2} \cdot x^{n/2}$ and bitwise optimization `n & 1`, plus boundary cases base=0.0 and exponent negative)
- Code Comparison (C++ and TypeScript implementation side-by-side using `<CodeTabs>`)
- Common Pitfalls (unprotected base=0 with negative exponent, double precision equals checking using `abs(a - b) < 1e-9`, signed integer overflow when exponent is `INT_MIN`)
- Exercises
- Glossary & Attribution

**Step 3: Register review questions key**
In `src/data/review/types.ts`, register the key `"coi-power"` with title `"数值的整数次方"`.

**Step 4: Run build check**
Run: `pnpm build`
Expected: SUCCESS

**Step 5: Commit**
```bash
git add src/data/review/coi-power.ts content/coding-interviews/math/power.mdx src/data/review/types.ts
git commit -m "feat(coi): implement power chapter and review questions"
```

---

### Task 3: 打印从 1 到最大的 n 位数 (print-numbers) Chapter, Diagram & Review Questions

**Files:**
- Create: `src/components/mdx/diagrams/big-number-print-diagram.tsx`
- Create: `src/data/review/coi-print-numbers.ts`
- Modify: `content/coding-interviews/recursion/print-numbers.mdx`
- Modify: `src/components/mdx/mdx-components.tsx`
- Modify: `src/data/review/types.ts`

**Step 1: Write review questions file**
Create `src/data/review/coi-print-numbers.ts` with 10 questions on recursion call stacks, big number strings, memory storage, and how recursion is used to simulate loops.

**Step 2: Register review questions key & diagram component**
In `src/data/review/types.ts`, register key `"coi-print-numbers"` with title `"打印从 1 到最大的 n 位数"`.
In `src/components/mdx/mdx-components.tsx`, import and add `<BigNumberPrintDiagram />` (using dynamic import or standard static import).

**Step 3: Implement BigNumberPrintDiagram component**
Implement the SVG stepper component in `big-number-print-diagram.tsx` with:
- State representing active step (0 to 5) and slot array for $n=3$.
- Visual slots `[_, _, _]`, a stack visualization calling trace, and a mock console output stream.
- Forward/backward controls and step indicators.
- CSS color tokens (`var(--accent)`, `var(--border)`, `var(--success)`, `var(--bg)`).

**Step 4: Write MDX chapter content**
Write full MDX content for `content/coding-interviews/recursion/print-numbers.mdx` using the standard spec:
- Objectives (Learning Goals)
- Intuitive Introduction (representing numbers too big for standard rulers, using character card dials)
- Concept Explanation (why simple integer output fails for large $n$, how to represent numbers as strings or char arrays, using backtracking recursion to assign '0'-'9' to each slot, and trimming leading zero characters before printing)
- Interactive Demo (`<BigNumberPrintDiagram />`)
- Code Comparison (C++ recursive backtracking and TypeScript implementation side-by-side using `<CodeTabs>`)
- Common Pitfalls (forgetting recursion base-cases, incorrect leading zero removal leading to blank output for 0, stack overflow due to deep recursion)
- Exercises
- Glossary & Attribution

**Step 5: Run page validation check**
Run: `pnpm build && npx eslint src/components/mdx/diagrams/big-number-print-diagram.tsx`
Expected: SUCCESS

**Step 6: Commit**
```bash
git add src/components/mdx/diagrams/big-number-print-diagram.tsx src/data/review/coi-print-numbers.ts content/coding-interviews/recursion/print-numbers.mdx src/components/mdx/mdx-components.tsx src/data/review/types.ts
git commit -m "feat(coi): implement print-numbers chapter, big-number diagram, and questions"
```

---

### Task 4: 删除链表节点 (delete-node) Chapter, Diagram & Review Questions

**Files:**
- Create: `src/components/mdx/diagrams/delete-node-diagram.tsx`
- Create: `src/data/review/coi-delete-node.ts`
- Modify: `content/coding-interviews/linked-lists/delete-node.mdx`
- Modify: `src/components/mdx/mdx-components.tsx`
- Modify: `src/data/review/types.ts`

**Step 1: Write review questions file**
Create `src/data/review/coi-delete-node.ts` with 10 questions on pointer operations, sentinel dummy nodes, O(1) removal limits, and memory deallocation.

**Step 2: Register review questions key & diagram component**
In `src/data/review/types.ts`, register key `"coi-delete-node"` with title `"删除链表节点"`.
In `src/components/mdx/mdx-components.tsx`, import and add `<DeleteNodeDiagram />`.

**Step 3: Implement DeleteNodeDiagram component**
Implement the interactive SVG stepper component in `delete-node-diagram.tsx`:
- Render toggling tabs between "场景 A：O(1) 删除指定节点" and "场景 B：删除链表中的重复节点".
- Animates value copy & pointer updates for Scenario A, and pointer skipping/linking for Scenario B.
- Use nice color tokens and ensure responsive layout width/viewBox.

**Step 4: Write MDX chapter content**
Write full MDX content for `content/coding-interviews/linked-lists/delete-node.mdx`:
- Objectives (Learning Goals)
- Intuitive Introduction (deleting folders or files by copying names, skipping repeating elements in a chain)
- Concept Explanation (O(1) removal strategy: copy next node's value to current node, then delete next node; how to handle corner cases (target is tail, target is head, list has only 1 node). Explain duplicate node removal: using dummy head, slow/fast pointers skipping duplicate values, O(n) time and O(1) space)
- Interactive Demo (`<DeleteNodeDiagram />`)
- Code Comparison (C++ for both O(1) delete and delete duplicates, and TypeScript versions side-by-side using `<CodeTabs>`)
- Common Pitfalls (forgetting to delete memory in C++, target node is the tail node (which still requires O(n) search), dereferencing null pointers when traversing, missing dummy node when deleting head)
- Exercises
- Glossary & Attribution

**Step 5: Run validation**
Run: `pnpm build && npx eslint src/components/mdx/diagrams/delete-node-diagram.tsx`
Expected: SUCCESS

**Step 6: Commit**
```bash
git add src/components/mdx/diagrams/delete-node-diagram.tsx src/data/review/coi-delete-node.ts content/coding-interviews/linked-lists/delete-node.mdx src/components/mdx/mdx-components.tsx src/data/review/types.ts
git commit -m "feat(coi): implement delete-node chapter, node deletion diagram, and questions"
```

---

### Task 5: Review Database Integration & Global Checks

**Files:**
- Modify: `src/data/review-questions.ts`
- Modify: `scripts/check-svg-overlaps.mjs`

**Step 1: Aggregate review questions**
Open `src/data/review-questions.ts`. Import `coiPowerQuestions` from `./review/coi-power`, `coiPrintNumbersQuestions` from `./review/coi-print-numbers`, and `coiDeleteNodeQuestions` from `./review/coi-delete-node`. Append/concatenate them to the default export questions array.

**Step 2: Add routes to SVG overlap validator config**
Open `scripts/check-svg-overlaps.mjs`, and add the new paths under `PAGES` (around line 215):
```javascript
  "/learn/coding-interviews/math/power",
  "/learn/coding-interviews/recursion/print-numbers",
  "/learn/coding-interviews/linked-lists/delete-node",
```

**Step 3: Run comprehensive check commands**
Verify that all checks pass:
- Run: `pnpm mdx-check`
- Run: `pnpm link-check`
- Run: `pnpm lint`
- Run: `pnpm svg-check`
- Run: `pnpm build`
- Run: `pnpm index:search`

**Step 4: Local test deployment**
Run: `./deploy.sh`
Verify that deployment completes successfully and internal port health check returns 200.

**Step 5: Commit & update status**
Commit progress:
```bash
git add src/data/review-questions.ts scripts/check-svg-overlaps.mjs
git commit -m "feat(coi): integrate Phase 2A questions into review database and register pages in SVG check"
```
Update checkpoint status files: `auto_checkpoint/status.json` and `auto_checkpoint/progress.md`.
```bash
git add auto_checkpoint/*
git commit -m "chore(coi): update progress for Phase 2A completion"
```
