import type { ReviewQuestion } from "./types";

export const rmqHighAvailabilityQuestions: ReviewQuestion[] = [
  {
    id: "rmq-ha-1",
    chapter: "rmq-high-availability",
    level: 1,
    question: `镜像队列的故障切换流程是什么？选举新Master的规则是什么？`,
    answer: `故障切换流程：①正常运行——Master节点处理所有读写，Slave节点同步Master的消息副本；②Master宕机——集群检测到Master节点离线（通过心跳超时），触发Master选举；③选举新Master——选择最旧的Slave（运行时间最长、数据最完整的Slave）升级为新Master。选择最旧Slave的原因：运行时间最长的Slave与Master同步的时间最长，数据最完整，丢失最少；④恢复服务——客户端通过自动重连机制连接到新Master继续生产/消费，其他Slave继续与新Master同步。Node A恢复后作为Slave重新加入集群并同步数据。数据丢失风险：如果所有Slave都完成了同步（ha-sync-mode=automatic），故障切换无数据丢失；如果Slave异步同步未完成（ha-sync-mode=manual），未同步的消息会丢失。Quorum Queue的故障切换基于Raft Leader选举——Leader宕机后多数派节点自动选出新Leader，更快速且保证强一致性，无数据丢失。`,
    tags: ["故障切换", "Master选举", "镜像队列", "Quorum Queue"],
  },
  {
    id: "rmq-ha-2",
    chapter: "rmq-high-availability",
    level: 2,
    question: `Federation和Shovel有什么区别？分别适用于什么场景？`,
    answer: `Federation和Shovel都是跨集群消息同步方案，但机制和适用场景不同：①同步粒度——Federation是Exchange/Queue级别的松耦合联邦，上游Exchange/Queue的消息自动复制到下游；Shovel是精确的点对点搬运，从指定源Queue消费消息发布到指定目标Exchange。②耦合度——Federation松耦合，配置federation-upstream后自动路由，不需要指定具体Queue到Queue的映射；Shovel紧耦合，需要明确指定源Queue和目标Exchange。③灵活性——Federation自动维护路由关系，增加下游只需要新建联邦关系；Shovel更灵活，支持消息过滤和转换。④协议——Federation仅支持AMQP；Shovel支持跨协议（AMQP/STOMP/MQTT）。⑤动态性——Shovel支持动态创建/删除（运行时API），Federation通过policy配置。适用场景：Federation适合跨机房WAN消息同步、多区域消息聚合、松耦合系统集成。Shovel适合精确消息迁移（集群迁移）、灾备恢复（主到备）、协议转换、消息过滤和转换。`,
    tags: ["Federation", "Shovel", "跨集群", "联邦", "消息同步"],
  },
  {
    id: "rmq-ha-3",
    chapter: "rmq-high-availability",
    level: 2,
    question: `什么是脑裂？RabbitMQ如何防护脑裂？`,
    answer: `脑裂（Split-Brain）：网络分区导致集群节点间通信中断，节点无法判断对方是真正宕机还是网络问题。可能出现的后果：两个独立子集群各自认为对方已宕机，各自选举Master/Leader，各自处理消息写入，导致数据不一致——网络恢复后两边的数据冲突难以合并。RabbitMQ防护脑裂的三种策略（cluster_partition_handling配置）：①pause-minority（推荐）——少数派节点检测到网络分区后自动暂停服务（关闭所有AMQP操作），只有多数派子集群继续运行。网络恢复后少数派节点重新与多数派同步。保证多数派数据一致，牺牲少数派可用性。②pause_if_all_down——所有指定trusted_nodes不可用时才暂停。比pause-minority更宽松，但需要正确配置trusted_nodes列表。③ignore（不推荐）——忽略网络分区继续运行，可能导致脑裂和数据不一致。配置方式：在rabbitmq.conf中设置cluster_partition_handling = pause_minority。Quorum Queue基于Raft协议天然避免脑裂：少数派节点无法达成多数派写入确认，自动不可写，无需额外配置。`,
    tags: ["脑裂", "Split-Brain", "pause-minority", "网络分区", "Raft"],
  },
  {
    id: "rmq-ha-4",
    chapter: "rmq-high-availability",
    level: 3,
    question: `如何为一个跨机房的生产系统设计高可用方案？`,
    answer: `跨机房高可用设计方案：①单机房内高可用——每个机房部署RabbitMQ集群（3+节点），使用Quorum Queue保证数据安全和无脑裂。至少2个Disk Node保证元数据安全。配置pause-minority策略（如果用Classic镜像队列）。②跨机房消息同步——机房A和机房B之间使用Federation联邦或Shovel搬运。Federation适合松耦合的消息聚合（如多机房日志汇聚到中心机房），配置federation-upstream指定上游URI，通过policy自动联邦。Shovel适合精确的关键业务消息同步（如订单消息从主机房同步到灾备机房），配置源Queue到目标Exchange的精确搬运。③灾备策略——主机房生产消息，灾备机房通过Shovel实时同步。主机房故障时切换到灾备机房，消费者连接灾备机房继续消费。④网络要求——跨机房WAN网络延迟较高，Federation和Shovel都支持异步同步，不会阻塞生产者。配置合理的连接超时和重试。⑤监控告警——监控联邦/Shovel连接状态、同步延迟、消息积压。联邦断开或同步延迟超阈值时告警。总结：单机房Quorum Queue保证数据安全，跨机房Federation/Shovel实现消息同步，灾备机房保证业务连续性。`,
    tags: ["高可用", "跨机房", "Federation", "Shovel", "灾备", "Quorum Queue"],
  },
];
