"use client";

import {
  OfficialAlgorithmEngineeringLab,
  type AlgorithmEngineeringModel,
} from "./official-algorithm-engineering-lab";

const model = {
  title: "16 Conclusion",
  focus: "把模型、算法、实现、实验与可证伪结论闭合为算法工程循环",
  formula: "T_total = T_cpu + Q * L_io + C_build",
  invariant: "选择理由必须绑定工作负载、机器、成本模型、正确性与可重复基准",
  fault: "只优化单次吞吐或平均值，却改变输入分布、预处理成本或结果语义",
  evidence: "版本、数据集、机器、参数、成本预测、基准分布、残差与恢复记录",
  stages: ["问题合同", "成本模型", "实现", "实验", "复核"],
} satisfies AlgorithmEngineeringModel;

export function ConclusionCostLab() {
  return <OfficialAlgorithmEngineeringLab mode="cost" model={model} />;
}

export function ConclusionTraceLab() {
  return <OfficialAlgorithmEngineeringLab mode="trace" model={model} />;
}

export function ConclusionEvidenceLab() {
  return <OfficialAlgorithmEngineeringLab mode="evidence" model={model} />;
}
