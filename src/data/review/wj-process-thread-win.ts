import type { ReviewQuestion } from "./types";

export const wjProcessThreadWinQuestions: ReviewQuestion[] = [
  {
    id: "wj-process-thread-win-1",
    chapter: "wj-process-thread-win",
    level: 2,
    question: "Windows 中进程和线程的关系是什么？各自包含哪些核心资源？",
    answer:
      "进程是资源容器，线程是 CPU 调度实体。一个进程至少有一个主线程，可以有多个线程共享进程资源。进程包含：虚拟地址空间（32 位 0~4GB，64 位 0~128TB）、`EPROCESS`（内核进程对象）、PEB（进程环境块，含加载模块链表、堆信息）、句柄表（该进程所有内核对象句柄）、安全令牌（访问权限上下文）、优先级类。线程包含：`ETHREAD`（内核线程对象）、TEB/TIB（线程环境块，含异常链表、TLS 槽）、用户态栈（默认 1MB）、内核态栈（12~24KB）、寄存器现场 `CONTEXT`（CPU 寄存器快照）、线程优先级（0~31）。进程提供隔离（独立地址空间），线程提供并发（多核并行执行）。`CreateProcess` 创建进程+主线程，`CreateThread` 在已有进程中创建额外线程。",
    tags: ["进程", "线程", "核心概念"],
  },
  {
    id: "wj-process-thread-win-2",
    chapter: "wj-process-thread-win",
    level: 2,
    question: "CreateProcess 的两步语义（CreateProcess + CreateThread）是什么含义？",
    answer:
      "`CreateProcess` 实际执行两步：①创建进程——分配 `EPROCESS`、映射 EXE 文件到地址空间、初始化 PEB 和句柄表、分配主线程的栈和 `ETHREAD`；②创建主线程——主线程被挂起（`CREATE_SUSPENDED` 标志时）或就绪。`lpProcessInformation` 返回四个值：`hProcess`（进程句柄）、`hThread`（主线程句柄）、`dwProcessId`（进程 PID）、`dwThreadId`（主线程 TID）。两步语义的意义：①允许父进程在子进程主线程执行前修改其环境（如用 `CREATE_SUSPENDED` 挂起后注入 DLL 或修改内存，再 `ResumeThread` 恢复）；②进程和线程句柄独立，可分别等待/操作。`WaitForSingleObject(hProcess, INFINITE)` 等待子进程退出，`GetExitCodeProcess` 获取退出码。用完必须 `CloseHandle` 关闭两个句柄（不关闭不终止进程，但泄漏句柄表项）。",
    tags: ["CreateProcess", "进程创建"],
  },
  {
    id: "wj-process-thread-win-3",
    chapter: "wj-process-thread-win",
    level: 3,
    question: "Mutex、Semaphore、Event 和 Critical Section 四种同步对象的区别是什么？",
    answer:
      "四种同步对象对比：①互斥量（Mutex）——跨进程使用（可命名），有拥有者概念（只有获取它的线程能释放），可递归（同线程多次获取计数+1），对应 `CreateMutex`/`ReleaseMutex`，是内核对象（等待时进入内核态）。②信号量（Semaphore）——计数器机制，允许多个线程同时获取（资源池），`CreateSemaphore(initial, max)` 设初始值和最大值，`WaitForSingleObject` 计数-1，`ReleaseSemaphore` 计数+1，内核对象，可跨进程。③事件（Event）——通知机制，分手动重置（`ResetEvent` 手动复位，可唤醒所有等待线程）和自动重置（唤醒一个线程后自动复位），`CreateEvent`/`SetEvent`/`ResetEvent`，内核对象，可跨进程。④临界区（CRITICAL_SECTION）——进程内使用（不可跨进程），轻量级：先用户态自旋（`SpinCount`）一定次数，未获取才进入内核态等待，对应 `InitializeCriticalSection`/`EnterCriticalSection`/`LeaveCriticalSection`，不是内核对象。选择原则：进程内同步优先用临界区（性能最好），跨进程或需要超时用 Mutex/Semaphore/Event。",
    tags: ["同步", "内核对象", "并发"],
  },
  {
    id: "wj-process-thread-win-4",
    chapter: "wj-process-thread-win",
    level: 3,
    question: "WaitForSingleObject 和 WaitForMultipleObjects 的作用是什么？内核对象的有信号/无信号状态如何决定等待结果？",
    answer:
      "`WaitForSingleObject(hHandle, dwMilliseconds)` 等待单个内核对象变为有信号状态（或超时）。`WaitForMultipleObjects(nCount, lpHandles, bWaitAll, dwMilliseconds)` 等待多个对象——`bWaitAll=TRUE` 等待全部有信号，`FALSE` 等待任意一个有信号。不同内核对象的有信号状态：①进程/线程——运行时无信号，退出时变为有信号（常用于等待子进程结束）；②Mutex——被拥有时无信号，释放时有信号；③Semaphore——计数大于 0 时有信号，`Wait` 使计数-1（减到 0 变无信号）；④Event——`SetEvent` 使其有信号，`ResetEvent` 使其无信号；⑤文件/文件 I/O 完成端口——I/O 完成时有信号。`dwMilliseconds=INFINITE` 无限等待。返回值 `WAIT_OBJECT_0`（成功）、`WAIT_TIMEOUT`（超时）、`WAIT_FAILED`（错误）。`MsgWaitForMultipleObjects` 额外可以等待消息到达，用于在 UI 线程中同时等待内核对象和消息。",
    tags: ["等待函数", "同步", "内核对象"],
  },
];
