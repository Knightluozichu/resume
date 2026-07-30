"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-19",
  title: "模板测试、位掩码与物体描边",
  task: "用 stencil func/op/mask 明确写入通道和第二遍描边的拒绝区域",
  owner: "framebuffer stencil attachment 与三组 stencil state",
  state: "compare func/ref/mask、sfail/dpfail/dppass、write mask 和模板值",
  event: "第一遍写入对象区域，第二遍拒绝等于 ref 的片段并放大绘制轮廓",
  invariant:
    "清除前 write mask 允许写；两遍之间只改变描边所需状态并在结束后恢复",
  fault: "描边后保留 stencil write mask=0x00，下一帧 glClear 无法清空旧模板",
  proof: "stencil bits、func/op/mask 查询、两遍 draw、模板像素与轮廓截图",
  concepts: ["stencil test", "stencil buffer", "object outlining"],
  stages: [
    {
      action: "冻结输入：stencil test",
      resource:
        "framebuffer stencil attachment 与三组 stencil state记录compare func/ref/mask、sfail/dpfail/dppass、write mask 和模板值",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "stencil bits、func/op/mask 查询、两遍 draw、模板像素与轮廓截图中的初始快照",
    },
    {
      action: "提交命令：stencil test",
      resource: "第一遍写入对象区域，第二遍拒绝等于 ref 的片段并放大绘制轮廓",
      result: "只改变与“stencil test”相关的状态",
      observation:
        "stencil bits、func/op/mask 查询、两遍 draw、模板像素与轮廓截图中的命令参数",
    },
    {
      action: "执行管线：stencil buffer",
      resource:
        "驱动/GPU 消费compare func/ref/mask、sfail/dpfail/dppass、write mask 和模板值",
      result: "产生“stencil buffer”对应的中间结果",
      observation:
        "stencil bits、func/op/mask 查询、两遍 draw、模板像素与轮廓截图中的首个可观测结果",
    },
    {
      action: "核对边界：stencil buffer",
      resource:
        "清除前 write mask 允许写；两遍之间只改变描边所需状态并在结束后恢复",
      result: "错误状态在继续传播前被定位",
      observation:
        "stencil bits、func/op/mask 查询、两遍 draw、模板像素与轮廓截图中的差异定位",
    },
    {
      action: "保存交付：object outlining",
      resource:
        "stencil bits、func/op/mask 查询、两遍 draw、模板像素与轮廓截图",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“清除前 write mask 允许写；两遍之间只改变描边所需状态并在结束后恢复”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“第一遍写入对象区域，第二遍拒绝等于 ref 的片段并放大绘制轮廓”",
      expected:
        "framebuffer stencil attachment 与三组 stencil state得到可复查结果，并持续满足“清除前 write mask 允许写；两遍之间只改变描边所需状态并在结束后恢复”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“描边后保留 stencil write mask=0x00，下一帧 glClear 无法清空旧模板”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以stencil bits、func/op/mask 查询、两遍 draw、模板像素与轮廓截图证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function StencilTestingContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function StencilTestingTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function StencilTestingFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
