import type { ReviewQuestion } from "./types";

/** CPU 眼里的 C++ · 缓存友好编程复习题 */
export const cpcCacheFriendlyQuestions: ReviewQuestion[] = [
  {
    id: "cpc-cache-friendly-1",
    chapter: "cpc-cache-friendly",
    level: 1,
    question: `什么是缓存行（cache line）？为什么它是 CPU 访存的最小粒度？`,
    answer:
      `缓存行（cache line）是 CPU 缓存与主存之间数据交换的最小单位，通常 64 字节。\n\n为什么是最小粒度：\nCPU 缓存由固定大小的缓存行组成（如 L1/L2/L3 都是 64 字节一行）。当 CPU 需要读一个字节时，不会只从内存取那 1 字节，而是把该字节所在的整行 64 字节都加载进缓存。这是因为「局部性原理」——访问了一个地址，很可能马上访问它附近的地址（空间局部性）。\n\n工程意义：\n1. 一次 cache miss 的代价是整行 64 字节的加载延迟（L1 命中约 1-4 周期，L2 约 10 周期，L3 约 40 周期，主存约 200+ 周期）。\n2. 即使你只读了 1 字节，若那 64 字节里其他数据也有用，相当于「免费」预取了。\n3. 若那 64 字节里只有 1 字节有用，其余 63 字节是浪费——缓存利用率仅 1/64。\n\n所以「缓存友好」的核心就是：让每次加载的 64 字节尽量全是热数据。`,
    tags: ["缓存行", "cache line", "局部性", "访存粒度"],
  },
  {
    id: "cpc-cache-friendly-2",
    chapter: "cpc-cache-friendly",
    level: 2,
    question: `什么是 false sharing（伪共享）？它为什么会拖慢多线程程序？如何消除？`,
    answer:
      `false sharing：多个线程各自修改位于同一缓存行的不同变量。虽然逻辑上线程间没有共享数据，但物理上它们共享了一个缓存行。\n\n拖慢原因：\n缓存一致性协议（MESI/MOESI）以缓存行为粒度维护一致性。线程 A 修改变量 X 后，该缓存行在 A 的缓存里是「Modified」，在 B 的缓存里被标记为「Invalid」。B 要修改变量 Y（同缓存行）时，发现自己的副本失效，必须从 A 拉回整行——于是 A 和 B 反复互相失效、互相拉取，缓存形同虚设，性能骤降（可能慢几十倍）。\n\n消除方法：\n1. 对齐填充：在变量间插入多余字节，让不同线程的变量落在不同缓存行。C++11 \`struct alignas(64)\` 或手动加 padding。\n2. 每线程独立数据：用 \`thread_local\` 或每线程独立数组区间，从根源隔离。\n3. 数据布局调整：把只读共享数据与可写共享数据分开，可写数据按线程分桶。\n\n典型场景：多线程计数器 \`counters[NUM_THREADS]\`，若每个 counter 是 \`int\`，64 字节缓存行装 16 个，16 个线程各改自己的 counter 就 false sharing。解决：每个 counter 填充到 64 字节。\n\n从 CPU 视角：false sharing 让缓存从「加速器」退化成「瓶颈」，是并发性能陷阱里最隐蔽的一种。`,
    tags: ["false sharing", "伪共享", "缓存一致性", "对齐填充"],
  },
  {
    id: "cpc-cache-friendly-3",
    chapter: "cpc-cache-friendly",
    level: 3,
    question: `遍历 \`std::vector<int>\` 和 \`std::list<int>\` 哪个更快？从缓存角度解释原因。在什么场景下 list 反而合理？`,
    answer:
      `绝大多数场景 \`std::vector\` 快得多。\n\nvector 缓存友好：\n- 元素连续存储，遍历时按地址顺序访问，完美命中「空间局部性」。\n- 第一次 miss 加载 64 字节（16 个 int），后续 15 个 int 全在缓存里，命中率接近 100%。\n- CPU 还有硬件预取器，检测到顺序访问模式会自动预取下一段，miss 进一步减少。\n\nlist 缓存不友好：\n- 每个节点独立分配，散布在堆各处，地址不连续。\n- 遍历时每跳一个节点都是一次潜在 cache miss（节点内容 + next 指针都不在缓存）。\n- 硬件预取器无法预测链表下一个节点的地址，无法预取。\n- 额外开销：每个节点一个 next 指针（8 字节），内存占用更大，指针追逐（pointer chasing）阻碍流水线。\n\nlist 合理的场景：\n1. 频繁在中间插入/删除且迭代器稳定性要求高（vector 中间插入要搬移后续元素）。\n2. 元素巨大且操作以「移动节点」为主（list 移动只需改指针，vector 要搬移大对象）。\n\n但即便如此，现代实践常推荐 \`std::vector\` + 逻辑删除（标记位 + 延迟整理），或自定义的节点池（让节点连续分配恢复局部性）。纯粹为「O(1) 插入」而牺牲缓存，往往得不偿失。\n\n本质：算法复杂度 O(n) 相同时，常数因子由缓存命中率决定。vector 的连续性让常数因子远小于 list。`,
    tags: ["vector vs list", "缓存命中", "空间局部性", "预取"],
  },
  {
    id: "cpc-cache-friendly-4",
    chapter: "cpc-cache-friendly",
    level: 4,
    question: `综合分析：AoS 与 SoA 两种数据布局在缓存层面有什么差异？为什么游戏/图形领域大量采用 SoA？`,
    answer:
      `AoS（Array of Structs）：\`struct { x,y,z,active } objs[N];\`，每个对象的所有字段连续存放，一个对象占一个连续块。\n\nSoA（Struct of Arrays）：\`struct { xs[N], ys[N], zs[N], actives[N]; }\`，每个字段独立成数组，所有对象的同一字段连续存放。\n\n缓存差异：\n- 遍历 active 字段时：\n  AoS 每加载一个缓存行（64 字节），里面有 x/y/z/active，只有 active（1-4 字节）是热数据，有效载荷约 25%。\n  SoA 加载 actives 数组，整行 64 字节全是 active，有效载荷 100%。\n- AoS 一次缓存行只覆盖约 8 个对象的 active；SoA 覆盖 16-64 个。\n- 当只访问少数字段时，SoA 的缓存利用率数倍于 AoS。\n\n游戏/图形采用 SoA 的原因：\n1. 粒子系统/实体系统常遍历单一字段（如只更新所有粒子的 active 标志、只渲染 position）。SoA 让每次访存物尽其用。\n2. SoA 利于 SIMD 向量化：同字段连续排列，可直接用一条向量指令同时处理 4/8/16 个元素。AoS 要 gather 操作，低效。\n3. 数据局部性增强后，硬件预取器工作更高效。\n\n代价：\n- SoA 访问单个对象的多字段要跨多个数组（多次访存），适合「批量处理同字段」不适合「随机访问单对象全部字段」。\n- 代码可读性下降，需借助元编程或 ECS 框架管理。\n\n权衡：按「访问模式」组织数据。若操作以「逐对象处理全部字段」为主（如完整复制对象），AoS 更优；若以「批量处理少数字段」为主（如粒子更新、渲染管线），SoA 胜出。ECS（Entity-Component-System）架构本质就是 SoA 思想在游戏引擎的体系化应用。`,
    tags: ["综合", "AoS", "SoA", "SIMD", "ECS", "数据布局"],
  },
];
