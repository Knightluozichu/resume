import type { ReviewQuestion } from "./types";

export const rdiFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "rdi-fr-1",
    chapter: "rdi-final-review",
    level: 2,
    question: "全书四大部分如何通过三个交汇点形成闭环？请详细说明每个交汇点。",
    answer: "三个交汇点：①数据结构→对象编码——SDS对应string的int/embstr/raw编码，字典对应hash的hashtable编码和set的hashtable编码及redisDb键空间，跳跃表+字典对应zset的skiplist编码，intset对应set的intset编码，ziplist对应小数据编码。编码转换阈值让Redis在不同数据规模下选最优结构。②持久化→复制——RDB是全量同步的传输基础（主BGSAVE生成RDB发给从），backlog（类似AOF命令追加）是部分重同步的基础，命令传播是增量同步（类似实时AOF）。③事件驱动→分布式——事件循环是所有Redis进程的运行模型，Server用文件事件处理客户端+时间事件执行serverCron，Sentinel用文件事件处理连接+时间事件执行探活和故障转移，Cluster节点用文件事件处理客户端+Gossip+时间事件执行心跳和迁移。",
    tags: ["知识串联", "交汇点", "闭环"],
  },
  {
    id: "rdi-fr-2",
    chapter: "rdi-final-review",
    level: 2,
    question: "Redis高性能的五大基石是什么？它们如何协同工作实现10万+QPS？",
    answer: "五大基石：①纯内存操作——微秒级延迟避免磁盘IO瓶颈；②高效数据结构——SDS O(1)/字典O(1)/跳跃表O(logN)，小数据用ziplist/intset节约内存大数据用hashtable/skiplist保证性能；③单线程事件驱动——无锁无竞态无上下文切换I/O多路复用单核处理大量连接；④fork+COW——持久化和复制通过fork子进程+写时复制实现无锁快照不阻塞主进程；⑤多编码自适应——同一类型多种编码阈值触发自动转换对用户透明。协同方式：纯内存保证微秒级操作→高效数据结构保证O(1)/O(logN)操作→单线程避免锁和切换→fork+COW保证持久化不阻塞→多编码保证不同规模都最优。五大基石共同实现单核10万+QPS。",
    tags: ["五大基石", "高性能", "协同工作"],
  },
  {
    id: "rdi-fr-3",
    chapter: "rdi-final-review",
    level: 3,
    question: "Redis在哪些层面体现弱一致性？生产环境如何缓解？",
    answer: "弱一致性体现：①主从复制异步——主写完立即返回不等从确认复制延迟期间从读到旧数据；②过期键处理——从不主动删过期键可能返回过期数据；③故障转移窗口——主挂到新主选举期间旧主未同步写入丢失；④脑裂风险——网络分区时多个主同时写入分区恢复后部分数据被覆盖。缓解措施：①min-slaves-to-write——从服务器数量不足时主拒绝写入；②min-slaves-max-lag——从延迟超过阈值时主拒绝写入；③WAIT命令——客户端显式等N个从确认写入；④Sentinel的quorum和down-after调优——减少误判和故障转移时间。这些措施只能缓解不能消除弱一致性Redis选择性能优先而非强一致。",
    tags: ["弱一致性", "主从异步", "脑裂", "min-slaves"],
  },
  {
    id: "rdi-fr-4",
    chapter: "rdi-final-review",
    level: 3,
    question: "从数据结构到分布式高可用，Redis的每个设计决策如何服务于「高性能」这一核心目标？",
    answer: "每个决策与高性能的关系：①SDS——空间预分配+惰性释放减少realloc次数O(1)取长度避免遍历；②字典渐进式rehash——避免一次性rehash阻塞分摊到每次操作；③跳跃表——O(logN)查找无需旋转调整(vs红黑树)范围查询高效；④intset/ziplist——小数据压缩编码节约内存减少缓存未命中；⑤多编码转换——自动选最优结构用户无需调优；⑥单线程事件驱动——无锁无竞态无切换I/O多路复用高效处理并发；⑦RDB/AOF fork+COW——无锁持久化不阻塞主进程；⑧serverCron——时间事件周期处理后台任务不干扰客户端；⑨PSYNC——部分重同步避免断线重连全量同步开销；⑩Cluster分片——水平扩展突破单机瓶颈。所有决策围绕「用最合适的底层数据结构在内存中实现最高效的KV存储」这一核心哲学。",
    tags: ["设计决策", "高性能", "核心哲学", "全书总结"],
  },
];
