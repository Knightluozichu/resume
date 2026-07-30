"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-40",
  title: "PBR 光照、Cook-Torrance 与线性 HDR 输出",
  task: "把反射率方程离散为多点光循环，在线性 HDR 中计算 radiance 与 Cook-Torrance",
  owner: "PBR fragment shader、点光数组与线性 HDR target",
  state:
    "albedo/metallic/roughness/ao、light radiance、NdotL、BRDF、Lo 和输出编码",
  event:
    "逐灯求 inverse-square radiance 与 BRDF，按 NdotL 累加 Lo，再 tone map",
  invariant:
    "albedo 在进入光照前线性化；roughness 保持有效下界；输出只编码一次",
  fault: "roughness 允许精确为 0，D/G 分母在对齐方向产生 Inf/NaN 像素",
  proof:
    "材质参数、逐灯 radiance、D/G/F、Lo HDR 值、finite 检查与 tone-map 像素",
  concepts: ["reflectance equation", "metallic", "roughness", "radiance"],
  stages: [
    {
      action: "冻结输入：reflectance equation",
      resource:
        "PBR fragment shader、点光数组与线性 HDR target记录albedo/metallic/roughness/ao、light radiance、NdotL、BRDF、Lo 和输出编码",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "材质参数、逐灯 radiance、D/G/F、Lo HDR 值、finite 检查与 tone-map 像素中的初始快照",
    },
    {
      action: "提交命令：metallic",
      resource:
        "逐灯求 inverse-square radiance 与 BRDF，按 NdotL 累加 Lo，再 tone map",
      result: "只改变与“metallic”相关的状态",
      observation:
        "材质参数、逐灯 radiance、D/G/F、Lo HDR 值、finite 检查与 tone-map 像素中的命令参数",
    },
    {
      action: "执行管线：metallic",
      resource:
        "驱动/GPU 消费albedo/metallic/roughness/ao、light radiance、NdotL、BRDF、Lo 和输出编码",
      result: "产生“metallic”对应的中间结果",
      observation:
        "材质参数、逐灯 radiance、D/G/F、Lo HDR 值、finite 检查与 tone-map 像素中的首个可观测结果",
    },
    {
      action: "核对边界：roughness",
      resource:
        "albedo 在进入光照前线性化；roughness 保持有效下界；输出只编码一次",
      result: "错误状态在继续传播前被定位",
      observation:
        "材质参数、逐灯 radiance、D/G/F、Lo HDR 值、finite 检查与 tone-map 像素中的差异定位",
    },
    {
      action: "保存交付：radiance",
      resource:
        "材质参数、逐灯 radiance、D/G/F、Lo HDR 值、finite 检查与 tone-map 像素",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“albedo 在进入光照前线性化；roughness 保持有效下界；输出只编码一次”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“逐灯求 inverse-square radiance 与 BRDF，按 NdotL 累加 Lo，再 tone map”",
      expected:
        "PBR fragment shader、点光数组与线性 HDR target得到可复查结果，并持续满足“albedo 在进入光照前线性化；roughness 保持有效下界；输出只编码一次”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“roughness 允许精确为 0，D/G 分母在对齐方向产生 Inf/NaN 像素”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以材质参数、逐灯 radiance、D/G/F、Lo HDR 值、finite 检查与 tone-map 像素证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function LightingContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function LightingTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function LightingFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
