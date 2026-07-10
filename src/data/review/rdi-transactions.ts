import type { ReviewQuestion } from "./types";

export const rdiTransactionsQuestions: ReviewQuestion[] = [
  {
    id: "rdi-tx-1",
    chapter: "rdi-transactions",
    level: 1,
    question: `Redis事务的执行流程是什么？为什么不支持回滚？`,
    answer: `执行流程三阶段：①MULTI开启事务客户端进入事务状态；②命令入队不立即执行返回QUEUED加入FIFO队列；③EXEC顺序执行队列所有命令返回结果数组。DISCARD取消清空队列。两种错误：入队错误（语法错误）全部不执行；执行错误（类型不匹配）错误命令返回错误其他照常执行不回滚。不支持回滚原因：①Redis认为执行错误是编程错误（不该用错类型）生产环境不应发生；②不支持回滚使内部实现更简单无需undo log；③性能更好无回滚机制开销。`,
    tags: ["MULTI", "EXEC", "事务", "回滚"],
  },
  {
    id: "rdi-tx-2",
    chapter: "rdi-transactions",
    level: 2,
    question: `WATCH乐观锁的工作原理是什么？如何用WATCH实现原子递增？`,
    answer: `WATCH原理：WATCH key监视键redisDb.watched_keys字典记录key到客户端列表的映射。任何修改命令执行后检查watched_keys有匹配则标记客户端dirty。EXEC前检查dirty如果被标记（被监视键已修改）拒绝执行返回nil。EXEC/DISCARD后自动UNWATCH。原子递增实现（不用INCR）：①WATCH counter；②val=GET counter；③MULTI；④SET counter val+1；⑤EXEC。如果EXEC返回nil（counter被别人改了）重试整个过程。如果返回OK成功。这是CAS（Compare-And-Swap）模式。`,
    tags: ["WATCH", "乐观锁", "CAS"],
  },
  {
    id: "rdi-tx-3",
    chapter: "rdi-transactions",
    level: 2,
    question: `Redis事务的ACID特性分别如何？为什么说它不是传统意义的ACID事务？`,
    answer: `A原子性——部分原子：入队错误全部不执行（原子）但执行错误不回滚（非原子）。C一致性——具备：不违反Redis约束入队错误不执行保持一致执行错误跳过但数据仍有效。I隔离性——具备：单线程串行执行事务期间不被打断天然隔离。D持久性——取决于配置：无持久化掉电丢失RDB可能丢快照间数据AOF everysec最多丢1秒。不是传统ACID的原因：①原子性不完整——执行错误不回滚传统ACID要求全部成功或全部回滚；②持久性不保证——默认配置下不保证持久性。Redis事务本质是「命令批量顺序执行+隔离性」而非传统ACID事务。`,
    tags: ["ACID", "原子性", "隔离性", "持久性"],
  },
  {
    id: "rdi-tx-4",
    chapter: "rdi-transactions",
    level: 3,
    question: `Lua脚本相比MULTI/EXEC有什么优势？有什么限制？`,
    answer: `优势：①支持条件逻辑——Lua可含if/else循环MULTI/EXEC只能批量执行固定命令；②原子性更强——redis.call出错终止整个脚本MULTI/EXEC执行错误不回滚已执行命令；③减少网络往返——多条命令打包一次发送；④适合复杂CAS如库存扣减。限制：①不应执行长时间操作——原子执行长时间阻塞所有客户端；②不应有随机副作用——主从复制需确定性random/time影响复制（3.2+ replication effect模式解决）；③Cluster下键需在同一槽位——用hash tag {tag}key保证；④脚本缓存可能丢失——服务器重启后SCRIPT LOAD缓存消失需处理NOSCRIPT降级EVAL。`,
    tags: ["Lua", "EVAL", "EVALSHA", "脚本原子性"],
  },
];
