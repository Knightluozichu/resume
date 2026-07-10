import type { ReviewQuestion } from "./types";

export const gep2PhysicsEngineQuestions: ReviewQuestion[] = [
  {
    id: "gep2-physics-engine-1",
    chapter: "gep2-physics-engine",
    level: 1,
    question: `游戏物理引擎单步推进的四个阶段是什么？`,
    answer:
      `施力（累加重力/弹簧/外力到 force）→ 积分（半隐式 Euler 更新速度和位置）→ 约束求解（迭代修正穿透与距离约束）→ 积分修正（把解算后的位置写回变换）。每帧按固定 dt 拆成多个子步循环执行。`,
    tags: ["物理步进", "四阶段"],
  },
  {
    id: "gep2-physics-engine-2",
    chapter: "gep2-physics-engine",
    level: 2,
    question: `为什么游戏多用半隐式 Euler 而非显式 Euler？`,
    answer:
      `显式 Euler 用旧速度更新位置（x += v_old·dt），能量会持续增加导致系统爆炸，对弹簧等刚性系统尤其不稳定。半隐式 Euler 用新速度更新位置（v += a·dt 后再 x += v_new·dt），对线性系统是辛积分器，能量守恒更好、稳定，且实现简单、开销低，是游戏首选。`,
    tags: ["积分器", "稳定性"],
  },
  {
    id: "gep2-physics-engine-3",
    chapter: "gep2-physics-engine",
    level: 3,
    question: `物理引擎为什么要用固定时间步而非跟随渲染帧率？`,
    answer:
      `渲染帧率可变（掉帧时 dt 变大），若物理直接用渲染 dt，大 dt 会让积分误差暴增、物体穿透甚至飞出。固定 dt 让物理模拟确定且稳定，再用子步把累积的帧时间消耗掉（accumulator 模式）。渲染插值物理状态即可平滑显示。这把「帧率」与「物理精度」解耦，掉帧只影响画面流畅度，不影响物理正确性。`,
    tags: ["固定时间步", "子步", "解耦"],
  },
  {
    id: "gep2-physics-engine-4",
    chapter: "gep2-physics-engine",
    level: 4,
    question: `约束求解为什么要迭代多次？迭代次数和稳定性的权衡是什么？`,
    answer:
      `Sequential Impulse 法对每个约束独立求冲量，但多个约束耦合（如堆叠的箱子），解一个会破坏另一个。多次迭代让约束逐步收敛到满足所有约束的解，但这是近似而非精确解。迭代越多越稳定（穿透、抖动越小），但 CPU 开销线性增长。权衡点：表现层看不见明显穿透与抖动即可，通常 4-10 次迭代够用；接触越多（堆叠）需要越多迭代。穿透比抖动更刺眼，故宁可牺牲积分精度也要保证约束求解。`,
    tags: ["约束求解", "迭代", "权衡"],
  },
];
