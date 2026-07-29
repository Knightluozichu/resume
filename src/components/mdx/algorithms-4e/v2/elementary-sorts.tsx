"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-2.1",
  title: "2.1 · Elementary Sorts",
  focus: "用选择、插入和希尔排序的交换轨迹解释局部有序度、成本与适用输入",
  formula: "选择排序比较约 N^2/2 次；插入排序交换数等于输入逆序对数",
  invariant:
    "每轮结束后声明的前缀、后缀或 h-子序列必须有序，元素多重集保持不变",
  fault:
    "插入时把比较边界写成 j > 0 却读取 a[j-1] 之外的位置，或遗漏最后一个 h=1",
  evidence:
    "原数组、h 序列、比较/交换计数、每轮数组快照、稳定性标签与排序预言机",
  concepts: [
    "elementary sorts",
    "初级排序",
    "selection sort",
    "选择排序",
    "insertion sort",
    "插入排序",
    "sorting visualization",
    "排序可视化",
    "Shellsort",
    "希尔排序",
  ],
  trace: [
    "选择算法与 h",
    "定位局部逆序",
    "移动或交换元素",
    "扩大有序区域",
    "核对全序和多重集",
  ],
  scenarios: [
    {
      label: "近乎有序",
      input: "[1, 2, 4, 3, 5] 上比较选择排序与插入排序",
      expected: "插入排序只修复少量逆序，选择排序仍完成固定数量比较",
    },
    {
      label: "希尔间隔",
      input: "先做 h=4、h=1 两轮 h-sort",
      expected: "每轮保持 h-有序，最后 h=1 才得到全序",
    },
  ],
} satisfies Algs4SectionModel;

export function ElementarySortsModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function ElementarySortsTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function ElementarySortsCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
