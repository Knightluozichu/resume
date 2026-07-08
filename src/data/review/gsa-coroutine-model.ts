import type { ReviewQuestion } from "./types";

export const gsaCoroutineModelQuestions: ReviewQuestion[] = [
  {
    id: "gsa-coroutine-model-1",
    chapter: "gsa-coroutine-model",
    level: 2,
    question: "协程相对线程的两大核心优势是什么？为什么协程能撑住更高并发？",
    answer:
      "两大优势：①轻量——线程栈 1-8MB，协程栈几 KB（有栈）或零开销（无栈），同样内存能开百倍以上并发单元；②切换快——线程切换陷内核、保存寄存器、TLB 失效，约 1-10 微秒；协程切换纯用户态，约 100 纳秒。能撑高并发的根本原因是「I/O 密集型任务大部分时间在等」，协程让等待时不占用线程——单线程内事件循环驱动成千上万协程，I/O 完成就唤醒对应协程继续跑。1 万个并发 DB 查询只需 CPU 核数个线程，而非 1 万线程。",
    tags: ["协程", "线程", "并发"],
  },
  {
    id: "gsa-coroutine-model-2",
    chapter: "gsa-coroutine-model",
    level: 3,
    question: "有栈协程和无栈协程的核心区别是什么？各举一个实现例子。",
    answer:
      "核心区别在「能否在任意函数层级挂起」和「栈开销」。有栈协程（Go goroutine、Lua coroutine、boost.fiber）每个协程有独立栈内存，可在任意嵌套调用深处挂起，写法接近同步代码；代价是每个协程固定占几 KB 栈，10 万协程约几百 MB。无栈协程（C++20 co_await、JS async/await、Python asyncio）由编译器把协程函数改写为状态机，挂起点只能在被声明为协程的函数体内（普通子函数不能挂起），栈开销近乎为零；代价是「协程传染」——一旦某层异步，调用链上层全得改成 async。选型：Go 生态选有栈最省心；C++ 极致性能选无栈。",
    tags: ["有栈协程", "无栈协程", "协程传染"],
  },
  {
    id: "gsa-coroutine-model-3",
    chapter: "gsa-coroutine-model",
    level: 3,
    question: "「用了协程就不用管线程安全了」这个说法错在哪里？",
    answer:
      "协程只是「让出/恢复」的调度单元，它跑在事件循环线程上。如果多个协程共享同一份可变状态（如全局排行榜），且某个协程在 await 之前读了、await 之后写——另一个协程可能在这个间隙插入并改了状态，照样产生竞态。协程解决的「线程安全」仅限于「同一协程内的代码不会被并发打断」；跨协程共享状态仍需锁或 Actor 隔离。记住：协程消除了抢占式中断，但没消除协作式并发下的逻辑竞态。共享可变状态依然要加锁或用 Actor 隔离。",
    tags: ["协程", "线程安全", "竞态"],
  },
  {
    id: "gsa-coroutine-model-4",
    chapter: "gsa-coroutine-model",
    level: 4,
    question: "协程化的事件循环被长计算卡住怎么办？如何避免？",
    answer:
      "事件循环是单线程串行处理就绪事件的，若某个协程执行长计算（如复杂 AI 寻路、大数据排序）不主动让出，整个事件循环被阻塞，其他协程全部饿死——表现为所有玩家卡顿。避免方法：①把重计算丢到独立线程池，协程通过 await 等线程池结果，事件循环继续跑其他协程；②长任务分片——把 100ms 的计算拆成 10 个 10ms 的片段，每片后 co_await yield() 让出一次，给其他协程机会；③用工作窃取线程池跑多事件循环，CPU 密集与 I/O 密集分离。原则：协程内只做 I/O 与轻计算，重计算进线程池。",
    tags: ["协程", "事件循环", "线程池"],
  },
];
