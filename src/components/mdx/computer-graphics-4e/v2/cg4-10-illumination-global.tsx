"use client";

import {
  OfficialCg4Lab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-cg4-lab";

const unitTitle =
  "Illumination Models and Surface-Rendering Methods × Global Illumination";
const nodes = [
  {
    label: "illumination model",
    unit: "Illumination Models and Surface-Rendering Methods",
    mechanism:
      "illumination model 把环境、漫反射与高光等局部项组合，surface rendering 决定法线、材质和光源在何处求值。Gouraud插值颜色，Phong插值法线，二者对小高光的保真度不同。",
    probe: "法线、光向量、视向量、各光照项和插值位置",
  },
  {
    label: "surface rendering",
    unit: "Illumination Models and Surface-Rendering Methods",
    mechanism:
      "illumination model 把环境、漫反射与高光等局部项组合，surface rendering 决定法线、材质和光源在何处求值。Gouraud插值颜色，Phong插值法线，二者对小高光的保真度不同。",
    probe: "法线、光向量、视向量、各光照项和插值位置",
  },
  {
    label: "global illumination",
    unit: "Global Illumination",
    mechanism:
      "global illumination 计算光源经多次反射到达观察者的能量，radiosity 在漫反射假设下用面片间形状因子建立线性系统。局部光照无法产生颜色渗透等间接效应。",
    probe: "面片面积、形状因子和、发射项与迭代残差",
  },
  {
    label: "radiosity",
    unit: "Global Illumination",
    mechanism:
      "global illumination 计算光源经多次反射到达观察者的能量，radiosity 在漫反射假设下用面片间形状因子建立线性系统。局部光照无法产生颜色渗透等间接效应。",
    probe: "面片面积、形状因子和、发射项与迭代残差",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus:
    "分解局部光照项并选择顶点或片元求值位置，并把表面之间的间接能量交换纳入图像",
  formula:
    "I=I_a k_a+I_l[k_d\\max(0,n\\cdot l)+k_s\\max(0,r\\cdot v)^p] ; B_i=E_i+\\rho_i\\sum_j F_{ij}B_j",
  invariant:
    "Illumination Models and Surface-Rendering Methods的输入、公式中间量、输出与恢复结果可用同一基线复算，且Global Illumination的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault:
    "在非线性颜色空间累加光照，或插值后不重新归一化法线；形状因子不守恒，或把仅适用于漫反射的radiosity用于镜面路径",
  evidence:
    "法线、光向量、视向量、各光照项和插值位置、面片面积、形状因子和、发射项与迭代残差",
  sourceLabel:
    "Donald Hearn、M. Pauline Baker、Warren Carithers《Computer Graphics with OpenGL》第4版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Cg410IlluminationGlobalPipelineLab() {
  return <OfficialCg4Lab mode="pipeline" {...props} />;
}

export function Cg410IlluminationGlobalAlgorithmLab() {
  return <OfficialCg4Lab mode="algorithm" {...props} />;
}

export function Cg410IlluminationGlobalEvidenceLab() {
  return <OfficialCg4Lab mode="evidence" {...props} />;
}
