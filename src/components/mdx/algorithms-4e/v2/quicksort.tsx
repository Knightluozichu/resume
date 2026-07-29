"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-2.3",
  title: "2.3 · Quicksort",
  focus: "用随机打乱、切分不变量和三向切分解释快速排序的平均性能与重复键边界",
  formula: "随机排列下比较次数约 2N ln N；三向切分把等值区一次固定",
  invariant: "切分结束时 a[lo..j-1]≤v、a[j]=v、a[j+1..hi]≥v，元素多重集不变",
  fault: "省略随机打乱却固定取首元素为 pivot，使已有序输入递归深度达到 N",
  evidence:
    "随机种子、lo/i/j/hi、pivot、交换轨迹、递归深度、比较数与排序预言机",
  concepts: [
    "quicksort",
    "快速排序",
    "partitioning",
    "切分",
    "random shuffling",
    "随机打乱",
    "performance characteristics",
    "性能特征",
    "three-way quicksort",
    "三向切分快速排序",
    "entropy-optimal sorting",
    "熵最优排序",
  ],
  trace: [
    "随机打乱输入",
    "选择切分元素",
    "推进左右指针",
    "固定切分位置",
    "递归并核对结果",
  ],
  scenarios: [
    {
      label: "有序输入",
      input: "[1,2,3,4,5] 固定首元素切分，再与随机打乱比较",
      expected: "未打乱时产生极不平衡子问题，随机化恢复期望对数深度",
    },
    {
      label: "大量重复",
      input: "[A,B,A,A,C,A] 使用二向与三向切分",
      expected: "三向切分一次跳过等于 pivot 的整段",
    },
  ],
} satisfies Algs4SectionModel;

export function QuicksortModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function QuicksortTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function QuicksortCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
