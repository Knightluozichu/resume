import type { ReviewQuestion } from "./types";

export const coiSymmetricBinaryTreeQuestions: ReviewQuestion[] = [
  {
    id: "coi-sbt-1",
    chapter: "coi-symmetric-binary-tree",
    level: 1,
    question: "什么是对称的二叉树？其在几何与结构层面的定义是什么？",
    answer:
      "对称的二叉树是指一棵二叉树与其镜像二叉树在结构和节点值上完全一致。在几何与结构层面，二叉树对称的定义为：\n1. 根节点对称（或为空树）；\n2. 根节点的左子树和右子树互为镜像。具体表现为：左子树的根节点值等于右子树的根节点值，且左子树的左子树与右子树的右子树对称，左子树的右子树与右子树的左子树对称。",
    tags: ["概念理解", "树结构", "对称定义"],
  },
  {
    id: "coi-sbt-2",
    chapter: "coi-symmetric-binary-tree",
    level: 1,
    question: "判断对称二叉树与判断两棵树相同（Same Tree）有何联系与区别？",
    answer:
      "两者的核心联系和区别如下：\n- **相同树（Same Tree）**：比较两棵树是否完全一致。递归比对是同向的：即比较 `p->left` 与 `q->left`，`p->right` 与 `q->right`；\n- **对称树（Symmetric Tree）**：判断一棵树是否自对称。本质上是判断其左子树与右子树是否互为镜像。递归比对是反向/交叉的：即比较 `leftSubtree->left` 与 `rightSubtree->right`，以及 `leftSubtree->right` 与 `rightSubtree->left`。\n两者都利用了双指针同步遍历的结构化递归思想，只是指针移动的方向发生了翻转。",
    tags: ["对比分析", "相同树", "双指针"],
  },
  {
    id: "coi-sbt-3",
    chapter: "coi-symmetric-binary-tree",
    level: 2,
    question: "递归判断对称二叉树的核心逻辑与递归基（Base Cases）是什么？",
    answer:
      "核心递归逻辑由一个辅助函数 `check(p, q)` 实现，用于判断节点 `p` 和 `q` 是否互为镜像：\n1. **两个节点皆空** (`!p && !q`)：返回 `true`（到达叶子节点的子空节点，是对称的）；\n2. **仅一个节点为空** (`!p || !q`)：返回 `false`（结构不对称）；\n3. **节点值不相等** (`p->val != q->val`)：返回 `false`（数值不对称）；\n4. **递归比对子树**：返回 `check(p->left, q->right) && check(p->right, q->left)`。\n主函数只需调用 `check(root->left, root->right)`，空树直接返回 `true`。",
    tags: ["递归", "双递归", "递归基"],
  },
  {
    id: "coi-sbt-4",
    chapter: "coi-symmetric-binary-tree",
    level: 2,
    question: "如何使用迭代法（队列）来实现对称二叉树的判断？",
    answer:
      "迭代法借助队列（BFS 层序遍历的变形）成对比对节点。核心逻辑如下：\n1. 若根节点为空，直接返回 `true`；\n2. 初始化一个队列，将 `root->left` 和 `root->right` 依次入队；\n3. 当队列不为空时，每次连续取出两个节点 `u` 和 `v` 进行比较：\n   - 若 `u` 和 `v` 皆为空，继续下一次循环；\n   - 若其中一个为空或值不相等，说明不对称，返回 `false`；\n   - 依次将 `u->left` 与 `v->right` 入队，再将 `u->right` 与 `v->left` 入队（保持镜像对称的配对顺序）；\n4. 队列为空时，说明所有对称位置比对通过，返回 `true`。",
    tags: ["迭代法", "BFS", "队列"],
  },
  {
    id: "coi-sbt-5",
    chapter: "coi-symmetric-binary-tree",
    level: 2,
    question: "迭代法中，使用队列（BFS）和使用双栈（DFS）在对称性判断的逻辑上有何异同？",
    answer:
      "两者的异同点如下：\n- **相同点**：无论是队列还是栈，其核心都是**成对压入、成对弹出并比较**。每次弹出的两个节点必须是镜像对称位置的节点（例如 `u` 与 `v`），并且压入其子节点时，也必须保持对称配对（`u->left` 与 `v->right` 一组，`u->right` 与 `v->left` 一组）；\n- **不同点**：队列（BFS）按层进行宽度优先遍历，空间复杂度与树的最大宽度相关；栈（DFS）按深度优先方向深入，空间复杂度与树的高度相关。在判断结果上，两者的正确性完全一致，因为对称性的每一对比较是独立的，遍历顺序不影响最终判定。",
    tags: ["队列", "栈", "BFS", "DFS", "算法对比"],
  },
  {
    id: "coi-sbt-6",
    chapter: "coi-symmetric-binary-tree",
    level: 3,
    question: "为什么在判断对称性时，只比较局部（例如 `node.left.val == node.right.val`）是错误的？请举例说明。",
    answer:
      "因为对称性是一个**全局拓扑结构**的关系，不能退化为局部节点的相等性。若仅检查局部 `node->left->val == node->right->val`，会忽略跨越左右子树层级深处的结构错位或数值不对称。\n**典型反例**：\n```text\n        8\n       / \\\n      6   6\n     /     /\n    5     5\n```\n对于根节点 8，其左孩子 6 和右孩子 6 值相等。左子树的左孩子为 5，右子树的左孩子也为 5。虽然局部节点值都存在 5，但整棵树**是不对称的**（左子树的 5 应该与右子树的右孩子配对，但右孩子为空）。只进行局部比较会错误地得出对称的结论。",
    tags: ["避坑指南", "反例分析", "全局拓扑"],
  },
  {
    id: "coi-sbt-7",
    chapter: "coi-symmetric-binary-tree",
    level: 3,
    question: "判断对称二叉树的时间复杂度和空间复杂度是多少？在递归和迭代下有何不同？",
    answer:
      "时空复杂度分析如下：\n- **时间复杂度为 $O(N)$**：其中 $N$ 是二叉树的节点数。无论是递归还是迭代，算法都需要访问并比对树中的每个节点（最坏情况下需遍历整棵树），每个节点最多入队/栈或被递归调用一次，故为线性时间。\n- **空间复杂度为 $O(H)$ 或 $O(N)$**：\n  - **递归法**：取决于系统调用栈的深度，等于树的高度 $H$。最坏情况（退化为单链表）为 $O(N)$，最好情况（平衡二叉树）为 $O(\\log N)$；\n  - **迭代法**：取决于队列或栈中存储的节点数。最坏情况下（完全二叉树的底层），队列中最多会有 $O(N)$ 个节点，因此迭代法的空间复杂度为 $O(N)$。",
    tags: ["时间复杂度", "空间复杂度", "复杂度分析"],
  },
  {
    id: "coi-sbt-8",
    chapter: "coi-symmetric-binary-tree",
    level: 3,
    question: "在实现对称二叉树算法时，有哪些特殊的边界条件和容易被忽视的 Corner Cases？",
    answer:
      "需要特别处理和防范的边界条件包括：\n1. **空树（`root === null`）**：在绝大多数算法平台中，空树被定义为对称的，必须直接返回 `true`，防止在读取 `root.left` 时引发空指针异常；\n2. **单节点树**：只有根节点，无子节点，应直接返回 `true`；\n3. **值同形异（值相同但结构不同）**：例如节点值全为 1，但左子树有左节点，右子树有右节点。必须通过 `!p || !q` 的结构检查过滤掉此类情况；\n4. **完全非对称但根的左右孩子相同**：如 `[1, 2, 2, 3, null, null, 3]`，需要确保递归能深入到叶子节点完成完整交叉比对。",
    tags: ["边界条件", "Corner Case", "健壮性"],
  },
  {
    id: "coi-sbt-9",
    chapter: "coi-symmetric-binary-tree",
    level: 4,
    question: "请给出在 TypeScript 中实现「对称二叉树」判断的递归与迭代双版本代码。",
    answer:
      "```typescript\nclass TreeNode {\n  val: number;\n  left: TreeNode | null = null;\n  right: TreeNode | null = null;\n  constructor(val: number) { this.val = val; }\n}\n\n// 1. 递归版本\nfunction isSymmetricRecursive(root: TreeNode | null): boolean {\n  if (!root) return true;\n  return check(root.left, root.right);\n}\n\nfunction check(p: TreeNode | null, q: TreeNode | null): boolean {\n  if (!p && !q) return true;\n  if (!p || !q) return false;\n  return p.val === q.val && check(p.left, q.right) && check(p.right, q.left);\n}\n\n// 2. 迭代版本 (使用双端队列/数组模拟队列)\nfunction isSymmetricIterative(root: TreeNode | null): boolean {\n  if (!root) return true;\n  const queue: (TreeNode | null)[] = [root.left, root.right];\n\n  while (queue.length > 0) {\n    const u = queue.shift()!;\n    const v = queue.shift()!;\n\n    if (!u && !v) continue;\n    if (!u || !v || u.val !== v.val) return false;\n\n    queue.push(u.left, v.right);\n    queue.push(u.right, v.left);\n  }\n  return true;\n}\n```",
    tags: ["TypeScript", "代码实现", "递归", "迭代"],
  },
  {
    id: "coi-sbt-10",
    chapter: "coi-symmetric-binary-tree",
    level: 4,
    question: "请给出在 C++ 中实现「对称二叉树」判断的递归与迭代双版本代码。",
    answer:
      "```cpp\n#include <queue>\n\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nclass Solution {\npublic:\n    // 1. 递归版本\n    bool isSymmetricRecursive(TreeNode* root) {\n        if (!root) return true;\n        return check(root->left, root->right);\n    }\n\n    // 2. 迭代版本 (使用 std::queue)\n    bool isSymmetricIterative(TreeNode* root) {\n        if (!root) return true;\n        std::queue<TreeNode*> q;\n        q.push(root->left);\n        q.push(root->right);\n        \n        while (!q.empty()) {\n            TreeNode* u = q.front(); q.pop();\n            TreeNode* v = q.front(); q.pop();\n            \n            if (!u && !v) continue;\n            if (!u || !v || u->val != v->val) return false;\n            \n            q.push(u->left);\n            q.push(v->right);\n            q.push(u->right);\n            q.push(v->left);\n        }\n        return true;\n    }\n\nprivate:\n    bool check(TreeNode* p, TreeNode* q) {\n        if (!p && !q) return true;\n        if (!p || !q) return false;\n        return p->val == q->val \n            && check(p->left, q->right) \n            && check(p->right, q->left);\n    }\n};\n```",
    tags: ["C++", "代码实现", "指针操作", "队列", "双版本"],
  },
];
