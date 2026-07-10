import type { ReviewQuestion } from "./types";

export const coiStackPushPopOrderQuestions: ReviewQuestion[] = [
  {
    id: "coi-stack-push-pop-order-1",
    chapter: "coi-stack-push-pop-order",
    level: 1,
    question: `判断栈的弹出序列是否合法，核心模拟思路是什么？`,
    answer:
      `按压入序列依次把元素压入辅助栈。每次压入后，只要辅助栈栈顶等于弹出序列中下一个待弹出的值，就持续弹出并移动弹出指针。所有压入结束后，如果辅助栈为空且弹出指针走完，序列就是合法的。`,
    tags: ["辅助栈", "模拟"],
  },
  {
    id: "coi-stack-push-pop-order-2",
    chapter: "coi-stack-push-pop-order",
    level: 2,
    question: `为什么栈顶等于下一个目标弹出值时，可以立刻弹出？`,
    answer:
      `因为栈只能弹出栈顶。当前栈顶已经等于目标弹出值，如果不弹出，后续压入的新元素只会盖在它上面，让它更晚弹出，不会创造新的合法可能。因此立刻弹出是安全的贪心选择。`,
    tags: ["贪心", "正确性"],
  },
  {
    id: "coi-stack-push-pop-order-3",
    chapter: "coi-stack-push-pop-order",
    level: 2,
    question: `为什么只比较 pushed 和 popped 的元素集合不够？`,
    answer:
      `元素集合相同只是必要条件。栈有后进先出的结构约束，比如 pushed=[1,2,3,4,5]，popped=[4,3,5,1,2] 虽然元素相同，但 1 在 2 之前弹出时 2 会压在 1 上方，违反栈顶弹出规则。`,
    tags: ["反例", "栈约束"],
  },
  {
    id: "coi-stack-push-pop-order-4",
    chapter: "coi-stack-push-pop-order",
    level: 3,
    question: `请写出 TypeScript 主流程。`,
    answer:
      `function validateStackSequences(pushed: number[], popped: number[]): boolean {\n  if (pushed.length !== popped.length) return false;\n  const stack: number[] = [];\n  let j = 0;\n  for (const value of pushed) {\n    stack.push(value);\n    while (stack.length && stack[stack.length - 1] === popped[j]) {\n      stack.pop();\n      j++;\n    }\n  }\n  return stack.length === 0 && j === popped.length;\n}`,
    tags: ["TypeScript", "实现"],
  },
  {
    id: "coi-stack-push-pop-order-5",
    chapter: "coi-stack-push-pop-order",
    level: 4,
    question: `这个模拟算法的复杂度是多少？`,
    answer:
      `时间复杂度是 O(N)，因为每个元素最多入辅助栈一次、出辅助栈一次。空间复杂度是 O(N)，最坏情况下所有元素都压入辅助栈后才开始弹出。`,
    tags: ["复杂度", "摊还分析"],
  },
];
