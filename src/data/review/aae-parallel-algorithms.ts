import type { ReviewQuestion } from "./types";

/** 并行算法复习题 */
export const aaeParallelAlgorithmsQuestions: ReviewQuestion[] = [
  {
    id: "aae-parallel-algorithms-1",
    chapter: "aae-parallel-algorithms",
    level: 1,
    question:
      `PRAM 模型和 Work-Span 模型分别是什么？它们各适用于分析什么类型的并行算法？`,
    answer:
      `PRAM（Parallel Random Access Machine）模型：\n\n理想化的共享内存并行模型：\n- p 个处理器同时运行，共享一个全局内存。\n- 所有处理器可同步按节拍执行，每个时间步所有处理器同时执行一条指令。\n- 内存访问模型变体：\n  - EREW（Exclusive Read Exclusive Write）：不允许两个处理器同时读/写同一地址。最严格。\n  - CREW（Concurrent Read Exclusive Write）：允许并发读，不允许并发写。\n  - CRCW：允许并发读和并发写（需定义写冲突解决策略，如优先写、任意写、合并写）。\n\n分析指标：\n- T_p：p 个处理器的运行时间。\n- Work（工作量）W = p × T_p（总操作数）。\n- Cost-optimal：当 W = O(T_1)（即与串行最优算法同阶）。\n\n适用场景：\n理论分析细粒度共享内存算法（如并行前缀和、并行归约、并行排序的 PRAM 版本）。适合教学和理论推导，但过于理想（忽略通信延迟、同步开销、内存层次）。\n\nWork-Span 模型（DAG 模型）：\n\n更现代的并行分析模型，用 DAG（有向无环图）表示计算的依赖关系：\n- Work（W / T_1）：串行执行所有操作的总工作量。即用 1 个处理器的时间。\n- Span / Depth（S / T_∞）：DAG 中最长路径的长度。即用无穷多处理器的时间（关键路径长度）。\n\n并行度（Parallelism）= W / S。表示算法理论上能利用的最大处理器数。\n\n运行时间下界（Brent 定理）：\n  T_p ≤ W/p + S\n- W/p 项：工作量均摊到 p 个处理器。\n- S 项：关键路径的串行瓶颈（即使有无限处理器也不能少于 S）。\n\n适用场景：\n分析现代并行框架（如 Cilk、TBB、OpenMP 的任务并行）的算法。比 PRAM 更实用，因为：\n- 不假设处理器数量固定，而是分析「有多少可并行」。\n- 直接指导调度器设计（work-stealing 调度器的效率可用 W/p + S 分析）。\n\n两者对比：\n\n| 维度       | PRAM                | Work-Span           |\n|-----------|---------------------|---------------------|\n| 内存模型   | 共享内存             | DAG（隐含共享）       |\n| 处理器数   | 固定 p              | 可变（分析 W 和 S）   |\n| 通信/同步  | 理想化（同步步）     | 隐含在 DAG 依赖中     |\n| 实用性     | 理论分析             | 指导实际调度器设计     |\n| 典型应用   | 教学、理论证明       | Cilk/TBB 性能分析     |`,
    tags: ["PRAM", "Work-Span", "并行模型", "Brent定理", "DAG"],
  },
  {
    id: "aae-parallel-algorithms-2",
    chapter: "aae-parallel-algorithms",
    level: 2,
    question:
      `MapReduce 的 Map 阶段和 Reduce 阶段分别做什么？为什么 MapReduce 适合处理「embarrassingly parallel」的工作负载，但不适合迭代式计算？`,
    answer:
      `MapReduce 的两个阶段：\n\nMap 阶段：\n- 输入数据被切分成多个分片（split），每个分片由一个 Mapper 并行处理。\n- Mapper 对每条输入记录应用用户定义的 map 函数，输出若干 (key, value) 对。\n- Map 阶段天然并行：各 Mapper 之间无依赖、无通信，完全独立。\n- 本质：数据转换 + 局部聚合。\n\nShuffle 阶段（框架自动完成）：\n- 按 key 对 Mapper 的输出进行分区、排序、分组。\n- 相同 key 的所有 value 被发送到同一个 Reducer。\n- 这是 MapReduce 中唯一的全局通信环节，通常是性能瓶颈。\n\nReduce 阶段：\n- 每个 Reducer 接收一个 key 和它的所有 value 列表。\n- 应用用户定义的 reduce 函数，输出结果。\n- 各 Reducer 之间独立并行。\n- 本质：全局聚合。\n\n典型例子——Word Count：\n- Map：对每行文本分词，输出 (word, 1)。\n- Shuffle：按 word 分组。\n- Reduce：对每个 word 的 1 列表求和，输出 (word, count)。\n\n为什么适合 Embarrassingly Parallel 工作负载：\n\nEmbarrassingly Parallel（尴尬并行）= 任务之间无依赖、无需通信。\n- Map 阶段天然匹配：每个 Mapper 独立处理一个分片，无依赖。\n- Map 的工作量 = 数据量 / Mapper 数，完美线性加速比。\n- 典型场景：日志分析、ETL 转换、批量图像处理、网页索引构建。\n\n为什么不适合迭代式计算：\n\n1. 每次迭代都要重新读写磁盘：\n- MapReduce 的中间结果（Shuffle 输出）写磁盘，Reduce 输出写 HDFS。\n- 迭代算法（如 PageRank、K-Means、梯度下降）需要多轮 MapReduce，每轮之间数据落盘 → 大量磁盘 I/O。\n- 对比 Spark：用内存缓存 RDD，迭代之间不落盘，快 10~100 倍。\n\n2. 每次迭代重新启动作业：\n- 每轮 MapReduce 是独立作业，需要重新调度、初始化。\n- 作业启动开销（约 10~30 秒）在多轮迭代中累积严重。\n\n3. 无法在迭代间共享状态：\n- MapReduce 无状态——每轮作业独立，无法高效传递中间变量（如当前迭代的权重向量）。\n- 只能通过读写 HDFS 传递，效率低。\n\n4. Shuffle 开销在每轮重复：\n- 迭代算法通常每轮都有 Shuffle（如 PageRank 每轮按节点 ID 分组）。\n- Shuffle 是最贵的操作，每轮重复导致整体性能差。\n\n替代方案：\n- Spark：RDD 内存缓存 + DAG 调度，支持迭代式和交互式计算。\n- BSP 模型（如 Hama、GraphX）：显式的超步同步，适合图计算的迭代。\n- 参数服务器架构（如 TensorFlow 分布式）：适合机器学习的梯度同步迭代。\n\n一句话：MapReduce 是「批处理一次性计算」的好工具，但「迭代式计算」需要内存缓存和状态共享，这正是 MapReduce 的架构短板。`,
    tags: ["MapReduce", "Map", "Reduce", "Shuffle", "迭代计算", "Spark对比"],
  },
  {
    id: "aae-parallel-algorithms-3",
    chapter: "aae-parallel-algorithms",
    level: 3,
    question:
      `BSP（Bulk Synchronous Parallel）模型的超步（Superstep）结构是什么？用它分析 PageRank 迭代一轮的并行计算过程。`,
    answer:
      `BSP 模型的超步结构：\n\nBSP 把并行计算组织为一系列超步（superstep），每个超步包含三个阶段：\n\n1. 本地计算（Local Computation）：\n每个处理器独立执行本地计算，不与其他处理器通信。\n\n2. 通信（Communication）：\n处理器之间通过点对点消息交换数据。通信由系统在超步末尾统一完成。\n\n3. 屏障同步（Barrier Synchronization）：\n所有处理器到达屏障后，通信完成的消息可见，下一超步开始。\n\nBSP 参数：\n- p：处理器数。\n- L：超步周期（同步间隔）。\n- g：通信带宽倒数（每秒每处理器能发送/接收的字节数的倒数）。\n- 每个超步的代价 = max(本地计算时间) + g × max(通信量) + L。\n- 总时间 = Σ 各超步代价。\n\n用 BSP 分析 PageRank 一轮迭代：\n\nPageRank 迭代公式：PR(v) = (1−d)/N + d × Σ_{u→v} PR(u)/OutDeg(u)\n\n并行化设计：\n- 图被分区到 p 个处理器，每个处理器持有一部分顶点和对应的出边。\n- 顶点 v 在处理器 P(v) 上。\n\n超步 t（第 t 轮迭代）：\n\n阶段 1：本地计算\n每个处理器 P_i 对其持有的顶点 u：\n- 计算要发送的 PR 贡献：contribution = PR(u) / OutDeg(u)。\n- 对 u 的每条出边 (u → v)：如果 v 在其他处理器 P(v)，准备一条消息 (v, contribution)；如果 v 在本地，直接累加到本地的新 PR 值。\n\n阶段 2：通信\n- 每个处理器把准备好的消息发送到目标处理器。\n- 通信量 = 跨处理器边的数量 × 消息大小。\n- 如果图是好的分区（如按哈希分区），跨处理器边约占 (1 − 1/p) 比例。\n\n阶段 3：屏障同步\n- 所有处理器等待消息到达。\n- 收到所有消息后，进入下一超步。\n\n超步 t+1：\n阶段 1：本地计算\n每个处理器对接收到的消息按目标顶点 v 聚合：\n- newPR(v) = (1−d)/N + d × Σ 收到的 contribution\n- 更新 PR(v) = newPR(v)。\n- 检查收敛：|newPR(v) − oldPR(v)| < ε。\n\n阶段 2：无通信（本轮不发送）\n\n阶段 3：屏障同步 + 全局收敛判断（AllReduce 判断是否所有顶点都收敛）\n\n一轮 PageRank = 2 个超步（发送 + 接收聚合），或优化为 1 个超步（计算贡献和接收同时进行）。\n\nBSP 代价分析（一轮迭代）：\n- 本地计算：O(|V_i| + |E_i|)，V_i 和 E_i 为处理器 i 的顶点和边数。\n- 通信量：O(跨处理器边数 × 8 字节)。\n- 同步开销：O(L)，L 为屏障同步延迟。\n- 一轮总代价 ≈ O(|E|/p) + g × O(|E| × (1−1/p)) + L。\n\nBSP 的优劣：\n- 优势：模型清晰（超步 + 屏障同步），便于分析；天然容错（超步为恢复检查点）；适合图计算、矩阵运算等规则迭代。\n- 劣势：屏障同步导致最慢处理器拖累整体（straggler 问题）；每轮通信开销固定，对小消息不友好。\n- 典型实现：Apache Hama、GraphX（基于 Spark 的 BSP）、Pregel（Google 的图计算框架，BSP 模型）。`,
    tags: ["BSP", "超步", "屏障同步", "PageRank", "并行图计算", "Pregel"],
  },
  {
    id: "aae-parallel-algorithms-4",
    chapter: "aae-parallel-algorithms",
    level: 4,
    question:
      `Work-Span 模型中，Work（W）和 Span（S）的关系是什么？Brent 定理如何给出并行运行时间 T_p 的界？Amdahl 定律与 Span 的关系是什么？`,
    answer:
      `Work 和 Span 的定义与关系：\n\nWork（W = T_1）：\n- 串行执行整个计算的总操作数。\n- 即用 1 个处理器运行的时间。\n- 代表「有多少活要干」。\n\nSpan（S = T_∞）：\n- 计算 DAG 中最长路径（关键路径）的长度。\n- 即用无限多处理器运行的时间下界。\n- 代表「串行瓶颈有多长」——无论有多少处理器，都不能快于 Span。\n\n并行度（Parallelism）= W / S：\n- 理论上能利用的最大处理器数。\n- 若 W/S = 1000，则用 1000 个处理器时理论上线性加速；超过 1000 后收益递减。\n- 衡量算法「有多少可并行」的内在属性。\n\nBrent 定理：\n\n给定 Work W、Span S、p 个处理器：\n  T_p ≤ W/p + S\n\n证明思路：\n- W/p 项：总工作量 W 均摊到 p 个处理器，每个处理器分到约 W/p 的活。\n- S 项：关键路径上的操作有依赖关系，必须串行执行，长度为 S。即使有无限处理器，关键路径也要 S 时间。\n- 两者加和：总时间不超过工作量均摊 + 串行瓶颈。\n\n推论：\n- 当 p ≤ W/S（处理器数不超过并行度）：T_p ≈ W/p（线性加速）。\n- 当 p > W/S（处理器数超过并行度）：T_p ≈ S（已达瓶颈，加更多处理器无益）。\n- 最大加速比 = W/S = 并行度。\n\nBrent 定理与调度器：\n- work-stealing 调度器（如 Cilk）的期望时间：T_p ≤ W/p + O(S)。\n- 这意味着 work-stealing 自动接近 Brent 定理的最优界——无需手动分配任务，调度器自动平衡负载。\n\nAmdahl 定律与 Span 的关系：\n\nAmdahl 定律：\n  Speedup ≤ 1 / (s + (1−s)/p)\n- s = 串行部分占比（0 ≤ s ≤ 1）。\n- p = 处理器数。\n- 最大加速比 ≤ 1/s（当 p → ∞）。\n\n与 Span 的对应：\n- Amdahl 定律的「串行部分 s」对应 Span。\n- 串行时间 = S，总时间 = W，串行占比 s = S/W。\n- Amdahl 最大加速比 = 1/s = W/S = 并行度。\n- 所以 Amdahl 定律和 Work-Span 模型本质相同——Span 就是 Amdahl 中的串行瓶颈。\n\n区别在于分析视角：\n- Amdahl 定律：从「串行占比 s」出发，宏观估计加速上限。适合架构级决策（评估多核投资回报）。\n- Work-Span 模型：从算法的 DAG 结构出发，精确计算 W 和 S。适合算法设计和调度分析。\n\n实例分析：并行归并排序\n\n串行归并排序：W = O(n log n)。\n\n并行化：\n- 递归分裂可并行：左右子数组排序并行 → Span 递归 T_∞(n) = T_∞(n/2) + O(merge span)。\n- 归并也可并行化（用并行归并算法，Span = O(log² n)）。\n- 总 Span = O(log² n × log n) 或更优。\n\nWork = O(n log n)（与串行相同），Span = O(log³ n)。\n并行度 = O(n log n / log³ n) = O(n / log² n)。\n\n用 Brent 定理：T_p ≤ O(n log n / p) + O(log³ n)。\n- p ≤ n / log² n 时：线性加速。\n- p > n / log² n 时：被 Span 瓶颈限制。\n\n工程启示：\n1. 降低 Span 是提高并行度的关键——找到计算中的串行瓶颈（最长依赖链）并缩短它。\n2. 增加 p 超过并行度 W/S 是浪费——多出的处理器闲置。\n3. 设计时先分析 W 和 S，确定并行度上限，再决定投入多少处理器。\n4. Amdahl 定律告诉你「串行部分是终极瓶颈」，Work-Span 模型告诉你「具体瓶颈在哪条路径上」——后者更可操作。`,
    tags: ["综合", "Work-Span", "Brent定理", "Amdahl定律", "并行度", "加速比"],
  },
];
