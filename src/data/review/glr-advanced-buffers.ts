import type { ReviewQuestion } from "./types";

export const glrAdvancedBuffersQuestions: ReviewQuestion[] = [
  {
    id: "glr-advanced-buffers-1",
    chapter: "glr-advanced-buffers",
    level: 1,
    question: `UBO是什么？有什么优势？`,
    answer: `Uniform缓冲对象，让多个着色器程序共享同一组uniform数据。优势：避免每个程序重复设置uniform、可存更多数据、跨程序共享。`,
    tags: ["UBO"],
  },
  {
    id: "glr-advanced-buffers-2",
    chapter: "glr-advanced-buffers",
    level: 2,
    question: `SSBO和UBO的区别？`,
    answer: `SSBO可读写随机访问、大小无限制、适合计算着色器。UBO只读、有大小限制(64KB)、适合共享变换矩阵等常量。`,
    tags: ["SSBO", "UBO"],
  },
  {
    id: "glr-advanced-buffers-3",
    chapter: "glr-advanced-buffers",
    level: 3,
    question: `什么是Transform Feedback？`,
    answer: `捕获顶点着色器输出到缓冲区而不经过光栅化。用于GPU粒子系统：在顶点着色器中更新粒子位置并捕获，下一帧用作输入。`,
    tags: ["Transform Feedback"],
  },
  {
    id: "glr-advanced-buffers-4",
    chapter: "glr-advanced-buffers",
    level: 4,
    question: `如何用SSBO实现GPU粒子系统？`,
    answer: `粒子位置/速度存SSBO，计算着色器更新，Transform Feedback或顶点着色器渲染。CPU只设参数不参与粒子计算，完全GPU驱动。`,
    tags: ["GPU粒子", "SSBO"],
  },
];
