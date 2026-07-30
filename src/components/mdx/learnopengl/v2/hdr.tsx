"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-35",
  title: "HDR、浮点中间缓冲与曝光出口",
  task: "让亮度先保存在浮点 framebuffer，再通过曝光或其他 tone map 压缩到显示范围",
  owner: "floating-point scene FBO 与最终 tone-mapping pass",
  state:
    "HDR scene color、attachment format、exposure、tone-map 输出和 gamma 编码",
  event: "在线性浮点目标累积光照，屏幕 pass 执行 tone map 后编码显示",
  invariant:
    "tone map 前不 clamp 高亮；曝光改变显示映射而不改原 HDR attachment",
  fault: "场景先写入 GL_RGBA8，超过 1 的亮度已截断，后续曝光无法恢复层次",
  proof: "attachment format、HDR texel、exposure、tone-map 前后值与显示像素",
  concepts: ["hdr", "floating point framebuffer", "tone mapping", "exposure"],
  stages: [
    {
      action: "冻结输入：hdr",
      resource:
        "floating-point scene FBO 与最终 tone-mapping pass记录HDR scene color、attachment format、exposure、tone-map 输出和 gamma 编码",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "attachment format、HDR texel、exposure、tone-map 前后值与显示像素中的初始快照",
    },
    {
      action: "提交命令：floating point framebuffer",
      resource: "在线性浮点目标累积光照，屏幕 pass 执行 tone map 后编码显示",
      result: "只改变与“floating point framebuffer”相关的状态",
      observation:
        "attachment format、HDR texel、exposure、tone-map 前后值与显示像素中的命令参数",
    },
    {
      action: "执行管线：floating point framebuffer",
      resource:
        "驱动/GPU 消费HDR scene color、attachment format、exposure、tone-map 输出和 gamma 编码",
      result: "产生“floating point framebuffer”对应的中间结果",
      observation:
        "attachment format、HDR texel、exposure、tone-map 前后值与显示像素中的首个可观测结果",
    },
    {
      action: "核对边界：tone mapping",
      resource:
        "tone map 前不 clamp 高亮；曝光改变显示映射而不改原 HDR attachment",
      result: "错误状态在继续传播前被定位",
      observation:
        "attachment format、HDR texel、exposure、tone-map 前后值与显示像素中的差异定位",
    },
    {
      action: "保存交付：exposure",
      resource:
        "attachment format、HDR texel、exposure、tone-map 前后值与显示像素",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“tone map 前不 clamp 高亮；曝光改变显示映射而不改原 HDR attachment”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“在线性浮点目标累积光照，屏幕 pass 执行 tone map 后编码显示”",
      expected:
        "floating-point scene FBO 与最终 tone-mapping pass得到可复查结果，并持续满足“tone map 前不 clamp 高亮；曝光改变显示映射而不改原 HDR attachment”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“场景先写入 GL_RGBA8，超过 1 的亮度已截断，后续曝光无法恢复层次”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以attachment format、HDR texel、exposure、tone-map 前后值与显示像素证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function HdrContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function HdrTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function HdrFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
