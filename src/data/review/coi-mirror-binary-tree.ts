import type { ReviewQuestion } from "./types";

export const coiMirrorBinaryTreeQuestions: ReviewQuestion[] = [
  {
    id: "coi-mbt-1",
    chapter: "coi-mirror-binary-tree",
    level: 1,
    question: `什么是二叉树的镜像？其在结构层面的物理本质是什么？`,
    answer:
      `二叉树的镜像是指将二叉树中所有节点的左右子树进行互换。它的物理本质是**自顶向下或自底向上地交换每个非叶子节点的左、右孩子指针（或引用）**。镜像操作改变了树的拓扑指向，但保留了二叉树的所有节点值与父子层级关系，只是使每个节点的左右子树在几何上发生水平翻转。`,
    tags: ["概念理解", "树结构"],
  },
  {
    id: "coi-mbt-2",
    chapter: "coi-mirror-binary-tree",
    level: 1,
    question:
      `原地（In-place）镜像二叉树的时间复杂度和空间复杂度是多少？为什么？`,
    answer:
      `其时空复杂度分析如下：\n- **时间复杂度为 $O(N)$**：其中 $N$ 是二叉树中的节点总数。因为镜像操作需要访问树中的每一个节点，并将它们的左右孩子指针进行交换，每个节点仅被处理一次。\n- **空间复杂度为 $O(H)$**：其中 $H$ 是二叉树的高度。在最坏情况下（树退化为单链表），$H = N$，空间复杂度退化为 $O(N)$；在最好情况下（完全二叉树），$H = \\log_2 N$，空间复杂度为 $O(\\log N)$。这里的空间开销主要来自递归调用栈或迭代法中使用的辅助队列/栈。`,
    tags: ["时间复杂度", "空间复杂度"],
  },
  {
    id: "coi-mbt-3",
    chapter: "coi-mirror-binary-tree",
    level: 2,
    question: `使用递归（DFS前序遍历）求解二叉树镜像的核心逻辑是怎样的？`,
    answer:
      `递归前序遍历求解二叉树镜像的核心逻辑如下：\n1. **递归终止条件**：若当前节点为 \`null\`，说明是空树或已到达叶子节点的左右子空节点，直接返回 \`null\`；\n2. **交换左右子树**：交换当前节点的左孩子指针和右孩子指针（临时保存其中一个，再进行互换）；\n3. **递归处理子树**：分别对当前节点的左子树和右子树递归调用镜像函数，以确保整棵树下的所有层级都被彻底翻转。\n由于是在访问当前节点时立即交换左右孩子，属于典型的前序遍历思路。同样也可以使用后序遍历，即先递归翻转左右子树，再交换当前节点的左右孩子。`,
    tags: ["递归", "前序遍历", "核心逻辑"],
  },
  {
    id: "coi-mbt-4",
    chapter: "coi-mirror-binary-tree",
    level: 2,
    question:
      `为什么我们可以使用前序遍历或后序遍历来进行递归镜像，但不能直接使用传统的中序遍历？`,
    answer:
      `因为中序遍历的顺序是『左子树 → 根节点 → 右子树』。如果直接使用中序递归结构：\n1. 先递归处理左子树；\n2. 交换当前根节点的左右子树；\n3. 递归处理右子树。\n在第 2 步中，原来的右子树已经被交换到了左边，原来的左子树被交换到了右边。当我们执行第 3 步递归右子树时，**实际上处理的是已经被镜像过的原左子树**，而原本的右子树则被完全跳过、从未得到镜像。这会导致一部分节点被翻转了两次（变回原样），而另一部分节点从未被翻转。若要强行使用中序遍历，则第 3 步必须改为递归处理左子树 \`root.left\`。`,
    tags: ["中序遍历", "遍历顺序", "避坑指南"],
  },
  {
    id: "coi-mbt-5",
    chapter: "coi-mirror-binary-tree",
    level: 2,
    question: `如何使用迭代法（BFS 队列）来实现二叉树的镜像？`,
    answer:
      `迭代法借助辅助数据结构进行层序遍历（BFS）来逐个交换节点。具体逻辑如下：\n1. 初始化一个队列 \`queue\`，将根节点放入队列中；\n2. 当队列不为空时，循环执行以下操作：\n   - 从队列中取出一个节点 \`node\`；\n   - 交换 \`node\` 的左孩子与右孩子（注意处理其中为空的情况，即使一方为空也需交换）；\n   - 若 \`node\` 的原左孩子（现右孩子）不为空，将其放入队列；若原右孩子（现左孩子）不为空，亦将其放入队列；\n3. 重复此过程直到队列为空。此方法不依赖系统函数调用栈，空间复杂度为最宽一层的节点数 $O(W)$，对于极度倾斜的树（退化为链表）比递归更加安全。`,
    tags: ["迭代法", "BFS", "队列"],
  },
  {
    id: "coi-mbt-6",
    chapter: "coi-mirror-binary-tree",
    level: 3,
    question:
      `在实际工程中，“原地修改（In-place）”与“拷贝镜像（Copy-and-Mirror）”有何区别和应用场景选择？`,
    answer:
      `主要区别在数据不变性与资源消耗上：\n- **原地修改（In-place）**：直接修改输入二叉树的指针结构。不需要分配新节点，空间开销低（只需函数调用栈空间），适用于可以破坏原数据，或者需要高性能、低内存占用的场景；\n- **拷贝镜像（Copy-and-Mirror）**：不修改原二叉树，而是通过动态分配全新节点来克隆一棵镜像树。适用于遵循『不可变数据（Immutable Data）』规范的场景，比如在并发多线程中避免数据竞争，或者需要保留原树进行后续对比和操作的业务场景。`,
    tags: ["设计模式", "不可变性", "工程实践"],
  },
  {
    id: "coi-mbt-7",
    chapter: "coi-mirror-binary-tree",
    level: 3,
    question: `在实现二叉树镜像算法时，需要处理哪些特殊边界情况？`,
    answer:
      `必须防御性处理以下四类边界条件，确保代码健壮性：\n1. **空树（\`root === null\`）**：必须直接返回 \`null\`，避免发生空指针异常；\n2. **单节点树（无左右子节点）**：由于没有子节点需要交换，应在进入交换逻辑前或在递归基中直接返回该节点；\n3. **只有左子树或只有右子树**：交换后，原本单侧的子树会转移到另一侧。例如，只有左孩子的节点在镜像后将只有右孩子。代码在交换时不可因为某侧子树为 \`null\` 而跳过交换，必须完成完整的 \`null\` 与非空指针互换；\n4. **树中存在环路**：若在非标数据结构中存在环，常规遍历会导致死循环，必须进行环路检测（在算法面试中通常默认二叉树无环）。`,
    tags: ["边界条件", "防御性编程"],
  },
  {
    id: "coi-mbt-8",
    chapter: "coi-mirror-binary-tree",
    level: 3,
    question:
      `请给出在 TypeScript 中实现「非破坏性（Copy-and-Mirror）」二叉树镜像的递归代码。`,
    answer:
      `\`\`\`typescript\nclass TreeNode {\n  val: number;\n  left: TreeNode | null = null;\n  right: TreeNode | null = null;\n  constructor(val: number) { this.val = val; }\n}\n\nfunction mirrorTreeCopy(root: TreeNode | null): TreeNode | null {\n  if (!root) return null;\n\n  // 动态创建新节点，并递归拷贝镜像左右子树\n  const newRoot = new TreeNode(root.val);\n  \n  // 核心：新节点的左子树是原节点右子树的镜像；新节点的右子树是原节点左子树的镜像\n  newRoot.left = mirrorTreeCopy(root.right);\n  newRoot.right = mirrorTreeCopy(root.left);\n\n  return newRoot;\n}\n\`\`\``,
    tags: ["TypeScript", "代码实现", "非破坏性克隆"],
  },
  {
    id: "coi-mbt-9",
    chapter: "coi-mirror-binary-tree",
    level: 4,
    question:
      `请给出在 C++ 中实现「原地修改」二叉树镜像的递归与迭代双版本，并注意内存释放规范。`,
    answer:
      `\`\`\`cpp\n#include <queue>\n#include <algorithm>\n\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nclass Solution {\npublic:\n    // 递归版本 (DFS)\n    TreeNode* mirrorTreeRecursive(TreeNode* root) {\n        if (!root) return nullptr;\n        \n        // 交换当前节点的左右子树\n        std::swap(root->left, root->right);\n        \n        // 递归镜像子树\n        mirrorTreeRecursive(root->left);\n        mirrorTreeRecursive(root->right);\n        \n        return root;\n    }\n\n    // 迭代版本 (BFS)\n    TreeNode* mirrorTreeIterative(TreeNode* root) {\n        if (!root) return nullptr;\n        std::queue<TreeNode*> q;\n        q.push(root);\n        \n        while (!q.empty()) {\n            TreeNode* node = q.front();\n            q.pop();\n            \n            // 原地交换孩子指针\n            std::swap(node->left, node->right);\n            \n            if (node->left) q.push(node->left);\n            if (node->right) q.push(node->right);\n        }\n        return root;\n    }\n};\n\`\`\`\n*注意：原地镜像操作仅修改现有指针指向，不涉及分配新内存（\`new\`），因此不需要也绝不能释放内存（\`delete\`），否则会导致悬空指针或破坏整棵树的数据。*`,
    tags: ["C++", "代码实现", "指针操作", "双版本"],
  },
  {
    id: "coi-mbt-10",
    chapter: "coi-mirror-binary-tree",
    level: 4,
    question:
      `比较二叉树的对称性判断（Symmetric Tree）与二叉树的镜像（Mirror Binary Tree）两道题，其设计思想和实现上有何异同？`,
    answer:
      `这两道题在概念上高度相关，但任务本质和结构改变上有重要差异：\n1. **任务本质不同**：\n   - **二叉树的镜像**是一个**『修改（Mutation）/ 重构（Reconstruction）』**问题。目标是改变树的物理结构（无论是原地修改还是生成副本）；\n   - **对称二叉树的判断**是一个**『只读只写（Query）/ 判断（Predicate）』**问题。目标是不改变树的结构，仅判断整棵树是否关于根节点左右轴对称（即左子树的镜像是否等于右子树）。\n2. **实现逻辑的异同**：\n   - **镜像**只需一个遍历指针递归处理当前树；\n   - **对称判断**必须使用**『双指针/双递归路径』**。通常需要一个辅助函数 \`isMirror(node1, node2)\`，同时以相反的方向往下比较：判断 \`node1.val === node2.val\`，并且递归判断 \`isMirror(node1.left, node2.right)\` 和 \`isMirror(node1.right, node2.left)\`。\n- 两者的共通点在于，都蕴含了『把左子树的行为映射到右子树，把右子树的行为映射到左子树』的树镜像翻转对称思想。`,
    tags: ["对比分析", "对称二叉树", "树算法综合"],
  },
];
