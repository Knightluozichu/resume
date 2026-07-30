"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-07",
  title: "坐标空间、MVP 与透视投影",
  task: "沿 model→world→view→clip→NDC→viewport 追踪一个顶点并核对透视参数",
  owner: "model/view/projection 三矩阵与固定功能 viewport/depth 映射",
  state: "对象姿态、相机坐标、frustum、clip.w、NDC 和窗口深度",
  event: "更新 MVP，执行透视除法，并把 NDC 映射到 framebuffer viewport",
  invariant: "所有矩阵使用同一坐标/手性约定，aspect 来自当前 framebuffer 宽高",
  fault: "窗口横向放大后 projection 仍用旧 aspect，圆形被拉成椭圆",
  proof: "五空间坐标、clip.w、NDC、viewport、深度值与基准截图",
  concepts: ["model matrix", "view matrix", "projection matrix", "perspective"],
  stages: [
    {
      action: "冻结输入：model matrix",
      resource:
        "model/view/projection 三矩阵与固定功能 viewport/depth 映射记录对象姿态、相机坐标、frustum、clip.w、NDC 和窗口深度",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "五空间坐标、clip.w、NDC、viewport、深度值与基准截图中的初始快照",
    },
    {
      action: "提交命令：view matrix",
      resource: "更新 MVP，执行透视除法，并把 NDC 映射到 framebuffer viewport",
      result: "只改变与“view matrix”相关的状态",
      observation:
        "五空间坐标、clip.w、NDC、viewport、深度值与基准截图中的命令参数",
    },
    {
      action: "执行管线：view matrix",
      resource:
        "驱动/GPU 消费对象姿态、相机坐标、frustum、clip.w、NDC 和窗口深度",
      result: "产生“view matrix”对应的中间结果",
      observation:
        "五空间坐标、clip.w、NDC、viewport、深度值与基准截图中的首个可观测结果",
    },
    {
      action: "核对边界：projection matrix",
      resource:
        "所有矩阵使用同一坐标/手性约定，aspect 来自当前 framebuffer 宽高",
      result: "错误状态在继续传播前被定位",
      observation:
        "五空间坐标、clip.w、NDC、viewport、深度值与基准截图中的差异定位",
    },
    {
      action: "保存交付：perspective",
      resource: "五空间坐标、clip.w、NDC、viewport、深度值与基准截图",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“所有矩阵使用同一坐标/手性约定，aspect 来自当前 framebuffer 宽高”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“更新 MVP，执行透视除法，并把 NDC 映射到 framebuffer viewport”",
      expected:
        "model/view/projection 三矩阵与固定功能 viewport/depth 映射得到可复查结果，并持续满足“所有矩阵使用同一坐标/手性约定，aspect 来自当前 framebuffer 宽高”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“窗口横向放大后 projection 仍用旧 aspect，圆形被拉成椭圆”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以五空间坐标、clip.w、NDC、viewport、深度值与基准截图证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function CoordinateSystemsContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function CoordinateSystemsTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function CoordinateSystemsFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
