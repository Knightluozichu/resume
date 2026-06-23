# Coding Interviews Phase 3A Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Integrate Phase 3A of the Coding Interviews book (面试题 27, 28, 29, 30) under slug `coding-interviews` with MDX chapters, visual steppers, and review questions.

**Architecture:** Tree/pointer/matrix visual transitions are embedded as React SVG/interactive stepper components inside MDX chapters. Review questions are integrated into the global review database.

**Tech Stack:** Next.js, MDX, TypeScript, Vanilla CSS, Lucide Icons.

---

### Task 1: Setup & Stub Configuration

**Files:**
- Create: `content/coding-interviews/trees/mirror-binary-tree.mdx` (stub)
- Create: `content/coding-interviews/trees/symmetric-binary-tree.mdx` (stub)
- Create: `content/coding-interviews/arrays/spiral-matrix.mdx` (stub)
- Create: `content/coding-interviews/stacks-queues/min-stack.mdx` (stub)

**Step 1: Create stub MDX files**
Write a temporary placeholder for all four files.

`content/coding-interviews/trees/mirror-binary-tree.mdx`:
```markdown
---
title: 二叉树的镜像
type: C
section: 树
order: 3
description: 掌握递归与循环两种方式翻转二叉树左右子节点的核心实现。
demo: true
math: false
sourceUrl: https://github.com/zhedahht/CodingInterviews
draft: false
---
Stub
```

`content/coding-interviews/trees/symmetric-binary-tree.mdx`:
```markdown
---
title: 对称的二叉树
type: A
section: 树
order: 4
description: 学习通过前序遍历与对称前序遍历的双指针协同检查树的对称结构。
demo: true
math: false
sourceUrl: https://github.com/zhedahht/CodingInterviews
draft: false
---
Stub
```

`content/coding-interviews/arrays/spiral-matrix.mdx`:
```markdown
---
title: 顺时针打印矩阵
type: C
section: 数组
order: 3
description: 掌握设定上下左右四边界、循环缩减矩阵范围以顺时针打印元素的方法。
demo: true
math: false
sourceUrl: https://github.com/zhedahht/CodingInterviews
draft: false
---
Stub
```

`content/coding-interviews/stacks-queues/min-stack.mdx`:
```markdown
---
title: 包含 min 函数的栈
type: C
section: 栈和队列
order: 2
description: 掌握使用辅助最小栈同步保存当前状态最小值以实现 O(1) 取最小值操作。
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
git add content/coding-interviews/trees/mirror-binary-tree.mdx content/coding-interviews/trees/symmetric-binary-tree.mdx content/coding-interviews/arrays/spiral-matrix.mdx content/coding-interviews/stacks-queues/min-stack.mdx
git commit -m "chore(coi): initialize Phase 3A file structure and stub chapters"
```

---

### Task 2: 二叉树的镜像 (mirror-binary-tree) Chapter, Diagram & Review Questions

**Files:**
- Create: `src/components/mdx/diagrams/mirror-binary-tree-diagram.tsx`
- Create: `src/data/review/coi-mirror-binary-tree.ts`
- Modify: `content/coding-interviews/trees/mirror-binary-tree.mdx`
- Modify: `src/components/mdx/mdx-components.tsx`
- Modify: `src/data/review/types.ts`

**Step 1: Write review questions file**
Create `src/data/review/coi-mirror-binary-tree.ts` with 10 questions on preorder tree swapping recursion, queue-based BFS level-order swapping, and complexity analysis (Time: O(N), Space: O(N) stack depth).

**Step 2: Register review questions key & diagram component**
In `src/data/review/types.ts`, register key `"coi-mirror-binary-tree"` with title `"二叉树的镜像"`.
In `src/components/mdx/mdx-components.tsx`, import and add `<MirrorBinaryTreeDiagram />`.

**Step 3: Implement MirrorBinaryTreeDiagram component**
Implement the interactive tree leaf-swapping stepper in `mirror-binary-tree-diagram.tsx`.

