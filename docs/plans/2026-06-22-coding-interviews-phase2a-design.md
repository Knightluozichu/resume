# Design Doc: Coding Interviews Phase 2A Integration

This document outlines the layout, routing, review metadata, and interactive visual component design for Phase 2A of the 《剑指Offer：名企面试官精讲典型编程题（第2版）》 integration.

## 1. Directory Structure & Routing Config

Book slug: `coding-interviews`

### Directory Structure
```
content/coding-interviews/
├── math/
│   └── power.mdx
├── recursion/
│   └── print-numbers.mdx
└── linked-lists/
    └── delete-node.mdx
```

### Routing Mapping
1. **数值的整数次方 (power)**:
   - MDX: `content/coding-interviews/math/power.mdx`
   - URL: `/learn/coding-interviews/math/power`
   - Section: `数学` (Order: 1)
2. **打印从 1 到最大的 n 位数 (print-numbers)**:
   - MDX: `content/coding-interviews/recursion/print-numbers.mdx`
   - URL: `/learn/coding-interviews/recursion/print-numbers`
   - Section: `回溯与递归` (Order: 1)
3. **删除链表节点 (delete-node)**:
   - MDX: `content/coding-interviews/linked-lists/delete-node.mdx`
   - URL: `/learn/coding-interviews/linked-lists/delete-node`
   - Section: `链表` (Order: 2)

### Configuration Updates (`src/lib/content.ts`)
We will append `"数学"` and `"回溯与递归"` at the end of the `SECTION_ORDER` array:
```typescript
export const SECTION_ORDER = [
  ...
  "栈和队列",
  "数学",
  "回溯与递归",
] as const;
```

---

## 2. Interactive Component Specifications

### 2.1 大数打印图表 `<BigNumberPrintDiagram />`
* **File**: `src/components/mdx/diagrams/big-number-print-diagram.tsx`
* **Layout**:
  - SVG dimensions: `viewBox="0 0 540 300"`.
  - Top: Digit slots array displaying character elements (representing $n=3$, `[_, _, _]`).
  - Middle: Interactive tree nodes showing recursion tree calling stack.
  - Bottom: Console logs simulation showing printed values like `98`, `99`, `100`, `101`.
* **Animation Steps**:
  - **Step 0**: Recursion starts, slot state `[_, _, _]`.
  - **Step 1**: Sets index 0 to `'0'`, state `[0, _, _]`, recurses to index 1.
  - **Step 2**: Sets index 1 to `'1'`, state `[0, 1, _]`, recurses to index 2.
  - **Step 3**: Sets index 2 to `'9'`, state `[0, 1, 9]`. Recursion base case hit. Checks and trims the leading zero, printing `19` on the terminal.
  - **Step 4**: Backtracks, changes index 1 to `'2'`, state `[0, 2, _]`.
  - **Step 5**: Traverses to another branch setting index 0 to `'1'`, state `[1, 0, 0]`, prints `100` (no leading zero).

### 2.2 删除链表节点图表 `<DeleteNodeDiagram />`
* **File**: `src/components/mdx/diagrams/delete-node-diagram.tsx`
* **Layout**:
  - SVG dimensions: `viewBox="0 0 560 300"`.
  - Top: Interactive Tabs to toggle scenarios:
    - Tab 1: **"场景 A：O(1) 删除指定节点"**
    - Tab 2: **"场景 B：删除链表中的重复节点"**
* **Scenario A Stepper Steps**:
  - **Step 0 (Start)**: Target node pointing to Node 2 in `1 -> 2 (Target) -> 3 -> null`.
  - **Step 1 (Copy)**: Copy value of Node 3 into Node 2's slot. Node 2's value flashes and becomes `3`.
  - **Step 2 (Relink)**: Set Node 2's next pointer to point directly to Node 3's next pointer (`null`).
  - **Step 3 (Fade)**: Original Node 3 fades out. Done in $O(1)$ time!
* **Scenario B Stepper Steps**:
  - **Step 0 (Start)**: List `Head (Sentinel) -> 1 -> 2 -> 2 -> 3 -> null`. Pointers `pre` at `Head`, `cur` at `1`.
  - **Step 1**: Values do not repeat. `pre` and `cur` shift forward: `pre` to `1`, `cur` to `2`.
  - **Step 2 (Match)**: `cur` at `2` matches `cur->next` at `2`. Duplicate interval detected.
  - **Step 3 (Scan)**: Scanner pointer iterates forward to Node `3` (first non-duplicate).
  - **Step 4 (Link)**: Point `pre->next` to Node `3`, bypassing the duplicates. Duplicates turn dashed grey.
  - **Step 5 (Fade)**: Duplicates fade out. Resulting list is `Head -> 1 -> 3 -> null`.

---

## 3. Review Questions Data Files
Three data files will be created under `src/data/review/`:
1. `coi-power.ts`: 10 questions on recursion/binary exponentiation limits.
2. `coi-print-numbers.ts`: 10 questions on recursion stack overflow, large numbers, and string storage.
3. `coi-delete-node.ts`: 10 questions on pointer restructuring, double pointers, and sentinel node usage.
Each will be registered under `src/data/review/types.ts` and aggregate in `src/data/review-questions.ts`.
