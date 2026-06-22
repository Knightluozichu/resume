import type { ReviewQuestion } from "./types";

export const coiQueueWithTwoStacksQuestions: ReviewQuestion[] = [
  {
    id: "coi-qwts-1",
    chapter: "coi-queue-with-two-stacks",
    level: 1,
    question: "用两个栈实现队列的核心设计思想与数据流动模型是什么？",
    answer:
      "核心思想是『负负得正』：通过两次后进先出（LIFO）的反转来模拟先进先出（FIFO）。Stack 1 作为输入栈，新元素只管压入 Stack 1；Stack 2 作为输出栈，出队时只管从 Stack 2 弹出。当 Stack 2 为空时，将 Stack 1 元素全部弹出并压入 Stack 2，完成反转并使最早的元素排到 Stack 2 的栈顶。",
    tags: ["核心直觉", "数据流"],
  },
  {
    id: "coi-qwts-2",
    chapter: "coi-queue-with-two-stacks",
    level: 1,
    question: "用两个栈模拟队列时，入队与出队的均摊时间复杂度是多少？",
    answer:
      "入队的均摊时间复杂度是 O(1)，因为每次只需向 Stack 1 执行一次压栈操作。出队的均摊时间复杂度也是 O(1)，虽然单次最坏情况需要 O(N) 转移元素，但均摊到每个元素上，每个元素最多进出两个栈各 2 次，均摊开销为常数级别。",
    tags: ["时间复杂度", "摊还分析"],
  },
  {
    id: "coi-qwts-3",
    chapter: "coi-queue-with-two-stacks",
    level: 1,
    question: "双栈队列的空间复杂度是多少？为什么？",
    answer:
      "空间复杂度为 O(N)，其中 N 是当前队列中保存的元素总数。因为所有入队且尚未出队的元素都临时存放在 Stack 1 或 Stack 2 中，两栈元素之和刚好等于队列中的实际元素数。",
    tags: ["空间复杂度"],
  },
  {
    id: "coi-qwts-4",
    chapter: "coi-queue-with-two-stacks",
    level: 2,
    question: "在出队操作中，如果 Stack 2（输出栈）不为空，可以直接弹出栈顶吗？为什么？",
    answer:
      "可以且必须直接弹出。因为 Stack 2 中的元素顺序已经是反转后的 FIFO 顺序，栈顶即为当前最老的元素。只要 Stack 2 不为空，它的栈顶就绝对是最早出队的元素。只有在 Stack 2 为空时，才需要触发转移操作。",
    tags: ["出队决策", "状态维护"],
  },
  {
    id: "coi-qwts-5",
    chapter: "coi-queue-with-two-stacks",
    level: 2,
    question: "请使用记账法（Accounting Method）详细证明出队操作的均摊时间复杂度为 O(1)。",
    answer:
      "我们为每个元素存入队列时『记账』存入 4 个金币的操作费。当元素入队时：花费 1 个金币压入 Stack 1。当元素转移时：花费 1 个金币从 Stack 1 弹出，再花费 1 个金币压入 Stack 2。当元素出队时：花费 1 个金币从 Stack 2 弹出。每个元素的一生刚好消耗 4 个金币，入队和出队所需的实际工作均可完全由已预存的金币支付，因此均摊复杂度为常数 O(1)。",
    tags: ["摊还分析", "记账法"],
  },
  {
    id: "coi-qwts-6",
    chapter: "coi-queue-with-two-stacks",
    level: 3,
    question: "在实现双栈队列时，如果把『转移条件』写成『只要 Stack 1 不为空，每次出队都做转移』，会产生什么 Bug？",
    answer:
      "会导致新入队的元素排在老元素的前面，彻底破坏先进先出（FIFO）的顺序。必须遵循『只有输出栈 Stack 2 为空时，才把 Stack 1 的全部元素一次性转入 Stack 2』的原则，以确保数据反转后能按正确顺序排队弹出。",
    tags: ["逻辑缺陷", "数据反转"],
  },
  {
    id: "coi-qwts-7",
    chapter: "coi-queue-with-two-stacks",
    level: 3,
    question: "在双栈队列中，当调用出队或查看队首元素时，需要考虑哪些异常或边界情况？",
    answer:
      "当队列为空（即 Stack 1 和 Stack 2 均为空）时，调用出队（pop）或查看队首（peek）会发生非法操作。代码必须对此进行防护，要么抛出异常，要么返回特定错误值（如在 C++ 中抛出 std::runtime_error，在 TS 中返回 undefined 或抛出 Error）。",
    tags: ["边界防护", "鲁棒性"],
  },
  {
    id: "coi-qwts-8",
    chapter: "coi-queue-with-two-stacks",
    level: 3,
    question: "请写出使用 std::stack 实现双栈队列的完整 C++ 核心类实现。",
    answer:
      "template <typename T>\nclass MyQueue {\nprivate:\n    std::stack<T> s1, s2;\n    void transfer() {\n        if (s2.empty()) {\n            while (!s1.empty()) {\n                s2.push(s1.top());\n                s1.pop();\n            }\n        }\n    }\npublic:\n    void push(T x) { s1.push(x); }\n    T pop() {\n        transfer();\n        if (s2.empty()) throw std::runtime_error(\"Queue empty\");\n        T val = s2.top();\n        s2.pop();\n        return val;\n    }\n};",
    tags: ["代码实现", "C++"],
  },
  {
    id: "coi-qwts-9",
    chapter: "coi-queue-with-two-stacks",
    level: 4,
    question: "如果使用两个队列来实现一个栈（Stack with Two Queues），其 Push 和 Pop 均摊时间复杂度可以像双栈队列那样达到双 O(1) 吗？为什么？",
    answer:
      "不能。因为队列是先进先出（FIFO）结构，两个队列无法通过一次倒腾就改变内部元素的相对顺序并长久保持。为了让最后进入的元素被弹出，每次 Pop 时都必须将一个队列中的 N-1 个元素转移到另一个队列中以取出队尾元素。因此，无论如何设计，其 Push 或 Pop 中必有一个操作的均摊时间复杂度为 O(N)。",
    tags: ["双队列实现栈", "复杂度极限"],
  },
  {
    id: "coi-qwts-10",
    chapter: "coi-queue-with-two-stacks",
    level: 4,
    question: "从系统设计和并发安全的角度来看，双栈模拟队列相比于传统的单链表队列有什么潜在优势？",
    answer:
      "双栈结构天然解耦了『入队』与『出队』两个写操作的数据竞争。入队线程只需锁住 Stack 1 即可，出队线程只需锁住 Stack 2。这种『读写锁分离』的设计在大规模多线程并发场景下能显著降低锁冲突，只有在 Stack 2 为空需要从 Stack 1 转移数据时，才需要同时锁住两个栈进行同步操作。",
    tags: ["并发安全", "系统设计"],
  },
];
