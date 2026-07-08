import type { ReviewQuestion } from "./types";

export const glrGeometryQuestions: ReviewQuestion[] = [
  {
    id: "glr-geometry-1",
    chapter: "glr-geometry",
    level: 1,
    question: "VBO和VAO的区别？",
    answer: "VBO存储实际顶点数据，VAO存储属性配置。一个VAO可绑多个VBO。绘制时只绑VAO配置自动恢复。",
    tags: ["VBO", "VAO"],
  },
  {
    id: "glr-geometry-2",
    chapter: "glr-geometry",
    level: 2,
    question: "为什么用EBO？",
    answer: "用索引引用顶点避免重复。立方体24顶点替代36顶点减少数据量。",
    tags: ["EBO"],
  },
  {
    id: "glr-geometry-3",
    chapter: "glr-geometry",
    level: 3,
    question: "交织布局vs分离布局？",
    answer: "交织(所有属性同数组)通常缓存友好。分离在只访问某属性时好。现代GPU交织通常更优。",
    tags: ["顶点布局"],
  },
  {
    id: "glr-geometry-4",
    chapter: "glr-geometry",
    level: 4,
    question: "如何优化顶点数据布局？",
    answer: "4字节对齐、交织布局提升缓存、vec3后padding对齐vec4、静态数据STATIC_DRAW、压缩顶点格式减带宽。",
    tags: ["顶点优化"],
  },
];
