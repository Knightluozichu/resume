/** 复习题库 · 同步并发操作（cc-synchronizing-operations）。《C++ 并发编程实战》第2版 §4 改编章节。 */

import type { ReviewQuestion } from "./types";

export const ccSynchronizingOperationsQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cc-so-1",
    chapter: "cc-synchronizing-operations",
    level: 1,
    question: "什么是「条件变量（condition_variable）」？用厨房比喻说。",
    answer:
      "`std::condition_variable` 是一种同步原语，配一把 mutex 用。一个线程 `wait` 时会**原子地「释放锁 + 睡眠」**，不占 CPU 空转；另一个线程改了共享状态后调 `notify_one`/`notify_all` 把它叫醒。像后厨那只「上菜」铃：服务员先歇着、厨师把菜做好按铃才叫醒它。",
    tags: ["条件变量", "定义"],
  },
  {
    id: "cc-so-2",
    chapter: "cc-synchronizing-operations",
    level: 1,
    question: "什么是「虚假唤醒（spurious wakeup）」？",
    answer:
      "条件变量可能在**没有任何线程 notify** 的情况下，自己把 `wait` 中的线程唤醒一次——这是操作系统底层实现允许的现象，不是 bug。所以醒来后必须重新检查「我等的条件真的成立了吗」，不能假定一被唤醒条件就一定满足。挡它的办法是给 `wait` 配谓词。",
    tags: ["虚假唤醒", "条件变量"],
  },
  {
    id: "cc-so-3",
    chapter: "cc-synchronizing-operations",
    level: 1,
    question: "`std::future` 是什么？它的 `get()` 有什么限制？",
    answer:
      "`std::future<T>` 代表「一个将来才会有的结果」，像点单换回的取餐凭证：拿着它调 `get()` 去取结果，就绪就立刻拿到、没就绪就阻塞等待；任务抛的异常也会被存进它、在 `get()` 时原样重新抛出。限制：普通 `future` 的 `get()` **只能调一次**——结果一取就被搬走，再 `get` 会抛 `std::future_error`。",
    tags: ["std::future", "get", "定义"],
  },
  {
    id: "cc-so-4",
    chapter: "cc-synchronizing-operations",
    level: 1,
    question: "`std::async` 是什么？它返回什么？",
    answer:
      "`std::async(f, args...)` 启动一个异步任务运行 `f`，**立刻返回一个 `std::future`**，将来用它 `get()` 取 `f` 的返回值（或它抛的异常）。像服务员替你下单、换回一张取餐凭证：菜在后厨做、你拿凭证来取。启动方式由 launch 策略控制。",
    tags: ["std::async", "future", "定义"],
  },
  {
    id: "cc-so-5",
    chapter: "cc-synchronizing-operations",
    level: 1,
    question: "`std::promise` 是什么？它和 `future` 是什么关系？",
    answer:
      "`std::promise<T>` 是 future 的「**写端**」：你手动持有它，在任意线程调 `set_value(v)` 把值、或 `set_exception(e)` 把异常摆进配对的 future；另一个线程用 `promise.get_future()` 拿到的 future 去 `get()` 取。一个 promise 配一个 future，`set` 只能调一次。像厨师手动把做好的菜摆上取餐台。",
    tags: ["std::promise", "future", "定义"],
  },
  {
    id: "cc-so-6",
    chapter: "cc-synchronizing-operations",
    level: 1,
    question: "`std::packaged_task` 是什么？它比 `std::async` 灵活在哪？",
    answer:
      "`std::packaged_task<R(Args...)>` 把一个可调用对象「包装」起来并关联一张 future：像调用普通函数那样调用它时，它执行被包装的函数、把返回值/异常存进关联的 future。它本身**可移动**（搬进别的线程、存进容器），所以你能「先打包任务、之后再决定在哪个线程、什么时候跑」——线程池的任务队列常用它。`async` 则是起线程和执行一手包办、不能这样搬运延后。",
    tags: ["packaged_task", "灵活性", "定义"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "cc-so-7",
    chapter: "cc-synchronizing-operations",
    level: 2,
    question: "为什么 `cv.wait` 必须带谓词？不带谓词会出哪两种 bug？",
    answer:
      "因为不带谓词无法分辨「真该走了」还是「白醒一场」。会出两种 bug：① **丢失唤醒**——`notify` 发生在你 `wait` 之前那一瞬，铃白响了、等你睡下就再也等不到；② **虚假唤醒**——没人 notify 也可能自己醒。带谓词的 `cv.wait(lk, pred)` 等价于 `while(!pred()) wait(lk);`：睡前查一次（条件已成立就根本不睡，挡丢失唤醒），醒来再查一次（条件没成立就接着睡，挡虚假唤醒）。",
    tags: ["谓词", "虚假唤醒", "丢失唤醒"],
  },
  {
    id: "cc-so-8",
    chapter: "cc-synchronizing-operations",
    level: 2,
    question:
      "`cv.wait(lk, pred)` 内部到底做了哪几件事？为什么必须用 `unique_lock` 而不是 `lock_guard`？",
    answer:
      "`wait(lk, pred)` 进来先查一次 `pred()`，假就**原子地「释放 `lk` + 睡眠」**（让别人能拿锁改数据）；被 notify 叫醒后**先重新锁回 `lk`**，再查一次 `pred()`，仍假就接着睡。因为 `wait` 需要在睡眠期间**中途解锁、醒来再上锁**，而 `lock_guard` 一构造就锁死到作用域结束、不能中途解开；只有 `unique_lock` 支持这种解锁/上锁的灵活操作，所以条件变量必须配 `unique_lock`。",
    tags: ["条件变量", "unique_lock", "机制"],
  },
  {
    id: "cc-so-9",
    chapter: "cc-synchronizing-operations",
    level: 2,
    question: "`notify_one()` 和 `notify_all()` 的区别？各在什么场景用？",
    answer:
      "`notify_one()` 叫醒**一个**在 `wait` 的等待者，`notify_all()` 叫醒**所有**等待者。一个数据只够一个消费者取时用 `notify_one`（避免叫醒一堆、大多数又查谓词接着睡，浪费）；若是「某个事件已发生」要让所有等待者都继续（如「初始化完成」「该退出了」），用 `notify_all`。习惯上先离开临界区（解锁）再 notify，否则被叫醒的线程醒来发现锁还被占着、又得卡一下。",
    tags: ["notify_one", "notify_all", "条件变量"],
  },
  {
    id: "cc-so-10",
    chapter: "cc-synchronizing-operations",
    level: 2,
    question:
      "`std::launch::async` 和 `std::launch::deferred` 行为差在哪？不写策略（缺省）会怎样？",
    answer:
      "`launch::async` **一定立刻另起一个线程**异步执行；`launch::deferred` 则**推迟到** `future.get()`/`wait()` 被调用时，才在**调用者线程**里**同步**执行——deferred 下若从不 `get`，任务**永远不会运行**。不写策略（缺省给两者）时由实现自行二选一，行为不确定（可能选成 deferred）。所以想要真并发务必显式写 `std::launch::async`。",
    tags: ["launch策略", "async", "deferred"],
  },
  {
    id: "cc-so-11",
    chapter: "cc-synchronizing-operations",
    level: 2,
    question:
      "异步任务里抛了异常，会丢吗？怎么传回调用线程？`promise` 怎么传异常？",
    answer:
      "不会丢。`std::async`/`packaged_task` 会把任务抛出的异常**存进 future**，在你 `get()` 时**原样重新抛出**——照样能 `try/catch`。用 `promise` 时则手动传：在工作线程里 `catch` 住异常后调 `p.set_exception(std::current_exception())` 把它摆上取餐台，配对的 future `get()` 时就会重新抛出这个异常。这让工作线程的错误能安全地传回调用线程统一处理。",
    tags: ["异常传递", "future", "set_exception"],
  },
  {
    id: "cc-so-12",
    chapter: "cc-synchronizing-operations",
    level: 2,
    question:
      "`std::future` 和 `std::shared_future` 区别是什么？什么场景必须用 `shared_future`？",
    answer:
      "普通 `std::future` 的 `get()` **只能调一次**（结果一取就被搬走、future 变空），且不可拷贝（只移动）。`std::shared_future` 可被**多次拷贝、多个线程各持一份、都能对同一个结果 `get()`**。当「多方都要等同一个结果」时（如一个『配置加载完成』事件要通知一群工作线程），普通 future 不够用，必须用 `shared_future`（由 `future.share()` 转得）。",
    tags: ["shared_future", "future", "并发度"],
  },

  // ── L3 应用：读代码 / 排错 ──
  {
    id: "cc-so-13",
    chapter: "cc-synchronizing-operations",
    level: 3,
    question:
      "`std::async(std::launch::async, do_log);`（不接收返回值）想让 do_log 后台异步跑、主线程不等。这句会如愿「fire-and-forget」吗？为什么？怎么改？",
    answer:
      "不会。问题不在策略，而在**没人接住返回的 future**：`std::async` 返回的是临时 future，语句一结束就析构，而 async 策略下 future 的析构函数会**阻塞等任务跑完**。于是这行表面异步、实际同步卡在这里直到 do_log 结束。改法二选一：① 真要「派出去就不管」用 `std::thread t(do_log); t.detach();`（或线程池），别用 async；② 想要 future 的好处就用变量接住（`auto f = std::async(...);`），让它活到你真打算等的那刻再析构。",
    tags: ["async", "future析构", "排错"],
  },
  {
    id: "cc-so-14",
    chapter: "cc-synchronizing-operations",
    level: 3,
    question:
      "`auto f = std::async(std::launch::deferred, task); do_other_work();`——之后从不 `f.get()`，结果发现 task 根本没跑。为什么？怎么修？",
    answer:
      "因为 `deferred` 策略下任务被**推迟到** `get()`/`wait()` 时才在调用者线程同步执行——你从不 `get`，它就永远不跑。修法：deferred 下务必调 `f.get()`/`f.wait()` 触发执行；如果你要的本来就是「一定并发跑」，别用 deferred，显式写 `std::launch::async`（也别用缺省策略，缺省可能被实现选成 deferred）。",
    tags: ["deferred", "launch策略", "排错"],
  },
  {
    id: "cc-so-15",
    chapter: "cc-synchronizing-operations",
    level: 3,
    question:
      "消费者写 `cv.wait(lk); v=q.front(); q.pop();`（不带谓词），偶发卡死或崩溃。用最小改动修好并说明谓词挡了哪两个坑。",
    answer:
      "改成带谓词：`cv.wait(lk, []{ return !q.empty(); });`。谓词挡两个坑：① **丢失唤醒**——`wait(lk, pred)` 进来先查一次，若数据已在队列里（notify 早于 wait），谓词为真就根本不睡、直接往下，不会因错过那声铃而永远卡住；② **虚假唤醒**——被唤醒后再查一次，若是自发唤醒或数据被别的消费者抢走了，谓词为假就接着睡，不会拿空队列去 `front()`（未定义行为）。",
    tags: ["谓词", "条件变量", "排错"],
  },
  {
    id: "cc-so-16",
    chapter: "cc-synchronizing-operations",
    level: 3,
    question:
      "一个工作线程要把计算结果（或中途抛的异常）传回主线程。用 `std::promise` 怎么写？主线程怎么取？",
    answer:
      "主线程：`std::promise<int> p; auto f = p.get_future(); std::thread t(worker, std::move(p)); int r = f.get(); t.join();`。工作线程 `worker(std::promise<int> p)`：`try { int v = compute(); p.set_value(v); } catch(...) { p.set_exception(std::current_exception()); }`。要点：先 `get_future()` 取出配对凭证再把 promise 移进线程；`f.get()` 取到 worker 摆上的值，若摆的是异常则在 `get()` 处原样重新抛出；promise 的 `set` 只能调一次。",
    tags: ["promise", "set_value", "跨线程传值"],
  },

  // ── L4 综合：陷阱 / 全流程 ──
  {
    id: "cc-so-17",
    chapter: "cc-synchronizing-operations",
    level: 4,
    question:
      "请用 condition_variable + 谓词设计一个线程安全的有界缓冲区（容量固定）：put 满时阻塞、take 空时阻塞。说出关键设计点，并指出至少两个要避开的坑。",
    answer:
      "设计：用**两个**条件变量分别表示「不满」`not_full` 和「非空」`not_empty`；`put` 里 `not_full.wait(lk, [&]{return q.size()<cap;})` 满则等，push 后 `not_empty.notify_one()`；`take` 里 `not_empty.wait(lk, [&]{return !q.empty();})` 空则等，pop 后 `not_full.notify_one()`。关键点：① 两处 wait 都带谓词，挡虚假/丢失唤醒；② 用两个 cv（而非一个 cv + notify_all）更精准，避免叫醒一堆又大多数接着睡。要避开的坑：(a) wait 不带谓词导致丢失/虚假唤醒；(b) 用一个 cv 还只 `notify_one` 时可能叫醒「方向不对」的等待者导致死等（要么分两个 cv，要么用 notify_all）；(c) 持锁时 notify 让被叫醒者又卡在锁上——应先解锁再 notify；(d) 用 `lock_guard` 而非 `unique_lock`（wait 需要中途解锁，编译都过不了）。",
    tags: ["条件变量", "有界缓冲区", "生产者消费者", "综合"],
  },
  {
    id: "cc-so-18",
    chapter: "cc-synchronizing-operations",
    level: 4,
    question:
      "你要在一个线程里跑一组计算，主线程要拿每个的结果且能处理它们的异常，还希望若某个算超过 200ms 就先去做别的。请说出从选工具到取结果的完整思路，并指出至少两个坑。",
    answer:
      "思路：① 选工具——每个计算用 `std::async(std::launch::async, fn)` 起，换回一组 `std::future`；想自己掌控调度（如丢进线程池）则改用 `std::packaged_task` 打包后搬进工作线程，并先 `get_future()` 留住凭证。② 取结果——对每个 future `f.get()` 取值，任务抛的异常会在 `get()` 处原样重新抛出，外面 `try/catch` 统一处理。③ 带超时——别直接 `get()` 死等，用 `f.wait_for(std::chrono::milliseconds(200))` 看返回的 `future_status`：`ready` 就 `get()`，`timeout` 就先去做别的、回头再 `wait_for`。要避开的坑：(a) 不接住 async 返回的 future → 临时对象析构时阻塞，等于同步；(b) 同一 future `get()` 调两次抛 future_error——多处要取就用 `share()` 转 shared_future；(c) 误用/缺省 launch 策略选成 deferred → 任务不 get 不跑、且 `wait_for` 对 deferred 返回 `deferred` 而非真在跑；(d) 显式写 `std::launch::async` 确保真并发。",
    tags: ["async", "future", "wait_for", "异常传递", "综合"],
  },
];

export default ccSynchronizingOperationsQuestions;
