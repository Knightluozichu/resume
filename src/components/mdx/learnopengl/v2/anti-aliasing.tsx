"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-28",
  title: "抗锯齿",
  task: "建立多采样 framebuffer、逐 sample 覆盖与 resolve 到单采样目标的完整路径",
  owner: "multisample framebuffer、sample storage 与 resolve 目标",
  state:
    "sample count、color/depth attachments、coverage、resolve filter 和目标尺寸",
  event:
    "以相同 sample count 渲染所有附件，再 blit/resolve 到单采样纹理或默认缓冲",
  invariant: "多采样附件样本数一致；resolve 的源/目标区域和格式兼容",
  fault: "color 是 4x MSAA 而 depth-stencil 是单采样，framebuffer 不完整",
  proof: "GL_SAMPLES、attachment sample count、完整性、blit 参数与边缘像素",
  concepts: ["anti aliasing", "msaa", "multisample", "resolve"],
  stages: [
    {
      action: "冻结输入：anti aliasing",
      resource:
        "multisample framebuffer、sample storage 与 resolve 目标记录sample count、color/depth attachments、coverage、resolve filter 和目标尺寸",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "GL_SAMPLES、attachment sample count、完整性、blit 参数与边缘像素中的初始快照",
    },
    {
      action: "提交命令：msaa",
      resource:
        "以相同 sample count 渲染所有附件，再 blit/resolve 到单采样纹理或默认缓冲",
      result: "只改变与“msaa”相关的状态",
      observation:
        "GL_SAMPLES、attachment sample count、完整性、blit 参数与边缘像素中的命令参数",
    },
    {
      action: "执行管线：msaa",
      resource:
        "驱动/GPU 消费sample count、color/depth attachments、coverage、resolve filter 和目标尺寸",
      result: "产生“msaa”对应的中间结果",
      observation:
        "GL_SAMPLES、attachment sample count、完整性、blit 参数与边缘像素中的首个可观测结果",
    },
    {
      action: "核对边界：multisample",
      resource: "多采样附件样本数一致；resolve 的源/目标区域和格式兼容",
      result: "错误状态在继续传播前被定位",
      observation:
        "GL_SAMPLES、attachment sample count、完整性、blit 参数与边缘像素中的差异定位",
    },
    {
      action: "保存交付：resolve",
      resource:
        "GL_SAMPLES、attachment sample count、完整性、blit 参数与边缘像素",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“多采样附件样本数一致；resolve 的源/目标区域和格式兼容”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“以相同 sample count 渲染所有附件，再 blit/resolve 到单采样纹理或默认缓冲”",
      expected:
        "multisample framebuffer、sample storage 与 resolve 目标得到可复查结果，并持续满足“多采样附件样本数一致；resolve 的源/目标区域和格式兼容”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“color 是 4x MSAA 而 depth-stencil 是单采样，framebuffer 不完整”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以GL_SAMPLES、attachment sample count、完整性、blit 参数与边缘像素证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function AntiAliasingContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function AntiAliasingTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function AntiAliasingFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
