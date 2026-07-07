import type { ReviewQuestion } from "./types";

/** C++ 高性能编程 · 内存管理复习题 */
export const chpMemoryManagementQuestions: ReviewQuestion[] = [
  {
    id: "chp-memory-management-1",
    chapter: "chp-memory-management",
    level: 1,
    question: "C++ 进程内存分为哪几段？栈分配和堆分配在性能上有什么根本差异？",
    answer:
      "进程虚拟地址空间分五段：text（代码段，只读指令）、data（已初始化全局/静态）、bss（零初始化全局/静态）、heap（堆，动态分配）、stack（栈，局部变量与调用帧）。\n\n根本差异：\n- 栈分配：只需移动栈指针（sub rsp），几乎免费；内存连续，缓存友好；函数返回自动回收。\n- 堆分配：要走分配器（malloc/new）查找空闲块、维护元数据、可能触发系统调用（brk/mmap），开销大（几十到几百 ns）；分配出的内存散落，缓存差；需手动释放或靠智能指针，易碎片。\n\n结论：能上栈不上堆。栈分配比堆分配快一到两个数量级，且缓存命中更好。高性能代码应优先栈上对象、避免热路径里 new/delete。",
    tags: ["内存布局", "栈", "堆", "分配"],
  },
  {
    id: "chp-memory-management-2",
    chapter: "chp-memory-management",
    level: 2,
    question: "什么是内存对齐？为什么未对齐访问会变慢？`alignas` 在什么场景下用？",
    answer:
      "内存对齐指数据的地址是其大小的整数倍（如 4 字节 int 地址能被 4 整除）。CPU 访问对齐数据通常一条指令完成；未对齐可能跨缓存行/页边界，需多次访问甚至触发异常。\n\n未对齐变慢的原因：\n1. 跨缓存行：一次访问要读两个缓存行再拼接。\n2. 跨页：可能触发额外的 TLB 查找或 page fault。\n3. 某些架构（ARM、旧 x86 SIMD）直接拒绝未对齐访问，硬件异常代价极高。\n\n`alignas` 用于显式指定对齐：\n- SIMD：`alignas(32) float buf[N]` 让数组对齐 32 字节，AVX 加载用对齐指令 `_mm256_load_ps` 更快。\n- 避免假共享：把多线程写的变量 `alignas(64)` 到不同缓存行。\n- 分配器对齐：自定义小对象池按缓存行对齐，减少跨行。\n\n原则：热点数据按自然对齐或缓存行对齐，能省下可观的访存开销。",
    tags: ["对齐", "alignas", "SIMD", "缓存行"],
  },
  {
    id: "chp-memory-management-3",
    chapter: "chp-memory-management",
    level: 3,
    question: "什么是内存池（memory pool）？相比直接 `new/delete`，它在什么场景下有优势，什么场景下反而更差？",
    answer:
      "内存池是预先一次性分配一大块内存，从中按固定大小切出块供申请/归还，避免每次都走通用分配器。优势在于把「多次小分配」合并为「一次大分配 + 指针挪动」。\n\n优势场景：\n1. 大量同尺寸小对象的频繁分配/释放（如游戏里的粒子、节点）。通用 malloc 每次几十 ns 且易碎片；内存池每次几 ns 且无碎片。\n2. 对延迟敏感的热路径：池的分配时间是常数、可预测，不会被分配器的锁或系统调用抖动拖累。\n3. 数据局部性：池里对象连续，遍历缓存友好。\n\n反而更差的场景：\n1. 对象大小差异大：固定块池会浪费（大块切小用不下、小块给大对象要拼）。此时通用分配器更灵活。\n2. 分配/释放稀疏：池预占大块内存但利用率低，浪费空间。\n3. 生命周期复杂、需跨线程：池要自己管空闲链表，多线程下还得加锁或用 thread-local，复杂度上来后可能不如智能指针 + 通用分配器。\n4. 代码复杂度：池要手动管理，易出 use-after-free、double-free，维护成本高。\n\n判断：先测量确认「小对象频繁分配」是热点，再上池。别为池而池。",
    tags: ["内存池", "分配器", "应用", "权衡"],
  },
  {
    id: "chp-memory-management-4",
    chapter: "chp-memory-management",
    level: 4,
    question: "综合分析：一个高频创建/销毁临时对象的热点函数，可以怎样从「换分配器、改生命周期、改数据布局」三个层面系统优化？",
    answer:
      "三层递进，从低成本到高成本：\n\n1. 改生命周期（最先做，风险最低）：\n- 把临时对象从堆挪到栈：`auto obj = compute()` 用返回值优化（RVO），避免 `new`。\n- 复用对象：把循环内 new 的对象提到循环外，循环里只 reset/reuse。\n- 用 `std::string_view`/`std::span` 代替 `std::string`/`vector` 拷贝，避免临时容器分配。\n- 延迟构造：用 `std::optional` 或 placement new，只在真正需要时构造。\n\n2. 换分配器（生命周期改不动时）：\n- 自定义 allocator：如 `std::pmr::monotonic_buffer_resource` 一次性大块、不释放，适合「一批临时对象一起析构」的场景，分配退化为指针递增。\n- 对象池：固定尺寸块的空闲链表，分配 O(1) 无锁（thread-local 池）。\n- 换全局分配器：`jemalloc`/`tcmalloc` 多线程小对象性能优于 glibc malloc。\n\n3. 改数据布局（榨取缓存）：\n- 把「创建销毁」改成「标记有效位」：预分配对象数组，激活/停用用 flag，根本不分配释放。这是 ECS 的核心思路。\n- SoA 替代 AoS：若只访问少数字段，把热字段拆成连续数组，删除变成 swap-pop。\n- 值语义 + 连续存储：用 `vector<Struct>` 替代 `vector<unique_ptr<Struct>>`，对象连续、少一次间接、缓存友好。\n\n工作流：先剖析确认热点是分配→先改生命周期（最易）→不够再上分配器→最后改数据布局（影响最大但重构成本最高）。每层都用 benchmark 验证收益再进下一层，避免过度设计。",
    tags: ["综合", "分配器", "生命周期", "数据布局"],
  },
];
