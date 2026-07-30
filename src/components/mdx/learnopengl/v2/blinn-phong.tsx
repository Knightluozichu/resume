"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-29",
  title: "高级光照、Blinn-Phong 与镜面截断边界",
  task: "对比 Phong 反射向量与 Blinn halfway vector，观察视角掠过反射面时的高光边界",
  owner: "fragment shader 的 specular 分支与归一化方向向量",
  state: "normal/light/view、reflectDir/halfwayDir、指数和镜面贡献",
  event: "切换模型，计算 dot(V,R) 或 dot(N,H) 后取幂并累加高光",
  invariant: "所有方向归一且指数为非负；模型切换只改变镜面几何项",
  fault: "未归一化 L+V 就当 halfway vector，距离变化也改变高光强度",
  proof: "输入向量长度、点积、指数、两模型镜面值与掠射角像素曲线",
  concepts: ["blinn-phong", "halfway vector", "gamma"],
  stages: [
    {
      action: "冻结输入：blinn-phong",
      resource:
        "fragment shader 的 specular 分支与归一化方向向量记录normal/light/view、reflectDir/halfwayDir、指数和镜面贡献",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "输入向量长度、点积、指数、两模型镜面值与掠射角像素曲线中的初始快照",
    },
    {
      action: "提交命令：blinn-phong",
      resource: "切换模型，计算 dot(V,R) 或 dot(N,H) 后取幂并累加高光",
      result: "只改变与“blinn-phong”相关的状态",
      observation:
        "输入向量长度、点积、指数、两模型镜面值与掠射角像素曲线中的命令参数",
    },
    {
      action: "执行管线：halfway vector",
      resource:
        "驱动/GPU 消费normal/light/view、reflectDir/halfwayDir、指数和镜面贡献",
      result: "产生“halfway vector”对应的中间结果",
      observation:
        "输入向量长度、点积、指数、两模型镜面值与掠射角像素曲线中的首个可观测结果",
    },
    {
      action: "核对边界：halfway vector",
      resource: "所有方向归一且指数为非负；模型切换只改变镜面几何项",
      result: "错误状态在继续传播前被定位",
      observation:
        "输入向量长度、点积、指数、两模型镜面值与掠射角像素曲线中的差异定位",
    },
    {
      action: "保存交付：gamma",
      resource: "输入向量长度、点积、指数、两模型镜面值与掠射角像素曲线",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“所有方向归一且指数为非负；模型切换只改变镜面几何项”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“切换模型，计算 dot(V,R) 或 dot(N,H) 后取幂并累加高光”",
      expected:
        "fragment shader 的 specular 分支与归一化方向向量得到可复查结果，并持续满足“所有方向归一且指数为非负；模型切换只改变镜面几何项”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“未归一化 L+V 就当 halfway vector，距离变化也改变高光强度”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以输入向量长度、点积、指数、两模型镜面值与掠射角像素曲线证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function BlinnPhongContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function BlinnPhongTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function BlinnPhongFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
