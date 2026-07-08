import type { ReviewQuestion } from "./types";

export const capExceptionalControlQuestions: ReviewQuestion[] = [
  {
    id: "cap-exceptional-control-1",
    chapter: "cap-exceptional-control",
    level: 2,
    question: "异常的四种类型是什么？分别举例，说明处理后的控制流去向。",
    answer:
      "①中断（interrupt）——异步，来自外部硬件，如定时器中断、网卡中断、键盘中断。处理完返回被中断指令的下一条指令，对程序透明。②陷阱（trap）——同步有意，syscall/int 0x80 指令触发，是系统调用的实现机制。处理完返回下一条指令。③故障（fault）——同步无意但可恢复，如缺页故障（page fault）、除零（某些架构）。若处理程序能修复（如缺页把页调入内存），返回重新执行触发指令；若无法修复（如非法地址）转终止杀进程。④终止（abort）——不可恢复的硬件错误（内存校验错、双重故障），直接杀进程不返回。异常表（IDT）把每个异常号映射到处理程序入口。",
    tags: ["异常", "中断", "控制流"],
  },
  {
    id: "cap-exceptional-control-2",
    chapter: "cap-exceptional-control",
    level: 3,
    question: "解释 fork/exec/wait 三件套的作用，及僵尸进程如何产生、如何避免。",
    answer:
      "fork() 创建子进程：复制父进程地址空间（写时复制），返回值父进程得子 PID、子进程得 0，用返回值区分父子。execve(path, argv, envp) 用新程序替换当前进程映像：代码段/数据段/栈全部重置为新程序内容，PID 不变，从新程序的 main 开始执行。wait(&status) 父进程阻塞等待任一子进程结束，回收其资源，通过 status 获取退出原因。经典模式 fork+exec 启动新程序：fork 出子进程，子进程立刻 exec 载入新程序。僵尸进程（zombie）：子进程已结束（退出码存 PCB）但父进程尚未 wait 回收，此时子进程的 PCB 残留占系统资源。若父进程不 wait 也不退出，僵尸累积可能耗尽进程表。解决：父进程及时 wait、或忽略 SIGCHLD（signal(SIGCHLD, SIG_IGN) 内核自动回收）、或父进程结束让 init 收养回收。",
    tags: ["fork", "exec", "僵尸进程"],
  },
  {
    id: "cap-exceptional-control-3",
    chapter: "cap-exceptional-control",
    level: 3,
    question: "进程的两个关键抽象是什么？上下文切换如何实现这两个抽象？",
    answer:
      "进程的两个关键抽象：①逻辑控制流——每个进程仿佛独占 CPU，程序计数器看起来连续推进；②私有地址空间——每个进程仿佛独占内存，每个进程的地址空间互不可见互不干扰。逻辑控制流通过时间片轮转 + 上下文切换实现：定时器中断触发调度器，保存当前进程的寄存器/PC/栈指针到其 PCB（进程控制块），加载下一个进程的上下文，跳转。切换由定时器中断抢占（抢占式）或进程主动让出（协作式）。私有地址空间通过虚拟内存实现（第 8 章）：每个进程有独立页表，同一虚拟地址在不同进程映射到不同物理页。切换是纯开销（微秒级），所以线程（共享地址空间的轻量进程）比进程便宜。",
    tags: ["进程", "上下文切换", "抽象"],
  },
  {
    id: "cap-exceptional-control-4",
    chapter: "cap-exceptional-control",
    level: 4,
    question: "信号处理函数有哪些陷阱？为什么 `printf` 不能在信号处理函数中调用？",
    answer:
      "信号处理函数三大陷阱：①必须异步信号安全（可重入）——禁用 printf/malloc/fopen 等非可重入库，因为信号可能打断这些函数的执行，处理函数再次调用会破坏其内部状态（如 malloc 的链表）导致死锁或堆损坏。只能用 write（系统调用，可重入）等少数函数。②同类信号默认不排队——多次快速发送同一信号，处理期间新信号被合并，处理函数可能只触发一次，依赖「信号计数」的代码会出错。③处理函数中访问的全局变量须声明 volatile sig_atomic_t——volatile 防止编译器优化到寄存器（信号随时改变内存值），sig_atomic_t 保证读写原子性。正确做法：处理函数只设一个 flag（volatile sig_atomic_t），主循环检查 flag 后再调用非可重入函数处理。这是信号编程的金科玉律。",
    tags: ["信号", "可重入", "异步信号安全"],
  },
];
