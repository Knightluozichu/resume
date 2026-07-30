"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-39",
  title: "PBR 理论、微表面 BRDF 与能量分配",
  task: "用微表面 D/G/F 与能量守恒解释 Cook-Torrance BRDF 中每一项的物理责任",
  owner: "BRDF 求值合同与材质参数",
  state:
    "normal/view/light/half vectors、roughness、metallic、F0、D/G/F、kD/kS 和分母",
  event: "由材质参数求 D/G/F，分配 diffuse/specular 能量并计算 BRDF",
  invariant: "kD+kS 不凭空增能；金属的 diffuse 贡献归零；分母避免零除",
  fault: "金属材质仍保留 Lambert diffuse，同时又计算有色镜面，反射能量重复",
  proof: "材质输入、Ndot*、D/G/F、kD/kS、BRDF 分量与极端参数检查",
  concepts: ["microfacet", "energy conservation", "brdf", "cook-torrance"],
  stages: [
    {
      action: "冻结输入：microfacet",
      resource:
        "BRDF 求值合同与材质参数记录normal/view/light/half vectors、roughness、metallic、F0、D/G/F、kD/kS 和分母",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "材质输入、Ndot*、D/G/F、kD/kS、BRDF 分量与极端参数检查中的初始快照",
    },
    {
      action: "提交命令：energy conservation",
      resource: "由材质参数求 D/G/F，分配 diffuse/specular 能量并计算 BRDF",
      result: "只改变与“energy conservation”相关的状态",
      observation:
        "材质输入、Ndot*、D/G/F、kD/kS、BRDF 分量与极端参数检查中的命令参数",
    },
    {
      action: "执行管线：energy conservation",
      resource:
        "驱动/GPU 消费normal/view/light/half vectors、roughness、metallic、F0、D/G/F、kD/kS 和分母",
      result: "产生“energy conservation”对应的中间结果",
      observation:
        "材质输入、Ndot*、D/G/F、kD/kS、BRDF 分量与极端参数检查中的首个可观测结果",
    },
    {
      action: "核对边界：brdf",
      resource: "kD+kS 不凭空增能；金属的 diffuse 贡献归零；分母避免零除",
      result: "错误状态在继续传播前被定位",
      observation:
        "材质输入、Ndot*、D/G/F、kD/kS、BRDF 分量与极端参数检查中的差异定位",
    },
    {
      action: "保存交付：cook-torrance",
      resource: "材质输入、Ndot*、D/G/F、kD/kS、BRDF 分量与极端参数检查",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“kD+kS 不凭空增能；金属的 diffuse 贡献归零；分母避免零除”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“由材质参数求 D/G/F，分配 diffuse/specular 能量并计算 BRDF”",
      expected:
        "BRDF 求值合同与材质参数得到可复查结果，并持续满足“kD+kS 不凭空增能；金属的 diffuse 贡献归零；分母避免零除”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“金属材质仍保留 Lambert diffuse，同时又计算有色镜面，反射能量重复”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以材质输入、Ndot*、D/G/F、kD/kS、BRDF 分量与极端参数检查证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function TheoryContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function TheoryTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function TheoryFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
