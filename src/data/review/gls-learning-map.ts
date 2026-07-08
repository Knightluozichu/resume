import type { ReviewQuestion } from "./types";

export const glsLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "gls-learning-map-1",
    chapter: "gls-learning-map",
    level: 1,
    question: "OpenGL超级宝书分哪四个板块？",
    answer: "基础(学习地图、第一个程序)、核心(着色器管线、顶点处理)、高级(片段着色、纹理映射、缓冲对象、几何着色器、性能)、复习(总复习)。",
    tags: ["全书结构"],
  },
  {
    id: "gls-learning-map-2",
    chapter: "gls-learning-map",
    level: 2,
    question: "超级宝书相比红宝书更侧重什么？",
    answer: "更侧重实践和工程——从第一个程序开始，逐步深入着色器管线、缓冲管理、性能优化。红宝书更偏API参考，超级宝书更偏教程式实践。",
    tags: ["对比"],
  },
  {
    id: "gls-learning-map-3",
    chapter: "gls-learning-map",
    level: 3,
    question: "超级宝书的学习主线是什么？",
    answer: "从第一个OpenGL程序出发→理解着色器管线→顶点处理→片段着色→纹理映射→缓冲对象→几何着色器→性能优化。实践驱动，每章配完整代码。",
    tags: ["学习主线"],
  },
  {
    id: "gls-learning-map-4",
    chapter: "gls-learning-map",
    level: 4,
    question: "如何高效使用超级宝书学习？",
    answer: "1)跟着第一个程序搭建环境 2)逐章实现示例代码 3)理解每个技术背后的管线阶段 4)性能章节作为进阶 5)结合红宝书查API细节。实践为主理论为辅。",
    tags: ["学习方法"],
  },
];