**Step 4: Write MDX chapter content**
Write full MDX content for `content/coding-interviews/trees/mirror-binary-tree.mdx`. Include Objectives, Intuitive Introduction, Concept Explanation, Interactive Demo, Code Comparison, Common Pitfalls, and Exercises.

**Step 5: Run page validation check**
Run: `pnpm build && npx eslint src/components/mdx/diagrams/mirror-binary-tree-diagram.tsx`
Expected: SUCCESS

**Step 6: Commit**
```bash
git add src/components/mdx/diagrams/mirror-binary-tree-diagram.tsx src/data/review/coi-mirror-binary-tree.ts content/coding-interviews/trees/mirror-binary-tree.mdx src/components/mdx/mdx-components.tsx src/data/review/types.ts
git commit -m "feat(coi): implement mirror-binary-tree chapter, swap diagram, and questions"
```

---

### Task 3: 对称的二叉树 (symmetric-binary-tree) Chapter, Diagram & Review Questions

**Files:**
- Create: `src/components/mdx/diagrams/symmetric-binary-tree-diagram.tsx`
- Create: `src/data/review/coi-symmetric-binary-tree.ts`
- Modify: `content/coding-interviews/trees/symmetric-binary-tree.mdx`
- Modify: `src/components/mdx/mdx-components.tsx`
- Modify: `src/data/review/types.ts`

**Step 1: Write review questions file**
Create `src/data/review/coi-symmetric-binary-tree.ts` with 10 questions on symmetric check definitions (comparing outer vs inner nodes), recursive comparisons, BFS queue/stack matching, and boundary/leaf cases.

**Step 2: Register review questions key & diagram component**
In `src/data/review/types.ts`, register key `"coi-symmetric-binary-tree"` with title `"对称的二叉树"`.
In `src/components/mdx/mdx-components.tsx`, import and add `<SymmetricBinaryTreeDiagram />`.

**Step 3: Implement SymmetricBinaryTreeDiagram component**
Implement the interactive traversal comparison stepper in `symmetric-binary-tree-diagram.tsx`.

**Step 4: Write MDX chapter content**
Write full MDX content for `content/coding-interviews/trees/symmetric-binary-tree.mdx`. Include Objectives, Intuitive Introduction, Concept Explanation, Interactive Demo, Code Comparison, Common Pitfalls, and Exercises.

**Step 5: Run page validation check**
Run: `pnpm build && npx eslint src/components/mdx/diagrams/symmetric-binary-tree-diagram.tsx`
Expected: SUCCESS

**Step 6: Commit**
```bash
git add src/components/mdx/diagrams/symmetric-binary-tree-diagram.tsx src/data/review/coi-symmetric-binary-tree.ts content/coding-interviews/trees/symmetric-binary-tree.mdx src/components/mdx/mdx-components.tsx src/data/review/types.ts
git commit -m "feat(coi): implement symmetric-binary-tree chapter, symmetry comparison diagram, and questions"
```

---

### Task 4: 顺时针打印矩阵 (spiral-matrix) Chapter, Diagram & Review Questions

**Files:**
- Create: `src/components/mdx/diagrams/spiral-matrix-diagram.tsx`
- Create: `src/data/review/coi-spiral-matrix.ts`
- Modify: `content/coding-interviews/arrays/spiral-matrix.mdx`
- Modify: `src/components/mdx/mdx-components.tsx`
- Modify: `src/data/review/types.ts`

**Step 1: Write review questions file**
Create `src/data/review/coi-spiral-matrix.ts` with 10 questions on boundary shrink algorithm, edge cases (single row, single column, empty matrix), indexing, and time complexity O(M * N).

**Step 2: Register review questions key & diagram component**
In `src/data/review/types.ts`, register key `"coi-spiral-matrix"` with title `"顺时针打印矩阵"`.
In `src/components/mdx/mdx-components.tsx`, import and add `<SpiralMatrixDiagram />`.

