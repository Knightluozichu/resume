import type { ReviewQuestion } from "./types";

export const capProcessorArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "cap-processor-architecture-1",
    chapter: "cap-processor-architecture",
    level: 2,
    question: `指令周期的五阶段是什么？流水线如何提升吞吐率？`,
    answer:
      `经典 RISC 五阶段：IF 取指 → ID 译码 → EX 执行 → MEM 访存 → WB 写回。单周期实现每条指令一个时钟周期但时钟由最慢指令决定，浪费严重。流水线像工厂流水线把指令切成五道工序，五条指令同时在五道工序上推进，硬件利用率拉满。理想 k 级流水线加速比接近 k，吞吐率 = 1/最慢阶段延迟（木桶效应）。CPI = 理想 CPI + 停顿周期，无停顿时 CPI=1（单发射）。流水线寄存器在阶段间锁存结果。现代超标量每周期发射多条指令 CPI 可低于 1。`,
    tags: ["指令周期", "流水线"],
  },
  {
    id: "cap-processor-architecture-2",
    chapter: "cap-processor-architecture",
    level: 3,
    question: `流水线的三类冒险是什么？分别如何处理？`,
    answer:
      `①结构冒险——同一周期多条指令争用同一硬件资源（如都访存）。处理：资源重复，分离指令缓存与数据缓存（哈佛结构），重复 ALU。②数据冒险——后续指令依赖前一条尚未写回的结果。处理：转发（forwarding）把 EX/MEM 结果直接旁路给下一条 ID；无法转发时（如 load-use，load 数据 MEM 才就绪）插入 bubble 停顿一周期；编译器调度重排指令拉开依赖距离。③控制冒险——分支指令结果未决，下一条取指地址未知。处理：分支预测猜方向，推测执行提前跑，预测失败冲刷流水线；或简单停顿等分支结果。`,
    tags: ["冒险", "流水线"],
  },
  {
    id: "cap-processor-architecture-3",
    chapter: "cap-processor-architecture",
    level: 4,
    question: `为什么分支预测对现代 CPU 性能如此关键？预测失败的代价是什么？`,
    answer:
      `现代 CPU 流水线很深（10-20 级），每周期取多条指令。遇到分支时若等分支结果出来再取下一条，流水线要空等多个周期（等于流水线深度），IPC 暴跌。分支预测让 CPU 猜测分支方向并提前取指执行，预测成功流水线不停顿、吞吐率接近峰值。预测失败时必须冲刷流水线中所有错误推测执行的指令，代价约等于流水线深度 k 个周期——20 级 CPU 一次预测失败浪费 20 周期。典型程序每 5-10 条指令一个分支，预测准确率每提升 1% 性能提升显著，所以预测器（BHT/BTB 动态预测准确率超 95%）是 CPU 设计重头戏。Spectre 漏洞正是滥用推测执行读取越权数据。`,
    tags: ["分支预测", "推测执行", "性能"],
  },
  {
    id: "cap-processor-architecture-4",
    chapter: "cap-processor-architecture",
    level: 4,
    question: `「流水线级数越多越快」对吗？为什么 Pentium 4 的超长流水线失败了？`,
    answer:
      `不对。流水线加深能提升主频（每级更简单跑得更快），但有两个反作用力：①分支预测失败代价随级数线性增长——20 级流水线预测失败要冲刷 20 周期，深流水线下预测失败成本爆炸；②流水线寄存器本身有锁存开销，级数过多开销占比上升，且每级工作量过小时寄存器开销反超计算开销。Pentium 4 用 31 级超长流水线冲高主频（3.8GHz），但 IPC（每周期指令数）暴跌，且功耗发热失控，最终被 Core 架构（14-16 级较短流水线）取代。最优级数是主频与 IPC 的平衡点，不是越深越好。这是 CPU 设计的经典教训。`,
    tags: ["流水线", "性能权衡", "分支预测"],
  },
];
