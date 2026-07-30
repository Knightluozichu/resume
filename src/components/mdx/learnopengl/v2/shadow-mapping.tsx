"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-31",
  title: "阴影映射、深度比较与 Bias 边界",
  task: "把 light-space depth pass、相机 pass 深度比较、bias 与 PCF 放进同一坐标合同",
  owner: "shadow-map FBO、light-space matrix 与采样 pass",
  state:
    "光空间 clip/NDC、depth texture、current depth、bias、PCF taps 和边界处理",
  event: "从光源渲染 depth，再在相机 pass 投影坐标并采样比较",
  invariant: "写入与读取使用同一 light-space/far range；超出光视锥不当作有阴影",
  fault: "固定 bias 过大让物体阴影与接触面分离，形成 peter-panning",
  proof:
    "depth FBO 状态、light matrix、shadow coords、采样深度、bias 与阴影 mask",
  concepts: ["shadow mapping", "light space", "shadow acne", "pcf"],
  stages: [
    {
      action: "冻结输入：shadow mapping",
      resource:
        "shadow-map FBO、light-space matrix 与采样 pass记录光空间 clip/NDC、depth texture、current depth、bias、PCF taps 和边界处理",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "depth FBO 状态、light matrix、shadow coords、采样深度、bias 与阴影 mask中的初始快照",
    },
    {
      action: "提交命令：light space",
      resource: "从光源渲染 depth，再在相机 pass 投影坐标并采样比较",
      result: "只改变与“light space”相关的状态",
      observation:
        "depth FBO 状态、light matrix、shadow coords、采样深度、bias 与阴影 mask中的命令参数",
    },
    {
      action: "执行管线：light space",
      resource:
        "驱动/GPU 消费光空间 clip/NDC、depth texture、current depth、bias、PCF taps 和边界处理",
      result: "产生“light space”对应的中间结果",
      observation:
        "depth FBO 状态、light matrix、shadow coords、采样深度、bias 与阴影 mask中的首个可观测结果",
    },
    {
      action: "核对边界：shadow acne",
      resource:
        "写入与读取使用同一 light-space/far range；超出光视锥不当作有阴影",
      result: "错误状态在继续传播前被定位",
      observation:
        "depth FBO 状态、light matrix、shadow coords、采样深度、bias 与阴影 mask中的差异定位",
    },
    {
      action: "保存交付：pcf",
      resource:
        "depth FBO 状态、light matrix、shadow coords、采样深度、bias 与阴影 mask",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“写入与读取使用同一 light-space/far range；超出光视锥不当作有阴影”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“从光源渲染 depth，再在相机 pass 投影坐标并采样比较”",
      expected:
        "shadow-map FBO、light-space matrix 与采样 pass得到可复查结果，并持续满足“写入与读取使用同一 light-space/far range；超出光视锥不当作有阴影”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“固定 bias 过大让物体阴影与接触面分离，形成 peter-panning”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以depth FBO 状态、light matrix、shadow coords、采样深度、bias 与阴影 mask证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function ShadowMappingContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function ShadowMappingTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function ShadowMappingFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
