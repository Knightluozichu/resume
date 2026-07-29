"use client";

import {
  OfficialAlgorithmEngineeringLab,
  type AlgorithmEngineeringModel,
} from "./official-algorithm-engineering-lab";

const model = {
  title: "15 Compressed Data Structures",
  focus: "在压缩空间内支持 bitvector、树和图的导航与查询",
  formula: "rank1(select1(j)) = j",
  invariant: "压缩表示、rank/select 与朴素结构回答相同，并单独报告辅助索引空间",
  fault: "混用 0/1 起始下标或闭开区间，令 rank/select 的互逆关系偏移一位",
  evidence: "原始结构、压缩位串、辅助表、查询序列、空间位数与朴素预言机",
  stages: [
    "Compressed Representation of (Binary) Arrays",
    "Succinct Representation of Trees",
    "Succinct Representation of Graphs",
  ],
} satisfies AlgorithmEngineeringModel;

export function CompressedDataStructuresCostLab() {
  return <OfficialAlgorithmEngineeringLab mode="cost" model={model} />;
}

export function CompressedDataStructuresTraceLab() {
  return <OfficialAlgorithmEngineeringLab mode="trace" model={model} />;
}

export function CompressedDataStructuresEvidenceLab() {
  return <OfficialAlgorithmEngineeringLab mode="evidence" model={model} />;
}
