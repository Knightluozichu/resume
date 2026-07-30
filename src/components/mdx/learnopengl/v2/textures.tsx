"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-05",
  title: "纹理对象、采样状态与多纹理绑定",
  task: "把图片字节、纹理对象、采样状态、mipmap、texture unit 与 sampler 对齐",
  owner: "纹理对象和当前 active texture unit",
  state: "像素格式、尺寸、wrap/filter、mipmap 完整性、unit 绑定和 sampler 整数",
  event: "上传 texel，配置采样参数，生成 mipmap，并把 sampler 指向已绑定 unit",
  invariant:
    "采样所需 mip 层完整，sampler 的整数值表示纹理单元编号而不是对象 ID",
  fault: "min filter 要求 mipmap，却既未上传也未生成 mip 层，纹理变成不完整",
  proof: "纹理级别查询、unit/target 绑定、sampler 值、GL 错误与采样像素",
  concepts: ["texture", "texture unit", "wrapping", "filtering"],
  stages: [
    {
      action: "冻结输入：texture",
      resource:
        "纹理对象和当前 active texture unit记录像素格式、尺寸、wrap/filter、mipmap 完整性、unit 绑定和 sampler 整数",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "纹理级别查询、unit/target 绑定、sampler 值、GL 错误与采样像素中的初始快照",
    },
    {
      action: "提交命令：texture unit",
      resource:
        "上传 texel，配置采样参数，生成 mipmap，并把 sampler 指向已绑定 unit",
      result: "只改变与“texture unit”相关的状态",
      observation:
        "纹理级别查询、unit/target 绑定、sampler 值、GL 错误与采样像素中的命令参数",
    },
    {
      action: "执行管线：texture unit",
      resource:
        "驱动/GPU 消费像素格式、尺寸、wrap/filter、mipmap 完整性、unit 绑定和 sampler 整数",
      result: "产生“texture unit”对应的中间结果",
      observation:
        "纹理级别查询、unit/target 绑定、sampler 值、GL 错误与采样像素中的首个可观测结果",
    },
    {
      action: "核对边界：wrapping",
      resource:
        "采样所需 mip 层完整，sampler 的整数值表示纹理单元编号而不是对象 ID",
      result: "错误状态在继续传播前被定位",
      observation:
        "纹理级别查询、unit/target 绑定、sampler 值、GL 错误与采样像素中的差异定位",
    },
    {
      action: "保存交付：filtering",
      resource: "纹理级别查询、unit/target 绑定、sampler 值、GL 错误与采样像素",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“采样所需 mip 层完整，sampler 的整数值表示纹理单元编号而不是对象 ID”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“上传 texel，配置采样参数，生成 mipmap，并把 sampler 指向已绑定 unit”",
      expected:
        "纹理对象和当前 active texture unit得到可复查结果，并持续满足“采样所需 mip 层完整，sampler 的整数值表示纹理单元编号而不是对象 ID”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“min filter 要求 mipmap，却既未上传也未生成 mip 层，纹理变成不完整”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以纹理级别查询、unit/target 绑定、sampler 值、GL 错误与采样像素证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function TexturesContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function TexturesTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function TexturesFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
