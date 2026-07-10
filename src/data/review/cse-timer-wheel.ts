import type { ReviewQuestion } from "./types";

/** C++ 服务器开发精髓 · 定时器复习题 */
export const cseTimerWheelQuestions: ReviewQuestion[] = [
  {
    id: "cse-timer-wheel-1",
    chapter: "cse-timer-wheel",
    level: 1,
    question: `时间轮的核心结构是什么？指针旋转的作用是什么？`,
    answer:
      `时间轮的核心结构：\n\n1. 环形数组：大小为 N 的数组，每个元素是一个链表头。数组的索引就是槽位编号。\n\n2. 槽位链表：同一个槽位上的定时器到期时间相同（或差 N x tick 的整数倍），用双向链表串起来。\n\n3. 指针：指向当前槽位，每 tick（如 100ms）前进一格。\n\n指针旋转的作用：\n- 指针转到某个槽位时，遍历该槽位的链表\n- 轮次（rotation）为 0 的定时器到期，执行回调并删除\n- 轮次大于 0 的定时器轮次减 1，还没到期\n\n类比时钟：秒针每秒转一格，转到哪个数字就处理哪个数字上的事件。时间轮的 tick 就是秒针的一格。\n\n容量 = N x tick（如 1024 槽 x 10ms = 10.24 秒），更长的时间用多级时间轮。`,
    tags: ["时间轮", "环形数组", "指针旋转"],
  },
  {
    id: "cse-timer-wheel-2",
    chapter: "cse-timer-wheel",
    level: 2,
    question: `为什么时间轮的添加和删除是 O(1)，而红黑树是 O(log n)？`,
    answer:
      `时间轮 O(1) 的原因：\n\n添加：\n\`\`\`cpp\nvoid add(Timer* t, int timeout_ms) {\n  int ticks = timeout_ms / tick_ms_;        // 算转几格\n  int rotation = ticks / slot_count_;       // 算转几圈\n  int slot = (current_ + ticks) % slot_count_;  // 算落在哪个槽\n  t->rotation = rotation;\n  t->slot = slot;\n  // 头插法，O(1)\n  t->next = slots_[slot];\n  if (slots_[slot]) slots_[slot]->prev = t;\n  slots_[slot] = t;\n}\n\`\`\`\n全程只有算术运算和链表头插，没有搜索和比较，O(1)。\n\n删除：\n双向链表，只要知道节点指针就能 O(1) 摘除（t->prev->next = t->next, t->next->prev = t->prev），不需要从头查找。\n\n红黑树 O(log n) 的原因：\n- 添加：从根开始比较找到插入位置 + 重平衡，O(log n)\n- 删除：找到节点 + 重平衡，O(log n)\n\n当 n = 50 万时，log(n) ≈ 19，时间轮每秒 10 万次添加/删除只需算术运算，红黑树需要 190 万次比较操作。`,
    tags: ["O(1)", "红黑树", "复杂度"],
  },
  {
    id: "cse-timer-wheel-3",
    chapter: "cse-timer-wheel",
    level: 3,
    question: `多级时间轮是怎么工作的？为什么需要多级？`,
    answer:
      `单级时间轮容量 = 槽数 x tick。如 1024 槽 x 10ms = 10.24 秒。超过 10.24 秒的定时器放不下。\n\n多级时间轮类似时钟的秒/分/时针：\n- 第一级：1024 槽 x 1ms，容量约 1 秒\n- 第二级：1024 槽 x 1 秒，容量约 17 分钟\n- 第三级：1024 槽 x 17 分钟，容量约 12 天\n\n工作原理：\n1. 添加 5 秒的定时器：5 秒超过第一级容量（1 秒），放入第二级\n2. 第一级转完一圈（1 秒），第二级前进一格\n3. 第二级前进到有定时器的槽时，把定时器「降级」迁移到第一级\n4. 第一级再转 5 圈后，定时器到期执行\n\n\`\`\`cpp\nvoid tick() {\n  // 第一级前进\n  if (++current1_ % 1024 == 0) {\n    // 第一级转完一圈，第二级前进\n    cascade(level2_, ++current2_ % 1024);\n  }\n  process_slots(level1_, current1_ % 1024);\n}\n\nvoid cascade(std::vector<Timer*>& wheel, int slot) {\n  // 把该槽的定时器重新计算并插入到第一级\n  Timer* t = wheel[slot];\n  while (t) {\n    add(t, t->remaining_time);  // 重新插入\n    t = t->next;\n  }\n  wheel[slot] = nullptr;\n}\n\`\`\`\n\n不用多级的话，要管 12 天的定时器，1ms tick 需要 10 亿个槽，内存不现实。多级用 3072 个槽覆盖 12 天。`,
    tags: ["多级时间轮", "级联", "容量"],
  },
  {
    id: "cse-timer-wheel-4",
    chapter: "cse-timer-wheel",
    level: 4,
    question: `综合分析：一个服务器有 10 万个连接，每个连接 60 秒超时。用时间轮还是最小堆？怎么实现？`,
    answer:
      `选时间轮。原因：\n- 10 万连接，每秒可能有数千次添加/删除（新连接建连、旧连接活跃更新）\n- 时间轮 O(1) vs 最小堆 O(log n) ≈ O(17)\n- 时间轮更适合海量定时器频繁增删的场景\n\n实现方案：\n\n1. 单级时间轮：\n- 槽数 = 600（60 秒 / 0.1 秒 tick = 600 槽）\n- tick = 100ms\n- 容量正好 60 秒\n- 每个连接的 last_active 更新时，删除旧定时器，添加新定时器\n\n2. 工作流程：\n\`\`\`cpp\n// 连接活跃时（收到数据）\nvoid Connection::on_active() {\n  timer_wheel_.remove(timer_);   // 删旧定时器 O(1)\n  timer_ = timer_wheel_.add([]{ this->close(); }, 60000);  // 加新 O(1)\n  last_active_ = now();\n}\n\n// tick 到来（每 100ms）\nvoid Server::on_tick() {\n  timer_wheel_.tick();  // 处理到期定时器\n  // 到期的连接会被 close\n}\n\`\`\`\n\n3. 优化：惰性删除\n- 不在每次活跃时都删旧定时器\n- 定时器到期时检查 last_active_，如果在过去 60 秒内有活跃，重新插入而不 close\n- 减少添加/删除次数\n\n\`\`\`cpp\nvoid timeout_callback(Connection* conn) {\n  if (now() - conn->last_active() < 60000) {\n    // 还没超时，重新插入\n    timer_wheel_.add([conn]{ timeout_callback(conn); }, 60000);\n  } else {\n    conn->close();  // 真的超时了\n  }\n}\n\`\`\`\n\n4. tick 驱动：用 epoll_wait 的 timeout 参数或 timerfd 驱动 tick，不额外开线程。\n\n核心优势：10 万连接每秒数千次定时器操作，时间轮的 O(1) 比最小堆快 17 倍，CPU 开销可忽略。`,
    tags: ["综合", "时间轮", "最小堆", "超时管理"],
  },
];
