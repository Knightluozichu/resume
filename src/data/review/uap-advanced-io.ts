import type { ReviewQuestion } from "./types";

export const uapAdvancedIoQuestions: ReviewQuestion[] = [
  {
    id: "uap-aio-1",
    chapter: "uap-advanced-io",
    level: 2,
    question: "阻塞I/O和非阻塞I/O的区别是什么？非阻塞I/O单独使用有什么问题？",
    answer:
      "阻塞I/O：调用read/write时如果数据未就绪，进程挂起睡眠直到数据就绪或出错。默认情况下文件描述符都是阻塞模式。简单直观但一个fd阻塞整个进程无法处理其他fd。\n非阻塞I/O：设置O_NONBLOCK标志后，read/write如果数据未就绪立即返回EAGAIN/EWOULDBLOCK错误（不阻塞）。进程可以继续做其他事。\n非阻塞I/O单独使用的问题：如果需要等待多个fd就绪，只能用轮询（while循环不断read每个fd检查EAGAIN），这会100%占用CPU做无用功。解决方案是I/O多路转接（select/poll/epoll）——让内核代替进程轮询，只在有fd就绪时唤醒进程。非阻塞I/O是多路转接的基础配合——epoll的ET模式要求fd必须设为非阻塞（因为ET只通知一次，必须一次读完直到EAGAIN）。",
    tags: ["阻塞I/O", "非阻塞I/O", "O_NONBLOCK"],
  },
  {
    id: "uap-aio-2",
    chapter: "uap-advanced-io",
    level: 3,
    question: "select、poll、epoll三者的核心区别是什么？为什么epoll性能最优？",
    answer:
      "select：①用fd_set位图管理fd，有FD_SETSIZE限制（通常1024）；②每次调用需重建fd_set并全部拷贝到内核；③返回后需O(n)遍历所有fd检查FD_ISSET；④跨平台性好。\npoll：①用pollfd数组管理fd，无数量限制；②每次调用仍需拷贝全部结构到内核；③返回后仍需O(n)遍历检查revents；④无fd_set位图操作。\nepoll（Linux特有）：①epoll_create创建实例，epoll_ctl注册/删除fd（内核维护红黑树+就绪链表）；②epoll_wait只返回就绪的fd，无需遍历全部；③O(1)就绪检查——内核只把就绪fd拷贝到用户空间；④fd注册一次即可，不需要每次重新注册。epoll性能最优的核心：内核维护就绪链表，epoll_wait直接取就绪fd，不扫描全部fd。当fd数量大但活跃fd少时（如万连接百活跃），epoll优势极大。",
    tags: ["select", "poll", "epoll", "多路转接"],
  },
  {
    id: "uap-aio-3",
    chapter: "uap-advanced-io",
    level: 3,
    question: "epoll的LT（水平触发）和ET（边缘触发）有什么区别？ET模式为什么要求fd必须非阻塞？",
    answer:
      "LT（Level Triggered，水平触发，默认）：只要fd有数据可读（缓冲区非空），每次epoll_wait都会通知。即使上次没读完，下次wait仍会通知。编程简单——可以不一次读完，下次继续读。\nET（Edge Triggered，边缘触发，EPOLLET）：只在状态变化时通知一次（从无数据变为有数据），之后即使缓冲区还有数据也不再通知，直到下次有新数据到达。效率更高——减少epoll_wait的唤醒次数。\nET要求fd非阻塞的原因：ET只通知一次，必须一次性读完所有数据（循环read直到返回EAGAIN），否则剩余数据永远不会被通知。如果是阻塞fd，最后一次read（缓冲区已空）会阻塞整个线程，导致无法处理其他fd。非阻塞fd在缓冲区空时read返回EAGAIN，循环正常退出。ET模式的标准读法：while ((n = read(fd, buf, sizeof(buf))) > 0) { 处理 } /* n==-1且errno==EAGAIN表示读完 */。",
    tags: ["epoll", "LT", "ET", "边缘触发"],
  },
  {
    id: "uap-aio-4",
    chapter: "uap-advanced-io",
    level: 4,
    question: "readv/writev（散射/聚集I/O）和sendfile（零拷贝）分别解决了什么问题？",
    answer:
      "readv/writev解决「多次小I/O合并为一次大I/O」的问题：readv(fd, iov, iovcnt)一次调用将数据散射到多个不连续的内存缓冲区（iov数组），writev将多个不连续缓冲区的数据聚集为一次写入。优势：①减少系统调用次数——不用多次read/write分别处理各缓冲区；②原子性——writev保证多个缓冲区在一次写入中完成，不会被其他写操作穿插；③高效——内核只需一次I/O操作。典型用途：HTTP响应头和体在不同缓冲区，用writev一次写出。\nsendfile解决「内核空间到用户空间再回内核空间的冗余拷贝」问题：传统read+write流程——内核缓冲→用户缓冲(read)→内核缓冲(write)→socket。sendfile(out_fd, in_fd, offset, count)直接在内核中从文件fd拷贝到socket fd，跳过用户空间。优势：①零用户空间拷贝——数据全程在内核空间；②减少2次系统调用为1次；③减少CPU拷贝（DMA可直接传输）。用途：Web服务器发送静态文件、CDN节点转发。",
    tags: ["readv", "writev", "sendfile", "零拷贝"],
  },
];
