"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-33",
  title: "法线贴图、TBN 与切线空间契约",
  task: "从 UV 导数或顶点数据建立带 handedness 的 TBN，并把法线纹理解码到正确空间",
  owner: "mesh tangent frame、normal texture 与 lighting shader",
  state:
    "tangent/bitangent/normal、handedness、TBN、采样 RGB、[-1,1] 法线和光向量",
  event: "解码法线，正交化 TBN，并把所有光照向量统一到 tangent/world space",
  invariant: "TBN 基向量正交归一；镜像 UV 通过 handedness 恢复 bitangent 方向",
  fault: "镜像 UV 仍用 cross(N,T) 作为 B，接缝一侧凹凸方向反转",
  proof: "T/B/N 点积与长度、UV handedness、采样法线、变换后法线与光照差分",
  concepts: ["normal mapping", "tangent space", "tbn"],
  stages: [
    {
      action: "冻结输入：normal mapping",
      resource:
        "mesh tangent frame、normal texture 与 lighting shader记录tangent/bitangent/normal、handedness、TBN、采样 RGB、[-1,1] 法线和光向量",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "T/B/N 点积与长度、UV handedness、采样法线、变换后法线与光照差分中的初始快照",
    },
    {
      action: "提交命令：normal mapping",
      resource:
        "解码法线，正交化 TBN，并把所有光照向量统一到 tangent/world space",
      result: "只改变与“normal mapping”相关的状态",
      observation:
        "T/B/N 点积与长度、UV handedness、采样法线、变换后法线与光照差分中的命令参数",
    },
    {
      action: "执行管线：tangent space",
      resource:
        "驱动/GPU 消费tangent/bitangent/normal、handedness、TBN、采样 RGB、[-1,1] 法线和光向量",
      result: "产生“tangent space”对应的中间结果",
      observation:
        "T/B/N 点积与长度、UV handedness、采样法线、变换后法线与光照差分中的首个可观测结果",
    },
    {
      action: "核对边界：tangent space",
      resource:
        "TBN 基向量正交归一；镜像 UV 通过 handedness 恢复 bitangent 方向",
      result: "错误状态在继续传播前被定位",
      observation:
        "T/B/N 点积与长度、UV handedness、采样法线、变换后法线与光照差分中的差异定位",
    },
    {
      action: "保存交付：tbn",
      resource:
        "T/B/N 点积与长度、UV handedness、采样法线、变换后法线与光照差分",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“TBN 基向量正交归一；镜像 UV 通过 handedness 恢复 bitangent 方向”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“解码法线，正交化 TBN，并把所有光照向量统一到 tangent/world space”",
      expected:
        "mesh tangent frame、normal texture 与 lighting shader得到可复查结果，并持续满足“TBN 基向量正交归一；镜像 UV 通过 handedness 恢复 bitangent 方向”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“镜像 UV 仍用 cross(N,T) 作为 B，接缝一侧凹凸方向反转”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以T/B/N 点积与长度、UV handedness、采样法线、变换后法线与光照差分证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function NormalMappingContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function NormalMappingTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function NormalMappingFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
