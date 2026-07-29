"use client";

import {
  OfficialCg4Lab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-cg4-lab";

const unitTitle = "Computer Animation × Algorithmic Modeling";
const nodes = [
  {
    label: "computer animation",
    unit: "Computer Animation",
    mechanism:
      "computer animation 把对象状态放到时间轴上，keyframe 定义稀疏控制点，中间帧由插值或动力学产生。位置可线性插值，但旋转通常需要避免欧拉角跳变。",
    probe: "时间戳、关键帧区间、插值参数和循环边界",
  },
  {
    label: "keyframe",
    unit: "Computer Animation",
    mechanism:
      "computer animation 把对象状态放到时间轴上，keyframe 定义稀疏控制点，中间帧由插值或动力学产生。位置可线性插值，但旋转通常需要避免欧拉角跳变。",
    probe: "时间戳、关键帧区间、插值参数和循环边界",
  },
  {
    label: "algorithmic modeling",
    unit: "Algorithmic Modeling",
    mechanism:
      "algorithmic modeling 通过递归、文法或噪声构造形状，fractal 用尺度自相似产生复杂细节。生成器必须暴露随机种子、终止条件和几何预算，否则无法复现或控制复杂度。",
    probe: "规则、深度、分支因子、随机种子和输出包围盒",
  },
  {
    label: "fractal",
    unit: "Algorithmic Modeling",
    mechanism:
      "algorithmic modeling 通过递归、文法或噪声构造形状，fractal 用尺度自相似产生复杂细节。生成器必须暴露随机种子、终止条件和几何预算，否则无法复现或控制复杂度。",
    probe: "规则、深度、分支因子、随机种子和输出包围盒",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus:
    "从关键状态插值出连续运动并保持时间一致性，并用规则和参数生成可重复的复杂几何",
  formula:
    "x(t)=(1-u)x_k+u x_{k+1},\\qquad u=\\frac{t-t_k}{t_{k+1}-t_k} ; N_d=b^d,\\qquad L_{detail}=L_0s^d",
  invariant:
    "Computer Animation的输入、公式中间量、输出与恢复结果可用同一基线复算，且Algorithmic Modeling的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault:
    "按帧数而非时间推进，或跨越角度分支造成突然翻转；递归无终止条件，或每次编辑都隐式更换随机种子",
  evidence:
    "时间戳、关键帧区间、插值参数和循环边界、规则、深度、分支因子、随机种子和输出包围盒",
  sourceLabel:
    "Donald Hearn、M. Pauline Baker、Warren Carithers《Computer Graphics with OpenGL》第4版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Cg412AnimationModelingPipelineLab() {
  return <OfficialCg4Lab mode="pipeline" {...props} />;
}

export function Cg412AnimationModelingAlgorithmLab() {
  return <OfficialCg4Lab mode="algorithm" {...props} />;
}

export function Cg412AnimationModelingEvidenceLab() {
  return <OfficialCg4Lab mode="evidence" {...props} />;
}
