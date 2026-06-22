import type { ReviewQuestion } from "./types";

export const coiPrintListReverseQuestions: ReviewQuestion[] = [
  {
    id: "coi-plr-1",
    chapter: "coi-print-list-reverse",
    level: 1,
    question: "从尾到头打印链表（面试题6）解决的核心问题是什么？它为什么不能直接从前往后打印？",
    answer:
      "核心问题是在不修改链表结构的前提下，逆序输出单向链表的所有节点值。因为单向链表只有指向下一个节点的 `next` 指针，只能单向顺序遍历，无法直接反向访问，所以必须利用辅助结构（如栈）来改变输出顺序。",
    tags: ["核心直觉", "链表特性"],
  },
  {
    id: "coi-plr-2",
    chapter: "coi-print-list-reverse",
    level: 1,
    question: "为什么说递归是解决逆序打印链表问题的一种天然隐式方案？它利用了什么系统机制？",
    answer:
      "递归在本质上是后进先出（LIFO）的。执行递归调用时，系统会在内存中自动分配并维护一个『系统调用栈帧（Call Stack Frame）』。当递归向下前进时，之前的状态被依次压入调用栈；当递归到达基准情况回溯时，函数依次返回，系统调用栈依次弹出并执行未完的打印指令，天然地实现了逆序打印。",
    tags: ["递归", "系统调用栈"],
  },
  {
    id: "coi-plr-3",
    chapter: "coi-print-list-reverse",
    level: 1,
    question: "使用显式辅助栈和递归方法来逆序打印链表，它们的时间复杂度与空间复杂度分别是多少？",
    answer:
      "两者的时间复杂度都是 $O(n)$，因为都必须且只需遍历链表中的每个节点常数次。空间复杂度也都是 $O(n)$，其中递归需要消耗 $O(n)$ 的系统调用栈空间，而显式栈需要 $O(n)$ 的辅助堆内存存储空间（如 `std::stack` 或数组）。",
    tags: ["时间复杂度", "空间复杂度"],
  },
  {
    id: "coi-plr-4",
    chapter: "coi-print-list-reverse",
    level: 2,
    question: "为什么对于非常长的链表，使用递归来实现从尾到头打印链表是危险的？如何规避？",
    answer:
      "因为每一次递归调用都会在系统栈中增加一个栈帧。系统调用栈的大小通常非常有限（通常只有几 MB）。如果链表长度非常大（如数万个节点），递归调用深度过深会耗尽调用栈空间，从而导致程序抛出『栈溢出』（Stack Overflow）错误并崩溃。规避方法是改用基于堆内存的显式辅助栈（迭代实现）。",
    tags: ["栈溢出", "空间安全"],
  },
  {
    id: "coi-plr-5",
    chapter: "coi-print-list-reverse",
    level: 2,
    question: "在从尾到头打印链表的 C++ 显式栈实现中，双指针或迭代过程可以分为哪两个核心阶段？",
    answer:
      "可以分为两个阶段：\n1. **入栈阶段**：用迭代指针从头节点开始正向遍历链表，将每个节点的值依次压入 `std::stack` 中，直到指针指向 `nullptr`；\n2. **出栈阶段**：在循环中依次获取栈顶元素并打印，然后将其弹出栈（`pop`），直到栈变为空。",
    tags: ["显式栈", "算法阶段"],
  },
  {
    id: "coi-plr-6",
    chapter: "coi-print-list-reverse",
    level: 2,
    question: "为什么在 TypeScript/JavaScript 中，我们通常直接使用数组（Array）来模拟显式栈，而不是自定义 Stack 类？",
    answer:
      "因为 JS/TS 的原生数组 `Array` 已经自带了高效的 `push()`（入栈）和 `pop()`（出栈）方法，这两个方法在 V8 等引擎底层经过了高度优化的内存分配和扩容处理，能够直接提供先进后出（LIFO）的数据结构功能，因此无需自己编写类进行多余封装，并且性能极佳。",
    tags: ["语言特性", "数据结构"],
  },
  {
    id: "coi-plr-7",
    chapter: "coi-print-list-reverse",
    level: 3,
    question: "请写出使用 std::stack 实现从尾到头打印链表的 C++ 完整核心代码。",
    answer:
      "```cpp\nvoid printListFromTailToHeadStack(ListNode* head) {\n  std::stack<int> nodes;\n  ListNode* curr = head;\n  while (curr != nullptr) {\n    nodes.push(curr->val);\n    curr = curr->next;\n  }\n  while (!nodes.empty()) {\n    std::cout << nodes.top() << \" \";\n    nodes.pop();\n  }\n}\n```",
    tags: ["代码实现", "C++"],
  },
  {
    id: "coi-plr-8",
    chapter: "coi-print-list-reverse",
    level: 3,
    question: "请写出使用递归回溯实现逆序打印链表的 C++ 核心代码，并特别注明防御空链表边界的逻辑。",
    answer:
      "```cpp\nvoid printListFromTailToHeadRecursive(ListNode* head) {\n  if (head == nullptr) { // 边界防御：空链表判定 / 递归终止基准\n    return;\n  }\n  printListFromTailToHeadRecursive(head->next); // 先处理后继节点\n  std::cout << head->val << \" \"; // 回溯时打印当前节点值\n}\n```",
    tags: ["代码实现", "递归"],
  },
  {
    id: "coi-plr-9",
    chapter: "coi-print-list-reverse",
    level: 4,
    question: "如果面试官加了极其苛刻的限制条件：严禁修改原链表，且要求空间复杂度为 O(1)。在不限制时间复杂度的前提下，该如何实现逆序输出？",
    answer:
      "可以使用『多重遍历法』。首先正向遍历一遍链表，统计节点总数 $N$。接着，通过一个外部循环 $i$ 从 $N-1$ 递减到 0。在每次内层循环中，从头节点开始正向走 $i$ 步定位到对应节点并输出其值。这样不需要使用任何额外栈空间，空间复杂度为 $O(1)$，但代价是时间复杂度退化为 $O(n^2)$。",
    tags: ["多重遍历", "时间换空间"],
  },
  {
    id: "coi-plr-10",
    chapter: "coi-print-list-reverse",
    level: 4,
    question: "如果在面试中被允许修改链表结构，并且要求时间复杂度为 O(n)、空间复杂度为 O(1)，应该采用什么策略？该策略有什么副作用？",
    answer:
      "可以采用『链表翻转』策略。先执行原地翻转链表算法，将所有节点的 `next` 指针反向，使得原尾节点变成头节点。然后正向遍历打印翻转后的链表。打印完后，为了消除修改，可再次翻转链表以还原结构。\n该策略的副作用是：它不是只读的，在修改指针期间链表物理结构被临时破坏，如果在多线程环境下并发访问会导致不可预测的异常；此外，如果程序在打印或恢复反转的中途发生崩溃或中断，链表将永久处于损坏状态。",
    tags: ["链表反转", "算法副作用"],
  },
];
