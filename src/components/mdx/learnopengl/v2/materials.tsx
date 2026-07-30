"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-11",
  title: "Material/Light 结构体与 Phong 材质预设",
  task: "把 Material 与 Light 结构体字段逐项上传并观察 shininess 对高光形状的作用",
  owner: "当前 lighting program 的 Material/Light uniform 集",
  state: "ambient/diffuse/specular、shininess、光源三分量和 uniform location",
  event: "选择材质预设，上传结构体字段并绘制同一几何体",
  invariant:
    "每个字段写入当前 program 的有效 location，shininess 只改变镜面指数",
  fault:
    "缓存另一个 program 的 location 后复用，材质字段静默写到 -1 或错误位置",
  proof: "program ID、active uniforms、材质输入、三项光照值与高光像素分布",
  concepts: ["material", "shininess", "light properties"],
  stages: [
    {
      action: "冻结输入：material",
      resource:
        "当前 lighting program 的 Material/Light uniform 集记录ambient/diffuse/specular、shininess、光源三分量和 uniform location",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "program ID、active uniforms、材质输入、三项光照值与高光像素分布中的初始快照",
    },
    {
      action: "提交命令：material",
      resource: "选择材质预设，上传结构体字段并绘制同一几何体",
      result: "只改变与“material”相关的状态",
      observation:
        "program ID、active uniforms、材质输入、三项光照值与高光像素分布中的命令参数",
    },
    {
      action: "执行管线：shininess",
      resource:
        "驱动/GPU 消费ambient/diffuse/specular、shininess、光源三分量和 uniform location",
      result: "产生“shininess”对应的中间结果",
      observation:
        "program ID、active uniforms、材质输入、三项光照值与高光像素分布中的首个可观测结果",
    },
    {
      action: "核对边界：shininess",
      resource:
        "每个字段写入当前 program 的有效 location，shininess 只改变镜面指数",
      result: "错误状态在继续传播前被定位",
      observation:
        "program ID、active uniforms、材质输入、三项光照值与高光像素分布中的差异定位",
    },
    {
      action: "保存交付：light properties",
      resource:
        "program ID、active uniforms、材质输入、三项光照值与高光像素分布",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“每个字段写入当前 program 的有效 location，shininess 只改变镜面指数”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“选择材质预设，上传结构体字段并绘制同一几何体”",
      expected:
        "当前 lighting program 的 Material/Light uniform 集得到可复查结果，并持续满足“每个字段写入当前 program 的有效 location，shininess 只改变镜面指数”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“缓存另一个 program 的 location 后复用，材质字段静默写到 -1 或错误位置”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以program ID、active uniforms、材质输入、三项光照值与高光像素分布证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function MaterialsContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function MaterialsTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function MaterialsFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
