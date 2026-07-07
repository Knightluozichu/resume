import type { ReviewQuestion } from "./types";

/** C++ 服务器开发精髓 · 事件驱动复习题 */
export const cseEventDrivenQuestions: ReviewQuestion[] = [
  {
    id: "cse-event-driven-1",
    chapter: "cse-event-driven",
    level: 1,
    question: "Reactor 模式的四个核心角色是什么？各自负责什么？",
    answer:
      "Reactor 模式的四个核心角色：\n\n1. 事件源（Event Source）：网络连接的 fd，产生读/写/错误事件。\n\n2. 多路分离器（Demultiplexer）：就是 epoll。把所有 fd 交给内核，内核发现有事件就通知它。`epoll_wait` 返回就绪的事件列表。\n\n3. 事件分发器（Reactor）：拿到就绪事件列表后，根据 fd 找到对应的 handler，调用 handler 的回调函数。不处理业务，只负责路由。\n\n4. 事件处理器（Handler）：每个连接关联一个 handler，实现 handle_read/handle_write 等方法，执行具体的业务逻辑。\n\n核心数据流：事件源 → epoll_wait → 分发器查找 handler → 调用 handler.handle_event() → 执行业务。",
    tags: ["Reactor", "四角色", "epoll"],
  },
  {
    id: "cse-event-driven-2",
    chapter: "cse-event-driven",
    level: 2,
    question: "Reactor 中 `epoll_event.data.ptr` 存 handler 指针的技巧有什么好处？要注意什么？",
    answer:
      "好处：事件返回时直接拿到 handler 指针，不需要查表（如 unordered_map），O(1) 拿到处理器。\n\n```cpp\n// 注册时把 handler 指针存进去\nstruct epoll_event ev;\nev.events = EPOLLIN;\nev.data.ptr = handler;  // 存指针\nepoll_ctl(epfd, EPOLL_CTL_ADD, fd, &ev);\n\n// 事件返回时直接取\nint n = epoll_wait(epfd, events, MAX, -1);\nfor (int i = 0; i < n; i++) {\n  Handler* h = (Handler*)events[i].data.ptr;  // 直接拿到\n  h->handle_event(events[i].events);\n}\n```\n\n注意：handler 被 delete 后，epoll 里不能再有该 fd 的事件。所以删除 handler 前必须先 `epoll_ctl(EPOLL_CTL_DEL)` 从 epoll 移除 fd，否则 epoll 返回一个指向已释放内存的指针，use-after-free。",
    tags: ["epoll", "data.ptr", "use-after-free"],
  },
  {
    id: "cse-event-driven-3",
    chapter: "cse-event-driven",
    level: 3,
    question: "单线程 Reactor 中 handler 调用了阻塞的数据库查询，导致整个服务器卡住。怎么解决？",
    answer:
      "单线程 Reactor 所有 handler 共享一个线程，一个 handler 阻塞就全部阻塞。解决方案：\n\n1. 线程池：把耗时操作丢给线程池异步执行，结果通过 eventfd 回调到 Reactor 线程。\n```cpp\nvoid Handler::handle_read() {\n  // 读到数据后，把 DB 查询丢给线程池\n  pool_.submit([this, data]() {\n    auto result = db_query(data);  // 在工作线程执行\n    // 把结果通过 eventfd 通知 Reactor 线程\n    notify_reactor(result);\n  });\n  // 立刻返回，不阻塞事件循环\n}\n```\n\n2. 主从 Reactor：主 Reactor 只负责 accept，从 Reactor（多个）负责已建立连接的读写。从 Reactor 可以和线程池结合。\n\n3. 非阻塞 IO + 超时：对 DB 连接也用非阻塞 IO + epoll 管理，不阻塞等待。\n\n最常用的是方案 1（线程池），实现简单且效果显著。",
    tags: ["线程池", "阻塞", "eventfd", "异步"],
  },
  {
    id: "cse-event-driven-4",
    chapter: "cse-event-driven",
    level: 4,
    question: "综合分析：Reactor 模式和 Proactor 模式的区别是什么？为什么 Linux 服务器普遍用 Reactor？",
    answer:
      "Reactor vs Proactor：\n\nReactor（同步事件分发）：\n- epoll 通知「数据就绪可读了」\n- 应用自己调用 read 把数据从内核拷到用户空间\n- 「等待数据」不阻塞，「复制数据」仍由应用同步完成\n\nProactor（异步IO）：\n- 内核完成「等待+复制」全部操作\n- 完成后通知应用「数据已经读好放在你指定的缓冲区了」\n- 应用不需要调用 read\n\nLinux 选 Reactor 的原因：\n1. Linux aio 对网络 socket 支持不完善，主要面向文件 IO\n2. epoll 经过十几年验证，性能稳定，生态成熟（muduo/libevent/libev）\n3. Reactor 编程模型简单清晰，所有 IO 操作在应用层可见，便于调试\n4. 「复制数据」阶段通常很快（内核到用户空间拷贝），阻塞影响有限\n5. io_uring（较新的异步方案）还不够成熟普及\n\nWindows 的 IOCP 是成熟的 Proactor 实现，所以 Windows 服务器常用 Proactor。Linux 上 Reactor 是事实标准。",
    tags: ["综合", "Reactor", "Proactor", "选型"],
  },
];
