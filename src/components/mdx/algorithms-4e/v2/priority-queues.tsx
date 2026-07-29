"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-2.4",
  title: "2.4 · Priority Queues",
  focus: "以二叉堆的形状和次序不变量连接动态极值、上浮下沉与堆排序",
  formula:
    "parent(k)=floor(k/2)，children(k)=2k,2k+1；插入与删除最大值均为 O(log N)",
  invariant: "对每个 k>1 都有 heap[parent(k)]≥heap[k]，有效元素仅位于 1..N",
  fault: "sink 时仍访问已经缩短后的 N+1 槽位，或在两个孩子中选择较小者交换",
  evidence: "heap 数组、N、父子索引、比较/交换轨迹、删除序列与最大值预言机",
  concepts: [
    "priority queues",
    "优先队列",
    "priority queue API",
    "优先队列API",
    "elementary implementations",
    "初级实现",
    "binary heap",
    "二叉堆",
    "heap operations",
    "堆操作",
    "heapsort",
    "堆排序",
  ],
  trace: [
    "把新键放到末尾",
    "沿父链上浮",
    "交换根与末项",
    "沿较大孩子下沉",
    "核对堆序与输出",
  ],
  scenarios: [
    {
      label: "插入极值",
      input: "向 [9,7,8,2,3] 依次插入 10",
      expected: "10 沿父链上浮到根，完全树形状不变",
    },
    {
      label: "删除根",
      input: "删除最大值后让末项补到根",
      expected: "N 先减一，再只在有效堆范围内沿较大孩子下沉",
    },
  ],
} satisfies Algs4SectionModel;

export function PriorityQueuesModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function PriorityQueuesTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function PriorityQueuesCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
