import type { ReviewQuestion } from "./types";

export const crvDatabaseCacheQuestions: ReviewQuestion[] = [
  {
    id: "crv-database-cache-01",
    chapter: "crv-database-cache",
    level: 1,
    question: "数据库事务的 ACID 四大特性分别是什么？",
    answer: "ACID 四大特性：① 原子性（Atomicity）——事务是最小执行单位，要么全部成功，要么全部回滚，例如转账的扣款和加款必须同时成功或失败；② 一致性（Consistency）——事务执行前后数据必须满足所有约束，例如转账前后总金额不变；③ 隔离性（Isolation）——并发事务之间互不干扰，通过锁机制和隔离级别控制；④ 持久性（Durability）——事务提交后数据永久保存，即使系统故障也不丢失，通过日志保障。",
    tags: ["ACID", "事务", "原子性", "一致性", "隔离性", "持久性"],
  },
  {
    id: "crv-database-cache-02",
    chapter: "crv-database-cache",
    level: 2,
    question: "三种缓存读写策略各有什么优缺点？什么场景用哪种？",
    answer: "三种策略：① Cache Aside——读时先查缓存未命中再查 DB，写时更新 DB 再删缓存。最常用，应用层控制灵活，但可能出现短暂不一致。适用于大部分读多写少场景。② Read/Write Through——缓存层同步读写 DB，应用只感知缓存。一致性较好，但缓存层逻辑复杂。适用于对一致性要求较高的场景。③ Write Behind——写时只写缓存，异步刷入 DB。写入性能极高，但可能丢数据。适用于写入量极大且能容忍数据丢失的场景（如日志、计数）。",
    tags: ["缓存策略", "Cache Aside", "Read Through", "Write Behind"],
  },
  {
    id: "crv-database-cache-03",
    chapter: "crv-database-cache",
    level: 2,
    question: "缓存穿透、雪崩、击穿的区别是什么？各如何应对？",
    answer: "三者区别：① 缓存穿透——查询根本不存在的数据，每次都绕过缓存直击 DB。对策：布隆过滤器过滤不存在的 key，或缓存空值（设短过期时间）。② 缓存雪崩——大量缓存 key 同时失效，DB 瞬间压力暴增。对策：给过期时间加随机偏移避免同时失效，加限流降级保护 DB。③ 缓存击穿——单个热点 key 过期瞬间，大量并发请求直查 DB。对策：用互斥锁只允许一个请求查 DB 后回填缓存，或热点 key 设置永不过期+异步更新。核心区别：穿透是查不存在的，雪崩是大量同时失效，击穿是单个热点失效。",
    tags: ["缓存穿透", "缓存雪崩", "缓存击穿", "布隆过滤器"],
  },
  {
    id: "crv-database-cache-04",
    chapter: "crv-database-cache",
    level: 3,
    question: "为什么说「缓存引入了一致性问题」？如何平衡一致性与性能？",
    answer: "缓存引入一致性问题是因为数据存在两个副本（缓存+DB），写入时无法保证两者同时更新。例如 Cache Aside 策略中，先更新 DB 再删缓存，如果删缓存失败则缓存中是旧数据；如果先删缓存再更新 DB，在更新完成前有并发读请求会把旧数据回填到缓存。平衡方法：① 接受最终一致性——大部分场景不需要强一致，设置合理过期时间，数据最终会一致；② 延迟双删——先删缓存、更新 DB、延迟一段时间再删一次缓存；③ 通过消息队列保证缓存更新顺序；④ 对强一致要求高的场景用 Read/Write Through 让缓存层同步操作。核心原则：根据业务场景选择合适的一致性级别，不追求不必要的强一致。",
    tags: ["缓存一致性", "最终一致性", "延迟双删", "性能权衡"],
  },
];
