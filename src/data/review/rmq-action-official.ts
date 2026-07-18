import type { ReviewQuestion } from "../review-questions";

export const rmqActionOfficialQuestions: ReviewQuestion[] = [
  {
    id: "rmq-official-learning-map-q1",
    chapter: "rmq-official-learning-map",
    level: 1,
    question: "为什么“原书权威学习地图”必须覆盖15个目录节点？",
    answer:
      "这些节点共同组成“沿12章与3个附录建立从AMQP消息基础、模式编码、集群故障到管理监控、安全插件和跨语言客户端的完整路线”的拓扑、状态与证据链；漏项会使17页路线、完整目录映射、版本边界、依赖图与全书验收清单无法独立复现。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "原书权威学习地图", "RabbitMQ 2.7"],
  },
  {
    id: "rmq-official-learning-map-q2",
    chapter: "rmq-official-learning-map",
    level: 1,
    question: "“原书权威学习地图”的最小不变量是什么？",
    answer:
      "15个正式单元、全部160个章/附录/节节点、实验与证据逐一可达，课程固定RabbitMQ 2.7时代且不混入后来的实现；需要版本、拓扑、confirm/ack轨迹、指标、故障和消息对账共同证明。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "原书权威学习地图", "AMQP 0-9-1"],
  },
  {
    id: "rmq-official-learning-map-q3",
    chapter: "rmq-official-learning-map",
    level: 2,
    question: "怎样为“原书权威学习地图”构造单变量反例？",
    answer:
      "固定消息、vhost、交换器、队列与路由键，只改变持久化、confirm、ack、消费者速度、节点或网络故障之一，再比较broker状态与最终消息集合。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "原书权威学习地图", "消息模式"],
  },
  {
    id: "rmq-official-learning-map-q4",
    chapter: "rmq-official-learning-map",
    level: 2,
    question: "“原书权威学习地图”为什么必须固定RabbitMQ 2.7？",
    answer:
      "原书以2.7.0为写作基线；后来的队列类型、插件、CLI与集群行为只能作为差异材料，不能替代“沿12章与3个附录建立从AMQP消息基础、模式编码、集群故障到管理监控、安全插件和跨语言客户端的完整路线”的正式分母。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "原书权威学习地图", "经典镜像队列"],
  },
  {
    id: "rmq-official-learning-map-q5",
    chapter: "rmq-official-learning-map",
    level: 3,
    question: "如何验证“原书权威学习地图”的性能与交付语义？",
    answer:
      "固定消息大小、路由分布、拓扑与可靠语义，测吞吐、P50/P95/P99、ready/unacked、内存、进程、网络和磁盘，并独立对账。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "原书权威学习地图", "插件系统"],
  },
  {
    id: "rmq-official-learning-map-q6",
    chapter: "rmq-official-learning-map",
    level: 3,
    question: "“原书权威学习地图”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、AMQP拓扑、17页路线、完整目录映射、版本边界、依赖图与全书验收清单、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "原书权威学习地图", "RabbitMQ 2.7"],
  },
  {
    id: "rmq-01-pulling-rabbit-out-of-hat-q1",
    chapter: "rmq-01-pulling-rabbit-out-of-hat",
    level: 1,
    question: "为什么“第1章 天降奇兵”必须覆盖10个目录节点？",
    answer:
      "这些节点共同组成“从消息系统历史、AMQP开放协议、RabbitMQ选择与UNIX安装建立RabbitMQ 2.7时代的运行基线”的拓扑、状态与证据链；漏项会使消息系统比较、AMQP定位、RabbitMQ 2.7安装记录、首次启动日志与版本边界表无法独立复现。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第1章 天降奇兵", "消息通信"],
  },
  {
    id: "rmq-01-pulling-rabbit-out-of-hat-q2",
    chapter: "rmq-01-pulling-rabbit-out-of-hat",
    level: 1,
    question: "“第1章 天降奇兵”的最小不变量是什么？",
    answer:
      "Erlang、RabbitMQ 2.7、节点名、cookie、目录和监听端口可由新主机复现，协议与版本结论不越过2012年原书边界；需要版本、拓扑、confirm/ack轨迹、指标、故障和消息对账共同证明。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第1章 天降奇兵", "AMQP"],
  },
  {
    id: "rmq-01-pulling-rabbit-out-of-hat-q3",
    chapter: "rmq-01-pulling-rabbit-out-of-hat",
    level: 2,
    question: "怎样为“第1章 天降奇兵”构造单变量反例？",
    answer:
      "固定消息、vhost、交换器、队列与路由键，只改变持久化、confirm、ack、消费者速度、节点或网络故障之一，再比较broker状态与最终消息集合。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第1章 天降奇兵", "RabbitMQ 2.7"],
  },
  {
    id: "rmq-01-pulling-rabbit-out-of-hat-q4",
    chapter: "rmq-01-pulling-rabbit-out-of-hat",
    level: 2,
    question: "“第1章 天降奇兵”为什么必须固定RabbitMQ 2.7？",
    answer:
      "原书以2.7.0为写作基线；后来的队列类型、插件、CLI与集群行为只能作为差异材料，不能替代“从消息系统历史、AMQP开放协议、RabbitMQ选择与UNIX安装建立RabbitMQ 2.7时代的运行基线”的正式分母。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第1章 天降奇兵", "Erlang"],
  },
  {
    id: "rmq-01-pulling-rabbit-out-of-hat-q5",
    chapter: "rmq-01-pulling-rabbit-out-of-hat",
    level: 3,
    question: "如何验证“第1章 天降奇兵”的性能与交付语义？",
    answer:
      "固定消息大小、路由分布、拓扑与可靠语义，测吞吐、P50/P95/P99、ready/unacked、内存、进程、网络和磁盘，并独立对账。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第1章 天降奇兵", "节点"],
  },
  {
    id: "rmq-01-pulling-rabbit-out-of-hat-q6",
    chapter: "rmq-01-pulling-rabbit-out-of-hat",
    level: 3,
    question: "“第1章 天降奇兵”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、AMQP拓扑、消息系统比较、AMQP定位、RabbitMQ 2.7安装记录、首次启动日志与版本边界表、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第1章 天降奇兵", "消息通信"],
  },
  {
    id: "rmq-02-understanding-messaging-q1",
    chapter: "rmq-02-understanding-messaging",
    level: 1,
    question: "为什么“第2章 理解消息通信”必须覆盖8个目录节点？",
    answer:
      "这些节点共同组成“沿生产者、消费者、队列、交换器、绑定、虚拟主机、持久化和发送方确认重建一条消息的一生”的拓扑、状态与证据链；漏项会使AMQP拓扑图、消息生命周期、持久化组合实验、发送方确认轨迹与消息ID对账无法独立复现。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第2章 理解消息通信", "生产者"],
  },
  {
    id: "rmq-02-understanding-messaging-q2",
    chapter: "rmq-02-understanding-messaging",
    level: 1,
    question: "“第2章 理解消息通信”的最小不变量是什么？",
    answer:
      "交换器按类型和绑定路由，队列所有权与隔离明确，durable、persistent、ack和publisher confirm各自只证明自己的边界；需要版本、拓扑、confirm/ack轨迹、指标、故障和消息对账共同证明。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第2章 理解消息通信", "消费者"],
  },
  {
    id: "rmq-02-understanding-messaging-q3",
    chapter: "rmq-02-understanding-messaging",
    level: 2,
    question: "怎样为“第2章 理解消息通信”构造单变量反例？",
    answer:
      "固定消息、vhost、交换器、队列与路由键，只改变持久化、confirm、ack、消费者速度、节点或网络故障之一，再比较broker状态与最终消息集合。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第2章 理解消息通信", "交换器"],
  },
  {
    id: "rmq-02-understanding-messaging-q4",
    chapter: "rmq-02-understanding-messaging",
    level: 2,
    question: "“第2章 理解消息通信”为什么必须固定RabbitMQ 2.7？",
    answer:
      "原书以2.7.0为写作基线；后来的队列类型、插件、CLI与集群行为只能作为差异材料，不能替代“沿生产者、消费者、队列、交换器、绑定、虚拟主机、持久化和发送方确认重建一条消息的一生”的正式分母。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第2章 理解消息通信", "绑定"],
  },
  {
    id: "rmq-02-understanding-messaging-q5",
    chapter: "rmq-02-understanding-messaging",
    level: 3,
    question: "如何验证“第2章 理解消息通信”的性能与交付语义？",
    answer:
      "固定消息大小、路由分布、拓扑与可靠语义，测吞吐、P50/P95/P99、ready/unacked、内存、进程、网络和磁盘，并独立对账。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第2章 理解消息通信", "发送方确认"],
  },
  {
    id: "rmq-02-understanding-messaging-q6",
    chapter: "rmq-02-understanding-messaging",
    level: 3,
    question: "“第2章 理解消息通信”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、AMQP拓扑、AMQP拓扑图、消息生命周期、持久化组合实验、发送方确认轨迹与消息ID对账、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第2章 理解消息通信", "生产者"],
  },
  {
    id: "rmq-03-running-administering-rabbit-q1",
    chapter: "rmq-03-running-administering-rabbit",
    level: 1,
    question: "为什么“第3章 运行和管理Rabbit”必须覆盖14个目录节点？",
    answer:
      "这些节点共同组成“掌握节点与应用启停、配置文件、用户权限、统计日志和Erlang分布式节点故障诊断”的拓扑、状态与证据链；漏项会使启停矩阵、配置快照、最小权限测试、统计基线、日志时间线与badrpc诊断树无法独立复现。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第3章 运行和管理Rabbit",
      "rabbitmqctl",
    ],
  },
  {
    id: "rmq-03-running-administering-rabbit-q2",
    chapter: "rmq-03-running-administering-rabbit",
    level: 1,
    question: "“第3章 运行和管理Rabbit”的最小不变量是什么？",
    answer:
      "节点进程与Rabbit应用状态分开判断，用户对vhost的configure、write、read权限可验证，故障诊断保留命令、日志和cookie证据；需要版本、拓扑、confirm/ack轨迹、指标、故障和消息对账共同证明。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第3章 运行和管理Rabbit",
      "Rabbit应用",
    ],
  },
  {
    id: "rmq-03-running-administering-rabbit-q3",
    chapter: "rmq-03-running-administering-rabbit",
    level: 2,
    question: "怎样为“第3章 运行和管理Rabbit”构造单变量反例？",
    answer:
      "固定消息、vhost、交换器、队列与路由键，只改变持久化、confirm、ack、消费者速度、节点或网络故障之一，再比较broker状态与最终消息集合。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第3章 运行和管理Rabbit",
      "虚拟主机权限",
    ],
  },
  {
    id: "rmq-03-running-administering-rabbit-q4",
    chapter: "rmq-03-running-administering-rabbit",
    level: 2,
    question: "“第3章 运行和管理Rabbit”为什么必须固定RabbitMQ 2.7？",
    answer:
      "原书以2.7.0为写作基线；后来的队列类型、插件、CLI与集群行为只能作为差异材料，不能替代“掌握节点与应用启停、配置文件、用户权限、统计日志和Erlang分布式节点故障诊断”的正式分母。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第3章 运行和管理Rabbit",
      "节点统计",
    ],
  },
  {
    id: "rmq-03-running-administering-rabbit-q5",
    chapter: "rmq-03-running-administering-rabbit",
    level: 3,
    question: "如何验证“第3章 运行和管理Rabbit”的性能与交付语义？",
    answer:
      "固定消息大小、路由分布、拓扑与可靠语义，测吞吐、P50/P95/P99、ready/unacked、内存、进程、网络和磁盘，并独立对账。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第3章 运行和管理Rabbit",
      "Erlang cookie",
    ],
  },
  {
    id: "rmq-03-running-administering-rabbit-q6",
    chapter: "rmq-03-running-administering-rabbit",
    level: 3,
    question: "“第3章 运行和管理Rabbit”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、AMQP拓扑、启停矩阵、配置快照、最小权限测试、统计基线、日志时间线与badrpc诊断树、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第3章 运行和管理Rabbit",
      "rabbitmqctl",
    ],
  },
  {
    id: "rmq-04-coding-patterns-q1",
    chapter: "rmq-04-coding-patterns",
    level: 1,
    question:
      "为什么“第4章 解决Rabbit相关问题：编码与模式”必须覆盖11个目录节点？",
    answer:
      "这些节点共同组成“从解耦、异步状态、无负载均衡器扩展、跨语言API进入告警、并行处理和基于reply_to的RPC模式”的拓扑、状态与证据链；漏项会使告警拓扑、并行任务工作池、JSON RPC时序、相关ID日志、超时重试与幂等对账无法独立复现。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第4章 解决Rabbit相关问题：编码与模式",
      "异步状态",
    ],
  },
  {
    id: "rmq-04-coding-patterns-q2",
    chapter: "rmq-04-coding-patterns",
    level: 1,
    question: "“第4章 解决Rabbit相关问题：编码与模式”的最小不变量是什么？",
    answer:
      "每个模式写清交换器、队列、绑定、correlation id、reply_to、超时、重复和失败补偿，不以请求已发出代替业务完成；需要版本、拓扑、confirm/ack轨迹、指标、故障和消息对账共同证明。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第4章 解决Rabbit相关问题：编码与模式",
      "发后即忘",
    ],
  },
  {
    id: "rmq-04-coding-patterns-q3",
    chapter: "rmq-04-coding-patterns",
    level: 2,
    question: "怎样为“第4章 解决Rabbit相关问题：编码与模式”构造单变量反例？",
    answer:
      "固定消息、vhost、交换器、队列与路由键，只改变持久化、confirm、ack、消费者速度、节点或网络故障之一，再比较broker状态与最终消息集合。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第4章 解决Rabbit相关问题：编码与模式",
      "工作队列",
    ],
  },
  {
    id: "rmq-04-coding-patterns-q4",
    chapter: "rmq-04-coding-patterns",
    level: 2,
    question:
      "“第4章 解决Rabbit相关问题：编码与模式”为什么必须固定RabbitMQ 2.7？",
    answer:
      "原书以2.7.0为写作基线；后来的队列类型、插件、CLI与集群行为只能作为差异材料，不能替代“从解耦、异步状态、无负载均衡器扩展、跨语言API进入告警、并行处理和基于reply_to的RPC模式”的正式分母。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第4章 解决Rabbit相关问题：编码与模式",
      "reply_to",
    ],
  },
  {
    id: "rmq-04-coding-patterns-q5",
    chapter: "rmq-04-coding-patterns",
    level: 3,
    question:
      "如何验证“第4章 解决Rabbit相关问题：编码与模式”的性能与交付语义？",
    answer:
      "固定消息大小、路由分布、拓扑与可靠语义，测吞吐、P50/P95/P99、ready/unacked、内存、进程、网络和磁盘，并独立对账。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第4章 解决Rabbit相关问题：编码与模式",
      "correlation id",
    ],
  },
  {
    id: "rmq-04-coding-patterns-q6",
    chapter: "rmq-04-coding-patterns",
    level: 3,
    question:
      "“第4章 解决Rabbit相关问题：编码与模式”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、AMQP拓扑、告警拓扑、并行任务工作池、JSON RPC时序、相关ID日志、超时重试与幂等对账、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第4章 解决Rabbit相关问题：编码与模式",
      "异步状态",
    ],
  },
  {
    id: "rmq-05-clustering-failure-q1",
    chapter: "rmq-05-clustering-failure",
    level: 1,
    question: "为什么“第5章 集群并处理失败”必须覆盖12个目录节点？",
    answer:
      "这些节点共同组成“解释RabbitMQ 2.7集群元数据、队列主节点、分布交换器、内存与磁盘节点、滚动升级和经典镜像队列”的拓扑、状态与证据链；漏项会使三节点集群拓扑、元数据与队列位置表、升级步骤、经典镜像策略和主节点故障对账无法独立复现。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第5章 集群并处理失败",
      "RabbitMQ集群",
    ],
  },
  {
    id: "rmq-05-clustering-failure-q2",
    chapter: "rmq-05-clustering-failure",
    level: 1,
    question: "“第5章 集群并处理失败”的最小不变量是什么？",
    answer:
      "集群不自动复制普通队列内容；经典镜像策略、主从位置、节点类型与故障后可用性可由状态和消息集合证明；需要版本、拓扑、confirm/ack轨迹、指标、故障和消息对账共同证明。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第5章 集群并处理失败", "磁盘节点"],
  },
  {
    id: "rmq-05-clustering-failure-q3",
    chapter: "rmq-05-clustering-failure",
    level: 2,
    question: "怎样为“第5章 集群并处理失败”构造单变量反例？",
    answer:
      "固定消息、vhost、交换器、队列与路由键，只改变持久化、confirm、ack、消费者速度、节点或网络故障之一，再比较broker状态与最终消息集合。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第5章 集群并处理失败", "内存节点"],
  },
  {
    id: "rmq-05-clustering-failure-q4",
    chapter: "rmq-05-clustering-failure",
    level: 2,
    question: "“第5章 集群并处理失败”为什么必须固定RabbitMQ 2.7？",
    answer:
      "原书以2.7.0为写作基线；后来的队列类型、插件、CLI与集群行为只能作为差异材料，不能替代“解释RabbitMQ 2.7集群元数据、队列主节点、分布交换器、内存与磁盘节点、滚动升级和经典镜像队列”的正式分母。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第5章 集群并处理失败",
      "队列主节点",
    ],
  },
  {
    id: "rmq-05-clustering-failure-q5",
    chapter: "rmq-05-clustering-failure",
    level: 3,
    question: "如何验证“第5章 集群并处理失败”的性能与交付语义？",
    answer:
      "固定消息大小、路由分布、拓扑与可靠语义，测吞吐、P50/P95/P99、ready/unacked、内存、进程、网络和磁盘，并独立对账。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第5章 集群并处理失败",
      "经典镜像队列",
    ],
  },
  {
    id: "rmq-05-clustering-failure-q6",
    chapter: "rmq-05-clustering-failure",
    level: 3,
    question: "“第5章 集群并处理失败”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、AMQP拓扑、三节点集群拓扑、元数据与队列位置表、升级步骤、经典镜像策略和主节点故障对账、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第5章 集群并处理失败",
      "RabbitMQ集群",
    ],
  },
  {
    id: "rmq-06-surviving-failure-q1",
    chapter: "rmq-06-surviving-failure",
    level: 1,
    question: "为什么“第6章 从故障中恢复”必须覆盖5个目录节点？",
    answer:
      "这些节点共同组成“用HAProxy为Rabbit节点分配连接，并在客户端处理中断、重连、拓扑重建、未确认消息和故障转移”的拓扑、状态与证据链；漏项会使HAProxy健康检查、连接故障时序、生产消费重连状态机、拓扑重建与重复消息对账无法独立复现。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第6章 从故障中恢复", "HAProxy"],
  },
  {
    id: "rmq-06-surviving-failure-q2",
    chapter: "rmq-06-surviving-failure",
    level: 1,
    question: "“第6章 从故障中恢复”的最小不变量是什么？",
    answer:
      "负载均衡只选择可连接节点；客户端重连后重新建立channel与拓扑，未确认发布和未ack消费的重复窗口被消息ID对账限定；需要版本、拓扑、confirm/ack轨迹、指标、故障和消息对账共同证明。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第6章 从故障中恢复", "健康检查"],
  },
  {
    id: "rmq-06-surviving-failure-q3",
    chapter: "rmq-06-surviving-failure",
    level: 2,
    question: "怎样为“第6章 从故障中恢复”构造单变量反例？",
    answer:
      "固定消息、vhost、交换器、队列与路由键，只改变持久化、confirm、ack、消费者速度、节点或网络故障之一，再比较broker状态与最终消息集合。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第6章 从故障中恢复", "连接恢复"],
  },
  {
    id: "rmq-06-surviving-failure-q4",
    chapter: "rmq-06-surviving-failure",
    level: 2,
    question: "“第6章 从故障中恢复”为什么必须固定RabbitMQ 2.7？",
    answer:
      "原书以2.7.0为写作基线；后来的队列类型、插件、CLI与集群行为只能作为差异材料，不能替代“用HAProxy为Rabbit节点分配连接，并在客户端处理中断、重连、拓扑重建、未确认消息和故障转移”的正式分母。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第6章 从故障中恢复", "channel恢复"],
  },
  {
    id: "rmq-06-surviving-failure-q5",
    chapter: "rmq-06-surviving-failure",
    level: 3,
    question: "如何验证“第6章 从故障中恢复”的性能与交付语义？",
    answer:
      "固定消息大小、路由分布、拓扑与可靠语义，测吞吐、P50/P95/P99、ready/unacked、内存、进程、网络和磁盘，并独立对账。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第6章 从故障中恢复", "重复窗口"],
  },
  {
    id: "rmq-06-surviving-failure-q6",
    chapter: "rmq-06-surviving-failure",
    level: 3,
    question: "“第6章 从故障中恢复”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、AMQP拓扑、HAProxy健康检查、连接故障时序、生产消费重连状态机、拓扑重建与重复消息对账、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第6章 从故障中恢复", "HAProxy"],
  },
  {
    id: "rmq-07-warrens-shovels-q1",
    chapter: "rmq-07-warrens-shovels",
    level: 1,
    question:
      "为什么“第7章 warren和Shovel：故障转移和复制”必须覆盖7个目录节点？",
    answer:
      "这些节点共同组成“比较基于负载均衡器的主从warren与RabbitMQ集群，并用Shovel跨远距离broker复制消息”的拓扑、状态与证据链；漏项会使warren主从拓扑、HAProxy切换演练、Shovel安装配置、跨站延迟与重复丢失对账无法独立复现。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第7章 warren和Shovel：故障转移和复制",
      "warren",
    ],
  },
  {
    id: "rmq-07-warrens-shovels-q2",
    chapter: "rmq-07-warrens-shovels",
    level: 1,
    question: "“第7章 warren和Shovel：故障转移和复制”的最小不变量是什么？",
    answer:
      "复制方向、源队列、目标交换器、确认点、断线重试和重复语义明确，远距离链路恢复后源目标消息集合可对账；需要版本、拓扑、confirm/ack轨迹、指标、故障和消息对账共同证明。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第7章 warren和Shovel：故障转移和复制",
      "主从集群",
    ],
  },
  {
    id: "rmq-07-warrens-shovels-q3",
    chapter: "rmq-07-warrens-shovels",
    level: 2,
    question: "怎样为“第7章 warren和Shovel：故障转移和复制”构造单变量反例？",
    answer:
      "固定消息、vhost、交换器、队列与路由键，只改变持久化、confirm、ack、消费者速度、节点或网络故障之一，再比较broker状态与最终消息集合。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第7章 warren和Shovel：故障转移和复制",
      "Shovel",
    ],
  },
  {
    id: "rmq-07-warrens-shovels-q4",
    chapter: "rmq-07-warrens-shovels",
    level: 2,
    question:
      "“第7章 warren和Shovel：故障转移和复制”为什么必须固定RabbitMQ 2.7？",
    answer:
      "原书以2.7.0为写作基线；后来的队列类型、插件、CLI与集群行为只能作为差异材料，不能替代“比较基于负载均衡器的主从warren与RabbitMQ集群，并用Shovel跨远距离broker复制消息”的正式分母。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第7章 warren和Shovel：故障转移和复制",
      "远距离复制",
    ],
  },
  {
    id: "rmq-07-warrens-shovels-q5",
    chapter: "rmq-07-warrens-shovels",
    level: 3,
    question:
      "如何验证“第7章 warren和Shovel：故障转移和复制”的性能与交付语义？",
    answer:
      "固定消息大小、路由分布、拓扑与可靠语义，测吞吐、P50/P95/P99、ready/unacked、内存、进程、网络和磁盘，并独立对账。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第7章 warren和Shovel：故障转移和复制",
      "故障转移",
    ],
  },
  {
    id: "rmq-07-warrens-shovels-q6",
    chapter: "rmq-07-warrens-shovels",
    level: 3,
    question:
      "“第7章 warren和Shovel：故障转移和复制”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、AMQP拓扑、warren主从拓扑、HAProxy切换演练、Shovel安装配置、跨站延迟与重复丢失对账、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第7章 warren和Shovel：故障转移和复制",
      "warren",
    ],
  },
  {
    id: "rmq-08-web-administration-q1",
    chapter: "rmq-08-web-administration",
    level: 1,
    question: "为什么“第8章 从Web端管理RabbitMQ”必须覆盖19个目录节点？",
    answer:
      "这些节点共同组成“启用RabbitMQ 2.7 Management插件，从Web观察Erlang VM、导入配置、管理用户交换器队列，并使用rabbitmqadmin”的拓扑、状态与证据链；漏项会使插件依赖清单、VM指标快照、配置导入导出、用户权限测试与rabbitmqadmin运行手册无法独立复现。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第8章 从Web端管理RabbitMQ",
      "Management插件",
    ],
  },
  {
    id: "rmq-08-web-administration-q2",
    chapter: "rmq-08-web-administration",
    level: 1,
    question: "“第8章 从Web端管理RabbitMQ”的最小不变量是什么？",
    answer:
      "Web与CLI操作都落到同一broker状态，导入和声明具有前后快照，用户权限最小化，危险操作具有目标、验证和回退；需要版本、拓扑、confirm/ack轨迹、指标、故障和消息对账共同证明。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第8章 从Web端管理RabbitMQ",
      "Erlang VM",
    ],
  },
  {
    id: "rmq-08-web-administration-q3",
    chapter: "rmq-08-web-administration",
    level: 2,
    question: "怎样为“第8章 从Web端管理RabbitMQ”构造单变量反例？",
    answer:
      "固定消息、vhost、交换器、队列与路由键，只改变持久化、confirm、ack、消费者速度、节点或网络故障之一，再比较broker状态与最终消息集合。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第8章 从Web端管理RabbitMQ",
      "配置导入",
    ],
  },
  {
    id: "rmq-08-web-administration-q4",
    chapter: "rmq-08-web-administration",
    level: 2,
    question: "“第8章 从Web端管理RabbitMQ”为什么必须固定RabbitMQ 2.7？",
    answer:
      "原书以2.7.0为写作基线；后来的队列类型、插件、CLI与集群行为只能作为差异材料，不能替代“启用RabbitMQ 2.7 Management插件，从Web观察Erlang VM、导入配置、管理用户交换器队列，并使用rabbitmqadmin”的正式分母。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第8章 从Web端管理RabbitMQ",
      "Web控制台",
    ],
  },
  {
    id: "rmq-08-web-administration-q5",
    chapter: "rmq-08-web-administration",
    level: 3,
    question: "如何验证“第8章 从Web端管理RabbitMQ”的性能与交付语义？",
    answer:
      "固定消息大小、路由分布、拓扑与可靠语义，测吞吐、P50/P95/P99、ready/unacked、内存、进程、网络和磁盘，并独立对账。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第8章 从Web端管理RabbitMQ",
      "rabbitmqadmin",
    ],
  },
  {
    id: "rmq-08-web-administration-q6",
    chapter: "rmq-08-web-administration",
    level: 3,
    question: "“第8章 从Web端管理RabbitMQ”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、AMQP拓扑、插件依赖清单、VM指标快照、配置导入导出、用户权限测试与rabbitmqadmin运行手册、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第8章 从Web端管理RabbitMQ",
      "Management插件",
    ],
  },
  {
    id: "rmq-09-rest-api-q1",
    chapter: "rmq-09-rest-api",
    level: 1,
    question: "为什么“第9章 使用REST API控制Rabbit”必须覆盖5个目录节点？",
    answer:
      "这些节点共同组成“通过Management REST API完成授权、统计查询以及vhost和用户的自动化配置”的拓扑、状态与证据链；漏项会使REST资源表、授权测试、统计采样、vhost用户自动配置脚本与执行后核验无法独立复现。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第9章 使用REST API控制Rabbit",
      "REST API",
    ],
  },
  {
    id: "rmq-09-rest-api-q2",
    chapter: "rmq-09-rest-api",
    level: 1,
    question: "“第9章 使用REST API控制Rabbit”的最小不变量是什么？",
    answer:
      "API主体只拥有必要权限，请求幂等性和资源目标明确，HTTP成功后继续核对broker对象与权限，凭据不进入日志和脚本仓库；需要版本、拓扑、confirm/ack轨迹、指标、故障和消息对账共同证明。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第9章 使用REST API控制Rabbit",
      "HTTP认证",
    ],
  },
  {
    id: "rmq-09-rest-api-q3",
    chapter: "rmq-09-rest-api",
    level: 2,
    question: "怎样为“第9章 使用REST API控制Rabbit”构造单变量反例？",
    answer:
      "固定消息、vhost、交换器、队列与路由键，只改变持久化、confirm、ack、消费者速度、节点或网络故障之一，再比较broker状态与最终消息集合。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第9章 使用REST API控制Rabbit",
      "统计资源",
    ],
  },
  {
    id: "rmq-09-rest-api-q4",
    chapter: "rmq-09-rest-api",
    level: 2,
    question: "“第9章 使用REST API控制Rabbit”为什么必须固定RabbitMQ 2.7？",
    answer:
      "原书以2.7.0为写作基线；后来的队列类型、插件、CLI与集群行为只能作为差异材料，不能替代“通过Management REST API完成授权、统计查询以及vhost和用户的自动化配置”的正式分母。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第9章 使用REST API控制Rabbit",
      "vhost配置",
    ],
  },
  {
    id: "rmq-09-rest-api-q5",
    chapter: "rmq-09-rest-api",
    level: 3,
    question: "如何验证“第9章 使用REST API控制Rabbit”的性能与交付语义？",
    answer:
      "固定消息大小、路由分布、拓扑与可靠语义，测吞吐、P50/P95/P99、ready/unacked、内存、进程、网络和磁盘，并独立对账。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第9章 使用REST API控制Rabbit",
      "自动化供应",
    ],
  },
  {
    id: "rmq-09-rest-api-q6",
    chapter: "rmq-09-rest-api",
    level: 3,
    question: "“第9章 使用REST API控制Rabbit”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、AMQP拓扑、REST资源表、授权测试、统计采样、vhost用户自动配置脚本与执行后核验、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第9章 使用REST API控制Rabbit",
      "REST API",
    ],
  },
  {
    id: "rmq-10-monitoring-q1",
    chapter: "rmq-10-monitoring",
    level: 1,
    question: "为什么“第10章 监控”必须覆盖11个目录节点？",
    answer:
      "这些节点共同组成“用Nagios、AMQP模拟检测、REST、配置文件监测与集群状态检查broker，并从AMQP和REST监控消费者与队列基线”的拓扑、状态与证据链；漏项会使Nagios探针、AMQP端到端探针、REST检查、配置哈希、集群仪表、队列基线与告警手册无法独立复现。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第10章 监控", "Nagios"],
  },
  {
    id: "rmq-10-monitoring-q2",
    chapter: "rmq-10-monitoring",
    level: 1,
    question: "“第10章 监控”的最小不变量是什么？",
    answer:
      "存活、可连接、可发布消费、集群一致和消费者进度分别监测；每个告警绑定阈值、窗口、处置与恢复验证；需要版本、拓扑、confirm/ack轨迹、指标、故障和消息对账共同证明。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第10章 监控", "AMQP模拟检测"],
  },
  {
    id: "rmq-10-monitoring-q3",
    chapter: "rmq-10-monitoring",
    level: 2,
    question: "怎样为“第10章 监控”构造单变量反例？",
    answer:
      "固定消息、vhost、交换器、队列与路由键，只改变持久化、confirm、ack、消费者速度、节点或网络故障之一，再比较broker状态与最终消息集合。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第10章 监控", "REST检测"],
  },
  {
    id: "rmq-10-monitoring-q4",
    chapter: "rmq-10-monitoring",
    level: 2,
    question: "“第10章 监控”为什么必须固定RabbitMQ 2.7？",
    answer:
      "原书以2.7.0为写作基线；后来的队列类型、插件、CLI与集群行为只能作为差异材料，不能替代“用Nagios、AMQP模拟检测、REST、配置文件监测与集群状态检查broker，并从AMQP和REST监控消费者与队列基线”的正式分母。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第10章 监控", "集群状态"],
  },
  {
    id: "rmq-10-monitoring-q5",
    chapter: "rmq-10-monitoring",
    level: 3,
    question: "如何验证“第10章 监控”的性能与交付语义？",
    answer:
      "固定消息大小、路由分布、拓扑与可靠语义，测吞吐、P50/P95/P99、ready/unacked、内存、进程、网络和磁盘，并独立对账。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第10章 监控", "队列基线"],
  },
  {
    id: "rmq-10-monitoring-q6",
    chapter: "rmq-10-monitoring",
    level: 3,
    question: "“第10章 监控”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、AMQP拓扑、Nagios探针、AMQP端到端探针、REST检查、配置哈希、集群仪表、队列基线与告警手册、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "第10章 监控", "Nagios"],
  },
  {
    id: "rmq-11-performance-security-q1",
    chapter: "rmq-11-performance-security",
    level: 1,
    question: "为什么“第11章 提升性能，保障安全”必须覆盖17个目录节点？",
    answer:
      "这些节点共同组成“测量持久化、确认、路由绑定和投递路径的性能，控制内存与Erlang进程，并建立RabbitMQ 2.7 SSL双向认证”的拓扑、状态与证据链；漏项会使吞吐延迟矩阵、内存进程预算、绑定复杂度测试、证书链、SSL监听配置与双向连接证据无法独立复现。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第11章 提升性能，保障安全",
      "消息持久化",
    ],
  },
  {
    id: "rmq-11-performance-security-q2",
    chapter: "rmq-11-performance-security",
    level: 1,
    question: "“第11章 提升性能，保障安全”的最小不变量是什么？",
    answer:
      "性能比较固定消息、拓扑与可靠语义；内存与进程有上界；证书链、服务端身份、客户端身份和监听端口可独立验证；需要版本、拓扑、confirm/ack轨迹、指标、故障和消息对账共同证明。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第11章 提升性能，保障安全",
      "消息确认",
    ],
  },
  {
    id: "rmq-11-performance-security-q3",
    chapter: "rmq-11-performance-security",
    level: 2,
    question: "怎样为“第11章 提升性能，保障安全”构造单变量反例？",
    answer:
      "固定消息、vhost、交换器、队列与路由键，只改变持久化、confirm、ack、消费者速度、节点或网络故障之一，再比较broker状态与最终消息集合。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第11章 提升性能，保障安全",
      "路由绑定",
    ],
  },
  {
    id: "rmq-11-performance-security-q4",
    chapter: "rmq-11-performance-security",
    level: 2,
    question: "“第11章 提升性能，保障安全”为什么必须固定RabbitMQ 2.7？",
    answer:
      "原书以2.7.0为写作基线；后来的队列类型、插件、CLI与集群行为只能作为差异材料，不能替代“测量持久化、确认、路由绑定和投递路径的性能，控制内存与Erlang进程，并建立RabbitMQ 2.7 SSL双向认证”的正式分母。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第11章 提升性能，保障安全",
      "Erlang进程",
    ],
  },
  {
    id: "rmq-11-performance-security-q5",
    chapter: "rmq-11-performance-security",
    level: 3,
    question: "如何验证“第11章 提升性能，保障安全”的性能与交付语义？",
    answer:
      "固定消息大小、路由分布、拓扑与可靠语义，测吞吐、P50/P95/P99、ready/unacked、内存、进程、网络和磁盘，并独立对账。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第11章 提升性能，保障安全",
      "SSL证书",
    ],
  },
  {
    id: "rmq-11-performance-security-q6",
    chapter: "rmq-11-performance-security",
    level: 3,
    question: "“第11章 提升性能，保障安全”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、AMQP拓扑、吞吐延迟矩阵、内存进程预算、绑定复杂度测试、证书链、SSL监听配置与双向连接证据、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第11章 提升性能，保障安全",
      "消息持久化",
    ],
  },
  {
    id: "rmq-12-extending-rabbitmq-q1",
    chapter: "rmq-12-extending-rabbitmq",
    level: 1,
    question: "为什么“第12章 聪明的Rabbit：扩展RabbitMQ”必须覆盖16个目录节点？",
    answer:
      "这些节点共同组成“理解RabbitMQ 2.7插件能力、发现安装移除流程、Public Umbrella构建系统、Erlang应用文件与自定义交换器behaviour”的拓扑、状态与证据链；漏项会使插件目录、安装移除演练、Public Umbrella工程、Erlang应用文件、自定义交换器与路由测试无法独立复现。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第12章 聪明的Rabbit：扩展RabbitMQ",
      "RabbitMQ插件",
    ],
  },
  {
    id: "rmq-12-extending-rabbitmq-q2",
    chapter: "rmq-12-extending-rabbitmq",
    level: 1,
    question: "“第12章 聪明的Rabbit：扩展RabbitMQ”的最小不变量是什么？",
    answer:
      "插件版本与broker ABI匹配，安装移除可回退，自定义交换器注册、路由语义、编译和隔离测试都有证据；需要版本、拓扑、confirm/ack轨迹、指标、故障和消息对账共同证明。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第12章 聪明的Rabbit：扩展RabbitMQ",
      "Public Umbrella",
    ],
  },
  {
    id: "rmq-12-extending-rabbitmq-q3",
    chapter: "rmq-12-extending-rabbitmq",
    level: 2,
    question: "怎样为“第12章 聪明的Rabbit：扩展RabbitMQ”构造单变量反例？",
    answer:
      "固定消息、vhost、交换器、队列与路由键，只改变持久化、confirm、ack、消费者速度、节点或网络故障之一，再比较broker状态与最终消息集合。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第12章 聪明的Rabbit：扩展RabbitMQ",
      "Erlang应用",
    ],
  },
  {
    id: "rmq-12-extending-rabbitmq-q4",
    chapter: "rmq-12-extending-rabbitmq",
    level: 2,
    question: "“第12章 聪明的Rabbit：扩展RabbitMQ”为什么必须固定RabbitMQ 2.7？",
    answer:
      "原书以2.7.0为写作基线；后来的队列类型、插件、CLI与集群行为只能作为差异材料，不能替代“理解RabbitMQ 2.7插件能力、发现安装移除流程、Public Umbrella构建系统、Erlang应用文件与自定义交换器behaviour”的正式分母。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第12章 聪明的Rabbit：扩展RabbitMQ",
      "交换器behaviour",
    ],
  },
  {
    id: "rmq-12-extending-rabbitmq-q5",
    chapter: "rmq-12-extending-rabbitmq",
    level: 3,
    question: "如何验证“第12章 聪明的Rabbit：扩展RabbitMQ”的性能与交付语义？",
    answer:
      "固定消息大小、路由分布、拓扑与可靠语义，测吞吐、P50/P95/P99、ready/unacked、内存、进程、网络和磁盘，并独立对账。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第12章 聪明的Rabbit：扩展RabbitMQ",
      "插件测试",
    ],
  },
  {
    id: "rmq-12-extending-rabbitmq-q6",
    chapter: "rmq-12-extending-rabbitmq",
    level: 3,
    question: "“第12章 聪明的Rabbit：扩展RabbitMQ”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、AMQP拓扑、插件目录、安装移除演练、Public Umbrella工程、Erlang应用文件、自定义交换器与路由测试、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "第12章 聪明的Rabbit：扩展RabbitMQ",
      "RabbitMQ插件",
    ],
  },
  {
    id: "rmq-appendix-a-java-dotnet-q1",
    chapter: "rmq-appendix-a-java-dotnet",
    level: 1,
    question: "为什么“附录A 在Java和.NET上使用Rabbit”必须覆盖4个目录节点？",
    answer:
      "这些节点共同组成“比较Java与.NET客户端库，以Hello World、事件驱动告警和Java AMQP RPC复现跨语言消息模式”的拓扑、状态与证据链；漏项会使Java/.NET API对照、Hello World、事件告警、Java RPC和跨语言消息互操作测试无法独立复现。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "附录A 在Java和.NET上使用Rabbit",
      "Java客户端",
    ],
  },
  {
    id: "rmq-appendix-a-java-dotnet-q2",
    chapter: "rmq-appendix-a-java-dotnet",
    level: 1,
    question: "“附录A 在Java和.NET上使用Rabbit”的最小不变量是什么？",
    answer:
      "两种客户端对交换器队列绑定、content properties、ack、reply_to和correlation id的映射一致，资源关闭与失败语义明确；需要版本、拓扑、confirm/ack轨迹、指标、故障和消息对账共同证明。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "附录A 在Java和.NET上使用Rabbit",
      ".NET客户端",
    ],
  },
  {
    id: "rmq-appendix-a-java-dotnet-q3",
    chapter: "rmq-appendix-a-java-dotnet",
    level: 2,
    question: "怎样为“附录A 在Java和.NET上使用Rabbit”构造单变量反例？",
    answer:
      "固定消息、vhost、交换器、队列与路由键，只改变持久化、confirm、ack、消费者速度、节点或网络故障之一，再比较broker状态与最终消息集合。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "附录A 在Java和.NET上使用Rabbit",
      "事件驱动",
    ],
  },
  {
    id: "rmq-appendix-a-java-dotnet-q4",
    chapter: "rmq-appendix-a-java-dotnet",
    level: 2,
    question: "“附录A 在Java和.NET上使用Rabbit”为什么必须固定RabbitMQ 2.7？",
    answer:
      "原书以2.7.0为写作基线；后来的队列类型、插件、CLI与集群行为只能作为差异材料，不能替代“比较Java与.NET客户端库，以Hello World、事件驱动告警和Java AMQP RPC复现跨语言消息模式”的正式分母。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "附录A 在Java和.NET上使用Rabbit",
      "AMQP RPC",
    ],
  },
  {
    id: "rmq-appendix-a-java-dotnet-q5",
    chapter: "rmq-appendix-a-java-dotnet",
    level: 3,
    question: "如何验证“附录A 在Java和.NET上使用Rabbit”的性能与交付语义？",
    answer:
      "固定消息大小、路由分布、拓扑与可靠语义，测吞吐、P50/P95/P99、ready/unacked、内存、进程、网络和磁盘，并独立对账。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "附录A 在Java和.NET上使用Rabbit",
      "互操作",
    ],
  },
  {
    id: "rmq-appendix-a-java-dotnet-q6",
    chapter: "rmq-appendix-a-java-dotnet",
    level: 3,
    question: "“附录A 在Java和.NET上使用Rabbit”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、AMQP拓扑、Java/.NET API对照、Hello World、事件告警、Java RPC和跨语言消息互操作测试、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "附录A 在Java和.NET上使用Rabbit",
      "Java客户端",
    ],
  },
  {
    id: "rmq-appendix-b-online-resources-q1",
    chapter: "rmq-appendix-b-online-resources",
    level: 1,
    question: "为什么“附录B 在线资源”必须覆盖5个目录节点？",
    answer:
      "这些节点共同组成“按网站、博客、AMQP库、开源项目、讨论组和邮件列表建立与2012年原书对应的资源索引及失效替代记录”的拓扑、状态与证据链；漏项会使资源清单、链接状态、版本标签、归档证据与官方替代路径无法独立复现。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "附录B 在线资源", "RabbitMQ网站"],
  },
  {
    id: "rmq-appendix-b-online-resources-q2",
    chapter: "rmq-appendix-b-online-resources",
    level: 1,
    question: "“附录B 在线资源”的最小不变量是什么？",
    answer:
      "每个资源标明原书用途、访问状态、版本适用性和可替代的一手资料，不把后来文档的行为倒灌为RabbitMQ 2.7事实；需要版本、拓扑、confirm/ack轨迹、指标、故障和消息对账共同证明。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "附录B 在线资源", "技术博客"],
  },
  {
    id: "rmq-appendix-b-online-resources-q3",
    chapter: "rmq-appendix-b-online-resources",
    level: 2,
    question: "怎样为“附录B 在线资源”构造单变量反例？",
    answer:
      "固定消息、vhost、交换器、队列与路由键，只改变持久化、confirm、ack、消费者速度、节点或网络故障之一，再比较broker状态与最终消息集合。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "附录B 在线资源", "AMQP库"],
  },
  {
    id: "rmq-appendix-b-online-resources-q4",
    chapter: "rmq-appendix-b-online-resources",
    level: 2,
    question: "“附录B 在线资源”为什么必须固定RabbitMQ 2.7？",
    answer:
      "原书以2.7.0为写作基线；后来的队列类型、插件、CLI与集群行为只能作为差异材料，不能替代“按网站、博客、AMQP库、开源项目、讨论组和邮件列表建立与2012年原书对应的资源索引及失效替代记录”的正式分母。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "附录B 在线资源", "开源项目"],
  },
  {
    id: "rmq-appendix-b-online-resources-q5",
    chapter: "rmq-appendix-b-online-resources",
    level: 3,
    question: "如何验证“附录B 在线资源”的性能与交付语义？",
    answer:
      "固定消息大小、路由分布、拓扑与可靠语义，测吞吐、P50/P95/P99、ready/unacked、内存、进程、网络和磁盘，并独立对账。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "附录B 在线资源", "邮件列表"],
  },
  {
    id: "rmq-appendix-b-online-resources-q6",
    chapter: "rmq-appendix-b-online-resources",
    level: 3,
    question: "“附录B 在线资源”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、AMQP拓扑、资源清单、链接状态、版本标签、归档证据与官方替代路径、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "附录B 在线资源", "RabbitMQ网站"],
  },
  {
    id: "rmq-appendix-c-windows-installation-q1",
    chapter: "rmq-appendix-c-windows-installation",
    level: 1,
    question: "为什么“附录C 在Windows上安装RabbitMQ”必须覆盖1个目录节点？",
    answer:
      "这些节点共同组成“在Windows上按Erlang、RabbitMQ安装器、服务、节点环境与端到端收发顺序建立可重放安装过程”的拓扑、状态与证据链；漏项会使Windows安装步骤、服务配置、环境探针、启动日志、收发测试与卸载清理记录无法独立复现。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "附录C 在Windows上安装RabbitMQ",
      "Windows安装",
    ],
  },
  {
    id: "rmq-appendix-c-windows-installation-q2",
    chapter: "rmq-appendix-c-windows-installation",
    level: 1,
    question: "“附录C 在Windows上安装RabbitMQ”的最小不变量是什么？",
    answer:
      "Erlang与RabbitMQ 2.7版本匹配，服务账户、节点名、cookie、端口和数据目录明确，重启后仍能完成发布消费；需要版本、拓扑、confirm/ack轨迹、指标、故障和消息对账共同证明。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "附录C 在Windows上安装RabbitMQ",
      "Erlang安装器",
    ],
  },
  {
    id: "rmq-appendix-c-windows-installation-q3",
    chapter: "rmq-appendix-c-windows-installation",
    level: 2,
    question: "怎样为“附录C 在Windows上安装RabbitMQ”构造单变量反例？",
    answer:
      "固定消息、vhost、交换器、队列与路由键，只改变持久化、confirm、ack、消费者速度、节点或网络故障之一，再比较broker状态与最终消息集合。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "附录C 在Windows上安装RabbitMQ",
      "RabbitMQ安装器",
    ],
  },
  {
    id: "rmq-appendix-c-windows-installation-q4",
    chapter: "rmq-appendix-c-windows-installation",
    level: 2,
    question: "“附录C 在Windows上安装RabbitMQ”为什么必须固定RabbitMQ 2.7？",
    answer:
      "原书以2.7.0为写作基线；后来的队列类型、插件、CLI与集群行为只能作为差异材料，不能替代“在Windows上按Erlang、RabbitMQ安装器、服务、节点环境与端到端收发顺序建立可重放安装过程”的正式分母。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "附录C 在Windows上安装RabbitMQ",
      "Windows服务",
    ],
  },
  {
    id: "rmq-appendix-c-windows-installation-q5",
    chapter: "rmq-appendix-c-windows-installation",
    level: 3,
    question: "如何验证“附录C 在Windows上安装RabbitMQ”的性能与交付语义？",
    answer:
      "固定消息大小、路由分布、拓扑与可靠语义，测吞吐、P50/P95/P99、ready/unacked、内存、进程、网络和磁盘，并独立对账。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "附录C 在Windows上安装RabbitMQ",
      "环境探针",
    ],
  },
  {
    id: "rmq-appendix-c-windows-installation-q6",
    chapter: "rmq-appendix-c-windows-installation",
    level: 3,
    question: "“附录C 在Windows上安装RabbitMQ”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、AMQP拓扑、Windows安装步骤、服务配置、环境探针、启动日志、收发测试与卸载清理记录、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "RabbitMQ实战",
      "RabbitMQ 2.7",
      "附录C 在Windows上安装RabbitMQ",
      "Windows安装",
    ],
  },
  {
    id: "rmq-official-final-review-q1",
    chapter: "rmq-official-final-review",
    level: 1,
    question: "为什么“全书总复习”必须覆盖15个目录节点？",
    answer:
      "这些节点共同组成“贯通15个正式单元，交付一套RabbitMQ 2.7时代可部署、可编码、可故障恢复、可管理监控、可加固扩展的消息系统”的拓扑、状态与证据链；漏项会使全书架构、容量与可靠性实验、故障演练、监控安全证据和独立交接包无法独立复现。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "全书总复习", "拓扑契约"],
  },
  {
    id: "rmq-official-final-review-q2",
    chapter: "rmq-official-final-review",
    level: 1,
    question: "“全书总复习”的最小不变量是什么？",
    answer:
      "目录、拓扑、交付语义、故障、运维、安全和消息对账七类证据同时通过，局部吞吐或在线率不能平均掉失败门；需要版本、拓扑、confirm/ack轨迹、指标、故障和消息对账共同证明。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "全书总复习", "交付语义"],
  },
  {
    id: "rmq-official-final-review-q3",
    chapter: "rmq-official-final-review",
    level: 2,
    question: "怎样为“全书总复习”构造单变量反例？",
    answer:
      "固定消息、vhost、交换器、队列与路由键，只改变持久化、confirm、ack、消费者速度、节点或网络故障之一，再比较broker状态与最终消息集合。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "全书总复习", "故障恢复"],
  },
  {
    id: "rmq-official-final-review-q4",
    chapter: "rmq-official-final-review",
    level: 2,
    question: "“全书总复习”为什么必须固定RabbitMQ 2.7？",
    answer:
      "原书以2.7.0为写作基线；后来的队列类型、插件、CLI与集群行为只能作为差异材料，不能替代“贯通15个正式单元，交付一套RabbitMQ 2.7时代可部署、可编码、可故障恢复、可管理监控、可加固扩展的消息系统”的正式分母。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "全书总复习", "运维证据"],
  },
  {
    id: "rmq-official-final-review-q5",
    chapter: "rmq-official-final-review",
    level: 3,
    question: "如何验证“全书总复习”的性能与交付语义？",
    answer:
      "固定消息大小、路由分布、拓扑与可靠语义，测吞吐、P50/P95/P99、ready/unacked、内存、进程、网络和磁盘，并独立对账。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "全书总复习", "版本边界"],
  },
  {
    id: "rmq-official-final-review-q6",
    chapter: "rmq-official-final-review",
    level: 3,
    question: "“全书总复习”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本环境、AMQP拓扑、全书架构、容量与可靠性实验、故障演练、监控安全证据和独立交接包、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["RabbitMQ实战", "RabbitMQ 2.7", "全书总复习", "拓扑契约"],
  },
];
