import type { ReviewQuestion } from "./types";

export const uapFileIoQuestions: ReviewQuestion[] = [
  {
    id: "uap-fi-1",
    chapter: "uap-file-io",
    level: 2,
    question: "文件描述符是什么？为什么UNIX用整数来代表打开的文件？",
    answer:
      "文件描述符（fd）是一个非负整数，是进程已打开文件的索引。每个进程维护一个文件描述符表（fd table），fd就是这个表的下标，指向一个file对象。fd 0/1/2默认分配给stdin/stdout/stderr。UNIX用整数代表文件的原因：①简单——int类型的传递和比较最高效；②统一——所有I/O资源（文件、管道、socket、设备）都用fd表示，实现「一切皆文件」；③可继承——fork时子进程继承父进程的fd表，父子共享file对象（共享偏移量）。POSIX保证每次open分配最小可用fd。",
    tags: ["文件描述符", "基础概念"],
  },
  {
    id: "uap-fi-2",
    chapter: "uap-file-io",
    level: 3,
    question: "open、read、write、close四个基本I/O函数各自的作用和返回值是什么？read返回0意味着什么？",
    answer:
      "open(path, flags, mode)——打开或创建文件，返回fd或-1（出错设errno）。flags指定打开方式（O_RDONLY/O_WRONLY/O_RDWR/O_CREAT/O_TRUNC/O_APPEND等）。read(fd, buf, n)——从fd读最多n字节到buf，返回实际读取字节数；返回0表示已到文件末尾（EOF）；返回-1表示出错。write(fd, buf, n)——将buf中n字节写入fd，返回实际写入字节数；可能小于n（如磁盘满或信号中断）。close(fd)——关闭文件描述符，释放资源，返回0或-1。read返回0不是错误，而是「无更多数据可读」的标志，这是循环读取直到EOF的终止条件。",
    tags: ["文件I/O", "系统调用"],
  },
  {
    id: "uap-fi-3",
    chapter: "uap-file-io",
    level: 3,
    question: "文件I/O中「不带缓冲的I/O」是什么意思？它与标准I/O库（printf/fread）有什么区别？",
    answer:
      "APUE第3章的文件I/O（open/read/write/close）是「不带缓冲的I/O」——每个read/write都是一次系统调用，直接进入内核，内核有自己的Buffer Cache但用户空间无额外缓冲。标准I/O库（stdio.h的fopen/fread/fwrite/printf）在用户空间维护缓冲区：写入先到用户缓冲，缓冲满或fflush时才调用write系统调用；读取时一次读大块到用户缓冲，再逐字节/逐行返回。区别：①系统调用次数——标准I/O通过缓冲减少系统调用；②性能——标准I/O通常更快（减少用户态/内核态切换）；③控制——不带缓冲I/O更精确控制I/O时机。标准I/O底层最终调用不带缓冲I/O。",
    tags: ["缓冲机制", "I/O模型"],
  },
  {
    id: "uap-fi-4",
    chapter: "uap-file-io",
    level: 4,
    question: "fork后父子进程共享file对象意味着什么？这种设计有什么实际用途和陷阱？",
    answer:
      "fork后子进程继承父进程的文件描述符表的副本，fd指向同一个file对象——共享文件偏移量（f_pos）和状态标志。实际用途：①shell重定向——父进程open文件后fork子进程，子进程继承fd实现输入/输出重定向；②管道——pipe创建两个fd后fork，父子通过共享的fd通信。陷阱：①偏移量共享——父子进程同时写同一fd会导致数据交错（需要同步）；②引用计数——file对象有f_count引用计数，close只是减1，只有所有引用都关闭才真正释放；③close-on-exec——如果不设FD_CLOEXEC，exec后fd仍然打开可能泄漏给新程序。正确做法：fork后父子各自关闭不需要的fd端（如管道的父子各关一端）。",
    tags: ["fork", "文件共享", "引用计数"],
  },
];
