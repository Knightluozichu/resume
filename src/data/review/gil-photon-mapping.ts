import type { ReviewQuestion } from "./types";

/** 光子映射 复习题 */
export const gilPhotonMappingQuestions: ReviewQuestion[] = [
  {
    id: "gil-photon-mapping-1",
    chapter: "gil-photon-mapping",
    level: 1,
    question: `光子映射的两遍算法流程是什么？`,
    answer: `第一遍从光源发射光子在场景中追踪弹射，存入光子贴图(kd-tree)。第二遍从相机发射光线求交，在交点查最近N个光子，用能量/面积做密度估计计算辐射度。`,
    tags: ["光子映射", "算法"],
  },
  {
    id: "gil-photon-mapping-2",
    chapter: "gil-photon-mapping",
    level: 2,
    question: `光子映射为什么是有偏但一致的？`,
    answer: `有偏来自密度估计用有限半径圆盘近似点密度，引入系统性模糊。一致性保证光子数趋于无穷且半径趋于零时收敛到正确值。有偏但一致在实践中可接受。`,
    tags: ["有偏", "一致性"],
  },
  {
    id: "gil-photon-mapping-3",
    chapter: "gil-photon-mapping",
    level: 3,
    question: `光子映射擅长解决什么问题？为什么路径追踪不擅长？`,
    answer: `光子映射擅长焦散——光经镜面反射/折射到漫反射面。因为光子从光源出发经过镜面是自然路径（正向追踪），容易采样。路径追踪从漫反射面按BRDF反向随机采样方向，几乎不可能恰好命中镜面再到光源，方差爆炸。`,
    tags: ["焦散", "光子映射"],
  },
  {
    id: "gil-photon-mapping-4",
    chapter: "gil-photon-mapping",
    level: 4,
    question: `分析PPM如何通过渐进缩小搜索半径实现无偏收敛，与传统光子映射的权衡。`,
    answer: `传统光子映射固定搜索半径r：r大则模糊(偏差大)但噪声小(方差小)，r小则噪声大但偏差小，无法同时消除偏差和方差。PPM每遍迭代发射少量光子在固定交点累积，然后缩小r(r_new=r_old*(N+alpha)/(N+1))。随N增长r趋近零，偏差趋近零；同时累积的光子数增加，方差也趋近零。关键区别：传统方法必须存储所有光子（内存O(N)），PPM只需存储交点累积统计量（内存O(1) per pixel），通过多遍迭代换取内存节省。权衡是PPM需要多次场景遍历（多遍渲染），时间换内存。`,
    tags: ["PPM", "综合"],
  },
];