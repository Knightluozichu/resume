import type { ReviewQuestion } from "./types";

export const glrOpenglBasicsQuestions: ReviewQuestion[] = [
  {
    id: "glr-opengl-basics-1",
    chapter: "glr-opengl-basics",
    level: 1,
    question: "什么是OpenGL上下文？",
    answer: "OpenGL状态集合，包含当前着色器、纹理、缓冲区等所有状态。所有操作在当前上下文中进行。",
    tags: ["上下文"],
  },
  {
    id: "glr-opengl-basics-2",
    chapter: "glr-opengl-basics",
    level: 2,
    question: "OpenGL初始化流程？",
    answer: "GLFW初始化→设置版本→创建窗口→GLAD加载→设置视口→渲染循环(清空→绘制→交换)。",
    tags: ["初始化"],
  },
  {
    id: "glr-opengl-basics-3",
    chapter: "glr-opengl-basics",
    level: 3,
    question: "为什么macOS需要FORWARD_COMPAT？",
    answer: "macOS OpenGL只支持Core Profile且要求前向兼容。FORWARD_COMPAT移除废弃功能确保创建3.3+上下文。",
    tags: ["macOS"],
  },
  {
    id: "glr-opengl-basics-4",
    chapter: "glr-opengl-basics",
    level: 4,
    question: "状态机模型对性能优化的启示？",
    answer: "状态切换有开销。相同状态物体应批量绘制。将纹理/着色器按相似性排序减少切换。",
    tags: ["状态机", "性能"],
  },
];
