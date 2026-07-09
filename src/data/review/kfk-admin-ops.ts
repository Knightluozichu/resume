import type { ReviewQuestion } from "./types";

export const kfkAdminOpsQuestions: ReviewQuestion[] = [
  {
    id: "kfk-ad-1",
    chapter: "kfk-admin-ops",
    level: 1,
    question: "Kafka的主题管理操作有哪些？创建Topic时需要指定哪些关键参数？",
    answer: "主题管理操作：创建Topic（kafka-topics.sh --create）、查看Topic列表（--list）、查看Topic详情（--describe）、修改Topic配置（--alter）、删除Topic（--delete）、增加分区（--alter --partitions）。创建Topic关键参数：①--partitions——分区数，决定并行度和最大消费者数，创建后只能增加不能减少；②--replication-factor——副本因子，决定容错能力（=能容忍的Broker故障数+1），生产环境≥3；③--config——Topic级覆盖配置，如retention.ms/cleanup.policy/min.insync.replicas。kafka-topics.sh --create --topic my-topic --partitions 6 --replication-factor 3 --config retention.ms=86400000。--describe显示：PartitionCount/ReplicationFactor/每个分区的Leader和AR（Assigned Replicas）和ISR（In-Sync Replicas）。增加分区注意：新增分区只对新消息生效，已有消息不会重新分配；如果Topic用key分区，增加分区会破坏key到分区的映射（同一key可能进不同分区），有序性保证受影响。建议创建时预留足够分区。删除Topic需设置delete.topic.enable=true（默认true），删除是异步的（标记删除，后台清理）。",
    tags: ["主题管理", "创建Topic", "分区数", "副本因子"],
  },
  {
    id: "kfk-ad-2",
    chapter: "kfk-admin-ops",
    level: 2,
    question: "Kafka的生产环境监控需要关注哪些核心指标？如何排查常见问题？",
    answer: "核心监控指标分四类：①Broker级——UnderReplicatedPartitions（欠副本分区数，应=0，&gt;0说明有副本同步滞后）、ActiveControllerCount（Controller数，应=1）、OfflinePartitionsCount（离线分区数，应=0，&gt;0说明有无Leader分区）、BytesInPerSec/BytesOutPerSec（吞吐）、NetworkProcessorAvgIdlePercent（网络线程空闲率）、RequestHandlerAvgIdlePercent（IO线程空闲率）。②Topic/Partition级——MessagesInPerSec（每秒消息数）、Size（分区大小）、ISRShrink/ISRExpandRate（ISR变化频率）。③Producer级——record-send-rate（发送速率）、record-error-rate（错误率，应=0）、request-latency-avg（请求延迟）、compression-rate（压缩率）。④Consumer级——records-lag-max（最大滞后量，反映消费速度是否跟上生产速度）、records-consumed-rate（消费速率）、commit-latency-avg（Offset提交延迟）、rebalance-rate-per-hour（再均衡频率，应低）。常见问题排查：①消费滞后——检查records-lag-max，增加消费者数或优化处理逻辑；②副本不同步——检查UnderReplicatedPartitions，排查网络/磁盘/CPU瓶颈；③请求延迟高——检查IO线程/网络线程空闲率，是否磁盘IO瓶颈；④Controller频繁切换——检查Controller所在Broker稳定性，ZK连接是否稳定。JMX通过kafka.tools.JmxTool或Prometheus+JMX Exporter采集。",
    tags: ["监控", "指标", "UnderReplicatedPartitions", "消费滞后"],
  },
  {
    id: "kfk-ad-3",
    chapter: "kfk-admin-ops",
    level: 2,
    question: "Kafka的安全机制有哪些？SASL和ACL分别解决什么问题？",
    answer: "Kafka安全三要素：①认证（Authentication）——SASL验证客户端身份；②授权（Authorization）——ACL控制客户端能做什么操作；③加密（Encryption）——SSL/TLS加密传输。SASL（Simple Authentication and Security Layer）：①SASL/PLAIN——用户名+密码明文，需配合SSL加密传输（否则密码明文暴露），适合简单场景；②SASL/SCRAM——用户名+密码，密码不在Broker存储明文（SCRAM-SHA-256/512哈希），存储在ZK，支持动态增删用户，适合生产环境；③SASL/GSSAPI（Kerberos）——集成企业Kerberos/AD，适合已有Kerberos基础设施的环境；④SASL/OAUTHBEARER——OAuth 2.0令牌认证，适合云原生环境。ACL（Access Control List）：授权控制，格式为--allow-principal User:alice --operation Read --topic my-topic。操作类型：Read/Write/Create/Delete/Alter/Describe/ClusterAction等。资源类型：Topic/Cluster/Group/TransactionalId。配置authorizer.class.name=kafka.security.authorizer.AclAuthorizer启用。生产环境推荐：SASL/SCRAM+SSL加密+ACL细粒度授权+最小权限原则。Delegation Token（委托令牌）可减少认证开销（令牌缓存，定期续期）。",
    tags: ["安全", "SASL", "ACL", "认证授权"],
  },
  {
    id: "kfk-ad-4",
    chapter: "kfk-admin-ops",
    level: 3,
    question: "Kafka集群扩容和缩容时如何操作？数据迁移过程中如何保证不影响生产？",
    answer: "扩容操作：①新增Broker——启动新Broker，注册到ZK，自动加入集群但不会自动获得已有分区的副本（新Broker只处理新Topic或后续分配）；②数据迁移——需要手动执行reassignment将部分分区副本迁移到新Broker：生成迁移计划（kafka-reassign-partitions.sh --generate生成当前分配+目标分配JSON）→执行迁移（--execute，按目标JSON将副本迁移到新Broker，过程中新增副本从Leader同步数据）→验证（--verify检查迁移进度）；③Preferred Leader选举——迁移完成后执行preferred election让Leader分布到新Broker均衡负载。缩容操作：①生成缩容计划——将待下线Broker上的分区副本迁移到其他Broker（同reassign流程）；②等待迁移完成——verify确认所有副本已迁移，待下线Broker上无Leader分区；③优雅关闭——待下线Broker执行优雅停机（controlled.shutdown），Leader先转移到其他Broker再关闭。保证不影响生产的关键：①迁移限流——reassignment过程中设置限流（inter.broker.replica.follower.throttled.rate/leader.throttled.rate），控制副本同步带宽，避免占用网络影响生产；②分批迁移——不要一次迁移太多分区，分批小步快跑；③监控——迁移期间监控UnderReplicatedPartitions和延迟，异常立即暂停。迁移本质是新副本从Leader全量+增量同步数据，期间老副本继续服务不中断。",
    tags: ["扩容", "缩容", "数据迁移", "reassignment"],
  },
];
