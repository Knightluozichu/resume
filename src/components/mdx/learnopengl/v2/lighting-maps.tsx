"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-12",
  title: "漫反射、镜面与自发光贴图",
  task: "用漫反射、镜面和可选自发光贴图逐片段驱动 Material 属性",
  owner: "材质 sampler、纹理单元与 mesh UV",
  state: "diffuse/specular/emission 纹理、unit 绑定、UV、采样值和光照贡献",
  event: "绑定多张贴图到固定 unit，设置 sampler，再按 UV 采样并参与光照",
  invariant: "每个 sampler 指向其约定 unit；镜面遮罩只缩放镜面项",
  fault: "diffuse 与 specular sampler 都指向 unit 0，金属边和木板得到同一反光",
  proof: "纹理对象/unit 表、sampler 值、UV、三张采样值与片段输出",
  concepts: ["diffuse map", "specular map", "sampler"],
  stages: [
    {
      action: "冻结输入：diffuse map",
      resource:
        "材质 sampler、纹理单元与 mesh UV记录diffuse/specular/emission 纹理、unit 绑定、UV、采样值和光照贡献",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "纹理对象/unit 表、sampler 值、UV、三张采样值与片段输出中的初始快照",
    },
    {
      action: "提交命令：diffuse map",
      resource: "绑定多张贴图到固定 unit，设置 sampler，再按 UV 采样并参与光照",
      result: "只改变与“diffuse map”相关的状态",
      observation:
        "纹理对象/unit 表、sampler 值、UV、三张采样值与片段输出中的命令参数",
    },
    {
      action: "执行管线：specular map",
      resource:
        "驱动/GPU 消费diffuse/specular/emission 纹理、unit 绑定、UV、采样值和光照贡献",
      result: "产生“specular map”对应的中间结果",
      observation:
        "纹理对象/unit 表、sampler 值、UV、三张采样值与片段输出中的首个可观测结果",
    },
    {
      action: "核对边界：specular map",
      resource: "每个 sampler 指向其约定 unit；镜面遮罩只缩放镜面项",
      result: "错误状态在继续传播前被定位",
      observation:
        "纹理对象/unit 表、sampler 值、UV、三张采样值与片段输出中的差异定位",
    },
    {
      action: "保存交付：sampler",
      resource: "纹理对象/unit 表、sampler 值、UV、三张采样值与片段输出",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“每个 sampler 指向其约定 unit；镜面遮罩只缩放镜面项”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“绑定多张贴图到固定 unit，设置 sampler，再按 UV 采样并参与光照”",
      expected:
        "材质 sampler、纹理单元与 mesh UV得到可复查结果，并持续满足“每个 sampler 指向其约定 unit；镜面遮罩只缩放镜面项”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“diffuse 与 specular sampler 都指向 unit 0，金属边和木板得到同一反光”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以纹理对象/unit 表、sampler 值、UV、三张采样值与片段输出证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function LightingMapsContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function LightingMapsTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function LightingMapsFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
