"use client";

import {
  OfficialAlgorithmEngineeringLab,
  type AlgorithmEngineeringModel,
} from "./official-algorithm-engineering-lab";

const model = {
  title: "1 Introduction",
  focus: "把 RAM 步数、存储层次与块传输放进同一成本判断",
  formula: "Scan(N) = ceil(N / B)",
  invariant: "相同输入与结果必须同时报告 CPU 工作量、传输次数和访问局部性",
  fault: "把每次内存访问都当作相同成本，掩盖随机 I/O 与顺序扫描的差异",
  evidence: "输入规模、M/B、访问序列、块传输计数、运行时间与结果校验",
  stages: ["问题合同", "成本模型", "实现", "实验", "复核"],
} satisfies AlgorithmEngineeringModel;

export function IntroductionCostLab() {
  return <OfficialAlgorithmEngineeringLab mode="cost" model={model} />;
}

export function IntroductionTraceLab() {
  return <OfficialAlgorithmEngineeringLab mode="trace" model={model} />;
}

export function IntroductionEvidenceLab() {
  return <OfficialAlgorithmEngineeringLab mode="evidence" model={model} />;
}
