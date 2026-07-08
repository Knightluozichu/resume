import type { ReviewQuestion } from "./types";

export const rtcdCollisionTypesQuestions: ReviewQuestion[] = [
  {
    id: "rtcd-collision-types-1",
    chapter: "rtcd-collision-types",
    level: 1,
    question: "什么是隧穿现象？",
    answer: "隧穿是高速物体在一帧内穿过薄障碍物而未被离散碰撞检测检出的现象。DCCD 只在帧采样时刻检测位置，如果物体在两个采样点之间跨过了障碍，就会完全错过碰撞。",
    tags: ["隧穿", "DCCD"],
  },
  {
    id: "rtcd-collision-types-2",
    chapter: "rtcd-collision-types",
    level: 2,
    question: "离散碰撞检测和连续碰撞检测的本质区别是什么？",
    answer: "DCCD 只在固定时间点（每帧）采样物体位置做相交判断，帧间运动不可见；CCD 沿物体整段运动轨迹连续检测，求解精确的碰撞时间点 $t_{hit}$。DCCD 简单快速但可能隧穿，CCD 计算开销大但物理正确无穿透。",
    tags: ["DCCD", "CCD"],
  },
  {
    id: "rtcd-collision-types-3",
    chapter: "rtcd-collision-types",
    level: 3,
    question: "球-球 CCD 如何用二次方程求 $t_{hit}$？",
    answer: "相对位置 $P(t) = P_0 + v_{rel} t$，碰撞条件 $|P(t)|^2 = (r_a + r_b)^2$。展开得 $At^2 + Bt + C = 0$，其中 $A = v_{rel} \\cdot v_{rel}$，$B = 2(P_0 \\cdot v_{rel})$，$C = |P_0|^2 - (r_a+r_b)^2$。取 $[0, \\Delta t]$ 范围内最小正根即为 $t_{hit}$，判别式小于 0 则无碰撞。",
    tags: ["CCD", "二次方程"],
  },
  {
    id: "rtcd-collision-types-4",
    chapter: "rtcd-collision-types",
    level: 4,
    question: "实际项目中如何平衡 DCCD 和 CCD？为什么不能全部用 CCD？",
    answer: "按速度阈值筛选：大部分慢速物体用 DCCD（省算力），少数高速物体（一帧位移超过障碍厚度）用 CCD（防穿透）。不能全用 CCD 因为计算开销远高于 DCCD——CCD 要解方程或迭代逼近，给所有物体开会导致帧时间暴涨。设速度阈值的关键判据是「一帧位移是否可能超过障碍物最小厚度」，超过则启用 CCD。",
    tags: ["综合", "性能策略"],
  },
];
