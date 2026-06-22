# Coding Interviews Book Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Integrate 《剑指Offer (第2版)》 under slug `coding-interviews` with 5 core visual chapters, diagrams, and review questions.

**Architecture:** Data structures and algorithmic visual steps are embedded as React SVG/interactive stepper components inside MDX chapters. Review questions are integrated into the global review database.

**Tech Stack:** Next.js, MDX, TypeScript, TailwindCSS/Vanilla CSS, Lucide Icons, Framer Motion (or simple React State SVG).

---

### Task 1: Book Setup & Metadata Configuration

**Files:**
- Modify: `src/lib/content.ts`
- Modify: `src/lib/review-scope.ts`

**Step 1: Write failing checks (stub config)**
Run `pnpm lint` and `pnpm build` first to confirm current build succeeds.

**Step 2: Run verification to ensure it builds**
Run: `pnpm build`
Expected: SUCCESS (prerendering 280 pages)

**Step 3: Write metadata mapping**
In `src/lib/content.ts` (around lines 70-80), append:
```typescript
// in BOOK_ORDER:
"coding-interviews",

// in BOOK_TITLES:
"coding-interviews": "剑指Offer：名企面试官精讲典型编程题（第2版）",
```
In `src/lib/review-scope.ts` (in `BOOK_PREFIX_MAP`):
```typescript
["coi-", "coding-interviews"],
```

**Step 4: Run verification**
Run: `pnpm build`
Expected: SUCCESS

**Step 5: Commit**
```bash
git add src/lib/content.ts src/lib/review-scope.ts
git commit -m "feat(coi): configure book metadata for coding-interviews"
```

---

### Task 2: 二维数组中的查找 (find-in-matrix)

**Files:**
- Create: `content/coding-interviews/arrays/find-in-matrix.mdx`
- Create: `src/components/mdx/diagrams/find-in-matrix-diagram.tsx`
- Create: `src/data/review/coi-find-in-matrix.ts`

**Step 1: Write a minimal review data file & MDX stub**
Write `src/data/review/coi-find-in-matrix.ts` with 10 questions.
Write `content/coding-interviews/arrays/find-in-matrix.mdx` referencing `<FindInMatrixDiagram />`.
Write `src/components/mdx/diagrams/find-in-matrix-diagram.tsx` with a basic JSX skeleton.

**Step 2: Run verification to ensure typescript compile**
Run: `pnpm build`
Expected: SUCCESS

**Step 3: Implement FindInMatrixDiagram stepper**
Implement a beautiful SVG grid interactive step component in `find-in-matrix-diagram.tsx`. The stepper shows:
- Matrix values (sorted row/colwise).
- Targets pointers (row, col) moving from top-right to bottom-left.
- Highlights path taken during search.

**Step 4: Run page and lint checks**
Run: `pnpm eslint src/components/mdx/diagrams/find-in-matrix-diagram.tsx`
Expected: SUCCESS

**Step 5: Commit**
```bash
git add content/coding-interviews/arrays/find-in-matrix.mdx src/components/mdx/diagrams/find-in-matrix-diagram.tsx src/data/review/coi-find-in-matrix.ts
git commit -m "feat(coi): implement find-in-matrix chapter, diagram, and questions"
```

---

### Task 3: 替换空格 (replace-spaces)

**Files:**
- Create: `content/coding-interviews/strings/replace-spaces.mdx`
- Create: `src/components/mdx/diagrams/replace-spaces-diagram.tsx`
- Create: `src/data/review/coi-replace-spaces.ts`

**Step 1: Stub files**
Create the MDX chapter, the review questions, and the basic component file.

**Step 2: Build verification**
Run: `pnpm build`
Expected: SUCCESS

**Step 3: Implement ReplaceSpacesDiagram stepper**
Show two pointer arrows P1 (original end) and P2 (expanded end) moving from right-to-left. Animates copying characters in reverse order.

**Step 4: Run eslint**
Run: `pnpm eslint src/components/mdx/diagrams/replace-spaces-diagram.tsx`
Expected: SUCCESS

**Step 5: Commit**
```bash
git add content/coding-interviews/strings/replace-spaces.mdx src/components/mdx/diagrams/replace-spaces-diagram.tsx src/data/review/coi-replace-spaces.ts
git commit -m "feat(coi): implement replace-spaces chapter, diagram, and questions"
```

---

### Task 4: 从尾到头打印链表 (print-list-reverse)

