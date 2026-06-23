# Design Doc: Coding Interviews Phase 3A Integration

This document outlines the layout, routing, review metadata, and interactive visual component design for Phase 3A of the 《剑指Offer（第2版）》 integration.

## 1. Directory Structure & Routing Config

Book slug: `coding-interviews`

### Directory Structure
```
content/coding-interviews/
├── arrays/
│   └── spiral-matrix.mdx
├── stacks-queues/
│   └── min-stack.mdx
└── trees/
    ├── mirror-binary-tree.mdx
    └── symmetric-binary-tree.mdx
```

### Routing Mapping
1. **二叉树的镜像 (mirror-binary-tree)**:
   - MDX: `content/coding-interviews/trees/mirror-binary-tree.mdx`
   - URL: `/learn/coding-interviews/trees/mirror-binary-tree`
   - Section: `树` (Order: 3)
2. **对称的二叉树 (symmetric-binary-tree)**:
   - MDX: `content/coding-interviews/trees/symmetric-binary-tree.mdx`
   - URL: `/learn/coding-interviews/trees/symmetric-binary-tree`
   - Section: `树` (Order: 4)
3. **顺时针打印矩阵 (spiral-matrix)**:
   - MDX: `content/coding-interviews/arrays/spiral-matrix.mdx`
   - URL: `/learn/coding-interviews/arrays/spiral-matrix`
   - Section: `数组` (Order: 3)
4. **包含 min 函数的栈 (min-stack)**:
   - MDX: `content/coding-interviews/stacks-queues/min-stack.mdx`
   - URL: `/learn/coding-interviews/stacks-queues/min-stack`
   - Section: `栈和队列` (Order: 2)

---

## 2. Interactive Component Specifications

### 2.1 二叉树的镜像图表 `<MirrorBinaryTreeDiagram />`
* **File**: `src/components/mdx/diagrams/mirror-binary-tree-diagram.tsx`
* **Layout**:
  - SVG dimensions: `viewBox="0 0 540 280"`.
  - Display binary tree nodes with labels. Root (8) at top-center, Left (6) and Right (10) as middle level, and Leaves (5, 7) under 6, (9, 11) under 10.
* **Animation Steps**:
  - **Step 0**: Original tree. Highlight root Node 8.
  - **Step 1 (Swap 8)**: Swap Left subtree (6) and Right subtree (10) under Root 8. Show rotation swap arrows. The children under 8 are now Left 10, Right 6.
  - **Step 2**: Traverse down to left child Node 10.
  - **Step 3 (Swap 10)**: Swap Left subtree (9) and Right subtree (11) under Node 10. Show rotation swap arrows. The children under 10 are now Left 11, Right 9.
  - **Step 4**: Traverse to right child Node 6.
  - **Step 5 (Swap 6)**: Swap Left subtree (5) and Right subtree (7) under Node 6. Show rotation swap arrows. The children under 6 are now Left 7, Right 5.
  - **Step 6**: Mirrored tree completed! Highlight all swapped node structures.

### 2.2 对称的二叉树图表 `<SymmetricBinaryTreeDiagram />`
* **File**: `src/components/mdx/diagrams/symmetric-binary-tree-diagram.tsx`
* **Layout**:
  - SVG dimensions: `viewBox="0 0 540 300"`.
  - Include tabs to toggle between: "对称树 (Symmetric)" and "非对称树 (Asymmetric)".
  - Symmetric tree nodes: Root (8), Left (6), Right (6), Left-Left (5), Left-Right (7), Right-Left (7), Right-Right (5).
  - Asymmetric tree nodes: Root (8), Left (6), Right (6), Left-Left (5), Left-Right (7), Right-Left (5), Right-Right (7) [swapped leaf 5 and 7, causing mismatch].
* **Animation Steps**:
  - **Step 0**: Traversal start. Pointers `p1` (left-subroot pointer) and `p2` (right-subroot pointer) point to Root Node 8. Values match (8 == 8).
  - **Step 1**: `p1` moves to Left subroot (6), `p2` moves to Right subroot (6). Compare `p1` value and `p2` value -> Match!
  - **Step 2**: Compare `p1->left` (5) and `p2->right` (5 in symmetric, 7 in asymmetric). Show pointer highlights.
    - Symmetric scenario: Match!
    - Asymmetric scenario: Mismatch detected (5 != 7)! Ends with `false`.
  - **Step 3**: Compare `p1->right` (7) and `p2->left` (7 in symmetric, 5 in asymmetric). Show pointer highlights.
    - Symmetric scenario: Match! Ends with `true` (symmetric).
    - Asymmetric scenario: Skip or show final evaluation result is `false`.

