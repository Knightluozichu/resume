# Coding Interviews Phase 2B Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Integrate Phase 2B of the Coding Interviews book (面试题 19, 20, 21, 22) under slug `coding-interviews` with MDX chapters, visual steppers, and review questions.

**Architecture:** Algorithmic and pointer-based steps are written in MDX files. Interactive SVG diagrams are developed as React components and embedded. Review questions are integrated into the global review database.

**Tech Stack:** Next.js, MDX, TypeScript, Vanilla CSS, Lucide Icons.

---

### Task 1: Setup & Stub Configuration

**Files:**
- Create: `content/coding-interviews/strings/regular-expressions-matching.mdx` (stub)
- Create: `content/coding-interviews/strings/numeric-strings.mdx` (stub)
- Create: `content/coding-interviews/arrays/reorder-array.mdx` (stub)
- Create: `content/coding-interviews/linked-lists/kth-node-from-end.mdx` (stub)

**Step 1: Create stub MDX files**
Write a temporary placeholder for all four files.

`content/coding-interviews/strings/regular-expressions-matching.mdx`:
```markdown
---
title: 正则表达式匹配
type: C
section: 字符串
order: 2
description: 理解动态规划或递归回溯法处理 '.' 和 '*' 通配符匹配的底层逻辑。
demo: true
math: true
sourceUrl: https://github.com/zhedahht/CodingInterviews
draft: false
---
Stub
```

`content/coding-interviews/strings/numeric-strings.mdx`:
```markdown
---
title: 表示数值的字符串
type: C
section: 字符串
order: 3
description: 掌握确定性有限状态自动机 (DFA) 匹配合法数值的严密边界判定。
demo: true
math: false
sourceUrl: https://github.com/zhedahht/CodingInterviews
draft: false
---
Stub
```

`content/coding-interviews/arrays/reorder-array.mdx`:
```markdown
---
title: 调整数组顺序使奇数位于偶数前面
type: C
section: 数组
order: 2
description: 掌握双指针首尾相向扫描进行就地元素交换的划分思想。
demo: true
math: false
sourceUrl: https://github.com/zhedahht/CodingInterviews
draft: false
---
Stub
```

`content/coding-interviews/linked-lists/kth-node-from-end.mdx`:
```markdown
---
title: 链表中倒数第 k 个节点
type: C
section: 链表
order: 3
description: 掌握快慢双指针以固定间距滑动，单次遍历精确定位链表节点。
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
git add content/coding-interviews/strings/regular-expressions-matching.mdx content/coding-interviews/strings/numeric-strings.mdx content/coding-interviews/arrays/reorder-array.mdx content/coding-interviews/linked-lists/kth-node-from-end.mdx
git commit -m "chore(coi): initialize Phase 2B file structure and stub chapters"
```

---

### Task 2: 正则表达式匹配 (regular-expressions-matching) Chapter, Diagram & Review Questions

**Files:**
- Create: `src/components/mdx/diagrams/regex-dp-diagram.tsx`
- Create: `src/data/review/coi-regular-expressions-matching.ts`
- Modify: `content/coding-interviews/strings/regular-expressions-matching.mdx`
- Modify: `src/components/mdx/mdx-components.tsx`
- Modify: `src/data/review/types.ts`

**Step 1: Write review questions file**
Create `src/data/review/coi-regular-expressions-matching.ts` with 10 questions on DP state definitions, boundary cases (empty string, asterisk patterns), and time/space complexity analysis.

**Step 2: Register review questions key & diagram component**
In `src/data/review/types.ts`, register the key `"coi-regular-expressions-matching"` with title `"正则表达式匹配"`.
In `src/components/mdx/mdx-components.tsx`, import and add `<RegexDpDiagram />`.

**Step 3: Implement RegexDpDiagram component**
Implement the interactive SVG DP grid stepper component in `regex-dp-diagram.tsx`.

**Step 4: Write MDX chapter content**
Write full MDX content for `content/coding-interviews/strings/regular-expressions-matching.mdx`. Include Objectives, Intuitive Introduction, Concept Explanation (DP relation $dp[i][j]$ definition), Interactive Demo, Code Comparison (C++ and TS), Common Pitfalls, and Exercises.

**Step 5: Run page validation check**
Run: `pnpm build && npx eslint src/components/mdx/diagrams/regex-dp-diagram.tsx`
Expected: SUCCESS

**Step 6: Commit**
```bash
git add src/components/mdx/diagrams/regex-dp-diagram.tsx src/data/review/coi-regular-expressions-matching.ts content/coding-interviews/strings/regular-expressions-matching.mdx src/components/mdx/mdx-components.tsx src/data/review/types.ts
git commit -m "feat(coi): implement regular-expressions-matching chapter, dp diagram, and questions"
```

---

### Task 3: 表示数值的字符串 (numeric-strings) Chapter, Diagram & Review Questions

**Files:**
- Create: `src/components/mdx/diagrams/string-dfa-diagram.tsx`
- Create: `src/data/review/coi-numeric-strings.ts`
- Modify: `content/coding-interviews/strings/numeric-strings.mdx`
- Modify: `src/components/mdx/mdx-components.tsx`
- Modify: `src/data/review/types.ts`

**Step 1: Write review questions file**
Create `src/data/review/coi-numeric-strings.ts` with 10 questions on DFA transitions, legal numeric syntax representations, sign and dot parsing rules.

**Step 2: Register review questions key & diagram component**
In `src/data/review/types.ts`, register the key `"coi-numeric-strings"` with title `"表示数值的字符串"`.
In `src/components/mdx/mdx-components.tsx`, import and add `<StringDfaDiagram />`.

**Step 3: Implement StringDfaDiagram component**
Implement the interactive DFA state node transitions component in `string-dfa-diagram.tsx`.

