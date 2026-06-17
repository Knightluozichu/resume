/** 复习题库 · 设计并发代码（cc-designing-concurrent-code）。《C++ 并发编程实战》第2版 §8 改编章节。 */

import type { ReviewQuestion } from "./types";

export const ccDesigningConcurrentCodeQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cc-dcc-1",
    chapter: "cc-designing-concurrent-code",
    level: 1,
    question: "任务划分的三种常见策略是什么？各用一句话说清。",
    answer:
      "① **数据并行（数据划分）**：把同一份数据切成 N 份，每个线程独立处理一份，做的是同样的事、只是数据不同。② **递归划分（分治）**：把问题递归拆成两半，子问题再并行（如并行快排）。③ **流水线（任务并行）**：按工序分阶段，数据依次流过各阶段，不同阶段由不同线程负责，做的是不同的事。",
    tags: ["任务划分", "数据并行", "流水线", "定义"],
  },
  {
    id: "cc-dcc-2",
    chapter: "cc-designing-concurrent-code",
    level: 1,
    question: "「数据并行」和「任务并行」的根本区别是什么？",
    answer:
      "**数据并行**：每个线程做**同样**的事，只是处理的数据不同（同一份数据切成 N 份各算各的）。**任务并行**：每个线程做**不同**的事（不同的工序/任务），流水线是典型——每个阶段是一种不同的工序。一句话：数据并行「同样的事、不同数据」，任务并行「不同的事」。",
    tags: ["数据并行", "任务并行", "区别"],
  },
  {
    id: "cc-dcc-3",
    chapter: "cc-designing-concurrent-code",
    level: 1,
    question: "什么是「false sharing（伪共享）」？",
    answer:
      "两个线程各自访问**不同的**变量，本不该互相影响；但这两个变量恰好落在**同一条缓存行**（CPU 在核间搬数据的最小单位，通常 64 字节）上，于是任一线程写自己的变量，都会让整条缓存行在两核间来回失效、传输，互相拖慢——明明没有真正共享数据，却付出了共享的代价，所以叫「伪」共享。",
    tags: ["false sharing", "伪共享", "定义"],
  },
  {
    id: "cc-dcc-4",
    chapter: "cc-designing-concurrent-code",
    level: 1,
    question: "什么是「缓存行（cache line）」？它和 false sharing 有什么关系？",
    answer:
      "缓存行是 CPU 在缓存与内存之间、以及核与核之间搬运数据的**最小单位**，通常 64 字节。读写任何一个变量，都会把它所在的整条缓存行一起搬动。两个变量若落在同一条缓存行，写其中一个就会牵动另一个——这正是 false sharing 的物理根源：变量本不相干，却因共行而互相失效。",
    tags: ["缓存行", "cache line", "定义"],
  },
  {
    id: "cc-dcc-5",
    chapter: "cc-designing-concurrent-code",
    level: 1,
    question: "什么是「缓存乒乓（cache ping-pong）」？",
    answer:
      "同一条缓存行被多个核反复争抢、来回传输失效的现象。每次一个核写了这条行，其他核手里的副本就作废、得重新去取，于是缓存行像乒乓球一样在核间弹来弹去，开销巨大。false sharing 是它最常见的诱因。",
    tags: ["缓存乒乓", "cache ping-pong", "定义"],
  },
  {
    id: "cc-dcc-6",
    chapter: "cc-designing-concurrent-code",
    level: 1,
    question: "什么是「超额订阅（oversubscription）」？",
    answer:
      "创建的线程数**远多于**硬件能真正并行的核数。多出来的线程并不能真的同时跑，反而让操作系统在它们之间频繁切换上下文（保存/恢复寄存器、刷新缓存），这些切换开销可能吃掉并行带来的全部收益，使程序不升反降。对策是按 `std::thread::hardware_concurrency()` 给的核数来定线程数，或用线程池。",
    tags: ["超额订阅", "oversubscription", "定义"],
  },
  {
    id: "cc-dcc-7",
    chapter: "cc-designing-concurrent-code",
    level: 1,
    question: "Amdahl 定律的公式是什么？式中各符号代表什么？",
    answer:
      "$S = \\dfrac{1}{(1-p) + p/N}$。其中 $S$ 是加速比（并行后比单核快几倍），$p$ 是可并行部分占总工作的比例，$1-p$ 是必须串行部分的比例，$N$ 是处理器（核）数。核心结论：核数趋于无穷时加速上限为 $\\dfrac{1}{1-p}$，由串行部分决定。",
    tags: ["Amdahl定律", "公式", "定义"],
  },
  {
    id: "cc-dcc-8",
    chapter: "cc-designing-concurrent-code",
    level: 1,
    question: "什么是「可伸缩性（scalability）」？",
    answer:
      "往程序里加更多处理器（核）时，性能能跟着提升多少。理想是加一倍核就快一倍（线性可伸缩）；现实里因为总有必须串行的部分，加速比会逼近一个上限、加核的收益递减。一段代码「可伸缩性好不好」，问的就是它多给核能不能多换来速度——Amdahl 定律量化了这个上限。",
    tags: ["可伸缩性", "scalability", "定义"],
  },

  // ── L2 理解：为什么 / 机制 ──
  {
    id: "cc-dcc-9",
    chapter: "cc-designing-concurrent-code",
    level: 2,
    question:
      "两个线程各改各的变量、毫不共享，为什么还会互相拖慢？请说清机制。",
    answer:
      "因为这两个变量恰好落在**同一条缓存行**上，而 CPU 在核之间以整条缓存行（约 64 字节）为单位搬数据：线程 A 写自己的变量会把整行抢到 A 的核并让 B 的副本失效，线程 B 写自己的变量又把整行抢回去让 A 失效——整条缓存行在两核间反复弹来弹去（缓存乒乓）。变量逻辑上没共享，物理上却共享了缓存行，于是付出了共享的代价。这就是 false sharing。",
    tags: ["false sharing", "缓存乒乓", "机制"],
  },
  {
    id: "cc-dcc-10",
    chapter: "cc-designing-concurrent-code",
    level: 2,
    question: "为什么开的线程数远超核数（超额订阅）会让程序变慢，而不是更快？",
    answer:
      "因为核数就那么多，多出来的线程并不能真的同时运行——它们只能轮流上核。线程一多，操作系统就得频繁在它们之间切换上下文：保存当前线程的寄存器、恢复下一个线程的、还常常刷掉缓存。这些切换本身不干正事、纯属开销，线程越多切换越频繁，最终把并行省下的时间又赔进去，甚至倒贴，所以不升反降。",
    tags: ["超额订阅", "上下文切换", "机制"],
  },
  {
    id: "cc-dcc-11",
    chapter: "cc-designing-concurrent-code",
    level: 2,
    question: "Amdahl 定律里，为什么「加速上限只由串行部分决定」？用公式说明。",
    answer:
      "看 $S = \\dfrac{1}{(1-p)+p/N}$ 的分母。$p/N$ 这一项随核数 $N$ 增大而趋于 0，贡献越来越小；而 $(1-p)$ 这一项不随 $N$ 变化、岿然不动。所以 $N\\to\\infty$ 时分母逼近 $(1-p)$，加速比逼近 $\\dfrac{1}{1-p}$。串行部分 $(1-p)$ 就是卡住分母不让它继续变小的那只手——它越大，上限越低，与核数多少无关。",
    tags: ["Amdahl定律", "加速上限", "机制"],
  },
  {
    id: "cc-dcc-12",
    chapter: "cc-designing-concurrent-code",
    level: 2,
    question:
      "为并发设计数据结构的核心原则是什么？为什么并发下异常安全更难处理？",
    answer:
      "核心原则：**让线程尽量在自己的数据上独立干活、少碰共享状态**——共享越少，需要同步的地方越少，缓存乒乓的机会也越少（如给每个线程私有累加器、最后合并）。异常更难是因为：一个线程抛异常时别的线程还在跑、还可能在等它的结果；处理不当会让等待方**永远等下去**（该 set 的 future 没 set）或让共享状态停在半成品。所以「我算完要交结果给别人」的地方，异常路径上也得有交代（`std::async`/`packaged_task` 会把异常存进 future、让 `get()` 时重抛）。",
    tags: ["数据结构设计", "异常安全", "理解"],
  },
  {
    id: "cc-dcc-13",
    chapter: "cc-designing-concurrent-code",
    level: 2,
    question:
      "`std::hardware_destructive_interference_size` 是什么？为什么用它而不是直接写 64？",
    answer:
      "C++17 起 `<new>` 提供的常量，含义是「为了避免 false sharing，两个被不同线程访问的对象至少该相隔多远」——本质就是缓存行大小（或更保守的值）。用它而不是硬编码 64，是因为缓存行大小因平台而异（有的 128 字节），交给标准库/编译器给出当前平台的正确值更可移植；编译器不支持该宏时，再退回常见的 64 作默认。",
    tags: ["alignas", "hardware_destructive_interference_size", "理解"],
  },

  // ── L3 应用：会算 / 会选 ──
  {
    id: "cc-dcc-14",
    chapter: "cc-designing-concurrent-code",
    level: 3,
    question:
      "（计算）一个任务 90% 可并行、10% 必须串行（$p=0.9$）。用 16 个核加速比约多少？核数无穷多时上限是多少？",
    answer:
      "代入 $S=\\dfrac{1}{(1-p)+p/N}$，$p=0.9$、$N=16$：分母 $=0.1+0.9/16=0.1+0.05625=0.15625$，故 $S=1/0.15625\\approx 6.4$ 倍。**16 个核只换来约 6.4 倍，远不是 16 倍**，被那 10% 串行部分拖住。上限 $S_{\\max}=\\dfrac{1}{1-p}=\\dfrac{1}{0.1}=10$ 倍——再多核也突破不了 10 倍。",
    tags: ["Amdahl定律", "计算", "应用"],
  },
  {
    id: "cc-dcc-15",
    chapter: "cc-designing-concurrent-code",
    level: 3,
    question:
      "（计算）若想让某任务的并行加速上限达到 20 倍，串行部分最多只能占多少？",
    answer:
      "加速上限 $S_{\\max}=\\dfrac{1}{1-p}$，要 $S_{\\max}\\ge 20$，即 $1-p\\le \\dfrac{1}{20}=0.05$。所以**串行部分最多只能占 5%**（即 $p\\ge 0.95$）。结论：想提高可伸缩性，关键是**缩小串行部分**（减锁、减依赖），而不是一味堆核。",
    tags: ["Amdahl定律", "计算", "应用"],
  },
  {
    id: "cc-dcc-16",
    chapter: "cc-designing-concurrent-code",
    level: 3,
    question:
      "（选型）实时摄像头流，每帧依次经过「去噪 → 检测 → 画框」三道不同工序，帧源源不断到来。该用哪种任务划分？为什么不适合数据并行？",
    answer:
      "该用**流水线（任务并行）**：三个线程分别专做一道工序，第 1 帧进入检测时第 2 帧已能开始去噪，各阶段重叠起来。不适合（对单帧硬切的）数据并行，因为一帧内三道工序有**前后依赖**（去噪完才能检测），切块并行会被依赖卡住反复等待；而帧是连续不断到来的，正好让流水线的各阶段持续满载。",
    tags: ["任务划分", "流水线", "选型", "应用"],
  },

  // ── L4 综合：评估 / 辨析 ──
  {
    id: "cc-dcc-17",
    chapter: "cc-designing-concurrent-code",
    level: 4,
    question:
      "同事把单线程累加改成多线程：每个线程把局部和写进 `std::vector<long> partials` 里自己那一格，最后合并。他说「每个线程只写自己那格，没有共享，应该很快」。这话对吗？问题出在哪、怎么修？",
    answer:
      "**不对，藏着 false sharing 的雷。** `partials[0]`、`partials[1]`……是连续的 `long`，多个相邻格很可能落在**同一条缓存行**上；不同线程在循环里反复写各自的格，又触发了缓存乒乓——逻辑上没共享，物理上共享了缓存行，吞吐被压低。修法：① 把每格 `alignas(std::hardware_destructive_interference_size)` /填充到独立缓存行；或 ② 让线程先在**自己栈上的局部变量**里累加，循环结束才写一次 `partials[t]`（写一次远比循环里反复写便宜）。",
    tags: ["false sharing", "数据并行", "评估", "综合"],
  },
  {
    id: "cc-dcc-18",
    chapter: "cc-designing-concurrent-code",
    level: 4,
    question:
      "有人说「我的程序慢，多开线程多加核就能解决」。请用本章的工具逐条评估这句话哪里站不住脚。",
    answer:
      "三处需修正。① **「多开线程」**：线程数远超核数是**超额订阅**——多出来的线程不能真并行，只让 OS 疲于上下文切换，开销吃光收益，反而更慢；应按 `hardware_concurrency()` 定线程数。② **「多加核就能解决」**：受 **Amdahl 定律**约束，加速上限 $1/(1-p)$ 由串行部分卡死——串行占 10% 上限就 10 倍，再多核也撞墙；该先估上限、把重心放在缩小串行部分上。③ 还要警惕 **false sharing**：盲目并行后多个线程写相邻数据，可能因缓存乒乓不升反降。一句话：加核不是银弹，得先看任务能不能拆（划分策略）、串行部分多大（Amdahl）、有没有踩缓存坑（false sharing）。",
    tags: ["综合评估", "Amdahl定律", "超额订阅", "false sharing"],
  },
];
