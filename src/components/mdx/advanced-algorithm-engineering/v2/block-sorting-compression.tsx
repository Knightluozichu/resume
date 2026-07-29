"use client";

import {
  OfficialAlgorithmEngineeringLab,
  type AlgorithmEngineeringModel,
} from "./official-algorithm-engineering-lab";

const model = {
  title: "14 Block-Sorting Compression",
  focus: "跟踪 BWT、MTF、RLE 与熵编码如何逐层改变局部统计",
  formula: "LF(i) = C[L[i]] + Occ(L[i], i)",
  invariant: "变换携带足够的 primary/sentinel 信息并能逐字节逆变换",
  fault: "丢失 primary index 或对相同字符使用不稳定次序，使 LF 环无法闭合",
  evidence: "旋转/后缀次序、L 列、primary、Occ、MTF/RLE 流与逆变换结果",
  stages: [
    "The Burrows–Wheeler Transform",
    "Two Other Simple Transforms",
    "The bzip Compressor",
    "On Compression Boosting∞",
    "On Compressed Indexing∞",
  ],
} satisfies AlgorithmEngineeringModel;

export function BlockSortingCompressionCostLab() {
  return <OfficialAlgorithmEngineeringLab mode="cost" model={model} />;
}

export function BlockSortingCompressionTraceLab() {
  return <OfficialAlgorithmEngineeringLab mode="trace" model={model} />;
}

export function BlockSortingCompressionEvidenceLab() {
  return <OfficialAlgorithmEngineeringLab mode="evidence" model={model} />;
}
