import type { ReviewQuestion } from "./types";

/** C++ 服务器开发精髓 · 性能调优复习题 */
export const csePerformanceTuningQuestions: ReviewQuestion[] = [
  {
    id: "cse-performance-tuning-1",
    chapter: "cse-performance-tuning",
    level: 1,
    question: `性能调优的循环流程是什么？为什么不能凭直觉优化？`,
    answer:
      `循环流程：测量 → 分析 → 优化 → 验证 → 回到测量\n\n1. 测量：用压测工具（wrk）建立基线（QPS、P99 延迟），用 perf 采样 CPU 热点\n2. 分析：生成火焰图，定位最宽的函数（占用 CPU 最多）\n3. 优化：针对性修改代码（如分段锁减少锁竞争）\n4. 验证：同样参数压测，对比基线确认提升，跑回归测试防回退\n5. 回到测量：继续找下一个瓶颈\n\n不能凭直觉的原因：\n- 现代服务器从硬件到应用有四五层，CPU 有缓存、分支预测、乱序执行\n- 80% 时间花在 20% 代码上，直觉猜中的概率极低\n- 一个看起来慢的函数可能只占 1% 时间\n- 不测量就优化 = 瞎猜，可能浪费一周换来 0% 提升\n\n纪律：每次只改一个变量，前后对比；只优化火焰图最宽的函数。`,
    tags: ["测量驱动", "火焰图", "循环"],
  },
  {
    id: "cse-performance-tuning-2",
    chapter: "cse-performance-tuning",
    level: 2,
    question: `从硬件到应用四层瓶颈分别用什么工具排查？典型问题是什么？`,
    answer:
      `四层瓶颈及排查工具：\n\n1. 硬件层：\n- 工具：top（CPU）、mpstat（各核负载）、sar（历史趋势）、free（内存）\n- 典型问题：CPU 跑满、网卡中断打满一个核（IRQ 亲和性没调）、内存不够\n\n2. 系统调用层：\n- 工具：strace（跟踪系统调用）、perf stat（上下文切换次数）\n- 典型问题：read/write 调用次数过多、频繁上下文切换、频繁缺页\n\n3. 协议栈层：\n- 工具：ss -s（连接统计）、netstat（各状态数量）、/proc/sys/net/（内核参数）\n- 典型问题：SYN 队列满（backlog 太小）、TIME_WAIT 堆积、端口耗尽\n\n4. 应用逻辑层：\n- 工具：perf record + 火焰图、gprof\n- 典型问题：锁竞争、算法复杂度高、内存分配频繁\n\n排查方向：从底向上，先排硬件和系统层，再排协议栈，最后排应用层。`,
    tags: ["四层瓶颈", "工具", "排查"],
  },
  {
    id: "cse-performance-tuning-3",
    chapter: "cse-performance-tuning",
    level: 3,
    question: `火焰图怎么生成？怎么从火焰图上找到性能瓶颈？`,
    answer:
      `生成火焰图：\n\`\`\`bash\n# 1. 用 perf 采样 CPU（30 秒）\nperf record -F 99 -g -p $(pgrep server) -- sleep 30\n\n# 2. 生成火焰图\nperf script | stackcollapse-perf.pl | flamegraph.pl > perf.svg\n\n# 3. 在浏览器打开 perf.svg\n\`\`\`\n\n阅读火焰图：\n- 横轴：函数占 CPU 采样数的比例（越宽越热）\n- 纵轴：调用栈深度（从下到上是调用关系）\n- 最宽的函数就是瓶颈\n\n举例分析：\n- 如果 \`__pthread_mutex_lock\` 很宽 → 锁竞争严重\n  → 解决：分段锁、读写锁、无锁结构\n- 如果 \`read\` 很宽 → 系统调用太多\n  → 解决：readv 批量读、减少 read 次数\n- 如果 \`memcpy\` 很宽 → 数据拷贝太多\n  → 解决：零拷贝（sendfile）、减少 buffer 拷贝\n- 如果 \`malloc\`/\`free\` 很宽 → 内存分配频繁\n  → 解决：对象池、内存池、预分配\n\n注意：火焰图只看 CPU 热点。如果瓶颈是 IO 等待（CPU 不忙但延迟高），需要用 off-CPU 火焰图。`,
    tags: ["火焰图", "perf", "热点分析"],
  },
  {
    id: "cse-performance-tuning-4",
    chapter: "cse-performance-tuning",
    level: 4,
    question: `综合分析：服务器 QPS 上不去，火焰图显示 40% CPU 在 mutex_lock，怎么优化？`,
    answer:
      `分析：40% CPU 在 mutex_lock 说明锁竞争严重，多个线程在抢同一把锁。\n\n排查步骤：\n1. 确认是哪把锁：看火焰图中 mutex_lock 上方的调用栈，定位到具体代码\n2. 常见场景：全局连接管理 map 的一把锁，所有线程都要抢\n\n优化方案（从易到难）：\n\n方案 1：分段锁（推荐，改动小）\n\`\`\`cpp\n// 把全局一把锁拆成 16 把\nstatic constexpr int N = 16;\nstruct Shard { std::mutex mtx; std::unordered_map<int, Connection*> conns; };\nstd::array<Shard, N> shards_;\nShard& get_shard(int fd) { return shards_[fd % N]; }\nvoid add(int fd, Connection* c) {\n  std::lock_guard<std::mutex> lock(get_shard(fd).mtx);\n  get_shard(fd).conns[fd] = c;\n}\n\`\`\`\n竞争分散到 16 把锁，每把锁的竞争概率降为 1/16。\n\n方案 2：读写锁（读多写少场景）\n\`\`\`cpp\nstd::shared_mutex rw_mtx_;\nConnection* get(int fd) {\n  std::shared_lock<std::shared_mutex> lock(rw_mtx_);  // 读锁，可并发\n  return conns_[fd];\n}\n\`\`\`\n读操作可以并发，只有写操作互斥。\n\n方案 3：无锁结构（彻底消除锁）\n- 每个连接绑定固定线程，线程内无锁\n- 用 CAS 原子操作代替互斥锁\n- 用消息队列代替共享数据\n\n方案 4：减小临界区\n- 把不需要锁的操作移到锁外\n- 用局部变量暂存，只在必要时加锁写回\n\n验证：优化后重新压测，QPS 应提升，mutex_lock 在火焰图中变窄。同时检查 P99 延迟是否改善。`,
    tags: ["综合", "锁竞争", "分段锁", "优化"],
  },
];
