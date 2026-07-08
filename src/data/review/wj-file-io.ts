import type { ReviewQuestion } from "./types";

export const wjFileIoQuestions: ReviewQuestion[] = [
  {
    id: "wj-file-io-1",
    chapter: "wj-file-io",
    level: 2,
    question: "CreateFile 函数为什么叫这个名字？它还能打开哪些非文件对象？",
    answer:
      "`CreateFile` 虽名为「创建文件」，但它是 Windows 统一的「打开/创建对象」入口，基于「一切皆 HANDLE」的设计哲学。除了文件，还能打开：①设备（磁盘卷 `\\\\.\\C:`、光驱、串口 `COM1`）；②管道（命名管道 `\\\\.\\pipe\\mypipe`、匿名管道）；③控制台（`CONIN$`/`CONOUT$`）；④邮槽（`\\\\.\\mailslot\\myslot`）；⑤通信资源。参数 `dwCreationDisposition` 决定行为：`CREATE_NEW`（新建，已存在则失败）、`CREATE_ALWAYS`（总是新建，覆盖已有）、`OPEN_EXISTING`（打开，不存在则失败）、`OPEN_ALWAYS`（打开，不存在则新建）、`TRUNCATE_EXISTING`（打开并清空）。`dwDesiredAccess` 指定权限（`GENERIC_READ`/`GENERIC_WRITE`），`dwShareMode` 指定共享模式（读/写/删除共享）。返回 `HANDLE`，用 `CloseHandle` 关闭。这统一了所有 I/O 资源的 API 接口。",
    tags: ["CreateFile", "HANDLE", "统一接口"],
  },
  {
    id: "wj-file-io-2",
    chapter: "wj-file-io",
    level: 2,
    question: "同步 I/O 和异步 I/O（Overlapped）的区别是什么？OVERLAPPED 结构的作用？",
    answer:
      "同步 I/O：`ReadFile`/`WriteFile` 阻塞调用线程直到操作完成才返回——简单直观但效率低，线程在等待 I/O 期间无法做其他事。异步 I/O（Overlapped）：传入 `OVERLAPPED` 结构并使用 `FILE_FLAG_OVERLAPPED` 标志打开文件，函数立即返回（操作在后台进行），线程可继续执行——高并发场景必备。`OVERLAPPED` 结构包含：`Offset`/`OffsetHigh`（文件操作的起始位置，因为异步 I/O 不使用文件指针）、`hEvent`（完成通知的事件对象）。异步完成通知方式：①轮询 `GetOverlappedResult`；②等待 `OVERLAPPED.hEvent` 事件对象；③APC 回调（`ReadFileEx`/`WriteFileEx` + `SleepEx`/`WaitForSingleObjectEx` 进入 alertable 状态）；④完成端口 IOCP（最高效）。异步 I/O 的核心优势：少量线程管理海量并发 I/O 请求，线程不阻塞在单个 I/O 上。",
    tags: ["异步I/O", "OVERLAPPED", "性能"],
  },
  {
    id: "wj-file-io-3",
    chapter: "wj-file-io",
    level: 3,
    question: "什么是完成端口（IOCP）？为什么它是 Windows 高并发服务器的核心模型？",
    answer:
      "I/O 完成端口（IOCP）是 Windows 的高性能异步 I/O 模型。核心思想：创建一个完成端口对象，将多个文件句柄（或套接字）关联到该端口；I/O 操作完成后，完成通知被投递到端口的完成队列；一组工作线程通过 `GetQueuedCompletionStatus` 从队列取完成通知并处理。`CreateIoCompletionPort` 既创建端口也关联句柄。为什么高效：①线程不阻塞在 I/O 上——一个线程可以发起数百个异步 I/O，完成后统一处理；②线程池自动负载均衡——内核将完成通知分发给空闲线程，避免线程争抢；③并发度控制——`NumberOfConcurrentThreads` 参数限制同时运行的线程数，超过时线程阻塞在 `GetQueuedCompletionStatus`，防止线程过多导致调度开销。典型模式：创建 N+1 个工作线程（N=CPU 核数），每个线程循环调用 `GetQueuedCompletionStatus` 取任务处理。IOCP 是 Windows 网络服务器（如 IIS、高性能游戏服务器）的标配。",
    tags: ["IOCP", "完成端口", "高并发", "性能"],
  },
  {
    id: "wj-file-io-4",
    chapter: "wj-file-io",
    level: 3,
    question: "内存映射文件（Memory-Mapped File）的原理是什么？与普通 ReadFile/WriteFile 有何不同？",
    answer:
      "内存映射文件将文件直接映射到进程的虚拟地址空间，之后通过指针访问内存即等于读写文件，无需 `ReadFile`/`WriteFile`。实现步骤：①`CreateFile` 打开文件；②`CreateFileMapping(hFile, ...)` 创建文件映射对象；③`MapViewOfFile(hMapping, ...)` 映射到进程地址空间，返回起始指针；④通过指针读写数据（内核负责按需分页加载/写回）；⑤`UnmapViewOfFile` 取消映射；⑥`CloseHandle` 关闭映射对象和文件句柄。与普通 I/O 的区别：①性能——内核直接管理页面缓存，避免 `ReadFile`/`WriteFile` 的用户态↔内核态数据拷贝（零拷贝）；②访问方式——指针随机访问，无需 `SetFilePointer`；③分页加载——只有实际访问的页面才从磁盘加载（按需分页），大文件高效处理；④进程间共享——多个进程映射同一文件可实现共享内存（最快 IPC 方式）。常用于大文件处理、数据库引擎、进程间共享数据。",
    tags: ["内存映射", "性能", "共享内存"],
  },
];
