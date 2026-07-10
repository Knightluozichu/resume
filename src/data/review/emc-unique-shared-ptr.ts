import type { ReviewQuestion } from "./types";

/** 条款 11-17 unique/shared/make 函数复习题 */
export const emcUniqueSharedPtrQuestions: ReviewQuestion[] = [
  {
    id: "emc-unique-shared-ptr-1",
    chapter: "emc-unique-shared-ptr",
    level: 1,
    question: `unique_ptr 和 shared_ptr 在所有权、拷贝行为和开销上有什么区别？`,
    answer:
      `三者对比：\n\n1. 所有权：unique_ptr 独占（同一时刻只有一个指针持有资源）；shared_ptr 共享（多个指针可指向同一资源，引用计数管理）。\n2. 拷贝：unique_ptr 禁止拷贝，只能 move 转移所有权；shared_ptr 允许拷贝（拷贝时引用计数 +1）。\n3. 开销：unique_ptr 是零开销抽象（大小与裸指针相同，无运行时成本，默认删除器下）；shared_ptr 有原子引用计数开销（控制块含原子计数器，每次拷贝/析构做原子操作），且多一个控制块的内存开销。\n\n选用原则：默认用 unique_ptr（轻量、语义清晰、不可误用）；只有需要多个所有者共享同一资源时才用 shared_ptr。unique_ptr 可隐式转 shared_ptr，反之不可，所以从独占开始是安全降级。`,
    tags: ["条款 18-19", "unique_ptr", "shared_ptr", "所有权", "开销"],
  },
  {
    id: "emc-unique-shared-ptr-2",
    chapter: "emc-unique-shared-ptr",
    level: 2,
    question:
      `weak_ptr 不增加引用计数，那它怎么安全访问资源？它解决的核心问题是什么？`,
    answer:
      `weak_ptr 通过 \`lock()\` 方法安全访问资源：\`lock()\` 原子地尝试把 weak_ptr 提升为 shared_ptr。若资源已不存在（引用计数已归零），返回空的 shared_ptr；若仍存在，返回一个有效的 shared_ptr（引用计数 +1），从而安全使用。这样避免了「检查时还在、使用时已释放」的竞态。\n\n用法：\n\`\`\`cpp\nstd::weak_ptr<Widget> wp = sp;\nif (auto p = wp.lock()) { /* p 有效，安全使用 */ }\n\`\`\`\n\n它解决的核心问题是 shared_ptr 的循环引用：两个对象互相用 shared_ptr 指向对方，引用计数永远不归零，资源永不释放。把其中一方改用 weak_ptr 打破循环，资源就能正常回收。典型场景是观察者模式（被观察对象用 shared_ptr 管理自身，观察者用 weak_ptr 引用被观察对象，避免阻止其析构）和缓存（缓存持有 weak_ptr，资源无强引用时自动失效）。`,
    tags: ["条款 20", "weak_ptr", "lock", "循环引用", "观察者"],
  },
  {
    id: "emc-unique-shared-ptr-3",
    chapter: "emc-unique-shared-ptr",
    level: 3,
    question:
      `条款 21 为什么优先用 make_unique/make_shared 而非直接 new？给出异常安全和性能两个理由，并说明何时不能用它。`,
    answer:
      `优先用 make 函数的两个理由：\n\n1. 异常安全：直接 new 在参数求值顺序中可能产生泄漏窗口。\n\`\`\`cpp\nfunc(std::shared_ptr<Widget>(new Widget), mayThrow());\n\`\`\`\n编译器可能先 \`new Widget\`，再求值 \`mayThrow()\`，最后构造 shared_ptr。若 mayThrow 抛异常，new 出的 Widget 还没被 shared_ptr 接管，就泄漏了。用 \`func(std::make_shared<Widget>(), mayThrow())\` 则没有这个窗口——make 内部一次完成「分配+构造+接管」，无裸 new 暴露在外。\n\n2. 性能（仅 make_shared）：make_shared 把对象和控制块合并为单次堆分配，而 \`shared_ptr(new Widget)\` 是两次（先 new 对象，再分配控制块）。单次分配更省内存、缓存更友好。\n\n何时不能用 make 函数：\n- 需要自定义删除器：make 不支持传删除器，只能 \`shared_ptr(new T, deleter)\`。\n- 需要 std::initializer_list 初始化：\`make_shared<T>({1,2})\` 无法推导 initializer_list，需用 \`make_shared<T>(std::initializer_list<...>{1,2})\` 或直接 new。\n- 内存紧张且对象大、weak_ptr 长寿：make_shared 把对象与控制块同分配，只要有 weak_ptr 指向，控制块不释放，对象内存也不能回收（即使所有 shared_ptr 都没了）。这时直接 new 让对象能早释放。`,
    tags: ["条款 21", "make_shared", "make_unique", "异常安全", "单次分配"],
  },
  {
    id: "emc-unique-shared-ptr-4",
    chapter: "emc-unique-shared-ptr",
    level: 4,
    question:
      `shared_ptr 的控制块在什么时机被创建？为什么「用同一个裸指针构造多个 shared_ptr」是致命错误？`,
    answer:
      `控制块创建时机（任一即可）：\n1. make_shared 调用时。\n2. 从 unique_ptr 构造 shared_ptr 时。\n3. 用「单独的 new 表达式」构造 shared_ptr 时。\n4. 当 shared_ptr 被拷贝自「已有的 shared_ptr」时，不创建新控制块，复用原控制块（计数 +1）。\n\n「用同一裸指针构造多个 shared_ptr」致命的原因：每个 shared_ptr 用裸指针构造时会创建各自独立的控制块，于是同一块内存被两个独立控制块管理，各自计数独立。当任一控制块计数归零，对象被析构并释放；另一控制块仍以为资源有效，最终再析构一次 → 双重释放，未定义行为。\n\`\`\`cpp\nWidget* raw = new Widget;\nstd::shared_ptr<Widget> sp1(raw);\nstd::shared_ptr<Widget> sp2(raw); // 致命！两个独立控制块，双重释放\n\`\`\`\n\n避免方法：从 shared_ptr 拷贝（复用控制块），或用 make_shared/enable_shared_from_this + shared_from_this()。enable_shared_from_this 让对象内部安全获得指向自身的 shared_ptr（复用同一控制块）。这是一道高频面试题，核心是理解「控制块与对象是一对一，裸指针不携带控制块信息」。`,
    tags: ["条款 19", "控制块", "双重释放", "enable_shared_from_this", "shared_ptr"],
  },
];
