import type { ReviewQuestion } from "./types";

export const coiMinStackQuestions: ReviewQuestion[] = [
  {
    id: "coi-min-stack-1",
    chapter: "coi-min-stack",
    level: 1,
    question: `包含 min 函数的栈为什么不能只靠普通栈直接实现 O(1) 的 min()？`,
    answer:
      `普通栈只知道栈顶元素，无法直接知道所有元素中的最小值。如果不维护额外信息，每次 min() 都必须扫描当前栈内全部元素，时间复杂度是 O(N)。要做到 O(1)，必须在入栈和出栈过程中同步保存当前最小值状态。`,
    tags: ["问题动机", "复杂度"],
  },
  {
    id: "coi-min-stack-2",
    chapter: "coi-min-stack",
    level: 1,
    question: `等长辅助最小栈方案中，dataStack 和 minStack 分别保存什么？`,
    answer:
      `dataStack 保存真实入栈数据；minStack 与 dataStack 等长，minStack 的第 i 层保存 dataStack[0..i] 这段前缀中的最小值。这样 minStack 栈顶始终就是当前整个数据栈的最小值。`,
    tags: ["辅助栈", "状态快照"],
  },
  {
    id: "coi-min-stack-3",
    chapter: "coi-min-stack",
    level: 2,
    question: `push(x) 时，minStack 应该压入什么值？`,
    answer:
      `如果 minStack 为空，就压入 x；否则压入 Math.min(x, minStack.top())。这个值表示新元素入栈后，当前整个栈的最新最小值快照。`,
    tags: ["push", "不变式"],
  },
  {
    id: "coi-min-stack-4",
    chapter: "coi-min-stack",
    level: 2,
    question: `pop() 时为什么 dataStack 和 minStack 必须同步弹出？`,
    answer:
      `因为 minStack 的每一层都对应 dataStack 同一层状态下的最小值快照。数据栈弹出一层后，当前状态也回退到上一层；如果最小栈不弹出，就会保留已经不存在的元素对应的最小值，导致 min() 返回错误。`,
    tags: ["pop", "同步更新"],
  },
  {
    id: "coi-min-stack-5",
    chapter: "coi-min-stack",
    level: 2,
    question: `重复最小值为什么是这道题的重要边界？`,
    answer:
      `如果栈中有两个相同最小值，比如 2 和 2，弹出其中一个后当前最小值仍然应该是 2。压缩版最小栈如果只在 x < currentMin 时入栈，就会漏掉重复最小值。正确做法是使用等长快照方案，或在压缩版里用 x <= currentMin 入栈。`,
    tags: ["重复值", "边界条件"],
  },
  {
    id: "coi-min-stack-6",
    chapter: "coi-min-stack",
    level: 3,
    question: `请写出 TypeScript 版 push 和 min 的核心实现。`,
    answer:
      `push(value: number) {\n  this.dataStack.push(value);\n  const currentMin = this.minStack.length === 0\n    ? value\n    : Math.min(value, this.minStack[this.minStack.length - 1]);\n  this.minStack.push(currentMin);\n}\n\nmin(): number {\n  if (this.minStack.length === 0) throw new Error('stack is empty');\n  return this.minStack[this.minStack.length - 1];\n}`,
    tags: ["TypeScript", "实现"],
  },
  {
    id: "coi-min-stack-7",
    chapter: "coi-min-stack",
    level: 3,
    question: `如何用不变式证明 min() 返回正确？`,
    answer:
      `不变式是：任意时刻，minStack[i] 等于 dataStack[0..i] 中的最小值。初始空栈成立；push(x) 时压入 min(x, oldMin)，所以新层成立，旧层不变；pop() 时两个栈同步弹出，剩余层仍然保持原来的快照。因此 minStack.top() 总是当前数据栈的最小值。`,
    tags: ["正确性证明", "不变式"],
  },
  {
    id: "coi-min-stack-8",
    chapter: "coi-min-stack",
    level: 4,
    question: `等长最小栈和压缩最小栈有什么取舍？`,
    answer:
      `等长最小栈实现简单，pop 不需要比较，重复最小值天然正确，但额外空间固定为 O(N)。压缩最小栈只在新值不大于当前最小值时保存，空间可能更省，但 pop 时必须判断弹出值是否等于当前最小值，并且要用 <= 处理重复值。两者时间复杂度都能做到 O(1)。`,
    tags: ["方案对比", "空间优化"],
  },
];