**Step 4: Write MDX chapter content**
Write full MDX content for `content/coding-interviews/strings/numeric-strings.mdx`. Include Objectives, Intuitive Introduction, Concept Explanation (DFA vs Scanning pointers), Interactive Demo, Code Comparison, Common Pitfalls, and Exercises.

**Step 5: Run page validation check**
Run: `pnpm build && npx eslint src/components/mdx/diagrams/string-dfa-diagram.tsx`
Expected: SUCCESS

**Step 6: Commit**
```bash
git add src/components/mdx/diagrams/string-dfa-diagram.tsx src/data/review/coi-numeric-strings.ts content/coding-interviews/strings/numeric-strings.mdx src/components/mdx/mdx-components.tsx src/data/review/types.ts
git commit -m "feat(coi): implement numeric-strings chapter, dfa state diagram, and questions"
```

---

### Task 4: 调整数组顺序使奇数位于偶数前面 (reorder-array) Chapter, Diagram & Review Questions

**Files:**
- Create: `src/components/mdx/diagrams/partition-array-diagram.tsx`
- Create: `src/data/review/coi-reorder-array.ts`
- Modify: `content/coding-interviews/arrays/reorder-array.mdx`
- Modify: `src/components/mdx/mdx-components.tsx`
- Modify: `src/data/review/types.ts`

**Step 1: Write review questions file**
Create `src/data/review/coi-reorder-array.ts` with 10 questions on partition algorithms, relative order stability, and space/time tradeoffs.

**Step 2: Register review questions key & diagram component**
In `src/data/review/types.ts`, register the key `"coi-reorder-array"` with title `"调整数组顺序使奇数位于偶数前面"`.
In `src/components/mdx/mdx-components.tsx`, import and add `<PartitionArrayDiagram />`.

**Step 3: Implement PartitionArrayDiagram component**
Implement the interactive 相向双指针 exchange stepper component in `partition-array-diagram.tsx`.

**Step 4: Write MDX chapter content**
Write full MDX content for `content/coding-interviews/arrays/reorder-array.mdx`.

**Step 5: Run page validation check**
Run: `pnpm build && npx eslint src/components/mdx/diagrams/partition-array-diagram.tsx`
Expected: SUCCESS

**Step 6: Commit**
```bash
git add src/components/mdx/diagrams/partition-array-diagram.tsx src/data/review/coi-reorder-array.ts content/coding-interviews/arrays/reorder-array.mdx src/components/mdx/mdx-components.tsx src/data/review/types.ts
git commit -m "feat(coi): implement reorder-array chapter, partition diagram, and questions"
```

---

### Task 5: 链表中倒数第 k 个节点 (kth-node-from-end) Chapter, Diagram & Review Questions

**Files:**
- Create: `src/components/mdx/diagrams/kth-from-end-diagram.tsx`
- Create: `src/data/review/coi-kth-node-from-end.ts`
- Modify: `content/coding-interviews/linked-lists/kth-node-from-end.mdx`
- Modify: `src/components/mdx/mdx-components.tsx`
- Modify: `src/data/review/types.ts`

**Step 1: Write review questions file**
Create `src/data/review/coi-kth-node-from-end.ts` with 10 questions on fast/slow pointer spacing, boundary handling (k is larger than list length, k=0, list is empty), and single-pass traversal.

**Step 2: Register review questions key & diagram component**
In `src/data/review/types.ts`, register the key `"coi-kth-node-from-end"` with title `"链表中倒数第 k 个节点"`.
In `src/components/mdx/mdx-components.tsx`, import and add `<KthFromEndDiagram />`.

**Step 3: Implement KthFromEndDiagram component**
Implement the fast/slow double pointer sliding stepper component in `kth-from-end-diagram.tsx`.

**Step 4: Write MDX chapter content**
Write full MDX content for `content/coding-interviews/linked-lists/kth-node-from-end.mdx`.

**Step 5: Run page validation check**
Run: `pnpm build && npx eslint src/components/mdx/diagrams/kth-from-end-diagram.tsx`
Expected: SUCCESS

**Step 6: Commit**
```bash
git add src/components/mdx/diagrams/kth-from-end-diagram.tsx src/data/review/coi-kth-node-from-end.ts content/coding-interviews/linked-lists/kth-node-from-end.mdx src/components/mdx/mdx-components.tsx src/data/review/types.ts
git commit -m "feat(coi): implement kth-node-from-end chapter, pointer spacing diagram, and questions"
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
  "/learn/coding-interviews/strings/regular-expressions-matching",
  "/learn/coding-interviews/strings/numeric-strings",
  "/learn/coding-interviews/arrays/reorder-array",
  "/learn/coding-interviews/linked-lists/kth-node-from-end",
```

**Step 3: Run comprehensive check commands**
Verify that all checks pass:
- Run: `pnpm mdx-check`
- Run: `pnpm link-check`
- Run: `pnpm lint`
- Create a test checklist file `scripts/svg-check-coi-phase2b.txt` with all 4 new pages and run `SVG_CHECK_PAGES_FILE=scripts/svg-check-coi-phase2b.txt node scripts/check-svg-overlaps.mjs`.
- Verify health check returns 200 after running `./deploy.sh`.

**Step 4: Commit & update status**
Commit progress:
```bash
git add src/data/review-questions.ts scripts/check-svg-overlaps.mjs
git commit -m "feat(coi): integrate Phase 2B questions into review database and register pages in SVG check"
```
Update checkpoint status files: `auto_checkpoint/status.json` and `auto_checkpoint/progress.md`.
```bash
git add auto_checkpoint/*
git commit -m "chore(coi): update progress for Phase 2B completion"
```
