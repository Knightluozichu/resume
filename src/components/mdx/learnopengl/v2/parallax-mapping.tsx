"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-34",
  title: "视差贴图、UV 偏移与 POM 命中",
  task: "在 tangent space 沿 view direction 追踪 height map，得到可拒绝越界 UV 的命中点",
  owner: "fragment shader 的 UV/height-layer march",
  state:
    "tangent viewDir、height scale、layer depth、采样高度、UV offset 和命中层",
  event: "从原 UV 分层前进，找到首次交叉并按需要做线性/POM 细化",
  invariant: "掠射角除法有下界；越出 [0,1] 的 UV 按材质合同 discard 或 clamp",
  fault: "viewDir.z 接近 0 仍直接相除，UV 偏移爆炸并采到纹理另一侧",
  proof:
    "初始 UV、viewDir.z、每层深度/height、命中索引、最终 UV 与 discard 原因",
  concepts: ["parallax mapping", "height map", "parallax occlusion"],
  stages: [
    {
      action: "冻结输入：parallax mapping",
      resource:
        "fragment shader 的 UV/height-layer march记录tangent viewDir、height scale、layer depth、采样高度、UV offset 和命中层",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "初始 UV、viewDir.z、每层深度/height、命中索引、最终 UV 与 discard 原因中的初始快照",
    },
    {
      action: "提交命令：parallax mapping",
      resource: "从原 UV 分层前进，找到首次交叉并按需要做线性/POM 细化",
      result: "只改变与“parallax mapping”相关的状态",
      observation:
        "初始 UV、viewDir.z、每层深度/height、命中索引、最终 UV 与 discard 原因中的命令参数",
    },
    {
      action: "执行管线：height map",
      resource:
        "驱动/GPU 消费tangent viewDir、height scale、layer depth、采样高度、UV offset 和命中层",
      result: "产生“height map”对应的中间结果",
      observation:
        "初始 UV、viewDir.z、每层深度/height、命中索引、最终 UV 与 discard 原因中的首个可观测结果",
    },
    {
      action: "核对边界：height map",
      resource:
        "掠射角除法有下界；越出 [0,1] 的 UV 按材质合同 discard 或 clamp",
      result: "错误状态在继续传播前被定位",
      observation:
        "初始 UV、viewDir.z、每层深度/height、命中索引、最终 UV 与 discard 原因中的差异定位",
    },
    {
      action: "保存交付：parallax occlusion",
      resource:
        "初始 UV、viewDir.z、每层深度/height、命中索引、最终 UV 与 discard 原因",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“掠射角除法有下界；越出 [0,1] 的 UV 按材质合同 discard 或 clamp”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“从原 UV 分层前进，找到首次交叉并按需要做线性/POM 细化”",
      expected:
        "fragment shader 的 UV/height-layer march得到可复查结果，并持续满足“掠射角除法有下界；越出 [0,1] 的 UV 按材质合同 discard 或 clamp”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“viewDir.z 接近 0 仍直接相除，UV 偏移爆炸并采到纹理另一侧”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以初始 UV、viewDir.z、每层深度/height、命中索引、最终 UV 与 discard 原因证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function ParallaxMappingContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function ParallaxMappingTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function ParallaxMappingFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
