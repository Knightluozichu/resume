"use client";

import {
  OfficialAlgorithmEngineeringLab,
  type AlgorithmEngineeringModel,
} from "./official-algorithm-engineering-lab";

const model = {
  title: "8 The Dictionary Problem",
  focus: "比较直接寻址、通用/完美哈希、布谷鸟哈希与布隆过滤器的保证",
  formula: "Bloom FPR ≈ (1 - exp(-k n / m))^k",
  invariant: "已插入键不能假阴性；误报、空间与更新保证必须与所选结构一致",
  fault: "复用相关哈希或超过设计负载仍声称常数最坏时间与目标误报率",
  evidence: "键集、哈希种子、负载因子、逐出路径、位图占用、误报率与真值表",
  stages: [
    "Direct-Address Tables",
    "Hash Tables",
    "Universal Hashing",
    "A Simple (Static) Perfect Hash Table",
    "Cuckoo Hashing",
    "More on Static and Perfect Hashing: Minimal and Ordered",
    "Bloom Filters",
  ],
} satisfies AlgorithmEngineeringModel;

export function DictionaryProblemCostLab() {
  return <OfficialAlgorithmEngineeringLab mode="cost" model={model} />;
}

export function DictionaryProblemTraceLab() {
  return <OfficialAlgorithmEngineeringLab mode="trace" model={model} />;
}

export function DictionaryProblemEvidenceLab() {
  return <OfficialAlgorithmEngineeringLab mode="evidence" model={model} />;
}