### 2.3 顺时针打印矩阵图表 `<SpiralMatrixDiagram />`
* **File**: `src/components/mdx/diagrams/spiral-matrix-diagram.tsx`
* **Layout**:
  - SVG dimensions: `viewBox="0 0 540 320"`.
  - Render a 4x4 grid matrix:
    ```
    1   2   3   4
    5   6   7   8
    9  10  11  12
    13 14  15  16
    ```
  - Display boundary lines for `top`, `bottom`, `left`, `right` with labels.
  - At the bottom, render a "Console Output" showing the spiral path sequence as it grows.
* **Animation Steps**:
  - **Step 0**: Borders initialized: `top=0`, `bottom=3`, `left=0`, `right=3`. Output is empty.
  - **Step 1 (Left to Right)**: Move from (0,0) to (0,3). Print `1, 2, 3, 4`. Adjust `top` boundary to 1.
  - **Step 2 (Top to Bottom)**: Move from (1,3) to (3,3). Print `8, 12, 16`. Adjust `right` boundary to 2.
  - **Step 3 (Right to Left)**: Move from (3,2) to (3,0). Print `15, 14, 13`. Adjust `bottom` boundary to 2.
  - **Step 4 (Bottom to Top)**: Move from (2,0) to (1,0). Print `9, 5`. Adjust `left` boundary to 1.
  - **Step 5 (Inner Left to Right)**: Move from (1,1) to (1,2). Print `6, 7`. Adjust `top` boundary to 2.
  - **Step 6 (Inner Top to Bottom)**: Move from (2,2) to (2,2). Print `11`. Adjust `right` boundary to 1.
  - **Step 7 (Inner Right to Left)**: Move from (2,1) to (2,1). Print `10`. Adjust `bottom` boundary to 1.
  - **Step 8 (Complete)**: Boundary variables cross: `left > right` or `top > bottom`. Complete!

### 2.4 包含 min 函数的栈图表 `<MinStackDiagram />`
* **File**: `src/components/mdx/diagrams/min-stack-diagram.tsx`
* **Layout**:
  - SVG dimensions: `viewBox="0 0 540 280"`.
  - Render two vertical stack columns: "Data Stack" and "Min Stack".
  - Below, display the current code operation line and return value of `min()`.
* **Animation Steps**:
  - **Step 0**: Init: both stacks empty.
  - **Step 1**: `push(3)`. Data: `[3]`, Min: `[3]` (min is 3).
  - **Step 2**: `push(4)`. Data: `[3, 4]`, Min: `[3, 3]` (since 4 > 3, push 3).
  - **Step 3**: `push(2)`. Data: `[3, 4, 2]`, Min: `[3, 3, 2]` (since 2 < 3, push 2).
  - **Step 4**: `push(1)`. Data: `[3, 4, 2, 1]`, Min: `[3, 3, 2, 1]` (since 1 < 2, push 1).
  - **Step 5**: `min()`. Highlight top of Min Stack (value 1) in green. Returns 1.
  - **Step 6**: `pop()`. Pop from both. Data becomes `[3, 4, 2]`, Min becomes `[3, 3, 2]`.
  - **Step 7**: `min()`. Highlight top of Min Stack (value 2) in green. Returns 2.
  - **Step 8**: `pop()`. Pop from both. Data becomes `[3, 4]`, Min becomes `[3, 3]`.
  - **Step 9**: `min()`. Highlight top of Min Stack (value 3). Returns 3.

---

## 3. Review Questions Data Files

Four data files will be created under `src/data/review/`:
1. `coi-mirror-binary-tree.ts`
2. `coi-symmetric-binary-tree.ts`
3. `coi-spiral-matrix.ts`
4. `coi-min-stack.ts`

Each will define 10 questions ranging from levels 1 to 4, registered in `src/data/review/types.ts` and aggregated in `src/data/review-questions.ts`.
