import type { ReviewQuestion } from "./types";

export const capMemoryHierarchyQuestions: ReviewQuestion[] = [
  {
    id: "cap-memory-hierarchy-1",
    chapter: "cap-memory-hierarchy",
    level: 2,
    question: `什么是局部性原理？时间局部性和空间局部性有何区别？举例说明。`,
    answer:
      `局部性原理指程序在一段时间内倾向访问相对集中的地址范围，是缓存有效的理论基础。时间局部性：最近访问过的数据短期内很可能再被访问——如循环变量 i 每次循环都用、热点数据反复读写，缓存把它留住下次命中。空间局部性：被访问数据的相邻地址很可能被访问——如数组按顺序遍历，缓存按 64 字节行加载，一次 miss 后续相邻元素全命中。利用例子：矩阵乘法按行优先顺序访问 A[i][k] 利用空间局部性；循环内重用变量利用时间局部性。反例：链表节点随机分布、列优先访问 C 数组（行优先存储）破坏空间局部性，缓存 miss 严重。`,
    tags: ["局部性", "缓存"],
  },
  {
    id: "cap-memory-hierarchy-2",
    chapter: "cap-memory-hierarchy",
    level: 3,
    question: `存储器层次结构的金字塔有哪些层？为什么需要分层？`,
    answer:
      `金字塔层次：寄存器 → L1 缓存 → L2 缓存 → L3 缓存 → 主存 → SSD → HDD。典型延迟：寄存器/L1 ~1ns、L2 ~4ns、L3 ~12ns、主存 ~100ns、SSD ~100μs、HDD ~10ms。每层都是下一层的缓存——L1 缓存 L2，主存缓存磁盘（虚拟内存换页）。需要分层的原因是工程师的残酷现实：快的存储小（寄存器纳秒级但只有几十个），大的存储慢（磁盘毫秒级但 TB 起步），没有任何单一技术既快又大又便宜。分层靠局部性原理让绝大多数访问命中顶层——L1 命中率 95%+ 时等效延迟接近 1ns，一旦 miss 到主存延迟翻 100 倍。命中率是性能命脉。`,
    tags: ["存储层次", "金字塔"],
  },
  {
    id: "cap-memory-hierarchy-3",
    chapter: "cap-memory-hierarchy",
    level: 3,
    question: `缓存的三种映射方式是什么？为什么组相联是常用折中？miss 的 3C 模型是什么？`,
    answer:
      `①直接映射——每个主存块映射到缓存唯一位置（set 内一块），地址 = tag + set index + offset。硬件最简单但冲突 miss 多。②全相联——块可放任意位置，命中率最高无冲突 miss，但查找需并行比较所有块硬件昂贵，只用于小缓存如 TLB。③组相联——折中：缓存分成多个 set，每个 set 有 E 路，主存块映射到固定 set 内任意路。E=1 退化为直接映射，E=全块退化为全相联。L1 常用 8 路组相联，平衡命中率与硬件复杂度（每 set 只需 8 路并行比较）。3C miss 模型：compulsory miss（冷启动首次访问）、capacity miss（缓存不够大放下整个工作集）、conflict miss（映射冲突，直接映射专属）。`,
    tags: ["缓存映射", "组相联", "3C 模型"],
  },
  {
    id: "cap-memory-hierarchy-4",
    chapter: "cap-memory-hierarchy",
    level: 4,
    question: `为什么缓存友好的代码可能比算法复杂度更优的代码快？举矩阵乘法的例子。`,
    answer:
      `大 O 描述的是渐进复杂度，忽略常数因子和缓存效应。缓存不友好的代码每步访问跨缓存行 miss 严重，实际延迟远超理论；缓存友好的代码顺序访问命中率高，等效延迟接近寄存器。经典例子：矩阵乘法 C = A×B 三重循环顺序不同性能差 10 倍。按 i,j,k 顺序 \`C[i][j] += A[i][k]*B[k][j]\` 时 B 按列访问跨缓存行 miss 严重（C 行优先存储，B[k][j] 跳行）。改成分块（blocking）把矩阵切成适配缓存的子块，子块内全在缓存里命中率极高，性能提升 10 倍。原则：①顺序访问利用空间局部性；②循环顺序让最内层访问连续内存；③分块适配缓存大小；④减少指针追逐（链表 cache unfriendly）。性能优化必须实测，缓存效应常让理论复杂度失真。`,
    tags: ["缓存友好", "矩阵乘法", "分块"],
  },
];
