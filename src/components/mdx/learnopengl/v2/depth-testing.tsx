"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-18",
  title: "深度测试、Early-Z 与深度精度",
  task: "解释 depth buffer、比较函数、写掩码、clear 与非线性精度如何共同决定可见片段",
  owner: "framebuffer 的 depth attachment 与 GL depth-test state",
  state:
    "深度格式、clear value、compare func、write mask、片段深度和 early test 条件",
  event: "清除 depth，启用测试/写入，绘制不透明物并按需线性化观测值",
  invariant: "每帧清除可写 depth buffer；透明/天空盒阶段改变状态后显式恢复",
  fault:
    "上一帧把 glDepthMask 设为 false，下一帧直接 clear，深度缓冲实际未被清除",
  proof: "depth bits、func/mask 查询、片段 z、线性化值、draw 顺序与深度截图",
  concepts: ["depth test", "depth buffer", "depth function", "linearize"],
  stages: [
    {
      action: "冻结输入：depth test",
      resource:
        "framebuffer 的 depth attachment 与 GL depth-test state记录深度格式、clear value、compare func、write mask、片段深度和 early test 条件",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "depth bits、func/mask 查询、片段 z、线性化值、draw 顺序与深度截图中的初始快照",
    },
    {
      action: "提交命令：depth buffer",
      resource: "清除 depth，启用测试/写入，绘制不透明物并按需线性化观测值",
      result: "只改变与“depth buffer”相关的状态",
      observation:
        "depth bits、func/mask 查询、片段 z、线性化值、draw 顺序与深度截图中的命令参数",
    },
    {
      action: "执行管线：depth buffer",
      resource:
        "驱动/GPU 消费深度格式、clear value、compare func、write mask、片段深度和 early test 条件",
      result: "产生“depth buffer”对应的中间结果",
      observation:
        "depth bits、func/mask 查询、片段 z、线性化值、draw 顺序与深度截图中的首个可观测结果",
    },
    {
      action: "核对边界：depth function",
      resource: "每帧清除可写 depth buffer；透明/天空盒阶段改变状态后显式恢复",
      result: "错误状态在继续传播前被定位",
      observation:
        "depth bits、func/mask 查询、片段 z、线性化值、draw 顺序与深度截图中的差异定位",
    },
    {
      action: "保存交付：linearize",
      resource:
        "depth bits、func/mask 查询、片段 z、线性化值、draw 顺序与深度截图",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“每帧清除可写 depth buffer；透明/天空盒阶段改变状态后显式恢复”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“清除 depth，启用测试/写入，绘制不透明物并按需线性化观测值”",
      expected:
        "framebuffer 的 depth attachment 与 GL depth-test state得到可复查结果，并持续满足“每帧清除可写 depth buffer；透明/天空盒阶段改变状态后显式恢复”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“上一帧把 glDepthMask 设为 false，下一帧直接 clear，深度缓冲实际未被清除”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以depth bits、func/mask 查询、片段 z、线性化值、draw 顺序与深度截图证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function DepthTestingContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function DepthTestingTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function DepthTestingFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
