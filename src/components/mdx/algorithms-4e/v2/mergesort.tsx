"use client";

import { Algs4SectionLab, type Algs4SectionModel } from "./official-algs4-lab";

const model = {
  unitId: "algs4-2.2",
  title: "2.2 · Mergesort",
  focus: "从稳定归并合同推导自顶向下和自底向上的调度、比较界与辅助空间",
  formula: "T(N) = 2T(N/2) + Θ(N) = Θ(N log N)",
  invariant: "归并前左右半区分别有序；归并后区间有序、稳定且元素多重集不变",
  fault:
    "未先复制辅助数组就覆盖尚未读取的左半区，或相等键时优先取右侧破坏稳定性",
  evidence: "lo/mid/hi、aux 快照、左右游标、比较次数、原始序号与全排序预言机",
  concepts: [
    "mergesort",
    "归并排序",
    "abstract in-place merge",
    "抽象原地归并",
    "top-down mergesort",
    "自顶向下归并排序",
    "bottom-up mergesort",
    "自底向上归并排序",
    "mergesort improvements",
    "归并排序改进",
  ],
  trace: [
    "划分有序子段",
    "复制到辅助区",
    "比较两侧首项",
    "写回目标区间",
    "核对稳定全序",
  ],
  scenarios: [
    {
      label: "稳定归并",
      input: "归并 [(2,a),(4,a)] 与 [(2,b),(3,b)]",
      expected: "相等键先取左侧，原始相对次序 a 在 b 前",
    },
    {
      label: "调度对照",
      input: "N=7 时对照递归划分与 1、2、4 长度的自底向上归并",
      expected: "调度不同，但每次都只合并两个已排序区间",
    },
  ],
} satisfies Algs4SectionModel;

export function MergesortModelLab() {
  return <Algs4SectionLab model={model} view="model" />;
}

export function MergesortTraceLab() {
  return <Algs4SectionLab model={model} view="trace" />;
}

export function MergesortCounterexampleLab() {
  return <Algs4SectionLab model={model} view="counterexample" />;
}
