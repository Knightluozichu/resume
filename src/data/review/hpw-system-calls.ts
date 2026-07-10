import type { ReviewQuestion } from "./types";

export const hpwSystemCallsQuestions: ReviewQuestion[] = [
  {
    id: "hpw-system-calls-1",
    chapter: "hpw-system-calls",
    level: 2,
    question: `为什么要有用户态和内核态的划分？系统调用在其中起什么作用？`,
    answer:
      `用户态和内核态是 CPU 硬件提供的保护机制：内核跑在 ring 0 高特权，普通程序跑在 ring 3 低特权，用户态不能直接执行特权指令（读写 I/O、改页表、关中断）也不能访问内核内存——硬件会拦截触发异常。这保证了一个程序崩溃或作恶不会搞垮整个系统。系统调用的作用是二者之间唯一的受控通道：程序需要做特权操作（读写文件、网络、创建进程）时，通过系统调用陷入内核态、由内核代为执行、再返回用户态。没有系统调用，用户程序就无法合法地碰任何硬件资源。`,
    tags: ["用户态", "内核态"],
  },
  {
    id: "hpw-system-calls-2",
    chapter: "hpw-system-calls",
    level: 3,
    question: `系统调用的执行流程是什么？为什么 printf 要带缓冲？`,
    answer:
      `系统调用执行流程：①用户程序把系统调用号和参数放进寄存器；②执行 syscall/int 0x80 指令陷入内核；③CPU 硬件切换到内核态，跳到内核系统调用入口；④内核查调用号找到处理函数，检查参数后执行特权操作；⑤把返回值放进寄存器，切换回用户态。printf 带缓冲是因为系统调用有固定的上下文切换开销，写 1 字节和写 4096 字节成本差不多。printf 先把数据攒在用户态缓冲区，攒满或遇换行/fflush 才一次 write 系统调用，把「写 1000 字符」从 1000 次系统调用降到 1 次。代价是程序崩溃时未 fflush 的输出会丢失。`,
    tags: ["系统调用", "缓冲"],
  },
  {
    id: "hpw-system-calls-3",
    chapter: "hpw-system-calls",
    level: 3,
    question: `库函数和系统调用是一回事吗？它们有什么区别和联系？`,
    answer:
      `不是一回事。库函数（如 printf/malloc/fopen）多数是对系统调用的封装，但二者层次不同：库函数在用户态执行，可带缓冲/重试/格式化；系统调用是陷入内核的特权操作。区别：①有些库函数不对应系统调用（如 strcpy/strlen 是纯内存操作，不陷入内核）；②有些系统调用没有直接对应的库函数（如 mmap 要直接调或薄封装）；③系统调用有上下文切换开销，库函数纯用户态部分没有。所以 strlen 极快（不陷入内核），write 慢得多。性能优化要点之一就是减少系统调用次数——用缓冲、批量、mmap 替代频繁的小系统调用。`,
    tags: ["库函数", "系统调用"],
  },
  {
    id: "hpw-system-calls-4",
    chapter: "hpw-system-calls",
    level: 4,
    question: `fork 和 exec 各做什么？为什么启动新程序通常用 fork+exec 组合？mmap 相比 read/write 有什么优势？`,
    answer:
      `fork 创建当前进程的副本（子进程）；exec 把当前进程的代码段替换成新程序（不创建新进程，只是换内容）。启动新程序用 fork+exec 组合：先 fork 出子进程，再在子进程里 exec 加载新程序——这样可以在 fork 后、exec 前在子进程里做准备工作（重定向文件描述符、设置环境变量、改权限），再 exec 成新程序。这种分离让「创建进程」和「加载程序」解耦，shell 的管道、重定向都依赖它。mmap 把文件映射进内存，读写文件像读写内存一样，相比 read/write 少一次内核↔用户空间的数据拷贝（数据在内核页缓存里直接被用户映射访问），对大文件随机访问性能更好。`,
    tags: ["fork", "exec", "mmap"],
  },
];
