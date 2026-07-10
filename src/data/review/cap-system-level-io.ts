import type { ReviewQuestion } from "./types";

export const capSystemLevelIoQuestions: ReviewQuestion[] = [
  {
    id: "cap-system-level-io-1",
    chapter: "cap-system-level-io",
    level: 2,
    question: `什么是文件描述符？fd 0/1/2 分别是什么？fork 后子进程的 fd 表如何？`,
    answer:
      `文件描述符（fd）是进程打开文件的整数句柄，是 Unix「一切皆文件」抽象的核心。每个进程在 PCB 里有独立 fd 表，open 返回最小可用整数作为 fd。fd 0/1/2 是进程启动时默认打开的：0=stdin（标准输入）、1=stdout（标准输出）、2=stderr（标准错误）。fd 表项指向系统级打开文件表（含文件偏移量、状态标志如 O_APPEND/O_NONBLOCK），后者指向 inode 表（磁盘文件元数据）。fork 时子进程继承父进程 fd 表的副本——fd 表是独立的，但每项指向同一系统级打开文件表项，所以父子共享同一文件偏移量，父读 100 字节后子接着读会从 100 开始。这就是 shell 实现重定向和管道的基础。`,
    tags: ["文件描述符", "fd"],
  },
  {
    id: "cap-system-level-io-2",
    chapter: "cap-system-level-io",
    level: 3,
    question: `read/write 为什么可能「短读短写」？如何正确处理？`,
    answer:
      `read(fd, buf, n) 返回值可能小于请求的 n：①读到 EOF 中途返回（如读终端、管道）；②被信号中断返回已读部分；③读设备/管道时数据不足。read 返回 0 表示 EOF，返回 -1 表示错误（查 errno，EINTR 需重试）。write(fd, buf, n) 返回值可能小于 n：①磁盘满；②被信号中断；③写管道时缓冲区满。短读短写是 I/O 编程最常见的 bug 源——直接用 read 返回的字节当全部会导致数据截断。正确做法：用循环包裹直到累计处理完所有字节（\`while (left > 0) { n = read(fd, buf+off, left); if (n==0) break; if (n<0 && errno==EINTR) continue; if (n<0) error; off+=n; left-=n; }\`）。标准库 fread/fwrite 已封装此逻辑。`,
    tags: ["短读短写", "系统调用"],
  },
  {
    id: "cap-system-level-io-3",
    chapter: "cap-system-level-io",
    level: 3,
    question: `I/O 的三层缓冲是什么？为什么 \`write\` 返回后数据不一定在磁盘上？`,
    answer:
      `三层缓冲：①用户态缓冲——printf/fread/fwrite（C 标准库）先写到 FILE 的用户缓冲区，满了或换行（行缓冲）或 fflush 时才调 write。②内核缓冲——write 写到内核 page cache，不立即落盘，由内核 pdflush 线程异步刷盘（通常延迟 30 秒）或 fsync 强制。③设备缓冲——磁盘控制器自己的缓存。所以 printf(\"hi\") 不带 \\n 时数据在用户缓冲区，write 之后数据在内核缓冲区，都还没到屏幕/磁盘。write 返回只保证数据到了内核 page cache，断电会丢数据。要保证持久化必须 fsync(fd) 等待数据真正落盘。这就是数据库为什么要 fsync 日志、为什么 O_DIRECT 绕过 page cache、为什么 Redis AOF 有 appendfsync always/everysec/no 三档权衡。fflush 只把用户缓冲刷到内核（调 write），不等落盘——fflush 后 fsync 才是「真正持久化」。`,
    tags: ["缓冲", "fsync", "持久化"],
  },
  {
    id: "cap-system-level-io-4",
    chapter: "cap-system-level-io",
    level: 4,
    question: `解释 shell 重定向 \`>\` 和管道 \`|\` 的底层实现原理，及管道死锁如何产生。`,
    answer:
      `重定向 \`cmd > file\`：shell fork 子进程后，在子进程里 close(1) 关闭 stdout，再 open(file, O_WRONLY|O_CREAT|O_TRUNC)——按「最小可用 fd」原则新 fd 复用刚释放的 1，于是该进程的 stdout 指向文件。更通用的 dup2(oldfd, newfd) 把 newfd 指向 oldfd 同一打开文件表项。管道 \`cmd1 | cmd2\`：shell 先 pipe(fds) 创建管道（fds[0] 读端 fds[1] 写端，内核环形缓冲区），然后 fork 两个子进程：左子进程 close(fds[0]); dup2(fds[1], 1); close(fds[1]) 把 stdout 接管道写端，右子进程 close(fds[1]); dup2(fds[0], 0); close(fds[0]) 把 stdin 接读端，于是左进程输出自动流入右进程输入。死锁产生：若两端都不 close 不用的端，左进程写满管道缓冲（默认 64KB）阻塞，右进程不读也阻塞，互相等待死锁。更隐蔽的是：右进程持有写端引用，左进程退出后右进程的 read 不会返回 EOF（因为还有写端开着），导致右进程挂起。所以必须每端都关闭不用的方向。`,
    tags: ["重定向", "管道", "dup2"],
  },
];
