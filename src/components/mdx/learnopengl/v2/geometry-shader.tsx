"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-26",
  title: "几何着色器、图元扩增与坐标契约",
  task: "把 geometry shader 的输入图元、输出类型、EmitVertex/EndPrimitive 与 max_vertices 对齐",
  owner: "已链接 program 的 geometry stage 与每次 invocation",
  state: "输入 primitive、gl_in、输出 primitive、发射顶点、条带边界和坐标空间",
  event: "接收完整图元，修改/生成顶点，分段 EmitVertex 并 EndPrimitive",
  invariant:
    "每次 invocation 发射数不超过 max_vertices，输入输出 layout 与 draw primitive 匹配",
  fault:
    "声明输入 points 却用 GL_TRIANGLES 绘制，geometry invocation 合同不匹配",
  proof:
    "program resource 查询、输入图元、发射序列、primitive count、链接日志与输出",
  concepts: ["geometry shader", "emitvertex", "endprimitive", "exploding"],
  stages: [
    {
      action: "冻结输入：geometry shader",
      resource:
        "已链接 program 的 geometry stage 与每次 invocation记录输入 primitive、gl_in、输出 primitive、发射顶点、条带边界和坐标空间",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "program resource 查询、输入图元、发射序列、primitive count、链接日志与输出中的初始快照",
    },
    {
      action: "提交命令：emitvertex",
      resource: "接收完整图元，修改/生成顶点，分段 EmitVertex 并 EndPrimitive",
      result: "只改变与“emitvertex”相关的状态",
      observation:
        "program resource 查询、输入图元、发射序列、primitive count、链接日志与输出中的命令参数",
    },
    {
      action: "执行管线：emitvertex",
      resource:
        "驱动/GPU 消费输入 primitive、gl_in、输出 primitive、发射顶点、条带边界和坐标空间",
      result: "产生“emitvertex”对应的中间结果",
      observation:
        "program resource 查询、输入图元、发射序列、primitive count、链接日志与输出中的首个可观测结果",
    },
    {
      action: "核对边界：endprimitive",
      resource:
        "每次 invocation 发射数不超过 max_vertices，输入输出 layout 与 draw primitive 匹配",
      result: "错误状态在继续传播前被定位",
      observation:
        "program resource 查询、输入图元、发射序列、primitive count、链接日志与输出中的差异定位",
    },
    {
      action: "保存交付：exploding",
      resource:
        "program resource 查询、输入图元、发射序列、primitive count、链接日志与输出",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“每次 invocation 发射数不超过 max_vertices，输入输出 layout 与 draw primitive 匹配”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“接收完整图元，修改/生成顶点，分段 EmitVertex 并 EndPrimitive”",
      expected:
        "已链接 program 的 geometry stage 与每次 invocation得到可复查结果，并持续满足“每次 invocation 发射数不超过 max_vertices，输入输出 layout 与 draw primitive 匹配”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“声明输入 points 却用 GL_TRIANGLES 绘制，geometry invocation 合同不匹配”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以program resource 查询、输入图元、发射序列、primitive count、链接日志与输出证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function GeometryShaderContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function GeometryShaderTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function GeometryShaderFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
