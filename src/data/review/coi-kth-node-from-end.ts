import type { ReviewQuestion } from "./types";

export const coiKthNodeFromEndQuestions: ReviewQuestion[] = [
  {
    id: "coi-kthnode-1",
    chapter: "coi-kth-node-from-end",
    level: 1,
    question: `如何以单次遍历（Single Pass）解决『链表中倒数第 k 个节点』的问题？其核心思路是什么？`,
    answer:
      `单次遍历的核心思路是**『双指针间距法』**（也称快慢指针滑尺法）。\n我们定义两个指针：\`fast\`（快指针）和 \`slow\`（慢指针）。让 \`fast\` 先向前走 $k-1$ 步，此时 \`fast\` 和 \`slow\` 之间拉开了 $k-1$ 个节点的距离（即两个指针之间跨越了 $k$ 个节点的空间）。然后，让 \`fast\` 和 \`slow\` 以相同的速度同步向后移动。当 \`fast\` 走到链表尾节点时，由于两指针的相对距离保持不变，\`slow\` 正好指向倒数第 $k$ 个节点。整个过程只对链表进行了一次扫描。`,
    tags: ["核心思路", "双指针"],
  },
  {
    id: "coi-kthnode-2",
    chapter: "coi-kth-node-from-end",
    level: 1,
    question: `使用双指针间距法求解链表中倒数第 k 个节点时，其最优的时间复杂度和空间复杂度分别是多少？`,
    answer:
      `最优的复杂度为：\n- **时间复杂度**：$O(n)$。我们只需用快指针遍历一遍链表，慢指针同步移动。每个节点最多被访问两次，故时间复杂度为线性阶。\n- **空间复杂度**：$O(1)$。我们只需要定义两个额外的辅助指针变量（\`fast\` 和 \`slow\`），不需要分配额外的动态内存，因此空间复杂度为常数阶。`,
    tags: ["时间复杂度", "空间复杂度"],
  },
  {
    id: "coi-kthnode-3",
    chapter: "coi-kth-node-from-end",
    level: 2,
    question: `详细描述双指针移动时的两个阶段，以及如何确定指针之间的“滑尺”间距？`,
    answer:
      `双指针的移动分为两个明确的阶段：\n1. **拉开间距阶段**：\`slow\` 指针留在头节点 \`head\`，\`fast\` 指针先行向前移动 $k-1$ 步。此时 \`fast\` 比 \`slow\` 超前 $k-1$ 步（此时两指针的间距能够恰好覆盖 $k$ 个节点，如当 $k=2$ 时，两指针间距为 1 步）。\n2. **同步滑动阶段**：在确认能够成功拉开间距后，\`fast\` 和 \`slow\` 开始同时以每次 1 步的速度向后移动，直到 \`fast\` 指向尾节点（即 \`fast.next === null\`）。此时，\`slow\` 指向的即为倒数第 $k$ 个节点。`,
    tags: ["双指针", "执行步骤"],
  },
  {
    id: "coi-kthnode-4",
    chapter: "coi-kth-node-from-end",
    level: 2,
    question: `如果输入的链表头指针 \`head\` 为空（\`nullptr\` / \`null\`），算法应该如何处理？为什么？`,
    answer:
      `如果输入的 \`head\` 为空，说明链表是一个空链表，其中不存在任何节点，自然也就不存在“倒数第 $k$ 个节点”。算法应当在函数入口处进行**防御性检查**（Guard Clause），如果检测到 \`head\` 为空，应直接返回 \`null\`。如果不进行此项检查，后续试图访问 \`head.next\` 或将指针初始化并解引用时，就会抛出空指针异常（如 C++ 中的 \`Segment Fault\` 或 JS 中的 \`Cannot read properties of null\`）。`,
    tags: ["空指针", "防御性检查", "边界条件"],
  },
  {
    id: "coi-kthnode-5",
    chapter: "coi-kth-node-from-end",
    level: 2,
    question: `当输入的参数 $k = 0$ 时，有什么潜在的风险？通常应如何处理？`,
    answer:
      `在通常的算法题意下，链表节点的索引是 1-based 的，即倒数第一个节点是尾节点，**倒数第 0 个节点是没有物理意义的**。如果传入的 $k = 0$ 且我们不进行特殊处理：\n- 在第一阶段 \`fast\` 应该向前走 $k-1 = -1$ 步，由于步数不能为负，这会导致循环条件异常或逻辑混乱；\n- 即使我们用 \`fast\` 先走 $k$ 步（以 \`fast === null\` 为终止条件），$k=0$ 也会使得 \`fast\` 走 0 步，从而导致两指针重合，最后返回尾节点的下一个节点（\`null\`），这不符合题目“找节点”的期望。\n因此，当检测到 $k \\le 0$ 时，应在入口处将其作为**非法输入**直接返回 \`null\`。`,
    tags: ["边界条件", "输入校验"],
  },
  {
    id: "coi-kthnode-6",
    chapter: "coi-kth-node-from-end",
    level: 3,
    question: `如果参数 $k$ 大于链表的实际长度 $n$，会发生什么？如何在代码中优雅地预防此边界情况？`,
    answer:
      `如果 $k > n$，在快指针尝试先行 $k-1$ 步的过程中，\`fast\` 指针在尚未走完 $k-1$ 步时就会提前到达链表尾部（即 \`fast\` 变成 \`null\`）。如果不做防范，继续执行 \`fast = fast.next\` 就会导致空指针解引用崩溃。\n**优雅预防策略**：在快指针先行的循环中，每次前进前都要判断 \`fast\` 是否为 \`null\`。如果循环内发现 \`fast === null\`，说明链表的总长度不足 $k$。此时应当终止程序并直接返回 \`null\`（或者抛出越界异常，取决于具体 API 设计）。`,
    tags: ["越界处理", "指针安全"],
  },
  {
    id: "coi-kthnode-7",
    chapter: "coi-kth-node-from-end",
    level: 3,
    question: `在快慢指针的循环滑动和判断中，检查 \`fast\` 和 \`fast.next\` 分别是在防范什么？两者的适用场景是什么？`,
    answer:
      `两者的检查目的和适用场景如下：\n1. **检查 \`fast !== null\`**：主要用于**快指针先行 $k-1$ 步**的循环中，或者以 \`fast\` 到达链表末尾后（\`null\`）为基准的遍历。防范的是“链表长度小于 $k$”时，\`fast\` 已经为空却仍在执行 \`fast.next\` 导致的空指针异常。\n2. **检查 \`fast.next !== null\`**：主要用于**快慢指针同步滑动**时的循环条件（如 \`while (fast.next !== null)\`）。它的作用是让 \`fast\` 停在**最后一个节点（尾节点）**处。此时 \`slow\` 刚好落在倒数第 $k$ 个节点上。如果改用 \`fast !== null\` 作为终止条件，\`fast\` 会滑向尾节点的下一个位置（\`null\`），此时 \`slow\` 会多走一步，落在倒数第 $k-1$ 个节点上。`,
    tags: ["指针校验", "循环条件"],
  },
  {
    id: "coi-kthnode-8",
    chapter: "coi-kth-node-from-end",
    level: 3,
    question: `如何利用类似的快慢指针思路寻找链表的中间节点？请描述其基本逻辑。`,
    answer:
      `寻找链表中间节点同样利用了快慢指针的相对速度差，通常称为**『步长差法』**：\n1. 初始化 \`fast\` 和 \`slow\` 指针都在头节点 \`head\`。\n2. 在循环中，\`fast\` 每次向前移动 2 步，而 \`slow\` 每次向前移动 1 步（即快指针的速度是慢指针的两倍）。\n3. 当 \`fast\` 到达链表尾部（对于奇数长度，\`fast.next === null\`；对于偶数长度，\`fast === null\`）时，\`slow\` 指针因为速度只有一半，刚好指向链表的中间节点。对于偶数长度的链表，这也便于定位是前半部分的末尾还是后半部分的开头。`,
    tags: ["快慢指针", "链表中间节点", "扩展延伸"],
  },
  {
    id: "coi-kthnode-9",
    chapter: "coi-kth-node-from-end",
    level: 4,
    question: `如何使用快慢指针判断一个单向链表是否存在环（Cycle）？如果存在，如何找到环的入口？`,
    answer:
      `这是著名的**『Floyd 判圈算法』（双指针追击）**：\n1. **判断是否有环**：\`fast\` 每次走 2 步，\`slow\` 每次走 1 步。如果链表有环，\`fast\` 指针必然先进入环，并在环内以相对速度 1 步/次追赶 \`slow\` 指针，最终两指针一定会相遇（\`fast === slow\`）。如果没有环，\`fast\` 会先走到 \`null\`。\n2. **寻找环的入口**：在两指针相遇后，保持 \`slow\` 留在相遇点，将 \`fast\` 重新指向链表头节点 \`head\`。之后，让 \`fast\` 和 \`slow\` 以相同的速度（每次 1 步）同步移动。当它们再次相遇时，相遇的节点就是**环的入口节点**。这可以通过数学习题公式（$a = c + (n-1)(b+c)$）严格证明。`,
    tags: ["链表环检测", "Floyd判圈算法", "扩展延伸"],
  },
  {
    id: "coi-kthnode-10",
    chapter: "coi-kth-node-from-end",
    level: 4,
    question: `请在 TypeScript 中实现一个健壮的 \`getKthFromEnd\` 函数，要求完整处理边界条件并附带节点类型定义。`,
    answer:
      `\`\`\`typescript\n// 链表节点类定义\nclass ListNode {\n  val: number;\n  next: ListNode | null = null;\n  constructor(val: number) {\n    this.val = val;\n  }\n}\n\nfunction getKthFromEnd(head: ListNode | null, k: number): ListNode | null {\n  // 1. 防御性检查：head 为空或 k 不合法\n  if (head === null || k <= 0) {\n    return null;\n  }\n\n  let fast: ListNode | null = head;\n  let slow: ListNode | null = head;\n\n  // 2. 快指针先向前移动 k-1 步\n  for (let i = 0; i < k - 1; i++) {\n    if (fast !== null) {\n      fast = fast.next;\n    }\n    // 如果在未走完 k-1 步之前 fast 已经变为空，说明 k 大于链表长度\n    if (fast === null) {\n      return null;\n    }\n  }\n\n  // 3. 快慢指针同步滑动，直到快指针到达尾节点\n  while (fast.next !== null) {\n    fast = fast.next;\n    // slow 必然不为空，因为它的移动滞后且链表完整\n    slow = slow!.next;\n  }\n\n  return slow;\n}\n\`\`\``,
    tags: ["代码实现", "TypeScript", "防御性编程"],
  },
];
