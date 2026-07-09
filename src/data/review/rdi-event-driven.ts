import type { ReviewQuestion } from "./types";

export const rdiEventDrivenQuestions: ReviewQuestion[] = [
  {
    id: "rdi-ev-1",
    chapter: "rdi-event-driven",
    level: 1,
    question: "Redis的文件事件处理器有哪些？一个客户端命令的完整处理流程是什么？",
    answer: "三种核心文件事件处理器：①连接应答处理器(acceptTcpHandler)——新连接时accept创建客户端注册读事件；②命令请求处理器(readQueryFromClient)——读取命令到输入缓冲区解析执行将回复写入输出缓冲区注册写事件；③命令回复处理器(sendReplyToClient)——套接字可写时发送回复发送完删除写事件。完整流程：客户端连接→acceptTcpHandler创建客户端→readQueryFromClient读取并执行命令→sendReplyToClient发送回复→等待下一个请求。通过I/O多路复用统一管理单线程串行执行。",
    tags: ["文件事件", "事件处理器", "I/O多路复用"],
  },
  {
    id: "rdi-ev-2",
    chapter: "rdi-event-driven",
    level: 2,
    question: "事件循环的阻塞时间是如何计算的？为什么这样设计？",
    answer: "阻塞时间计算：①搜索最近到期的时间事件得到when；②阻塞时间=max(0, when-当前时间)；③最近时间事件已过期则阻塞0（不阻塞立即处理）；④无时间事件则阻塞-1（永久阻塞直到有文件事件）。设计原因：①有文件事件时aeApiPoll立即返回不阻塞保证客户端请求即时响应；②无文件事件时阻塞到最近时间事件到期避免空转浪费CPU；③无时间事件时永久阻塞直到有客户端连接数据最大节省CPU。优先处理文件事件再处理时间事件保证客户端请求不被后台任务阻塞。阻塞等待设计使Redis空闲时几乎不消耗CPU繁忙时即时响应。",
    tags: ["事件循环", "aeProcessEvents", "阻塞时间"],
  },
  {
    id: "rdi-ev-3",
    chapter: "rdi-event-driven",
    level: 2,
    question: "serverCron的执行频率如何控制？它负责哪些核心任务？",
    answer: "执行频率由redisServer.hz参数控制（默认10即每秒10次/每100ms一次）。serverCron回调返回1000/hz(毫秒)作为下次执行间隔实现周期执行。核心任务：①更新统计信息（时间缓存/内存/QPS）；②过期键清理（activeExpireCycle定期删除）；③持久化检查（触发BGSAVE/BGREWRITEAOF/刷新AOF缓冲区）；④数据库resize（推进rehash/触发shrink）；⑤复制健康检查（主从心跳/超时检测）；⑥集群心跳（Cluster通信/哨兵故障检测）；⑦超时客户端清理。高hz提升后台任务精度但增加CPU开销。",
    tags: ["serverCron", "时间事件", "hz"],
  },
  {
    id: "rdi-ev-4",
    chapter: "rdi-event-driven",
    level: 3,
    question: "Redis单线程模型为什么能达到10万+QPS？单线程有什么限制？6.0+有什么改进？",
    answer: "高性能来源：①纯内存操作微秒级延迟；②高效数据结构SDS O(1)/字典O(1)/跳跃表O(logN)；③I/O多路复用epoll O(1)就绪通知单核处理大量连接；④无锁无竞态无上下文切换；⑤避免缓存伪共享。限制：①单条命令阻塞所有客户端——禁止KEYS/SORT大集合；②单核CPU瓶颈——需多实例解决；③fork开销大内存耗时。改进：4.0+将DEL等改为异步(UNLINK)；6.0+引入I/O多线程(io-threads)将网络读写并行化但命令执行仍单线程——网络I/O是多线程的命令执行是单线程的。",
    tags: ["单线程", "高性能", "io-threads", "6.0改进"],
  },
];
