import type { ReviewQuestion } from "./types";

/** C++ 性能优化指南 · 并发优化复习题 */
export const opcConcurrencyQuestions: ReviewQuestion[] = [
  {
    id: "opc-concurrency-1",
    chapter: "opc-concurrency",
    level: 1,
    question: `什么是锁竞争？为什么它会让多核程序退化到单核性能？`,
    answer:
      `锁竞争：多个线程同时争抢同一把锁，只有一个线程能进入临界区，其余线程阻塞等待。\n\n退化为单核的原因：\n如果临界区执行时间为 T，有 N 个线程，锁竞争激烈时，线程们串行进入临界区——总执行时间为 N×T，与单线程一样。多核的优势完全被锁的串行化抵消。\n\n更糟的是，锁还有额外开销：\n1. 上下文切换：阻塞线程被挂起，唤醒时需调度。\n2. 缓存失效：获得锁的线程修改了共享数据，其他核的缓存行 invalidate。\n3. 锁本身的原子操作：\`lock\`/\`unlock\` 是原子指令，多核间缓存同步。\n\n所以锁竞争下，多核程序可能比单核还慢（锁开销 + 串行化）。`,
    tags: ["锁竞争", "串行化", "多核"],
  },
  {
    id: "opc-concurrency-2",
    chapter: "opc-concurrency",
    level: 2,
    question: `什么是 false sharing？如何检测和消除？`,
    answer:
      `False sharing：不同线程频繁写同一个缓存行（通常 64 字节）中的不同变量。虽然逻辑上不共享数据，但物理上共享缓存行，导致缓存行在核间反复 invalidate。\n\n后果：看起来「无共享」的多线程代码跑得极慢，因为每次写都触发 MESI 协议的缓存同步。\n\n检测：\n用 \`perf c2c\`（Linux）检测 false sharing——它报告缓存行在核间的争用情况。热点变量如果落在同一缓存行且被不同核频繁写，就是 false sharing。\n\n消除方法：\n1. 缓存行对齐：用 \`alignas(64)\` 让变量独占一个缓存行。\n\`\`\`\nstruct alignas(64) PaddedCounter {\n    std::atomic<int> value{0};\n};\nPaddedCounter counters[NUM_THREADS];\n\`\`\`\n每个计数器独占 64 字节，消除 false sharing。\n\n2. 填充（padding）：在变量间插入无用字段撑开缓存行。\n\`\`\`\nstruct Counter {\n    std::atomic<int> value{0};\n    char padding[60];  // 填充到 64 字节\n};\n\`\`\`\n\n3. 线程局部存储：如果可能，用 \`thread_local\` 让每个线程有自己的副本，消除共享。`,
    tags: ["false sharing", "缓存行", "alignas", "perf c2c"],
  },
  {
    id: "opc-concurrency-3",
    chapter: "opc-concurrency",
    level: 3,
    question: `以下多线程代码对数组求和，性能比预期差很多。分析原因并优化。\n\n\`\`\`\nstd::atomic<int> total{0};\nstd::vector<std::thread> threads;\nfor (int t = 0; t < N; ++t) {\n    threads.emplace_back([&total, &data, t, N]() {\n        for (int i = t; i < data.size(); i += N) {\n            total += data[i];  // 原子加\n        }\n    });\n}\n\`\`\``,
    answer:
      `问题：false sharing + 原子操作热点。\n\`total\` 是一个 \`atomic<int>\`，所有线程对它执行 \`+=\`（原子 \`fetch_add\`）。虽然逻辑正确，但：\n1. 原子操作串行化：所有线程争抢同一个缓存行（\`total\` 所在的缓存行），每次 \`fetch_add\` 都 invalidate 其他核的缓存。\n2. 这等价于串行——多核并行被原子操作的缓存同步完全抵消。\n\n优化方案：\n\n1. 线程局部累加 + 最终合并（消除 false sharing）：\n\`\`\`\nstd::vector<int> local_sums(N, 0);\nfor (int t = 0; t < N; ++t) {\n    threads.emplace_back([&local_sums, &data, t, N]() {\n        int& local = local_sums[t];\n        for (int i = t; i < data.size(); i += N) {\n            local += data[i];  // 无原子操作\n        }\n    });\n}\n// join 后合并\nint total = 0;\nfor (auto& s : local_sums) total += s;\n\`\`\`\n每个线程写自己的 \`local_sums[t]\`，无竞争无原子操作。但 \`local_sums\` 是 \`vector<int>\`，相邻元素可能在同一缓存行——仍有 false sharing。\n\n2. 缓存行对齐（彻底消除 false sharing）：\n\`\`\`\nstruct alignas(64) PaddedSum { int value = 0; };\nstd::vector<PaddedSum> local_sums(N);\n\`\`\`\n每个线程的局部和独占一个缓存行。\n\n3. 用 \`std::reduce\` / \`std::execution::par\`（C++17 并行算法）：\n\`\`\`\nint total = std::reduce(\n    std::execution::par,\n    data.begin(), data.end(), 0);\n\`\`\`\n标准库自动处理分块和合并，通常已优化了 false sharing。\n\n推荐方案 2（手动对齐）或方案 3（标准库并行），benchmark 验证加速比应接近线性。`,
    tags: ["false sharing", "原子操作", "线程局部", "应用"],
  },
  {
    id: "opc-concurrency-4",
    chapter: "opc-concurrency",
    level: 4,
    question: `综合分析：一个多线程哈希表用一把全局锁保护，8 核下加速比只有 1.2 倍。请设计逐步优化方案，目标接近线性加速。`,
    answer:
      `问题：全局锁让所有线程串行化，8 根只比 1 根快 20%——锁竞争是瓶颈。\n\n逐步优化：\n\n1. 分段锁（sharded locks）——快速提升：\n把哈希表分成 K 个段（如 16/32 段），每段一把锁。\`hash(key) % K\` 决定访问哪个段。不同段的操作可并行。8 核 16 段时，锁冲突概率降到 1/16，加速比可达 6-7 倍。\n\`\`\`\nstruct Shard { mutex m; unordered_map<K,V> map; };\nvector<Shard> shards(16);\nvoid put(K key, V val) {\n    auto& s = shards[hash(key) % 16];\n    lock_guard<mutex> lk(s.m);\n    s.map[key] = val;\n}\n\`\`\`\n\n2. 读写锁（RWLock）——读多写少时：\n如果读操作远多于写，用 \`shared_mutex\`（读写锁）。读操作共享锁可并行，写操作独占锁。但读写锁有写饥饿问题和原子操作开销，读极高时不如方案 3。\n\n3. 无锁哈希表——极致性能：\n用 CAS（compare-and-swap）原子操作实现无锁哈希表。读操作完全无锁（最快），写操作用 CAS 无阻塞。实现复杂（ABA 问题、内存回收），可用现成实现如 Folly's \`ConcurrentHashMap\` 或 Intel TBB \`concurrent_hash_map\`。\n\n4. 细粒度优化：\n- 读路径：\`atomic\` 指针 + 不可变节点，读完全无锁。\n- 写路径：CAS 链表插入，冲突时重试而非阻塞。\n- 内存回收：用 hazard pointer 或 epoch-based reclamation 解决节点回收问题。\n\n5. 验证与防回归：\n- benchmark：8 核下写密集/读密集两种场景的吞吐。\n- 正确性：用 ThreadSanitizer 检测数据竞争。\n- 压力测试：高并发下长时间运行无崩溃。\n\n实施顺序：分段锁（改动小、收益大）→ 读写锁（读多写少时）→ 无锁（需极致性能且有经验时）。分段锁通常能把 1.2 倍加速比提到 6-7 倍，已满足大多数场景。`,
    tags: ["综合", "分段锁", "无锁", "哈希表", "线性加速"],
  },
];
