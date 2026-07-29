"use client";

import {
  OfficialAlgorithmEngineeringLab,
  type AlgorithmEngineeringModel,
} from "./official-algorithm-engineering-lab";

const model = {
  title: "5 Sorting Atomic Items",
  focus: "比较归并、分布式排序、下界与多磁盘 I/O 组织",
  formula: "Sort(N) = Theta((N/B) log_(M/B)(N/B))",
  invariant: "输出全序、元素多重集不变，且每轮归并的输入缓冲与输出缓冲不超 M",
  fault: "归并扇入超过可用缓冲页，模型声称的顺序 I/O 在实现中退化为抖动",
  evidence: "初始 runs、扇入、M/B、比较数、块读写、校验和与排序预言机",
  stages: [
    "The Merge-Based Sorting Paradigm",
    "Lower Bounds",
    "The Distribution-Based Sorting Paradigm",
    "Sorting With Multi-Disks∞",
  ],
} satisfies AlgorithmEngineeringModel;

export function SortingAtomicItemsCostLab() {
  return <OfficialAlgorithmEngineeringLab mode="cost" model={model} />;
}

export function SortingAtomicItemsTraceLab() {
  return <OfficialAlgorithmEngineeringLab mode="trace" model={model} />;
}

export function SortingAtomicItemsEvidenceLab() {
  return <OfficialAlgorithmEngineeringLab mode="evidence" model={model} />;
}
