import type { ReviewQuestion } from "./types";

/** C++ 编程测试秘籍 · 并发测试复习题 */
export const ctrConcurrencyTestQuestions: ReviewQuestion[] = [
  {
    id: "ctr-concurrency-test-1",
    chapter: "ctr-concurrency-test",
    level: 1,
    question: `什么是线程安全？C++ 中 \`const\` 成员函数是否一定线程安全？\`std::cout\` 在多线程下行为如何？`,
    answer:
      `线程安全指某段代码在多线程并发调用时，不需要调用方额外同步也能保持正确（不破坏数据、不出竞态）。不同 API 的线程安全等级不同，要分清「线程安全」与「可重入」。\n\nconst 成员函数不一定线程安全：const 只保证「不修改对象的可观察状态」，但不代表并发调用安全。若 const 成员函数内部读写 \`mutable\` 成员（如缓存、计数器）而无锁，多线程并发就是数据竞争。即使不修改任何成员，若返回引用暴露内部状态也可能因外部并发写而出问题。const 是「逻辑不变」契约，不是「并发安全」契约。要线程安全需显式加锁或用原子操作。\n\nstd::cout 在多线程下：标准保证「字符交错但不数据竞争」——多个线程同时写 cout 不会导致程序崩溃或流对象损坏（有内部同步），但不同线程输出的字符可能交错混在一行，不保证「整行原子」。要输出整行不交错，需用独立字符串拼好再一次性 \`<<\`，或用外部锁包住整次输出。C++20 的 \`std::osyncstream\` 提供了同步流包装器，保证写入的内容作为一个整体输出不交错。`,
    tags: ["线程安全", "const 成员函数", "std::cout", "可重入"],
  },
  {
    id: "ctr-concurrency-test-2",
    chapter: "ctr-concurrency-test",
    level: 2,
    question: `死锁的四个必要条件是什么？C++ 中如何用 \`std::lock\` 或 \`std::scoped_lock\` 同时锁多个互斥量来避免死锁？`,
    answer:
      `死锁的四个必要条件（Coffman 条件，同时满足才发生死锁）：\n1. 互斥：资源同一时刻只能被一个线程占用。\n2. 占有并等待：线程持有至少一个资源，同时等待获取其他资源。\n3. 不可剥夺：资源不能被强行夺走，只能由持有者主动释放。\n4. 循环等待：存在线程的环形等待链，每个线程都在等下一个线程持有的资源。\n\n破坏任一条件即可避免死锁。最常用是破坏「循环等待」——给所有互斥量规定全局加锁顺序，线程都按相同顺序获取，就不会成环。\n\n用 std::lock / scoped_lock 同时锁多个互斥量：当必须同时持有多个锁且难以保证顺序时，用 \`std::lock(m1, m2, ...)\`（C++11）或 \`std::scoped_lock lock(m1, m2, ...)\`（C++17）一次性原子地获取所有锁。它们内部用「尝试-回退」算法（类似避免死锁的回退锁）：依次尝试 lock 每个，若某个失败就释放已锁的全部重试，从而避免一个线程拿了 m1 等 m2、另一个拿了 m2 等 m1 的循环等待。\n\nscoped_lock 是 RAII 封装，构造时锁、析构时解锁，且支持变参多个互斥量，是 C++17 起同时锁多个锁的首选。比手动分别 lock_guard 两个（顺序敏感易死锁）更安全。\n\n注意：scoped_lock 解决「同时持有多锁」的死锁，但不解决「锁粒度过大导致性能差」——仍应尽量缩短持锁区间、缩小锁粒度。`,
    tags: ["死锁", "Coffman 条件", "scoped_lock", "加锁顺序", "RAII"],
  },
  {
    id: "ctr-concurrency-test-3",
    chapter: "ctr-concurrency-test",
    level: 3,
    question: `\`std::atomic\` 的默认内存序是什么？为什么 \`memory_order_relaxed\` 不能用于同步？什么场景适合用 \`memory_order_release/acquire\`？`,
    answer:
      `std::atomic 的默认内存序是 \`memory_order_seq_cst\`（顺序一致）。它是最强的内存序：所有线程看到的所有原子操作的顺序全局一致，像在一个全局时间线上。最强也最慢，因为它要在处理器间插入较多内存屏障。默认用它最安全，性能敏感处再按需放松。\n\nmemory_order_relaxed 不能用于同步：relaxed 只保证「对该原子变量本身的读写是原子的」，不建立任何 happens-before 关系，不阻止该操作前后的其他（非原子/原子）读写重排。所以它只适合「只需原子计数、不关心与其他变量顺序」的场景，如统计计数器。若用它做「flag 标记数据已就绪」会失败——读者看到 flag 被置位，但 flag 置位前的数据写入可能因重排还没对读者可见，读到未初始化数据。\n\nrelease/acquire 适合的场景：经典的「发布-消费」同步——生产者写数据后用 store(release) 置标志，消费者用 load(acquire) 读标志，acquire 与配对的 release 建立 happens-before：消费者读到 release 写的值后，release 之前的所有写入（数据本身）对消费者可见。这比 seq_cst 开销小（只在 store/load 处加必要屏障），又能正确同步。典型用于单生产者-单消费者的无锁队列、once 初始化标志等。\n\n口诀：relaxed 只保原子不保顺序（计数用）；release/acquire 配对做发布-消费同步；seq_cst 全局一致最稳最慢（默认）。`,
    tags: ["atomic", "内存序", "memory_order_relaxed", "release/acquire", "seq_cst", "happens-before"],
  },
  {
    id: "ctr-concurrency-test-4",
    chapter: "ctr-concurrency-test",
    level: 4,
    question: `下面双重检查锁定（DCLP）单例在 C++11 前为何有 bug？C++11 后用 \`std::call_once\` 或 Meyers 单例如何修复？如果单例析构依赖另一全局对象，又该怎么处理？`,
    answer:
      `DCLP 在 C++11 前有 bug 的原因：经典 DCLP 写法 \`if (!inst) { lock; if (!inst) inst = new Singleton; } unlock;\`，问题在 \`inst = new Singleton\`——它分三步：分配内存、调用构造函数、把指针赋给 inst。C++11 前没有内存模型，编译器/CPU 可能重排成「分配→赋指针→构造」。另一线程第一次检查看到 inst 非空就直接返回，但对象还没构造完，使用未构造对象是 UB。根因是锁外的读 inst 与构造过程的写之间没有同步关系，C++03 标准无法约束这个顺序。\n\nC++11 后的修复：\n1. Meyers 单例（最简）：\`Singleton& inst() { static Singleton s; return s; }\`。C++11 标准保证函数内 static 局部变量的初始化是线程安全的（编译器用锁或原子保证只初始化一次），且初始化完成前的写对其他线程可见。无需手写锁。\n2. std::call_once：\`std::once_flag flag; Singleton* p; Singleton& inst(){ std::call_once(flag, []{ p = new Singleton; }); return *p; }\`。call_once 保证初始化函数只执行一次且对所有线程同步可见。适合需要显式控制初始化（如传参）的场景。\n3. atomic + 双重检查：用 \`std::atomic<Singleton*>\` 配 acquire/release 内存序也能正确，但比 Meyers 复杂，通常没必要。\n\n单例析构依赖另一全局对象的陷阱：单例与全局对象销毁顺序问题——若单例析构时要访问另一全局对象（如日志单例析构时写另一个配置单例），而那个对象已先析构，就拿到死引用崩溃。处理：\n- 让被依赖对象用 Phoenix 单例（销毁后可重建）或更长 longevity。\n- 或避免单例/全局对象互相依赖，改依赖注入。\n- 或用 Meyers 单例 + 不在析构里访问其他全局（让析构只清理自身资源）。\n现代 C++ 优先减少全局单例，用依赖注入把生命周期交给主程序，从根上规避销毁顺序问题。`,
    tags: ["DCLP", "双重检查锁定", "Meyers 单例", "call_once", "内存模型", "析构顺序", "综合分析"],
  },
];
