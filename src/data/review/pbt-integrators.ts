import type { ReviewQuestion } from "./types";

/** 积分器与采样器 复习题 */
export const pbtIntegratorsQuestions: ReviewQuestion[] = [
  {
    id: "pbt-integrators-1",
    chapter: "pbt-integrators",
    level: 1,
    question: `路径追踪的基本流程是什么？`,
    answer: `从相机发射光线→求交→计算直接光照（采样光源）→按BRDF采样新方向→递归追踪间接光照→俄罗斯轮盘赌终止。每条路径是随机游走，大量路径平均得到渲染结果。`,
    tags: ["路径追踪", "算法"],
  },
  {
    id: "pbt-integrators-2",
    chapter: "pbt-integrators",
    level: 2,
    question: `BDPT 如何解决路径追踪的焦散问题？`,
    answer: `BDPT从光源和相机同时生成子路径，然后连接两段子路径上的点。焦散光路 L(S)DE 中，PT 需要从漫反射面随机命中镜面再到光源（概率极低），BDPT 从光源经镜面到漫反射面（光子路径）再从相机到漫反射面（相机路径）连接即可，把难以采样的单向路径变成两条易采样子路径的连接。`,
    tags: ["BDPT", "焦散"],
  },
  {
    id: "pbt-integrators-3",
    chapter: "pbt-integrators",
    level: 3,
    question: `MIS（多重重要性采样）为什么是现代积分器的核心组件？`,
    answer: `场景中不同区域适合不同采样策略（光源采样适合小光源近场，BRDF采样适合强方向性材料）。没有MIS，当某策略在特定区域失效时方差爆炸。MIS用加权组合 bal(h)=n_h w_h / Σ n_j w_j 自动在各自擅长区域取最优，保证方差始终可控，是PT/BDPT等现代积分器的基础。`,
    tags: ["MIS", "方差控制"],
  },
  {
    id: "pbt-integrators-4",
    chapter: "pbt-integrators",
    level: 4,
    question: `给定一个有焦散、小光源和强间接光的场景，设计积分器选择策略。`,
    answer: `焦散场景首选BDPT——从光源和相机双向生成子路径连接，高效处理焦散光路。小光源场景BDPT也优于PT（光子路径从光源出发保证覆盖）。强间接光如果BDPT仍噪声大，可考虑MLT——找到高贡献路径后局部变异，对困难间接光收敛快。实际可用BDPT+MLT混合：BDPT生成候选路径，MLT在困难区域变异探索。所有策略都应配合MIS和自适应采样（在噪声大的区域增加采样数）。`,
    tags: ["积分器选择", "综合", "场景分析"],
  },
];