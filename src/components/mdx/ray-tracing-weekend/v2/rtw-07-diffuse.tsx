"use client";

import {
  OfficialRtwLab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-rtw-lab";

const unitTitle = "Diffuse Materials";
const nodes = [
  {
    label: "漫反射",
    unit: "Diffuse Materials",
    mechanism:
      "漫反射材质从交点生成新方向；兰伯特模型让出射分布带余弦权重；随机单位向量提供一种易实现的采样构造。若散射方向接近零向量，需要回退到表面法线。",
    probe: "散射方向半球性、衰减颜色、递归返回和固定种子图像",
  },
  {
    label: "兰伯特",
    unit: "Diffuse Materials",
    mechanism:
      "漫反射材质从交点生成新方向；兰伯特模型让出射分布带余弦权重；随机单位向量提供一种易实现的采样构造。若散射方向接近零向量，需要回退到表面法线。",
    probe: "散射方向半球性、衰减颜色、递归返回和固定种子图像",
  },
  {
    label: "随机单位向量",
    unit: "Diffuse Materials",
    mechanism:
      "漫反射材质从交点生成新方向；兰伯特模型让出射分布带余弦权重；随机单位向量提供一种易实现的采样构造。若散射方向接近零向量，需要回退到表面法线。",
    probe: "散射方向半球性、衰减颜色、递归返回和固定种子图像",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus: "用随机散射近似漫反射的间接光",
  formula: "f_r=\\frac{\\rho}{\\pi},\\qquad \\omega_o=n+u_{sphere}",
  invariant:
    "Diffuse Materials的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault: "把随机方向当成能量本身，或不处理接近零的散射向量",
  evidence: "散射方向半球性、衰减颜色、递归返回和固定种子图像",
  sourceLabel:
    "Peter Shirley、Trevor David Black、Steve Hollasch《Ray Tracing in One Weekend》4.0.2",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Rtw07DiffuseGeometryLab() {
  return <OfficialRtwLab mode="geometry" {...props} />;
}

export function Rtw07DiffuseSamplingLab() {
  return <OfficialRtwLab mode="sampling" {...props} />;
}

export function Rtw07DiffuseEvidenceLab() {
  return <OfficialRtwLab mode="evidence" {...props} />;
}
