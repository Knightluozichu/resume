"use client";

import {
  OfficialAgiLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-agi-lab";

const unitTitle = "Introduction";
const nodes = [
  {
    label: "realistic image synthesis",
    unit: "Introduction",
    mechanism:
      "realistic image synthesis 追求物理与感知上可信的图像，global illumination framework 则把发射、散射、可见性、传感器和数值算法放进统一结构。章节先定义问题边界，再比较算法，而不是从某张漂亮结果图反推正确性。",
    probe: "场景、光源、材料、传感器、参考图和误差定义",
  },
  {
    label: "global illumination framework",
    unit: "Introduction",
    mechanism:
      "realistic image synthesis 追求物理与感知上可信的图像，global illumination framework 则把发射、散射、可见性、传感器和数值算法放进统一结构。章节先定义问题边界，再比较算法，而不是从某张漂亮结果图反推正确性。",
    probe: "场景、光源、材料、传感器、参考图和误差定义",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "把真实感图像合成表述成可比较的光传输问题",
  formula: "I=M(T(S))",
  invariant: "Introduction的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "把视觉逼真等同于物理准确，或不声明场景与传感器模型",
  evidence: "场景、光源、材料、传感器、参考图和误差定义",
  sourceLabel:
    "Philip Dutré、Kavita Bala、Philippe Bekaert《Advanced Global Illumination》第二版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Agi01IntroductionTransportLab() {
  return <OfficialAgiLab mode="transport" {...props} />;
}

export function Agi01IntroductionEstimatorLab() {
  return <OfficialAgiLab mode="estimator" {...props} />;
}

export function Agi01IntroductionEvidenceLab() {
  return <OfficialAgiLab mode="evidence" {...props} />;
}
