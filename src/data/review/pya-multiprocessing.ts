import type { ReviewQuestion } from "./types";

/** multiprocessing多进程 复习题 */
export const pyaMultiprocessingQuestions: ReviewQuestion[] = [
  {
    id: "pya-multiprocessing-1",
    chapter: "pya-multiprocessing",
    level: 1,
    question: `GIL 是什么？为什么限制多线程的 CPU 密集任务？`,
    answer: `GIL 保证同一时刻只有一个线程执行字节码，多线程无法真正并行 CPU 密集计算。`,
    tags: ["GIL"],
  },
  {
    id: "pya-multiprocessing-2",
    chapter: "pya-multiprocessing",
    level: 2,
    question: `multiprocessing 的 Queue 和 threading 的 Queue 有什么区别？`,
    answer: `threading.Queue 共享内存直接传递。multiprocessing.Queue 需 pickle 序列化通过管道传输，有序列化开销。`,
    tags: ["Queue", "IPC"],
  },
  {
    id: "pya-multiprocessing-3",
    chapter: "pya-multiprocessing",
    level: 3,
    question: `如何用进程池并行处理大型 NumPy 数组？`,
    answer: `分片用 pool.map 并行处理，或用 SharedMemory 共享内存避免复制。大数据量用 SharedMemory 更优。`,
    tags: ["进程池", "SharedMemory"],
  },
  {
    id: "pya-multiprocessing-4",
    chapter: "pya-multiprocessing",
    level: 4,
    question: `请对比 asyncio、threading、multiprocessing 三种并发模型。`,
    answer: `asyncio：单线程协作式，IO 密集。threading：多线程抢占式，受 GIL 限制，IO 密集+阻塞库。multiprocessing：多进程真并行，CPU 密集，IPC 开销大。`,
    tags: ["综合", "并发对比"],
  },
];
