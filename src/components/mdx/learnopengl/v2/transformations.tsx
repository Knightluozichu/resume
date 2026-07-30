"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-06",
  title: "矩阵变换、齐次坐标与组合顺序",
  task: "用齐次矩阵明确缩放、旋转、平移的组合顺序并把同一矩阵上传给 shader",
  owner: "CPU 侧 GLM 矩阵与 program 的 transform uniform",
  state: "列向量约定、矩阵乘积、角度单位、uniform location 和变换后坐标",
  event: "构造 T·R·S，上传 mat4，再由顶点着色器计算 clip-space position",
  invariant: "同一向量约定下，最右侧变换先作用；CPU 与 GLSL 的矩阵布局约定一致",
  fault: "把 T·R 写成 R·T，物体绕世界原点公转而不是原地自转",
  proof: "输入点、各矩阵、乘法顺序、uniform 值、clip 坐标与屏幕位置",
  concepts: ["transformation", "matrix", "glm", "homogeneous"],
  stages: [
    {
      action: "冻结输入：transformation",
      resource:
        "CPU 侧 GLM 矩阵与 program 的 transform uniform记录列向量约定、矩阵乘积、角度单位、uniform location 和变换后坐标",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "输入点、各矩阵、乘法顺序、uniform 值、clip 坐标与屏幕位置中的初始快照",
    },
    {
      action: "提交命令：matrix",
      resource: "构造 T·R·S，上传 mat4，再由顶点着色器计算 clip-space position",
      result: "只改变与“matrix”相关的状态",
      observation:
        "输入点、各矩阵、乘法顺序、uniform 值、clip 坐标与屏幕位置中的命令参数",
    },
    {
      action: "执行管线：matrix",
      resource:
        "驱动/GPU 消费列向量约定、矩阵乘积、角度单位、uniform location 和变换后坐标",
      result: "产生“matrix”对应的中间结果",
      observation:
        "输入点、各矩阵、乘法顺序、uniform 值、clip 坐标与屏幕位置中的首个可观测结果",
    },
    {
      action: "核对边界：glm",
      resource:
        "同一向量约定下，最右侧变换先作用；CPU 与 GLSL 的矩阵布局约定一致",
      result: "错误状态在继续传播前被定位",
      observation:
        "输入点、各矩阵、乘法顺序、uniform 值、clip 坐标与屏幕位置中的差异定位",
    },
    {
      action: "保存交付：homogeneous",
      resource: "输入点、各矩阵、乘法顺序、uniform 值、clip 坐标与屏幕位置",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“同一向量约定下，最右侧变换先作用；CPU 与 GLSL 的矩阵布局约定一致”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“构造 T·R·S，上传 mat4，再由顶点着色器计算 clip-space position”",
      expected:
        "CPU 侧 GLM 矩阵与 program 的 transform uniform得到可复查结果，并持续满足“同一向量约定下，最右侧变换先作用；CPU 与 GLSL 的矩阵布局约定一致”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“把 T·R 写成 R·T，物体绕世界原点公转而不是原地自转”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以输入点、各矩阵、乘法顺序、uniform 值、clip 坐标与屏幕位置证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function TransformationsContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function TransformationsTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function TransformationsFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
