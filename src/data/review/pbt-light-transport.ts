import type { ReviewQuestion } from "./types";

/** 光线传输方程 复习题 */
export const pbtLightTransportQuestions: ReviewQuestion[] = [
  {
    id: "pbt-light-transport-1",
    chapter: "pbt-light-transport",
    level: 1,
    question: `渲染方程的完整形式是什么？`,
    answer: `L_o(p,ωo) = L_e(p,ωo) + 真实积分号 f_r(ωi,ωo)·L_i(p,ωi)·cosθi·dωi，对半球面积分。出射光=自发光+反射光。`,
    tags: ["渲染方程", "公式"],
  },
  {
    id: "pbt-light-transport-2",
    chapter: "pbt-light-transport",
    level: 2,
    question: `为什么渲染方程是递归的？`,
    answer: `因为入射辐亮度 L_i(p,ωi) 等于另一个点 p' 沿相反方向的出射辐亮度 L_o(p',-ωi)，而 L_o 本身又包含积分项，形成 L_o 依赖于 L_o 的递归关系。`,
    tags: ["递归性", "渲染方程"],
  },
  {
    id: "pbt-light-transport-3",
    chapter: "pbt-light-transport",
    level: 3,
    question: `区分直接光照和间接光照的计算方式，说明为什么需要区分。`,
    answer: `直接光照显式采样光源（对光源面积采样），效率高、噪声低，尤其对小光源。间接光照按BRDF采样方向递归追踪，效率低、噪声大。如果不区分，间接光照的BRDF采样很难恰好命中小光源，导致直接光照噪声爆炸。分开计算后直接光照始终清晰（只需少量光源采样），间接光照噪声可控。`,
    tags: ["直接光照", "间接光照"],
  },
  {
    id: "pbt-light-transport-4",
    chapter: "pbt-light-transport",
    level: 4,
    question: `用光路表示法分析路径追踪能覆盖哪些光路类型，以及哪些光路难以采样。`,
    answer: `路径追踪从相机出发按BRDF采样方向，能自然覆盖 L(D|G|S)*E 类型的光路。漫反射D和光泽G的BRDF方向分布广，容易采样到。镜面S方向是delta函数，需特殊处理。难以采样的光路包括：LS DS E（焦散——光经镜面反射到漫反射面再到相机），因为从漫反射面按BRDF采样很难命中镜面再到光源。这类光路需要双向路径追踪（BDPT）或光子映射等专门技术。`,
    tags: ["光路表示法", "路径追踪", "综合"],
  },
];