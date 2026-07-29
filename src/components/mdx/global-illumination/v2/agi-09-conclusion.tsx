"use client";

import {
  OfficialAgiLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-agi-lab";

const unitTitle = "Conclusion";
const nodes = [
  {
    label: "photorealistic rendering achievements",
    unit: "Conclusion",
    mechanism:
      "photorealistic rendering achievements 包括统一传输理论与大量可行算法，unresolved issues 仍涉及复杂材料、动态场景、感知评价与计算成本。结论页应把已解决、工程近似和开放问题分栏，而不是宣布单一算法胜出。",
    probe: "算法假设、基准场景、误差、资源开销和未覆盖现象",
  },
  {
    label: "unresolved issues",
    unit: "Conclusion",
    mechanism:
      "photorealistic rendering achievements 包括统一传输理论与大量可行算法，unresolved issues 仍涉及复杂材料、动态场景、感知评价与计算成本。结论页应把已解决、工程近似和开放问题分栏，而不是宣布单一算法胜出。",
    probe: "算法假设、基准场景、误差、资源开销和未覆盖现象",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "总结真实感渲染成就并明确仍未解决的问题",
  formula: "d=(error,variance,cost)",
  invariant: "Conclusion的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "用一个场景的主观效果外推普遍结论，或隐藏失败样本",
  evidence: "算法假设、基准场景、误差、资源开销和未覆盖现象",
  sourceLabel:
    "Philip Dutré、Kavita Bala、Philippe Bekaert《Advanced Global Illumination》第二版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Agi09ConclusionTransportLab() {
  return <OfficialAgiLab mode="transport" {...props} />;
}

export function Agi09ConclusionEstimatorLab() {
  return <OfficialAgiLab mode="estimator" {...props} />;
}

export function Agi09ConclusionEvidenceLab() {
  return <OfficialAgiLab mode="evidence" {...props} />;
}
