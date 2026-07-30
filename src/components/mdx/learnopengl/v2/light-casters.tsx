"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-13",
  title: "平行光、点光源与软边聚光",
  task: "在同一 Phong 核心上区分平行光、点光与软边聚光的方向和衰减合同",
  owner: "当前 Light 结构体与每片段光源求值函数",
  state: "direction/position、距离、衰减系数、内外 cutoff 和光照强度",
  event: "按光源类型构造 L，应用距离衰减或锥角强度，再计算 Phong 项",
  invariant:
    "方向光不读距离；点光衰减有限；聚光 inner cosine 大于 outer cosine",
  fault: "把角度值直接与点积比较且内外 cutoff 反置，软边区间符号错误",
  proof: "光源类型、L、距离、cutoff cosine、attenuation、intensity 与像素",
  concepts: ["directional light", "point light", "spotlight", "attenuation"],
  stages: [
    {
      action: "冻结输入：directional light",
      resource:
        "当前 Light 结构体与每片段光源求值函数记录direction/position、距离、衰减系数、内外 cutoff 和光照强度",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "光源类型、L、距离、cutoff cosine、attenuation、intensity 与像素中的初始快照",
    },
    {
      action: "提交命令：point light",
      resource: "按光源类型构造 L，应用距离衰减或锥角强度，再计算 Phong 项",
      result: "只改变与“point light”相关的状态",
      observation:
        "光源类型、L、距离、cutoff cosine、attenuation、intensity 与像素中的命令参数",
    },
    {
      action: "执行管线：point light",
      resource:
        "驱动/GPU 消费direction/position、距离、衰减系数、内外 cutoff 和光照强度",
      result: "产生“point light”对应的中间结果",
      observation:
        "光源类型、L、距离、cutoff cosine、attenuation、intensity 与像素中的首个可观测结果",
    },
    {
      action: "核对边界：spotlight",
      resource:
        "方向光不读距离；点光衰减有限；聚光 inner cosine 大于 outer cosine",
      result: "错误状态在继续传播前被定位",
      observation:
        "光源类型、L、距离、cutoff cosine、attenuation、intensity 与像素中的差异定位",
    },
    {
      action: "保存交付：attenuation",
      resource:
        "光源类型、L、距离、cutoff cosine、attenuation、intensity 与像素",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“方向光不读距离；点光衰减有限；聚光 inner cosine 大于 outer cosine”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“按光源类型构造 L，应用距离衰减或锥角强度，再计算 Phong 项”",
      expected:
        "当前 Light 结构体与每片段光源求值函数得到可复查结果，并持续满足“方向光不读距离；点光衰减有限；聚光 inner cosine 大于 outer cosine”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“把角度值直接与点积比较且内外 cutoff 反置，软边区间符号错误”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以光源类型、L、距离、cutoff cosine、attenuation、intensity 与像素证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function LightCastersContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function LightCastersTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function LightCastersFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
