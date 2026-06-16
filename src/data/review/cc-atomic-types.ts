/** 复习题库 · 原子类型与内存模型基础（cc-atomic-types）。《C++ 并发编程实战》第2版 §5 改编章节。 */

import type { ReviewQuestion } from "./types";

export const ccAtomicTypesQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cc-at-1",
    chapter: "cc-atomic-types",
    level: 1,
    question: "什么是「原子操作（atomic operation）」？用厨房比喻说。",
    answer:
      "原子操作是**不可分割**的操作：从任何其他线程看，它要么完全没发生、要么已经全部完成，绝不会被观察到「做了一半」的中间态。像那笔「要么全写上、要么完全没动」的订单改动——别人绝不会看到你改一半的样子。C++ 用 `std::atomic` 类型提供原子操作，且原子操作之间天然不构成数据竞争。",
    tags: ["原子操作", "定义"],
  },
  {
    id: "cc-at-2",
    chapter: "cc-atomic-types",
    level: 1,
    question: "什么是一个对象的「修改顺序（modification order）」？",
    answer:
      "针对**单个对象**而言：它一生中所有的写入操作存在一个唯一确定的全序（排成一条先后线），且所有线程对这条先后看法**完全一致**。像某条账目的「官方流水台账」——谁先改谁后改，全店看到的顺序一模一样。注意它是**单变量**的全序，不是跨多个变量之间的顺序。",
    tags: ["修改顺序", "定义"],
  },
  {
    id: "cc-at-3",
    chapter: "cc-atomic-types",
    level: 1,
    question: "什么是「数据竞争（data race）」？C++ 标准如何对待它？",
    answer:
      "两个或更多线程并发访问同一个内存位置、其中至少一个是写、且没有任何同步隔开它们，就是数据竞争。C++ 标准的态度极强硬：一旦发生，**整个程序的行为就是未定义的（undefined behavior）**——不是「结果随机但安全」，而是「什么都可能发生」（读到乱码、崩溃、把别处逻辑带歪都有可能）。",
    tags: ["数据竞争", "未定义行为", "定义"],
  },
  {
    id: "cc-at-4",
    chapter: "cc-atomic-types",
    level: 1,
    question: "什么是「撕裂读（torn read）」？",
    answer:
      "读取一个正在被写、且写入要分多步完成的变量时，读到「一部分是新值、一部分还是旧值」拼起来的结果——一个谁都没真正写过的乱码。比如 64 位变量分高 32 位、低 32 位两步写，读者卡在两步之间就拿到「高新 + 低旧」的撕裂值。非原子的并发读写就可能撕裂。",
    tags: ["撕裂读", "定义"],
  },
  {
    id: "cc-at-5",
    chapter: "cc-atomic-types",
    level: 1,
    question: "`std::atomic_flag` 是什么？它支持哪些操作？有什么强保证？",
    answer:
      "C++ 里最基础的原子类型，且标准**强制保证它一定无锁**。它只有「已置位 / 未置位」两个状态，只支持两个操作：`test_and_set`（原子地置位并返回它之前是不是已置位）和 `clear`（清位）。功能极简，常用来搭一个最朴素的自旋锁。",
    tags: ["atomic_flag", "无锁", "定义"],
  },
  {
    id: "cc-at-6",
    chapter: "cc-atomic-types",
    level: 1,
    question: "`is_lock_free()` 这个成员函数返回什么？",
    answer:
      "返回这个原子类型在**当前平台**上是不是**真用无锁指令**实现：`true` 表示无锁；`false` 表示标准库用了一把内部锁来模拟原子语义——语义仍正确，但不是无锁、性能不同。还有一个编译期常量 `is_always_lock_free` 可在编译期判断。",
    tags: ["is_lock_free", "无锁", "定义"],
  },
  {
    id: "cc-at-7",
    chapter: "cc-atomic-types",
    level: 1,
    question:
      "什么是 CAS（比较并交换）？`compare_exchange_weak(expected, desired)` 在做什么？",
    answer:
      "CAS（compare-and-swap）在一个原子操作里：比较原子变量的当前值是否等于 `expected`——**相等**就换成 `desired` 并返回 `true`（成功）；**不等**就把当前真实值写回 `expected` 并返回 `false`（失败，调用方据此重试）。像「看一眼账上还是不是我以为的那个数，是才改、不是就把真实值记下来重来」。是大多数无锁算法的核心原语。",
    tags: ["CAS", "compare_exchange", "定义"],
  },
  {
    id: "cc-at-8",
    chapter: "cc-atomic-types",
    level: 1,
    question: "哪种类型才能放进 `std::atomic<T>`？",
    answer:
      "只有**可平凡复制（trivially copyable）**的类型才能放进 `std::atomic<T>`——即仅靠「逐字节拷贝内存」就能完成复制（没有自定义拷贝逻辑、没有虚函数、没有需要特殊处理的成员），且析构平凡。简单内置类型（`int`、指针）和只含这类成员的小结构体都满足。",
    tags: ["可平凡复制", "std::atomic", "定义"],
  },

  // ── L2 理解：原理 / 关系 ──
  {
    id: "cc-at-9",
    chapter: "cc-atomic-types",
    level: 2,
    question:
      "为什么「两个线程非原子地读写同一个 int」是未定义行为，而不是「结果不确定但至少不崩」？",
    answer:
      "因为这构成**数据竞争**，而 C++ 标准对数据竞争的判定就是**整个程序未定义行为**——编译器有权假设它根本不发生，于是什么都可能发生。具体到底层：很多读写并非一步完成（如 64 位值分两步写），写到一半被读走就成**撕裂读**乱码；标准不保证你「最坏只读到旧值或新值」这个前提。把变量声明成 `std::atomic`，原子操作不可分割、彼此不构成数据竞争，才能保证读到的永远是完整的值。",
    tags: ["数据竞争", "未定义行为", "撕裂读"],
  },
  {
    id: "cc-at-10",
    chapter: "cc-atomic-types",
    level: 2,
    question: "修改顺序是「单变量全序」，这句话里的「单变量」为什么重要？",
    answer:
      "因为修改顺序只针对**单独一个对象**：x 有 x 的台账、y 有 y 的台账，每条台账内的写入先后所有线程看法一致。但「x 的某次写」和「y 的某次写」谁先谁后，**不**由修改顺序决定——那是更复杂的「线程间内存序」问题（下一章讲）。混淆这两者会以为「只要都是原子的，跨变量的先后也全线程一致」，这是错的。",
    tags: ["修改顺序", "单变量", "内存序"],
  },
  {
    id: "cc-at-11",
    chapter: "cc-atomic-types",
    level: 2,
    question:
      "为什么 `std::atomic_flag` 的 `test_and_set` 能用来「抢锁」，而普通 `bool` 的「读一下再写」不行？",
    answer:
      "抢锁的关键是「看一眼锁空不空、是空的就立刻占上」要**一笔完成**。`test_and_set` 把「读旧状态 + 置位」打包成一个不可分割的原子操作，并返回置位前的旧值——两个线程同时抢，只有一个拿到「旧值是未置位」（抢到），另一个拿到「旧值已置位」（继续自旋）。普通 `bool` 的「读—判空—写」是分开的几步，两个线程可能都读到「空」、都以为自己抢到了，锁就形同虚设。",
    tags: ["atomic_flag", "test_and_set", "自旋锁"],
  },
  {
    id: "cc-at-12",
    chapter: "cc-atomic-types",
    level: 2,
    question: "为什么 `std::atomic<T>` 不保证一定无锁？它对大类型会怎么做？",
    answer:
      "`std::atomic<T>` 只承诺**语义**上原子（行为正确），不承诺**实现**上无锁。对硬件原生支持的小类型（`int`、指针）它编译成无锁指令；但对较大或硬件不直接支持的 `T`，标准库会**偷偷加一把内部锁**来模拟原子语义——语义对，但其实是带锁的，性能不是无锁。只有 `std::atomic_flag` 被标准强制无锁。要查清就用 `is_lock_free()`。",
    tags: ["std::atomic", "is_lock_free", "无锁"],
  },
  {
    id: "cc-at-13",
    chapter: "cc-atomic-types",
    level: 2,
    question:
      "`compare_exchange_weak` 失败（当前值 ≠ expected）时，会对 `expected` 做什么？为什么这样设计？",
    answer:
      "失败时它会把原子变量的**当前真实值写回 `expected`**，再返回 `false`。这样设计是为了配重试循环：调用方拿着被更新成真实值的 `expected`，就能基于最新值重新算出 `desired` 再试一次，无需自己再读一遍。所以典型用法是 `while (!x.compare_exchange_weak(expected, f(expected))) {}`，循环体常常什么都不用写。",
    tags: ["compare_exchange_weak", "重试", "expected"],
  },
  {
    id: "cc-at-14",
    chapter: "cc-atomic-types",
    level: 2,
    question:
      "`compare_exchange_weak` 和 `compare_exchange_strong` 有什么区别？各适合什么场景？",
    answer:
      "`weak` 版允许**伪失败**（spurious failure）：明明当前值等于 `expected`，也可能偶尔返回 `false`。`strong` 版不会伪失败。区别带来取舍：`weak` 在某些平台编译成更高效的指令，但因为会伪失败，**必须**配重试循环用（反正循环里再试一次即可）；`strong` 适合「不方便循环、需要一次就给确定结果」的场景。配循环用时通常优先 `weak`。",
    tags: ["compare_exchange_weak", "compare_exchange_strong", "伪失败"],
  },

  // ── L3 应用：怎么用 / 怎么修 ──
  {
    id: "cc-at-15",
    chapter: "cc-atomic-types",
    level: 3,
    question:
      "`counter` 已是 `std::atomic<int>`，为什么 `counter = counter + 1` 并发自增仍会丢计数？怎么改？",
    answer:
      "因为 `counter = counter + 1` **不是**一个原子操作，而是**三步**——原子地 `load` 出旧值、在普通寄存器里 `+1`、再原子地 `store` 回去；三步之间别的线程能插进来：两个线程可能都读到旧值 5、各自算出 6 写回，两次自增只涨了 1。把变量声明成原子只保证**单独的** load/store 各自原子，粘不成一个整体。\n修法：用读改写原子操作 `counter.fetch_add(1)`（或 `++counter`），它把「读—加—写」压成一个不可分割的原子操作，绝不丢。",
    tags: ["fetch_add", "读改写", "误区"],
  },
  {
    id: "cc-at-16",
    chapter: "cc-atomic-types",
    level: 3,
    question:
      "同事用 `volatile int` 当多线程共享计数器，说「加了 volatile 就线程安全了」。对吗？该怎么做？",
    answer:
      "不对。C++ 里 `volatile` 只表示「这个变量可能被程序之外的因素改动（如硬件寄存器），别优化掉对它的读写」，它**既不保证原子性、也不防数据竞争**——`volatile ≠ atomic`。拿它当共享计数器照样有数据竞争（未定义行为）和丢计数。\n做法：多线程共享的同步变量一律用 `std::atomic`（如 `std::atomic<int>` + `fetch_add`）；`volatile` 是给内存映射 I/O 之类场景用的，与并发无关。",
    tags: ["volatile", "atomic", "误区"],
  },
  {
    id: "cc-at-17",
    chapter: "cc-atomic-types",
    level: 3,
    question:
      "写出用 CAS 把一个 `std::atomic<int>& x` 原子地翻倍的重试循环骨架，并解释循环体为什么常常是空的。",
    answer:
      "骨架：\n```cpp\nvoid atomic_double(std::atomic<int>& x) {\n    int expected = x.load();\n    while (!x.compare_exchange_weak(expected, expected * 2)) {\n        // 循环体常常什么都不用写\n    }\n}\n```\n循环体为空，是因为 `compare_exchange_weak` **失败时已经替你把 `expected` 刷成了真实的当前值**，下一轮 `while` 条件里的 `expected * 2` 自动用新值重算。`weak` 版偶尔伪失败也无妨——反正在循环里再试一次即可，这正是它配循环用通常更高效的原因。",
    tags: ["CAS", "compare_exchange_weak", "重试循环"],
  },

  // ── L4 综合：辨析 / 设计取舍 ──
  {
    id: "cc-at-18",
    chapter: "cc-atomic-types",
    level: 4,
    question:
      "把性能热路径上的共享数据从 `std::mutex` 保护的 `BigStruct` 换成 `std::atomic<BigStruct>`，期望「无锁提速」。这个想法可能错在哪？该怎么验证与决策？",
    answer:
      "可能错在「以为凡 `std::atomic` 就无锁」。只有 `std::atomic_flag` 被标准强制无锁；`BigStruct` 较大，很可能被标准库**用一把内部锁模拟**原子语义——这时 `std::atomic<BigStruct>` 语义对，但底层仍是带锁的，甚至可能比原来精心设计的 `std::mutex` 方案更慢（每次读写都加解锁，且粒度不可控）。\n验证与决策：① 先用 `is_lock_free()` / `is_always_lock_free` 查 `std::atomic<BigStruct>` 在目标平台是否真无锁；② 若是 `false`，要无锁就把数据**拆小**成硬件原生支持的小类型（如把关键字段单独做成 `std::atomic<int>`/指针），或重新设计数据结构；③ 始终用基准测试对比，别凭「atomic = 快」想当然。原子的价值是「无数据竞争 + 不可分割」，不等于「一定无锁、一定更快」。",
    tags: ["综合", "is_lock_free", "性能取舍", "设计"],
  },
];
