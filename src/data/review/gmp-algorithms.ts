import type { ReviewQuestion } from "./types";

export const gmpAlgorithmsQuestions: ReviewQuestion[] = [
  {
    id: "gmp-algorithms-1",
    chapter: "gmp-algorithms",
    level: 1,
    question: "大 O 表示法是什么？常见复杂度等级从快到慢怎么排列？",
    answer: "大 O 表示法描述算法运行时间随输入规模增长的上界，忽略常数和低阶项只关注增长趋势。从快到慢：O(1) < O(log n) < O(n) < O(n log n) < O(n^2) < O(2^n)。O(1) 常数时间不随数据量增长，O(n^2) 数据量翻倍时间变 4 倍，O(2^n) 指数级增长很快爆炸。",
    tags: ["大O表示法", "复杂度等级"],
  },
  {
    id: "gmp-algorithms-2",
    chapter: "gmp-algorithms",
    level: 2,
    question: "为什么游戏循环中的 O(n^2) 算法是危险的？",
    answer: "游戏每帧只有 16ms（60fps）。O(n^2) 在 n=100 时约 0.1ms 还好，n=1000 时约 10ms 吃掉一帧 60%，n=10000 时约 100ms 卡到 10fps。游戏对象数量随场景复杂度增长，O(n^2) 会突然爆炸。应优化为 O(n log n) 或 O(n)。碰撞检测用空间划分，邻居查找用网格。",
    tags: ["O(n^2)", "游戏循环", "性能"],
  },
  {
    id: "gmp-algorithms-3",
    chapter: "gmp-algorithms",
    level: 3,
    question: "空间划分算法如何将碰撞检测从 O(n^2) 降为 O(n log n)？",
    answer: "暴力碰撞检测对每对对象检测，n*(n-1)/2 对，O(n^2)。空间划分（四叉树/网格）将空间分为区域，每个对象只与同区域和相邻区域的对象检测。构建树 O(n log n)，每对象查询邻居 O(log n)，总 O(n log n)。大部分远距离对象被空间分区过滤不需要检测。网格法在均匀分布场景更快（接近 O(n)），四叉树在不均匀分布更优。",
    tags: ["空间划分", "四叉树", "碰撞检测"],
  },
  {
    id: "gmp-algorithms-4",
    chapter: "gmp-algorithms",
    level: 4,
    question: "为什么不能只看大 O 不看常数因子？实际中如何平衡？",
    answer: "大 O 忽略常数但常数可能很大——O(n) 如果每次迭代重 100 倍可能比 O(n log n) 慢。例如 O(n) 的链表遍历（缓存 miss 多）实际比 O(n log n) 的数组排序慢。平衡方法：1. 先保证大 O 不差——不在循环中嵌套 O(n)，消除 O(n^2)。2. 再优化常数——用缓存友好的数据结构、减少分支预测失败、利用 SIMD。3. 用 Profiler 验证实际性能而非理论推断。大 O 定性判断趋势，Profiler 定量验证实际。",
    tags: ["常数因子", "缓存友好", "Profiler", "综合"],
  },
];
