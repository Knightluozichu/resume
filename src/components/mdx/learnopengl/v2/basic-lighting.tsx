"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-10",
  title: "Phong 光照、法线矩阵与逐片段着色",
  task: "把 ambient、diffuse、specular 与正确法线矩阵组合为逐片段 Phong 光照",
  owner: "lighting program 的片段阶段与 normal matrix",
  state: "世界空间位置/法线、光向量、视线、三项贡献和最终线性颜色",
  event: "变换法线，计算 N·L 和反射向量，再累加环境/漫反射/镜面项",
  invariant: "参与点积的向量位于同一空间且归一；非均匀缩放使用逆转置法线矩阵",
  fault: "直接用带非均匀缩放的 model mat3 变换法线，亮面方向随缩放漂移",
  proof: "法线长度、normal matrix、N·L、各光照分量、GLSL 输出与像素",
  concepts: ["ambient", "diffuse", "specular", "phong"],
  stages: [
    {
      action: "冻结输入：ambient",
      resource:
        "lighting program 的片段阶段与 normal matrix记录世界空间位置/法线、光向量、视线、三项贡献和最终线性颜色",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "法线长度、normal matrix、N·L、各光照分量、GLSL 输出与像素中的初始快照",
    },
    {
      action: "提交命令：diffuse",
      resource: "变换法线，计算 N·L 和反射向量，再累加环境/漫反射/镜面项",
      result: "只改变与“diffuse”相关的状态",
      observation:
        "法线长度、normal matrix、N·L、各光照分量、GLSL 输出与像素中的命令参数",
    },
    {
      action: "执行管线：diffuse",
      resource:
        "驱动/GPU 消费世界空间位置/法线、光向量、视线、三项贡献和最终线性颜色",
      result: "产生“diffuse”对应的中间结果",
      observation:
        "法线长度、normal matrix、N·L、各光照分量、GLSL 输出与像素中的首个可观测结果",
    },
    {
      action: "核对边界：specular",
      resource:
        "参与点积的向量位于同一空间且归一；非均匀缩放使用逆转置法线矩阵",
      result: "错误状态在继续传播前被定位",
      observation:
        "法线长度、normal matrix、N·L、各光照分量、GLSL 输出与像素中的差异定位",
    },
    {
      action: "保存交付：phong",
      resource: "法线长度、normal matrix、N·L、各光照分量、GLSL 输出与像素",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“参与点积的向量位于同一空间且归一；非均匀缩放使用逆转置法线矩阵”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“变换法线，计算 N·L 和反射向量，再累加环境/漫反射/镜面项”",
      expected:
        "lighting program 的片段阶段与 normal matrix得到可复查结果，并持续满足“参与点积的向量位于同一空间且归一；非均匀缩放使用逆转置法线矩阵”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“直接用带非均匀缩放的 model mat3 变换法线，亮面方向随缩放漂移”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以法线长度、normal matrix、N·L、各光照分量、GLSL 输出与像素证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function BasicLightingContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function BasicLightingTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function BasicLightingFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
