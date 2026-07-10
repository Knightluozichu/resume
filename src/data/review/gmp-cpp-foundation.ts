import type { ReviewQuestion } from "./types";

export const gmpCppFoundationQuestions: ReviewQuestion[] = [
  {
    id: "gmp-cpp-foundation-1",
    chapter: "gmp-cpp-foundation",
    level: 1,
    question: `栈内存和堆内存的区别是什么？各适合什么场景？`,
    answer: `栈：后进先出，分配只需移动指针（纳秒级），大小有限（1-8MB），自动释放。适合局部变量和函数参数。堆：动态分配，需搜索空闲块（百纳秒到微秒），空间大（GB级），手动释放。适合生命周期不确定的对象。游戏每帧大量分配优先用栈或对象池，避免频繁堆分配导致碎片化和帧率不稳。`,
    tags: ["栈内存", "堆内存", "内存模型"],
  },
  {
    id: "gmp-cpp-foundation-2",
    chapter: "gmp-cpp-foundation",
    level: 2,
    question: `RAII 的核心思想是什么？它如何保证内存安全？`,
    answer: `RAII（Resource Acquisition Is Initialization）核心思想：用对象生命周期管理资源——构造函数获取资源，析构函数释放资源。保证内存安全的机制：C++ 保证对象离开作用域时析构函数一定被调用（即使异常），资源一定被释放。不需要手动 delete，不会忘记释放，不会异常时泄漏。智能指针是 RAII 的直接应用。`,
    tags: ["RAII", "内存安全"],
  },
  {
    id: "gmp-cpp-foundation-3",
    chapter: "gmp-cpp-foundation",
    level: 3,
    question: `unique_ptr、shared_ptr、weak_ptr 分别在什么场景使用？`,
    answer: `unique_ptr：独占所有权，零开销，默认选择——大多数场景用这个。shared_ptr：共享所有权+引用计数，需要多个地方持有同一对象时用（有原子操作开销）。weak_ptr：弱引用不增加引用计数，用于打破 shared_ptr 循环引用（如 A 持有 B 的 shared_ptr，B 持有 A 的 weak_ptr）。原则：默认 unique_ptr，需共享才 shared_ptr，循环引用用 weak_ptr。`,
    tags: ["智能指针", "unique_ptr", "shared_ptr", "weak_ptr"],
  },
  {
    id: "gmp-cpp-foundation-4",
    chapter: "gmp-cpp-foundation",
    level: 4,
    question: `为什么游戏开发优先选 C++ 而非 C# 或 Java？`,
    answer: `三个核心原因：1. 内存控制权——C++ 允许精确控制每个对象的分配位置和释放时机（栈/堆/自定义分配器），游戏每帧大量分配需要这种控制。C#/Java 有 GC 无法精确控制。2. 性能——C++ 编译为原生代码无 GC 停顿，游戏要求稳定帧率不能容忍 GC 间歇性暂停（GC 暂停可达数十毫秒导致掉帧）。3. 跨平台——C++ 可编译到所有主流游戏平台（PC/主机/手机），C# 在主机平台支持有限。代价是 C++ 开发难度高（手动内存管理/未定义行为/编译复杂），但性能和控制权的优势在游戏领域不可替代。`,
    tags: ["C++优势", "游戏开发", "性能", "综合"],
  },
];
