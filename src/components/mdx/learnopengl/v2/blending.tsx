"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-20",
  title: "Alpha 混合、透明排序与预乘颜色",
  task: "把 alpha、blend equation/factors、深度写入和透明物排序接成可解释合成顺序",
  owner: "blend state、depth state 与透明 draw list",
  state: "源/目标 RGBA、blend factors/equation、深度值、排序键和绘制顺序",
  event: "先画不透明物，再按相机距离从远到近提交透明面并控制 depth write",
  invariant:
    "混合因子匹配 straight/premultiplied alpha 约定，排序使用稳定对象身份",
  fault: "透明窗按容器遍历顺序绘制，近处先写颜色导致远处被错误覆盖",
  proof: "源/目标颜色、blend state、距离排序表、depth mask 与重叠像素",
  concepts: ["blending", "alpha", "blend function", "sorting"],
  stages: [
    {
      action: "冻结输入：blending",
      resource:
        "blend state、depth state 与透明 draw list记录源/目标 RGBA、blend factors/equation、深度值、排序键和绘制顺序",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "源/目标颜色、blend state、距离排序表、depth mask 与重叠像素中的初始快照",
    },
    {
      action: "提交命令：alpha",
      resource:
        "先画不透明物，再按相机距离从远到近提交透明面并控制 depth write",
      result: "只改变与“alpha”相关的状态",
      observation:
        "源/目标颜色、blend state、距离排序表、depth mask 与重叠像素中的命令参数",
    },
    {
      action: "执行管线：alpha",
      resource:
        "驱动/GPU 消费源/目标 RGBA、blend factors/equation、深度值、排序键和绘制顺序",
      result: "产生“alpha”对应的中间结果",
      observation:
        "源/目标颜色、blend state、距离排序表、depth mask 与重叠像素中的首个可观测结果",
    },
    {
      action: "核对边界：blend function",
      resource:
        "混合因子匹配 straight/premultiplied alpha 约定，排序使用稳定对象身份",
      result: "错误状态在继续传播前被定位",
      observation:
        "源/目标颜色、blend state、距离排序表、depth mask 与重叠像素中的差异定位",
    },
    {
      action: "保存交付：sorting",
      resource: "源/目标颜色、blend state、距离排序表、depth mask 与重叠像素",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“混合因子匹配 straight/premultiplied alpha 约定，排序使用稳定对象身份”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“先画不透明物，再按相机距离从远到近提交透明面并控制 depth write”",
      expected:
        "blend state、depth state 与透明 draw list得到可复查结果，并持续满足“混合因子匹配 straight/premultiplied alpha 约定，排序使用稳定对象身份”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“透明窗按容器遍历顺序绘制，近处先写颜色导致远处被错误覆盖”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以源/目标颜色、blend state、距离排序表、depth mask 与重叠像素证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function BlendingContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function BlendingTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function BlendingFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
