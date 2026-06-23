# Coding Interviews Phase 2C Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Integrate Phase 2C of the Coding Interviews book (面试题 23, 24, 25, 26) under slug `coding-interviews` with MDX chapters, visual steppers, and review questions.

**Architecture:** Algorithmic tree/pointer visual transitions are embedded as React SVG/interactive stepper components inside MDX chapters. Review questions are integrated into the global review database.

**Tech Stack:** Next.js, MDX, TypeScript, Vanilla CSS, Lucide Icons.

---

### Task 1: Setup & Stub Configuration

**Files:**
- Create: `content/coding-interviews/linked-lists/entry-node-of-loop.mdx` (stub)
- Create: `content/coding-interviews/linked-lists/reverse-list.mdx` (stub)
- Create: `content/coding-interviews/linked-lists/merge-sorted-lists.mdx` (stub)
- Create: `content/coding-interviews/trees/subtree-structure.mdx` (stub)

**Step 1: Create stub MDX files**
Write a temporary placeholder for all four files.

`content/coding-interviews/linked-lists/entry-node-of-loop.mdx`:
```markdown
---
title: 链表中环的入口节点
type: C
section: 链表
order: 4
description: 掌握快慢双指针相遇判定法与环长度/入口位置的严密数学推导。
demo: true
math: true
sourceUrl: https://github.com/zhedahht/CodingInterviews
draft: false
---
Stub
```

`content/coding-interviews/linked-lists/reverse-list.mdx`:
```markdown
---
title: 反转链表
type: C
section: 链表
order: 5
description: 熟练掌握迭代法三指针动态重定向与递归反转单链表的本质区别。
demo: true
math: false
sourceUrl: https://github.com/zhedahht/CodingInterviews
draft: false
---
Stub
```

`content/coding-interviews/linked-lists/merge-sorted-lists.mdx`:
```markdown
---
title: 合并两个排序的链表
type: C
section: 链表
order: 6
description: 掌握迭代和递归双指针有序拼接单链表及边界极值防范。
demo: true
math: false
sourceUrl: https://github.com/zhedahht/CodingInterviews
draft: false
---
Stub
```

`content/coding-interviews/trees/subtree-structure.mdx`:
```markdown
---
title: 树的子结构
type: C
section: 树
order: 2
description: 掌握二叉树先序遍历递归检查及子结构精确等值匹配判定。
demo: true
math: false
sourceUrl: https://github.com/zhedahht/CodingInterviews
draft: false
---
Stub
```

**Step 2: Run verification to ensure it builds**
Run: `pnpm build`
Expected: SUCCESS

**Step 3: Commit**
```bash
git add content/coding-interviews/linked-lists/entry-node-of-loop.mdx content/coding-interviews/linked-lists/reverse-list.mdx content/coding-interviews/linked-lists/merge-sorted-lists.mdx content/coding-interviews/trees/subtree-structure.mdx
git commit -m "chore(coi): initialize Phase 2C file structure and stub chapters"
```

---

### Task 2: 链表中环的入口节点 (entry-node-of-loop) Chapter, Diagram & Review Questions

**Files:**
- Create: `src/components/mdx/diagrams/list-cycle-entrance-diagram.tsx`
- Create: `src/data/review/coi-entry-node-of-loop.ts`
- Modify: `content/coding-interviews/linked-lists/entry-node-of-loop.mdx`
- Modify: `src/components/mdx/mdx-components.tsx`
- Modify: `src/data/review/types.ts`

**Step 1: Write review questions file**
Create `src/data/review/coi-entry-node-of-loop.ts` with 10 questions on Floyd's cycle detection math proof (distance equation $a + b = k \cdot L$), fast/slow pointer step ratio, and time/space complexities.

**Step 2: Register review questions key & diagram component**
In `src/data/review/types.ts`, register key `"coi-entry-node-of-loop"` with title `"链表中环的入口节点"`.
In `src/components/mdx/mdx-components.tsx`, import and add `<ListCycleEntranceDiagram />`.

**Step 3: Implement ListCycleEntranceDiagram component**
Implement the interactive loop detection and entrance matching stepper in `list-cycle-entrance-diagram.tsx`.

