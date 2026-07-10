import type { ReviewQuestion } from "./types";

export const rdiDatabaseImplQuestions: ReviewQuestion[] = [
  {
    id: "rdi-di-1",
    chapter: "rdi-database-impl",
    level: 1,
    question: `Redis的键空间和过期字典是什么关系？过期字典的键为什么不重复存储？`,
    answer: `键空间（redisDb.dict）存储所有键值对，键是SDS字符串值是redisObject指针。过期字典（redisDb.expires）存储设过期的键到过期时间戳(ms)的映射。两个字典是独立结构但过期字典的键指针指向键空间dict中同一键对象不重复存储。原因：①节约内存——键字符串可能很长不重复存储避免浪费；②一致性——两字典引用同一对象不会出现键不一致；③操作简单——EXPIRE只需在expires中添加指针+时间戳不需复制键。`,
    tags: ["键空间", "过期字典", "redisDb"],
  },
  {
    id: "rdi-di-2",
    chapter: "rdi-database-impl",
    level: 2,
    question: `Redis为什么选择惰性删除+定期删除的组合策略？单独使用一种有什么问题？`,
    answer: `单独使用的问题：①只定时删除——大量键各自定时器开销大CPU不友好，Redis单线程会被拖慢；②只惰性删除——不常访问的过期键永远不删内存浪费严重可能导致OOM；③只定期删除——两次定期间客户端可能读到过期数据。Redis的组合策略：惰性删除expireIfNeeded()每次读写键前检查过期则删，保证客户端不读过期数据（正确性）；定期删除activeExpireCycle()在serverCron中周期抽查删除过期键，主动清理不常访问的过期键（内存回收）。两者互补，再加maxmemory+淘汰策略兜底。`,
    tags: ["过期删除", "惰性删除", "定期删除"],
  },
  {
    id: "rdi-di-3",
    chapter: "rdi-database-impl",
    level: 2,
    question: `过期键在RDB和AOF中分别如何处理？`,
    answer: `RDB中：①生成RDB（SAVE/BGSAVE）——过期键不写入新RDB文件自然过滤；②载入RDB——Master主服务器过滤过期键不载入，Slave从服务器不过滤全部载入（由主服务器同步DEL命令清理）。AOF中：①AOF追加——键过期后被惰性/定期删除时追加一条DEL命令到AOF文件显式记录删除操作；②AOF重写——过期键不写入新AOF文件重写时检查过期则跳过。差异原因：RDB是快照式载入时可重新判断过期状态；AOF是命令日志需显式DEL记录保证重放一致性。`,
    tags: ["过期键", "RDB", "AOF", "持久化"],
  },
  {
    id: "rdi-di-4",
    chapter: "rdi-database-impl",
    level: 3,
    question: `主从复制中过期键的处理有什么特殊性？这带来了什么一致性问题？设计原因是什么？`,
    answer: `特殊性：Master删除过期键后发DEL给所有Slave，Slave不主动删除过期键（即使读到过期数据也返回给客户端），从服务器的过期删除完全由主服务器控制。一致性问题：从服务器读到过期键但未收到主服务器DEL前可能返回过期数据——这是Redis弱一致性的体现。设计原因：简化实现并保证主从一致性——如果从服务器也自主删除过期键，可能与主服务器产生不一致导致复制冲突。统一由主服务器控制删除通过复制传播DEL命令，保证主从数据一致。这是Redis选择性能优先而非强一致的设计体现。`,
    tags: ["过期键", "主从复制", "弱一致性"],
  },
];
