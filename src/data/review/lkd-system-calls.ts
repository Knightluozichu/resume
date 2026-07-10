import type { ReviewQuestion } from "./types";

export const lkdSystemCallsQuestions: ReviewQuestion[] = [
  {
    id: "lkd-syscall-1",
    chapter: "lkd-system-calls",
    level: 2,
    question: `系统调用与普通函数调用的根本区别是什么？`,
    answer:
      `根本区别在于特权级切换和上下文保存。普通函数调用在同一特权级（用户态）内执行，通过 call 指令跳转，只用栈保存返回地址和寄存器。系统调用必须从用户态（Ring 3）切换到内核态（Ring 0）：①通过专门的 syscall 指令（x86-64）触发，CPU硬件执行特权级切换；②切换栈——从用户栈切换到内核栈，防止用户态栈被篡改；③保存完整上下文——用户态的寄存器、指令指针、栈指针都要保存到内核栈上的 pt_struct；④通过系统调用号查找 sys_call_table 找到对应的内核函数；⑤内核函数执行完后通过 sysret/iret 返回用户态，恢复上下文。系统调用是用户程序进入内核的唯一合法入口。`,
    tags: ["系统调用", "特权级"],
  },
  {
    id: "lkd-syscall-2",
    chapter: "lkd-system-calls",
    level: 2,
    question: `系统调用的完整执行流程是怎样的？从用户调用到内核返回。`,
    answer:
      `①用户程序调用 libc 包装函数（如 read()）；②libc 将系统调用号放入寄存器（rax），参数放入 rdi/rsi/rdx/r10/r8/r9；③执行 syscall 指令——CPU切换到内核态，跳转到 entry_SYSCALL_64 入口；④内核保存用户态上下文到内核栈（pt_regs结构）；⑤从 rax 取系统调用号，查 sys_call_table 数组找到 sys_read 函数指针；⑥校验参数（特别是用户空间指针的合法性和可访问性，如 access_ok / copy_from_user）；⑦执行 sys_read 核心逻辑；⑧将返回值放入 rax；⑨执行 sysret 指令返回用户态，恢复上下文；⑩libc 包装函数从 rax 取返回值返回给用户程序。`,
    tags: ["系统调用", "执行流程"],
  },
  {
    id: "lkd-syscall-3",
    chapter: "lkd-system-calls",
    level: 3,
    question: `内核如何安全地访问用户空间传来的指针？为什么不能直接解引用？`,
    answer:
      `内核不能直接解引用用户态指针，原因：①指针可能指向未映射的地址——导致内核缺页崩溃（kernel panic），而用户程序缺页只导致SIGSEGV；②指针可能来自恶意程序——故意传内核地址，让内核读写自己的数据（安全漏洞）；③页表隔离——用户态地址空间和内核态地址空间不同，在使能SMAP/SMEP后内核直接访问用户内存会触发异常。安全做法：①access_ok()——初步校验指针是否在用户地址范围内（不保证指向有效页）；②copy_from_user() / copy_to_user()——安全地复制数据，内部处理缺页（在异常表中注册修复入口，缺页时跳到修复代码返回错误而非panic）；③使能SMAP（Supervisor Mode Access Prevention）后，copy_from_user 内部会临时用 stac 指令开启用户内存访问权限，完成后用 clac 关闭。`,
    tags: ["系统调用", "安全性"],
  },
  {
    id: "lkd-syscall-4",
    chapter: "lkd-system-calls",
    level: 4,
    question: `系统调用是同步的，但如果内核函数需要等待I/O完成，会发生什么？整个流程如何衔接？`,
    answer:
      `系统调用虽然从用户视角是同步的（调用后阻塞直到返回），但内核内部可以将当前进程置于睡眠状态，让出CPU给其他进程，I/O完成后再唤醒。流程：①sys_read 发现数据不在Page Cache，需要从磁盘读取；②调用 submit_bio 提交I/O请求到块设备队列；③调用 wait_event / io_schedule() 将当前进程状态设为 TASK_INTERRUPTIBLE，加入等待队列，调用 schedule() 让出CPU；④其他进程运行；⑤磁盘DMA完成后触发硬中断，中断处理程序标记I/O完成，唤醒等待队列上的进程；⑥被唤醒的进程回到 TASK_RUNNING，被调度器选中后继续执行 sys_read 的剩余逻辑（copy_to_user 返回数据）；⑦系统调用返回用户态。用户程序感知的是「调用阻塞了一段时间」，内核内部经历了「提交I/O→睡眠→被唤醒→继续」的异步过程。`,
    tags: ["系统调用", "阻塞I/O"],
  },
];