**Step 4: Write MDX chapter content**
Write full MDX content for `content/coding-interviews/linked-lists/entry-node-of-loop.mdx`. Include Objectives, Intuitive Introduction, Concept Explanation (mathematical equations for pointer distances), Interactive Demo, Code Comparison, Common Pitfalls, and Exercises.

**Step 5: Run page validation check**
Run: `pnpm build && npx eslint src/components/mdx/diagrams/list-cycle-entrance-diagram.tsx`
Expected: SUCCESS

**Step 6: Commit**
```bash
git add src/components/mdx/diagrams/list-cycle-entrance-diagram.tsx src/data/review/coi-entry-node-of-loop.ts content/coding-interviews/linked-lists/entry-node-of-loop.mdx src/components/mdx/mdx-components.tsx src/data/review/types.ts
git commit -m "feat(coi): implement entry-node-of-loop chapter, loop diagram, and questions"
```

---

### Task 3: 反转链表 (reverse-list) Chapter, Diagram & Review Questions

**Files:**
- Create: `src/components/mdx/diagrams/reverse-list-diagram.tsx`
- Create: `src/data/review/coi-reverse-list.ts`
- Modify: `content/coding-interviews/linked-lists/reverse-list.mdx`
- Modify: `src/components/mdx/mdx-components.tsx`
- Modify: `src/data/review/types.ts`

**Step 1: Write review questions file**
Create `src/data/review/coi-reverse-list.ts` with 10 questions on 3-pointer iterations, recursive linked list reversal, and tail reconnection logic.

**Step 2: Register review questions key & diagram component**
In `src/data/review/types.ts`, register key `"coi-reverse-list"` with title `"反转链表"`.
In `src/components/mdx/mdx-components.tsx`, import and add `<ReverseListDiagram />`.

**Step 3: Implement ReverseListDiagram component**
Implement the interactive three-pointer pointer redirection stepper in `reverse-list-diagram.tsx`.

**Step 4: Write MDX chapter content**
Write full MDX content for `content/coding-interviews/linked-lists/reverse-list.mdx`. Include Objectives, Intuitive Introduction, Concept Explanation, Interactive Demo, Code Comparison, Common Pitfalls, and Exercises.

**Step 5: Run page validation check**
Run: `pnpm build && npx eslint src/components/mdx/diagrams/reverse-list-diagram.tsx`
Expected: SUCCESS

**Step 6: Commit**
```bash
git add src/components/mdx/diagrams/reverse-list-diagram.tsx src/data/review/coi-reverse-list.ts content/coding-interviews/linked-lists/reverse-list.mdx src/components/mdx/mdx-components.tsx src/data/review/types.ts
git commit -m "feat(coi): implement reverse-list chapter, pointer redirection diagram, and questions"
```

---

### Task 4: 合并两个排序的链表 (merge-sorted-lists) Chapter, Diagram & Review Questions

**Files:**
- Create: `src/components/mdx/diagrams/merge-sorted-lists-diagram.tsx`
- Create: `src/data/review/coi-merge-sorted-lists.ts`
- Modify: `content/coding-interviews/linked-lists/merge-sorted-lists.mdx`
- Modify: `src/components/mdx/mdx-components.tsx`
- Modify: `src/data/review/types.ts`

**Step 1: Write review questions file**
Create `src/data/review/coi-merge-sorted-lists.ts` with 10 questions on recursive vs iterative merges, boundary checks, and spatial complexity trade-offs of recursion stack frames.

**Step 2: Register review questions key & diagram component**
In `src/data/review/types.ts`, register key `"coi-merge-sorted-lists"` with title `"合并两个排序的链表"`.
In `src/components/mdx/mdx-components.tsx`, import and add `<MergeSortedListsDiagram />`.

**Step 3: Implement MergeSortedListsDiagram component**
Implement the interactive dual-pointer sorted list merging component in `merge-sorted-lists-diagram.tsx`.

**Step 4: Write MDX chapter content**
Write full MDX content for `content/coding-interviews/linked-lists/merge-sorted-lists.mdx`.

