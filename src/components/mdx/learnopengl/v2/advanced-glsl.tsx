"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-25",
  title: "高级 GLSL、UBO 与 std140 对齐",
  task: "验证 GLSL 接口块、gl_PointSize、内建变量与 std140 UBO 的跨 program 共享布局",
  owner: "shader interface、uniform block 与绑定点",
  state:
    "block index/binding、std140 offset/stride、CPU 字节布局和多个 program 的引用",
  event: "查询 block，绑定到同一 UBO binding point，按规范 offset 写入矩阵",
  invariant:
    "CPU 写入 offset 来自 std140 规则或驱动查询，不假定 C++ struct 紧密布局",
  fault:
    "把 vec3 后的 float 写在 offset 12，但 std140 中下一成员按 16 字节边界开始",
  proof:
    "active block、uniform offsets/strides、binding、buffer bytes 与多 program 输出",
  concepts: [
    "gl_pointsize",
    "interface block",
    "uniform buffer object",
    "std140",
  ],
  stages: [
    {
      action: "冻结输入：gl_pointsize",
      resource:
        "shader interface、uniform block 与绑定点记录block index/binding、std140 offset/stride、CPU 字节布局和多个 program 的引用",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "active block、uniform offsets/strides、binding、buffer bytes 与多 program 输出中的初始快照",
    },
    {
      action: "提交命令：interface block",
      resource:
        "查询 block，绑定到同一 UBO binding point，按规范 offset 写入矩阵",
      result: "只改变与“interface block”相关的状态",
      observation:
        "active block、uniform offsets/strides、binding、buffer bytes 与多 program 输出中的命令参数",
    },
    {
      action: "执行管线：interface block",
      resource:
        "驱动/GPU 消费block index/binding、std140 offset/stride、CPU 字节布局和多个 program 的引用",
      result: "产生“interface block”对应的中间结果",
      observation:
        "active block、uniform offsets/strides、binding、buffer bytes 与多 program 输出中的首个可观测结果",
    },
    {
      action: "核对边界：uniform buffer object",
      resource:
        "CPU 写入 offset 来自 std140 规则或驱动查询，不假定 C++ struct 紧密布局",
      result: "错误状态在继续传播前被定位",
      observation:
        "active block、uniform offsets/strides、binding、buffer bytes 与多 program 输出中的差异定位",
    },
    {
      action: "保存交付：std140",
      resource:
        "active block、uniform offsets/strides、binding、buffer bytes 与多 program 输出",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“CPU 写入 offset 来自 std140 规则或驱动查询，不假定 C++ struct 紧密布局”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“查询 block，绑定到同一 UBO binding point，按规范 offset 写入矩阵”",
      expected:
        "shader interface、uniform block 与绑定点得到可复查结果，并持续满足“CPU 写入 offset 来自 std140 规则或驱动查询，不假定 C++ struct 紧密布局”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“把 vec3 后的 float 写在 offset 12，但 std140 中下一成员按 16 字节边界开始”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以active block、uniform offsets/strides、binding、buffer bytes 与多 program 输出证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function AdvancedGlslContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function AdvancedGlslTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function AdvancedGlslFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
