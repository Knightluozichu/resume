import type { ReviewQuestion } from "./types";

export const coiReverseListQuestions: ReviewQuestion[] = [
  {
    id: "coi-rev-1",
    chapter: "coi-reverse-list",
    level: 1,
    question: `在单向链表中，反转链表的核心物理操作是什么？为什么需要三个指针（\`prev\`、\`curr\`、\`next\`）？`,
    answer:
      `反转单向链表的核心是**改变指针的指向**，让原本指向后继节点的指针指向其前驱节点。在遍历过程中，若我们只使用一个指针指向当前节点 \`curr\`，一旦我们将它的 \`next\` 指向其前驱 \`prev\`，就会**丢失对原链表后续节点的引用**。因此需要三个指针配合：\n1. \`curr\`：当前正在处理的节点。\n2. \`prev\`：\`curr\` 的前驱节点，用于作为新的 \`next\` 指向。\n3. \`next\`：暂存 \`curr\` 原本的后继节点，以防在修改指针指向后失去对链表剩余部分的联系。`,
    tags: ["核心思路", "指针操作"],
  },
  {
    id: "coi-rev-2",
    chapter: "coi-reverse-list",
    level: 1,
    question: `反转链表的迭代实现中，初始时 \`prev\` 和 \`curr\` 指针应该分别指向什么？为什么？`,
    answer:
      `初始时，\`prev\` 应该指向 \`null\`，而 \`curr\` 应该指向原链表的头节点 \`head\`。\n这是因为原链表的头节点在反转后将成为新链表的尾节点，而在单向链表中，尾节点的 \`next\` 指针必须指向 \`null\`。将 \`prev\` 初始置为 \`null\`，可以在第一次迭代执行 \`curr.next = prev\` 时，自然地将原头节点的 \`next\` 指向 \`null\`，防止形成环路或悬空指针。`,
    tags: ["指针初始化", "边界状态"],
  },
  {
    id: "coi-rev-3",
    chapter: "coi-reverse-list",
    level: 2,
    question: `请对比迭代法与递归法反转单向链表的时间复杂度与空间复杂度，并说明为什么它们在空间复杂度上存在差异。`,
    answer:
      `1. **迭代法**：时间复杂度为 $O(N)$，空间复杂度为 $O(1)$。我们仅使用常数个辅助指针变量进行原地链接修改，不需要额外分配内存空间。\n2. **递归法**：时间复杂度为 $O(N)$，空间复杂度为 $O(N)$。\n**差异原因**：递归解法在执行过程中需要依赖系统调用栈（Call Stack）。每一层递归都会将当前函数的状态（如局部变量、返回地址等）压入栈中，直到递归到链表的尾部（最底层）才开始出栈返回。因此，递归深度与链表长度 $N$ 成正比，导致了 $O(N)$ 的空间复杂度。`,
    tags: ["复杂度分析", "迭代与递归"],
  },
  {
    id: "coi-rev-4",
    chapter: "coi-reverse-list",
    level: 2,
    question: `在递归反转链表的过程中，递归函数是如何实现『从尾部向头部』逆向修改指针指向的？`,
    answer:
      `递归反转链表的核心在于**『递』去『归』回**。在递的过程中，我们不断调用递归函数直至链表末尾，此时会返回最后一个节点作为新的头节点 \`newHead\`。在归的过程中（回溯时），对当前节点 \`head\`：\n1. 它的后继节点 \`head.next\` 的指向依然保持原样（即指向 \`head.next\`）。\n2. 我们执行 \`head.next.next = head\`，这使得后继节点反过来指向 \`head\`，完成了反转。\n3. 执行 \`head.next = null\` 断开原有的正向链接，防止形成双向环路。\n最后继续向上层回溯，并一路传递 \`newHead\`。`,
    tags: ["递归原理", "指针修改"],
  },
  {
    id: "coi-rev-5",
    chapter: "coi-reverse-list",
    level: 2,
    question: `在反转链表中，如果不小心将 \`prev\` 初始值设为非 \`null\`（例如原头节点本身或未初始化的随机值），会导致什么严重后果？`,
    answer:
      `会导致**链表成环（Cyclic Loop）或内存悬空**的严重问题。\n如果 \`prev\` 初始指向了原头节点自己，那么在执行反转时，原头节点的 \`next\` 会重新指向它自己，形成一个长度为 1 的环；如果指向其他非 \`null\` 节点，则会导致反转后的新尾节点没有正确以 \`null\` 结尾。在后续遍历反转后的链表时，程序会因为无法遇到 \`null\` 终止条件而陷入死循环，引发栈溢出或内存泄漏。`,
    tags: ["常见错误", "成环问题"],
  },
  {
    id: "coi-rev-6",
    chapter: "coi-reverse-list",
    level: 3,
    question: `反转链表有哪些常见的 corner cases（边界测试用例）？在编写代码时应如何安全处理它们？`,
    answer:
      `主要有以下三种边界情况：\n1. **空链表（\`head === null\`）**：链表没有任何节点。代码应直接返回 \`null\`，避免解引用空指针。\n2. **只有一个节点的链表（\`head.next === null\`）**：不需要任何反转操作，直接返回 \`head\`。\n3. **只有两个节点的链表（\`1 -> 2 -> null\`）**：检查反转后，原头节点 \`1\` 的 \`next\` 是否正确指向 \`null\`，且原尾节点 \`2\` 成为新头节点并指向 \`1\`。\n在编写代码时，通过在函数开头加入 \`if (head === null || head.next === null) return head;\` 这一守卫语句，可以优雅地统一处理空链表和单节点链表，使后续的反转逻辑更加安全。`,
    tags: ["边界处理", "鲁棒性"],
  },
  {
    id: "coi-rev-7",
    chapter: "coi-reverse-list",
    level: 3,
    question: `在反转链表过程中，如何检测和防范『链表断裂（Connection Loss）』？`,
    answer:
      `链表断裂通常发生在修改 \`curr.next\` 之前，没有提前将原 \`curr.next\` 备份。防范的黄金法则是**『先存后改』**。在每一次迭代循环体内，第一步必须是暂存后继节点：\n\`\`\`typescript\nconst next = curr.next; // 1. 先存下剩余的链表\n\`\`\`\n第二步才是安全地修改当前指针：\n\`\`\`typescript\ncurr.next = prev;       // 2. 放心断开原 next 并指向 prev\n\`\`\`\n第三步和第四步移动指针：\n\`\`\`typescript\nprev = curr;            // 3. prev 前进\ncurr = next;            // 4. curr 前进到之前暂存的 next\n\`\`\`\n遵循这一顺序即可保证链表绝不会在中途断开。`,
    tags: ["链表断裂", "指针更新顺序"],
  },
  {
    id: "coi-rev-8",
    chapter: "coi-reverse-list",
    level: 3,
    question: `在迭代反转结束后，我们最终应当返回哪个指针作为新链表的头节点？为什么不是 \`curr\`？`,
    answer:
      `最终应当返回 **\`prev\`** 指针作为新链表的头节点。\n因为迭代循环的终止条件通常是 \`while (curr !== null)\`。当循环结束时，\`curr\` 已经指向了原尾节点的后继，即 \`null\`；而暂存后继的 \`next\` 也是 \`null\`。此时，\`prev\` 刚好指向原链表的最后一个有效节点（即新的头节点）。因此，如果返回 \`curr\`，将得到一个空指针，而返回 \`prev\` 才是正确的反转后链表起点。`,
    tags: ["返回值判定", "指针状态"],
  },
  {
    id: "coi-rev-9",
    chapter: "coi-reverse-list",
    level: 4,
    question: `请用 TypeScript 实现一个健壮的迭代反转链表函数，并包含完整的类型定义与空值守卫。`,
    answer:
      `\`\`\`typescript\nclass ListNode {\n  val: number;\n  next: ListNode | null = null;\n  constructor(val: number) { this.val = val; }\n}\n\nfunction reverseList(head: ListNode | null): ListNode | null {\n  // 1. 空链表及单节点链表的快速守卫\n  if (head === null || head.next === null) {\n    return head;\n  }\n\n  let prev: ListNode | null = null;\n  let curr: ListNode | null = head;\n\n  while (curr !== null) {\n    const nextTemp: ListNode | null = curr.next; // 暂存后继\n    curr.next = prev;                            // 反转当前指针指向\n    prev = curr;                                 // prev 前移\n    curr = nextTemp;                             // curr 前移\n  }\n\n  return prev; // 返回新链表头节点\n}\n\`\`\``,
    tags: ["代码实现", "TypeScript", "迭代法"],
  },
  {
    id: "coi-rev-10",
    chapter: "coi-reverse-list",
    level: 4,
    question: `请用 TypeScript 实现一个递归反转链表函数，并简述其回溯阶段的堆栈执行过程。`,
    answer:
      `\`\`\`typescript\nfunction reverseListRecursive(head: ListNode | null): ListNode | null {\n  // 递归基（Base Case）\n  if (head === null || head.next === null) {\n    return head;\n  }\n\n  // 递去：获取反转后的新头节点（即原尾节点）\n  const newHead = reverseListRecursive(head.next);\n\n  // 归回：将当前节点 head 接在它的后继节点的后面\n  head.next.next = head;\n  head.next = null; // 切断旧的指向，避免产生环\n\n  return newHead;\n}\n\`\`\`\n**堆栈执行过程简述**：\n假设链表为 \`1 -> 2 -> 3 -> null\`：\n1. \`reverseListRecursive(1)\` 触发，递归调用 \`reverseListRecursive(2)\`；\n2. \`reverseListRecursive(2)\` 触发，递归调用 \`reverseListRecursive(3)\`；\n3. \`reverseListRecursive(3)\` 触发，命中递归基 \`head.next === null\`，直接返回节点 \`3\`（即 \`newHead\`）；\n4. 堆栈回溯到第 2 层（当前 \`head\` 为 \`2\`）：执行 \`2.next.next = 2\`（让节点 \`3\` 指向 \`2\`），\`2.next = null\`，返回 \`newHead\`（节点 \`3\`）；\n5. 堆栈回溯到第 1 层（当前 \`head\` 为 \`1\`）：执行 \`1.next.next = 1\`（让节点 \`2\` 指向 \`1\`），\`1.next = null\`，返回 \`newHead\`（节点 \`3\`）。所有调用出栈，反转完成。`,
    tags: ["代码实现", "TypeScript", "递归法"],
  },
];
