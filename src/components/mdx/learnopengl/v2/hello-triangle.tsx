"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-03",
  title: "从顶点数据到第一个三角形",
  task: "把顶点字节、VAO 属性解释和已链接 program 接成一次可解释的三角形 draw call",
  owner:
    "当前 VAO、GL_ARRAY_BUFFER/GL_ELEMENT_ARRAY_BUFFER 绑定与 shader program",
  state: "顶点字节、stride/offset、属性启用位、program 链接状态和图元输入",
  event:
    "上传 VBO，记录 VAO 属性合同，绑定 program 后调用 glDrawArrays/glDrawElements",
  invariant:
    "shader 读取的每个 location 都由当前 VAO 以同类型、同宽度和正确步长供给",
  fault:
    "position 实际是 3 个 float，却把 stride 写成 5 个 float，第二个顶点起始地址错位",
  proof: "编译/链接日志、buffer 字节、VAO 属性查询、GL 错误与 framebuffer 像素",
  concepts: [
    "vertex buffer object",
    "vertex array object",
    "shader program",
    "triangle",
  ],
  stages: [
    {
      action: "冻结输入：vertex buffer object",
      resource:
        "当前 VAO、GL_ARRAY_BUFFER/GL_ELEMENT_ARRAY_BUFFER 绑定与 shader program记录顶点字节、stride/offset、属性启用位、program 链接状态和图元输入",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "编译/链接日志、buffer 字节、VAO 属性查询、GL 错误与 framebuffer 像素中的初始快照",
    },
    {
      action: "提交命令：vertex array object",
      resource:
        "上传 VBO，记录 VAO 属性合同，绑定 program 后调用 glDrawArrays/glDrawElements",
      result: "只改变与“vertex array object”相关的状态",
      observation:
        "编译/链接日志、buffer 字节、VAO 属性查询、GL 错误与 framebuffer 像素中的命令参数",
    },
    {
      action: "执行管线：vertex array object",
      resource:
        "驱动/GPU 消费顶点字节、stride/offset、属性启用位、program 链接状态和图元输入",
      result: "产生“vertex array object”对应的中间结果",
      observation:
        "编译/链接日志、buffer 字节、VAO 属性查询、GL 错误与 framebuffer 像素中的首个可观测结果",
    },
    {
      action: "核对边界：shader program",
      resource:
        "shader 读取的每个 location 都由当前 VAO 以同类型、同宽度和正确步长供给",
      result: "错误状态在继续传播前被定位",
      observation:
        "编译/链接日志、buffer 字节、VAO 属性查询、GL 错误与 framebuffer 像素中的差异定位",
    },
    {
      action: "保存交付：triangle",
      resource:
        "编译/链接日志、buffer 字节、VAO 属性查询、GL 错误与 framebuffer 像素",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“shader 读取的每个 location 都由当前 VAO 以同类型、同宽度和正确步长供给”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“上传 VBO，记录 VAO 属性合同，绑定 program 后调用 glDrawArrays/glDrawElements”",
      expected:
        "当前 VAO、GL_ARRAY_BUFFER/GL_ELEMENT_ARRAY_BUFFER 绑定与 shader program得到可复查结果，并持续满足“shader 读取的每个 location 都由当前 VAO 以同类型、同宽度和正确步长供给”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“position 实际是 3 个 float，却把 stride 写成 5 个 float，第二个顶点起始地址错位”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以编译/链接日志、buffer 字节、VAO 属性查询、GL 错误与 framebuffer 像素证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function HelloTriangleContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function HelloTriangleTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function HelloTriangleFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
