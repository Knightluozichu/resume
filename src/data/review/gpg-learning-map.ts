import type { ReviewQuestion } from "./types";

export const GpgLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "gpg-learning-map-1",
    chapter: "gpg-learning-map",
    level: 1,
    question: `GPU Gems 全书九大主题是什么？它们之间是什么关系？`,
    answer: `自然效果、光照阴影、材质着色器、图像处理、几何细分、粒子物理、GPU 计算、高级技术、总复习。呈递进关系：前四章建立「效果与原理」基础，中间三章展示「处理与模拟能力」，最后两章走向「通用计算与综合实战」。`,
    tags: ["学习地图", "全书结构"],
  },
  {
    id: "gpg-learning-map-2",
    chapter: "gpg-learning-map",
    level: 2,
    question: `为什么说 GPU Gems 是「效果驱动」的？这种编写方式有什么优劣？`,
    answer: `每个技术都从具体视觉目标出发（如水面要有波纹），再倒推实现方案（噪声扰动法线）。优势是贴近实际开发流程、直觉性强；劣势是知识点分散、缺乏系统性理论框架，需要读者自己归纳底层原理。`,
    tags: ["效果驱动", "方法论"],
  },
  {
    id: "gpg-learning-map-3",
    chapter: "gpg-learning-map",
    level: 3,
    question: `推荐的学习路径是什么？如果跳过自然效果直接学 GPGPU 会有什么问题？`,
    answer: `推荐路径：自然效果 → 光照材质 → 图像处理 → 几何细分 → 粒子物理 → GPGPU → 高级技术。跳过自然效果直接学 GPGPU 会缺乏对着色器能做什么的直觉，不理解图形管线就无法理解为什么需要通用计算——GPGPU 的价值正是在图形管线的限制上凸显的。`,
    tags: ["学习路径", "GPGPU"],
  },
  {
    id: "gpg-learning-map-4",
    chapter: "gpg-learning-map",
    level: 4,
    question: `全书从「自然效果」讲到「GPGPU」的演进逻辑是什么？`,
    answer: `驱动力是「视觉需求逼出计算能力」。自然效果需要噪声和光照（着色器编程）→ 光照需要物理模型（BRDF）→ 大量像素处理需要后处理管线 → 几何复杂度需要 LOD 和细分 → 海量粒子需要 GPU 并行 → 最终突破图形管线限制走向 GPGPU。每一级都是上一级无法满足时引入的新能力，从「画好看」到「算得快」到「算任意东西」。`,
    tags: ["演进逻辑", "综合"],
  },
];
