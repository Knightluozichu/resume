/** 复习题库 · 高级线程管理：线程池（cc-thread-pools）。《C++ 并发编程实战》第2版 §9 改编章节。 */

import type { ReviewQuestion } from "./types";

export const ccThreadPoolsQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cc-tp-1",
    chapter: "cc-thread-pools",
    level: 1,
    question: "什么是「线程池（thread pool）」？它解决了什么开销问题？",
    answer:
      "线程池预先创建并固定持有一组工作线程，让它们围着一个共享的任务队列循环「取任务 → 执行 → 再取」。提交任务只是**入队**，由空闲的工作线程取走执行，而不是为每个任务新建一个线程。它解决的是**频繁创建/销毁线程的开销**：申请栈空间、注册内核线程、调度上下文这些手续在「每任务一线程」的高频场景里会盖过任务本身，线程池把固定那几个线程**复用**起来，省掉这笔反复开销。",
    tags: ["线程池", "thread pool", "定义"],
  },
  {
    id: "cc-tp-2",
    chapter: "cc-thread-pools",
    level: 1,
    question: "线程池里的「工作线程（worker thread）」在做什么？",
    answer:
      "工作线程是线程池里预先创建好、长期存活的线程。每个工作线程跑同一段**循环**：从任务队列取一个任务、执行它、再回头取下一个；没活时在条件变量上**阻塞等待**（不空转占 CPU）。它们被反复复用，不随任务来去而创建销毁——就是那几个「常备帮厨」。",
    tags: ["工作线程", "worker thread", "定义"],
  },
  {
    id: "cc-tp-3",
    chapter: "cc-thread-pools",
    level: 1,
    question: "线程池的「任务队列」为什么必须是线程安全的？",
    answer:
      "因为多个线程会**并发地**访问它：提交方（可能多个）往里入队，多个工作线程同时从里出队。若不是线程安全的（不加锁/不用并发安全的结构），并发入队/出队就会数据竞争、破坏队列内部不变量。所以任务队列要用带锁或条件变量保护的线程安全队列（即第七章那种）。",
    tags: ["任务队列", "task queue", "线程安全"],
  },
  {
    id: "cc-tp-4",
    chapter: "cc-thread-pools",
    level: 1,
    question: "什么是「双端队列（deque）」？工作窃取里它的两端各派什么用？",
    answer:
      "deque 是 double-ended queue（双端队列），一种**两端都能 push/pop** 的队列。工作窃取里每个工作线程持有一条本地 deque：**本端（front）**给自己 push/pop（本线程取放，互不干扰），**另一端（队尾 back）**留给别的线程来偷。两端分开操作，把争用降到最低。",
    tags: ["双端队列", "deque", "定义"],
  },
  {
    id: "cc-tp-5",
    chapter: "cc-thread-pools",
    level: 1,
    question: "什么是「工作窃取（work stealing）」？",
    answer:
      "一种线程池负载均衡策略：每个工作线程有**自己的**一条本地双端队列，平时只动自己的队列（减少对单一全局队列的争用）；一旦自己队列空了，就去别的忙碌线程的队列「**另一端（队尾）**」**偷**一个任务来做。这样既保留本地队列的低争用，又让空闲线程不白等、自动均衡负载——像帮厨自己筐空了就去隔壁同事筐尾巴上偷一张活干。",
    tags: ["工作窃取", "work stealing", "定义"],
  },
  {
    id: "cc-tp-6",
    chapter: "cc-thread-pools",
    level: 1,
    question: "什么是「协作式中断（cooperative interruption）」？",
    answer:
      "停止一个线程的**安全**方式：不强制杀死它，而是给它置一个**中断标志**当信号；目标线程在自己代码里的若干「中断点」主动检查这个标志——没置位就继续干，置位了就主动抛出异常/退出循环、做完清理再走。停不停、何时停由目标线程自己在**安全点**决定，所以叫「协作式」。像给帮厨发「下班」信号，他干到段落点看见才收工，不是被当场拽走。",
    tags: ["协作式中断", "cooperative interruption", "定义"],
  },
  {
    id: "cc-tp-7",
    chapter: "cc-thread-pools",
    level: 1,
    question: "什么是「中断点（interruption point）」？",
    answer:
      "协作式中断里，线程代码中**主动检查中断标志**的那些位置，通常封装成一个 `interruption_point()` 调用，放在循环里、每干完一个段落调一次。线程跑到中断点才会发现「该停了」并退出——所以中断只在这些**安全位置**生效，不会把线程打断到一半（不会留下锁没释放、数据写一半的烂摊子）。",
    tags: ["中断点", "interruption point", "定义"],
  },

  // ── L2 理解：机制 / 为什么 ──
  {
    id: "cc-tp-8",
    chapter: "cc-thread-pools",
    level: 2,
    question:
      "工作线程循环里，为什么 `cv.wait` 要带谓词、且 `task()` 必须在锁外执行？",
    answer:
      "**带谓词**（如 `done || !tasks.empty()`）是为了：没活时谓词为假就睡（防忙等空转占 CPU），有活或要收工时才醒；同时挡住虚假/丢失唤醒（承接第四章「带谓词的 wait」）。**`task()` 在锁外执行**是因为：任务本身可能很耗时，若攥着队列锁去跑，所有其他工人都会卡在这把锁上拿不到任务，并发度直接归零——所以要先在锁内把任务取出、解锁，再在锁外执行。",
    tags: ["条件变量", "谓词", "锁粒度"],
  },
  {
    id: "cc-tp-9",
    chapter: "cc-thread-pools",
    level: 2,
    question:
      "线程池析构时，为什么「置标志 → notify_all → join」三步缺一不可？",
    answer:
      "① **置收工标志**（如 `done = true`）：让工人循环的谓词能判出「该退出了」。② **`notify_all`**：那些正在 `cv.wait` 里睡觉的工人必须被叫醒才会复查标志，否则它们永远睡死、`join` 永久阻塞、程序卡死。③ **`join` 每个线程**：`std::thread` 析构时若仍 joinable 会直接 `std::terminate` 掐掉程序；而且不 join 的话工人可能在 pool 已销毁后访问悬空的队列/锁/`this`。三步分别保证「能退、被叫醒去退、被等到退干净」。",
    tags: ["析构", "join", "notify_all"],
  },
  {
    id: "cc-tp-10",
    chapter: "cc-thread-pools",
    level: 2,
    question:
      "工作窃取为什么本线程取「本端（front）」、偷取时却从「另一端（队尾 back）」拿？",
    answer:
      "两端分开是为了**最小化争用与冲突**。本线程平时只动 front（push/pop 都在本端），别的线程偷时只动 back——两端互不接触，绝大多数情况下本地取放和偷取作用在 deque 的不同端，几乎不撞。另外本线程用 front 是 LIFO（后进先出），刚 push 的任务很可能数据还在缓存里，立刻 pop 出来跑有**缓存局部性**好处；偷取拿最老的（队尾）那个，通常是粒度较大、被偷一次能让对方少跑一阵的任务。",
    tags: ["工作窃取", "deque", "争用"],
  },
  {
    id: "cc-tp-11",
    chapter: "cc-thread-pools",
    level: 2,
    question: "为什么 C++ 不提供「强杀线程」的手段，而要用协作式中断？",
    answer:
      "因为线程被强杀的瞬间可能正**攥着一把锁**、正写到一半某块数据、或正持有未释放的资源（文件、内存）。当场掐断会留下：锁永远不被释放（别的线程死等）、数据停在破损的中间状态（不变量被破坏）、资源泄漏。这些烂摊子无法安全收拾。协作式中断让线程跑到自己代码里的**中断点**——一个保证「此刻没攥锁、数据完整」的安全位置——才退出，并能 `catch` 中断异常做清理，干净收尾。",
    tags: ["协作式中断", "强杀", "安全"],
  },
  {
    id: "cc-tp-12",
    chapter: "cc-thread-pools",
    level: 2,
    question:
      "`submit` 用 `packaged_task` 包装任务时，为什么常要把它放进 `shared_ptr`？",
    answer:
      "因为 `std::packaged_task` **只能移动、不能拷贝**，而任务队列里通常存的是 `std::function<void()>`——`std::function` 要求被包装对象**可拷贝**。直接把 packaged_task 塞进 function 会编译失败。解法是 `std::make_shared` 把 task 放进 `shared_ptr`，入队的 lambda **拷贝这个 shared_ptr**（拷指针廉价、且 shared_ptr 可拷贝），调用时解引用 `(*task)()` 执行——绕过「packaged_task 不可拷贝」的限制。",
    tags: ["packaged_task", "shared_ptr", "落地坑"],
  },
  {
    id: "cc-tp-13",
    chapter: "cc-thread-pools",
    level: 2,
    question:
      "用 `submit` + `future` 提交任务，相比裸 lambda 直接入队，在异常处理上好在哪？",
    answer:
      "裸 lambda 在工作线程里跑，若抛异常逃出线程函数会直接 `std::terminate` 崩掉整个程序（或被 `catch(...)` 悄悄吞掉、毫无线索）。而 `submit` 用 `packaged_task` 包装、返回 `future`：任务抛的异常会被**存进 future**，在调用方 `f.get()` 处**原样重新抛出**，照样能 `try/catch` 处理。既不会崩、也不会丢异常，是把异步任务异常安全传回调用方的标准手段。",
    tags: ["future", "异常", "packaged_task"],
  },

  // ── L3 应用：分析 / 排错 ──
  {
    id: "cc-tp-14",
    chapter: "cc-thread-pools",
    level: 3,
    question:
      "一个 4 工人的线程池，4 个父任务各自 submit 一个子任务并 `child.get()` 等结果，整池卡死、CPU 为 0。诊断并给两种修法。",
    answer:
      "这是**池耗尽死锁（pool exhaustion deadlock）**：4 个工人各取一个父任务、各 submit 一个子任务进队列、然后都卡在 `child.get()` 阻塞等结果；可此刻**没有空闲工人**去取那些子任务来跑——4 个工人全在等子任务、4 个子任务全在等被取，互相等成死结，CPU 归零。根因是「池内任务同步阻塞等另一个池内任务」，当阻塞任务数 ≥ 工人数时必然耗尽。修法：① **让等待的任务自己帮忙取活**——父任务等待期间循环 `run_pending_task()`（取下一个任务来跑），既等也出力，不占死工人（工作窃取式池的解法）；② **不在池内同步等池内任务**，改成不阻塞的延续/链式 future，或父子任务用不同的独立池。",
    tags: ["池耗尽死锁", "pool exhaustion", "排错"],
  },
  {
    id: "cc-tp-15",
    chapter: "cc-thread-pools",
    level: 3,
    question:
      "线程池在多核机器上多开了工人，吞吐却没涨甚至更差。最可能的瓶颈是什么？怎么改？",
    answer:
      "最可能是**所有工人抢同一个全局任务队列**——那把队列锁成了瓶颈：工人们大量时间耗在「排队抢这把锁」而非真正干活（锁争用），多开线程只是让更多人挤着抢同一把锁，反而更慢。改法：换成**每工人一条本地双端队列 + 工作窃取**——本端 push/pop 无争用，自己空了才去别人队尾偷，把对单一锁的争抢摊开到各自的本地队列上。改前应先确认热点真在这把队列锁上（profiler）再动手。",
    tags: ["争用", "工作窃取", "性能"],
  },
  {
    id: "cc-tp-16",
    chapter: "cc-thread-pools",
    level: 3,
    question:
      "某线程池任务里抛了异常，程序直接 std::terminate 崩溃。原因是什么？怎么改成既不崩也不丢异常？",
    answer:
      "原因：任务以**裸 lambda/函数**形式在工作线程里跑，抛出的异常**逃出了线程的入口函数**——C++ 规定异常逃出线程函数（且没被 `noexcept` 之外处理）会调用 `std::terminate` 掐掉整个程序。改法：用 `submit` + `std::packaged_task`/`future` 包装任务。`packaged_task` 调用任务时会把抛出的异常**捕获并存进关联的 future**，调用方 `f.get()` 时**原样重新抛出**，于是异常被安全地搬到调用线程处理，既不崩也不被吞。",
    tags: ["异常", "terminate", "future"],
  },

  // ── L4 综合：设计取舍 / 深度 ──
  {
    id: "cc-tp-17",
    chapter: "cc-thread-pools",
    level: 4,
    question:
      "线程池工人数该开多少？开成「核数」「核数 ×2」「远超核数」各有什么取舍？",
    answer:
      "**CPU 密集型**任务（几乎全在算、很少阻塞）：开成 `hardware_concurrency()`（核数）最佳——再多线程也没有空闲核去跑，多出来的只会徒增上下文切换（超额订阅 oversubscription），不升反降。**I/O 或阻塞密集型**任务（常卡在等磁盘/网络/锁）：可适当开到核数的若干倍——因为大量线程在阻塞、没占满 CPU，多开能在别人阻塞时顶上、提高 CPU 利用率。**远超核数**几乎总是坏主意：上下文切换、缓存抖动、内存（每线程一份栈）开销盖过收益。实务上常按任务类型动态定、或用工作窃取池让负载自适应，而非拍一个大数。",
    tags: ["工人数", "超额订阅", "设计取舍"],
  },
  {
    id: "cc-tp-18",
    chapter: "cc-thread-pools",
    level: 4,
    question:
      "把任务递归拆分提交给线程池（如并行快排）时，工作窃取池相比单一全局队列池为什么明显更优？",
    answer:
      "递归拆分会产生**大量细粒度、有依赖关系**的子任务，且产生节奏不均（某些分支爆发式生成、某些早早干完）。① **争用**：单一全局队列下，所有工人疯狂往同一个队列 push/pop 这堆小任务，队列锁被打爆；工作窃取让每个工人 push/pop 自己的本地队列，争用大降。② **负载均衡**：递归分支天然不均，早干完的工人在全局队列模型里只能干等或抢锁，而工作窃取让它们去忙碌工人的队尾偷活，自动把不均的负载摊平。③ **避免池耗尽**：递归任务常需等子任务结果，工作窃取池里「等待时帮忙取活（run_pending_task）」能让等待的工人不占死、不死锁。三点叠加，递归/分治场景几乎是工作窃取的主场。",
    tags: ["工作窃取", "递归划分", "设计取舍"],
  },
];
