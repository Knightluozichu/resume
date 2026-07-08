import type { ReviewQuestion } from "./types";

export const uapFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "uap-fr-1",
    chapter: "uap-final-review",
    level: 4,
    question: "从UNIX编程角度，解释「一切皆文件」哲学在socket、管道、普通文件中的统一体现。",
    answer:
      "「一切皆文件」在UNIX中的统一体现：①socket——socket()返回文件描述符，用read/write收发数据，用close关闭连接，与普通文件操作完全一致；②管道——pipe()返回两个fd（读端和写端），用write写入、read读取、close关闭；③普通文件——open打开返回fd，read/write读写、close关闭。统一的文件描述符接口让：①编程模型一致——学一套open/read/write/close就能操作所有资源；②工具可组合——shell管道 `cat file | grep pattern | sort` 把三个程序的stdout/stdin用管道连接；③I/O多路转接通用——select/poll/epoll可以同时监听socket、管道、普通文件、终端等任何fd。这种统一是UNIX设计哲学的核心，也是APUE全书的基石。",
    tags: ["一切皆文件", "文件描述符", "设计哲学"],
  },
  {
    id: "uap-fr-2",
    chapter: "uap-final-review",
    level: 4,
    question: "对比「多进程fork+阻塞I/O」和「单线程epoll+非阻塞I/O」两种服务器模型的优劣。",
    answer:
      "多进程fork+阻塞I/O：优势——①编程模型简单（同步顺序代码）；②进程隔离强（一个崩溃不影响其他）；③利用多核（天然并行）。劣势——①进程创建开销大（fork+exit）；②每连接一个进程，内存和PID消耗大；③进程间通信需IPC（管道/共享内存）；④上下文切换开销大（进程切换比线程切换重）。适用于连接数少、计算密集场景。\n单线程epoll+非阻塞I/O：优势——①单线程管理数万连接（无进程/线程开销）；②O(1)事件通知（epoll只返回就绪fd）；③无锁无同步（单线程无数据竞争）；④内存效率高（一个进程的内存）。劣势——①编程复杂（异步事件驱动、状态机）；②不能利用多核（需多进程+epoll或多线程+epoll）；③长计算阻塞所有连接（需把计算拆分或放线程池）；④调试困难。适用于高并发、I/O密集场景（如Nginx、Redis）。",
    tags: ["服务器模型", "epoll", "多进程", "并发对比"],
  },
  {
    id: "uap-fr-3",
    chapter: "uap-final-review",
    level: 3,
    question: "APUE中哪些机制可以防止「资源泄漏」？分别举例说明。",
    answer:
      "①FD_CLOEXEC/O_CLOEXEC——exec后自动关闭fd，防止fd泄漏给新程序。如open时设O_CLOEXEC，或fork后子进程exec前用fcntl设FD_CLOEXEC。②close-on-exec配合exec——shell重定向时，父进程open文件fork子进程，子进程close不需要的fd端后再exec。③atexit注册清理——注册退出处理函数关闭fd、释放资源，即使程序异常exit也会执行。④SIGCHLD回收僵尸——注册SIGCHLD handler调用waitpid，防止子进程变僵尸泄漏PID。⑤信号处理恢复——sigaction的oact保存旧handler，使用后恢复，防止handler被永久修改。⑥munmap解除映射——mmap使用后必须munmap，防止内存泄漏。⑦pthread_join/pthread_detach——线程结束后必须join或detach，防止线程资源（栈、TCB）泄漏。核心原则：每个获取的资源（fd、内存、线程、锁）都必须有对应的释放路径。",
    tags: ["资源泄漏", "FD_CLOEXEC", "资源管理"],
  },
  {
    id: "uap-fr-4",
    chapter: "uap-final-review",
    level: 4,
    question: "用「一次客户端连接Web服务器的完整请求-响应周期」描述从socket创建到close的全过程，标明涉及的APUE知识点。",
    answer:
      "完整周期：①服务器启动：socket()创建监听fd（第2章文件I/O）→ bind()绑定地址 → listen()开始监听 → epoll_ctl注册监听fd（第9章高级I/O）；②客户端连接：connect()发起连接 → 服务器epoll_wait返回就绪 → accept()返回新连接fd（第2章）；③fork或线程池分配：fork()创建子进程（第5章进程控制）或工作线程pthread_create（第8章线程）→ 互斥锁保护连接池（第8章同步）；④读取请求：read()从连接fd读取HTTP请求（第2章文件I/O）→ 可能遇到EAGAIN（非阻塞I/O，第9章）；⑤处理请求：stat()获取请求文件大小（第3章文件与目录）→ open()打开文件 → readv()散射读取或sendfile()零拷贝发送（第9章高级I/O）；⑥发送响应：write()或writev()发送HTTP响应头和体（第2章+第9章）；⑦信号处理：客户端断连触发SIGPIPE（第6章信号）→ handler中忽略或关闭fd；⑧连接关闭：close()关闭连接fd（第2章）→ 子进程exit()（第4章进程环境）→ 父进程waitpid回收（第5章进程控制）→ SIGCHLD处理（第6章信号）。一次请求，全书十大知识点全部参与。",
    tags: ["Web服务器", "全书串联", "运行时旅程"],
  },
];
