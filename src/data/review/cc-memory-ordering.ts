/** 复习题库 · 内存顺序与同步关系（cc-memory-ordering）。《C++ 并发编程实战》第2版 §6 改编章节。 */

import type { ReviewQuestion } from "./types";

export const ccMemoryOrderingQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cc-mo-1",
    chapter: "cc-memory-ordering",
    level: 1,
    question: "什么是「重排序（reordering）」？为什么会发生？",
    answer:
      "重排序是指：你写的源码顺序是 A→B，但编译器或 CPU 为了执行效率，实际让它们以 B→A 的顺序发生（或一个线程的写未必及时对另一个线程可见）。像两个厨师各有一张「动作清单」写着 A→B，旁观者实际看到的发生顺序却被打乱成 B→A。单线程内重排不影响本线程结果，但多线程下另一个线程可能观察到反直觉的顺序。",
    tags: ["重排序", "定义"],
  },
  {
    id: "cc-mo-2",
    chapter: "cc-memory-ordering",
    level: 1,
    question: "`memory_order_relaxed` 保证什么、不保证什么？",
    answer:
      "**保证**：单个原子变量的原子性，以及该变量自己的修改顺序（单变量全序）。**不保证**：跨多个变量之间的顺序，也不保证一个线程的写及时对另一个线程可见。所以用 relaxed 读到某个标志位为真，**不能**推断「标志位之前写的别的数据」也对你可见。",
    tags: ["memory_order_relaxed", "定义"],
  },
  {
    id: "cc-mo-3",
    chapter: "cc-memory-ordering",
    level: 1,
    question: "C++ 内存序大致分哪三档？默认是哪一档？",
    answer:
      "三档：① `memory_order_relaxed`（最弱，只保证单变量原子性与单变量修改顺序）；② acquire-release 家族（`memory_order_acquire` / `memory_order_release` / `memory_order_acq_rel`，配对建立 synchronizes-with 同步）；③ `memory_order_seq_cst`（最强，所有 seq_cst 操作有唯一一个全局全序，所有线程看法一致）。**默认是 seq_cst**——原子操作不显式指定内存序时就是它。",
    tags: ["内存序", "seq_cst", "定义"],
  },
  {
    id: "cc-mo-4",
    chapter: "cc-memory-ordering",
    level: 1,
    question: "什么是「sequenced-before」？",
    answer:
      "**单个线程内**两个操作的源码先后关系：在同一线程里，源码上写在前面的操作 sequenced-before 写在后面的操作。它是 happens-before 的「同线程部分」。注意它只管同一线程内部，不跨线程。",
    tags: ["sequenced-before", "定义"],
  },
  {
    id: "cc-mo-5",
    chapter: "cc-memory-ordering",
    level: 1,
    question: "什么是「synchronizes-with（同步关系）」？它在什么之间建立？",
    answer:
      "跨线程的同步关系：当一个线程对某原子变量做 **release 存**，另一个线程用 **acquire 读**并且**真的读到了**那次 release 写进去的值时，这次 release 存与这次 acquire 读之间就 synchronizes-with。像厨师甲按了一下对讲机（release），厨师乙听到对讲机才开工（acquire）——这一按一听之间连出一条「同步专线」。",
    tags: ["synchronizes-with", "acquire-release", "定义"],
  },
  {
    id: "cc-mo-6",
    chapter: "cc-memory-ordering",
    level: 1,
    question: "什么是「happens-before」？它和可见性有什么关系？",
    answer:
      "happens-before 是 sequenced-before（同线程内）与 synchronizes-with（跨线程 release→acquire）的**传递闭包**：只要顺着这些边能从操作 A 走到操作 B，A 就 happens-before B。它的核心后果是：若 A happens-before B，则 A 一定先于 B，且 A（及其之前）的写入成果对 B **可见**。这正是「顺着边能走到 = happens-before」。",
    tags: ["happens-before", "可见性", "定义"],
  },
  {
    id: "cc-mo-7",
    chapter: "cc-memory-ordering",
    level: 1,
    question:
      "什么是「内存栅栏（fence）」？`std::atomic_thread_fence` 干什么用？",
    answer:
      "内存栅栏是一种把内存序约束从「附在某个具体原子操作上」**抽出来单独下达**的手段。`std::atomic_thread_fence(order)` 在代码里立一道栏，约束它前后内存操作的可见性/顺序——例如一道 release 栅栏 + 一道 acquire 栅栏可以建立和 release 存/acquire 读类似的同步效果，而不必把内存序绑在具体某次 store/load 上。",
    tags: ["fence", "atomic_thread_fence", "定义"],
  },
  // ── L2 理解：为什么 / 区别 ──
  {
    id: "cc-mo-8",
    chapter: "cc-memory-ordering",
    level: 2,
    question:
      "为什么单凭一个 `std::atomic` 让变量「原子」，还不足以保证多线程程序正确？",
    answer:
      "因为原子性只解决「单个变量不会被读到写一半（撕裂）」，但多线程程序常常依赖**多个变量之间的顺序与可见性**——比如「数据写好了，再把标志位置真」。在 relaxed 下，编译器/CPU 可重排，且一个线程的写未必及时对另一个线程可见，所以另一个线程可能先看到标志位为真、却还没看到它「之前」写的数据。要把跨变量的顺序与可见性也保证住，必须额外用内存序（acquire-release 或 seq_cst）建立 happens-before。",
    tags: ["原子性", "可见性", "happens-before", "理解"],
  },
  {
    id: "cc-mo-9",
    chapter: "cc-memory-ordering",
    level: 2,
    question:
      "为什么单独一个 release 存、或单独一个 acquire 读，自己起不了同步作用？",
    answer:
      "因为 synchronizes-with 是**配对**关系，必须两边凑齐：要有一个 release 存，**也**要有一个 acquire 读，而且这个 acquire 读必须**真的读到了**那次 release 存写进去的值。只写一个 release、读端却用 relaxed，或只用 acquire、写端却用 relaxed，都建立不了同步专线；acquire 读到的是别的值（不是那次 release 写的）同样不算。一按一听，缺一不可。",
    tags: ["acquire-release", "配对", "synchronizes-with", "理解"],
  },
  {
    id: "cc-mo-10",
    chapter: "cc-memory-ordering",
    level: 2,
    question:
      "acquire-release 的同步「能见度」是单向的，这是什么意思？为什么够用？",
    answer:
      "release 存「往下封口」：它**之前**（sequenced-before 它）的所有写入，会随这次 release 一并对「读到它的 acquire」之后的操作可见。acquire 读「往上开闸」：它读到 release 后，**它之后**的操作能看到那些写入。方向是「release 之前 → acquire 之后」。对「标志位 + 数据」这种发布模式正好够用：生产者把数据写在 release 之前，消费者把读数据放在 acquire 之后，数据就保证可见。",
    tags: ["acquire-release", "可见性", "理解"],
  },
  {
    id: "cc-mo-11",
    chapter: "cc-memory-ordering",
    level: 2,
    question: "seq_cst 比 acquire-release 多保证了什么？代价是什么？",
    answer:
      "seq_cst 在 acquire-release 的同步之上，**额外**保证所有 seq_cst 操作存在**唯一一个全局全序**，且所有线程看到的这个全序**完全一致**——像全店有一块「中央大屏」，所有 seq_cst 操作按同一个全局顺序登记。acquire-release 只在「配对的那一对」之间建立局部顺序，不同线程对没有配对关系的操作可能看到不一致的相对顺序。代价：seq_cst 通常需要更强的硬件屏障，性能开销更大；它是**默认**内存序，正因为最不容易出错。",
    tags: ["seq_cst", "acquire-release", "全局全序", "理解"],
  },
  {
    id: "cc-mo-12",
    chapter: "cc-memory-ordering",
    level: 2,
    question:
      "在 acquire-release 配对里，「acquire 必须真的读到 release 写的值」为什么是关键前提？",
    answer:
      "因为同步专线是「读到了才接通」。如果 acquire 读到的还是旧值（说明它跑在那次 release 之前、没读到 release 写进去的新值），那么这两个操作之间**没有** synchronizes-with，自然也建立不了 happens-before——release 之前写的数据对该 acquire 之后**不保证可见**。所以「标志位 + 数据」模式里，消费者通常要**循环**等到 acquire 真的读到「就绪」标志，才去读数据。",
    tags: ["acquire-release", "synchronizes-with", "理解"],
  },
  // ── L3 应用：场景 / 判断 / 改代码 ──
  {
    id: "cc-mo-13",
    chapter: "cc-memory-ordering",
    level: 3,
    question:
      "「标志位 + 数据」发布模式：生产者写 `data`，再置 `ready`；消费者等 `ready` 再读 `data`。各操作该用什么内存序，才能保证消费者读到正确的 `data`？",
    answer:
      "生产者：先用**普通写**（或 relaxed）写 `data = 42`，再用 `ready.store(true, std::memory_order_release)` 发布。消费者：用 `while (!ready.load(std::memory_order_acquire)) {}` 循环等到读到 true，再读 `data`。这样 release 存与「读到它」的 acquire 读之间建立 synchronizes-with，进而让生产者写 `data` 的操作 happens-before 消费者读 `data`，消费者读到的一定是 42。把 ready 改成 relaxed 就破功了。",
    tags: ["acquire-release", "标志位+数据", "应用"],
  },
  {
    id: "cc-mo-14",
    chapter: "cc-memory-ordering",
    level: 3,
    question:
      "判断对错：「我用 relaxed 原子地置位标志，读端读到标志为真，就能保证标志之前写的数据对读端可见。」",
    answer:
      "**错。** relaxed 只保证**单变量**的原子性与单变量自己的修改顺序，**不**建立任何跨变量的 happens-before。读端用 relaxed 读到标志为真，完全可能还没看到「标志之前」写的别的数据（写被重排或未及时可见）——读到半成品。要让「标志之前的数据」对「读到标志的线程」可见，写端的标志 store 必须用 **release**、读端的标志 load 必须用 **acquire**，靠这条同步专线建立 happens-before。",
    tags: ["memory_order_relaxed", "可见性", "判断", "应用"],
  },
  {
    id: "cc-mo-15",
    chapter: "cc-memory-ordering",
    level: 3,
    question:
      "下面这段「发布」代码有什么隐患？`data = compute(); ready.store(true, std::memory_order_relaxed);` 读端 `if (ready.load(std::memory_order_relaxed)) use(data);`",
    answer:
      "隐患：两端都用 relaxed，**没有任何同步**。读端可能读到 `ready == true`，却看到 `data` 还是旧值（半成品）——因为 relaxed 不保证「`data` 的写」对读端可见，也不保证它排在 `ready` 的写之前对外暴露。修法：写端把发布改成 `ready.store(true, std::memory_order_release)`，读端把判定改成 `ready.load(std::memory_order_acquire)`，让 `data` 的写 happens-before 读端的 `use(data)`。",
    tags: ["acquire-release", "发布数据", "改代码", "应用"],
  },
  {
    id: "cc-mo-16",
    chapter: "cc-memory-ordering",
    level: 3,
    question:
      "什么场景下该选 relaxed、什么场景该用 acquire-release、什么时候直接用默认 seq_cst？",
    answer:
      "① **relaxed**：只需要单变量原子、不依赖它与别的变量的顺序/可见性时——典型是「只统计、不据此做可见性推断」的计数器（如 `fetch_add` 累加，最后只看总数）。② **acquire-release**：需要在两个线程之间「发布—消费」数据、建立 happens-before 时——典型是「标志位 + 数据」、一次性初始化等。③ **seq_cst（默认）**：拿不准、或需要所有线程对一组操作看到一致的全局顺序时——最不容易出错，先用它，确有性能需求再降级并仔细论证。",
    tags: ["内存序", "选型", "应用"],
  },
  // ── L4 分析：综合 / 推理 ──
  {
    id: "cc-mo-17",
    chapter: "cc-memory-ordering",
    level: 4,
    question:
      "两变量 x、y 初值 0，全用 relaxed：线程1 `x=1; y=1;`，线程2 `r1=y; r2=x;`。为什么可能出现 `r1==1 && r2==0`？这说明 happens-before 缺了什么？",
    answer:
      "可能出现，因为 relaxed 不在 x、y 之间建立任何跨变量顺序，也不保证线程1 的写及时、按源码序对线程2 可见。线程2 完全可能先观察到 `y` 的新值（`r1==1`）、却还没观察到 `x` 的新值（`r2==0`）——写被重排或未及时传播。直觉「`r1==1` 就说明 `x` 也早写好了」依赖的是「线程1 写 x happens-before 线程2 读 x」，但这里**根本没有 synchronizes-with 这条跨线程边**（没有 release/acquire 配对），传递闭包断在两线程之间，happens-before 不成立。要排除这个结果，得用 acquire-release 或 seq_cst 把顺序建起来。",
    tags: ["relaxed", "重排序", "happens-before", "分析"],
  },
];
