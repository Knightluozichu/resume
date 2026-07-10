import type { ReviewQuestion } from "./types";

/** C++ 性能优化指南 · 动态分配优化复习题 */
export const opcDynamicAllocationQuestions: ReviewQuestion[] = [
  {
    id: "opc-dynamic-allocation-1",
    chapter: "opc-dynamic-allocation",
    level: 1,
    question: `栈分配和堆分配的成本差异有多大？为什么？`,
    answer:
      `栈分配：移动栈指针（1 条指令），约 1 纳秒。\n堆分配（malloc/new）：搜索空闲内存块、可能触发系统调用（brk/mmap）、修改页表，约数百纳秒到微秒。\n\n差异可达 100-1000 倍。原因：\n1. 栈是连续的，分配只需移动 \`rsp\` 寄存器。\n2. 堆是不连续的，malloc 要在空闲链表/树中搜索合适大小的块，可能触发内存碎片整理或系统调用。\n3. 堆分配还可能引发 false sharing（分配器给不同线程的内存落在同一缓存行）。\n\n所以「能用栈就不用堆」是性能优化的基本原则。`,
    tags: ["栈分配", "堆分配", "成本"],
  },
  {
    id: "opc-dynamic-allocation-2",
    chapter: "opc-dynamic-allocation",
    level: 2,
    question: `什么是对象池（object pool）？它如何减少动态分配的开销？有什么适用场景？`,
    answer:
      `对象池：预分配一块大内存，切分为固定大小的对象槽。需要对象时从池中取一个空闲槽，用完归还到池中，不调用 malloc/free。\n\n减少开销的原理：\n1. 一次 malloc 分配 N 个对象，后续复用——把 N 次 malloc 合并为 1 次。\n2. 取/还对象是 O(1) 的链表操作（几纳秒），远快于 malloc（数百纳秒）。\n3. 无内存碎片：固定大小槽位，分配/释放不产生外部碎片。\n\n适用场景：\n- 频繁创建销毁的同类型对象（如游戏中的子弹、网络中的消息包）。\n- 对象大小固定且已知。\n\n不适用：对象大小差异大、对象生命周期不确定、总数量不可预估。\n\n注意：对象池要考虑线程安全（多线程取/还需加锁或用无锁队列）。`,
    tags: ["对象池", "预分配", "复用"],
  },
  {
    id: "opc-dynamic-allocation-3",
    chapter: "opc-dynamic-allocation",
    level: 3,
    question: `以下代码在热路径中创建临时对象，如何优化？\n\n\`\`\`\nvoid process(const std::vector<int>& data) {\n    std::vector<int> temp;\n    temp.resize(data.size());\n    // ... 用 temp 做计算 ...\n}\n\`\`\``,
    answer:
      `问题：每次调用 \`process\` 都会 \`malloc\` 分配 \`temp\`，函数结束时 \`free\`。如果 \`process\` 在热路径中被高频调用，分配开销累积。\n\n优化方案：\n\n1. 静态/线程局部复用（最简单）：\n\`\`\`\nvoid process(const std::vector<int>& data) {\n    thread_local std::vector<int> temp;\n    temp.resize(data.size());\n    // ... 用 temp 做计算 ...\n}\n\`\`\`\n\`thread_local\` 让每个线程复用同一个 \`temp\`，只分配一次。注意线程安全（\`thread_local\` 天然线程隔离）。\n\n2. 调用方传入缓冲区（更显式）：\n\`\`\`\nvoid process(const std::vector<int>& data, std::vector<int>& temp) {\n    temp.resize(data.size());\n    // ...\n}\n\`\`\`\n调用方管理 \`temp\` 生命周期，可跨多次调用复用。\n\n3. 对象池（如果对象类型固定且频繁创建销毁）：\n从预分配的对象池中取/还 \`temp\`。\n\n4. 栈分配（如果大小固定且小）：\n用 \`std::array<int, N>\` 替代 \`vector\`，完全无堆分配。\n\n推荐方案 1（\`thread_local\`）或方案 2（传入缓冲），取决于是否需要控制复用粒度。`,
    tags: ["临时对象", "thread_local", "缓冲区复用", "应用"],
  },
  {
    id: "opc-dynamic-allocation-4",
    chapter: "opc-dynamic-allocation",
    level: 4,
    question: `综合分析：一个高性能网络服务器，每秒处理 10 万个请求，每个请求创建多个对象（解析器、响应体等）。profiling 显示 30% 时间花在 malloc/free。请设计优化方案。`,
    answer:
      `从减少分配次数和降低单次分配成本两个维度优化：\n\n1. 对象池化（核心）：\n请求解析器、响应体等固定类型对象用对象池。预分配池（每个类型一个），取/还 O(1) 无 malloc。这是收益最大的优化——把 10 万次/秒的 malloc 降为 0。\n\n2. Arena 分配器（批量分配）：\n每个请求分配一个 arena（内存竞技场），请求内所有临时对象从 arena 分配（指针移动，O(1)）。请求结束后整块 arena 释放——把 N 次分配合并为 1 次。\n\n3. 自定义分配器：\n为 \`std::vector\`、\`std::string\` 等容器提供自定义 \`allocator\`，从 arena 或对象池分配，避免默认 \`malloc\`。\n\n4. 零拷贝解析：\n请求解析时不拷贝数据到新 \`string\`，用 \`string_view\` 引用原始 buffer。减少解析阶段的分配。\n\n5. 响应预序列化：\n常见响应模板预格式化，只替换动态字段，避免每次从零拼接 \`string\`。\n\n6. 线程局部缓存：\n每个工作线程维护自己的空闲内存缓存（类似 tcmalloc/jemalloc 的 thread cache），减少锁竞争。\n\n7. 换分配器（最低成本）：\n链接 tcmalloc 或 jemalloc 替代 glibc malloc，多线程分配性能提升 2-5 倍，无需改代码。\n\n实施顺序：先换分配器（零改动收益）→ 再做对象池/Arena（收益最大）→ 最后零拷贝/预序列化。\n\n验证：每步都 benchmark，目标把分配开销从 30% 降到 5% 以下。`,
    tags: ["综合", "对象池", "arena", "分配器", "网络服务器"],
  },
];
