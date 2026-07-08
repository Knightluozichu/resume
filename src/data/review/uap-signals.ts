import type { ReviewQuestion } from "./types";

export const uapSignalsQuestions: ReviewQuestion[] = [
  {
    id: "uap-sg-1",
    chapter: "uap-signals",
    level: 2,
    question: "信号的三种处理方式是什么？哪些信号不能被忽略或捕获？",
    answer:
      "信号的三种处理方式：①默认动作（SIG_DFL）——每个信号有默认行为，大多数是终止进程（如SIGTERM、SIGINT），有的是忽略（如SIGCHLD默认忽略），有的是核心转储（如SIGSEGV）；②忽略（SIG_IGN）——进程选择忽略该信号，不做任何处理；③捕获（自定义handler）——注册一个函数，信号递送时调用该函数。不能被忽略或捕获的信号：SIGKILL（9）和SIGSTOP（19）。这两个信号总是执行默认动作——SIGKILL终止进程、SIGSTOP暂停进程。设计原因：系统需要一种「强制」手段来终止或暂停失控的进程，如果允许被忽略或捕获，恶意进程可以永远不被杀死。SIGKILL是kill -9的最后一道防线。",
    tags: ["信号处理", "SIGKILL"],
  },
  {
    id: "uap-sg-2",
    chapter: "uap-signals",
    level: 3,
    question: "sigaction比signal函数好在哪里？为什么APUE推荐使用sigaction？",
    answer:
      "sigaction比signal的优势：①行为可预测——signal在不同UNIX实现中行为不一致（有的在handler触发后自动重置为SIG_DFL，有的不重置），sigaction行为由act.sa_flags明确控制；②可设置屏蔽字——sigaction可在handler执行期间额外屏蔽指定信号（sa_mask），signal无法做到；③SA_RESTART——sigaction可指定被信号中断的系统调用自动重启，signal不可控；④可获取旧handler——sigaction的oact参数返回之前的信号处理设置，便于恢复；⑤三参数handler——sigaction的handler可接收siginfo_t结构，包含信号来源PID/UID等详细信息。signal的唯一优势是简单（参数少），但生产代码应始终用sigaction保证可移植性和可靠性。",
    tags: ["sigaction", "signal", "可移植性"],
  },
  {
    id: "uap-sg-3",
    chapter: "uap-signals",
    level: 3,
    question: "什么是「信号屏蔽字」和「未决信号」？信号在什么时机被递送给进程？",
    answer:
      "信号屏蔽字（signal mask）：每个进程维护一个信号屏蔽集（sigset_t），被屏蔽的信号在递送时被阻塞（pending），不会立即递送给进程。但信号不会丢失——它被标记为「未决」（pending），留在pending位图中。\n未决信号：已产生但尚未递送的信号。当一个被屏蔽的信号产生时，它被记录在pending位图中，等待屏蔽解除后递送。\n递送时机：信号在进程从内核态返回用户态之前被检查递送。内核检查pending位图 & ~mask（未决且未屏蔽的信号），如果有就递送。同一种传统信号（1-31）在pending期间多次产生只计一次（不排队），这就是「不可靠信号可能丢失」的原因。sigprocmask用于修改屏蔽字，sigpending用于查询未决信号集。SIGKILL和SIGSTOP不被屏蔽。",
    tags: ["信号屏蔽", "pending", "递送时机"],
  },
  {
    id: "uap-sg-4",
    chapter: "uap-signals",
    level: 4,
    question: "信号处理函数中哪些函数是「异步信号安全」的？为什么不能在信号handler中调用printf或malloc？",
    answer:
      "异步信号安全（async-signal-safe）函数是指可以在信号处理函数中安全调用的函数。APUE列出了约70个安全函数，包括write、_exit、read（部分情况）、waitpid等。不安全的函数包括printf、malloc、free、fopen、大部分stdio函数。\n不能在handler中调用printf/malloc的原因：①printf使用stdio内部缓冲区，有全局状态——如果主程序正在printf时被信号中断，handler中也printf，缓冲区状态不一致导致数据损坏或死锁；②malloc维护堆的链表结构——如果主程序正在malloc（持锁）时被中断，handler中再次malloc会死锁。安全做法：①handler中只调用异步信号安全函数（如write替代printf）；②handler只设置一个volatile sig_atomic_t标志，主程序检查标志后处理（自管道技巧）；③用sigqueue传递数据，主程序用sigwait同步接收。",
    tags: ["异步信号安全", "信号处理", "可重入"],
  },
];
