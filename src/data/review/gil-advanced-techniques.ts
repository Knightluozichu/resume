import type { ReviewQuestion } from "./types";

/** 高级 GI 技术 复习题 */
export const gilAdvancedTechniquesQuestions: ReviewQuestion[] = [
  {
    id: "gil-advanced-techniques-1",
    chapter: "gil-advanced-techniques",
    level: 1,
    question: "MLT的工作原理是什么？",
    answer: "用马尔可夫链在路径空间探索：初始化一条路径，对当前路径做小变异，用Metropolis准则接受/拒绝（高贡献更可能接受），记录贡献。找到高贡献路径后局部探索，高效覆盖困难光路区域。",
    tags: ["MLT", "原理"],
  },
  {
    id: "gil-advanced-techniques-2",
    chapter: "gil-advanced-techniques",
    level: 2,
    question: "辐照度缓存如何加速漫反射GI？",
    answer: "漫反射间接光在空间上平滑变化。辐照度缓存只在稀疏点上完整计算间接光，中间点用插值近似。计算量减少10-100倍。代价是有偏（插值误差），在几何突变处需回退到完整计算。",
    tags: ["辐照度缓存", "加速"],
  },
  {
    id: "gil-advanced-techniques-3",
    chapter: "gil-advanced-techniques",
    level: 3,
    question: "自适应采样如何分配采样预算？",
    answer: "先低采样预览全图，计算每像素的方差/噪声估计。在噪声大的区域（如阴影边缘、焦散）增加采样数，在平滑区域（如纯色墙面）减少采样数。使总采样预算花在刀刃上，相同总采样数下方差更低。",
    tags: ["自适应采样"],
  },
  {
    id: "gil-advanced-techniques-4",
    chapter: "gil-advanced-techniques",
    level: 4,
    question: "分析现代渲染器为什么采用混合GI架构，设计一个室内场景的混合方案。",
    answer: "混合因为不同GI技术各有擅长：PT通用但焦散差，PM擅长焦散但直接光差，IC快但只适合漫反射，MLT擅长困难光路但收敛不均。室内场景方案：1)直接光+NEE+MIS处理所有人工光源，保证硬阴影质量。2)漫反射间接光(墙壁/天花板弹射)用辐照度缓存——室内漫反射主导，IC大幅加速。3)焦散(玻璃/金属聚焦光)用光子映射——正向追踪天然处理。4)光泽间接光(金属/瓷砖反射)用路径追踪BRDF采样。5)困难光路(门缝/复杂遮挡)用MLT补充。6)自适应采样在焦散和阴影边缘增加采样。7)降噪后处理。整体：IC处理80%的间接光(快)，PT/PM处理10%的特殊光路(准)，MLT处理10%的困难光路(补)。",
    tags: ["混合渲染", "综合", "方案设计"],
  },
];