**Step 3: Implement SpiralMatrixDiagram component**
Implement the interactive matrix printing and boundary contraction component in `spiral-matrix-diagram.tsx`.

**Step 4: Write MDX chapter content**
Write full MDX content for `content/coding-interviews/arrays/spiral-matrix.mdx`.

**Step 5: Run page validation check**
Run: `pnpm build && npx eslint src/components/mdx/diagrams/spiral-matrix-diagram.tsx`
Expected: SUCCESS

**Step 6: Commit**
```bash
git add src/components/mdx/diagrams/spiral-matrix-diagram.tsx src/data/review/coi-spiral-matrix.ts content/coding-interviews/arrays/spiral-matrix.mdx src/components/mdx/mdx-components.tsx src/data/review/types.ts
git commit -m "feat(coi): implement spiral-matrix chapter, boundary shrink diagram, and questions"
```

---

### Task 5: 包含 min 函数的栈 (min-stack) Chapter, Diagram & Review Questions

**Files:**
- Create: `src/components/mdx/diagrams/min-stack-diagram.tsx`
- Create: `src/data/review/coi-min-stack.ts`
- Modify: `content/coding-interviews/stacks-queues/min-stack.mdx`
- Modify: `src/components/mdx/mdx-components.tsx`
- Modify: `src/data/review/types.ts`

**Step 1: Write review questions file**
Create `src/data/review/coi-min-stack.ts` with 10 questions on synchronous dual stack technique, spatial optimization of saving only smaller elements, time/space complexity analysis (O(1) push/pop/min).

**Step 2: Register review questions key & diagram component**
In `src/data/review/types.ts`, register key `"coi-min-stack"` with title `"包含 min 函数的栈"`.
In `src/components/mdx/mdx-components.tsx`, import and add `<MinStackDiagram />`.

**Step 3: Implement MinStackDiagram component**
Implement the interactive push/pop synchronized stack visualizer in `min-stack-diagram.tsx`.

**Step 4: Write MDX chapter content**
Write full MDX content for `content/coding-interviews/stacks-queues/min-stack.mdx`.

**Step 5: Run page validation check**
Run: `pnpm build && npx eslint src/components/mdx/diagrams/min-stack-diagram.tsx`
Expected: SUCCESS

**Step 6: Commit**
```bash
git add src/components/mdx/diagrams/min-stack-diagram.tsx src/data/review/coi-min-stack.ts content/coding-interviews/stacks-queues/min-stack.mdx src/components/mdx/mdx-components.tsx src/data/review/types.ts
git commit -m "feat(coi): implement min-stack chapter, stack animation diagram, and questions"
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
  "/learn/coding-interviews/trees/mirror-binary-tree",
  "/learn/coding-interviews/trees/symmetric-binary-tree",
  "/learn/coding-interviews/arrays/spiral-matrix",
  "/learn/coding-interviews/stacks-queues/min-stack",
```

**Step 3: Run comprehensive check commands**
Verify that all checks pass:
- Run: `pnpm mdx-check`
- Run: `pnpm link-check`
- Run: `pnpm lint`
- Create a test checklist file `scripts/svg-check-coi-phase3a.txt` with all 4 new pages and run `SVG_CHECK_PAGES_FILE=scripts/svg-check-coi-phase3a.txt node scripts/check-svg-overlaps.mjs`.
- Verify health check returns 200 after running `./deploy.sh`.

**Step 4: Commit & update status**
Commit progress:
```bash
git add src/data/review-questions.ts scripts/check-svg-overlaps.mjs
git commit -m "feat(coi): integrate Phase 3A questions into review database and register pages in SVG check"
```
Update checkpoint status files: `auto_checkpoint/status.json` and `auto_checkpoint/progress.md`.
```bash
git add auto_checkpoint/*
git commit -m "chore(coi): update progress for Phase 3A completion"
```
