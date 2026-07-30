"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-36",
  title: "泛光、亮区提取与乒乓高斯",
  task: "用 MRT 提取亮区，在两个纹理间 ping-pong 高斯模糊，再与原 HDR scene 合成",
  owner: "HDR MRT framebuffer、两张 ping-pong textures 与 composite pass",
  state:
    "scene/bright attachments、threshold、blur direction、read/write texture 和合成值",
  event: "一次写 scene+bright，多轮交替水平/垂直模糊，最后相加并 tone map",
  invariant:
    "每轮读取与写入不是同一纹理；最终选择最后一次实际写入的 ping-pong 目标",
  fault:
    "模糊 pass 同时从当前 color attachment 采样并写回，形成未定义 feedback loop",
  proof:
    "draw buffers、bright texel、每轮方向/输入/输出、最终纹理索引与合成像素",
  concepts: ["bloom", "bright pass", "gaussian blur", "ping-pong"],
  stages: [
    {
      action: "冻结输入：bloom",
      resource:
        "HDR MRT framebuffer、两张 ping-pong textures 与 composite pass记录scene/bright attachments、threshold、blur direction、read/write texture 和合成值",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "draw buffers、bright texel、每轮方向/输入/输出、最终纹理索引与合成像素中的初始快照",
    },
    {
      action: "提交命令：bright pass",
      resource:
        "一次写 scene+bright，多轮交替水平/垂直模糊，最后相加并 tone map",
      result: "只改变与“bright pass”相关的状态",
      observation:
        "draw buffers、bright texel、每轮方向/输入/输出、最终纹理索引与合成像素中的命令参数",
    },
    {
      action: "执行管线：bright pass",
      resource:
        "驱动/GPU 消费scene/bright attachments、threshold、blur direction、read/write texture 和合成值",
      result: "产生“bright pass”对应的中间结果",
      observation:
        "draw buffers、bright texel、每轮方向/输入/输出、最终纹理索引与合成像素中的首个可观测结果",
    },
    {
      action: "核对边界：gaussian blur",
      resource:
        "每轮读取与写入不是同一纹理；最终选择最后一次实际写入的 ping-pong 目标",
      result: "错误状态在继续传播前被定位",
      observation:
        "draw buffers、bright texel、每轮方向/输入/输出、最终纹理索引与合成像素中的差异定位",
    },
    {
      action: "保存交付：ping-pong",
      resource:
        "draw buffers、bright texel、每轮方向/输入/输出、最终纹理索引与合成像素",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“每轮读取与写入不是同一纹理；最终选择最后一次实际写入的 ping-pong 目标”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“一次写 scene+bright，多轮交替水平/垂直模糊，最后相加并 tone map”",
      expected:
        "HDR MRT framebuffer、两张 ping-pong textures 与 composite pass得到可复查结果，并持续满足“每轮读取与写入不是同一纹理；最终选择最后一次实际写入的 ping-pong 目标”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“模糊 pass 同时从当前 color attachment 采样并写回，形成未定义 feedback loop”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以draw buffers、bright texel、每轮方向/输入/输出、最终纹理索引与合成像素证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function BloomContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function BloomTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function BloomFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
