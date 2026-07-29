"use client";

import {
  OfficialAgiLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-agi-lab";

const unitTitle = "A Class Library for Global Illumination";
const nodes = [
  {
    label: "path node classes",
    unit: "A Class Library for Global Illumination",
    mechanism:
      "path node classes 保存路径顶点的几何与概率状态，light source sampling classes 封装光源生成策略，global illumination api 负责场景、积分器和输出的稳定边界。接口必须携带PDF与测度，不能只返回方向。",
    probe: "类型合同、正反向PDF、所有权、序列化和最小场景测试",
  },
  {
    label: "light source sampling classes",
    unit: "A Class Library for Global Illumination",
    mechanism:
      "path node classes 保存路径顶点的几何与概率状态，light source sampling classes 封装光源生成策略，global illumination api 负责场景、积分器和输出的稳定边界。接口必须携带PDF与测度，不能只返回方向。",
    probe: "类型合同、正反向PDF、所有权、序列化和最小场景测试",
  },
  {
    label: "global illumination api",
    unit: "A Class Library for Global Illumination",
    mechanism:
      "path node classes 保存路径顶点的几何与概率状态，light source sampling classes 封装光源生成策略，global illumination api 负责场景、积分器和输出的稳定边界。接口必须携带PDF与测度，不能只返回方向。",
    probe: "类型合同、正反向PDF、所有权、序列化和最小场景测试",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "用类型与接口把路径、采样器和传感器组合成可扩展渲染器",
  formula: "PathNode=(x,n,\\omega,\\beta,p_f,p_r,event)",
  invariant:
    "A Class Library for Global Illumination的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "类层次隐藏路径概率，或对象生命周期使缓存引用失效",
  evidence: "类型合同、正反向PDF、所有权、序列化和最小场景测试",
  sourceLabel:
    "Philip Dutré、Kavita Bala、Philippe Bekaert《Advanced Global Illumination》第二版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function AgiAClassLibraryTransportLab() {
  return <OfficialAgiLab mode="transport" {...props} />;
}

export function AgiAClassLibraryEstimatorLab() {
  return <OfficialAgiLab mode="estimator" {...props} />;
}

export function AgiAClassLibraryEvidenceLab() {
  return <OfficialAgiLab mode="evidence" {...props} />;
}
