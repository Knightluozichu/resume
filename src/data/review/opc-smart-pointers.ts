import type { ReviewQuestion } from "./types";

/** C++ 性能优化指南 · 智能指针性能复习题 */
export const opcSmartPointersQuestions: ReviewQuestion[] = [
  {
    id: "opc-smart-pointers-1",
    chapter: "opc-smart-pointers",
    level: 1,
    question: "`std::unique_ptr` 和 `std::shared_ptr` 的运行时开销分别是什么？",
    answer:
      "`std::unique_ptr`：零运行时开销。它编译期管理所有权，通过 move 语义转移指针，析构时调用 delete。生成的代码与裸指针 + 手动 delete 完全一致。\n\n`std::shared_ptr`：有运行时开销。\n1. 原子引用计数：每次拷贝 `shared_ptr` 执行原子 `fetch_add`，每次析构执行原子 `fetch_sub`。原子操作比普通操作贵 10-100 倍（缓存同步开销）。\n2. 控制块：额外分配一个控制块（存引用计数、弱引用计数、deleter），通常是一次独立堆分配。\n3. 间接访问：控制块与对象本身可能不在同一缓存行，增加 cache miss。\n\n所以默认应选 `unique_ptr`，只有需要共享所有权时才用 `shared_ptr`。",
    tags: ["unique_ptr", "shared_ptr", "零开销", "引用计数"],
  },
  {
    id: "opc-smart-pointers-2",
    chapter: "opc-smart-pointers",
    level: 2,
    question: "`std::shared_ptr` 的控制块是什么？`std::make_shared` 相比直接 `new` 有什么性能优势？",
    answer:
      "控制块：`shared_ptr` 内部维护的元数据结构，包含：\n- 强引用计数（shared_ptr 的数量）\n- 弱引用计数（weak_ptr 的数量）\n- 自定义 deleter\n- 自定义 allocator\n\n`make_shared` 的优势：\n`std::make_shared<T>(args...)` 把对象和控制块分配在同一块内存中（一次 malloc），而 `std::shared_ptr<T>(new T(args...))` 是两次 malloc（一次 new 对象，一次分配控制块）。\n\n1. 少一次分配：`make_shared` 1 次 malloc，直接 new 2 次。\n2. 缓存友好：对象和控制块在同一缓存行附近，访问控制块时 cache 命中率更高。\n3. 异常安全：避免 `new T` 后构造 `shared_ptr` 前抛异常导致内存泄漏。\n\n缺点：`make_shared` 把对象和控制块绑定，只要还有 `weak_ptr` 存活，对象的内存就不会释放（即使 `shared_ptr` 已归零）。大对象 + 长寿命 `weak_ptr` 场景需注意。",
    tags: ["控制块", "make_shared", "分配", "缓存友好"],
  },
  {
    id: "opc-smart-pointers-3",
    chapter: "opc-smart-pointers",
    level: 3,
    question: "以下代码在多线程热路径中使用 `shared_ptr`，性能不达标。如何优化？\n\n```\nstd::shared_ptr<Config> config;\n// 多线程频繁读取 config\nvoid handle() {\n    auto cfg = config;  // 拷贝 shared_ptr\n    // ... 使用 cfg ...\n}\n```",
    answer:
      "问题：每次 `auto cfg = config` 执行原子引用计数 `fetch_add`，多线程下原子操作引发缓存行同步（MESI 协议 invalidate 其他核的缓存），成为瓶颈。\n\n优化方案：\n\n1. 确认是否真的需要 `shared_ptr`：\n如果 `config` 在初始化后不再变更（只读），用 `const Config&` 或 `const Config*` 引用全局配置，完全无引用计数开销。`shared_ptr` 只在所有权共享且生命周期不确定时才需要。\n\n2. 减少拷贝次数——传 const 引用：\n```\nvoid handle(const std::shared_ptr<Config>& cfg) {\n    // 不拷贝，直接用\n}\n```\n但要注意：如果 `config` 可能在其他线程被 `reset`，传引用不安全（可能悬空）。需配合读写锁或 RCU。\n\n3. 用 `std::atomic<std::shared_ptr>`（C++20）或 `std::atomic_load`：\n如果配置会变更，用原子操作加载 `shared_ptr`，避免数据竞争。但这仍有原子开销。\n\n4. 最佳方案——配置不可变 + 原子交换指针：\n配置对象本身不可变（每次更新创建新对象），用 `std::atomic<Config*>` 或 RCU 发布新指针，读路径无引用计数开销，写路径罕见可接受。\n\n核心判断：读多写少 → 去掉 `shared_ptr` 改裸指针/引用 + 原子发布；读写都多 → `shared_ptr` 可能是合理选择但需 benchmark。",
    tags: ["shared_ptr", "多线程", "原子操作", "应用"],
  },
  {
    id: "opc-smart-pointers-4",
    chapter: "opc-smart-pointers",
    level: 4,
    question: "综合分析：一个团队把所有裸指针都换成了 `shared_ptr`「以防万一」，结果性能下降了 40%。请分析原因并给出修复策略。",
    answer:
      "性能下降原因：\n1. 原子引用计数开销：每次拷贝/析构 `shared_ptr` 都执行原子操作。在热路径中（如循环、频繁传参），这些原子操作累积成巨大开销。\n2. 缓存行竞争：多线程拷贝同一个 `shared_ptr` 时，引用计数所在的缓存行在核间反复 invalidate（false sharing on control block）。\n3. 额外分配：控制块需要独立堆分配（除非用 `make_shared`），增加 malloc 次数。\n4. 滥用导致所有权模糊：把不需要共享所有权的指针也改成 `shared_ptr`，不仅增加开销，还可能造成循环引用内存泄漏。\n\n修复策略：\n\n1. 梳理所有权模型：\n- 独占所有权 → `unique_ptr`（零开销）\n- 不拥有 → 裸指针/引用（零开销）\n- 共享所有权 → `shared_ptr`（有开销，仅必要时用）\n\n2. 热路径去 `shared_ptr`：\n- 函数参数传 `const T&` 或 `const T*` 而非 `shared_ptr<T>`（函数不延长生命期就不需要持有 `shared_ptr`）。\n- 循环内不拷贝 `shared_ptr`，在循环外持有一次。\n\n3. 用 `make_shared` 统一分配：\n必须用 `shared_ptr` 的地方，用 `make_shared` 减少一次 malloc。\n\n4. benchmark 驱动：\n用 perf 定位 `shared_ptr` 原子操作的热点函数，优先优化那些在循环/高频调用路径上的。\n\n核心原则：`shared_ptr` 是所有权管理工具，不是「安全指针」。滥用它用原子操作的开销换取「不用思考所有权」的便利，在性能敏感场景得不偿失。",
    tags: ["综合", "滥用", "所有权", "热路径"],
  },
];
