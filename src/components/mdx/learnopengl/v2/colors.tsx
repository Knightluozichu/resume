"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-09",
  title: "光源颜色、物体反射率与场景着色器",
  task: "验证物体反射率与入射光色逐通道相乘后才成为片段颜色",
  owner: "lamp/object 两个 program 与各自颜色 uniform",
  state: "lightColor、objectColor、program 绑定和片段输出",
  event: "分别绑定灯与物体 program，上传颜色并绘制光源代理和受光物体",
  invariant: "物体输出逐通道等于入射光色乘反射率，uniform 写入正确 program",
  fault:
    "查询的是 object program 的 location，却在 lamp program current 时上传颜色",
  proof: "当前 program、uniform location/value、输入颜色和 framebuffer 取样",
  concepts: ["color", "light color", "object color"],
  stages: [
    {
      action: "冻结输入：color",
      resource:
        "lamp/object 两个 program 与各自颜色 uniform记录lightColor、objectColor、program 绑定和片段输出",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "当前 program、uniform location/value、输入颜色和 framebuffer 取样中的初始快照",
    },
    {
      action: "提交命令：color",
      resource: "分别绑定灯与物体 program，上传颜色并绘制光源代理和受光物体",
      result: "只改变与“color”相关的状态",
      observation:
        "当前 program、uniform location/value、输入颜色和 framebuffer 取样中的命令参数",
    },
    {
      action: "执行管线：light color",
      resource: "驱动/GPU 消费lightColor、objectColor、program 绑定和片段输出",
      result: "产生“light color”对应的中间结果",
      observation:
        "当前 program、uniform location/value、输入颜色和 framebuffer 取样中的首个可观测结果",
    },
    {
      action: "核对边界：light color",
      resource: "物体输出逐通道等于入射光色乘反射率，uniform 写入正确 program",
      result: "错误状态在继续传播前被定位",
      observation:
        "当前 program、uniform location/value、输入颜色和 framebuffer 取样中的差异定位",
    },
    {
      action: "保存交付：object color",
      resource:
        "当前 program、uniform location/value、输入颜色和 framebuffer 取样",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“物体输出逐通道等于入射光色乘反射率，uniform 写入正确 program”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“分别绑定灯与物体 program，上传颜色并绘制光源代理和受光物体”",
      expected:
        "lamp/object 两个 program 与各自颜色 uniform得到可复查结果，并持续满足“物体输出逐通道等于入射光色乘反射率，uniform 写入正确 program”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“查询的是 object program 的 location，却在 lamp program current 时上传颜色”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以当前 program、uniform location/value、输入颜色和 framebuffer 取样证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function ColorsContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function ColorsTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function ColorsFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
