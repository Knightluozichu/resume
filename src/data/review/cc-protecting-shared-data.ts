/** 复习题库 · 线程间共享数据（cc-protecting-shared-data）。《C++ 并发编程实战》第2版 §3 改编章节。 */

import type { ReviewQuestion } from "./types";

export const ccProtectingSharedDataQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cc-psd-1",
    chapter: "cc-protecting-shared-data",
    level: 1,
    question: "什么是「竞态条件（race condition）」？用厨房比喻说。",
    answer:
      "多个线程同时访问同一份共享数据、且至少有一个在写时，最终结果取决于它们碰巧谁先谁后——执行顺序一变结果就变。像两个厨师同时往同一张订单上写字，谁的字盖了谁的全凭手快手慢。是并发编程最经典的 bug。",
    tags: ["竞态条件", "定义"],
  },
  {
    id: "cc-psd-2",
    chapter: "cc-protecting-shared-data",
    level: 1,
    question: "什么是「不变量（invariant）」？它和竞态条件有什么关系？",
    answer:
      "不变量是一段数据在「正确状态」下始终成立的约定（如「计数器的值 = 已发生的事件数」）。修改数据的中途不变量会被暂时打破，必须在别人看到前修复好。竞态之所以坏事，正是因为别的线程在「不变量被打破」的窗口里插了进来，读到/基于一个破损状态去操作。",
    tags: ["不变量", "竞态条件"],
  },
  {
    id: "cc-psd-3",
    chapter: "cc-protecting-shared-data",
    level: 1,
    question: "`std::mutex` 是什么？`lock()` 和 `unlock()` 各干什么？",
    answer:
      "`std::mutex`（互斥量）是一种同步原语，像后厨那把唯一的厨刀。`lock()` 上锁、拿到刀；`unlock()` 解锁、放下刀。同一时刻最多一个线程能持有它，别的线程想 lock 就得等。把读写共享数据的代码圈在 lock 与 unlock 之间，就保证任一刻只有一个线程在碰这份数据。",
    tags: ["mutex", "lock", "unlock"],
  },
  {
    id: "cc-psd-4",
    chapter: "cc-protecting-shared-data",
    level: 1,
    question: "什么是「临界区（critical section）」？",
    answer:
      "一段同一时刻最多只允许一个线程执行的代码，通常就是读写某份共享数据的那几行。用互斥量把它「圈」起来：进入前 lock、离开时 unlock，从而保证任一刻只有一个线程在这段代码里操作共享数据。",
    tags: ["临界区", "定义"],
  },
  {
    id: "cc-psd-5",
    chapter: "cc-protecting-shared-data",
    level: 1,
    question: "`std::lock_guard` 是什么？它的 RAII 行为是怎样的？",
    answer:
      "`std::lock_guard` 是一个 RAII 工具类：**构造时**对传入的 mutex 上锁、**析构时**自动解锁。把 `std::lock_guard g(m);` 写在临界区开头，离开作用域（正常返回或异常退出）时都会自动 unlock——比手动 `lock()`/`unlock()` 安全，绝不会因为忘记或异常而漏解锁。",
    tags: ["lock_guard", "RAII"],
  },
  {
    id: "cc-psd-6",
    chapter: "cc-protecting-shared-data",
    level: 1,
    question: "什么是「死锁（deadlock）」？最常见的成因是什么？",
    answer:
      "两个或多个线程互相等待对方持有的锁，谁都不肯先释放，于是全部僵在原地、永远走不下去。最常见的成因是不同线程以**不同顺序**获取多把锁，形成环形等待（A 持 lock1 等 lock2，B 持 lock2 等 lock1）。",
    tags: ["死锁", "环形等待"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "cc-psd-7",
    chapter: "cc-protecting-shared-data",
    level: 2,
    question:
      "两个线程各对 `counter`（初值 0）`++` 一次，为什么结果可能是 1 而不是 2？",
    answer:
      "因为 `++counter` 在机器层面不是原子的，要拆成「读—改—写」三步。若线程 A 读到 0、还没写回时线程 B 也读到 0，两人各自 +1 得 1、各自写回 1——后写的覆盖了先写的，一次 ++ 凭空蒸发，最终只有 1。结果取决于两条「读—改—写」碰巧怎么交错，这就是竞态。",
    tags: ["竞态条件", "读改写", "丢更新"],
  },
  {
    id: "cc-psd-8",
    chapter: "cc-protecting-shared-data",
    level: 2,
    question:
      "为什么推荐用 `std::lock_guard` 而不是手动 `lock()` / `unlock()`？",
    answer:
      "因为手动 unlock 容易漏：临界区中间若抛异常、或有提前 return，控制流可能跳过 `unlock()`，导致锁永远不释放（别的线程全卡死）。`lock_guard` 把解锁交给析构函数——无论正常返回还是异常退出，栈展开都会析构它、自动 unlock，做到异常安全。",
    tags: ["lock_guard", "异常安全", "RAII"],
  },
  {
    id: "cc-psd-9",
    chapter: "cc-protecting-shared-data",
    level: 2,
    question:
      "什么是「接口竞态（check-then-act）」？为什么给每个操作都加锁仍可能 race？",
    answer:
      "接口竞态指：把「查」和「用」拆成两步的接口（如先 `empty()` 再 `top()`/`pop()`），即便每个操作内部都正确加了锁，组合起来用仍可能在两步之间被打断——`empty()` 返回 false 之后、`top()` 之前，别的线程可能把容器弹空了。单操作加锁只保证操作**内部**无竞争，挡不住操作**之间**的空隙。",
    tags: ["接口竞态", "check-then-act"],
  },
  {
    id: "cc-psd-10",
    chapter: "cc-protecting-shared-data",
    level: 2,
    question: "`std::lock` / `std::scoped_lock` 为什么能避免死锁？",
    answer:
      "它们一次性锁住**多个**互斥量，内部用「全有或全无」的避让算法获取这些锁——要么全部锁上、要么一个都不锁后重试，绝不会出现「持有一把、等待另一把」的中间状态，因此从根上杜绝了因加锁顺序不一致导致的环形等待死锁。`std::scoped_lock`（C++17）还把它和 RAII 自动解锁打包在一起。",
    tags: ["std::lock", "scoped_lock", "死锁"],
  },
  {
    id: "cc-psd-11",
    chapter: "cc-protecting-shared-data",
    level: 2,
    question: "`std::unique_lock` 比 `std::lock_guard` 灵活在哪？代价是什么？",
    answer:
      "`unique_lock` 支持：① 延迟上锁（`std::defer_lock`，先不锁、之后再 lock）；② 中途提前 `unlock()`（再 `lock()`）；③ 移动——把锁的所有权转移给别的 unique_lock 或从函数返回。`lock_guard` 这些都做不到（构造即锁、到作用域结束才解、不可移动）。代价是 unique_lock 要维护「当前是否持锁」的标志，比 lock_guard 略有运行时开销。条件变量必须配 unique_lock 用。",
    tags: ["unique_lock", "lock_guard", "灵活加锁"],
  },
  {
    id: "cc-psd-12",
    chapter: "cc-protecting-shared-data",
    level: 2,
    question: "`std::call_once` 解决什么问题？比手写「双重检查锁定」好在哪？",
    answer:
      "它解决「某段初始化在多线程下只跑一次」的惰性初始化问题：`std::call_once(flag, f)` 保证 `f` 只被执行一次，其余线程会等它跑完再继续。手写双重检查锁定（DCLP）很容易因指令重排/内存序写出隐蔽的数据竞争 bug，而 `call_once` 由标准库正确实现，简单且无竞争，还不像普通 mutex 那样每次访问都上锁。",
    tags: ["call_once", "once_flag", "惰性初始化"],
  },
  {
    id: "cc-psd-13",
    chapter: "cc-protecting-shared-data",
    level: 2,
    question:
      "`std::shared_mutex`（读写锁）和普通 `std::mutex` 区别是什么？什么场景用它？",
    answer:
      "普通 mutex 任何访问都互斥（读也互相排斥）。`shared_mutex` 区分两种锁：读用 `std::shared_lock`（共享锁，多个读线程可同时持有），写用 `std::lock_guard`/`unique_lock`（独占锁，写时连读也挡）。适合**读多写少**的共享数据（如配置表、缓存）——让大量读操作并行，并发度明显高于普通 mutex。",
    tags: ["shared_mutex", "读写锁", "并发度"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "cc-psd-14",
    chapter: "cc-protecting-shared-data",
    level: 3,
    question:
      "`int counter=0; std::mutex m; void f(){ for(...) ++counter; }`——两个线程跑 `f`，结果偏小。怎么用最小改动修好？",
    answer:
      "在每次 `++counter` 外圈一把锁：`for(...){ std::lock_guard<std::mutex> g(m); ++counter; }`。这样两个线程的「读—改—写」被串行化，不再丢更新。注意锁要保护**每一处**对 counter 的访问；若还有别处读 counter，那里也得加同一把锁，否则竞态仍在。",
    tags: ["mutex", "lock_guard", "排错"],
  },
  {
    id: "cc-psd-15",
    chapter: "cc-protecting-shared-data",
    level: 3,
    question:
      "一个「线程安全队列」的 `empty()`/`front()`/`pop()` 都加了锁。消费者写 `while(!q.empty()){ auto v=q.front(); q.pop(); }`。有什么隐患？怎么改？",
    answer:
      "接口竞态：`empty()` 返回 false 后、`front()` 前，别的消费线程可能已把队列弹空，于是 `front()`/`pop()` 操作空队列、未定义行为。修法：把「查空+取头+弹出」合并成一个加锁的成员函数，如 `std::optional<T> try_pop();`（锁内判断空、取头、弹出、返回值，空则返回 nullopt）。调用方改成 `while(auto v = q.try_pop()){ ... }`。",
    tags: ["接口竞态", "try_pop", "排错"],
  },
  {
    id: "cc-psd-16",
    chapter: "cc-protecting-shared-data",
    level: 3,
    question:
      "`void swap(Account& x, Account& y){ lock_guard g1(x.m); lock_guard g2(y.m); ... }`——线程甲 `swap(a,b)`、线程乙 `swap(b,a)` 时偶发卡死。为什么？两种修法？",
    answer:
      "死锁：甲先锁 a.m 再要 b.m，乙先锁 b.m 再要 a.m，各持一把互等另一把，环形等待僵死。修法一（推荐）：`std::scoped_lock guard(x.m, y.m);` 一次锁两把（全有或全无，避开环）。修法二：约定全局固定加锁顺序——比如永远先锁地址较小的那个 mutex，所有线程都按此顺序，环就连不起来（C++17 前也可用 `std::lock(x.m,y.m)` + `lock_guard(..., std::adopt_lock)`）。",
    tags: ["死锁", "scoped_lock", "加锁顺序", "排错"],
  },
  {
    id: "cc-psd-17",
    chapter: "cc-protecting-shared-data",
    level: 3,
    question:
      "一个类用 lock_guard 保护内部 vector，却提供 `std::vector<int>& data(){ lock_guard g(m); return vec; }`。为什么这破坏了保护？",
    answer:
      "因为它把**指向受保护数据的引用**返回到了锁外。`data()` 返回时 `g` 析构、锁已释放，调用方却拿着 `vec` 的引用在锁外随意读写——保护被「漏」到了临界区之外，等于没锁。修法：别把受保护数据的指针/引用泄出临界区；要么返回值拷贝（`std::vector<int> snapshot()`），要么把「拿到数据后要做的事」以回调形式传进临界区内执行（`template<class F> void with_data(F f){ lock_guard g(m); f(vec); }`）。",
    tags: ["返回引用", "保护失效", "排错"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "cc-psd-18",
    chapter: "cc-protecting-shared-data",
    level: 4,
    question:
      "你要写一个被多线程共享的缓存（读多写少），要求线程安全、避免接口竞态、并尽量让读并行。请说出从选锁到设计接口的完整思路，并指出至少两个要避开的坑。",
    answer:
      "思路：① 选锁——读多写少用 `std::shared_mutex`：读路径用 `std::shared_lock`（多读并行），写路径用 `std::lock_guard`/`unique_lock`（独占）。② 设计接口避免接口竞态——别暴露「先查再用」的分步接口，而是提供原子的复合操作，如 `std::optional<V> get(const K&)`（锁内查找+返回值拷贝）、`void put(K,V)`（锁内写入）；需要「没有则插入」时提供一个 `get_or_compute(K, factory)` 在同一把锁里完成判断与插入。③ 返回值拷贝而非引用，避免把受保护数据泄到锁外。要避开的坑：(a) 接口竞态——把 check 和 act 拆成两个公有函数让外部组合；(b) 返回内部数据的引用/指针导致锁外访问；(c) 若内部还要锁多把（如分桶锁）务必用 scoped_lock 或固定顺序避免死锁；(d) 只给写加锁、读不加锁——读写并发仍是数据竞争，读也必须至少持共享锁。",
    tags: ["shared_mutex", "接口设计", "死锁", "综合"],
  },
];

export default ccProtectingSharedDataQuestions;
