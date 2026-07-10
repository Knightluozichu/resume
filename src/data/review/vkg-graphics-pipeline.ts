import type { ReviewQuestion } from "./types";

/** 图形管线 复习题 */
export const vkgGraphicsPipelineQuestions: ReviewQuestion[] = [
  {
    id: "vkg-graphics-pipeline-1",
    chapter: "vkg-graphics-pipeline",
    level: 1,
    question: `Vulkan 图形管线的主要阶段有哪些？哪些是可编程的？`,
    answer: `主要阶段：顶点输入、输入装配、顶点着色器、曲面细分（可选）、几何着色器（可选）、光栅化、片段着色器、颜色混合。可编程阶段是顶点着色器、曲面细分、几何着色器和片段着色器，其余为固定功能阶段。`,
    tags: ["管线阶段"],
  },
  {
    id: "vkg-graphics-pipeline-2",
    chapter: "vkg-graphics-pipeline",
    level: 2,
    question: `Vulkan 的不可变管线设计相比 OpenGL 状态机有什么优劣？`,
    answer: `优势：驱动无需在绘制时验证状态组合，绑定开销极低；状态切换可预测，性能稳定；便于多线程并行创建。劣势：创建开销大（需编译着色器并验证全部状态）；状态组合多时需创建大量管线对象；灵活性不如 OpenGL 的即时状态修改。`,
    tags: ["管线设计", "对比"],
  },
  {
    id: "vkg-graphics-pipeline-3",
    chapter: "vkg-graphics-pipeline",
    level: 3,
    question: `什么是动态状态？什么情况下应该使用它？`,
    answer: `动态状态允许在绘制命令录制时设置某些管线状态（如 viewport、scissor），无需重建管线。当某个状态频繁变化而其他状态不变时使用，最典型的是窗口尺寸变化时的 viewport/scissor。将其设为动态状态后用 vkCmdSetViewport 在录制时设置，避免每次 resize 重建管线。`,
    tags: ["动态状态", "viewport"],
  },
  {
    id: "vkg-graphics-pipeline-4",
    chapter: "vkg-graphics-pipeline",
    level: 4,
    question: `管线布局（Pipeline Layout）和渲染通道（Render Pass）在管线创建中各起什么作用？`,
    answer: `管线布局定义着色器访问资源的接口——由描述符集布局和推送常量范围组成，告诉驱动着色器需要哪些 uniform 缓冲、纹理和存储缓冲。渲染通道定义渲染目标的格式和附件结构，是 framebuffer 和 pipeline 的桥梁。管线创建时必须同时引用这两者，因为驱动需要知道着色器资源绑定方式和输出附件格式才能编译管线。`,
    tags: ["管线布局", "渲染通道", "资源绑定"],
  },
];
