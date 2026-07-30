"use client";

import { OpenGlStateLab, type OpenGlStateModel } from "./opengl-state-lab";

const model = {
  unitId: "logl-01+logl-02",
  title: "OpenGL 窗口、上下文与渲染循环",
  task: "从 GLFW 窗口、当前 OpenGL context、GLAD 入口到 viewport、清屏与交换缓冲跑通第一帧",
  owner: "当前线程绑定的 GLFWwindow 与 OpenGL context",
  state: "context 版本、入口地址、framebuffer 尺寸、viewport 和前后缓冲",
  event: "创建 3.3 Core context，加载入口并执行 clear→swap→poll",
  invariant:
    "任何 GL 命令前 context 已经 current；viewport 与 framebuffer 像素尺寸一致",
  fault: "窗口缩放后仍沿用旧 viewport，画面只占 framebuffer 一角",
  proof:
    "GL_VERSION、窗口/上下文指针、framebuffer 尺寸、viewport、glGetError 与首帧截图",
  concepts: [
    "opengl specification",
    "glfw",
    "glad",
    "context",
    "window",
    "viewport",
    "render loop",
    "input",
  ],
  stages: [
    {
      action: "冻结输入：opengl specification",
      resource:
        "当前线程绑定的 GLFWwindow 与 OpenGL context记录context 版本、入口地址、framebuffer 尺寸、viewport 和前后缓冲",
      result: "得到可重复的初始 GL 状态与资源身份",
      observation:
        "GL_VERSION、窗口/上下文指针、framebuffer 尺寸、viewport、glGetError 与首帧截图中的初始快照",
    },
    {
      action: "提交命令：glad",
      resource: "创建 3.3 Core context，加载入口并执行 clear→swap→poll",
      result: "只改变与“glad”相关的状态",
      observation:
        "GL_VERSION、窗口/上下文指针、framebuffer 尺寸、viewport、glGetError 与首帧截图中的命令参数",
    },
    {
      action: "执行管线：context",
      resource:
        "驱动/GPU 消费context 版本、入口地址、framebuffer 尺寸、viewport 和前后缓冲",
      result: "产生“context”对应的中间结果",
      observation:
        "GL_VERSION、窗口/上下文指针、framebuffer 尺寸、viewport、glGetError 与首帧截图中的首个可观测结果",
    },
    {
      action: "核对边界：viewport",
      resource:
        "任何 GL 命令前 context 已经 current；viewport 与 framebuffer 像素尺寸一致",
      result: "错误状态在继续传播前被定位",
      observation:
        "GL_VERSION、窗口/上下文指针、framebuffer 尺寸、viewport、glGetError 与首帧截图中的差异定位",
    },
    {
      action: "保存交付：input",
      resource:
        "GL_VERSION、窗口/上下文指针、framebuffer 尺寸、viewport、glGetError 与首帧截图",
      result: "同输入重放得到同状态与同像素结果",
      observation:
        "以“任何 GL 命令前 context 已经 current；viewport 与 framebuffer 像素尺寸一致”判定通过",
    },
  ],
  scenarios: [
    {
      label: "基线帧",
      input:
        "固定 context、资源内容与输入事件，执行“创建 3.3 Core context，加载入口并执行 clear→swap→poll”",
      expected:
        "当前线程绑定的 GLFWwindow 与 OpenGL context得到可复查结果，并持续满足“任何 GL 命令前 context 已经 current；viewport 与 framebuffer 像素尺寸一致”",
    },
    {
      label: "单故障帧",
      input:
        "保持其余输入不变，仅注入“窗口缩放后仍沿用旧 viewport，画面只占 framebuffer 一角”",
      expected:
        "保存首个状态/资源/像素分岔；清理后以GL_VERSION、窗口/上下文指针、framebuffer 尺寸、viewport、glGetError 与首帧截图证明恢复",
    },
  ],
} satisfies OpenGlStateModel;

export function HelloWindowContractLab() {
  return <OpenGlStateLab model={model} view="contract" />;
}

export function HelloWindowTraceLab() {
  return <OpenGlStateLab model={model} view="trace" />;
}

export function HelloWindowFaultLab() {
  return <OpenGlStateLab model={model} view="fault" />;
}
