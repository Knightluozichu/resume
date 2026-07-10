import type { ReviewQuestion } from "./types";

export const glsFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "gls-final-review-1",
    chapter: "gls-final-review",
    level: 1,
    question: `用一句话概括OpenGL编程实践核心。`,
    answer: `OpenGL是状态机+可编程管线：设置状态(VBO/VAO/着色器/纹理)后绘制，着色器控制顶点变换和片段着色，缓冲对象管理GPU数据，性能优化减少CPU-GPU通信。`,
    tags: ["总结"],
  },
  {
    id: "gls-final-review-2",
    chapter: "gls-final-review",
    level: 2,
    question: `着色器管线的完整流程？`,
    answer: `顶点着色器(MVP变换)→[曲面细分]→[几何着色器]→光栅化(图元→片段)→片段着色器(光照纹理)→深度/模板测试→混合→帧缓冲。顶点和片段着色器必需，其余可选。`,
    tags: ["着色器管线"],
  },
  {
    id: "gls-final-review-3",
    chapter: "gls-final-review",
    level: 3,
    question: `缓冲对象的类型和选择？`,
    answer: `VBO(顶点数据,STATIC/DYNAMIC/STREAM)、UBO(只读共享uniform)、SSBO(读写大数据)、PBO(异步像素传输)。按数据大小/访问模式/更新频率选择。持久映射实现零拷贝。`,
    tags: ["缓冲对象"],
  },
  {
    id: "gls-final-review-4",
    chapter: "gls-final-review",
    level: 4,
    question: `论述OpenGL性能优化的系统性策略。`,
    answer: `1)定位瓶颈(CPU Draw Call vs GPU着色/带宽) 2)CPU端:实例化/合批/间接绘制减少Draw Call 3)GPU端:简化着色器/Mipmap/Z-Prepass减少片段执行 4)带宽:纹理压缩/顶点压缩/帧缓冲压缩 5)并行:Compute Shader做GPU剔除/粒子更新 6)内存:持久映射零拷贝/纹理流式加载。核心是让GPU成为瓶颈而非CPU，然后针对性优化GPU瓶颈。`,
    tags: ["性能优化", "综合"],
  },
];
