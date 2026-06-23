import type { ReviewQuestion } from "./types";

export const coiEntryNodeOfLoopQuestions: ReviewQuestion[] = [
  {
    id: "coi-loop-1",
    chapter: "coi-entry-node-of-loop",
    level: 1,
    question: "如何使用快慢指针检测一个链表中是否存在环？其核心判定条件是什么？",
    answer:
      "使用**『Floyd 判圈算法』**（也称双指针追击法）：\n1. 初始化两个指针 `slow` 和 `fast` 指向链表头节点 `head`。\n2. 在循环中，`slow` 每次向前移动 1 步，`fast` 每次向前移动 2 步。\n3. **核心判定条件**：如果链表存在环，因为 `fast` 进入环后相对于 `slow` 的相对速度为 1 步/次，它们在环内一定会相遇（即满足 `fast === slow`）；如果链表无环，`fast`（或其下一个节点 `fast.next`）会先指向 `null`，从而安全退出循环。",
    tags: ["链表环检测", "双指针", "Floyd判圈"],
  },
  {
    id: "coi-loop-2",
    chapter: "coi-entry-node-of-loop",
    level: 1,
    question: "在快慢指针检测到链表存在环（指针相遇）后，如何定位并找到环的入口节点？",
    answer:
      "定位环入口节点的具体步骤如下：\n1. 保持慢指针 `slow` 在相遇点原地不动。\n2. 将快指针 `fast` 重新指向链表的头节点 `head`。\n3. 让 `slow` 和 `fast` 两个指针以相同的速度（每次向前移动 1 步）同步移动。\n4. 当它们**再次相遇**（`fast === slow`）时，相遇的节点就是**环的入口节点**。",
    tags: ["入口节点定位", "双指针", "算法步骤"],
  },
  {
    id: "coi-loop-3",
    chapter: "coi-entry-node-of-loop",
    level: 2,
    question: "在检测链表环时，为什么快指针的速度一般设定为慢指针的 2 倍？如果设定为 3 倍或 4 倍会有什么问题？",
    answer:
      "快指针设为慢指针的 2 倍是最优、最简单且最稳定的选择，原因为：\n1. **追击保证**：在环内，快指针 2 倍速时，相对于慢指针的相对速度是 $2 - 1 = 1$。距离每次减少 1，因此在环内一定能精准追上慢指针，**不会发生越过/跳过的情况**。\n2. **多倍速问题**：如果快指针为 3 倍速（相对速度为 2）或 4 倍速（相对速度为 3），当它们在环内追击时，由于相对步长大于 1，可能会发生快指针在某一步“跳过”了慢指针的情况（例如在环内它们擦肩而过，取模运算后相对距离不为 0），导致相遇时间变长，或者需要更复杂的数学模运算来判断，且需要更多的防御性空指针检查（如判断 `fast.next.next.next`）。",
    tags: ["指针速度", "追击原理", "设计权衡"],
  },
  {
    id: "coi-loop-4",
    chapter: "coi-entry-node-of-loop",
    level: 2,
    question: "使用 Floyd 判圈算法求环入口节点时，其最优的时间复杂度和空间复杂度分别是多少？请给出简要分析。",
    answer:
      "最优的复杂度为：\n- **时间复杂度**：$O(N)$。在第一阶段追击时，慢指针在走完环的一整圈之前，快指针必定与其相遇（慢指针进环时，快指针已经在环内，两者距离小于环长 $L$，相对速度为 1，故最多 $L$ 步内相遇）。相遇总步数不超过 $N$。第二阶段寻找入口时，两指针同步移动，最多移动 $a$ 步（$a$ 为头到入口距离）。因此总时间复杂度为线性阶 $O(N)$。\n- **空间复杂度**：$O(1)$。我们只需定义快、慢两个辅助指针变量，无需分配额外的内存，空间复杂度为常数阶。",
    tags: ["时间复杂度", "空间复杂度", "复杂度分析"],
  },
  {
    id: "coi-loop-5",
    chapter: "coi-entry-node-of-loop",
    level: 3,
    question: "请给出 Floyd 环入口定位算法的数学证明，说明为什么『头节点到环入口的距离』与『相遇点到环入口 the 距离加上若干圈环长』相等？",
    answer:
      "设头节点到环入口的距离为 $a$，环的周长为 $L$，相遇点距离环入口顺时针距离为 $b$（相遇点到环入口的剩余距离为 $L-b$）。\n相遇时：\n- 慢指针走的距离为 $S_{slow} = a + b$（慢指针进环后走完一整圈前必定相遇，故在环内走了 $b$ 步）；\n- 快指针走的距离为 $S_{fast} = a + k \\cdot L + b$（$k \\ge 1$，表示快指针在相遇前已在环内绕了 $k$ 圈）。\n\n因为快指针速度是慢指针的 2 倍，故有关系式：\n$$S_{fast} = 2 \\cdot S_{slow}$$\n$$a + k \\cdot L + b = 2(a + b)$$\n$$a = k \\cdot L - b$$\n将右边拆开整理为：\n$$a = (k - 1)L + (L - b)$$\n\n**结论**：由于 $k \\ge 1$，该等式表明，从头节点出发到环入口的距离 $a$，等于从相遇点出发走到环入口的距离 $L-b$ 加上 $k-1$ 圈的周长。因此，一个指针从 `head` 出发，另一个从相遇点出发，以同等速度（每次 1 步）前进，它们最终一定会在环入口处相遇。",
    tags: ["数学证明", "公式推导", "Floyd原理"],
  },
  {
    id: "coi-loop-6",
    chapter: "coi-entry-node-of-loop",
    level: 3,
    question: "在检测到链表中存在环之后，如何计算该环中的节点总数（即环的大小/周长 L）？",
    answer:
      "计算环长度的思路如下：\n1. 当快慢指针相遇在某个节点时，锁定该相遇点（如让慢指针 `slow` 留在相遇点不动）。\n2. 让另一个指针（如快指针 `fast`）从相遇点出发，每次只向前移动 1 步，同时用计数器进行累计。\n3. 当 `fast` 指针再次回到 `slow` 锁定的相遇点时，停止移动。此时计数器的累计值即为环中节点的总数 $L$。",
    tags: ["环大小", "计数逻辑", "算法扩展"],
  },
  {
    id: "coi-loop-7",
    chapter: "coi-entry-node-of-loop",
    level: 3,
    question: "在编写链表环检测的循环时，需要进行哪些防御性指针检查？请解释防范的具体风险。",
    answer:
      "必须对快指针的前进进行防御性检查，通常在循环条件中包含：\n`while (fast !== null && fast.next !== null)`\n\n**原因防范**：\n- `fast !== null`：如果链表无环，快指针会最先到达链表末尾的下一个位置（即 `null`），必须防止在此情况下访问 `fast.next` 导致崩溃。\n- `fast.next !== null`：因为快指针每次需要移动 2 步（即 `fast = fast.next.next`），如果快指针当前在尾节点，`fast.next` 为 `null`，如果不作此检查直接访问 `fast.next.next`，会触发空指针解引用错误（如 C++ 的段错误或 JS 的 `TypeError`）。",
    tags: ["防御性编程", "指针安全", "空指针异常"],
  },
  {
    id: "coi-loop-8",
    chapter: "coi-entry-node-of-loop",
    level: 3,
    question: "请分析以下四类特殊链表输入，Floyd 判圈算法应该如何应对：(1) 空链表；(2) 单节点无环；(3) 双节点成环；(4) 普通无环链表。",
    answer:
      "各类边界情况分析与安全防护如下：\n1. **空链表**：`head` 为 `null`。在入口防御性判断 `if (head === null || head.next === null) return null;` 直接拦截返回。\n2. **单节点无环**：`head.next` 为 `null`。同上被入口判断拦截，或因为快指针 `fast.next === null` 无法进入/退出循环，安全返回 `null`。\n3. **双节点成环**（如 `1 -> 2 -> 1`）：第一轮后慢指针到 `2`，快指针到 `1`；第二轮后慢指针到 `1`，快指针也到 `1`。两指针在第 2 步成功相遇，算法能正确检测并定位入口。\n4. **普通无环链表**：快指针会平稳走到尾部，由于 `fast.next === null` 或 `fast === null` 成立，正常退出循环，并判定返回 `null`，无任何越界崩溃风险。",
    tags: ["边界条件", "空链表", "特殊结构", "测试用例"],
  },
  {
    id: "coi-loop-9",
    chapter: "coi-entry-node-of-loop",
    level: 4,
    question: "当头节点到环入口的距离 a 远小于环长度 L 时，快慢指针相遇时快指针绕环的圈数 k 是多少？若 a 远大于 L 呢？",
    answer:
      "根据快慢指针的追击过程分析：\n1. **当 $a \\ll L$ 时**：慢指针刚进入环不久，快指针就已经从后面追上并与慢指针相遇。因为慢指针只在环内走了 $b$ 步（$b < L$ 且 $b \\approx a$），快指针此时在环内走过的总距离也不足两圈。因此，快指针在相遇前绕环的圈数 $k = 1$。\n2. **当 $a \\gg L$ 时**：慢指针需要走漫长的 $a$ 步才能到达环的入口。在这个过程中，由于快指针速度是慢指针的 2 倍，且早已进入环内，快指针会在环内不停地转圈等待慢指针。此时快指针绕环的圈数 $k \\approx \\frac{a}{L}$，相遇时快指针会绕环非常多圈（$k$ 为一个很大的整数）。",
    tags: ["圈数分析", "追击极限", "深度理解"],
  },
  {
    id: "coi-loop-10",
    chapter: "coi-entry-node-of-loop",
    level: 4,
    question: "请使用 TypeScript 写出一个完整、健壮的寻找链表环入口的函数，要求包含完整的类型定义与防御性边界检查。",
    answer:
      "```typescript\n// 链表节点类定义\nclass ListNode {\n  val: number;\n  next: ListNode | null = null;\n  constructor(val: number) {\n    this.val = val;\n  }\n}\n\nfunction detectCycle(head: ListNode | null): ListNode | null {\n  // 1. 防御性检查：链表为空或只有一个节点（不可能成环）\n  if (head === null || head.next === null) {\n    return null;\n  }\n\n  let slow: ListNode | null = head;\n  let fast: ListNode | null = head;\n\n  // 2. 第一阶段：判断是否有环并寻找相遇点\n  let hasCycle = false;\n  while (fast !== null && fast.next !== null) {\n    slow = slow!.next;\n    fast = fast.next.next;\n    if (slow === fast) {\n      hasCycle = true;\n      break;\n    }\n  }\n\n  // 如果没有相遇，说明无环\n  if (!hasCycle) {\n    return null;\n  }\n\n  // 3. 第二阶段：重置快指针，以相同速度同步前进寻找环入口\n  fast = head;\n  while (slow !== fast) {\n    slow = slow!.next;\n    fast = fast!.next;\n  }\n\n  return slow; // 返回相遇的入口节点\n}\n```",
    tags: ["TypeScript", "代码实现", "算法闭环"],
  },
];
