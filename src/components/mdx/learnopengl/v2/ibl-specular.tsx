"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-42",
  title: "IBL 镜面反射、Split-Sum 与粗糙度预滤波",
  task: "用 roughness 分级预滤波环境和 BRDF LUT 实现 split-sum specular IBL",
  owner: "prefilter cubemap、BRDF 2D LUT 与 PBR environment pass",
  state:
    "roughness→mip、GGX samples、prefilter color、NdotV、LUT scale/bias 和 F0",
  event:
    "生成各 roughness mip 与 BRDF LUT，运行时选择 mip 并组合 prefilteredColor*(F*scale+bias)",
  invariant:
    "prefilter 最大 mip 与运行时 roughness 映射一致；LUT 坐标限定在有效范围",
  fault: "运行时假定 5 个 mip，但预滤波纹理只生成 4 层，粗糙材质采到未定义层",
  proof:
    "mip count/roughness、预滤波 texel、LUT 坐标/值、Fresnel 与最终 specular",
  concepts: ["prefilter map", "brdf lut", "split sum", "specular ibl"],
  stages: [
    {
      action: "冻结输入：prefilter map",
      resource:
        "prefilter cubemap、BRDF 2D LUT 与 PBR environment pass记录roughness→mip、GGX samples、prefilter color、NdotV、LUT scale/bias 和 F0",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "mip count/roughness、预滤波 texel、LUT 坐标/值、Fresnel 与最终 specular中的初始快照",
    },
    {
      action: "提交命令：brdf lut",
      resource:
        "生成各 roughness mip 与 BRDF LUT，运行时选择 mip 并组合 prefilteredColor*(F*scale+bias)",
      result: "只改变与“brdf lut”相关的状态",
      observation:
        "mip count/roughness、预滤波 texel、LUT 坐标/值、Fresnel 与最终 specular中的命令参数",
    },
    {
      action: "执行管线：brdf lut",
      resource:
        "驱动/GPU 消费roughness→mip、GGX samples、prefilter color、NdotV、LUT scale/bias 和 F0",
      result: "产生“brdf lut”对应的中间结果",
      observation:
        "mip count/roughness、预滤波 texel、LUT 坐标/值、Fresnel 与最终 specular中的首个可观测结果",
    },
    {
      action: "核对边界：split sum",
      resource:
        "prefilter 最大 mip 与运行时 roughness 映射一致；LUT 坐标限定在有效范围",
      result: "错误状态在继续传播前被定位",
      observation:
        "mip count/roughness、预滤波 texel、LUT 坐标/值、Fresnel 与最终 specular中的差异定位",
    },
    {
      action: "保存交付：specular ibl",
      resource:
        "mip count/roughness、预滤波 texel、LUT 坐标/值、Fresnel 与最终 specular",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“prefilter 最大 mip 与运行时 roughness 映射一致；LUT 坐标限定在有效范围”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“生成各 roughness mip 与 BRDF LUT，运行时选择 mip 并组合 prefilteredColor*(F*scale+bias)”",
      expected:
        "prefilter cubemap、BRDF 2D LUT 与 PBR environment pass得到可复查结果，并持续满足“prefilter 最大 mip 与运行时 roughness 映射一致；LUT 坐标限定在有效范围”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“运行时假定 5 个 mip，但预滤波纹理只生成 4 层，粗糙材质采到未定义层”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以mip count/roughness、预滤波 texel、LUT 坐标/值、Fresnel 与最终 specular证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function IblSpecularContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function IblSpecularTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function IblSpecularFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
