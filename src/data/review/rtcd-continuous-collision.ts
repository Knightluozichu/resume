import type { ReviewQuestion } from "./types";

export const rtcdContinuousCollisionQuestions: ReviewQuestion[] = [
  {
    id: "rtcd-continuous-collision-1",
    chapter: "rtcd-continuous-collision",
    level: 1,
    question: `什么是扫掠体？它在 CCD 中起什么作用？`,
    answer: `扫掠体是物体沿运动轨迹扫过的空间体积（如球运动扫出胶囊体）。CCD 用它覆盖物体在整段时间内占据的所有空间，判断扫掠体与障碍物的相交来求碰撞时间，从而检测帧间运动中的碰撞，从根本上消除隧穿。`,
    tags: ["扫掠体", "CCD"],
  },
  {
    id: "rtcd-continuous-collision-2",
    chapter: "rtcd-continuous-collision",
    level: 2,
    question: `保守推进法的「保守」体现在哪里？`,
    answer: `每步只前进「保证不穿透的最大安全步长」$dt = d / v$（当前最短距离除以最大相对速度），绝不会越过碰撞点。它算的是「以当前速度最快多久会碰到」的上界，实际碰撞可能更早。这是「保守」——宁可多走几步也不漏检，保证不穿透。`,
    tags: ["保守推进", "安全步长"],
  },
  {
    id: "rtcd-continuous-collision-3",
    chapter: "rtcd-continuous-collision",
    level: 3,
    question: `保守推进法的收敛速度受什么影响？有什么缺点？`,
    answer: `受「运动方向与最近点方向的夹角」影响：正对运动一步收敛；擦边运动 $d$ 减小很慢，需很多步。速度差越大、初始距离越远步数越多。缺点是收敛慢，可能需要几十上百步迭代。优点是通用——任何能算距离的形状都适用，无需推导解析方程。`,
    tags: ["保守推进", "收敛"],
  },
  {
    id: "rtcd-continuous-collision-4",
    chapter: "rtcd-continuous-collision",
    level: 4,
    question: `保守推进法和解析法各适合什么场景？为什么？`,
    answer: `保守推进法适合复杂凸多面体——只需能算两体最短距离即可，通用性强，无需针对形状推导方程，但收敛慢。解析法适合简单形状（球-球、球-胶囊等）——直接解运动方程一步求 $t_{hit}$，精确高效，但每种形状组合需单独推导，凸多面体的解析解极其复杂甚至不可行。实际中常混合：简单形状用解析法，复杂形状用保守推进或基于 GJK 的迭代 CCD。`,
    tags: ["综合", "方法选择"],
  },
];
