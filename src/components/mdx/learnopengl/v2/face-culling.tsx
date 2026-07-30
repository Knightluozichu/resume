"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-21",
  title: "面剔除、环绕方向与镜像变换",
  task: "由窗口空间 winding、front-face 约定和 cull mode 判断每个三角形是否提交光栅化",
  owner: "VAO 索引顺序、model 变换与 face-culling state",
  state: "顶点环绕、变换行列式符号、glFrontFace、glCullFace 和可见面",
  event: "变换三角形后判定正反面，再按 cull mode 丢弃指定朝向",
  invariant: "模型导出约定与 glFrontFace 一致；镜像变换时显式处理环绕翻转",
  fault: "model 含负缩放却仍按 CCW 为正面，整个镜像模型被剔除",
  proof: "索引三元组、屏幕坐标、有向面积、front/cull state 与剔除计数",
  concepts: ["face culling", "winding order", "front face"],
  stages: [
    {
      action: "冻结输入：face culling",
      resource:
        "VAO 索引顺序、model 变换与 face-culling state记录顶点环绕、变换行列式符号、glFrontFace、glCullFace 和可见面",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "索引三元组、屏幕坐标、有向面积、front/cull state 与剔除计数中的初始快照",
    },
    {
      action: "提交命令：face culling",
      resource: "变换三角形后判定正反面，再按 cull mode 丢弃指定朝向",
      result: "只改变与“face culling”相关的状态",
      observation:
        "索引三元组、屏幕坐标、有向面积、front/cull state 与剔除计数中的命令参数",
    },
    {
      action: "执行管线：winding order",
      resource:
        "驱动/GPU 消费顶点环绕、变换行列式符号、glFrontFace、glCullFace 和可见面",
      result: "产生“winding order”对应的中间结果",
      observation:
        "索引三元组、屏幕坐标、有向面积、front/cull state 与剔除计数中的首个可观测结果",
    },
    {
      action: "核对边界：winding order",
      resource: "模型导出约定与 glFrontFace 一致；镜像变换时显式处理环绕翻转",
      result: "错误状态在继续传播前被定位",
      observation:
        "索引三元组、屏幕坐标、有向面积、front/cull state 与剔除计数中的差异定位",
    },
    {
      action: "保存交付：front face",
      resource: "索引三元组、屏幕坐标、有向面积、front/cull state 与剔除计数",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“模型导出约定与 glFrontFace 一致；镜像变换时显式处理环绕翻转”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“变换三角形后判定正反面，再按 cull mode 丢弃指定朝向”",
      expected:
        "VAO 索引顺序、model 变换与 face-culling state得到可复查结果，并持续满足“模型导出约定与 glFrontFace 一致；镜像变换时显式处理环绕翻转”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“model 含负缩放却仍按 CCW 为正面，整个镜像模型被剔除”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以索引三元组、屏幕坐标、有向面积、front/cull state 与剔除计数证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function FaceCullingContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function FaceCullingTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function FaceCullingFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