**Files:**
- Create: `content/coding-interviews/linked-lists/print-list-reverse.mdx`
- Create: `src/components/mdx/diagrams/print-list-reverse-diagram.tsx`
- Create: `src/data/review/coi-print-list-reverse.ts`

**Step 1: Stub files**
Create the linked list reverse printer MDX, questions, and component.

**Step 2: Build verification**
Run: `pnpm build`

**Step 3: Implement PrintListReverseDiagram**
Visualizes a linked list. Compares two methods: Recursion (Stack Frame growth/shrinkage) vs Explicit Stack (pushing to stack array, then popping).

**Step 4: Verify**
Run: `pnpm eslint src/components/mdx/diagrams/print-list-reverse-diagram.tsx`

**Step 5: Commit**
```bash
git add content/coding-interviews/linked-lists/print-list-reverse.mdx src/components/mdx/diagrams/print-list-reverse-diagram.tsx src/data/review/coi-print-list-reverse.ts
git commit -m "feat(coi): implement print-list-reverse chapter, diagram, and questions"
```

---

### Task 5: 重建二叉树 (rebuild-binary-tree)

**Files:**
- Create: `content/coding-interviews/trees/rebuild-binary-tree.mdx`
- Create: `src/components/mdx/diagrams/rebuild-binary-tree-diagram.tsx`
- Create: `src/data/review/coi-rebuild-binary-tree.ts`

**Step 1: Stub files**
Create tree rebuilding MDX, questions, and component.

**Step 2: Verify compile**
Run: `pnpm build`

**Step 3: Implement RebuildBinaryTreeDiagram**
Shows `preorder` and `inorder` arrays. Displays recursion stack, left/right subtree range partitions, and the resulting tree construction.

**Step 4: Verify eslint**
Run: `pnpm eslint src/components/mdx/diagrams/rebuild-binary-tree-diagram.tsx`

**Step 5: Commit**
```bash
git add content/coding-interviews/trees/rebuild-binary-tree.mdx src/components/mdx/diagrams/rebuild-binary-tree-diagram.tsx src/data/review/coi-rebuild-binary-tree.ts
git commit -m "feat(coi): implement rebuild-binary-tree chapter, diagram, and questions"
```

---

### Task 6: 用两个栈实现队列 (queue-with-two-stacks)

**Files:**
- Create: `content/coding-interviews/stacks-queues/queue-with-two-stacks.mdx`
- Create: `src/components/mdx/diagrams/queue-with-two-stacks-diagram.tsx`
- Create: `src/data/review/coi-queue-with-two-stacks.ts`

**Step 1: Stub files**
Create stack-queue MDX, questions, and component.

**Step 2: Verify compile**
Run: `pnpm build`

**Step 3: Implement QueueWithTwoStacksDiagram**
Shows Stack A and Stack B side-by-side with interactive push/pop commands that animate transferring elements.

**Step 4: Verify eslint**
Run: `pnpm eslint src/components/mdx/diagrams/queue-with-two-stacks-diagram.tsx`

**Step 5: Commit**
```bash
git add content/coding-interviews/stacks-queues/queue-with-two-stacks.mdx src/components/mdx/diagrams/queue-with-two-stacks-diagram.tsx src/data/review/coi-queue-with-two-stacks.ts
git commit -m "feat(coi): implement queue-with-two-stacks chapter, diagram, and questions"
```

---

### Task 7: Review Database Integration & Quality Sign-Off

**Files:**
- Modify: `src/data/review-questions.ts`

**Step 1: Prepare integration**
We need to import all newly created question arrays in `src/data/review-questions.ts` and merge them into the global list.

**Step 2: Verify compile**
Run: `pnpm build`

**Step 3: Update review-questions.ts**
Open `src/data/review-questions.ts`, import `coiFindInMatrixQuestions`, `coiReplaceSpacesQuestions`, `coiPrintListReverseQuestions`, `coiRebuildBinaryTreeQuestions`, `coiQueueWithTwoStacksQuestions` and concatenate them into the default export.

**Step 4: Full validation check (link-check, lint, svg-check, build)**
- Run: `pnpm link-check`
- Run: `pnpm lint`
- Create a test checklist file `scripts/svg-check-coi.txt` with all 5 new pages and run `SVG_CHECK_PAGES_FILE=scripts/svg-check-coi.txt node scripts/check-svg-overlaps.mjs`.
- Verify health check returns 200 after running `./deploy.sh`.

**Step 5: Commit**
```bash
git add src/data/review-questions.ts
git commit -m "feat(coi): integrate coding-interviews questions into global database and complete integration"
```
