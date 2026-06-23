# Design Doc: Coding Interviews Phase 2C Integration

This document outlines the layout, routing, review metadata, and interactive visual component design for Phase 2C of the 《剑指Offer：名企面试官精讲典型编程题（第2版）》 integration.

## 1. Directory Structure & Routing Config

Book slug: `coding-interviews`

### Directory Structure
```
content/coding-interviews/
├── linked-lists/
│   ├── entry-node-of-loop.mdx
│   ├── reverse-list.mdx
│   └── merge-sorted-lists.mdx
└── trees/
    └── subtree-structure.mdx
```

### Routing Mapping
1. **链表中环的入口节点 (entry-node-of-loop)**:
   - MDX: `content/coding-interviews/linked-lists/entry-node-of-loop.mdx`
   - URL: `/learn/coding-interviews/linked-lists/entry-node-of-loop`
   - Section: `链表` (Order: 4)
2. **反转链表 (reverse-list)**:
   - MDX: `content/coding-interviews/linked-lists/reverse-list.mdx`
   - URL: `/learn/coding-interviews/linked-lists/reverse-list`
   - Section: `链表` (Order: 5)
3. **合并两个排序的链表 (merge-sorted-lists)**:
   - MDX: `content/coding-interviews/linked-lists/merge-sorted-lists.mdx`
   - URL: `/learn/coding-interviews/linked-lists/merge-sorted-lists`
   - Section: `链表` (Order: 6)
4. **树的子结构 (subtree-structure)**:
   - MDX: `content/coding-interviews/trees/subtree-structure.mdx`
   - URL: `/learn/coding-interviews/trees/subtree-structure`
   - Section: `树` (Order: 2)

---

## 2. Interactive Component Specifications

### 2.1 链表中环的入口节点图表 `<ListCycleEntranceDiagram />`
* **File**: `src/components/mdx/diagrams/list-cycle-entrance-diagram.tsx`
* **Layout**:
  - SVG dimensions: `viewBox="0 0 540 260"`.
  - Node layout: straight segment `1 -> 2 -> 3` followed by a loop containing nodes `4 -> 5 -> 6 -> 7 -> (back to 4)`.
* **Animation Steps**:
  - **Step 0**: fast and slow pointers at Node `1`.
  - **Step 1**: fast pointer at `3`, slow at `2`.
  - **Step 2**: fast enters loop at `5`, slow at `3`.
  - **Step 3**: fast at `7`, slow enters loop at `4`.
  - **Step 4**: fast at `5`, slow at `5`. Meeting point detected at Node `5`!
  - **Step 5**: slow pointer resets to Node `1`. fast pointer stays at Node `5`.
  - **Step 6**: slow advances to `2`, fast advances to `6`.
  - **Step 7**: slow advances to `3`, fast advances to `7`.
  - **Step 8**: slow advances to `4` (entrance), fast advances to `4` (entrance). They meet at the entrance Node `4`!

### 2.2 反转链表图表 `<ReverseListDiagram />`
* **File**: `src/components/mdx/diagrams/reverse-list-diagram.tsx`
* **Layout**:
  - SVG dimensions: `viewBox="0 0 540 200"`.
  - Nodes: `1 -> 2 -> 3 -> 4 -> null`. Pointers `prev`, `curr`, `next` displayed as colored text arrows.
* **Animation Steps**:
  - **Step 0**: `prev` is `null`, `curr` at Node `1`.
  - **Step 1**: `next` points to Node `2`.
  - **Step 2**: Node `1`'s next pointer is set to `prev` (`null`). Link arrow reverses.
  - **Step 3**: `prev` moves to `1`, `curr` moves to `2`.
  - **Step 4**: Repeat: `next` points to `3`, Node `2` next points to `1`. `prev` to `2`, `curr` to `3`.
  - **Step 5**: Repeat until `curr` is `null`. Show resulting reversed chain `4 -> 3 -> 2 -> 1 -> null`.

### 2.3 合并两个排序的链表图表 `<MergeSortedListsDiagram />`
* **File**: `src/components/mdx/diagrams/merge-sorted-lists-diagram.tsx`
* **Layout**:
  - SVG dimensions: `viewBox="0 0 540 280"`.
  - List A: `1 -> 3 -> 5 -> null`. List B: `2 -> 4 -> 6 -> null`. Merged list growing at bottom.
* **Animation Steps**:
  - **Step 0**: Pointers `p1` at `1`, `p2` at `2`.
  - **Step 1**: Compare 1 < 2. Append `1` to merged list. `p1` advances to `3`.
  - **Step 2**: Compare 3 > 2. Append `2` to merged list. `p2` advances to `4`.
  - **Step 3**: Compare 3 < 4. Append `3` to merged list. `p1` advances to `5`.
  - **Step 4**: Compare 5 > 4. Append `4` to merged list. `p2` advances to `6`.
  - **Step 5**: Compare 5 < 6. Append `5` to merged list. `p1` is null.
  - **Step 6**: A is null. Append remainder of B (`6`) to merged list. Merged list is `1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null`.

### 2.4 树的子结构图表 `<SubtreeStructureDiagram />`
* **File**: `src/components/mdx/diagrams/subtree-structure-diagram.tsx`
* **Layout**:
  - SVG dimensions: `viewBox="0 0 550 280"`.
  - Left: Tree A. Right: Tree B.
* **Animation Steps**:
  - **Step 0**: Tree traversal starts on A. Pointers at Root A (value 8) and Root B (value 8).
  - **Step 1**: Trigger recursive match at Node 8. Compare left child of A (value 8) with left child of B (value 9). Mismatch detected! Recursion returns false.
  - **Step 2**: Advance traversal on A to left child (value 8). Root values match. Trigger recursive match.
  - **Step 3**: Compare left child of A's subroot (value 9) with left child of B (value 9) -> Match! Compare right child (value 2) with right child of B (value 2) -> Match!
  - **Step 4**: Match succeeded. Highlight matching subtree in Tree A in green. Result is `true`.

---

## 3. Review Questions Data Files
Four data files will be created under `src/data/review/`:
1. `coi-entry-node-of-loop.ts`
2. `coi-reverse-list.ts`
3. `coi-merge-sorted-lists.ts`
4. `coi-subtree-structure.ts`

Each will define 10 questions ranging from levels 1 to 4, registered in `src/data/review/types.ts` and aggregated in `src/data/review-questions.ts`.
