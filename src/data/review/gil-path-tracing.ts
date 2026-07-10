import type { ReviewQuestion } from "./types";

/** 路径追踪 复习题 */
export const gilPathTracingQuestions: ReviewQuestion[] = [
  {
    id: "gil-path-tracing-1",
    chapter: "gil-path-tracing",
    level: 1,
    question: `路径追踪的基本流程是什么？`,
    answer: `从相机发射光线→求交→NEE采样光源计算直接光→按BRDF采样方向→递归追踪间接光→俄罗斯轮盘赌终止。大量路径平均得到渲染结果。`,
    tags: ["路径追踪", "算法"],
  },
  {
    id: "gil-path-tracing-2",
    chapter: "gil-path-tracing",
    level: 2,
    question: `为什么路径追踪是无偏的？`,
    answer: `每次采样的期望等于真实积分值（蒙特卡洛理论），N次平均的期望仍等于真实值。采样数趋于无穷时收敛到正确结果，无系统性误差。无偏性来自正确的概率加权（f(x)/p(x)的期望=积分值）。`,
    tags: ["无偏性"],
  },
  {
    id: "gil-path-tracing-3",
    chapter: "gil-path-tracing",
    level: 3,
    question: `Next Event Estimation(NEE)解决了什么问题？`,
    answer: `纯随机游走很难命中小光源（从漫反射面按BRDF随机方向恰好对准小光源的概率极低），导致直接光噪声爆炸。NEE在每次交点显式采样光源方向，保证直接光几乎无噪声，再配合MIS组合BRDF采样处理光泽表面。`,
    tags: ["NEE", "直接光"],
  },
  {
    id: "gil-path-tracing-4",
    chapter: "gil-path-tracing",
    level: 4,
    question: `分析路径追踪在焦散场景中的瓶颈，BDPT如何解决。`,
    answer: `焦散光路L(S)DE：光经镜面反射到漫反射面再到相机。PT从漫反射面按BRDF随机采样方向，命中镜面再到光源的概率极低，绝大多数路径贡献为零，方差爆炸。BDPT从光源出发经镜面到漫反射面（光子路径，镜面方向是确定的所以容易采样），从相机到漫反射面（相机路径，BRDF采样即可），连接两个子路径上的点。把难以采样的长路径变成两条容易采样的短路径的连接，大幅降低方差。`,
    tags: ["BDPT", "焦散", "综合"],
  },
];