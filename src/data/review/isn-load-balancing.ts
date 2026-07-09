import type { ReviewQuestion } from "./types";

export const isnLoadBalancingQuestions: ReviewQuestion[] = [
  {
    id: "isn-lb-1",
    chapter: "isn-load-balancing",
    level: 1,
    question: "L4和L7负载均衡的核心区别是什么？",
    answer: "L4和L7核心区别：①工作层——L4工作在传输层基于IP+端口转发，L7工作在应用层基于HTTP内容（URL/Header/Cookie）路由 ②性能——L4只看IP+端口性能高，L7需解析HTTP报文性能较低 ③灵活性——L4无法基于内容路由，L7可按路径/域名分发、支持SSL终结 ④代表——L4代表LVS，L7代表Nginx。",
    tags: ["L4", "L7", "负载均衡对比"],
  },
  {
    id: "isn-lb-2",
    chapter: "isn-load-balancing",
    level: 2,
    question: "五大调度算法各有什么特点？加权轮询和一致性哈希分别解决什么问题？",
    answer: "五大调度算法：①轮询——按顺序依次分配，简单公平但不考虑服务器差异 ②加权轮询——按权重比例分配，适配异构服务器 ③最少连接——分配给连接数最少的，自适应负载 ④IP哈希——相同IP固定到同一服务器，实现会话保持但扩缩容时打乱 ⑤一致性哈希——环形哈希空间+虚拟节点，增减节点影响小。加权轮询解决「服务器性能不同」的问题。一致性哈希解决「服务器增减时大量请求重新映射」的问题。",
    tags: ["调度算法", "加权轮询", "一致性哈希"],
  },
  {
    id: "isn-lb-3",
    chapter: "isn-load-balancing",
    level: 3,
    question: "健康检查的方式有哪些？生产环境为什么要「快速剔除、慢速恢复」？",
    answer: "健康检查方式：①TCP检查——尝试建立TCP连接，成功=健康，粒度粗 ②HTTP检查——发HTTP请求，2xx/3xx=健康，粒度细 ③自定义脚本——执行检测脚本，粒度最细。「快速剔除、慢速恢复」的原因：快速剔除（1次失败即剔除）是为了避免把请求发给已经故障的服务器导致用户报错；慢速恢复（连续3次成功才恢复）是因为服务器可能只是短暂抖动（如GC停顿），立即恢复可能导致请求打过去又失败，造成用户反复看到错误。慢速恢复确保服务器真正稳定后才重新分发流量。",
    tags: ["健康检查", "故障剔除", "恢复策略"],
  },
  {
    id: "isn-lb-4",
    chapter: "isn-load-balancing",
    level: 4,
    question: "会话保持的两种方案是什么？分析它们在服务器扩缩容场景下的表现。",
    answer: "两种会话保持方案：①Cookie植入——LB在响应中插入Cookie标记服务器（如server=S1），下次请求携带Cookie，LB据此分发到同一服务器。优点简单不依赖IP，缺点用户禁用Cookie则失效。②Session共享——Session存到Redis等共享存储，任意服务器可读。优点无状态可扩容，缺点需引入Redis依赖。扩缩容场景分析：Cookie植入在扩容时无影响（新服务器自然加入轮询），缩容时如果标记的服务器被移除，该用户Session丢失需重新登录。Session共享在扩缩容时完全无影响——Session在Redis中不随服务器变化，是最适合弹性伸缩的方案。生产环境推荐Session共享。",
    tags: ["会话保持", "Cookie植入", "Session共享", "扩缩容"],
  },
];
