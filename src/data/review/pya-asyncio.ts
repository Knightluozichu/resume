import type { ReviewQuestion } from "./types";

/** asyncio异步编程 复习题 */
export const pyaAsyncioQuestions: ReviewQuestion[] = [
  {
    id: "pya-asyncio-1",
    chapter: "pya-asyncio",
    level: 1,
    question: "create_task 和直接 await 协程有什么区别？",
    answer: "create_task 将协程包装为 Task 立即调度，不阻塞等待。直接 await 阻塞直到完成，没有并发效果。",
    tags: ["create_task"],
  },
  {
    id: "pya-asyncio-2",
    chapter: "pya-asyncio",
    level: 2,
    question: "为什么协程中不能用 time.sleep()？",
    answer: "time.sleep() 阻塞整个事件循环，所有协程都无法执行。asyncio.sleep() 让出控制权让事件循环调度其他协程。",
    tags: ["阻塞", "事件循环"],
  },
  {
    id: "pya-asyncio-3",
    chapter: "pya-asyncio",
    level: 3,
    question: "如何用 asyncio 并发抓取 100 个 URL 并限制 10 个并发？",
    answer: "用 Semaphore(10) 限制并发，每个 fetch 在 async with sem 内执行，然后 gather 并发运行全部。",
    tags: ["Semaphore", "并发控制"],
  },
  {
    id: "pya-asyncio-4",
    chapter: "pya-asyncio",
    level: 4,
    question: "请分析 asyncio 协作式调度与 OS 抢占式调度的根本区别。",
    answer: "协作式：协程在 await 主动让出，无锁无竞态，但一个不让出会阻塞全部。抢占式：OS 按时间片抢占，公平但需锁。适合场景不同。",
    tags: ["综合", "协作式", "抢占式"],
  },
];
