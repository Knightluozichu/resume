import type { ReviewQuestion } from "./types";

/** C++ 高性能编程 · 数据结构性能复习题 */
export const chpDataStructuresQuestions: ReviewQuestion[] = [
  {
    id: "chp-data-structures-1",
    chapter: "chp-data-structures",
    level: 1,
    question: `\`std::vector\` 和 \`std::list\` 在「末尾插入」和「中间插入」上的大 O 复杂度分别是多少？为什么实际工程中 vector 常在中间插入场景也跑赢 list？`,
    answer:
      `大 O：\n- \`vector\` 末尾插入均摊 \`O(1)\`，中间插入 \`O(n)\`（需移动后续元素）。\n- \`list\` 任意位置插入 \`O(1)\`（已知迭代器），但定位到该位置是 \`O(n)\`。\n\nvector 跑赢 list 的原因：缓存。vector 内存连续，遍历时一个缓存行（64B）能装 8 个 int，预取器还能提前拉数据，几乎全程命中 L1。list 节点散落在堆各处，每跳一个节点就是一次 cache miss（~100 ns 从主存取），指针追逐让流水线停顿。\n\n所以 list「插删 O(1)」的纸面优势被 cache miss 吃光。实测中，即便要移动几千个元素，vector 的连续移动（memmove，SIMD 加速）也常比 list 的几次指针跳转快。经验法则：除非元素极大（KB 级）且插删位置已知，否则默认 vector。`,
    tags: ["vector", "list", "缓存", "复杂度"],
  },
  {
    id: "chp-data-structures-2",
    chapter: "chp-data-structures",
    level: 2,
    question: `什么是 AoS 和 SoA？为什么只遍历部分字段时 SoA 更缓存友好？`,
    answer:
      `AoS（Array of Structs，结构体数组）：每个对象的所有字段连续存放，对象再排成数组。如 \`struct Particle { float x,y,z; bool active; } particles[N];\`。\n\nSoA（Struct of Arrays，数组结构体）：每个字段独立成数组。如 \`struct Particles { float xs[N],ys[N],zs[N]; bool actives[N]; };\`。\n\n只遍历部分字段时 SoA 更友好：缓存以 64 字节行为单位加载。AoS 遍历 \`active\` 时，每个对象的 x/y/z 也被同一缓存行顺带加载，但这些数据用不上，缓存行有效载荷可能只有 1/4（4 字段只用 1 个）。SoA 遍历 \`actives\` 数组时，缓存行全是 active 数据，有效载荷接近 100%，同样数量的缓存 miss 能处理 4 倍数据。\n\n代价：SoA 处理「访问所有字段」的单个对象时要跨多个数组（多次访存），且代码更繁琐。所以取舍是：访问模式以「单字段批量」为主 → SoA；以「单对象全字段」为主 → AoS。游戏引擎的 ECS 普遍用 SoA 正因粒子/实体常按字段批量处理。`,
    tags: ["AoS", "SoA", "缓存局部性", "数据布局"],
  },
  {
    id: "chp-data-structures-3",
    chapter: "chp-data-structures",
    level: 3,
    question: `需要「按 key 查找 + 有序遍历」的场景，\`std::map\`、\`std::unordered_map\`、排序后的 \`std::vector\` 各有什么取舍？如何选择？`,
    answer:
      `三者取舍：\n\n\`std::map\`（红黑树）：查找/插入 \`O(log n)\`，节点散落堆上，缓存差；保持有序；内存开销大（每节点三指针+颜色）。\n\n\`std::unordered_map\`（哈希）：查找/插入均摊 \`O(1)\`，但哈希表为拉链法、桶散布，缓存仍差；不有序；最坏 \`O(n)\`。\n\n排序后的 \`std::vector\`（+ \`std::lower_bound\`）：查找 \`O(log n)\`，但内存连续、缓存极好；插入 \`O(n)\`（需移动）；保持有序；内存最省。\n\n选择策略：\n1. 数据几乎不变（一次性构建后只查）：vector + binary search 最快，缓存让 \`O(log n)\` 跑得比 map 的 \`O(log n)\` 快几倍。也可考虑 \`unordered_map\` 若不需有序。\n2. 频繁查 + 偶尔插删 + 不需有序：\`unordered_map\`。\n3. 需要有序遍历 + 频繁插删：\`std::map\`，但要注意缓存开销，n 大时未必比「vector + 周期性重排」快。\n4. n 小（< 几百）：直接 vector 线性扫描或排序后二分，缓存红利碾压树/哈希的常数。\n\n工程默认：先 vector，剖析证明不够再换。\`flat_map\`（连续存储的有序 map）是 map 的缓存友好替代品。`,
    tags: ["map", "unordered_map", "vector", "选型", "应用"],
  },
  {
    id: "chp-data-structures-4",
    chapter: "chp-data-structures",
    level: 4,
    question: `综合分析：「数据结构的选择应由访问模式决定，而非由大 O 决定」。结合缓存、分支预测与数据规模，论述这一观点并给出工程决策框架。`,
    answer:
      `论点支撑：\n\n1. 缓存让大 O 失真：连续容器（vector）的 \`O(n)\` 遍历因缓存命中每元素几 ns；链式容器（list/map）的 \`O(1)\` 访问因 cache miss 每跳上百 ns。n 在几千内，vector 的 \`O(n)\` 常跑赢 list 的 \`O(1)\`。大 O 只看操作次数，不看每次操作的耗时，而耗时由访问模式（连续 vs 跳转）决定。\n\n2. 分支预测：含条件分支的结构（如链表删除时判断 next、哈希冲突时判断桶）预测失败会冲刷流水线。连续容器配合 \`swap-pop\` 删除分支可预测，性能稳定。\n\n3. 数据规模改变最优解：n 小时，常数与缓存主导，简单数组/线性扫描最优；n 大时，复杂度才成为瓶颈，需要树/哈希。一个「全 n 量程最优」的结构不存在，最优解随 n 与访问比例变化。\n\n4. 访问比例决定布局：读多写少 → 排序 vector + 二分；写多读少 → 哈希；批量按字段 → SoA；单对象全字段 → AoS。同一份数据，不同访问模式应有不同布局。\n\n工程决策框架：\n1. 量化访问模式：读/写/查/遍的比例？批量还是随机？字段访问热度分布？\n2. 量化数据规模：典型 n 与最大 n？静态还是高频变更？\n3. 先选连续容器（vector/flat_map），用剖析验证是否达标。\n4. 不达标再换链式/哈希，每次替换都对比缓存 miss 与分支预测失败率，而非只看大 O。\n5. 极端热点考虑 SoA 或自定义布局。\n\n本质：大 O 选「方向」，访问模式选「实例」。脱离访问模式谈大 O，是性能优化的常见误区。`,
    tags: ["综合", "访问模式", "缓存", "分支预测", "决策框架"],
  },
];
