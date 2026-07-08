import type { ReviewQuestion } from "./types";

export const uapProcessEnvQuestions: ReviewQuestion[] = [
  {
    id: "uap-pe-1",
    chapter: "uap-process-env",
    level: 2,
    question: "C程序的内存布局分为哪几个段？各段存储什么内容？",
    answer:
      "C程序内存从高地址到低地址分为：①命令行参数与环境变量——argv和environ存放处；②栈（Stack）——局部变量、函数调用帧、返回地址，向下增长；③堆（Heap）——malloc/calloc/realloc分配的动态内存，向上增长；④未初始化数据段（BSS）——未显式初始化的全局/静态变量，内核自动清零；⑤初始化数据段（Data）——已赋初值的全局/静态变量；⑥正文段（Text）——CPU执行的机器指令，通常只读且可共享（多个进程运行同一程序可共享一份正文段）。栈和堆之间是空闲空间，可动态扩展。size命令可查看各段大小。",
    tags: ["内存布局", "进程环境"],
  },
  {
    id: "uap-pe-2",
    chapter: "uap-process-env",
    level: 3,
    question: "exit、_exit、atexit三者之间的关系是什么？exit的执行流程是怎样的？",
    answer:
      "_exit(status)是系统调用，直接进入内核终止进程，不执行任何清理。exit(status)是C库函数，在调用_exit之前执行清理：①按注册逆序调用atexit注册的退出处理函数（最多32个）；②flush并关闭所有标准I/O流（fclose所有打开的FILE*）；③删除tmpfile创建的临时文件。atexit(func)注册一个在exit时自动调用的函数，用于资源清理（如关闭文件、释放全局资源）。exit的执行流程：调用atexit注册的函数（逆序）→ flush标准I/O缓冲→ 关闭流 → 调用_exit → 内核回收资源（关闭fd、释放内存、向父进程发SIGCHLD）。main函数return等价于调用exit。",
    tags: ["exit", "atexit", "终止流程"],
  },
  {
    id: "uap-pe-3",
    chapter: "uap-process-env",
    level: 3,
    question: "环境变量在进程内存中的存储方式是什么？getenv、setenv、putenv有何区别？",
    answer:
      "环境变量存储在进程内存空间的高地址区域（栈之上），以字符指针数组environ的形式存在，每个元素指向一个「NAME=value」字符串，以NULL结尾。environ是一个全局变量，可通过extern char **environ访问。\ngetenv(name)——查找环境变量，返回指向value的指针（不分配新内存）。\nputenv(string)——将「NAME=value」字符串放入环境表，字符串成为环境的一部分（不拷贝，后续修改string会影响环境变量）。\nsetenv(name, value, overwrite)——设置环境变量，内部拷贝name和value构造新字符串（安全），overwrite为0时不覆盖已有值。\nunsetenv(name)——删除环境变量。区别：setenv更安全（拷贝字符串），putenv更高效但危险（共享字符串内存）。",
    tags: ["环境变量", "environ"],
  },
  {
    id: "uap-pe-4",
    chapter: "uap-process-env",
    level: 4,
    question: "C运行时启动流程是怎样的？从execve到main之间发生了什么？",
    answer:
      "进程启动流程：①execve(path, argv, envp)——内核将ELF文件加载到内存，设置正文段、数据段、BSS段（清零）、分配栈（压入argv和envp），设置入口地址为_start；②_start（C运行时入口）——汇编代码，设置栈指针、清零寄存器、调用__libc_start_main；③__libc_start_main——初始化C运行时：设置environ指针、注册atexit退出处理（包括stdio的flush）、初始化线程局部存储、调用构造函数（如有）；④调用main(argc, argv, envp)——用户代码开始执行；⑤main返回后，__libc_start_main调用exit(main的返回值)，exit执行清理后调用_exit进入内核。关键：main不是程序第一个执行的函数，C运行时在main之前做了大量初始化工作。",
    tags: ["启动流程", "C运行时", "execve"],
  },
];
