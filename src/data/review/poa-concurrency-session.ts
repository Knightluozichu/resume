import type { ReviewQuestion } from "./types";

export const poaConcurrencySessionQuestions: ReviewQuestion[] = [
  {
    id: "poa-concurrency-session-01",
    chapter: "poa-concurrency-session",
    level: 1,
    question: "乐观并发和悲观并发的核心区别是什么？",
    answer: "核心区别在于对冲突的假设和处理时机：① 乐观并发——假设冲突很少发生，不加锁，在提交时检查版本号是否变化，冲突时回滚重试。优点是无锁等待、高吞吐，适合冲突少的场景。② 悲观并发——假设冲突经常发生，读取数据时即加锁，阻塞其他事务直到提交释放。优点是无冲突、强一致，适合冲突高的场景。乐观并发适合读多写少的系统，悲观并发适合写冲突频繁的系统。",
    tags: ["乐观并发", "悲观并发", "并发控制"],
  },
  {
    id: "poa-concurrency-session-02",
    chapter: "poa-concurrency-session",
    level: 2,
    question: "会话状态的三种存储方式各有什么优缺点？",
    answer: "三种会话存储方式：① 客户端会话（Client Session State）——将会话数据存在 Cookie/URL 参数中，优点是无需服务端存储、天然支持负载均衡，缺点是数据量受限（4KB）、安全性差（需加密）；② 服务端会话（Server Session State）——存在内存或 Redis 中，通过 Session ID 关联，优点是数据量灵活、访问快，缺点是需要会话亲和或共享存储；③ 数据库会话（Database Session State）——序列化存入数据库，优点是可持久化、跨重启恢复，缺点是序列化/反序列化开销大。实践中常混合使用：少量标识用客户端，热数据用服务端，需持久化的用数据库。",
    tags: ["会话状态", "客户端存储", "服务端存储"],
  },
  {
    id: "poa-concurrency-session-03",
    chapter: "poa-concurrency-session",
    level: 2,
    question: "粗粒度锁和隐式锁分别解决什么问题？",
    answer: "粗粒度锁（Coarse-Grained Lock）：用一个锁锁定一组相关对象（如一个聚合根及其所有子对象），避免对每个子对象单独加锁导致的死锁和管理复杂问题。当编辑一个订单及其明细时，只需锁定订单本身即可保证整个聚合的一致性。隐式锁（Implicit Lock）：由框架或数据库自动管理锁的获取和释放，开发者无需显式调用 lock/unlock。例如 JPA 的 @Version 注解自动实现乐观锁，数据库的 SELECT FOR UPDATE 自动实现悲观锁。隐式锁减少了手动锁管理的错误风险，但需要理解框架的锁行为以避免意外。",
    tags: ["粗粒度锁", "隐式锁", "锁管理"],
  },
  {
    id: "poa-concurrency-session-04",
    chapter: "poa-concurrency-session",
    level: 3,
    question: "一个在线协作编辑系统应该如何设计并发控制策略？",
    answer: "在线协作编辑系统的并发控制设计：① 场景分析——多用户同时编辑同一文档，冲突概率高，需要实时性；② 悲观离线锁——用户开始编辑时获取文档的独占锁，其他人只能查看不能编辑，简单但协作体验差；③ 乐观离线锁——用户自由编辑，提交时检查版本号，冲突时提示合并，适合低冲突场景；④ 混合策略（推荐）——文档级用悲观锁保证不冲突，段落级用乐观锁允许并行编辑不同段落；⑤ 操作转换（OT）或 CRDT——对于实时协作，不使用传统锁，而是通过操作转换算法合并并发编辑，保证最终一致性；⑥ 会话状态——编辑上下文存在服务端（Redis），支持断线重连恢复；⑦ 工作单元——每次编辑操作作为一个工作单元提交，支持撤销/重做。根据协作实时性要求选择：低实时用乐观锁，高实时用 OT/CRDT。",
    tags: ["并发设计", "协作编辑", "实践应用"],
  },
];
