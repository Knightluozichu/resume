"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-30",
  title: "Gamma 校正、sRGB 边界与线性光照",
  task: "划分纹理解码、线性光照、sRGB framebuffer 编码与显示出口，避免双重 gamma",
  owner: "纹理内部格式、shader 线性运算与 framebuffer sRGB state",
  state: "输入编码、线性 texel、光照/衰减、输出编码和显示值",
  event: "对颜色纹理解码到线性，完成全部光照，再且仅再编码一次",
  invariant:
    "光照和混合发生在线性空间；normal/metallic 等数据纹理不做 sRGB 解码",
  fault: "使用 GL_SRGB 纹理自动解码后又在 shader 中 pow(2.2)，输入被解码两次",
  proof:
    "texture internal format、FRAMEBUFFER_SRGB、线性中间值、输出曲线与像素",
  concepts: ["gamma correction", "srgb", "linear space"],
  stages: [
    {
      action: "冻结输入：gamma correction",
      resource:
        "纹理内部格式、shader 线性运算与 framebuffer sRGB state记录输入编码、线性 texel、光照/衰减、输出编码和显示值",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "texture internal format、FRAMEBUFFER_SRGB、线性中间值、输出曲线与像素中的初始快照",
    },
    {
      action: "提交命令：gamma correction",
      resource: "对颜色纹理解码到线性，完成全部光照，再且仅再编码一次",
      result: "只改变与“gamma correction”相关的状态",
      observation:
        "texture internal format、FRAMEBUFFER_SRGB、线性中间值、输出曲线与像素中的命令参数",
    },
    {
      action: "执行管线：srgb",
      resource:
        "驱动/GPU 消费输入编码、线性 texel、光照/衰减、输出编码和显示值",
      result: "产生“srgb”对应的中间结果",
      observation:
        "texture internal format、FRAMEBUFFER_SRGB、线性中间值、输出曲线与像素中的首个可观测结果",
    },
    {
      action: "核对边界：srgb",
      resource:
        "光照和混合发生在线性空间；normal/metallic 等数据纹理不做 sRGB 解码",
      result: "错误状态在继续传播前被定位",
      observation:
        "texture internal format、FRAMEBUFFER_SRGB、线性中间值、输出曲线与像素中的差异定位",
    },
    {
      action: "保存交付：linear space",
      resource:
        "texture internal format、FRAMEBUFFER_SRGB、线性中间值、输出曲线与像素",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“光照和混合发生在线性空间；normal/metallic 等数据纹理不做 sRGB 解码”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“对颜色纹理解码到线性，完成全部光照，再且仅再编码一次”",
      expected:
        "纹理内部格式、shader 线性运算与 framebuffer sRGB state得到可复查结果，并持续满足“光照和混合发生在线性空间；normal/metallic 等数据纹理不做 sRGB 解码”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“使用 GL_SRGB 纹理自动解码后又在 shader 中 pow(2.2)，输入被解码两次”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以texture internal format、FRAMEBUFFER_SRGB、线性中间值、输出曲线与像素证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function GammaCorrectionContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function GammaCorrectionTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function GammaCorrectionFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
