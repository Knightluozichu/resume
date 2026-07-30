"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-41",
  title: "IBL 漫反射辐照、环境卷积与法线采样",
  task: "把 equirectangular HDR 转 cubemap，再卷积为按法线查询的 diffuse irradiance",
  owner: "capture FBO、environment cubemap、irradiance cubemap 与 PBR sampler",
  state:
    "HDR 投影、六面 capture matrices、环境 texel、半球样本、卷积和 normal lookup",
  event: "捕获六面环境，按每个方向积分半球辐照度，再与 albedo/kD 组合",
  invariant: "六面 view/projection 朝向一致；卷积权重包含 cosθ·sinθ 与采样步长",
  fault: "正 Y/负 Y capture view 的 up 向量写反，cubemap 顶底出现接缝和翻转",
  proof: "六面矩阵、HDR/cubemap 对照、样本权重、irradiance texel 与暗面像素",
  concepts: [
    "image based lighting",
    "irradiance map",
    "convolution",
    "environment map",
  ],
  stages: [
    {
      action: "冻结输入：image based lighting",
      resource:
        "capture FBO、environment cubemap、irradiance cubemap 与 PBR sampler记录HDR 投影、六面 capture matrices、环境 texel、半球样本、卷积和 normal lookup",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "六面矩阵、HDR/cubemap 对照、样本权重、irradiance texel 与暗面像素中的初始快照",
    },
    {
      action: "提交命令：irradiance map",
      resource: "捕获六面环境，按每个方向积分半球辐照度，再与 albedo/kD 组合",
      result: "只改变与“irradiance map”相关的状态",
      observation:
        "六面矩阵、HDR/cubemap 对照、样本权重、irradiance texel 与暗面像素中的命令参数",
    },
    {
      action: "执行管线：irradiance map",
      resource:
        "驱动/GPU 消费HDR 投影、六面 capture matrices、环境 texel、半球样本、卷积和 normal lookup",
      result: "产生“irradiance map”对应的中间结果",
      observation:
        "六面矩阵、HDR/cubemap 对照、样本权重、irradiance texel 与暗面像素中的首个可观测结果",
    },
    {
      action: "核对边界：convolution",
      resource:
        "六面 view/projection 朝向一致；卷积权重包含 cosθ·sinθ 与采样步长",
      result: "错误状态在继续传播前被定位",
      observation:
        "六面矩阵、HDR/cubemap 对照、样本权重、irradiance texel 与暗面像素中的差异定位",
    },
    {
      action: "保存交付：environment map",
      resource:
        "六面矩阵、HDR/cubemap 对照、样本权重、irradiance texel 与暗面像素",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“六面 view/projection 朝向一致；卷积权重包含 cosθ·sinθ 与采样步长”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“捕获六面环境，按每个方向积分半球辐照度，再与 albedo/kD 组合”",
      expected:
        "capture FBO、environment cubemap、irradiance cubemap 与 PBR sampler得到可复查结果，并持续满足“六面 view/projection 朝向一致；卷积权重包含 cosθ·sinθ 与采样步长”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“正 Y/负 Y capture view 的 up 向量写反，cubemap 顶底出现接缝和翻转”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以六面矩阵、HDR/cubemap 对照、样本权重、irradiance texel 与暗面像素证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function IblDiffuseIrradianceContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function IblDiffuseIrradianceTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function IblDiffuseIrradianceFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
