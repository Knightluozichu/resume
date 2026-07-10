import type { ReviewQuestion } from "./types";

export const coiSubtreeStructureQuestions: ReviewQuestion[] = [
  {
    id: "coi-subtree-1",
    chapter: "coi-subtree-structure",
    level: 1,
    question: `在『树的子结构』算法中，核心的两个步骤是什么？它们各自解决什么问题？`,
    answer:
    `核心步骤包含两个独立的递归过程：\n1. **遍历树 $A$（主函数）**：寻找树 $A$ 中是否存在与树 $B$ 根节点值相同的节点。这相当于在树 $A$ 中做前序遍历，如果当前根节点值不匹配，则递归去左子树和右子树中寻找对应的根节点。\n2. **判定结构匹配（辅助函数）**：一旦在树 $A$ 中找到与树 $B$ 根节点匹配的节点（记为 $R$），就以 $R$ 和树 $B$ 根节点为起点进行同步递归判定，检查以 $R$ 为根的子结构是否在形状和数值上完全包含树 $B$ 的结构。`,
    tags: ["核心步骤", "二叉树遍历", "递归"],
  },
  {
    id: "coi-subtree-2",
    chapter: "coi-subtree-structure",
    level: 1,
    question: `请解释『树的子结构（Subtree Structure）』与『子树（Subtree）』之间的关键区别是什么？`,
    answer:
    `两者的主要区别在于**匹配是否必须延伸到叶节点**：\n- **子结构（Subtree Structure）**：只要树 $A$ 的某个局部区域（包含某个节点及其部分子孙节点）在结构和数值上与树 $B$ 完全一致即可。即使树 $B$ 的叶节点在树 $A$ 中还有子节点，也算匹配成功。这是一种『 stencil / 模板覆盖』的关系。\n- **子树（Subtree）**：要求树 $A$ 的某个子树与树 $B$ 完全一致。这意味着如果树 $B$ 在某处结束，树 $A$ 对应的节点也必须是叶节点，不能再有任何子节点。子树匹配要求对应节点向下必须一直匹配到最底部的叶子节点（如 LeetCode 572 题）。`,
    tags: ["概念对比", "子树", "子结构"],
  },
  {
    id: "coi-subtree-3",
    chapter: "coi-subtree-structure",
    level: 2,
    question: `如果二叉树的节点值是浮点数（如 \`double\` 或 \`float\`），在比较节点值是否相等时需要注意什么？如何正确实现？`,
    answer:
    `由于计算机表示浮点数时存在精度误差，**不能直接使用 \`==\` 运算符**进行判断。直接比较可能会因为微小的精度损失导致原本相等的数被判定为不等。\n\n正确的做法是定义一个极小的阈值 $\epsilon$（通常设为 $10^{-8}$ 或 $10^{-9}$），然后通过判断两个浮点数之差的绝对值是否小于该阈值来确定它们是否相等：\n\`\`\`cpp\nbool equal(double num1, double num2) {\n    return (num1 - num2 > -0.00000001) && (num1 - num2 < 0.00000001);\n}\n\`\`\``,
    tags: ["浮点数比较", "精度误差", "数值安全"],
  },
  {
    id: "coi-subtree-4",
    chapter: "coi-subtree-structure",
    level: 2,
    question: `在『树的子结构』的主函数中，有哪些关键的防御性空指针检查？它们各起什么作用？`,
    answer:
    `主函数 \`isSubStructure(A, B)\` 中必须包含以下防御性检查：\n1. **\`if (A == null || B == null) return false;\`**\n   - 如果树 $A$ 为空，显然无法包含树 $B$。\n   - 如果树 $B$ 为空，根据题目常规约定，空树不能是任意树的子结构（防止无意义的匹配成功）。\n2. **匹配过程中的空节点过滤**：在递归调用 \`isSubStructure(A.left, B)\` 或 \`isSubStructure(A.right, B)\` 时，要确保 A 树的子树存在，防止对 null 节点进行多余的子结构检查，避免 null 指针异常。`,
    tags: ["防御性编程", "空指针检查", "边界条件"],
  },
  {
    id: "coi-subtree-5",
    chapter: "coi-subtree-structure",
    level: 2,
    question: `在辅助匹配函数 \`doesTree1HaveTree2(R, B)\` 中，当递归遇到 $R$ 或 $B$ 为空时，应如何返回？请详述判定逻辑。`,
    answer:
    `在辅助匹配函数中，空节点的返回逻辑非常关键：\n1. **若 $B$ 为空**（\`B == null\`）：说明树 $B$ 已经被顺利遍历完毕，所有对应的节点在之前的比对中都相匹配。此时应当直接返回 \`true\`。\n2. **若 $R$ 为空但 $B$ 不为空**（\`R == null && B != null\`）：说明树 $A$ 已经没有多余的节点与树 $B$ 匹配，二者结构不一致。此时应当返回 \`false\`。\n3. **若两者都不为空**：需要比较它们的值。若值不相等，返回 \`false\`；若值相等，则继续递归比较各自的左右子树：\n   \`doesTree1HaveTree2(R.left, B.left) && doesTree1HaveTree2(R.right, B.right)\`。`,
    tags: ["递归边界", "空节点逻辑", "辅助函数"],
  },
  {
    id: "coi-subtree-6",
    chapter: "coi-subtree-structure",
    level: 3,
    question: `请分析『树的子结构』算法在最坏情况和平均情况下的时间复杂度，并给出对应场景。`,
    answer:
    `设树 $A$ 的节点数为 $N$，树 $B$ 的节点数为 $M$：\n1. **最坏时间复杂度**：$O(N \\times M)$。发生在树 $A$ 中几乎所有节点的值都与树 $B$ 的根节点值相同，且每次尝试匹配都在 $B$ 的末尾节点处才宣告失败。此时对于 $A$ 的每个节点，都要遍历一遍树 $B$。例如：$A$ 和 $B$ 都是单链状的偏斜树，且节点值全为相同数。\n2. **平均时间复杂度**：$O(N)$。在通常情况下，树 $A$ 中只有极少数节点的值会与树 $B$ 的根节点值匹配，大部分节点在常数次比较后即判定不匹配，因此只需对树 $A$ 进行一次普通的 $O(N)$ 遍历即可。`,
    tags: ["时间复杂度", "最坏情况", "平均情况"],
  },
  {
    id: "coi-subtree-7",
    chapter: "coi-subtree-structure",
    level: 3,
    question: `请分析『树的子结构』算法的空间复杂度，并说明在什么情况下空间复杂度最大？`,
    answer:
    `空间复杂度主要由递归调用的**系统调用栈深度**决定：\n- **最坏空间复杂度**：$O(H_A)$，其中 $H_A$ 为树 $A$ 的高度。当树 $A$ 退化为单链表时，主函数遍历 $A$ 递归栈的最大深度达到 $N$。另外，辅助匹配函数的递归深度为 $O(H_B)$，总的递归栈空间取决于这两者的叠加，即 $O(\\max(H_A, H_B))$。当整棵树完全偏斜时，空间复杂度退化为 $O(N)$。\n- **平均空间复杂度**：$O(\\log N + \\log M)$。在二叉树相对平衡时，树的高度为对数级，递归栈深度最小，空间复杂度为 $O(\\log N)$ 级别。`,
    tags: ["空间复杂度", "递归栈", "树的高度"],
  },
  {
    id: "coi-subtree-8",
    chapter: "coi-subtree-structure",
    level: 3,
    question: `为什么我们不能像求解『子树（Subtree）』问题那样，通过先序/后序序列化（如转化为字符串包含关系）来解决『树的子结构（Subtree Structure）』问题？`,
    answer:
    `因为**序列化包含关系只能判定『满子树』匹配，无法判定『子结构』匹配**。\n\n在『子树』匹配中，必须匹配到原树的叶子节点，可以通过如 \`A_serialized.contains(B_serialized)\` 的方式来做 $O(N)$ 的匹配。但在『子结构』中，树 $B$ 到达叶子节点时，树 $A$ 下方还可以有任意多的子孙节点。如果将树 $A$ 和树 $B$ 进行先序序列化，树 $A$ 的序列化字符串中，对应 $B$ 的那部分子串后面会夹杂着 $A$ 额外子树的序列化内容，导致树 $B$ 的序列化串不再是树 $A$ 序列化串的子串。因此，子结构判定必须依靠基于树形状的递归比对。`,
    tags: ["序列化", "字符串包含", "局限性对比"],
  },
  {
    id: "coi-subtree-9",
    chapter: "coi-subtree-structure",
    level: 4,
    question: `请给出在 TypeScript 中实现『树的子结构』的完整、类型安全的代码，要求包含对节点值为 \`number\`（兼容浮点）的精度比较。`,
    answer:
    `\`\`\`typescript\nclass TreeNode {\n  val: number;\n  left: TreeNode | null = null;\n  right: TreeNode | null = null;\n  constructor(val: number) { this.val = val; }\n}\n\n// 浮点数/数值相等判断，容忍精度误差\nfunction isEquals(num1: number, num2: number): boolean {\n  return Math.abs(num1 - num2) < 1e-8;\n}\n\n// 主函数：在 A 中寻找与 B 根节点匹配的子结构\nfunction isSubStructure(A: TreeNode | null, B: TreeNode | null): boolean {\n  if (A === null || B === null) {\n    return false;\n  }\n  \n  let result = false;\n  // 如果当前节点值与 B 的根节点值『相等』，尝试以此为起点进行结构匹配\n  if (isEquals(A.val, B.val)) {\n    result = doesTree1HaveTree2(A, B);\n  }\n  \n  // 若当前节点不匹配或匹配失败，递归在左子树或右子树中继续寻找\n  return result || isSubStructure(A.left, B) || isSubStructure(A.right, B);\n}\n\n// 辅助判定函数：检查 R 树是否包含 B 树的结构\nfunction doesTree1HaveTree2(R: TreeNode | null, B: TreeNode | null): boolean {\n  // B 遍历结束，说明前面的节点都匹配成功了\n  if (B === null) return true;\n  // B 没完但 R 完了，说明 A 树此分支不够深，匹配失败\n  if (R === null) return false;\n  // 节点值不同，匹配失败\n  if (!isEquals(R.val, B.val)) return false;\n  \n  // 递归校验左右子树是否均包含 B 的左右子树结构\n  return doesTree1HaveTree2(R.left, B.left) && doesTree1HaveTree2(R.right, B.right);\n}\n\`\`\``,
    tags: ["代码实现", "TypeScript", "精度控制"],
  },
  {
    id: "coi-subtree-10",
    chapter: "coi-subtree-structure",
    level: 4,
    question: `请用 C++ 实现『树的子结构』判定算法，采用 \`double\` 类型的节点，并确保极佳的内存安全性与空指针防御性。`,
    answer:
    `\`\`\`cpp\n#include <cmath>\n\nstruct TreeNode {\n    double val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(double x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nclass Solution {\npublic:\n    bool isSubStructure(TreeNode* A, TreeNode* B) {\n        if (A == nullptr || B == nullptr) {\n            return false;\n        }\n        \n        bool result = false;\n        // 如果当前节点的值与 B 的根节点相等，尝试判断是否包含\n        if (equal(A->val, B->val)) {\n            result = doesTree1HaveTree2(A, B);\n        }\n        \n        // 只要当前匹配不成功，就在左子树或右子树中继续搜索\n        return result || isSubStructure(A->left, B) || isSubStructure(A->right, B);\n    }\n\nprivate:\n    // 判定 R 是否包含 B 的子结构\n    bool doesTree1HaveTree2(TreeNode* R, TreeNode* B) {\n        // B 树遍历完毕，匹配成功\n        if (B == nullptr) {\n            return true;\n        }\n        // B 树未完但 A 树为空，匹配失败\n        if (R == nullptr) {\n            return false;\n        }\n        // 值不相等，匹配失败\n        if (!equal(R->val, B->val)) {\n            return false;\n        }\n        \n        // 递归检查左右子树\n        return doesTree1HaveTree2(R->left, B->left) && \n               doesTree1HaveTree2(R->right, B->right);\n    }\n    \n    // 浮点数相等性判定\n    bool equal(double num1, double num2) {\n        return std::fabs(num1 - num2) < 1e-8;\n    }\n};\n\`\`\``,
    tags: ["代码实现", "C++", "指针安全"],
  },
];
