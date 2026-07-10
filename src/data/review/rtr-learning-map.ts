import type { ReviewQuestion } from "./types";

export const RtrLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "rtr-learning-map-1",
    chapter: "rtr-learning-map",
    level: 1,
    question: `实时渲染第4版全书的核心结构是什么？`,
    answer: `从图形管线基础出发，经几何变换、着色基础、纹理技术，到高级着色（BRDF）、实时阴影、全局光照，最后到渲染优化。呈「管线→变换→着色→高级→优化」的递进结构。`,
    tags: ["学习地图", "全书结构"],
  },
  {
    id: "rtr-learning-map-2",
    chapter: "rtr-learning-map",
    level: 2,
    question: `实时渲染与离线渲染的核心区别是什么？为什么这个区别影响了全书的技术选型？`,
    answer: `实时渲染要求每帧 16-33ms 内完成，离线渲染可以几小时一帧。这个时间约束让实时渲染必须用近似算法（如阴影映射而非光线追踪的精确阴影）、预计算（如预滤波环境贴图）和 GPU 并行，全书所有技术都是在「速度优先、质量可接受」框架下的权衡。`,
    tags: ["实时渲染", "离线渲染", "时间约束"],
  },
  {
    id: "rtr-learning-map-3",
    chapter: "rtr-learning-map",
    level: 3,
    question: `推荐的学习路径是什么？如果跳过图形管线直接学全局光照会有什么问题？`,
    answer: `推荐路径：图形管线 → 变换 → 着色基础 → 纹理 → 高级着色 → 阴影 → 全局光照 → 优化。跳过图形管线直接学全局光照会不理解渲染管线的各阶段，无法理解 GI 是在哪个阶段注入的、为什么有些 GI 技术受限于管线结构。`,
    tags: ["学习路径", "图形管线"],
  },
  {
    id: "rtr-learning-map-4",
    chapter: "rtr-learning-map",
    level: 4,
    question: `全书为什么要从「着色基础」讲到「高级着色」再讲到「全局光照」？这条路径的驱动力是什么？`,
    answer: `驱动力是「真实感需求的逐级升级」。着色基础解决直接光照（一个光源照亮一个表面）；高级着色解决物理正确性（BRDF 能量守恒）；全局光照解决间接光照（光线弹射多次）。每一级都是上一级不够真实时引入的更复杂模型，代价是计算量指数增长，所以最后需要优化章节。`,
    tags: ["演进路径", "真实感", "综合"],
  },
];
