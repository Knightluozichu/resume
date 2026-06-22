# Design Doc: Coding Interviews (剑指Offer 2e) Integration

This design document outlines the layout, routing, review metadata, and visual component design for introducing the classic algorithms book 《剑指Offer：名企面试官精讲典型编程题（第2版）》 into the platform.

## 1. Directory Structure & Routing Config

Book slug: `coding-interviews`

### Directory Structure
```
content/coding-interviews/
├── arrays/
│   └── find-in-matrix.mdx
├── strings/
│   └── replace-spaces.mdx
├── linked-lists/
│   └── print-list-reverse.mdx
├── trees/
│   └── rebuild-binary-tree.mdx
└── stacks-queues/
    └── queue-with-two-stacks.mdx
```

### Metadata Configuration
1. **[src/lib/content.ts](file:///Users/luozichu/Repositories/learn/remuse/src/lib/content.ts)**:
   - Add `"coding-interviews"` in `BOOK_ORDER` after `"c-primer-plus"`.
   - Add `"coding-interviews": "剑指Offer：名企面试官精讲典型编程题（第2版）"` in `BOOK_TITLES`.
2. **`src/lib/review-scope.ts`**:
   - Add `["coi-", "coding-interviews"]` to `BOOK_PREFIX_MAP` to support global review mapping.

---

## 2. Chapter Specifications & Interactive Visuals

All 5 chapters are classified as **Type C (实战型)**: focus on code implementation, two-pointer or recursive state transitions, and step-by-step interactive animations.

### 2.1 二维数组中的查找 (find-in-matrix)
- **Goal**: Search a target value in a 2D matrix sorted row-wise and column-wise.
- **Viz Component**: `<FindInMatrixDiagram>` (a interactive `Stepper` component).
  - Highlights the matrix cells: top-right corner element as current pointer.
  - Interactive steps: comparison (`current == target` or `current > target` or `current < target`) shifting rows (`row++`) or columns (`col--`).
  - Active boundary markers to show remaining search zone.

### 2.2 替换空格 (replace-spaces)
- **Goal**: Replace spaces in a string with `%20` in-place.
- **Viz Component**: `<ReplaceSpacesDiagram>`.
  - Animates a string memory layout (character array).
  - Shows original string pointer P1 (moving backwards) and resized target pointer P2 (moving backwards).
  - Displays how copying characters in reverse prevents overwrite overlap and runs in $O(n)$ time.

### 2.3 从尾到头打印链表 (print-list-reverse)
- **Goal**: Print a linked list from tail to head.
- **Viz Component**: `<PrintListReverseDiagram>`.
  - Animates the linked list structure: `Node(1) -> Node(2) -> Node(3)`.
  - Shows the recursion stack frame layers pushing `print(next)` and popping to print values, or explicit stack `push`/`pop` actions.

### 2.4 重建二叉树 (rebuild-binary-tree)
- **Goal**: Reconstruct a binary tree given preorder and inorder traversal arrays.
- **Viz Component**: `<RebuildBinaryTreeDiagram>`.
  - Visualizes two parallel arrays: `preorder` and `inorder`.
  - Stepper highlights: preorder root element, finding its match in inorder array, partition indices of left sub-tree and right sub-tree, and recursively building child nodes.

### 2.5 用两个栈实现队列 (queue-with-two-stacks)
- **Goal**: Implement a queue using two stacks for `appendTail` (push) and `deleteHead` (pop).
- **Viz Component**: `<QueueWithTwoStacksDiagram>`.
  - Renders Stack A (push/in-flow) and Stack B (pop/out-flow) side-by-side.
  - Interactive commands (Push `x`, Pop): animates transferring elements from Stack A to Stack B when Stack B is empty.

---

## 3. Review Questions & Datastore

Review questions will be added under `src/data/review/`:
- `coi-find-in-matrix.ts`
- `coi-replace-spaces.ts`
- `coi-print-list-reverse.ts`
- `coi-rebuild-binary-tree.ts`
- `coi-queue-with-two-stacks.ts`

Each will define 10-15 questions matching Levels 1 to 4 (Definition, Mechanics, Code Walkthrough, Synthesis) to guarantee comprehensive coverage.
