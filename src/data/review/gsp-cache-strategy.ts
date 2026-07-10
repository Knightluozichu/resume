import type { ReviewQuestion } from "./types";

export const gspCacheStrategyQuestions: ReviewQuestion[] = [
  {
    id: "gsp-cache-strategy-1",
    chapter: "gsp-cache-strategy",
    level: 2,
    question: `Cache-Aside 和 Write-Through 在写操作上有什么区别？`,
    answer:
      `Cache-Aside 写操作是先更新数据库再删缓存（缓存只是副本，删了下次读会回填新值），有短暂不一致窗口但写延迟低。Write-Through 写操作是同时更新缓存和数据库（缓存和数据库始终一致），强一致但写延迟高（必须等数据库 IO）。游戏玩家数据用 Cache-Aside（容忍短暂不一致），配置表用 Write-Through（要求强一致）。`,
    tags: ["Cache-Aside", "Write-Through", "缓存策略"],
  },
  {
    id: "gsp-cache-strategy-2",
    chapter: "gsp-cache-strategy",
    level: 2,
    question: `什么是缓存雪崩？如何防护？`,
    answer:
      `缓存雪崩是大量 key 同时过期，全部请求穿透到数据库，数据库瞬间过载崩溃。成因通常是批量设置了相同的 TTL。防护方案：TTL 随机化——在基础 TTL 上加 0~N 秒随机偏移，使各 key 过期时间分散；多级缓存——本地缓存 + Redis 双层；限流降级——数据库压力过大时返回降级数据保护数据库。`,
    tags: ["缓存雪崩", "TTL", "缓存防护"],
  },
  {
    id: "gsp-cache-strategy-3",
    chapter: "gsp-cache-strategy",
    level: 3,
    question: `缓存穿透和缓存击穿的区别是什么？各如何防护？`,
    answer:
      `穿透是大量请求查询不存在的 key，缓存永不命中全部打到数据库——防护用空值缓存或布隆过滤器。击穿是一个热点 key 过期的瞬间，大量请求同时查数据库——防护用互斥锁（只允许一个请求查 DB，其他等待回填）或热点数据不过期。区别在于：穿透是「查不存在的数据」，击穿是「查存在的数据但缓存刚好过期」。`,
    tags: ["缓存穿透", "缓存击穿", "缓存防护"],
  },
  {
    id: "gsp-cache-strategy-4",
    chapter: "gsp-cache-strategy",
    level: 1,
    question: `Write-Behind 策略和定时落库机制有什么异同？`,
    answer:
      `相同点：都是写缓存标记脏、异步批量落库。不同点在于视角和角色：定时落库是 Cache-Aside 的写优化——缓存是数据库的副本，读仍走缓存但 Miss 时回源 DB。Write-Behind 中缓存是唯一数据入口——读永远只查缓存，数据库只是后台备份，缓存宕机风险更大因为 DB 可能严重滞后。Write-Behind 适合写极频繁且容忍丢失的场景（如实时排行榜），定时落库是通用玩家数据的标准做法。`,
    tags: ["Write-Behind", "定时落库", "缓存策略"],
  },
];
