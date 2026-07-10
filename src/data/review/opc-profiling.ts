import type { ReviewQuestion } from "./types";

/** C++ 性能优化指南 · 性能分析工具复习题 */
export const opcProfilingQuestions: ReviewQuestion[] = [
  {
    id: "opc-profiling-1",
    chapter: "opc-profiling",
    level: 1,
    question: `采样剖析（如 perf）和插桩剖析（如 gprof）的区别是什么？各有什么优缺点？`,
    answer:
      `采样剖析（perf）：\n- 原理：定期中断程序（如每 1ms），记录当前指令地址（调用栈）。统计各函数被采样到的次数。\n- 优点：开销低（~1-5%），可在生产环境运行；无需重新编译；能捕捉系统调用和库函数。\n- 缺点：统计性结果有误差（可能漏掉短函数）；无法精确测量调用次数和单次耗时。\n\n插桩剖析（gprof）：\n- 原理：编译时在每个函数入口/出口插入计数代码，记录调用次数和累计耗时。\n- 优点：精确——知道每个函数被调用多少次、每次平均耗时多少。\n- 缺点：开销高（每个函数都插桩，10-100% 减速）；需重新编译；无法捕捉未插桩的库函数。\n\n选择：日常用 perf（低开销、无需重编译），需要精确调用次数时用 gprof 或 Callgrind。`,
    tags: ["perf", "gprof", "采样", "插桩"],
  },
  {
    id: "opc-profiling-2",
    chapter: "opc-profiling",
    level: 2,
    question: `google-benchmark 和剖析器（profiler）解决什么不同的问题？它们如何配合使用？`,
    answer:
      `google-benchmark：量化工具。回答「有多快」——测量某段代码的耗时（纳秒级）、吞吐量（ops/s）、缓存命中率等。它给你一个精确的数字基线。\n\n剖析器（profiler）：定位工具。回答「哪里慢」——告诉你哪个函数占用了最多时间、调用关系如何、cache miss 在哪里。它给你一张热点地图。\n\n配合使用的工作流：\n1. 先用 google-benchmark 建立基线：「当前函数耗时 100ms」。\n2. 用剖析器定位热点：「80% 时间在 \`processData()\`」。\n3. 优化 \`processData()\`。\n4. 回到 google-benchmark 验证：「优化后 20ms，提速 5 倍」。\n5. 如果未达标，回到步骤 2 继续剖析。\n\n没有 benchmark 你不知道优化是否有效；没有 profiler 你不知道该优化哪里。两者缺一不可。`,
    tags: ["benchmark", "profiler", "基线", "工作流"],
  },
  {
    id: "opc-profiling-3",
    chapter: "opc-profiling",
    level: 3,
    question: `用 \`perf record\` + \`perf report\` 分析一个慢程序后，发现热点是一个 \`std::vector\` 的 \`push_back\` 调用。但你知道 \`push_back\` 是 O(1) 均摊的。接下来怎么排查？`,
    answer:
      `\`push_back\` 虽然均摊 O(1)，但可能隐藏以下问题：\n\n1. 扩容开销：如果 \`vector\` 没有 \`reserve\`，每次容量翻倍时会重新分配 + 拷贝旧数据。在循环中反复 \`push_back\` 可能触发多次扩容。\n排查：检查代码是否在 \`push_back\` 前调用了 \`reserve\`。如果没有，加上 \`reserve(estimated_size)\` 后重新 benchmark。\n\n2. 拷贝开销：如果存的是大对象（如 \`vector<BigStruct>\`），每次 \`push_back\` 拷贝大对象。\n排查：用 \`perf record -e cache-misses\` 看是否有大量 cache miss。检查元素类型大小。优化：改存 \`unique_ptr<BigStruct>\` 或 \`emplace_back\` + move 语义。\n\n3. 分配器锁竞争（多线程）：多线程 \`push_back\` 到不同 \`vector\` 但分配器内部有全局锁。\n排查：\`perf record -e sched:sched_switch\` 看是否有锁等待。优化：用线程局部 \`vector\` 或 \`tcmalloc\`/\`jemalloc\`。\n\n4. 用 perf 深挖：\n- \`perf record -g\`（带调用栈）：看 \`push_back\` 是被谁调用的，调用链是否有问题。\n- \`perf stat\`：看 IPC（指令/周期）、cache miss 率、分支预测失败率。\n- \`perf record -e instructions,cache-misses,branch-misses\`：多事件对比。\n\n5. Valgrind Callgrind 精确分析：\n如果 perf 的采样精度不够，用 Callgrind 精确统计 \`push_back\` 内部的指令数和 cache 行为，看是扩容、拷贝还是分配器在耗时。\n\n推荐排查顺序：先查是否 \`reserve\`（最常见原因）→ 再查元素大小和拷贝 → 最后查多线程分配器竞争。`,
    tags: ["perf", "push_back", "扩容", "应用"],
  },
  {
    id: "opc-profiling-4",
    chapter: "opc-profiling",
    level: 4,
    question: `综合分析：团队引入性能分析工具后，每次优化都声称「快了 2 倍」，但用户感觉不到改善。请分析可能的陷阱并给出正确的性能测量方法论。`,
    answer:
      `可能的陷阱：\n\n1. 微基准不代表真实场景：\ngoogle-benchmark 测的是孤立函数，但真实场景中该函数可能只占总耗时的 1%。快 2 倍 = 总体快 0.5%（阿姆达尔定律）。必须先剖析确认函数在真实场景中的占比。\n\n2. 测量条件不一致：\n- 数据规模不同：benchmark 用 1000 条数据，生产是 100 万条。\n- 编译选项不同：benchmark 开了 O3，生产没开。\n- 硬件不同：benchmark 在空闲机器上，生产在满负载机器上。\n- 缓存状态不同：冷启动 vs 热缓存。\n\n3. 编译器优化掉了测试：\nbenchmark 测的代码可能被编译器完全优化掉（dead code elimination），测的是空循环。必须用 \`DoNotOptimize\` / \`blackhole\` 防止优化。\n\n4. 忽略了 I/O 和系统调用：\nbenchmark 只测计算部分，但真实场景的瓶颈在 I/O（磁盘、网络）。CPU 快 2 倍但 I/O 不变，用户无感。\n\n5. 忽略了 P99 延迟：\n平均快了但尾延迟没改善（甚至变差），用户体验取决于 P99 而非平均值。\n\n正确的性能测量方法论：\n\n1. 先剖析真实场景：用 perf 在生产或类生产负载下运行，确认热点占比。\n2. 微基准 + 端到端基准结合：微基准验证算法正确性，端到端基准验证用户可感知改善。\n3. 控制变量：固定数据规模、硬件、编译选项、预热次数。冷热缓存分别测。\n4. 防止编译器优化：用 \`benchmark::DoNotOptimize\` 和 \`benchmark::ClobberMemory\`。\n5. 关注尾延迟：测 P50/P95/P99，不只平均值。\n6. 统计显著性：跑多次取中位数 + 置信区间，不要只跑一次。\n7. 回归测试：把 benchmark 纳入 CI，自动对比基线，防止「声称快了」但实际回归。`,
    tags: ["综合", "测量方法论", "微基准", "阿姆达尔定律", "P99"],
  },
];
