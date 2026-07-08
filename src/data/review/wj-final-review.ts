import type { ReviewQuestion } from "./types";

export const wjFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "wj-final-review-1",
    chapter: "wj-final-review",
    level: 3,
    question: "用「一个窗口程序的一生」串联全书九章，描述从 WinMain 到退出的完整旅程。",
    answer:
      "一个窗口程序的一生：①`WinMain` 入口（第2章 Win32 API）——`GetModuleHandle` 获取 `hInstance`，`WSAStartup` 初始化网络（第9章）；②注册窗口类（第4章 窗口管理）——填充 `WNDCLASSEX`（`lpfnWndProc` 指向自定义窗口过程），`RegisterClassEx` 注册；③创建窗口（第4章）——`CreateWindowEx` 创建实例，`ShowWindow`+`UpdateWindow` 显示并触发首次 `WM_PAINT`；④消息循环（第3章 消息循环）——`GetMessage`→`TranslateMessage`→`DispatchMessage` 循环，消息分发到 `WindowProc`；⑤GDI 绘制（第5章 GDI 渲染）——`WM_PAINT` 中 `BeginPaint` 获取 DC，`SelectObject` 选入画笔/画刷，`TextOut`/`Rectangle` 绘制，`EndPaint` 释放；⑥读取配置（第6章 注册表与服务）——`RegOpenKey`/`RegQueryValue` 从注册表读取配置，`CreateThread` 后台线程处理（第7章 进程与线程）；⑦文件 I/O（第8章）——`CreateFile` 打开数据文件，`ReadFile` 异步读取（`OVERLAPPED`），完成后 IOCP 通知；⑧网络通信（第9章 网络编程）——`socket`→`connect`→`send`/`recv`，IOCP 高并发处理；⑨退出——`WM_DESTROY`→`PostQuitMessage`→`closesocket`→`WSACleanup`→`DestroyWindow`→进程退出。一次运行，九大机制全部参与。",
    tags: ["全书串联", "运行时旅程"],
  },
  {
    id: "wj-final-review-2",
    chapter: "wj-final-review",
    level: 3,
    question: "Windows 程序的「消息驱动」与「过程式调用」编程范式的本质区别是什么？",
    answer:
      "过程式调用（如控制台程序）：程序主动调用系统函数，控制流是线性的——`main` → 调用函数 A → 调用函数 B → 返回 → 结束，程序「驱动」系统。消息驱动（如 Windows GUI 程序）：程序被动响应系统发来的消息，控制流是事件驱动的——程序初始化后进入消息循环等待，系统在事件发生时（用户点击、窗口需要重绘、定时器到期）发送消息，程序的窗口过程被「驱动」执行。本质区别：①控制权——过程式程序控制流程，消息驱动程序由事件控制流程；②结构——过程式是线性序列，消息驱动是「初始化+循环+回调」三段式；③扩展性——消息驱动天然支持异步事件（网络数据到达、后台线程完成），过程式需要多线程或轮询；④并发——消息驱动 UI 线程是单线程的（消息队列串行处理），避免了多线程 UI 的竞态问题。但后台耗时操作仍需多线程，通过 `PostMessage` 将结果通知 UI 线程。",
    tags: ["编程范式", "消息驱动", "架构"],
  },
  {
    id: "wj-final-review-3",
    chapter: "wj-final-review",
    level: 4,
    question: "如果你要设计一个高并发的 Windows 网络服务器，如何组合全书知识进行架构？",
    answer:
      "高并发 Windows 网络服务器架构：①网络层——Winsock + IOCP（第9章）：`CreateIoCompletionPort` 创建完成端口，每个套接字用 `WSARecv`/`WSASend` 异步投递 I/O，完成通知由 IOCP 分发给线程池；②线程模型——线程池（第7章）：创建 N+1 个工作线程（N=CPU 核数），`GetQueuedCompletionStatus` 取完成通知处理；业务逻辑可在工作线程直接处理或投递到任务队列由另一组业务线程处理（分离 I/O 和计算）；③同步——CRITICAL_SECTION（第7章）：保护共享数据结构（连接列表、会话表），进程内用临界区（轻量），跨进程用 Mutex/Event；④配置——注册表（第6章）：服务器端口、线程数、日志路径等配置存注册表，启动时 `RegQueryValue` 读取，支持运行时热更新；⑤日志——文件 I/O（第8章）：异步 `WriteFile` + `OVERLAPPED` 写日志，不阻塞网络线程，或用内存映射文件批量写入；⑥监控——服务（第6章）：以 Windows 服务形式运行（`ServiceMain`+`SCM`），开机自启动，崩溃自动重启。核心：IOCP 最大化 I/O 吞吐，线程池最小化线程切换，异步贯穿全链路。",
    tags: ["架构设计", "高并发", "综合应用"],
  },
  {
    id: "wj-final-review-4",
    chapter: "wj-final-review",
    level: 4,
    question: "Windows 编程中「一切皆 HANDLE」的设计哲学带来了哪些优势和挑战？",
    answer:
      "「一切皆 HANDLE」——文件、进程、线程、窗口、事件、互斥量、套接字、注册表键、设备都是句柄，统一通过 `CloseHandle` 关闭（窗口和套接字除外，用 `DestroyWindow`/`closesocket`）。优势：①统一 API——`WaitForSingleObject` 可等待进程、线程、事件、互斥量、信号量、文件 I/O 完成，一套等待机制覆盖所有同步场景；②统一生命周期——`CloseHandle` 释放资源，引用计数管理（多个句柄可指向同一对象）；③安全统一——所有内核对象在创建时携带安全描述符（`SECURITY_ATTRIBUTES`），权限检查一致；④跨进程共享——命名对象（如 `CreateMutex(NULL, FALSE, L\"Global\\\\MyMutex\")`）可跨进程共享。挑战：①句柄泄漏——忘记 `CloseHandle` 会泄漏内核对象（每进程句柄上限约 1600 万，但 GDI 对象上限约 10000）；②类型安全——`HANDLE` 是 `void*`，编译器无法检查类型错误（传错句柄类型到错误 API）；③异常安全——C++ 异常或提前 `return` 跳过 `CloseHandle`，需 RAII 封装（`std::unique_ptr` 自定义删除器或 `wil::unique_handle`）；④调试困难——句柄值不透明，需用 `GetHandleInformation`/`WaitForSingleObject` 间接推断对象状态。最佳实践：RAII 封装所有句柄。",
    tags: ["设计哲学", "HANDLE", "综合"],
  },
];