**Step 5: Run page validation check**
Run: `pnpm build && npx eslint src/components/mdx/diagrams/merge-sorted-lists-diagram.tsx`
Expected: SUCCESS

**Step 6: Commit**
```bash
git add src/components/mdx/diagrams/merge-sorted-lists-diagram.tsx src/data/review/coi-merge-sorted-lists.ts content/coding-interviews/linked-lists/merge-sorted-lists.mdx src/components/mdx/mdx-components.tsx src/data/review/types.ts
git commit -m "feat(coi): implement merge-sorted-lists chapter, list merging diagram, and questions"
```

---

### Task 5: 树的子结构 (subtree-structure) Chapter, Diagram & Review Questions

**Files:**
- Create: `src/components/mdx/diagrams/subtree-structure-diagram.tsx`
- Create: `src/data/review/coi-subtree-structure.ts`
- Modify: `content/coding-interviews/trees/subtree-structure.mdx`
- Modify: `src/components/mdx/mdx-components.tsx`
- Modify: `src/data/review/types.ts`

**Step 1: Write review questions file**
Create `src/data/review/coi-subtree-structure.ts` with 10 questions on recursive subtree checking, float comparisons, double recursive checks, and boundary handling (A is empty, B is empty).

**Step 2: Register review questions key & diagram component**
In `src/data/review/types.ts`, register key `"coi-subtree-structure"` with title `"树的子结构"`.
In `src/components/mdx/mdx-components.tsx`, import and add `<SubtreeStructureDiagram />`.

**Step 3: Implement SubtreeStructureDiagram component**
Implement the preorder traversal subtree matching stepper in `subtree-structure-diagram.tsx`.

**Step 4: Write MDX chapter content**
Write full MDX content for `content/coding-interviews/trees/subtree-structure.mdx`.

**Step 5: Run page validation check**
Run: `pnpm build && npx eslint src/components/mdx/diagrams/subtree-structure-diagram.tsx`
Expected: SUCCESS

**Step 6: Commit**
```bash
git add src/components/mdx/diagrams/subtree-structure-diagram.tsx src/data/review/coi-subtree-structure.ts content/coding-interviews/trees/subtree-structure.mdx src/components/mdx/mdx-components.tsx src/data/review/types.ts
git commit -m "feat(coi): implement subtree-structure chapter, subtree matching diagram, and questions"
```

---

### Task 6: Review Database Integration & Global Checks

**Files:**
- Modify: `src/data/review-questions.ts`
- Modify: `scripts/check-svg-overlaps.mjs`

**Step 1: Aggregate review questions**
Open `src/data/review-questions.ts`. Import new question arrays and concatenate them into the default export questions array.

**Step 2: Add routes to SVG overlap validator config**
Open `scripts/check-svg-overlaps.mjs`, and add the new paths under `PAGES`:
```javascript
  "/learn/coding-interviews/linked-lists/entry-node-of-loop",
  "/learn/coding-interviews/linked-lists/reverse-list",
  "/learn/coding-interviews/linked-lists/merge-sorted-lists",
  "/learn/coding-interviews/trees/subtree-structure",
```

**Step 3: Run comprehensive check commands**
Verify that all checks pass:
- Run: `pnpm mdx-check`
- Run: `pnpm link-check`
- Run: `pnpm lint`
- Create a test checklist file `scripts/svg-check-coi-phase2c.txt` with all 4 new pages and run `SVG_CHECK_PAGES_FILE=scripts/svg-check-coi-phase2c.txt node scripts/check-svg-overlaps.mjs`.
- Verify health check returns 200 after running `./deploy.sh`.

**Step 4: Commit & update status**
Commit progress:
```bash
git add src/data/review-questions.ts scripts/check-svg-overlaps.mjs
git commit -m "feat(coi): integrate Phase 2C questions into review database and register pages in SVG check"
```
Update checkpoint status files: `auto_checkpoint/status.json` and `auto_checkpoint/progress.md`.
```bash
git add auto_checkpoint/*
git commit -m "chore(coi): update progress for Phase 2C completion"
```
