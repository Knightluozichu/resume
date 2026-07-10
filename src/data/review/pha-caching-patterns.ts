import type { ReviewQuestion } from "./types";

export const phaCachingPatternsQuestions: ReviewQuestion[] = [
  {
    id: "pha-cp-1",
    chapter: "pha-caching-patterns",
    level: 1,
    question: `Cache-Aside（旁路缓存）的读写流程是什么？为什么写操作要删除缓存而不是更新缓存？`,
    answer: `Cache-Aside读流程：①先读Cache，命中则直接返回。②未命中则读DB，将结果写回Cache，返回。写流程：③更新DB后，删除Cache中对应的Key（而非更新Cache）。为什么删除而非更新：①并发安全性——如果「更新DB+更新Cache」，在并发写+读场景下可能出现DB先更新但Cache后更新导致脏数据。删除是幂等的，下次读会从DB重新加载最新值。②避免无效更新——如果缓存值计算复杂（需多表关联），每次写都更新缓存可能浪费（可能更新后很久没人读）。删除是懒加载策略（Lazy Loading），只在需要时才重建缓存。③一致性窗口更短——删除后下次读才重建，不一致窗口=下次读之前的时间；更新则可能因为并发顺序导致不一致。Cache-Aside风险：①首次未命中穿透——可预热。②并发写致脏读——线程A更新DB→线程B读DB旧值→线程A删Cache→线程B写回旧值。对策：延迟双删（删→等→再删）。③缓存与DB非原子操作——更新DB和删Cache是两步操作，可能中间失败。对策：Canal监听binlog异步删Cache。`,
    tags: ["Cache-Aside", "旁路缓存", "删除vs更新", "延迟双删"],
  },
  {
    id: "pha-cp-2",
    chapter: "pha-caching-patterns",
    level: 2,
    question: `缓存穿透、缓存击穿、缓存雪崩的区别和解决方案各是什么？`,
    answer: `三者区别：①缓存穿透——查询一个在Cache和DB中都不存在的Key（如恶意攻击查询不存在的ID），每次请求都直达DB，Cache形同虚设。原因：数据不存在 / 恶意攻击。②缓存击穿——某个热点Key过期的瞬间，大量并发请求同时未命中Cache，全部涌向DB。原因：热点Key过期 + 高并发。③缓存雪崩——大量Key在同一时间过期（或Cache服务宕机），所有请求涌向DB导致DB崩溃。原因：批量Key同时过期 / Cache宕机。解决方案：①穿透——空值缓存（查不到也缓存null，设短TTL）；布隆过滤器（前置过滤不存在的Key）。②击穿——互斥锁（只让一个线程回源DB重建Cache，其他等待）；永不过期+异步刷新（逻辑过期，后台线程定期刷新）。③雪崩——过期时间加随机偏移（避免同时过期）；多级缓存（L1本地+L2 Redis）；限流降级（DB前加限流保护）；Cache集群高可用（Redis Sentinel/Cluster）。共同原则：Cache是加速层不是数据源，必须做好DB的最后一道防线（限流/降级/熔断）。`,
    tags: ["缓存穿透", "缓存击穿", "缓存雪崩", "布隆过滤器", "互斥锁"],
  },
  {
    id: "pha-cp-3",
    chapter: "pha-caching-patterns",
    level: 2,
    question: `Read-Through/Write-Through/Write-Behind三种缓存模式的工作原理和区别是什么？`,
    answer: `①Read-Through——应用只与Cache交互，Cache未命中时由Cache服务自身负责回源DB加载数据并填充。应用无感知回源逻辑（与Cache-Aside区别：Cache-Aside由应用负责回源，Read-Through由Cache层代理回源）。优势：应用代码简洁，回源逻辑统一。②Write-Through——应用写Cache，Cache同步写DB（写DB成功后才返回成功给应用）。Cache和DB保持强一致。优势：数据一致性好。代价：写延迟高（等DB确认）。③Write-Behind（Write-Back）——应用写Cache，Cache异步批量刷DB。优势：写性能极高（只写内存）。代价：宕机可能丢数据（Cache未刷到DB的数据丢失）。需配合WAL日志或持久化队列保证可靠性。区别总结：Read-Through和Write-Through都是同步穿透（Cache作为代理层），应用不直接操作DB。Write-Behind是异步写回，用数据安全性换写性能。对比Cache-Aside：Cache-Aside由应用控制读写流程（灵活但侵入），Read/Write-Through由Cache层控制（透明但需Cache支持）。选型：对一致性要求高用Write-Through，对写性能要求极高且可容忍少量丢数据用Write-Behind（如日志/计数器），通用场景用Cache-Aside。`,
    tags: ["Read-Through", "Write-Through", "Write-Behind", "缓存模式"],
  },
  {
    id: "pha-cp-4",
    chapter: "pha-caching-patterns",
    level: 3,
    question: `在高并发电商场景中，如何设计一个多级缓存架构？如何保证缓存与DB的最终一致性？`,
    answer: `多级缓存架构（从近到远）：①L1本地缓存（Caffeine/Guava）——进程内缓存，纳秒级访问，容量小。存热点数据（如商品类目、配置）。TTL短（秒级），通过广播（Redis Pub/Sub）或消息通知失效。②L2分布式缓存（Redis Cluster）——毫秒级访问，容量大。存大部分读数据。主缓存层，TTL分钟级。③L3 DB——数据源，毫秒级访问。最后兜底。请求链路：L1→L2→DB，任一层命中即返回并回填上层。保证最终一致性的策略：①写操作——先更新DB，再删除L2（Redis），再通过Redis Pub/Sub或MQ广播通知所有节点删除L1。②延迟双删——更新DB前删一次Cache，更新DB后再删一次，覆盖并发读回填的脏数据。③Canal/Debezium监听binlog——完全解耦，DB变更后binlog事件触发删Cache，不侵入业务代码。④消息队列保证可靠——删Cache失败时发MQ重试，保证最终删除。⑤TTL兜底——所有缓存设TTL，即使删除失败也会自然过期。⑥读修复——读到脏数据时检测版本号（Cache带数据版本），发现旧则触发更新。关键原则：缓存一致性不可能100%保证（分布式系统无完美一致），目标是缩短不一致窗口+保证最终收敛。业务上评估不一致的容忍度：商品价格等敏感数据用强一致策略（写时加分布式锁），商品描述等非敏感数据用最终一致即可。`,
    tags: ["多级缓存", "最终一致", "Canal", "延迟双删", "电商"],
  },
];
