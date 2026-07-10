import type { ReviewQuestion } from "./types";

export const coiRebuildBinaryTreeQuestions: ReviewQuestion[] = [
  {
    id: "coi-rbt-1",
    chapter: "coi-rebuild-binary-tree",
    level: 1,
    question:
      `重建二叉树的核心问题是什么？为什么单从前序遍历或者中序遍历序列无法唯一确定一棵二叉树？`,
    answer:
      `核心问题是利用二叉树遍历序列的互补特征，唯一确定二叉树的父子连接结构。单从前序遍历只能知道根节点，但无法划分左右子树的边界；单从中序遍历只能确定节点的左右相对顺序，但无法判断谁是父节点。只有两相结合，利用前序确定根节点、中序划分左右子树，才能唯一重建二叉树。`,
    tags: ["二叉树特性", "遍历序列"],
  },
  {
    id: "coi-rbt-2",
    chapter: "coi-rebuild-binary-tree",
    level: 1,
    question:
      `在重建二叉树的递归算法中，前序遍历序列和中序遍历序列分别起到了什么作用？`,
    answer:
      `前序遍历序列的作用是提供『当前子树根节点的值』，即前序范围的第一个元素一定是当前子树的根。中序遍历序列的作用是『划分左右子树的成员与大小』，即在中序中定位到根节点后，其左侧的部分构成左子树，右侧的部分构成右子树，从而实现分治重建。`,
    tags: ["递归分治", "遍历序列"],
  },
  {
    id: "coi-rbt-3",
    chapter: "coi-rebuild-binary-tree",
    level: 1,
    question:
      `为什么引入哈希表映射（Hash Map）可以优化重建二叉树的算法？它将中序查找的复杂度降低到了多少？`,
    answer:
      `在递归重建中，每次都需要在中序遍历序列中查找根节点的位置，如果使用线性搜索（\`O(n)\`），那么对于包含 $n$ 个节点的树，总时间复杂度会退化为 $O(n^2)$。通过在算法开始前建立一个『中序值到索引』的哈希映射表，可以将每次查找的时间复杂度降低到常数级别 $O(1)$，使整体算法时间复杂度降为 $O(n)$。`,
    tags: ["哈希优化", "复杂度分析"],
  },
  {
    id: "coi-rbt-4",
    chapter: "coi-rebuild-binary-tree",
    level: 2,
    question:
      `递归分治算法重建二叉树的总体时间复杂度和空间复杂度是多少？在最好与最坏情况下，空间复杂度有何差异？`,
    answer:
      `若使用哈希表优化，总体时间复杂度为 $O(n)$，每个节点被创建一次，查找耗时 $O(1)$。空间复杂度为 $O(n)$，主要消耗于哈希表存储（大小为 $n$）以及递归调用栈深度。在树极度不平衡呈单支树（最坏情况）时，系统调用栈深为 $O(n)$；当树完全平衡（最好情况）时，调用栈深度仅为 $O(\\log n)$。`,
    tags: ["复杂度", "树平衡度"],
  },
  {
    id: "coi-rbt-5",
    chapter: "coi-rebuild-binary-tree",
    level: 2,
    question:
      `在二叉树重建中，如果将左右子树对应的子数组直接拷贝（Pass by Value / Slice）传递给下一层递归，会对时空复杂度产生什么负面影响？`,
    answer:
      `如果在每次递归调用中都通过值传递或切片（Slice）拷贝子数组，那么每次拷贝都会产生 $O(k)$ 的时间与空间开销（$k$ 为子树大小）。这将导致整体时间复杂度退化为 $O(n^2)$（最坏情况）或 $O(n \\log n)$，同时增加了极大的临时内存开销。正确的做法是『传递数组的引用以及指示子树范围的索引边界（指针）』。`,
    tags: ["性能优化", "参数传递"],
  },
  {
    id: "coi-rbt-6",
    chapter: "coi-rebuild-binary-tree",
    level: 2,
    question:
      `如果输入的前序遍历序列和中序遍历序列长度不一致，或者两组序列中的元素不匹配，程序在运行中可能会发生什么问题？如何进行防御性编程？`,
    answer:
      `如果两序列长度不一致，或者内容不匹配，会导致在中序哈希映射中找不到前序的根节点值，或者递归边界失控导致索引越界崩溃。防御性编程手段包括：\n1. 在入口函数处校验 \`preorder.size() == inorder.size()\` 且不为空；\n2. 查找哈希表时判断键是否存在，若不存在则抛出异常或返回 \`nullptr\`；\n3. 对递归边界设定严格的终止条件 \`if (preStart > preEnd || inStart > inEnd)\`。`,
    tags: ["边界防护", "鲁棒性"],
  },
  {
    id: "coi-rbt-7",
    chapter: "coi-rebuild-binary-tree",
    level: 3,
    question:
      `请写出 C++ 实现中，使用 std::unordered_map 进行索引优化并递归重建二叉树的辅助重建函数实现。`,
    answer:
      `\`\`\`cpp\nTreeNode* buildHelper(const std::vector<int>& preorder, int preStart, int preEnd,\n                     const std::vector<int>& inorder, int inStart, int inEnd) {\n  if (preStart > preEnd || inStart > inEnd) return nullptr;\n  int rootVal = preorder[preStart];\n  TreeNode* root = new TreeNode(rootVal);\n  int inIndex = inorder_map[rootVal];\n  int leftSize = inIndex - inStart;\n  root->left = buildHelper(preorder, preStart + 1, preStart + leftSize, inorder, inStart, inIndex - 1);\n  root->right = buildHelper(preorder, preStart + leftSize + 1, preEnd, inorder, inIndex + 1, inEnd);\n  return root;\n}\n\`\`\``,
    tags: ["代码实现", "C++"],
  },
  {
    id: "coi-rbt-8",
    chapter: "coi-rebuild-binary-tree",
    level: 3,
    question:
      `请写出 TypeScript 中，使用 Map 并结合递归辅助函数实现重建二叉树 the complete logic。`,
    answer:
      `\`\`\`typescript\nfunction buildTree(preorder: number[], inorder: number[]): TreeNode | null {\n  const inorderMap = new Map<number, number>();\n  for (let i = 0; i < inorder.length; i++) inorderMap.set(inorder[i], i);\n  function build(preStart: number, preEnd: number, inStart: number, inEnd: number): TreeNode | null {\n    if (preStart > preEnd || inStart > inEnd) return null;\n    const rootVal = preorder[preStart];\n    const root = new TreeNode(rootVal);\n    const inIndex = inorderMap.get(rootVal)!;\n    const leftSize = inIndex - inStart;\n    root.left = build(preStart + 1, preStart + leftSize, inStart, inIndex - 1);\n    root.right = build(preStart + leftSize + 1, preEnd, inIndex + 1, inEnd);\n    return root;\n  }\n  return build(0, preorder.length - 1, 0, inorder.length - 1);\n}\n\`\`\``,
    tags: ["代码实现", "TypeScript"],
  },
  {
    id: "coi-rbt-9",
    chapter: "coi-rebuild-binary-tree",
    level: 4,
    question:
      `假如前序序列为 [1, 2, 3]，中序序列为 [3, 2, 1]，请手动模拟二叉树的递归重建步骤，并画出最终生成的二叉树结构。`,
    answer:
      `1. 确定根节点为前序首元素 **1**。在中序 \`[3, 2, 1]\` 中定位 1（索引 2）。左侧为 \`[3, 2]\`，右侧为空。树仅有左子树；\n2. 处理左子树前序 \`[2, 3]\`、中序 \`[3, 2]\`。确定根节点为 **2**，作为 1 的左子节点。在中序中定位 2（索引 1）。其左侧为 \`[3]\`，右侧为空。仅有左子树；\n3. 处理左子树前序 \`[3]\`、中序 \`[3]\`。确定根节点为 **3**，作为 2 的左子节点。中序定位 3（索引 0），其为叶子节点。\n最终生成的树是一条单支链：\`1 -> 2 -> 3\`（均为左斜斜线连接）。`,
    tags: ["手动模拟", "二叉树结构"],
  },
  {
    id: "coi-rbt-10",
    chapter: "coi-rebuild-binary-tree",
    level: 4,
    question:
      `如果将前序遍历和中序遍历序列换成前序遍历和后序遍历序列，在什么情况下可以唯一确定一棵二叉树？在什么情况下无法唯一确定？`,
    answer:
      `只有当二叉树中的**所有非叶子节点都同时拥有左子节点和右子节点（即没有度为 1 的节点）**时，前序和后序序列才能唯一确定一棵二叉树。因为如果存在只有一个子节点的节点，由于前序为 \`[根, 子]\`，后序为 \`[子, 根]\`，从这两者序列中无法判断该子节点是左子节点还是右子节点，从而导致歧义。例如前序 \`[1, 2]\`，后序 \`[2, 1]\`，既可以表示 1 的左子树为 2，也可以表示 1 的右子树为 2。`,
    tags: ["遍历序列唯一性", "理论延伸"],
  },
];
