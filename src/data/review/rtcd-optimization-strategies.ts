import type { ReviewQuestion } from "./types";

export const rtcdOptimizationStrategiesQuestions: ReviewQuestion[] = [
  {
    id: "rtcd-optimization-strategies-1",
    chapter: "rtcd-optimization-strategies",
    level: 1,
    question: `SIMD 如何加速 AABB 相交检测？`,
    answer: `把 4 组 AABB 的同类分量（如 4 个 min.x）打包进一个 128-bit 寄存器，一条 SSE 指令同时比较 4 组。AABB 相交需 3 轴 x 2 端点比较，SIMD 可同时处理 4 组 AABB 对，理论提速 4 倍。前提是数据按 SoA 布局，让 4 个 AABB 的同类分量连续存放。`,
    tags: ["SIMD", "AABB"],
  },
  {
    id: "rtcd-optimization-strategies-2",
    chapter: "rtcd-optimization-strategies",
    level: 2,
    question: `为什么 AABB 数据要从 AoS 改成 SoA 布局？`,
    answer: `AoS（Array of Structures）下不同 AABB 的 min.x 分散在不同 cache line，SIMD 取 4 个 min.x 要跨多个 cache line，开销大。SoA（Structure of Arrays）让所有 AABB 的 min.x 连续排列，一次 SIMD 加载即可取 4 个值。SoA 还提升缓存利用率——连续访问同类数据，预取友好。`,
    tags: ["SoA", "AoS", "缓存"],
  },
  {
    id: "rtcd-optimization-strategies-3",
    chapter: "rtcd-optimization-strategies",
    level: 3,
    question: `碰撞检测并行为什么要用工作窃取而不是静态分片？`,
    answer: `候选对的计算量不均——有些一次 AABB 比较就退出，有些要跑完整 GJK 迭代。静态平均分片会导致某些核先做完空闲，某些核还在忙。工作窃取让空闲核从忙核队列尾部偷任务，动态均衡负载，减少核间等待。碰撞检测每帧候选对数量和复杂度都在变化，工作窃取是自适应的。`,
    tags: ["并行", "工作窃取"],
  },
  {
    id: "rtcd-optimization-strategies-4",
    chapter: "rtcd-optimization-strategies",
    level: 4,
    question: `SIMD、缓存、并行三支柱应按什么顺序优化？为什么？`,
    answer: `顺序：数据布局（SoA + 紧凑）→ SIMD 向量化 → 多核并行。布局是地基：如果数据随机散落的 AoS，多核并行只会让 8 个核同时 cache miss，加速比远低于 8；SIMD 也无法生效（数据不连续）。先做布局让单核吞吐最大化，再做 SIMD 让每核算得更快，最后并行让多核协同。反过来做会事倍功半。核心原则：先测量（Profiler）再优化，切忌过早优化。`,
    tags: ["综合", "优化顺序"],
  },
];
