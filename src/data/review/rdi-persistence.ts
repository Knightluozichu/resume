import type { ReviewQuestion } from "./types";

export const rdiPersistenceQuestions: ReviewQuestion[] = [
  {
    id: "rdi-per-1",
    chapter: "rdi-persistence",
    level: 1,
    question: `SAVE和BGSAVE的区别是什么？BGSAVE如何利用COW实现无锁快照？`,
    answer: `SAVE：阻塞服务器执行RDB生成期间不处理任何客户端命令生产环境禁用。BGSAVE：fork子进程后台生成RDB主进程继续服务。COW实现无锁快照：fork后父子进程共享同一物理内存页（只复制页表不复制数据），子进程遍历共享内存写入RDB。主进程修改数据时OS自动复制被修改的内存页（写时复制），子进程看到的仍是fork时刻的数据快照。因此不需加锁主进程也不需暂停。注意：fork本身需复制页表（非数据页），大内存实例fork可能耗时数百ms期间主进程阻塞。`,
    tags: ["RDB", "SAVE", "BGSAVE", "COW"],
  },
  {
    id: "rdi-per-2",
    chapter: "rdi-persistence",
    level: 2,
    question: `AOF的三种fsync策略各有什么优缺点？为什么everysec是默认选择？`,
    answer: `三种策略：①always——每次写命令都fsync最安全不丢数据但每次等磁盘IO性能最差；②everysec——每秒fsync一次折中最多丢1秒数据性能接近no；③no——由OS决定fsync最快但最不安全可能丢大量数据。everysec是默认的原因：性能和数据安全最佳平衡——fsync每秒一次开销很小（一次系统调用）但数据丢失控制在1秒内对大多数应用可接受。always性能损失太大（每次写等磁盘），no数据安全性无保障。everysec用最小代价实现可接受的数据安全性。`,
    tags: ["AOF", "fsync", "持久化策略"],
  },
  {
    id: "rdi-per-3",
    chapter: "rdi-persistence",
    level: 2,
    question: `AOF重写的流程是什么？aof_rewrite_buf缓冲区的作用是什么？`,
    answer: `AOF重写流程：①fork子进程遍历数据库生成最简命令写入临时AOF文件（如100次INCR→1条SET）；②父进程继续处理命令同时将新命令写入aof_rewrite_buf缓冲区；③子进程完成通知父进程；④父进程追加aof_rewrite_buf内容到临时文件；⑤原子rename替换旧AOF。aof_rewrite_buf作用：fork创建的子进程只能看到fork时刻的数据快照（COW），fork后的新命令子进程看不到。如果不缓冲这些命令重写后的AOF会丢失fork后所有写操作。因此父进程在重写期间将新命令同时写入aof_buf（正常AOF）和aof_rewrite_buf（重写缓冲），子进程完成后追加保证不丢数据。`,
    tags: ["AOF重写", "aof_rewrite_buf", "缓冲区"],
  },
  {
    id: "rdi-per-4",
    chapter: "rdi-persistence",
    level: 3,
    question: `RDB和AOF各自的优缺点是什么？混合持久化如何结合两者优势？`,
    answer: `RDB优点：二进制体积小恢复快适合冷备。缺点：定时快照可能丢两次快照间数据fork大内存耗时。AOF优点：数据安全（everysec最多丢1秒）可读可修复。缺点：文件大恢复慢fsync持续CPU开销。混合持久化（4.0+，aof-use-rdb-preamble yes）：AOF重写时文件前半部分用RDB二进制格式（全量快照）后半部分用AOF增量命令（重写期间新命令）。恢复时先加载RDB部分（快速恢复大部分数据）再重放AOF增量命令（补全最新数据）。恢复速度接近RDB数据安全接近AOF兼顾两者优势是4.0+推荐方案。`,
    tags: ["RDB", "AOF", "混合持久化", "对比"],
  },
];
