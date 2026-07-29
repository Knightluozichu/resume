"use client";

import {
  OfficialCg4Lab,
  type GraphicsConceptNode,
  type GraphicsExperimentModel,
} from "./official-cg4-lab";

const unitTitle =
  "Three-Dimensional Object Representations × Spline Representations × Visualization of Data Sets";
const nodes = [
  {
    label: "3d object representation",
    unit: "Three-Dimensional Object Representations",
    mechanism:
      "3d object representation 可以是边界、体、隐式面或过程模型，polygon mesh 用顶点、边与面近似表面。表示选择决定拓扑查询、法线连续性、存储和求交成本。",
    probe: "顶点/索引、邻接、法线、包围盒和退化统计",
  },
  {
    label: "polygon mesh",
    unit: "Three-Dimensional Object Representations",
    mechanism:
      "3d object representation 可以是边界、体、隐式面或过程模型，polygon mesh 用顶点、边与面近似表面。表示选择决定拓扑查询、法线连续性、存储和求交成本。",
    probe: "顶点/索引、邻接、法线、包围盒和退化统计",
  },
  {
    label: "spline representation",
    unit: "Spline Representations",
    mechanism:
      "spline representation 用分段多项式控制连续性，bezier 通过Bernstein基函数形成凸包内曲线。提高控制点数量会提高次数而非自动增加局部控制，因此长曲线通常采用分段样条。",
    probe: "端点、切线、凸包、连续阶数和细分误差",
  },
  {
    label: "bezier",
    unit: "Spline Representations",
    mechanism:
      "spline representation 用分段多项式控制连续性，bezier 通过Bernstein基函数形成凸包内曲线。提高控制点数量会提高次数而非自动增加局部控制，因此长曲线通常采用分段样条。",
    probe: "端点、切线、凸包、连续阶数和细分误差",
  },
  {
    label: "data visualization",
    unit: "Visualization of Data Sets",
    mechanism:
      "data visualization 选择位置、颜色、形状等视觉通道表达数据，volume rendering 沿视线积分三维标量场的吸收与发射。传递函数决定哪些结构可见，也可能制造误导。",
    probe: "数据范围、传递函数、采样步长和参考切片",
  },
  {
    label: "volume rendering",
    unit: "Visualization of Data Sets",
    mechanism:
      "data visualization 选择位置、颜色、形状等视觉通道表达数据，volume rendering 沿视线积分三维标量场的吸收与发射。传递函数决定哪些结构可见，也可能制造误导。",
    probe: "数据范围、传递函数、采样步长和参考切片",
  },
] satisfies GraphicsConceptNode[];
const model = {
  focus:
    "选择能支持查询、编辑与渲染的三维对象表示，并用控制点和基函数构造连续曲线与曲面，并把标量、向量和体数据映射成可解释图形",
  formula:
    "p(u,v)=\\sum_i w_i(u,v)p_i,\\qquad \\sum_i w_i=1 ; B(t)=\\sum_{i=0}^{n}\\binom{n}{i}(1-t)^{n-i}t^iP_i ; C=\\int_0^D T(t)c(t)\\sigma(t)dt,\\quad T(t)=e^{-\\int_0^t\\sigma(s)ds}",
  invariant:
    "Three-Dimensional Object Representations的输入、公式中间量、输出与恢复结果可用同一基线复算，且Spline Representations的输入、公式中间量、输出与恢复结果可用同一基线复算，且Visualization of Data Sets的输入、公式中间量、输出与恢复结果可用同一基线复算",
  fault:
    "只比较三角形数量而忽略拓扑、属性接缝和退化面；把控制多边形当成插值折线，或拼接段只对齐位置不对齐切线；传递函数掩盖关键范围，或采样步长变化后没有重新校准不透明度",
  evidence:
    "顶点/索引、邻接、法线、包围盒和退化统计、端点、切线、凸包、连续阶数和细分误差、数据范围、传递函数、采样步长和参考切片",
  sourceLabel:
    "Donald Hearn、M. Pauline Baker、Warren Carithers《Computer Graphics with OpenGL》第4版",
} satisfies GraphicsExperimentModel;
const props = { unitTitle, nodes, model };

export function Cg414ObjectsSplinesVisualizationPipelineLab() {
  return <OfficialCg4Lab mode="pipeline" {...props} />;
}

export function Cg414ObjectsSplinesVisualizationAlgorithmLab() {
  return <OfficialCg4Lab mode="algorithm" {...props} />;
}

export function Cg414ObjectsSplinesVisualizationEvidenceLab() {
  return <OfficialCg4Lab mode="evidence" {...props} />;
}
