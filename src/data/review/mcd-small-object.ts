import type { ReviewQuestion } from "./types";

/** Modern C++ Design 小对象分配复习题 */
export const mcdSmallObjectQuestions: ReviewQuestion[] = [
  {
    id: "mcd-small-object-1",
    chapter: "mcd-small-object",
    level: 1,
    question: "小对象分配器要解决什么问题？为什么通用 malloc 对小对象不友好？",
    answer:
      "问题：程序里大量小对象（节点、迭代器、小策略对象）频繁 new/delete，通用 malloc 为每次分配付出固定开销（块头、对齐、搜索空闲块、系统调用），小对象本身只有几十字节，malloc 开销占比过高，且频繁分配产生内存碎片、缓存不友好。\n\n通用 malloc 对小对象不友好的原因：\n1. 每次分配带固定元数据头部（如 size/flags），小对象放大占比。\n2. 通用分配器要在大空闲池里搜索合适块，复杂度高于 O(1)。\n3. 频繁 malloc/free 触发系统调用（sbrk/mmap）或锁竞争，延迟高。\n4. 分配出的地址分散，破坏空间局部性，缓存命中率低。\n\n小对象分配器的思路：按对象大小分桶，每桶一次 malloc 切成多个等大 block，用空闲链表 O(1) 分配回收，把通用 malloc 的「每次一次系统调用」摊薄成「一桶一次系统调用、之后纯链表操作」。",
    tags: ["小对象分配", "malloc", "内存碎片"],
  },
  {
    id: "mcd-small-object-2",
    chapter: "mcd-small-object",
    level: 2,
    question: "FixedAllocator 与 Chunk 如何协作？一次 malloc 切多块如何降低单次分配开销？",
    answer:
      "Loki 小对象分配器分两层：\n\n1. Chunk（大块）：一次向系统 malloc 一大块连续内存（如 255 个 block 大小），内部按固定 blockSize 切成 N 个等大 block，用一个「空闲链表」（首字节指针串联）管理空闲 block。\n2. FixedAllocator（固定大小分配器）：管理一组同 blockSize 的 Chunk，对外提供 Allocate/Deallocate。分配时找一个有空闲 block 的 Chunk，从其空闲链表摘一个；回收时把 block 还回对应 Chunk 的空闲链表。\n\n协作降低开销：\n- 分配：FixedAllocator 找到有空闲的 Chunk，Chunk 从空闲链表 O(1) 摘一个 block 返回——无搜索、无系统调用（除非所有 Chunk 满，才 malloc 新 Chunk）。\n- 回收：根据指针算出所属 Chunk（地址落在 Chunk 区间内），把 block 压回该 Chunk 空闲链表，O(1)。\n- 一次 Chunk malloc 服务多次小对象分配，把系统调用开销从「每对象一次」摊薄成「每 N 对象一次」，单次分配压到接近 O(1)。\n\n关键：block 大小固定，所以无需搜索、无需合并空闲块，复杂度从通用 malloc 的搜索降为链表摘挂。",
    tags: ["FixedAllocator", "Chunk", "空闲链表", "O(1)"],
  },
  {
    id: "mcd-small-object-3",
    chapter: "mcd-small-object",
    level: 3,
    question: "空闲链表如何实现 O(1) 分配回收？SmallObjAllocator 的分桶策略如何选择？小对象如何确定归属的桶？",
    answer:
      "空闲链表 O(1) 原理：每个 Chunk 把空闲 block 串成单链表——每个空闲 block 的首字节存「下一个空闲 block 的偏移」（block 等大，可用偏移寻址）。分配时取链表头 block、链表头后移；回收时把 block 插回链表头。两步都是常数操作，与 Chunk 内 block 数无关。\n\n分桶策略：SmallObjAllocator 按「对象大小」分桶，每个桶对应一个 blockSize 的 FixedAllocator。\n1. 桶大小通常按 2 的幂或固定步长递增（如 8, 16, 24, ... 字节），覆盖从最小到阈值（如 256 字节）的范围。\n2. 超过阈值的对象直接走通用 malloc，不进小对象分配器——大对象 malloc 开销占比低，不值得分桶。\n3. 桶数有限，用数组索引快速定位。\n\n小对象归属桶：按请求大小向上取整到最近的 blockSize，找到对应 FixedAllocator。例如请求 13 字节 → 最近 blockSize 16 → 用 16 字节桶。这会浪费少量内存（内部碎片），但换来 O(1) 分配与无外部碎片。\n\n实现细节：Chunk 用 8 位索引存链表（block 数 ≤ 255），偏移寻址紧凑；FixedAllocator 维护「最近可用 Chunk」提示，加速定位。综合下来，分配回收都是几次数组/指针操作，远快于通用 malloc。",
    tags: ["空闲链表", "分桶", "O(1) 分配", "SmallObjAllocator"],
  },
  {
    id: "mcd-small-object-4",
    chapter: "mcd-small-object",
    level: 4,
    question: "小对象分配器在多线程下有何问题？内存碎片与「不归还内存」的权衡如何处理？何时该用、何时不该用？",
    answer:
      "多线程问题：\n1. 默认 SmallObjAllocator 是全局单例且非线程安全——多个线程同时分配会踩坏空闲链表。需配 ThreadingModel（如 ObjectLevelLockable）加锁，但锁竞争会抵消 O(1) 优势。\n2. 更好方案是每线程一个分配器（thread-local chunk 池），避免锁，但增加内存占用且跨线程释放复杂。\n3. Chunk 跨线程共享时，回收 block 需找到正确 Chunk，加锁寻址开销大。\n\n内存碎片与不归还：\n1. 内部碎片：向上取整到 blockSize 浪费（13 字节占 16 字节块），小块浪费比可控。\n2. 外部碎片：Chunk 一旦 malloc 就长期持有，即使内部 block 全空闲也不轻易还给系统——否则下次又要重新 malloc。这导致「分配器持有但未用」的内存堆积。\n3. 权衡：可设「Chunk 全空且闲置超过阈值时归还系统」策略，减少长期占用，但增加反复 malloc 风险。Loki 提供可配置的回收策略，由使用者按峰值内存与吞吐取舍。\n\n何时用：\n- 高频分配/释放、对象小且生命周期短（节点、迭代器、小策略对象、AST 节点）→ 收益巨大。\n- 分配模式可预测、能容忍内存不立即归还 → 适合。\n\n何时不该用：\n- 对象大（超阈值）→ 直接 malloc 更简单。\n- 长期持有、极少释放 → 小对象分配器无收益。\n- 内存受限环境且需精确归还 → 不归还特性可能不可接受。\n- 多线程高竞争且无法用 thread-local → 锁开销可能吃掉收益。\n- 现代替代：可用 `std::pmr::synchronized_pool_resource` 等标准池化分配器，或 jemalloc/tcmalloc 内置的线程缓存小对象优化，免自研。",
    tags: ["小对象分配", "多线程", "内存碎片", "权衡"],
  },
];
