"use client";

import {
  OfficialAlgorithmEngineeringLab,
  type AlgorithmEngineeringModel,
} from "./official-algorithm-engineering-lab";

const model = {
  title: "7 Sorting Strings",
  focus: "用区分前缀、基数分桶与多关键字快速排序减少字符检查",
  formula: "character work = Theta(D + n log n)",
  invariant: "输出按声明字符序全序排列，公共前缀只在必要的递归层重新读取",
  fault: "终止符、字符编码或稳定性约定不一致，前缀串与长串次序被颠倒",
  evidence: "字符串集合、区分前缀 D、字符探测、桶边界、递归轨迹与排序预言机",
  stages: [
    "A Lower Bound",
    "RADIXSORT",
    "Multi-key QUICKSORT",
    "Some Observations on the Two-Level Memory Model∞",
  ],
} satisfies AlgorithmEngineeringModel;

export function SortingStringsCostLab() {
  return <OfficialAlgorithmEngineeringLab mode="cost" model={model} />;
}

export function SortingStringsTraceLab() {
  return <OfficialAlgorithmEngineeringLab mode="trace" model={model} />;
}

export function SortingStringsEvidenceLab() {
  return <OfficialAlgorithmEngineeringLab mode="evidence" model={model} />;
}
