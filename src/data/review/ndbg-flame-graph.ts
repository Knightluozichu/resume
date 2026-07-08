import type { ReviewQuestion } from "./types";

export const ndbgFlameGraphQuestions: ReviewQuestion[] = [
  {
    id: "ndbg-flame-graph-1",
    chapter: "ndbg-flame-graph",
    level: 2,
    question: "火焰图的 X 轴和 Y 轴分别代表什么？为什么说「宽度即热点」？",
    answer:
      "X 轴：函数在采样中出现的次数（≈CPU 占比），宽度越宽说明该函数（含子调用）占的 CPU 时间越多。X 轴不是时间轴——采样已按函数聚合排序，不是按时间顺序排列。Y 轴：调用栈深度，底部是入口函数（如 main），顶部是当前正在执行的最深层函数。每一层的帧宽度等于其所有子帧宽度之和加自身 Self Time 对应的宽度。栈顶帧（最顶层、无子帧）的宽度就是它的 Self Time 占比。「宽度即热点」的原因：CPU Profiler 的采样法原理是「函数出现在采样中的次数越多，占的 CPU 时间越长」。火焰图把采样次数映射为视觉宽度，所以最宽的帧就是出现次数最多的帧，也就是 CPU 占比最高的函数。栈顶最宽的帧是 Self Time 热点（自身计算量大），中段最宽的帧是被频繁调用的中间函数。",
    tags: ["火焰图", "X轴", "Y轴", "宽度即热点"],
  },
  {
    id: "ndbg-flame-graph-2",
    chapter: "ndbg-flame-graph",
    level: 3,
    question: "火焰图中的三类典型性能问题是什么？各自的表现和优化方向是什么？",
    answer:
      "①宽栈顶（CPU 热点函数）——火焰图表现：某个栈顶帧特别宽（如 JSON.parse 占 40%），说明该函数自身计算量大。优化方向：减少调用次数、换更快的实现、缓存结果（如大 JSON 反复解析 → 缓存解析结果）。②宽中段（库函数开销）——火焰图表现：中间某层特别宽（如 lodash.deepClone 占 30%），说明库函数被高频调用且每次开销大。优化方向：减少调用频率、换轻量替代（如 deepClone 大对象 → 只 clone 需要修改的部分）。③高塔（深递归/长调用链）——火焰图表现：火焰图某条路径特别高（Y 轴层数多），说明递归过深或中间件链过长。优化方向：尾递归优化、减少中间件层数、改递归为迭代（如 50 层中间件 → 精简到 10 层）。三类问题的共性是都通过「找最宽/最高的色块」定位，差异在于优化策略不同。",
    tags: ["火焰图", "宽栈顶", "宽中段", "高塔", "性能优化"],
  },
  {
    id: "ndbg-flame-graph-3",
    chapter: "ndbg-flame-graph",
    level: 3,
    question: "0x 和 clinic.js flame 各自的优势是什么？什么场景用哪个？",
    answer:
      "0x 的优势：轻量、快速、零配置——一条命令 0x server.js 就能生成火焰图 HTML，适合快速定位 CPU 热点。0x 直接处理 V8 的 --prof 日志，生成的火焰图简洁清晰，适合开发环境快速迭代。劣势：只有火焰图，没有额外的诊断维度。clinic.js flame 的优势：附带丰富的上下文信息——CPU 使用率趋势图、事件循环延迟图、内存增长图、可交互的火焰图（点击展开/折叠子调用）。适合需要综合诊断的场景：不确定问题是 CPU、内存还是事件循环导致的，clinic 能同时展示多个维度。劣势：比 0x 重，启动慢，生成的报告更大。选择建议：开发环境快速排查 CPU 热点用 0x；需要综合诊断（CPU + 事件循环 + 内存）或做性能回归对比时用 clinic.js flame。",
    tags: ["0x", "clinic.js", "工具选型", "火焰图"],
  },
  {
    id: "ndbg-flame-graph-4",
    chapter: "ndbg-flame-graph",
    level: 4,
    question: ".cpuprofile 文件的数据结构是什么？它是如何变换为火焰图的？",
    answer:
      ".cpuprofile 文件是 JSON 格式，包含三个核心字段：①nodes——调用栈节点数组，每个节点有 id（唯一标识）、callFrame（含 functionName/url/lineNumber）、children（子节点 ID 数组），节点间通过 id/children 形成树结构；②samples——采样到的栈顶节点 ID 序列（如 [1,2,4,4,4,2,3,3]），表示每次采样的栈顶函数；③timeDeltas——每次采样与前一次的时间间隔（微秒）。变换为火焰图的过程：①统计每个节点在 samples 中出现的次数（含以其为根的子树中所有节点的出现次数）——这决定帧的宽度；②按调用栈深度（nodes 树的层级）排列 Y 轴位置——根节点在底部，子节点在上方；③同一父节点的子节点按宽度降序排列在 X 轴——让热点集中在左侧；④每个帧画为彩色矩形，宽度 = 出现次数 × 单位宽度，颜色随机分配。栈顶帧的宽度 = Self Time，中间帧的宽度 = Total Time。",
    tags: ["cpuprofile", "数据结构", "火焰图变换", "nodes"],
  },
];
