import type { ReviewQuestion } from "./types";

/** C++ 服务器开发精髓 · 线程池复习题 */
export const cseThreadPoolQuestions: ReviewQuestion[] = [
  {
    id: "cse-thread-pool-1",
    chapter: "cse-thread-pool",
    level: 1,
    question: `线程池的三个核心组件是什么？各自的作用？`,
    answer:
      `线程池的三个核心组件：\n\n1. 任务队列：生产者（Reactor 线程）把任务投递到队列，消费者（工作线程）从队列取任务执行。通常用 \`std::queue<std::function<void()>>\`，需要有界防止内存爆。\n\n2. 工作线程：预先创建的一组线程，每个在 \`while(true)\` 循环里从队列取任务。队列空时阻塞等待（条件变量），有任务时被唤醒。\n\n3. 同步机制：互斥锁保护队列（多线程读写），条件变量在「队列空时阻塞工作线程」「队列非空时唤醒工作线程」。\n\n数据流：submit(task) → 加锁入队 → 解锁 → notify_one → 工作线程被唤醒 → 加锁取任务 → 解锁 → 执行 task()。`,
    tags: ["线程池", "任务队列", "条件变量"],
  },
  {
    id: "cse-thread-pool-2",
    chapter: "cse-thread-pool",
    level: 2,
    question: `为什么 task() 必须在锁外执行？如果持锁执行会怎样？`,
    answer:
      `task() 必须在锁外执行，因为如果持锁执行 task，其他工作线程在取任务时也要加同一个互斥锁，全部被阻塞。线程池退化成串行执行，失去了并行的意义。\n\n\`\`\`cpp\n// 错误：持锁执行，其他线程全卡住\nwhile (true) {\n  std::unique_lock<std::mutex> lock(mtx);\n  cv.wait(lock, []{ return !queue.empty(); });\n  auto task = queue.front();\n  queue.pop();\n  task();  // 持锁执行！其他线程无法取任务\n}\n\n// 正确：锁外执行\nwhile (true) {\n  std::function<void()> task;\n  {\n    std::unique_lock<std::mutex> lock(mtx);\n    cv.wait(lock, []{ return !queue.empty(); });\n    task = std::move(queue.front());\n    queue.pop();\n  }  // 离开作用域，解锁\n  task();  // 锁外执行，其他线程可并行取任务\n}\n\`\`\``,
    tags: ["互斥锁", "并行", "作用域"],
  },
  {
    id: "cse-thread-pool-3",
    chapter: "cse-thread-pool",
    level: 3,
    question: `线程池的线程数应该设多少？CPU 密集型和 IO 密集型有什么不同？`,
    answer:
      `线程数取决于任务类型：\n\nCPU 密集型（计算、压缩、加密）：\n- 线程数 = CPU 核数（或核数+1）\n- 原因：线程数超过核数后，上下文切换开销超过并行收益。+1 是因为偶尔的页面故障等小阻塞。\n- 过多线程：CPU 在切换上浪费时间，实际计算反而变慢\n\nIO 密集型（网络、磁盘、数据库）：\n- 线程数 = 核数 x 2 ~ 核数 x 4\n- 原因：线程大部分时间在等 IO 不占 CPU，多设一些可以提高并发度，让 CPU 不闲着\n- 公式参考：线程数 = 核数 x (1 + IO等待时间/CPU时间)\n\n混合型：根据任务比例折中，或用两个线程池分别处理 CPU 密集和 IO 密集任务。\n\n\`\`\`cpp\nint n = std::thread::hardware_concurrency();\nThreadPool cpu_pool(n);        // CPU 密集\nThreadPool io_pool(n * 4);     // IO 密集\n\`\`\``,
    tags: ["线程数", "CPU密集", "IO密集"],
  },
  {
    id: "cse-thread-pool-4",
    chapter: "cse-thread-pool",
    level: 4,
    question: `综合分析：线程池队列无界会有什么问题？如何做背压控制？`,
    answer:
      `无界队列的问题：\n1. 内存爆炸：生产速度远超消费速度时，任务无限堆积，最终 OOM\n2. 延迟增加：队列里排了大量任务，新任务的响应延迟趋近无穷大\n3. 雪崩：服务器假死，上游超时重试，请求量翻倍，恶性循环\n\n背压控制方案：\n\n1. 有界队列 + 阻塞 submit：队列满时 submit 阻塞，让生产者减速\n\`\`\`cpp\nvoid submit(Task task) {\n  std::unique_lock<std::mutex> lock(mtx_);\n  not_full_.wait(lock, [this]{ return queue_.size() < max_size_ || stop_; });\n  queue_.push(std::move(task));\n  not_empty_.notify_one();\n}\n\`\`\`\n\n2. 有界队列 + 拒绝策略：队列满时丢弃任务或返回错误\n\`\`\`cpp\nbool try_submit(Task task) {\n  std::lock_guard<std::mutex> lock(mtx_);\n  if (queue_.size() >= max_size_) return false;  // 拒绝\n  queue_.push(std::move(task));\n  cv_.notify_one();\n  return true;\n}\n\`\`\`\n\n3. 动态扩容：队列满时临时增加线程到 maxPoolSize，仍满才拒绝\n4. 反压到上游：通过 HTTP 429 或 TCP 滑动窗口让客户端减速\n\n实际服务器通常组合使用：有界队列 + 阻塞 submit + 超时拒绝。`,
    tags: ["综合", "背压", "有界队列", "拒绝策略"],
  },
];
