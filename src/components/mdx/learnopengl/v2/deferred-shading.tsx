"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-37",
  title: "延迟着色、G-buffer 与光照重建",
  task: "让 geometry pass 写出可重建的 G-buffer，再在 lighting pass 逐像素读取同一空间数据",
  owner: "G-buffer framebuffer、geometry program 与 lighting program",
  state:
    "position/normal/albedo-spec attachments、格式、坐标空间、draw buffers 和 light list",
  event: "几何 pass 填充 G-buffer，光照 pass 采样并累加所有有效光源",
  invariant: "position、normal 与 light 位于同一空间；附件精度满足后续重建",
  fault:
    "G-buffer 保存 view-space position，却拿 world-space light position直接相减",
  proof:
    "attachment 格式/绑定、G-buffer texel、法线长度、光源空间、pass 顺序与像素",
  concepts: ["deferred shading", "g-buffer", "geometry pass", "lighting pass"],
  stages: [
    {
      action: "冻结输入：deferred shading",
      resource:
        "G-buffer framebuffer、geometry program 与 lighting program记录position/normal/albedo-spec attachments、格式、坐标空间、draw buffers 和 light list",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "attachment 格式/绑定、G-buffer texel、法线长度、光源空间、pass 顺序与像素中的初始快照",
    },
    {
      action: "提交命令：g-buffer",
      resource: "几何 pass 填充 G-buffer，光照 pass 采样并累加所有有效光源",
      result: "只改变与“g-buffer”相关的状态",
      observation:
        "attachment 格式/绑定、G-buffer texel、法线长度、光源空间、pass 顺序与像素中的命令参数",
    },
    {
      action: "执行管线：g-buffer",
      resource:
        "驱动/GPU 消费position/normal/albedo-spec attachments、格式、坐标空间、draw buffers 和 light list",
      result: "产生“g-buffer”对应的中间结果",
      observation:
        "attachment 格式/绑定、G-buffer texel、法线长度、光源空间、pass 顺序与像素中的首个可观测结果",
    },
    {
      action: "核对边界：geometry pass",
      resource: "position、normal 与 light 位于同一空间；附件精度满足后续重建",
      result: "错误状态在继续传播前被定位",
      observation:
        "attachment 格式/绑定、G-buffer texel、法线长度、光源空间、pass 顺序与像素中的差异定位",
    },
    {
      action: "保存交付：lighting pass",
      resource:
        "attachment 格式/绑定、G-buffer texel、法线长度、光源空间、pass 顺序与像素",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“position、normal 与 light 位于同一空间；附件精度满足后续重建”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“几何 pass 填充 G-buffer，光照 pass 采样并累加所有有效光源”",
      expected:
        "G-buffer framebuffer、geometry program 与 lighting program得到可复查结果，并持续满足“position、normal 与 light 位于同一空间；附件精度满足后续重建”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“G-buffer 保存 view-space position，却拿 world-space light position直接相减”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以attachment 格式/绑定、G-buffer texel、法线长度、光源空间、pass 顺序与像素证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function DeferredShadingContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function DeferredShadingTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function DeferredShadingFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
