import type { ReviewQuestion } from "./types";

export const rdiPubsubSentinelQuestions: ReviewQuestion[] = [
  {
    id: "rdi-ps-1",
    chapter: "rdi-pubsub-sentinel",
    level: 1,
    question: `频道订阅和模式订阅的底层数据结构有什么区别？PUBLISH时如何处理？`,
    answer: `频道订阅用字典pubsub_channels（channel→客户端链表）查找O(1)。模式订阅用链表pubsub_patterns（pattern+client*节点）匹配O(N)。PUBLISH channel message处理：①查pubsub_channels[channel]获取频道订阅者列表逐一推送message格式消息；②遍历pubsub_patterns链表对每个pattern用stringmatchlen匹配channel匹配的推送pmessage格式消息（含pattern+channel+message）。频道订阅高效因为字典O(1)查找，模式订阅性能差因为链表O(N)遍历——模式多时需遍历整个链表逐一匹配。`,
    tags: ["频道订阅", "模式订阅", "PUBLISH", "Pub/Sub"],
  },
  {
    id: "rdi-ps-2",
    chapter: "rdi-pubsub-sentinel",
    level: 2,
    question: `Sentinel如何发现其他Sentinel和从服务器？Pub/Sub在其中起什么作用？`,
    answer: `发现从服务器：Sentinel连接主服务器通过INFO命令获取从服务器列表（ip+port）为每个从创建连接每10秒INFO更新状态。发现其他Sentinel：Sentinel订阅主服务器的__sentinel__:hello频道每个Sentinel每2秒PUBLISH自身信息（IP/Port/Runid/纪元/主状态）到该频道其他Sentinel通过订阅消息发现彼此。Pub/Sub作用：①Sentinel间发现——通过__sentinel__:hello频道P2P发现无需中心化注册；②故障转移通知——从服务器也订阅__sentinel__:hello接收新主信息；③客户端通知——PUBLISH +switch-master通知客户端主切换。Pub/Sub是Sentinel去中心化自动发现和通知的核心通信机制。`,
    tags: ["Sentinel", "发现机制", "__sentinel__:hello", "Pub/Sub"],
  },
  {
    id: "rdi-ps-3",
    chapter: "rdi-pubsub-sentinel",
    level: 2,
    question: `Sentinel故障转移中选新主的规则是什么？为什么需要这些规则？`,
    answer: `选新主规则（按优先级排序）：①过滤不健康从——排除主观下线的从/最近5秒未回复INFO的从/与旧主断开超过down-after*10的从；②slave-priority最小优先——运维手动配置值越小优先级越高0表示永不被选；③复制偏移量最大优先——偏移量最大数据最新丢失最少；④runid字典序最小——以上都相同时的兜底保证确定性。需要这些规则的原因：①过滤不健康从避免选到有问题的从；②优先级让运维根据硬件配置优先选高性能机器；③偏移量保证数据最新丢失最少；④runid兜底所有条件相同时需确定性排序避免选举分歧。`,
    tags: ["故障转移", "选新主", "slave-priority", "复制偏移量"],
  },
  {
    id: "rdi-ps-4",
    chapter: "rdi-pubsub-sentinel",
    level: 3,
    question: `Pub/Sub有哪些限制？为什么不适合做消息队列？Redis Stream如何解决这些问题？`,
    answer: `Pub/Sub限制：①消息不持久化——发布时订阅者离线则消息直接丢弃无法补发；②无ACK机制——发布者不知道订阅者是否收到无重试保障；③消息堆积风险——订阅者处理慢时输出缓冲区溢出可能连接被断开。不适合做消息队列因为消息队列需可靠投递(ACK+重试)、消息持久化(宕机不丢)、消费者组(多消费者负载均衡)、消息回溯(重新消费)Pub/Sub都不支持。Redis Stream(5.0+)解决：①消息持久化——Stream是数据类型写入即持久化；②消费者组——XGROUP创建多消费者负载均衡；③ACK确认——XPENDING查看未确认XACK确认消费；④消息回溯——XRANGE按ID范围读取历史。Stream是Redis内置轻量级消息队列方案。`,
    tags: ["Pub/Sub限制", "消息队列", "Stream", "ACK"],
  },
];
