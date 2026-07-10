import type { ReviewQuestion } from "./types";

export const gep1MemorySystemQuestions: ReviewQuestion[] = [
  {
    id: "gep1-memory-system-1",
    chapter: "gep1-memory-system",
    level: 1,
    question: `引擎帧内为什么几乎不用通用 malloc/free？`,
    answer: `通用 malloc 的分配时间不可控——可能触发操作系统系统调用（向内核申请新内存），一次可能花数毫秒，在 60fps 帧预算（16.6ms）里造成明显抖动。引擎改用自定义分配器（栈/池/单帧），把分配变成可预测的指针移动和链表操作，时间确定在几十纳秒。`,
    tags: ["malloc", "自定义分配器"],
  },
  {
    id: "gep1-memory-system-2",
    chapter: "gep1-memory-system",
    level: 2,
    question: `栈分配器、对象池、单帧分配器分别适合什么场景？`,
    answer: `栈分配器适合有明确作用域的临时分配（LIFO 回滚到 Marker，零碎片）。对象池适合高频创建销毁的固定大小小对象（子弹/粒子/网络包，取出归还都是 O(1) 无碎片）。单帧分配器适合生命周期在一帧内的逐帧临时数据（帧末自动 Reset，零开销回收，但不能跨帧持有）。`,
    tags: ["栈分配器", "对象池", "单帧分配器"],
  },
  {
    id: "gep1-memory-system-3",
    chapter: "gep1-memory-system",
    level: 3,
    question: `单帧分配器为什么不会内存泄露？它的限制是什么？`,
    answer: `不会泄露是因为每帧开始调用 \`Reset()\` 把指针归零，上一帧分配的内存一次性全部逻辑释放。限制是：从单帧分配器取的内存不能跨帧持有——下帧 Reset 后那块内存会被覆盖。所以它只适合生命周期在一帧内的临时数据（临时字符串、事件参数拷贝），长期存活的对象必须用其他分配器或对象池。`,
    tags: ["单帧分配器", "内存泄露"],
  },
  {
    id: "gep1-memory-system-4",
    chapter: "gep1-memory-system",
    level: 4,
    question: `一款射击游戏每帧最多 200 颗子弹，请给出完整的内存分配方案。`,
    answer: `子弹用对象池，预分配 256 个槽位（200 上限 + 20% 缓冲）。创建 = 从空闲链表取槽位 + placement new 构造；销毁 = \`Reset()\` 清状态 + 归还链表。帧内的临时计算（弹道检测的临时数组、日志字符串）用单帧分配器，帧末自动回收。子弹的渲染数据（顶点缓冲）用专用分配器，大块连续内存对缓存友好。关卡加载时的临时字符串解析用栈分配器，加载完 Marker 回滚。这样帧内零 malloc、子弹零碎片、临时数据零开销，帧时间稳定。`,
    tags: ["综合", "对象池", "单帧分配器"],
  },
];
