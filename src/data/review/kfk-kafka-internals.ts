import type { ReviewQuestion } from "./types";

export const kfkKafkaInternalsQuestions: ReviewQuestion[] = [
  {
    id: "kfk-in-1",
    chapter: "kfk-kafka-internals",
    level: 1,
    question: `Kafka集群的成员管理机制是怎样的？Broker如何加入和退出集群？`,
    answer: `集群成员管理基于ZooKeeper/KRaft（2.8+）：①Broker启动时在ZK的/brokers/ids/[broker_id]创建临时节点（ephemeral），注册host/port/存储的分区信息；②ZK的临时节点特性——Broker与ZK的session断开时临时节点自动删除，其他Broker通过Watch感知成员变化；③Controller（控制器）监听/brokers/ids变化，当Broker加入/退出时由Controller负责分区Leader选举和副本重分配。Broker加入流程：启动→连ZK→注册临时节点→Controller感知→如果是新Broker且有未分配副本则分配。Broker退出流程：Broker崩溃或关闭→ZK session超时→临时节点删除→Controller感知→该Broker上的Leader分区需要选举新Leader（从ISR中选）→更新元数据通知所有Broker。KRaft模式（2.8+）用Kafka内部Raft共识替代ZK，Controller节点组成Raft组管理元数据，减少外部依赖。Controller是集群的大脑，只有一个Broker担任Controller，负责分区Leader选举、Broker上下线处理、Topic创建删除等管理操作。`,
    tags: ["集群成员管理", "Controller", "ZooKeeper", "KRaft"],
  },
  {
    id: "kfk-in-2",
    chapter: "kfk-kafka-internals",
    level: 2,
    question: `Kafka Controller的作用是什么？它是如何选举的？Controller故障会怎样？`,
    answer: `Controller作用：Controller是集群中唯一的管理者Broker，负责：①分区Leader选举——Broker宕机时为其上的Leader分区从ISR中选新Leader；②分区副本管理——新Broker上线时触发副本分配、Preferred Leader选举；③Topic管理——创建/删除Topic、增加分区；④Broker上下线感知——监听ZK的/brokers/ids变化。选举方式：①所有Broker启动时尝试在ZK的/controller节点创建临时节点，第一个成功的成为Controller；②其他Broker注册Watch监听/controller变化；③Controller崩溃→临时节点删除→其他Broker感知→竞争创建/controller→第一个成功的成为新Controller（抢占式选举）。Controller故障的影响：①Controller崩溃时集群仍可运行（已建立的Leader继续服务），但无法处理管理操作（分区选举、Topic创建）；②Controller切换期间短暂的管理真空，新Controller需从ZK加载全量集群状态恢复；③频繁Controller切换影响可用性，生产环境应确保Controller所在Broker稳定。KRaft模式下Controller通过Raft日志实现强一致选举，比ZK抢占式更稳定。`,
    tags: ["Controller", "Leader选举", "控制器故障"],
  },
  {
    id: "kfk-in-3",
    chapter: "kfk-kafka-internals",
    level: 2,
    question: `Kafka的请求处理流程是怎样的？网络线程和IO线程如何分工？`,
    answer: `Kafka Broker的请求处理采用Reactor多线程模型：①网络层——SocketServer的Acceptor线程监听端口，接受连接后轮询分配给Processor线程（网络线程num.network.threads）；②Processor线程——使用NIO Selector监听客户端连接的读写事件，读取请求放入RequestQueue（请求队列）；③IO线程（KafkaRequestHandler，num.io.threads）——从RequestQueue取出请求，调用对应的API处理（如ProduceRequest/FetchRequest/MetadataRequest），处理完后将响应放入对应Processor的ResponseQueue；④Processor线程——从ResponseQueue取出响应，通过NIO写回客户端。关键设计：①请求队列全局共享——所有Processor线程的请求放入同一个RequestQueue，IO线程竞争消费，实现负载均衡；②响应队列按Processor隔离——每个Processor有自己的ResponseQueue，避免响应发送时的竞争；③分离网络IO与业务处理——网络线程只做NIO读写，IO线程做磁盘IO和副本同步，互不阻塞。这种Reactor+Worker Pool模型使Kafka能高效处理大量并发连接。`,
    tags: ["请求处理", "Reactor", "网络线程", "IO线程"],
  },
  {
    id: "kfk-in-4",
    chapter: "kfk-kafka-internals",
    level: 3,
    question: `Kafka的物理存储中，消息格式是如何演进的？v2消息格式相比v1有哪些改进？`,
    answer: `消息格式演进：①v0（0.10前）——基本字段：offset+length+crc+magic+attributes+timestamp(可选)+key+value。无消息批次的压缩，每条消息独立压缩，效率低。②v1（0.10-0.11）——增加timestamp字段，支持LogAppendTime和CreateTime两种时间戳。仍是单条消息压缩。③v2（0.11+）——引入RecordBatch概念，多条消息（Record）打包成一个Batch，Batch级别共享元数据（ProducerID/Epoch/BaseSequence/压缩格式等），减少单条消息的元数据开销。v2改进：①批量压缩——整个Batch一次性压缩，相比v1每条单独压缩，压缩率大幅提升，减少存储和网络开销；②变长编码（Varint）——字段使用Varint编码，小数值占用更少字节（如offset delta用Varint），减少每条消息平均字节数；③幂等和事务支持——Batch头部携带PID+Epoch+BaseSequence，支持幂等生产和事务；④批内Offset增量——消息只存相对BaseOffset的增量，而非完整Offset。v2格式使Kafka在吞吐、压缩率、可靠性三方面同时提升，是生产环境推荐格式。`,
    tags: ["消息格式", "RecordBatch", "v2格式", "变长编码"],
  },
];
