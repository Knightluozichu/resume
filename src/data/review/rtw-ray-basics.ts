import type { ReviewQuestion } from "./types";

/** 光线与射线相交 复习题 */
export const rtwRayBasicsQuestions: ReviewQuestion[] = [
  {
    id: "rtw-ray-basics-1",
    chapter: "rtw-ray-basics",
    level: 1,
    question: "射线参数方程 P(t)=A+t·b 中 A、b、t 各代表什么？t 的取值范围是什么？",
    answer: "A 是射线起点，b 是方向向量，t 是参数。t≥0 表示从起点沿方向向前的部分；t=0 在起点，t 越大离起点越远。负 t 在起点反方向，通常不计入。",
    tags: ["射线方程"],
  },
  {
    id: "rtw-ray-basics-2",
    chapter: "rtw-ray-basics",
    level: 2,
    question: "判别式 Δ=h²−ac 的三种取值各代表什么几何关系？",
    answer: "Δ<0 无实根，射线错过球（不相交）；Δ=0 一个重根，射线与球相切；Δ>0 两个不同实根，射线穿过球，取较小正根为最近交点。",
    tags: ["判别式", "求交"],
  },
  {
    id: "rtw-ray-basics-3",
    chapter: "rtw-ray-basics",
    level: 3,
    question: "为什么求交要忽略 t<0 的解？为避免「自相交」又常用什么技巧？",
    answer: "t<0 的交点在射线起点反方向（相机背后），不是向前看到的内容，必须忽略。为避免浮点误差使射线从物体表面出发时立刻命中自身（t≈0 假交点），求交时设一个小的正下界 t_min（如 0.001），只接受 t>t_min 的解。",
    tags: ["t_min", "自相交"],
  },
  {
    id: "rtw-ray-basics-4",
    chapter: "rtw-ray-basics",
    level: 4,
    question: "射线方向 b 不归一化时求交结果会出错吗？代码里保留 a=b·b 参与计算有何好处？",
    answer: "若假设 b 是单位向量而实际未归一化，a≠1 会使 t 的尺度被方向长度污染，交点位置和判别式都偏移，画面异常。保留 a=b·b 参与计算（t 用 (−h±√Δ)/a）后，公式对任意长度 b 都正确，无需强制归一化；但要么始终归一化、要么始终保留 a，不能混用。",
    tags: ["综合", "归一化", "数值正确性"],
  },
];
