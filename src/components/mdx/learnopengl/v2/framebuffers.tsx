"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-22",
  title: "帧缓冲、附件与可靠的两遍渲染",
  task: "创建完整离屏 FBO，完成场景 pass 后切回默认 framebuffer 做屏幕空间处理",
  owner: "自建 framebuffer、color/depth-stencil attachments 与默认 framebuffer",
  state: "附件对象/格式/尺寸、draw buffers、完整性、viewport 和 pass 边界",
  event:
    "绑定 FBO 检查完整性并画场景，再绑定 0、恢复 viewport、采样 color texture",
  invariant: "所有附件尺寸/样本数兼容；绝不从当前正在写入的同一附件采样",
  fault:
    "color attachment 尺寸更新而 depth renderbuffer 仍是旧尺寸，FBO 不完整",
  proof:
    "attachment 参数、glCheckFramebufferStatus、viewport、pass 顺序与输出纹理",
  concepts: ["framebuffer", "attachment", "renderbuffer", "post-processing"],
  stages: [
    {
      action: "冻结输入：framebuffer",
      resource:
        "自建 framebuffer、color/depth-stencil attachments 与默认 framebuffer记录附件对象/格式/尺寸、draw buffers、完整性、viewport 和 pass 边界",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "attachment 参数、glCheckFramebufferStatus、viewport、pass 顺序与输出纹理中的初始快照",
    },
    {
      action: "提交命令：attachment",
      resource:
        "绑定 FBO 检查完整性并画场景，再绑定 0、恢复 viewport、采样 color texture",
      result: "只改变与“attachment”相关的状态",
      observation:
        "attachment 参数、glCheckFramebufferStatus、viewport、pass 顺序与输出纹理中的命令参数",
    },
    {
      action: "执行管线：attachment",
      resource:
        "驱动/GPU 消费附件对象/格式/尺寸、draw buffers、完整性、viewport 和 pass 边界",
      result: "产生“attachment”对应的中间结果",
      observation:
        "attachment 参数、glCheckFramebufferStatus、viewport、pass 顺序与输出纹理中的首个可观测结果",
    },
    {
      action: "核对边界：renderbuffer",
      resource: "所有附件尺寸/样本数兼容；绝不从当前正在写入的同一附件采样",
      result: "错误状态在继续传播前被定位",
      observation:
        "attachment 参数、glCheckFramebufferStatus、viewport、pass 顺序与输出纹理中的差异定位",
    },
    {
      action: "保存交付：post-processing",
      resource:
        "attachment 参数、glCheckFramebufferStatus、viewport、pass 顺序与输出纹理",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“所有附件尺寸/样本数兼容；绝不从当前正在写入的同一附件采样”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“绑定 FBO 检查完整性并画场景，再绑定 0、恢复 viewport、采样 color texture”",
      expected:
        "自建 framebuffer、color/depth-stencil attachments 与默认 framebuffer得到可复查结果，并持续满足“所有附件尺寸/样本数兼容；绝不从当前正在写入的同一附件采样”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“color attachment 尺寸更新而 depth renderbuffer 仍是旧尺寸，FBO 不完整”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以attachment 参数、glCheckFramebufferStatus、viewport、pass 顺序与输出纹理证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function FramebuffersContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function FramebuffersTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function FramebuffersFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
