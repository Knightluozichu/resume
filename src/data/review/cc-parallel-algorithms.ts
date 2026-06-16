/** 复习题库 · 并行算法（cc-parallel-algorithms）。《C++ 并发编程实战》第2版 §10 改编章节。 */

import type { ReviewQuestion } from "./types";

export const ccParallelAlgorithmsQuestions: ReviewQuestion[] = [
  // ── L1 认记：术语 / 定义 ──
  {
    id: "cc-pa-1",
    chapter: "cc-parallel-algorithms",
    level: 1,
    question:
      "什么是「执行策略（execution policy）」？它放在算法的哪个参数位？",
    answer:
      "执行策略是 C++17 给标准库算法新增的一个「并行档位」实参，放在算法的**第一个**参数位。它告诉算法「允许你并行/向量化到什么程度」，而具体怎么分线程、怎么调度由标准库实现负责。三档：`std::execution::seq`（顺序）、`par`（并行）、`par_unseq`（并行 + 向量化）。",
    tags: ["执行策略", "execution policy", "定义"],
  },
  {
    id: "cc-pa-2",
    chapter: "cc-parallel-algorithms",
    level: 1,
    question: "`std::execution::seq` 这一档保证什么？",
    answer:
      "`seq`（顺序执行策略）让算法在**调用线程**上一个元素一个元素地**顺序**处理，不并行、不向量化，行为和不传策略的老算法基本一致。它最朴素，但**结果顺序确定**、对你传的函子要求最松——像一个厨师顺着把菜一份份做完。",
    tags: ["seq", "顺序", "定义"],
  },
  {
    id: "cc-pa-3",
    chapter: "cc-parallel-algorithms",
    level: 1,
    question: "`std::execution::par` 允许什么？对函子有什么要求？",
    answer:
      "`par`（并行执行策略）允许算法把元素**分给多个线程同时**处理（每线程内部仍逐个处理元素，不强制向量化），是日常最常用的「一键并行」。要求：你传的函子在被多个线程并发调用时**不能有数据竞争**（不能多个线程同写一个无保护的变量）。像多个厨师分批同时做。",
    tags: ["par", "并行", "数据竞争"],
  },
  {
    id: "cc-pa-4",
    chapter: "cc-parallel-algorithms",
    level: 1,
    question:
      "`std::execution::par_unseq` 比 `par` 多了什么？对函子的要求严在哪？",
    answer:
      "`par_unseq` 在 `par` 的多线程之上，再允许**同一线程内对多个元素做向量化（SIMD）**——一条指令同时算多个数据。它最猛，但对函子要求最苛刻：函子内**不许有任何加锁、原子等待、分配内存这类会阻塞/同步的操作**。因为同一线程会把多个元素的处理**交错**着跑，一同步就可能自己把自己卡死。像多个厨师、且每人一手同时颠两个锅。",
    tags: ["par_unseq", "向量化", "定义"],
  },
  {
    id: "cc-pa-5",
    chapter: "cc-parallel-algorithms",
    level: 1,
    question: "什么是「并行算法（并行 STL）」？用它需要什么前提？",
    answer:
      "并行算法是 C++17 给一批标准库算法（`for_each`、`sort`、`reduce`、`transform`、`transform_reduce` 等）新增的、接受**执行策略**作第一实参的重载。传 `par` 即并行执行，分线程/合并结果由标准库负责，调用方代码几乎不变。前提：标准库实现了它（feature 宏 `__cpp_lib_execution` 有定义）——GCC（libstdc++）的实现常需链接 Intel TBB（`-ltbb`），MSVC 自带，Apple Clang 的 libc++ 至今未实现。",
    tags: ["并行算法", "parallel STL", "定义"],
  },
  {
    id: "cc-pa-6",
    chapter: "cc-parallel-algorithms",
    level: 1,
    question: "什么是「向量化（vectorization）」？哪一档执行策略允许它？",
    answer:
      "向量化是用 CPU 的 SIMD 指令（单指令多数据，single instruction multiple data）**一条指令同时处理多个数据元素**，相当于「一只手同时颠两个锅」。三档执行策略里只有 `par_unseq` 允许编译器把循环向量化（在多线程并行之上再叠加这一层），进一步压榨单线程的吞吐。",
    tags: ["向量化", "SIMD", "par_unseq"],
  },
  {
    id: "cc-pa-7",
    chapter: "cc-parallel-algorithms",
    level: 1,
    question: "什么是「可结合性（associativity）」？为什么 `reduce` 在意它？",
    answer:
      "可结合性指一个二元操作 `op` 满足 `(a op b) op c == a op (b op c)`，即「怎么加括号、谁先算」不影响结果。加法、乘法、取最大值都可结合；减法、除法不可结合。`reduce` 靠**重排**求和顺序（树形归约）来并行，所以只有对可结合（通常还要求可交换）的操作才能给出正确结果——把不可结合的操作交给 `reduce`，并行重排后结果会乱。",
    tags: ["可结合性", "associativity", "reduce"],
  },

  // ── L2 理解：机制 / 为什么 ──
  {
    id: "cc-pa-8",
    chapter: "cc-parallel-algorithms",
    level: 2,
    question:
      "`std::reduce` 凭什么能并行，而 `std::accumulate` 不能？两者结果一定相同吗？",
    answer:
      "`accumulate` 从左到右**严格顺序**累加 `((((init+a)+b)+c)+d)`，第 i 步必须等第 i-1 步算完，天生无法并行，所以标准库**没给它执行策略重载**。`reduce` 则用**树形归约**：先把 `(a+b)`、`(c+d)` 等两两分组**并行**求和，再合并——每层互不依赖，可并行。两者结果是否相同**取决于操作是否可结合/可交换**：对可结合的加法（整数）相同；但对**顺序敏感的浮点求和**或减法等不可结合操作，`reduce` 重排后结果可能与 `accumulate` 不同、甚至不确定。",
    tags: ["reduce", "accumulate", "树形归约"],
  },
  {
    id: "cc-pa-9",
    chapter: "cc-parallel-algorithms",
    level: 2,
    question:
      "为什么说「执行策略不是越强越好」？选 `par`/`par_unseq` 各要付出什么代价？",
    answer:
      "因为档位越强，**对函子的要求越严、且只在活够大够独立时才真划算**。`par`：函子会被多线程并发调用，必须**无数据竞争**；`par_unseq`：在此之上函子还**不许任何加锁/原子等待/分配内存**等同步阻塞操作（同一线程会交错执行多个元素，一同步就可能自锁）。此外并行本身有分发/调度/合并开销，数据量小、每元素处理极轻时，强档反而比 `seq` 更慢。所以要按「数据量 + 每元素成本 + 依赖/争用」来选，而非无脑选最强。",
    tags: ["执行策略", "取舍", "开销"],
  },
  {
    id: "cc-pa-10",
    chapter: "cc-parallel-algorithms",
    level: 2,
    question:
      "传给并行算法的函子里抛出异常会怎样？和 `std::async` 的异常处理有何不同？",
    answer:
      "传给并行算法的函子若**抛出异常并逸出**，标准规定会直接调用 `std::terminate` 掐掉整个程序——并行算法**没有**「把异常搬回调用线程重抛」这回事。这与 `std::async`/`std::packaged_task` 不同：后者会把任务异常**存进 future**，调用方 `get()` 时原样重抛。所以并行算法的函子必须在**内部 `try/catch`** 就地处理掉异常，或预先保证不抛，绝不让异常飞出算法边界。",
    tags: ["异常", "terminate", "并行算法"],
  },
  {
    id: "cc-pa-11",
    chapter: "cc-parallel-algorithms",
    level: 2,
    question:
      "在 `par` 的 `for_each` 函子里要跨元素累计一个计数，怎么写才不出数据竞争？",
    answer:
      "`par` 会让多个线程并发调用函子，对同一个**普通变量**做 `++count` 是数据竞争、UB（丢更新、结果时对时错）。两种正确写法：① 用 `std::atomic<std::size_t>`，函子里 `count.fetch_add(1, std::memory_order_relaxed)` 原子累加；② 更推荐：改用 `std::reduce`/`std::transform_reduce`——把每个元素映射成 0/1 再并行求和，函子是纯计算、无共享写，标准库负责安全合并（这种写法还能用于 `par_unseq`）。",
    tags: ["par", "数据竞争", "atomic"],
  },
  {
    id: "cc-pa-12",
    chapter: "cc-parallel-algorithms",
    level: 2,
    question:
      "为什么在 `par_unseq` 的函子里加一把锁可能导致死锁，而在 `par` 下用 atomic 却没问题？",
    answer:
      "`par`：每个线程**逐个**处理它分到的元素，函子调用之间不交错，所以函子里用 atomic（甚至加锁）是安全的。`par_unseq`：允许同一线程把**多个元素的处理交错执行**（为了向量化），此时若函子里加锁，同一线程可能在第一个元素还没解锁时就开始处理第二个元素、再次去锁同一把锁——自己把自己锁死（这是 UB）。所以 `par_unseq` 的函子必须无锁、无原子等待、不分配内存、无任何阻塞/同步。要同步降到 `par`，要汇总用 `reduce`。",
    tags: ["par_unseq", "死锁", "向量化"],
  },
  {
    id: "cc-pa-13",
    chapter: "cc-parallel-algorithms",
    level: 2,
    question:
      "`std::transform_reduce` 做了什么？为什么常用它而不是「先 transform 再 reduce」？",
    answer:
      "`transform_reduce` 把「**映射 + 归约**」融成一个并行算法：先对元素（或一对元素）逐个做映射（如逐对相乘），再把映射结果做归约（如求和）。典型如点积。相比「先 `transform` 出一个临时数组、再 `reduce`」，它**少一趟中间存储**（不必物化中间数组），映射逐对独立可向量化、归约可结合可树形并行，是数值并行的常用利器。同样要求归约操作可结合/可交换。",
    tags: ["transform_reduce", "点积", "归约"],
  },

  // ── L3 应用：分析 / 排错 ──
  {
    id: "cc-pa-14",
    chapter: "cc-parallel-algorithms",
    level: 3,
    question:
      "同事把「用减法累减 vector<double>」从 accumulate 改成 reduce(par) 加速，结果每次跑出来都不一样。诊断根因并给正确写法。",
    answer:
      "根因：**`reduce` 用了不可结合的操作（减法）**。`reduce` 能并行是因为它把求和顺序**重排成树形**（先分组并行、再合并），这要求操作**可结合/可交换**才能保证重排后结果不变。减法不满足：顺序算是 `((a-b)-c)-d`，`reduce` 重排成 `(a-b)-(c-d)` 结果完全不同；不同运行/核数/分块会给出不同值，所以「每次都不一样」——是用错算法，不是 bug。正确写法：累减是**严格顺序语义**，应用 `std::accumulate(v.begin(), v.end(), init, std::minus<>())`（它没有执行策略重载，正说明天生串行）。若真实需求其实是求和，则改用可结合的加法再 `reduce(par)` 并行。",
    tags: ["reduce", "可结合性", "排错"],
  },
  {
    id: "cc-pa-15",
    chapter: "cc-parallel-algorithms",
    level: 3,
    question:
      "给一段「对几十个元素各做一次加法」的循环加上 std::execution::par，反而比顺序还慢。为什么？该怎么办？",
    answer:
      "原因：**小数据 + 极轻处理无脑并行**。并行有固定开销——任务分发、线程调度、结果合并，还可能撞上 false sharing/锁争用。当数据量小（几十个）、每元素的活又极轻（一次加法）时，这笔开销**盖过**了并行省下的时间，于是比 `seq` 还慢（呼应 ch9 Amdahl：可并行收益太小、串行/开销占比太大）。办法：按「**数据量大 + 每元素够重 + 元素间无依赖无争用**」三条判断该不该 `par`——三条都占才并行，小活直接用 `seq`。",
    tags: ["何时并行", "开销", "排错"],
  },
  {
    id: "cc-pa-16",
    chapter: "cc-parallel-algorithms",
    level: 3,
    question:
      "并行 for_each 的函子里可能抛异常，程序没进 catch 就崩了（terminate）。原因与修法？",
    answer:
      "原因：**异常逸出并行算法**。标准规定，传给并行算法的函子若抛出异常并逸出算法边界，会直接调用 `std::terminate`——并行算法不会像 `std::async` 那样把异常存进 future 重抛。所以你在算法外面写的 `try/catch` 根本接不到。修法：在**函子内部** `try/catch` 把异常就地消化（如出错时给该元素一个安全默认值、或记录后吞掉），或预先保证函子不抛；绝不让异常飞出算法。",
    tags: ["异常", "terminate", "for_each"],
  },

  // ── L4 综合：设计取舍 / 深度 ──
  {
    id: "cc-pa-17",
    chapter: "cc-parallel-algorithms",
    level: 4,
    question:
      "给两段需求各选 seq/par/par_unseq 并说理：(a) 千万元素 vector<float>、每元素做较重数学变换、完全独立无副作用；(b) 仅 20 个元素、每元素查共享缓存表并在未命中时加锁写入。",
    answer:
      "(a) **选 par_unseq（至少 par）**：数据量极大、每元素够重、元素间无依赖无共享写无副作用——三条「值得并行」判据全占，分发开销被海量重活摊薄、加速明显；函子纯计算、不加锁不分配内存，满足 par_unseq 最严要求，可在多线程之上再叠加 SIMD 向量化吃满吞吐（退一步 par 也很好，只少向量化一层）。\n(b) **选 seq**：① 数据量极小（20 个），并行的分发/调度/合并开销几乎必然盖过收益、反而更慢；② 函子里**加锁写共享表**是同步 + 副作用，直接排除 par_unseq（函子不许同步），而即便用 par，那把锁也会成争用瓶颈把并行度吃光。「小数据 + 有争用」的活老实顺序执行最快也最简单。",
    tags: ["执行策略", "选型", "设计取舍"],
  },
];
