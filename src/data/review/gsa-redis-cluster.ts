import type { ReviewQuestion } from "./types";

export const gsaRedisClusterQuestions: ReviewQuestion[] = [
  {
    id: "gsa-redis-cluster-1",
    chapter: "gsa-redis-cluster",
    level: 2,
    question: "Redis 集群的哈希槽分片机制是什么？为什么用 16384 个槽？",
    answer:
      "Redis 集群把 key 用 CRC16 哈希后对 16384 取模，算出槽号，每个主节点负责一部分槽。加减节点时迁移槽即可，不必全量 rehash。选 16384 是权衡：太少则节点数上限低（每节点至少一槽），太多则集群心跳消息（gossip 协议传输槽位图）开销大。16384 足够支撑上千节点，且槽位图仅 2KB，心跳开销可控。跨槽操作要用 hash tag {tag} 强制相关 key 落同槽，才能用事务/Lua/mset。",
    tags: ["Redis", "哈希槽", "分片"],
  },
  {
    id: "gsa-redis-cluster-2",
    chapter: "gsa-redis-cluster",
    level: 3,
    question: "缓存穿透、击穿、雪崩的区别与对策？",
    answer:
      "穿透：查不存在的 key，缓存永不命中，请求直达 DB（如恶意查 uid=-1）。对策：缓存空值（短 TTL）或布隆过滤器前置拦截。击穿：单个热 key 过期瞬间，海量并发同时打 DB。对策：互斥锁（只放一个请求查 DB 回填，其余等）或热 key 永不过期+后台异步刷新。雪崩：大量 key 同时过期，DB 被压垮。对策：TTL 加随机抖动（1 小时 ± 10 分钟）避免同时过期、多级缓存（本地缓存兜底）、熔断降级（DB 扛不住时返回默认值）。三者区别：穿透是「查不存在的」、击穿是「单热 key 失效」、雪崩是「批量 key 失效」。",
    tags: ["Redis", "缓存穿透", "缓存击穿", "缓存雪崩"],
  },
  {
    id: "gsa-redis-cluster-3",
    chapter: "gsa-redis-cluster",
    level: 3,
    question: "Cache-Aside 为什么写操作是「先更新 DB 再删缓存」而不是「更新缓存」？",
    answer:
      "更新缓存有并发问题：A 写 DB 后准备更新缓存，B 同时写 DB 并先更新了缓存，A 再更新就把 B 的覆盖了——脏数据。删缓存则让下次读自动从 DB 重新加载最新值，不存在覆盖问题。先 DB 后删缓存保证了 DB 是权威：即便删缓存失败，下次读也会发现缓存缺失而回源 DB 拿到最新值。若先删缓存再写 DB，期间有读请求会把旧 DB 值回填缓存，导致缓存与 DB 不一致。强一致场景再叠加延迟双删（写 DB 后延迟几百毫秒再删一次）或分布式锁。",
    tags: ["Redis", "Cache-Aside", "一致性"],
  },
  {
    id: "gsa-redis-cluster-4",
    chapter: "gsa-redis-cluster",
    level: 4,
    question: "游戏排行榜用 Redis ZSet 实现，百万玩家时如何优化？",
    answer:
      "痛点：ZSet 百万成员时 ZAdd/ZRevRange 仍 O(logN) 但内存占用大，且取 Top100 要扫前 100 个。优化：①冷热分离——只把活跃玩家（最近 7 天登录）放 ZSet，冷数据落 DB；②分段排行榜——按段位/等级分多个 ZSet（如青铜榜、白银榜），单 ZSet 规模降到万级；③只存 Top N——ZSet 只保留前 10000 名，1 万名外不进榜（用 ZRemRangeByRank 裁剪）；④我的排名估算——百万级 ZRevRank 也慢，改用近似估算（按分数段统计人数估算排名）；⑤定时快照——排行榜读多写少，定时把 Top100 快照存 String，读走快照不查 ZSet。原则：排行榜不需要绝对实时，用近似换性能。",
    tags: ["Redis", "排行榜", "ZSet"],
  },
];
