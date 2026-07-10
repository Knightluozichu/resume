import type { ReviewQuestion } from "./types";

export const coiMergeSortedListsQuestions: ReviewQuestion[] = [
  {
    id: "coi-merge-1",
    chapter: "coi-merge-sorted-lists",
    level: 1,
    question: `合并两个排序链表的基本思路是什么？为什么它们本身是有序的对合并过程有很大帮助？`,
    answer:
      `基本思路是**双指针归并**。因为两个输入链表本身就是排好序的，我们只需要维护两个指针分别指向两个链表的当前节点，每次比较两个节点的值，将较小值的节点接入合并后的新链表中，然后移动对应的指针。这种有序性保证了我们只需要遍历每个节点一次，即可完成合并，而无需重新排序，时间复杂度为 $O(M+N)$。`,
    tags: ["核心思路", "双指针"],
  },
  {
    id: "coi-merge-2",
    chapter: "coi-merge-sorted-lists",
    level: 1,
    question: `在迭代合并两个排序链表时，什么是『哨兵节点（Dummy Node）』？它的主要作用是什么？`,
    answer:
      `哨兵节点是一个**不存放有效数据（或者其值无意义）的辅助头节点**。它的主要作用是**简化边界条件处理**。在合并链表时，新链表的头节点是哪一个取决于哪个链表的第一个节点更小。如果不使用哨兵节点，我们需要在第一次合并时单独编写逻辑来确定头节点。而使用哨兵节点后，我们可以将所有节点一视同仁地追加到 \`tail.next\`，最后只需返回 \`dummy.next\` 即可，避免了繁琐的空指针检查和初始化分支。`,
    tags: ["哨兵节点", "边界处理"],
  },
  {
    id: "coi-merge-3",
    chapter: "coi-merge-sorted-lists",
    level: 2,
    question: `在迭代合并两个排序链表的实现中，如何进行防御性编程（Defensive Programming）以处理空链表的情况？`,
    answer:
      `防御性编程要求我们处理所有可能的输入边界：\n1. **两个链表均为空**：若 \`l1 === null\` 且 \`l2 === null\`，直接返回 \`null\`。\n2. **其中一个链表为空**：若 \`l1 === null\`，则无需合并，直接返回 \`l2\`；若 \`l2 === null\`，则直接返回 \`l1\`。\n在代码实现中，我们可以通过在入口处添加守卫条件，或者在循环和后续追加中隐式处理。例如，当 \`while (l1 !== null && l2 !== null)\` 结束时，必定至少有一个链表非空，我们只需将剩余的链表直接挂载到合并链表的尾部：\`tail.next = l1 !== null ? l1 : l2\`，即可安全地一次性处理完剩余部分。`,
    tags: ["防御性编程", "边界条件"],
  },
  {
    id: "coi-merge-4",
    chapter: "coi-merge-sorted-lists",
    level: 2,
    question: `为什么在合并完其中一个链表的所有节点后，可以直接将另一个链表剩余的部分挂载到新链表尾部？这体现了链表的什么物理特性？`,
    answer:
      `因为输入链表是**单向链表**，且它们**本身是有序的**。一旦其中一个链表（如链表 A）的节点被完全取完，说明链表 A 中的所有元素都小于或等于链表 B 中剩余的所有元素。而链表 B 剩余的部分本身就是有序的，且每个节点都通过 \`next\` 指针相互连接。因此，我们不需要再逐个拷贝或遍历链表 B，只需修改新链表尾节点的 \`next\` 指针，将其直接指向链表 B 剩余部分的头节点即可。这体现了链表**『节点间通过指针连接，可实现 $O(1)$ 快速拼接』**的物理特性，这在数组中是无法实现的（数组需要 $O(K)$ 拷贝）。`,
    tags: ["链表物理特性", "指针操作"],
  },
  {
    id: "coi-merge-5",
    chapter: "coi-merge-sorted-lists",
    level: 2,
    question: `请对比迭代法与递归法合并两个排序链表的时间复杂度与空间复杂度，并解释空间复杂度的差异来源。`,
    answer:
      `1. **迭代法**：时间复杂度为 $O(M+N)$，空间复杂度为 $O(1)$。我们只修改了已有节点的指针指向，使用了常数个辅助变量，未消耗额外内存。\n2. **递归法**：时间复杂度为 $O(M+N)$，空间复杂度为 $O(M+N)$。\n**空间复杂度差异来源**：递归方法每一次比较都会产生一层新的递归调用。在回溯前，系统必须将当前函数调用的上下文（局部变量、返回地址等）保存在调用栈（Call Stack）中。由于每次比较都会消耗一个节点，递归的最大深度等于两个链表的总长度 $M+N$，因此递归栈的空间开销为 $O(M+N)$。在处理超长链表时，递归法可能面临栈溢出（Stack Overflow）的风险。`,
    tags: ["复杂度分析", "迭代与递归", "空间复杂度"],
  },
  {
    id: "coi-merge-6",
    chapter: "coi-merge-sorted-lists",
    level: 3,
    question: `递归合并两个排序链表的核心递推公式（Math Relation）是什么？它是如何工作的？`,
    answer:
      `设 \`merge(list1, list2)\` 为合并两个链表的函数，其核心递推关系如下：\n- 若 \`list1.val < list2.val\`，则 \`list1.next = merge(list1.next, list2)\`，并返回 \`list1\`；\n- 否则，\`list2.next = merge(list1, list2.next)\`，并返回 \`list2\`。\n其工作原理是：将问题分解为『确定当前较小的节点』以及『递归合并剩余部分』。当较小节点确定后，将它的 \`next\` 指向剩余部分合并后的结果，这就完成了局部合并；随后将这个节点作为当前合并段的头节点一路向上返回。`,
    tags: ["递归原理", "递推公式"],
  },
  {
    id: "coi-merge-7",
    chapter: "coi-merge-sorted-lists",
    level: 3,
    question: `在迭代合并链表时，单指针更新（Single Pointer Update）的原则是什么？如何保证不会破坏原链表的结构或导致死循环？`,
    answer:
      `单指针更新的原则是：**每次比较后，只更新指向较小节点的指针，而保持另一个链表的指针不动**。\n例如，在比较 \`p1.val\` 和 \`p2.val\` 时：\n- 若 \`p1.val <= p2.val\`，则将当前尾节点指向 \`p1\`，即 \`tail.next = p1\`，然后**仅移动** \`p1 = p1.next\`。\n- 此时 \`p2\` 必须保持原地不动，以便在下一次循环中与 \`p1\` 的新节点进行比较。\n若错误地同时移动了两个指针，或者移动了错误的指针，会导致某些节点被跳过（丢失数据）、原链表被破坏或在遍历时因为指针重指向而产生环路（造成死循环）。`,
    tags: ["指针更新", "迭代细节"],
  },
  {
    id: "coi-merge-8",
    chapter: "coi-merge-sorted-lists",
    level: 3,
    question: `合并两个排序链表时，如何保证『稳定性（Preservation of Order）』？即如果两个链表中存在值相等的节点，应该如何处理？`,
    answer:
      `在合并过程中，稳定性指的是：若原链表中相同值的节点在合并后依然保持它们在各自原链表中的相对先后顺序。\n为了保证稳定性，在比较两个节点值相等时（\`p1.val === p2.val\`），我们应当**优先取第一个链表（或固定顺序的链表）的节点**。\n即条件写成 \`p1.val <= p2.val\`（而不是 \`<\`）。这样，当值相等时，\`p1\` 对应的节点会被先接入新链表，从而保持了原链表 A 和 B 的内部顺序以及 A 领先于 B 的顺序。这在某些带附加关键字的排序场景中非常重要。`,
    tags: ["稳定性", "排序顺序"],
  },
  {
    id: "coi-merge-9",
    chapter: "coi-merge-sorted-lists",
    level: 4,
    question: `请用 TypeScript 实现一个健壮的迭代合并两个排序链表的函数，并解释其每一步的设计。`,
    answer:
      `\`\`\`typescript\nclass ListNode {\n  val: number;\n  next: ListNode | null = null;\n  constructor(val: number) { this.val = val; }\n}\n\nfunction mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {\n  // 1. 哨兵节点，简化头节点挂载逻辑\n  const dummy = new ListNode(-1);\n  let tail = dummy;\n\n  // 2. 双指针同步遍历比较\n  let p1: ListNode | null = l1;\n  let p2: ListNode | null = l2;\n  while (p1 !== null && p2 !== null) {\n    if (p1.val <= p2.val) {\n      tail.next = p1;\n      p1 = p1.next; // 只移动 p1\n    } else {\n      tail.next = p2;\n      p2 = p2.next; // 只移动 p2\n    }\n    tail = tail.next; // 尾指针前移\n  }\n\n  // 3. 将未遍历完的链表直接拼接到尾部\n  tail.next = p1 !== null ? p1 : p2;\n\n  // 4. 返回哨兵节点的下一个节点，即合并后真实链表的头节点\n  return dummy.next;\n}\n\`\`\`\n**设计解析**：\n- \`dummy\` 节点避免了在第一次挂载节点时判断 \`head\` 是否为空的繁琐条件。\n- \`while\` 条件是逻辑 \`&&\`，确保在两个链表都还有元素可比时才进行循环，提高了效率。\n- \`tail.next = p1 !== null ? p1 : p2\` 利用了单向链表的拼接特性，实现 $O(1)$ 的收尾处理。`,
    tags: ["代码实现", "TypeScript", "迭代法"],
  },
  {
    id: "coi-merge-10",
    chapter: "coi-merge-sorted-lists",
    level: 4,
    question: `请用 TypeScript 实现一个递归合并两个排序链表的函数，并分析当输入链表极长时（如长度 $10^5$）该实现会存在什么风险及应对方案。`,
    answer:
      `\`\`\`typescript\nfunction mergeTwoListsRecursive(l1: ListNode | null, l2: ListNode | null): ListNode | null {\n  // 1. 递归基（空值守卫）\n  if (l1 === null) return l2;\n  if (l2 === null) return l1;\n\n  // 2. 递归比较与链接\n  if (l1.val <= l2.val) {\n    l1.next = mergeTwoListsRecursive(l1.next, l2);\n    return l1;\n  } else {\n    l2.next = mergeTwoListsRecursive(l1, l2.next);\n    return l2;\n  }\n}\n\`\`\`\n**极端情况风险分析**：\n当输入链表的总长度达到 $10^5$ 时，递归深度也会达到 $\\approx 10^5$。而在大多数 JavaScript 引擎中，系统调用栈的深度限制通常在 $10^4$ 级别。因此，运行此递归代码会触发 **\`RangeError: Maximum call stack size exceeded\`**（栈溢出崩溃）。\n**应对方案**：\n1. **首选迭代法**：在生产环境中，优先采用空间复杂度为 $O(1)$ 的迭代解法，以保证算法的鲁棒性。\n2. **尾递归优化（若支持）**：在部分支持尾调用优化的运行环境中重构代码。但由于 JS 引擎大多不默认支持尾递归优化，推荐依然使用迭代法。\n3. **手动模拟栈**：用数组模拟调用栈，将递归转换为迭代，但会增加代码复杂度且带来 $O(N)$ 辅助空间，通常不如直接迭代简洁。`,
    tags: ["代码实现", "递归法", "栈溢出风险"],
  },
];
