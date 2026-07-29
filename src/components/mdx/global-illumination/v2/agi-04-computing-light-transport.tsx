"use client";

import {
  OfficialAgiLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-agi-lab";

const unitTitle = "Strategies for Computing Light Transport";
const nodes = [
  {
    label: "importance function",
    unit: "Strategies for Computing Light Transport",
    mechanism:
      "importance function 衡量路径对传感器的潜在贡献，adjoint equation 连接光源传播与观察者重要性，path formulation 把多次散射展开为不同长度路径的积分。策略选择决定样本从光源、相机还是两端生成。",
    probe: "路径顶点、生成策略、正反向PDF和测度转换",
  },
  {
    label: "adjoint equation",
    unit: "Strategies for Computing Light Transport",
    mechanism:
      "importance function 衡量路径对传感器的潜在贡献，adjoint equation 连接光源传播与观察者重要性，path formulation 把多次散射展开为不同长度路径的积分。策略选择决定样本从光源、相机还是两端生成。",
    probe: "路径顶点、生成策略、正反向PDF和测度转换",
  },
  {
    label: "path formulation",
    unit: "Strategies for Computing Light Transport",
    mechanism:
      "importance function 衡量路径对传感器的潜在贡献，adjoint equation 连接光源传播与观察者重要性，path formulation 把多次散射展开为不同长度路径的积分。策略选择决定样本从光源、相机还是两端生成。",
    probe: "路径顶点、生成策略、正反向PDF和测度转换",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "从重要性、伴随与路径空间选择光传输求解方向",
  formula:
    "I=\\sum_{k=1}^{\\infty}\\int_{\\mathcal P_k}f_k(\\bar x)d\\mu(\\bar x)",
  invariant:
    "Strategies for Computing Light Transport的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "混合多个策略却遗漏概率密度，或将路径方向约定前后颠倒",
  evidence: "路径顶点、生成策略、正反向PDF和测度转换",
  sourceLabel:
    "Philip Dutré、Kavita Bala、Philippe Bekaert《Advanced Global Illumination》第二版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Agi04ComputingLightTransportTransportLab() {
  return <OfficialAgiLab mode="transport" {...props} />;
}

export function Agi04ComputingLightTransportEstimatorLab() {
  return <OfficialAgiLab mode="estimator" {...props} />;
}

export function Agi04ComputingLightTransportEvidenceLab() {
  return <OfficialAgiLab mode="evidence" {...props} />;
}
