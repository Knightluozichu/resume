import type { ReviewQuestion } from "./types";

export const gncBandwidthOptimizationQuestions: ReviewQuestion[] = [
  {
    id: "gnc-bandwidth-optimization-1",
    chapter: "gnc-bandwidth-optimization",
    level: 2,
    question: `Delta 压缩的核心思路是什么？它依赖什么前提条件？`,
    answer:
      `Delta 压缩只下发与上一份快照差异部分的带宽优化技术。核心思路是维护一份双方共享的基准快照，新快照到来时逐字段对比：没变的字段不传，变了的字段只传新值。用一个变更位掩码（Changed Bitmask）标识哪些字段变化，客户端先读掩码再按位读取变化字段。前提条件是服务器和客户端都保留最近一份快照作为基准——如果基准丢了，Delta 就无法还原，需要周期性穿插全量快照来修复。`,
    tags: ["Delta 压缩", "带宽优化", "基准快照"],
  },
  {
    id: "gnc-bandwidth-optimization-2",
    chapter: "gnc-bandwidth-optimization",
    level: 3,
    question: `位打包如何压缩一个血量字段（0-100）和玩家 ID（最多 64 人）？`,
    answer:
      `默认 int 各占 32 位，血量 + ID = 64 位 = 8 字节。位打包按实际取值范围分配最少位数：血量 0-100 需要 7 位（2^7=128 ≥ 101），玩家 ID 0-63 需要 6 位（2^6=64）。总计 7 + 6 = 13 位 ≈ 1.6 字节，比 8 字节省 80%。位打包器打破字节边界，把两个字段紧密排列在一个 16 位字中，不浪费任何一个 bit。关键在于 BitWriter/BitReader 能按任意位数读写，而非按字节对齐。`,
    tags: ["位打包", "Bit Packing", "压缩"],
  },
  {
    id: "gnc-bandwidth-optimization-3",
    chapter: "gnc-bandwidth-optimization",
    level: 3,
    question: `Delta 压缩中如果基准快照丢了怎么办？为什么不能为保证基准可靠而走可靠通道？`,
    answer:
      `解决方案有二：①周期性穿插全量快照——每隔 N 帧发一次完整状态而非 Delta，丢失基准的客户端最多等 N 帧就能自我修复；②关键状态变更走可靠通道保证到达，常规 Delta 走不可靠通道，丢了等下一个全量快照。不能为保证基准可靠而对所有包走可靠通道——那会引入队头阻塞（旧包阻塞新包），退化成 TCP 的问题。游戏数据时效性强，200ms 前的位置到了也没用，等基准重传不如等下一个全量快照。`,
    tags: ["Delta 压缩", "全量快照", "可靠性"],
  },
  {
    id: "gnc-bandwidth-optimization-4",
    chapter: "gnc-bandwidth-optimization",
    level: 4,
    question: `如何用量化压缩四元数旋转？比直接传四个 float 省多少？`,
    answer:
      `四元数四个分量 (x,y,z,w) 模为 1，只有三个独立分量。压缩方案：找出绝对值最大的分量（用 2 位索引标识是哪个），只传另外三个最小分量。每个分量范围 [-1/√2, 1/√2]（约 ±0.707），量化到 9 位（512 级，精度约 0.0014）足够。总计 3×9 + 2 = 29 位，比直接传 4×32 = 128 位省 75%（约 4 字节 vs 16 字节）。解压时根据模为 1 的约束反算最大分量。坐标量化类似：厘米级精度用 16 位有符号整数代替 32 位浮点，省一半。`,
    tags: ["量化", "四元数", "压缩", "位打包"],
  },
];
