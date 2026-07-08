import type { ReviewQuestion } from "./types";

/** 调试与性能分析 复习题 */
export const dogDebuggingToolsQuestions: ReviewQuestion[] = [
  {
    id: "dog-debugging-tools-1",
    chapter: "dog-debugging-tools",
    level: 1,
    question: "为什么 GL 程序出错常表现为黑屏而无异常？查着色器错误用什么？",
    answer: "GL 错误不抛异常只设错误码，着色器编译/链接失败也不主动报，只表现为画面黑屏。查编译错误用 getShaderInfoLog、链接错误用 getProgramInfoLog，每个 shader 编译、程序链接后必查。",
    tags: ["黑屏", "着色器日志"],
  },
  {
    id: "dog-debugging-tools-2",
    chapter: "dog-debugging-tools",
    level: 2,
    question: "glGetError 和 KHR_debug 有何不同？帧抓取器解决什么问题？",
    answer: "glGetError 主动轮询最近一次错误码，需手动调用；KHR_debug 设调试回调，错误发生即主动带详细消息通知，无需轮询。帧抓取器（Spector.js/RenderDoc）记录一帧所有 GL 调用，可逐 draw 回放查看顶点/纹理/uniform/管线状态/像素，解决「为什么这像素是这颜色、为什么这帧慢」等需看管线内部状态的问题。",
    tags: ["错误检查", "帧抓取"],
  },
  {
    id: "dog-debugging-tools-3",
    chapter: "dog-debugging-tools",
    level: 3,
    question: "画面黑屏但控制台无报错，应按什么清单排查？",
    answer: "按清单排查：getError 是否有错误码？着色器编译链接日志？VAO/VBO 绑定与属性指针是否正确？uniform 是否设定？viewport 与清屏是否正确？深度测试/混合状态是否合适？上下文是否丢失？最后用帧抓取器逐 draw 核对管线状态定位。",
    tags: ["黑屏排查", "清单"],
  },
  {
    id: "dog-debugging-tools-4",
    chapter: "dog-debugging-tools",
    level: 4,
    question: "如何找出渲染管线性能瓶颈？优化着色器却不提速说明什么？",
    answer: "用 GPU timer query 测 GPU 端真实耗时、CPU 端分段计时对比，定位瓶颈类型：顶点 bound（顶点多/顶点着色器重）、片元 bound（过度绘制/片元着色器重）、带宽 bound（纹理采样多）、CPU bound（draw call 多/状态切换频繁）。优化着色器却不提速说明瓶颈不在 GPU 着色计算，而在 CPU 或带宽，需先正确定位瓶颈类型再针对性优化。",
    tags: ["综合", "瓶颈定位", "timer query"],
  },
];
