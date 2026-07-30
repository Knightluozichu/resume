"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-27",
  title: "实例化、批次边界与每实例矩阵",
  task: "把共享 mesh 与 per-instance 偏移/mat4 属性分开，并用 divisor 控制推进频率",
  owner: "VAO 的逐顶点/逐实例属性与 instanced draw call",
  state:
    "instance count、attribute locations、stride/offset、divisor、gl_InstanceID 和矩阵",
  event: "上传实例数据，为每列配置 attribute+divisor，再调用 instanced draw",
  invariant:
    "mat4 四列占连续 location 且每列 divisor=1；instance count 不越过缓冲",
  fault: "只给 mat4 第一列设置 divisor，后三列每个顶点推进，实例矩阵被撕裂",
  proof:
    "VAO 属性/divisor 查询、instance buffer 大小、实例 ID、draw 参数与实例变换",
  concepts: [
    "instancing",
    "gldrawarraysinstanced",
    "gl_instanceid",
    "instanced array",
  ],
  stages: [
    {
      action: "冻结输入：instancing",
      resource:
        "VAO 的逐顶点/逐实例属性与 instanced draw call记录instance count、attribute locations、stride/offset、divisor、gl_InstanceID 和矩阵",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "VAO 属性/divisor 查询、instance buffer 大小、实例 ID、draw 参数与实例变换中的初始快照",
    },
    {
      action: "提交命令：gldrawarraysinstanced",
      resource:
        "上传实例数据，为每列配置 attribute+divisor，再调用 instanced draw",
      result: "只改变与“gldrawarraysinstanced”相关的状态",
      observation:
        "VAO 属性/divisor 查询、instance buffer 大小、实例 ID、draw 参数与实例变换中的命令参数",
    },
    {
      action: "执行管线：gldrawarraysinstanced",
      resource:
        "驱动/GPU 消费instance count、attribute locations、stride/offset、divisor、gl_InstanceID 和矩阵",
      result: "产生“gldrawarraysinstanced”对应的中间结果",
      observation:
        "VAO 属性/divisor 查询、instance buffer 大小、实例 ID、draw 参数与实例变换中的首个可观测结果",
    },
    {
      action: "核对边界：gl_instanceid",
      resource:
        "mat4 四列占连续 location 且每列 divisor=1；instance count 不越过缓冲",
      result: "错误状态在继续传播前被定位",
      observation:
        "VAO 属性/divisor 查询、instance buffer 大小、实例 ID、draw 参数与实例变换中的差异定位",
    },
    {
      action: "保存交付：instanced array",
      resource:
        "VAO 属性/divisor 查询、instance buffer 大小、实例 ID、draw 参数与实例变换",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“mat4 四列占连续 location 且每列 divisor=1；instance count 不越过缓冲”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“上传实例数据，为每列配置 attribute+divisor，再调用 instanced draw”",
      expected:
        "VAO 的逐顶点/逐实例属性与 instanced draw call得到可复查结果，并持续满足“mat4 四列占连续 location 且每列 divisor=1；instance count 不越过缓冲”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“只给 mat4 第一列设置 divisor，后三列每个顶点推进，实例矩阵被撕裂”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以VAO 属性/divisor 查询、instance buffer 大小、实例 ID、draw 参数与实例变换证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function InstancingContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function InstancingTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function InstancingFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
