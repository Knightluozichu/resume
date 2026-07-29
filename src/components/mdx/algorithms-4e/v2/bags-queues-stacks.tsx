"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-1.3",
  title: "1.3 · Bags, Queues, and Stacks",
  focus: "从访问顺序、迭代合同与表示成本选择背包、队列、栈及其数组或链表实现",
  formula: "动态数组扩容采用 2N、缩容采用 N/2 且低水位为 1/4，可得摊还常数操作",
  invariant: "栈保持后进先出，队列保持先进先出，背包迭代不承诺删除或特定顺序",
  fault: "出队后不清除失效引用造成对象游离，或在 1/2 负载时反复扩缩产生抖动",
  evidence: "操作序列、头尾索引、容量、元素次序、失效引用与摊还复制次数",
  concepts: [
    "bags, queues, and stacks",
    "背包、队列与栈",
    "collection APIs",
    "集合API",
    "resizing arrays",
    "动态调整数组",
    "linked lists",
    "链表",
    "iteration",
    "迭代",
  ],
  trace: [
    "选择访问合同",
    "执行插入操作",
    "触发扩容或链接",
    "执行删除操作",
    "核对迭代次序",
  ],
  scenarios: [
    {
      label: "括号匹配",
      input: "依次读取 [ ( ) ] 并在遇到右括号时弹栈",
      expected: "栈顶必须是最近尚未配对的左括号",
    },
    {
      label: "广度队列",
      input: "按 A、B、C 入队，再连续出队",
      expected: "输出 A、B、C，并在移除后清理槽位引用",
    },
  ],
} satisfies Algs4SectionModel;

export function BagsQueuesStacksModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function BagsQueuesStacksTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function BagsQueuesStacksCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
