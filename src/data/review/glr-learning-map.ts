import type { ReviewQuestion } from "./types";

export const glrLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "glr-learning-map-1",
    chapter: "glr-learning-map",
    level: 1,
    question: "OpenGL红宝书分哪四个板块？",
    answer: "基础(学习地图、OpenGL基础)、核心(着色器、几何、纹理)、高级(光照、帧缓冲、高级缓冲、现代实践)、复习(总复习)。",
    tags: ["全书结构"],
  },
  {
    id: "glr-learning-map-2",
    chapter: "glr-learning-map",
    level: 2,
    question: "为什么OpenGL是状态机模型？",
    answer: "通过设置状态(着色器、纹理、混合)影响后续绘制。所有绘制使用当前状态，改变状态有开销。理解状态机是高效编程基础。",
    tags: ["状态机"],
  },
  {
    id: "glr-learning-map-3",
    chapter: "glr-learning-map",
    level: 3,
    question: "现代OpenGL相比旧版有什么变化？",
    answer: "移除即时模式强制VBO/VAO；可编程管线替代固定功能；Core Profile移除废弃API。强调数据驱动和状态管理。",
    tags: ["现代OpenGL"],
  },
  {
    id: "glr-learning-map-4",
    chapter: "glr-learning-map",
    level: 4,
    question: "如何规划OpenGL学习路径？",
    answer: "1)上下文和状态机 2)VBO/VAO 3)着色器 4)纹理光照 5)帧缓冲高级 6)现代实践。每步配代码实践。",
    tags: ["学习路径"],
  },
];
