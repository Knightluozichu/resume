import type { ReviewQuestion } from "./types";

/** PBRT 总复习 复习题 */
export const pbtFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "pbt-final-review-1",
    chapter: "pbt-final-review",
    level: 1,
    question: "PBRT 全书五大板块分别解决什么核心问题？",
    answer: "辐射度量学解决「如何描述光」，蒙特卡洛解决「如何计算积分」，BxDF解决「如何描述材料」，光传输方程解决「如何串联一切」，系统架构解决「如何高效运行」。",
    tags: ["全书回顾", "板块"],
  },
  {
    id: "pbt-final-review-2",
    chapter: "pbt-final-review",
    level: 2,
    question: "用一条光线的旅程串联全书知识点。",
    answer: "相机模型生成光线→BVH加速求交找到交点→BxDF查询材料反射特性→光传输方程计算出射radiance(自发光+直接光照+间接光照)→蒙特卡洛采样(重要性采样+MIS+俄罗斯轮盘赌)求解积分→递归追踪间接光→瓦片化并行渲染所有像素。",
    tags: ["串联", "光线旅程"],
  },
  {
    id: "pbt-final-review-3",
    chapter: "pbt-final-review",
    level: 3,
    question: "PBRT 如何平衡「物理正确」与「工程可行」？",
    answer: "物理正确：辐射度量学+光传输方程+物理BxDF+无偏蒙特卡洛。工程可行：BVH把求交降到O(logN)、瓦片化并行、重要性采样和MIS在有限采样下降低方差、俄罗斯轮盘赌控制深度。蒙特卡洛是平衡的关键——无偏保证正确性，自适应采样保证可控性。",
    tags: ["物理正确", "工程可行"],
  },
  {
    id: "pbt-final-review-4",
    chapter: "pbt-final-review",
    level: 4,
    question: "给定一个需要渲染焦散+体积散射+强间接光的复杂场景，设计完整的渲染方案。",
    answer: "1）积分器选择：BDPT处理焦散（双向子路径连接），如果BDPT对间接光仍噪声大则混合MLT（局部变异探索困难光路）。2）体积处理：用 free-flight sampling 按指数分布采样体积内距离，配合相函数重要性采样。3）采样策略：对BRDF用余弦/Cook-Torrance重要性采样，对光源用面积采样，两者用MIS组合。4）BxDF：Cook-Torrance建模金属/塑料，配合透射BxDF处理玻璃。5）加速结构：Morton排序BVH优化缓存。6）并行：64x64瓦片+无锁队列动态分配。7）降噪：事后用自适应采样（噪声大的区域增加spp）配合神经降噪。整体方案：BDPT+MLT混合积分器，MIS采样，BVH加速，瓦片并行，自适应降噪。",
    tags: ["综合方案", "渲染设计"],
  },
];