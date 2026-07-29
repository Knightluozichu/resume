"use client";

import {
  OfficialGlStateLab,
  type ApiConceptNode,
  type ApiExperimentModel,
} from "./official-gl-state-lab";

const unitTitle = "FBO 与后处理技术";
const nodes = [
  {
    label: "framebuffer",
    unit: "Framebuffer and Post-processing",
    mechanism:
      "framebuffer把颜色、深度和模板attachment组成渲染目标；完整性取决于附件尺寸、样本数、格式和层级等条件。后处理先渲染到离屏颜色附件，再以纹理输入执行下一pass，必须防止读写同一子资源的反馈环。",
    probe: "完整性状态、附件尺寸/样本数、draw buffers和逐pass参考像素",
  },
  {
    label: "color attachment",
    unit: "Framebuffer and Post-processing",
    mechanism:
      "framebuffer把颜色、深度和模板attachment组成渲染目标；完整性取决于附件尺寸、样本数、格式和层级等条件。后处理先渲染到离屏颜色附件，再以纹理输入执行下一pass，必须防止读写同一子资源的反馈环。",
    probe: "完整性状态、附件尺寸/样本数、draw buffers和逐pass参考像素",
  },
  {
    label: "depth attachment",
    unit: "Framebuffer and Post-processing",
    mechanism:
      "framebuffer把颜色、深度和模板attachment组成渲染目标；完整性取决于附件尺寸、样本数、格式和层级等条件。后处理先渲染到离屏颜色附件，再以纹理输入执行下一pass，必须防止读写同一子资源的反馈环。",
    probe: "完整性状态、附件尺寸/样本数、draw buffers和逐pass参考像素",
  },
  {
    label: "post-processing",
    unit: "Framebuffer and Post-processing",
    mechanism:
      "framebuffer把颜色、深度和模板attachment组成渲染目标；完整性取决于附件尺寸、样本数、格式和层级等条件。后处理先渲染到离屏颜色附件，再以纹理输入执行下一pass，必须防止读写同一子资源的反馈环。",
    probe: "完整性状态、附件尺寸/样本数、draw buffers和逐pass参考像素",
  },
] satisfies ApiConceptNode[];
const model = {
  focus: "用完整FBO附件合同实现可复算的多遍后处理",
  formula: "Pass_{n+1}=Shader(Texture(Pass_n))",
  invariant: "FBO 与后处理技术的输入、状态、输出与恢复结果可用同一证据包重放",
  fault: "FBO不完整仍绘制，或把当前颜色附件同时绑定为采样输入",
  evidence: "完整性状态、附件尺寸/样本数、draw buffers和逐pass参考像素",
  sourceLabel: "Khronos OpenGL / OpenGL ES / GLSL / WebGL 规范课程",
} satisfies ApiExperimentModel;
const props = { unitTitle, nodes, model };

export function DogFboTechniquesStateLab() {
  return <OfficialGlStateLab mode="state" {...props} />;
}

export function DogFboTechniquesFaultLab() {
  return <OfficialGlStateLab mode="fault" {...props} />;
}

export function DogFboTechniquesEvidenceLab() {
  return <OfficialGlStateLab mode="evidence" {...props} />;
}
