import type { ReviewQuestion } from "./types";

export const rmqClusteringQuestions: ReviewQuestion[] = [
  {
    id: "rmq-cl-1",
    chapter: "rmq-clustering",
    level: 1,
    question: `RabbitMQ集群中Disk Node和RAM Node有什么区别？为什么集群至少需要一个Disk Node？`,
    answer: `Disk Node将集群元数据（Exchange/Queue/Binding/用户/VHost定义）持久化到磁盘，Broker重启后元数据不丢失。RAM Node将元数据仅保存在内存中，重启后元数据丢失需要从其他节点同步，但性能略高（省去磁盘写入开销）。集群至少需要一个Disk Node的原因：①元数据安全——如果所有节点都是RAM Node，集群整体重启后所有元数据（Exchange/Queue/Binding/用户权限）全部丢失，需要重新声明所有资源；②集群恢复——集群重启时，Disk Node上的元数据用于恢复集群状态，RAM Node从Disk Node同步元数据。实践建议：生产集群至少2个Disk Node（防单点故障），其余可为RAM Node提升性能。集群中Disk Node的数量不影响消息数据的持久化——消息持久化由消息的delivery_mode和Queue的durable决定，与节点类型无关。`,
    tags: ["集群", "Disk Node", "RAM Node", "元数据", "节点类型"],
  },
  {
    id: "rmq-cl-2",
    chapter: "rmq-clustering",
    level: 2,
    question: `镜像队列的Master-Slave工作原理是什么？如何配置？`,
    answer: `镜像队列工作原理：Master节点上的Queue处理所有读写操作——生产者写入消息到Master，消费者从Master消费，Master将消息同步到所有Slave节点。Slave只是消息的副本，不直接处理客户端请求。当Master宕机时，最旧的Slave（数据最完整的）自动升级为新Master，客户端自动重连到新Master继续服务。配置方式：通过policy设置——rabbitmqctl set_policy ha-all '^order\\.' '{\"ha-mode\":\"all\",\"ha-sync-mode\":\"automatic\"}'。ha-mode:all镜像到所有节点，exactly:N镜像到N个节点，nodes:[\"node-a\",\"node-b\"]镜像到指定节点。ha-sync-mode:automatic新Slave同步完成后才可用（安全但慢），manual异步同步（快但数据可能滞后）。缺点：①Master是单点瓶颈，所有写操作经过Master；②异步同步模式下Slave数据可能滞后于Master；③网络分区时有脑裂风险，可能出现两个Master导致数据不一致。`,
    tags: ["镜像队列", "Master-Slave", "policy", "ha-mode", "故障切换"],
  },
  {
    id: "rmq-cl-3",
    chapter: "rmq-clustering",
    level: 2,
    question: `Quorum Queue相比Classic镜像队列有什么优势？为什么推荐使用？`,
    answer: `Quorum Queue基于Raft共识协议，优势：①无脑裂——Raft协议要求多数派写入确认，网络分区时少数派节点自动暂停服务（不提供读写），不会出现两个Leader，从根本上避免脑裂。Classic镜像队列需要额外配置pause-minority策略才能防护脑裂。②强一致性——Raft保证已确认的消息在多数派节点上都持久化，Leader切换时不会丢数据。Classic镜像队列异步同步模式下Slave可能滞后，Master宕机时未同步的消息会丢失。③自动Leader选举——Leader宕机后Raft协议自动从多数派中选举新Leader，恢复快速且安全。④无Master瓶颈——虽然实际仍是Leader处理写操作，但Raft的日志复制比Classic镜像更高效。限制：①仅支持持久化消息（delivery_mode强制为2），不支持非持久化高性能场景；②不支持exclusive和auto-delete队列；③内存开销略高（维护Raft日志）；④需要RabbitMQ 3.8+。推荐新系统首选Quorum Queue，老系统逐步迁移。仅需要非持久化极致性能的场景才使用Classic镜像队列。`,
    tags: ["Quorum Queue", "Raft", "脑裂", "强一致性", "Classic镜像队列"],
  },
  {
    id: "rmq-cl-4",
    chapter: "rmq-clustering",
    level: 3,
    question: `RabbitMQ集群中，消息数据是共享在所有节点上的吗？如何实现消息的冗余和高可用？`,
    answer: `RabbitMQ集群中消息默认不共享——每个Queue只存在于声明它时所在的节点上，消息只存储在该节点的Queue中。集群共享的是元数据（Exchange/Binding/用户/VHost定义），不是消息数据。这意味着：①如果Queue所在节点宕机且没有镜像，该Queue上的消息不可用，直到节点恢复；②集群扩展提高的是路由能力和连接容量，不是单个Queue的存储容量。实现消息冗余和高可用有两种方式：①Classic镜像队列——通过policy配置ha-mode，Master-Slave模式将消息复制到多个节点，Master宕机Slave升主。缺点是有脑裂风险和Master瓶颈。②Quorum Queue——基于Raft协议，多数派写入确认，无脑裂，推荐新系统使用。两种方式都是队列级别的冗余（将同一个Queue的消息复制到多个节点），不是集群级别的共享。消费者连接集群中任意节点都能消费到Queue的消息——如果连接的节点不是Queue所在节点，RabbitMQ会通过集群内部通信将消息转发给消费者。`,
    tags: ["集群", "消息共享", "镜像队列", "Quorum Queue", "高可用"],
  },
];
