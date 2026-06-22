# Design Doc: Coding Interviews Phase 2B Integration

This document outlines the layout, routing, review metadata, and interactive visual component design for Phase 2B of the 《剑指Offer：名企面试官精讲典型编程题（第2版）》 integration.

## 1. Directory Structure & Routing Config

Book slug: `coding-interviews`

### Directory Structure
```
content/coding-interviews/
├── strings/
│   ├── regular-expressions-matching.mdx
│   └── numeric-strings.mdx
├── arrays/
│   └── reorder-array.mdx
└── linked-lists/
    └── kth-node-from-end.mdx
```

### Routing Mapping
1. **正则表达式匹配 (regular-expressions-matching)**:
   - MDX: `content/coding-interviews/strings/regular-expressions-matching.mdx`
   - URL: `/learn/coding-interviews/strings/regular-expressions-matching`
   - Section: `字符串` (Order: 2)
2. **表示数值的字符串 (numeric-strings)**:
   - MDX: `content/coding-interviews/strings/numeric-strings.mdx`
   - URL: `/learn/coding-interviews/strings/numeric-strings`
   - Section: `字符串` (Order: 3)
3. **调整数组顺序使奇数位于偶数前面 (reorder-array)**:
   - MDX: `content/coding-interviews/arrays/reorder-array.mdx`
   - URL: `/learn/coding-interviews/arrays/reorder-array`
   - Section: `数组` (Order: 2)
4. **链表中倒数第 k 个节点 (kth-node-from-end)**:
   - MDX: `content/coding-interviews/linked-lists/kth-node-from-end.mdx`
   - URL: `/learn/coding-interviews/linked-lists/kth-node-from-end`
   - Section: `链表` (Order: 3)

---

## 2. Interactive Component Specifications

### 2.1 正则表达式匹配图表 `<RegexDpDiagram />`
* **File**: `src/components/mdx/diagrams/regex-dp-diagram.tsx`
* **Layout**:
  - SVG dimensions: `viewBox="0 0 540 320"`.
  - Left side: A dynamically populated DP grid where rows represent `s` (e.g. `"aab"`) and columns represent `p` (e.g. `"c*a*b"`).
  - Right side: Step explanation block showing comparison and formula active branch (either `dp[i-1][j-1]` or `dp[i][j-2]` / `dp[i-1][j]`).
* **Animation Steps**:
  - **Step 0**: Init: `dp[0][0] = true` representing empty matching.
  - **Step 1**: Match `'c*'` with empty string: check `dp[0][2] = dp[0][0] = true` since `*` matches 0 times.
  - **Step 2**: Match `'a'` at `s[1]` with `p[3] ('a')`: matches character. Transition `dp[1][3] = dp[0][2] = true`.
  - **Step 3**: Match `s[2] ('a')` with `p[4] ('*')`: matches multiple times. Transition `dp[2][4] = dp[1][4] = true`.
  - **Step 4**: Match `s[3] ('b')` with `p[5] ('b')`: character matches. Transition `dp[3][5] = dp[2][4] = true`. Final matching result is `true`.

### 2.2 字符串状态机图表 `<StringDfaDiagram />`
* **File**: `src/components/mdx/diagrams/string-dfa-diagram.tsx`
* **Layout**:
  - SVG dimensions: `viewBox="0 0 560 300"`.
  - Nodes: states (0: start, 1: sign, 2: integer, 3: dot, 4: decimal, 5: exponential, 6: exp sign, 7: exp integer, 8: end space).
  - Active nodes highlighted in `var(--accent)`. Transitions shown as animated arrow dashes.
* **Animation Steps**:
  - **Step 0**: State 0. String `"+1.2e-3"`.
  - **Step 1**: Consume `'+'`, transition to State 1 (sign).
  - **Step 2**: Consume `'1'`, transition to State 2 (integer).
  - **Step 3**: Consume `'.'`, transition to State 3 (dot) or State 4 (decimal).
  - **Step 4**: Consume `'2'`, transition to State 4 (decimal).
  - **Step 5**: Consume `'e'`, transition to State 5 (exp).
  - **Step 6**: Consume `'-'`, transition to State 6 (exp sign).
  - **Step 7**: Consume `'3'`, transition to State 7 (exp integer). Valid end state!

### 2.3 数组划分图表 `<PartitionArrayDiagram />`
* **File**: `src/components/mdx/diagrams/partition-array-diagram.tsx`
* **Layout**:
  - SVG dimensions: `viewBox="0 0 520 220"`.
  - Array elements rendered as boxes. Pointer indicators for `left` and `right` indices.
* **Animation Steps**:
  - **Step 0**: Array `[2, 4, 5, 7, 8, 1, 3]`. `left` at index 0 (val 2), `right` at index 6 (val 3).
  - **Step 1**: `left` finds even number `2` (stops). `right` finds odd number `3` (stops).
  - **Step 2**: Swap `2` and `3`. Array becomes `[3, 4, 5, 7, 8, 1, 2]`.
  - **Step 3**: `left` moves forward to index 1 (val 4, even). `right` moves backward to index 5 (val 1, odd).
  - **Step 4**: Swap `4` and `1`. Array becomes `[3, 1, 5, 7, 8, 4, 2]`.
  - **Step 5**: Pointers continue scan until they meet. Completed in $O(N)$ time.

### 2.4 链表双指针滑动图表 `<KthFromEndDiagram />`
* **File**: `src/components/mdx/diagrams/kth-from-end-diagram.tsx`
* **Layout**:
  - SVG dimensions: `viewBox="0 0 540 240"`.
  - Linked list Nodes. `fast` and `slow` pointers.
* **Animation Steps**:
  - **Step 0**: List: `1 -> 2 -> 3 -> 4 -> 5 -> null`, $k = 2$. `fast` and `slow` at `1`.
  - **Step 1**: `fast` advances $k - 1 = 1$ step to Node `2`.
  - **Step 2**: Both pointers advance. `fast` to `3`, `slow` to `2`.
  - **Step 3**: Advance. `fast` to `4`, `slow` to `3`.
  - **Step 4**: Advance. `fast` to `5` (tail). `slow` to `4`.
  - **Step 5**: End condition reached. Highlight `slow` at Node `4` as result.

---

## 3. Review Questions Data Files
Four data files will be created under `src/data/review/`:
1. `coi-regular-expressions-matching.ts`
2. `coi-numeric-strings.ts`
3. `coi-reorder-array.ts`
4. `coi-kth-node-from-end.ts`

Each will define 10 questions ranging from levels 1 to 4, registered in `src/data/review/types.ts` and aggregated in `src/data/review-questions.ts`.
