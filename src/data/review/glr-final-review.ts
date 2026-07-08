import type { ReviewQuestion } from "./types";

export const glrFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "glr-final-review-1",
    chapter: "glr-final-review",
    level: 1,
    question: "用一句话概括OpenGL编程核心。",
    answer: "OpenGL是状态机：设置状态(着色器/纹理/混合)后绘制，所有绘制使用当前状态。现代OpenGL用VBO/VAO/EBO+着色器实现可编程管线。",
    tags: ["总结"],
  },
  {
    id: "glr-final-review-2",
    chapter: "glr-final-review",
    level: 2,
    question: "VBO/VAO/EBO如何协作？",
    answer: "VBO存顶点数据，VAO封装属性配置(如何从VBO读取)，EBO存索引。绘制时绑VAO用EBO索引引用VBO顶点。",
    tags: ["VBO", "VAO", "EBO"],
  },
  {
    id: "glr-final-review-3",
    chapter: "glr-final-review",
    level: 3,
    question: "现代OpenGL性能优化关键策略？",
    answer: "实例化减少Draw Call、合批减少状态切换、间接绘制减少CPU-GPU通信、持久映射零拷贝、Mipmap减少纹理带宽、Early-Z减少片段执行。",
    tags: ["性能优化"],
  },
  {
    id: "glr-final-review-4",
    chapter: "glr-final-review",
    level: 4,
    question: "论述OpenGL从固定管线到可编程管线的演进及影响。",
    answer: "固定管线：OpenGL设置状态(光照/纹理坐标生成)GPU按固定算法处理。可编程管线：开发者写GLSL着色器完全控制每个顶点/片段处理。影响：1)灵活性强(自定义光照/后处理) 2)固定功能API被移除(Core Profile) 3)学习曲线更陡 4)性能优化从状态管理转向着色器优化 5)催生了GPGPU(计算着色器)。这是图形API从「配置」到「编程」的范式转变。",
    tags: ["固定管线", "可编程管线", "演进"],
  },
];
