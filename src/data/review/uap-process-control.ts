import type { ReviewQuestion } from "./types";

export const uapProcessControlQuestions: ReviewQuestion[] = [
  {
    id: "uap-pc-1",
    chapter: "uap-process-control",
    level: 2,
    question: "fork函数的返回值含义是什么？为什么fork后父子进程的执行顺序不确定？",
    answer:
      "fork返回值：①父进程中返回子进程的PID（正整数）——因为父进程可能有多个子进程，需要PID来标识；②子进程中返回0——子进程可以通过getpid()知道自己的PID，通过getppid()知道父进程PID，不需要fork额外返回信息；③出错返回-1——如达到进程数上限。fork后父子进程执行顺序不确定：这是UNIX调度器的决定——fork创建子进程后，哪个进程先被调度运行是不确定的（取决于调度策略、CPU负载等因素）。这种不确定性称为竞态条件（race condition）。编程时不能假设父进程先执行或子进程先执行，需要用同步机制（如信号、管道、信号量）来保证执行顺序。",
    tags: ["fork", "竞态条件"],
  },
  {
    id: "uap-pc-2",
    chapter: "uap-process-control",
    level: 3,
    question: "fork和exec配合使用的典型模式是什么？为什么exec后PID不变但程序完全改变？",
    answer:
      "fork+exec典型模式（shell执行命令）：①shell调用fork创建子进程；②子进程调用exec加载新程序（如ls）；③子进程从新程序的第一条指令开始执行；④父进程（shell）调用waitpid等待子进程结束。\nexec后PID不变的原因：exec只替换进程的代码段、数据段、堆、栈（用户空间全部替换），但进程的PCB（task_struct）、PID、打开的文件描述符、当前工作目录、信号处理设置等内核态信息大部分保留。因为PID是内核维护的进程标识，exec不创建新进程只是「换了一身衣服」。注意：exec后默认保留打开的fd，除非设置了FD_CLOEXEC标志（close-on-exec），这会导致fd泄漏给新程序。现代编程中建议在open时用O_CLOEXEC标志。",
    tags: ["fork", "exec", "进程替换"],
  },
  {
    id: "uap-pc-3",
    chapter: "uap-process-control",
    level: 3,
    question: "僵尸进程是什么？为什么会产生？如何避免？",
    answer:
      "僵尸进程（Zombie）：子进程已exit终止，但父进程尚未调用wait/waitpid回收其退出状态，此时子进程的task_struct仍保留在内核中（占PID和少量内存），状态为EXIT_ZOMBIE。产生原因：子进程exit后内核不会完全销毁task_struct，需要保留退出状态供父进程查询。如果父进程不调用wait，僵尸进程会一直存在。避免方法：①父进程调用wait/waitpid主动回收；②父进程注册SIGCHLD信号处理函数，在handler中调用waitpid（WNOHANG非阻塞循环回收）；③忽略SIGCHLD——signal(SIGCHLD, SIG_IGN)，内核自动回收不产生僵尸；④父进程先于子进程退出——子进程被init（PID 1）收养，init自动回收。大量僵尸进程会耗尽PID资源。",
    tags: ["僵尸进程", "wait", "SIGCHLD"],
  },
  {
    id: "uap-pc-4",
    chapter: "uap-process-control",
    level: 4,
    question: "waitpid的options参数WNOHANG有什么作用？如何用它实现非阻塞的子进程回收？",
    answer:
      "WNOHANG选项使waitpid非阻塞：如果没有子进程已终止，立即返回0（而不是阻塞等待）；如果有已终止的子进程，返回该子进程PID。用法：在循环中调用waitpid(-1, &status, WNOHANG)：返回值>0表示回收了一个子进程；返回0表示没有子进程已终止（继续做其他事）；返回-1且errno==ECHILD表示没有子进程了。典型场景：①SIGCHLD信号处理函数中用WNOHANG循环回收（因为信号可能丢失，一次handler要回收所有已终止的子进程）；②主循环中定期检查子进程状态而不阻塞。为什么handler中要循环：多个子进程同时终止时只产生一个SIGCHLD，必须循环waitpid直到返回0，否则会遗漏僵尸进程。完整模式：while ((pid = waitpid(-1, &status, WNOHANG)) > 0) { /* 处理 */ }。",
    tags: ["waitpid", "WNOHANG", "非阻塞"],
  },
];
