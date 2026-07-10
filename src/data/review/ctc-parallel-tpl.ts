import type { ReviewQuestion } from "./types";

export const ctcParallelTplQuestions: ReviewQuestion[] = [
  {
    id: "ctc-parallel-tpl-1",
    chapter: "ctc-parallel-tpl",
    level: 1,
    question: `并行（Parallelism）和异步（Asynchrony）有什么本质区别？各适合什么场景？`,
    answer: `并行是同时利用多个CPU核心执行计算——把大CPU密集任务拆成多份，多核同时算。适合CPU密集型场景（矩阵运算、图像处理）。异步是避免线程阻塞等待I/O完成——发起I/O后线程释放，I/O完成后continuation恢复。适合I/O密集型场景（网络请求、文件读写）。两者正交：可异步且并行，可异步不并行，可并行不异步。`,
    tags: ["并行", "异步", "CPU密集", "I/O密集"],
  },
  {
    id: "ctc-parallel-tpl-2",
    chapter: "ctc-parallel-tpl",
    level: 2,
    question: `Parallel.For 中多个线程同时执行 counter++ 为什么结果不确定？列出三种线程安全的替代方案。`,
    answer: `counter++不是原子操作——分读取、加1、写回三步。多线程同时执行时发生竞态条件：A读到5，B也读到5，A写6，B也写6——两次自增只增加了1。三种安全方案：1）Interlocked.Increment(ref counter)——原子自增，最轻量。2）lock互斥锁——保证一次只有一个线程进入临界区。3）无共享设计——每个线程写不同索引（partialResults[i]=Process(i)），最后串行合并，完全避免竞争。`,
    tags: ["竞态条件", "Interlocked", "lock", "无共享"],
  },
  {
    id: "ctc-parallel-tpl-3",
    chapter: "ctc-parallel-tpl",
    level: 3,
    question: `为什么不应该用 Task.Run 包装 I/O 操作来提高性能？正确做法是什么？`,
    answer: `Task.Run包装I/O不会更快——I/O不占CPU。它只是把等待I/O从当前线程移到线程池线程，白白占用一个线程池线程。正确做法是直接await异步I/O方法（如httpClient.GetAsync）——异步I/O不占用任何线程，网卡完成后continuation被调度执行。Task.Run应该只用于CPU密集计算的卸载（如UI线程卸载HeavyCompute）。混淆并行和异步是常见错误：用Task.Run处理I/O浪费线程，用async/await处理CPU计算不利用多核。`,
    tags: ["Task.Run", "I/O", "异步", "线程池", "性能"],
  },
  {
    id: "ctc-parallel-tpl-4",
    chapter: "ctc-parallel-tpl",
    level: 4,
    question: `PLINQ 的 AsParallel()、AsOrdered()、ForAll() 各有什么作用？在什么情况下 PLINQ 比串行 LINQ 更慢？`,
    answer: `AsParallel()将LINQ查询转为并行执行，自动分区调度。AsOrdered()保持原始元素顺序（有合并开销，降低性能）。ForAll()并行遍历结果不需合并（省合并开销，适合副作用操作如写日志）。PLINQ比串行慢的情况：1）数据量小或迭代体轻量——线程池调度、分区、合并的开销超过并行收益。2）有共享状态竞争——锁开销抵消并行收益。3）AsOrdered()的排序合并开销大。经验法则：迭代体执行时间<1ms时Parallel.For通常比串行for慢。先测量再并行。`,
    tags: ["PLINQ", "AsParallel", "AsOrdered", "ForAll", "性能"],
  },
];
