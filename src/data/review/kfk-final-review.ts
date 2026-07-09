import type { ReviewQuestion } from "./types";

export const kfkFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "kfk-fr-1",
    chapter: "kfk-final-review",
    level: 1,
    question: "从数据模型到可靠性再到流处理，Kafka的每个核心概念如何串成完整体系？",
    answer: "Kafka知识体系串联：①数据模型层——Topic（逻辑分类）→Partition（物理分片+并行单元）→Offset（分区内序号+消费位置）→Segment（磁盘存储单元+顺序追加写）。数据模型解决「数据怎么存」。②生产消费层——Producer（消息发送+分区器+序列化+acks可靠性）→Consumer Group（消费者组+分区分配+再均衡+Offset提交语义）。生产消费解决「数据怎么流转」。③可靠性层——Replica（副本+复制因子）→ISR（同步副本集合+HW可见性）→acks（写入确认语义）→Controller（集群管理+Leader选举）。可靠性解决「怎么不丢数据」。④内部原理层——Reactor请求处理（网络线程+IO线程分离）+消息格式v2（RecordBatch批量+变长编码）+ZK/KRaft集群管理。内部原理解决「Kafka怎么高效跑」。⑤进阶层——Streams（KStream/KTable+状态存储+窗口）+Connect（Source/Sink数据集成）+Admin（监控+安全+扩缩容）。进阶解决「流处理+数据集成+运维」。五层层层递进，数据模型是基础，生产消费是核心，可靠性是保障，内部原理是深层理解，进阶是生产级使用。",
    tags: ["知识串联", "全书复习", "体系架构"],
  },
  {
    id: "kfk-fr-2",
    chapter: "kfk-final-review",
    level: 2,
    question: "Kafka高吞吐的四大技术基石是什么？它们如何协同实现百万级消息/秒的吞吐？",
    answer: "四大基石：①顺序磁盘I/O——消息以追加方式写入Partition的Segment日志文件，顺序写磁盘速度可达百MB/s（接近内存随机写速度），避免随机寻道开销。相比传统消息队列的随机写/内存存储，Kafka的顺序写既保证了持久化又不牺牲写入速度。②零拷贝（sendfile）——消费者Fetch请求时，Broker通过Linux sendfile系统调用，数据从页缓存（Page Cache）直接通过DMA拷贝到网卡，跳过用户空间拷贝（传统read+write需4次拷贝+2次系统调用，sendfile只需2次拷贝+1次系统调用），CPU开销极低。③分区并行——Topic分为多个Partition分布在不同Broker上，生产者可并行写不同分区，消费者组内不同消费者并行消费不同分区，吞吐随分区数和Broker数线性扩展。④批处理与压缩——Producer将消息批量发送（batch.size+linger.ms），Broker批量写入，减少网络往返和磁盘IO次数；批级别压缩（snappy/lz4/zstd/gzip）减少网络传输和存储体积，整批一次压缩效率远高于单条压缩。协同：顺序写保证单分区高写入吞吐→零拷贝保证高读取吞吐且低CPU→分区并行实现水平扩展→批处理+压缩提升单分区有效吞吐。四者叠加使单Broker吞吐可达数十万~百万消息/秒。",
    tags: ["高吞吐", "顺序IO", "零拷贝", "分区并行", "批处理"],
  },
  {
    id: "kfk-fr-3",
    chapter: "kfk-final-review",
    level: 3,
    question: "一个消息从生产者发送到消费者处理完成，经历哪些环节？哪些环节可能丢数据或重复？如何全链路保证不丢不重？",
    answer: "全链路环节：①Producer构造消息→序列化→分区器→累加器batch→Sender线程发送ProduceRequest→②网络传输→③Broker Leader追加写入日志→④Follower从Leader Fetch同步→⑤Leader等ISR确认（acks=all）→HW推进→⑥Broker返回ProduceResponse→⑦Producer收到响应/回调。消费链路：⑧Consumer poll()发送FetchRequest→⑨Broker返回HW以下的消息→⑩Consumer处理消息→⑪Consumer提交Offset到__consumer_offsets。可能丢/重环节：①生产端丢——acks=0/1时Leader宕机未同步；网络故障消息未达Broker；Producer缓冲区满消息被丢弃。②Broker端丢——unclean leader election选了滞后副本；磁盘故障；ISR为空。③消费端丢——自动提交Offset后处理失败崩溃（消息丢了但Offset已提交）。④重复——生产端retries导致重发；消费端处理完崩溃Offset未提交（重启重消费）。全链路不丢不重配置：①生产端——acks=all+min.insync.replicas=2+replication.factor=3+enable.idempotence=true+retries=MAX+max.in.flight≤5+delivery.timeout.ms控制总超时。②Broker端——unclean.leader.election.enable=false+replica.lag.time.max.ms合理+min.insync.replicas≥2。③消费端——enable.auto.commit=false+手动commitSync()在处理完成后提交+幂等消费（业务层去重）。④Kafka内部Exactly-Once——transactional.id+consume-transform-produce事务+isolation.level=read_committed。⑤外部系统——业务幂等（唯一键/去重表）或事务性Sink（Connect的Exactly-Once Sink）。",
    tags: ["全链路", "不丢不重", "Exactly-Once", "幂等"],
  },
  {
    id: "kfk-fr-4",
    chapter: "kfk-final-review",
    level: 4,
    question: "综合分析：某Kafka集群出现消费者延迟持续增长，请从生产、Broker、消费三个层面给出系统性排查思路。",
    answer: "系统性排查思路：①消费层面——先确认是否消费速度不足。检查records-lag-max趋势：如果lag持续增长说明消费速度跟不上生产速度。排查：a.消费者数是否足够（消费者数&lt;分区数则增加消费者）；b.单条消息处理耗时是否过长（优化处理逻辑、异步化、批量处理）；c.max.poll.records是否合理（每次poll太多导致处理超时触发再均衡，调小或增大max.poll.interval.ms）；d.是否频繁再均衡（检查session.timeout.ms/heartbeat.interval.ms/max.poll.interval.ms，排除消费者崩溃或处理超时）；e.消费者GC停顿（检查JVM GC日志，是否有Full GC/长STW）。②Broker层面——检查Broker是否有性能瓶颈。a.UnderReplicatedPartitions是否&gt;0（副本同步滞后占用资源）；b.磁盘IO是否瓶颈（iostat检查%util/await，SSD vs HDD）；c.网络带宽是否打满（网卡流量监控）；d.IO线程/网络线程是否空闲率低（RequestHandlerAvgIdlePercent低说明IO线程不够）；e.Broker间是否有慢节点（某Broker处理慢拖累整体）。③生产层面——检查生产速度是否突增。a.记录发送速率是否有峰值（record-send-rate突增超过消费能力）；b.是否大批量写入（批量任务/数据迁移突增）；c.消息体积是否异常增大（某Topic消息变大导致IO增多）。④综合判断——对比生产速率vs消费速率，如果生产速率正常但消费lag增长→消费端问题；如果生产速率突增→考虑临时扩消费者或限流生产；如果Broker资源瓶颈→扩容Broker或优化配置。⑤根因定位——使用Kafka Manager/Burrow/Cruise Control等工具可视化lag分布，定位是全分区lag还是个别分区lag（个别分区可能是数据倾斜或某消费者处理慢）。",
    tags: ["综合分析", "消费延迟", "排查思路", "性能调优"],
  },
];
