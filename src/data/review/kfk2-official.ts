import type { ReviewQuestion } from "../review-questions";

export const kfk2OfficialQuestions: ReviewQuestion[] = [
  {
    id: "kfk-official-learning-map-q1",
    chapter: "kfk-official-learning-map",
    level: 1,
    question: "为什么“第2版权威学习地图”必须覆盖16个目录节点？",
    answer:
      "这些节点共同组成“沿14章与2个附录建立从Kafka抽象、客户端、内部机制、可靠性到数据平台与流处理的完整路线”的结构、状态与证据链；漏项会使18页路线、完整目录映射、依赖图、版本边界与全书验收清单无法独立复现。",
    tags: ["Kafka权威指南第2版", "第2版权威学习地图", "第2版"],
  },
  {
    id: "kfk-official-learning-map-q2",
    chapter: "kfk-official-learning-map",
    level: 1,
    question: "“第2版权威学习地图”的最小不变量是什么？",
    answer:
      "16个正式单元、全部目录节点、实验与证据交付逐一可达，课程不混入第1版的旧目录或书后发布内容；需要配置、拓扑、偏移量、指标、故障轨迹和业务对账共同证明。",
    tags: ["Kafka权威指南第2版", "第2版权威学习地图", "Kafka日志"],
  },
  {
    id: "kfk-official-learning-map-q3",
    chapter: "kfk-official-learning-map",
    level: 2,
    question: "怎样为“第2版权威学习地图”构造单变量反例？",
    answer:
      "固定消息、键、主题与副本，只改变acks、最少ISR、批次、消费者处理速度或单一故障点，再比较确认、可见偏移量和最终消息集合。",
    tags: ["Kafka权威指南第2版", "第2版权威学习地图", "客户端"],
  },
  {
    id: "kfk-official-learning-map-q4",
    chapter: "kfk-official-learning-map",
    level: 2,
    question: "“第2版权威学习地图”为什么必须固定第2版边界？",
    answer:
      "2021/2022第2版固定了14章、2个附录及配置语境；后续版本只能作为差异材料，不能替代“沿14章与2个附录建立从Kafka抽象、客户端、内部机制、可靠性到数据平台与流处理的完整路线”的正式分母。",
    tags: ["Kafka权威指南第2版", "第2版权威学习地图", "可靠性"],
  },
  {
    id: "kfk-official-learning-map-q5",
    chapter: "kfk-official-learning-map",
    level: 3,
    question: "如何验证“第2版权威学习地图”的性能与交付语义？",
    answer:
      "固定消息大小、键分布、分区、副本与交付语义，测吞吐、P50/P95/P99、滞后、ISR、CPU、网络和磁盘，并独立对账。",
    tags: ["Kafka权威指南第2版", "第2版权威学习地图", "流式处理"],
  },
  {
    id: "kfk-official-learning-map-q6",
    chapter: "kfk-official-learning-map",
    level: 3,
    question: "“第2版权威学习地图”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本配置、拓扑时序、18页路线、完整目录映射、依赖图、版本边界与全书验收清单、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kafka权威指南第2版", "第2版权威学习地图", "第2版"],
  },
  {
    id: "kfk-01-meet-kafka-q1",
    chapter: "kfk-01-meet-kafka",
    level: 1,
    question: "为什么“第1章 初识Kafka”必须覆盖25个目录节点？",
    answer:
      "这些节点共同组成“从发布订阅需求推导消息、批次、模式、主题、分区、生产者、消费者、broker、集群和多集群的完整抽象”的结构、状态与证据链；漏项会使需求到Kafka抽象映射、分区键样本、端到端消息轨迹与多集群边界表无法独立复现。",
    tags: ["Kafka权威指南第2版", "第1章 初识Kafka", "发布订阅"],
  },
  {
    id: "kfk-01-meet-kafka-q2",
    chapter: "kfk-01-meet-kafka",
    level: 1,
    question: "“第1章 初识Kafka”的最小不变量是什么？",
    answer:
      "同一分区内记录顺序和偏移量单调可解释，生产者与消费者通过持久日志解耦，扩容不会暗中改变键的顺序契约；需要配置、拓扑、偏移量、指标、故障轨迹和业务对账共同证明。",
    tags: ["Kafka权威指南第2版", "第1章 初识Kafka", "消息批次"],
  },
  {
    id: "kfk-01-meet-kafka-q3",
    chapter: "kfk-01-meet-kafka",
    level: 2,
    question: "怎样为“第1章 初识Kafka”构造单变量反例？",
    answer:
      "固定消息、键、主题与副本，只改变acks、最少ISR、批次、消费者处理速度或单一故障点，再比较确认、可见偏移量和最终消息集合。",
    tags: ["Kafka权威指南第2版", "第1章 初识Kafka", "主题分区"],
  },
  {
    id: "kfk-01-meet-kafka-q4",
    chapter: "kfk-01-meet-kafka",
    level: 2,
    question: "“第1章 初识Kafka”为什么必须固定第2版边界？",
    answer:
      "2021/2022第2版固定了14章、2个附录及配置语境；后续版本只能作为差异材料，不能替代“从发布订阅需求推导消息、批次、模式、主题、分区、生产者、消费者、broker、集群和多集群的完整抽象”的正式分母。",
    tags: ["Kafka权威指南第2版", "第1章 初识Kafka", "broker集群"],
  },
  {
    id: "kfk-01-meet-kafka-q5",
    chapter: "kfk-01-meet-kafka",
    level: 3,
    question: "如何验证“第1章 初识Kafka”的性能与交付语义？",
    answer:
      "固定消息大小、键分布、分区、副本与交付语义，测吞吐、P50/P95/P99、滞后、ISR、CPU、网络和磁盘，并独立对账。",
    tags: ["Kafka权威指南第2版", "第1章 初识Kafka", "数据生态系统"],
  },
  {
    id: "kfk-01-meet-kafka-q6",
    chapter: "kfk-01-meet-kafka",
    level: 3,
    question: "“第1章 初识Kafka”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本配置、拓扑时序、需求到Kafka抽象映射、分区键样本、端到端消息轨迹与多集群边界表、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kafka权威指南第2版", "第1章 初识Kafka", "发布订阅"],
  },
  {
    id: "kfk-02-installing-kafka-q1",
    chapter: "kfk-02-installing-kafka",
    level: 1,
    question: "为什么“第2章 安装Kafka”必须覆盖26个目录节点？",
    answer:
      "这些节点共同组成“把操作系统、Java、ZooKeeper、broker参数、硬件、云环境、集群规模与生产约束组合成可重放部署基线”的结构、状态与证据链；漏项会使环境清单、broker配置基线、硬件容量模型、集群拓扑和生产上线检查表无法独立复现。",
    tags: ["Kafka权威指南第2版", "第2章 安装Kafka", "ZooKeeper"],
  },
  {
    id: "kfk-02-installing-kafka-q2",
    chapter: "kfk-02-installing-kafka",
    level: 1,
    question: "“第2章 安装Kafka”的最小不变量是什么？",
    answer:
      "节点身份、日志目录、监听地址和ZooKeeper连接在重启后稳定，容量与吞吐预算有测量依据，任何调优都保留回退值；需要配置、拓扑、偏移量、指标、故障轨迹和业务对账共同证明。",
    tags: ["Kafka权威指南第2版", "第2章 安装Kafka", "broker配置"],
  },
  {
    id: "kfk-02-installing-kafka-q3",
    chapter: "kfk-02-installing-kafka",
    level: 2,
    question: "怎样为“第2章 安装Kafka”构造单变量反例？",
    answer:
      "固定消息、键、主题与副本，只改变acks、最少ISR、批次、消费者处理速度或单一故障点，再比较确认、可见偏移量和最终消息集合。",
    tags: ["Kafka权威指南第2版", "第2章 安装Kafka", "日志目录"],
  },
  {
    id: "kfk-02-installing-kafka-q4",
    chapter: "kfk-02-installing-kafka",
    level: 2,
    question: "“第2章 安装Kafka”为什么必须固定第2版边界？",
    answer:
      "2021/2022第2版固定了14章、2个附录及配置语境；后续版本只能作为差异材料，不能替代“把操作系统、Java、ZooKeeper、broker参数、硬件、云环境、集群规模与生产约束组合成可重放部署基线”的正式分母。",
    tags: ["Kafka权威指南第2版", "第2章 安装Kafka", "硬件容量"],
  },
  {
    id: "kfk-02-installing-kafka-q5",
    chapter: "kfk-02-installing-kafka",
    level: 3,
    question: "如何验证“第2章 安装Kafka”的性能与交付语义？",
    answer:
      "固定消息大小、键分布、分区、副本与交付语义，测吞吐、P50/P95/P99、滞后、ISR、CPU、网络和磁盘，并独立对账。",
    tags: ["Kafka权威指南第2版", "第2章 安装Kafka", "操作系统调优"],
  },
  {
    id: "kfk-02-installing-kafka-q6",
    chapter: "kfk-02-installing-kafka",
    level: 3,
    question: "“第2章 安装Kafka”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本配置、拓扑时序、环境清单、broker配置基线、硬件容量模型、集群拓扑和生产上线检查表、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kafka权威指南第2版", "第2章 安装Kafka", "ZooKeeper"],
  },
  {
    id: "kfk-03-kafka-producers-q1",
    chapter: "kfk-03-kafka-producers",
    level: 1,
    question:
      "为什么“第3章 Kafka生产者——向Kafka写入数据”必须覆盖26个目录节点？",
    answer:
      "这些节点共同组成“追踪ProducerRecord经序列化、分区、批处理、压缩、网络请求、确认与重试写入Kafka的全过程”的结构、状态与证据链；漏项会使生产请求时序、分区分布、批次吞吐实验、错误分类表与幂等写入验收记录无法独立复现。",
    tags: [
      "Kafka权威指南第2版",
      "第3章 Kafka生产者——向Kafka写入数据",
      "ProducerRecord",
    ],
  },
  {
    id: "kfk-03-kafka-producers-q2",
    chapter: "kfk-03-kafka-producers",
    level: 1,
    question: "“第3章 Kafka生产者——向Kafka写入数据”的最小不变量是什么？",
    answer:
      "成功确认与失败语义由acks、超时、重试和幂等配置共同定义，序列化与分区规则稳定，重试不制造不可解释重复；需要配置、拓扑、偏移量、指标、故障轨迹和业务对账共同证明。",
    tags: [
      "Kafka权威指南第2版",
      "第3章 Kafka生产者——向Kafka写入数据",
      "序列化器",
    ],
  },
  {
    id: "kfk-03-kafka-producers-q3",
    chapter: "kfk-03-kafka-producers",
    level: 2,
    question: "怎样为“第3章 Kafka生产者——向Kafka写入数据”构造单变量反例？",
    answer:
      "固定消息、键、主题与副本，只改变acks、最少ISR、批次、消费者处理速度或单一故障点，再比较确认、可见偏移量和最终消息集合。",
    tags: [
      "Kafka权威指南第2版",
      "第3章 Kafka生产者——向Kafka写入数据",
      "分区器",
    ],
  },
  {
    id: "kfk-03-kafka-producers-q4",
    chapter: "kfk-03-kafka-producers",
    level: 2,
    question: "“第3章 Kafka生产者——向Kafka写入数据”为什么必须固定第2版边界？",
    answer:
      "2021/2022第2版固定了14章、2个附录及配置语境；后续版本只能作为差异材料，不能替代“追踪ProducerRecord经序列化、分区、批处理、压缩、网络请求、确认与重试写入Kafka的全过程”的正式分母。",
    tags: ["Kafka权威指南第2版", "第3章 Kafka生产者——向Kafka写入数据", "acks"],
  },
  {
    id: "kfk-03-kafka-producers-q5",
    chapter: "kfk-03-kafka-producers",
    level: 3,
    question: "如何验证“第3章 Kafka生产者——向Kafka写入数据”的性能与交付语义？",
    answer:
      "固定消息大小、键分布、分区、副本与交付语义，测吞吐、P50/P95/P99、滞后、ISR、CPU、网络和磁盘，并独立对账。",
    tags: [
      "Kafka权威指南第2版",
      "第3章 Kafka生产者——向Kafka写入数据",
      "幂等生产者",
    ],
  },
  {
    id: "kfk-03-kafka-producers-q6",
    chapter: "kfk-03-kafka-producers",
    level: 3,
    question: "“第3章 Kafka生产者——向Kafka写入数据”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本配置、拓扑时序、生产请求时序、分区分布、批次吞吐实验、错误分类表与幂等写入验收记录、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kafka权威指南第2版",
      "第3章 Kafka生产者——向Kafka写入数据",
      "ProducerRecord",
    ],
  },
  {
    id: "kfk-04-kafka-consumers-q1",
    chapter: "kfk-04-kafka-consumers",
    level: 1,
    question:
      "为什么“第4章 Kafka消费者——从Kafka读取数据”必须覆盖39个目录节点？",
    answer:
      "这些节点共同组成“沿消费者群组、订阅、轮询、分区分配、再均衡、偏移量提交、反序列化和退出协议建立可证明消费语义”的结构、状态与证据链；漏项会使群组分配图、轮询与提交时序、再均衡故障实验、偏移量对账与退出检查表无法独立复现。",
    tags: [
      "Kafka权威指南第2版",
      "第4章 Kafka消费者——从Kafka读取数据",
      "消费者群组",
    ],
  },
  {
    id: "kfk-04-kafka-consumers-q2",
    chapter: "kfk-04-kafka-consumers",
    level: 1,
    question: "“第4章 Kafka消费者——从Kafka读取数据”的最小不变量是什么？",
    answer:
      "每个分区在一个群组内同一时刻只有一个有效消费者，处理完成点与提交偏移量关系明确，再均衡和崩溃后可界定重复或丢失窗口；需要配置、拓扑、偏移量、指标、故障轨迹和业务对账共同证明。",
    tags: [
      "Kafka权威指南第2版",
      "第4章 Kafka消费者——从Kafka读取数据",
      "再均衡",
    ],
  },
  {
    id: "kfk-04-kafka-consumers-q3",
    chapter: "kfk-04-kafka-consumers",
    level: 2,
    question: "怎样为“第4章 Kafka消费者——从Kafka读取数据”构造单变量反例？",
    answer:
      "固定消息、键、主题与副本，只改变acks、最少ISR、批次、消费者处理速度或单一故障点，再比较确认、可见偏移量和最终消息集合。",
    tags: ["Kafka权威指南第2版", "第4章 Kafka消费者——从Kafka读取数据", "轮询"],
  },
  {
    id: "kfk-04-kafka-consumers-q4",
    chapter: "kfk-04-kafka-consumers",
    level: 2,
    question: "“第4章 Kafka消费者——从Kafka读取数据”为什么必须固定第2版边界？",
    answer:
      "2021/2022第2版固定了14章、2个附录及配置语境；后续版本只能作为差异材料，不能替代“沿消费者群组、订阅、轮询、分区分配、再均衡、偏移量提交、反序列化和退出协议建立可证明消费语义”的正式分母。",
    tags: [
      "Kafka权威指南第2版",
      "第4章 Kafka消费者——从Kafka读取数据",
      "偏移量提交",
    ],
  },
  {
    id: "kfk-04-kafka-consumers-q5",
    chapter: "kfk-04-kafka-consumers",
    level: 3,
    question: "如何验证“第4章 Kafka消费者——从Kafka读取数据”的性能与交付语义？",
    answer:
      "固定消息大小、键分布、分区、副本与交付语义，测吞吐、P50/P95/P99、滞后、ISR、CPU、网络和磁盘，并独立对账。",
    tags: [
      "Kafka权威指南第2版",
      "第4章 Kafka消费者——从Kafka读取数据",
      "反序列化器",
    ],
  },
  {
    id: "kfk-04-kafka-consumers-q6",
    chapter: "kfk-04-kafka-consumers",
    level: 3,
    question: "“第4章 Kafka消费者——从Kafka读取数据”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本配置、拓扑时序、群组分配图、轮询与提交时序、再均衡故障实验、偏移量对账与退出检查表、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: [
      "Kafka权威指南第2版",
      "第4章 Kafka消费者——从Kafka读取数据",
      "消费者群组",
    ],
  },
  {
    id: "kfk-05-programmatic-administration-q1",
    chapter: "kfk-05-programmatic-administration",
    level: 1,
    question: "为什么“第5章 编程式管理Kafka”必须覆盖21个目录节点？",
    answer:
      "这些节点共同组成“用AdminClient异步API管理主题、配置、消费者群组、集群元数据、分区、消息删除、首领选举和副本重分配”的结构、状态与证据链；漏项会使AdminClient操作矩阵、异步完成时序、变更前后快照、测试夹具与回滚手册无法独立复现。",
    tags: ["Kafka权威指南第2版", "第5章 编程式管理Kafka", "AdminClient"],
  },
  {
    id: "kfk-05-programmatic-administration-q2",
    chapter: "kfk-05-programmatic-administration",
    level: 1,
    question: "“第5章 编程式管理Kafka”的最小不变量是什么？",
    answer:
      "管理调用按future结果而非发起动作判定完成，最终一致性窗口有轮询与超时，危险变更具备前置快照、验证和回退；需要配置、拓扑、偏移量、指标、故障轨迹和业务对账共同证明。",
    tags: ["Kafka权威指南第2版", "第5章 编程式管理Kafka", "KafkaFuture"],
  },
  {
    id: "kfk-05-programmatic-administration-q3",
    chapter: "kfk-05-programmatic-administration",
    level: 2,
    question: "怎样为“第5章 编程式管理Kafka”构造单变量反例？",
    answer:
      "固定消息、键、主题与副本，只改变acks、最少ISR、批次、消费者处理速度或单一故障点，再比较确认、可见偏移量和最终消息集合。",
    tags: ["Kafka权威指南第2版", "第5章 编程式管理Kafka", "最终一致性"],
  },
  {
    id: "kfk-05-programmatic-administration-q4",
    chapter: "kfk-05-programmatic-administration",
    level: 2,
    question: "“第5章 编程式管理Kafka”为什么必须固定第2版边界？",
    answer:
      "2021/2022第2版固定了14章、2个附录及配置语境；后续版本只能作为差异材料，不能替代“用AdminClient异步API管理主题、配置、消费者群组、集群元数据、分区、消息删除、首领选举和副本重分配”的正式分母。",
    tags: ["Kafka权威指南第2版", "第5章 编程式管理Kafka", "配置变更"],
  },
  {
    id: "kfk-05-programmatic-administration-q5",
    chapter: "kfk-05-programmatic-administration",
    level: 3,
    question: "如何验证“第5章 编程式管理Kafka”的性能与交付语义？",
    answer:
      "固定消息大小、键分布、分区、副本与交付语义，测吞吐、P50/P95/P99、滞后、ISR、CPU、网络和磁盘，并独立对账。",
    tags: ["Kafka权威指南第2版", "第5章 编程式管理Kafka", "副本重分配"],
  },
  {
    id: "kfk-05-programmatic-administration-q6",
    chapter: "kfk-05-programmatic-administration",
    level: 3,
    question: "“第5章 编程式管理Kafka”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本配置、拓扑时序、AdminClient操作矩阵、异步完成时序、变更前后快照、测试夹具与回滚手册、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kafka权威指南第2版", "第5章 编程式管理Kafka", "AdminClient"],
  },
  {
    id: "kfk-06-kafka-internals-q1",
    chapter: "kfk-06-kafka-internals",
    level: 1,
    question: "为什么“第6章 深入Kafka”必须覆盖18个目录节点？",
    answer:
      "这些节点共同组成“从集群成员关系与控制器进入复制、请求处理、分层存储、分区分配、日志片段、文件格式、索引和日志压实”的结构、状态与证据链；漏项会使控制平面状态图、生产与获取请求链、分区副本布局、日志片段检查与压实前后对账无法独立复现。",
    tags: ["Kafka权威指南第2版", "第6章 深入Kafka", "控制器"],
  },
  {
    id: "kfk-06-kafka-internals-q2",
    chapter: "kfk-06-kafka-internals",
    level: 1,
    question: "“第6章 深入Kafka”的最小不变量是什么？",
    answer:
      "控制器纪元阻止旧决策生效，ISR与高水位限定可见记录，日志片段、索引和压实后的键语义能够由磁盘证据重建；需要配置、拓扑、偏移量、指标、故障轨迹和业务对账共同证明。",
    tags: ["Kafka权威指南第2版", "第6章 深入Kafka", "ISR"],
  },
  {
    id: "kfk-06-kafka-internals-q3",
    chapter: "kfk-06-kafka-internals",
    level: 2,
    question: "怎样为“第6章 深入Kafka”构造单变量反例？",
    answer:
      "固定消息、键、主题与副本，只改变acks、最少ISR、批次、消费者处理速度或单一故障点，再比较确认、可见偏移量和最终消息集合。",
    tags: ["Kafka权威指南第2版", "第6章 深入Kafka", "高水位"],
  },
  {
    id: "kfk-06-kafka-internals-q4",
    chapter: "kfk-06-kafka-internals",
    level: 2,
    question: "“第6章 深入Kafka”为什么必须固定第2版边界？",
    answer:
      "2021/2022第2版固定了14章、2个附录及配置语境；后续版本只能作为差异材料，不能替代“从集群成员关系与控制器进入复制、请求处理、分层存储、分区分配、日志片段、文件格式、索引和日志压实”的正式分母。",
    tags: ["Kafka权威指南第2版", "第6章 深入Kafka", "日志片段"],
  },
  {
    id: "kfk-06-kafka-internals-q5",
    chapter: "kfk-06-kafka-internals",
    level: 3,
    question: "如何验证“第6章 深入Kafka”的性能与交付语义？",
    answer:
      "固定消息大小、键分布、分区、副本与交付语义，测吞吐、P50/P95/P99、滞后、ISR、CPU、网络和磁盘，并独立对账。",
    tags: ["Kafka权威指南第2版", "第6章 深入Kafka", "日志压实"],
  },
  {
    id: "kfk-06-kafka-internals-q6",
    chapter: "kfk-06-kafka-internals",
    level: 3,
    question: "“第6章 深入Kafka”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本配置、拓扑时序、控制平面状态图、生产与获取请求链、分区副本布局、日志片段检查与压实前后对账、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kafka权威指南第2版", "第6章 深入Kafka", "控制器"],
  },
  {
    id: "kfk-07-reliable-data-delivery-q1",
    chapter: "kfk-07-reliable-data-delivery",
    level: 1,
    question: "为什么“第7章 可靠的数据传递”必须覆盖20个目录节点？",
    answer:
      "这些节点共同组成“把Kafka可靠性保证、复制、broker配置、生产者确认重试、消费者提交和系统验证连成端到端数据交付证明”的结构、状态与证据链；漏项会使可靠性契约、故障矩阵、生产消费配置组合、丢失重复窗口与生产监控证据无法独立复现。",
    tags: ["Kafka权威指南第2版", "第7章 可靠的数据传递", "可靠性保证"],
  },
  {
    id: "kfk-07-reliable-data-delivery-q2",
    chapter: "kfk-07-reliable-data-delivery",
    level: 1,
    question: "“第7章 可靠的数据传递”的最小不变量是什么？",
    answer:
      "复制系数、ISR、最少同步副本、acks和提交边界共同满足既定RPO/RTO；任何故障结论都由消息ID与偏移量对账证明；需要配置、拓扑、偏移量、指标、故障轨迹和业务对账共同证明。",
    tags: ["Kafka权威指南第2版", "第7章 可靠的数据传递", "复制系数"],
  },
  {
    id: "kfk-07-reliable-data-delivery-q3",
    chapter: "kfk-07-reliable-data-delivery",
    level: 2,
    question: "怎样为“第7章 可靠的数据传递”构造单变量反例？",
    answer:
      "固定消息、键、主题与副本，只改变acks、最少ISR、批次、消费者处理速度或单一故障点，再比较确认、可见偏移量和最终消息集合。",
    tags: ["Kafka权威指南第2版", "第7章 可靠的数据传递", "最少同步副本"],
  },
  {
    id: "kfk-07-reliable-data-delivery-q4",
    chapter: "kfk-07-reliable-data-delivery",
    level: 2,
    question: "“第7章 可靠的数据传递”为什么必须固定第2版边界？",
    answer:
      "2021/2022第2版固定了14章、2个附录及配置语境；后续版本只能作为差异材料，不能替代“把Kafka可靠性保证、复制、broker配置、生产者确认重试、消费者提交和系统验证连成端到端数据交付证明”的正式分母。",
    tags: ["Kafka权威指南第2版", "第7章 可靠的数据传递", "发送确认"],
  },
  {
    id: "kfk-07-reliable-data-delivery-q5",
    chapter: "kfk-07-reliable-data-delivery",
    level: 3,
    question: "如何验证“第7章 可靠的数据传递”的性能与交付语义？",
    answer:
      "固定消息大小、键分布、分区、副本与交付语义，测吞吐、P50/P95/P99、滞后、ISR、CPU、网络和磁盘，并独立对账。",
    tags: ["Kafka权威指南第2版", "第7章 可靠的数据传递", "数据对账"],
  },
  {
    id: "kfk-07-reliable-data-delivery-q6",
    chapter: "kfk-07-reliable-data-delivery",
    level: 3,
    question: "“第7章 可靠的数据传递”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本配置、拓扑时序、可靠性契约、故障矩阵、生产消费配置组合、丢失重复窗口与生产监控证据、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kafka权威指南第2版", "第7章 可靠的数据传递", "可靠性保证"],
  },
  {
    id: "kfk-08-exactly-once-semantics-q1",
    chapter: "kfk-08-exactly-once-semantics",
    level: 1,
    question: "为什么“第8章 精确一次性语义”必须覆盖14个目录节点？",
    answer:
      "这些节点共同组成“区分幂等生产者与事务，解释生产者ID、序列号、事务ID、隔离级别和事务协调如何限定精确一次性语义”的结构、状态与证据链；漏项会使重复写入反例、事务状态时序、隔离读实验、失败恢复轨迹与适用边界表无法独立复现。",
    tags: ["Kafka权威指南第2版", "第8章 精确一次性语义", "幂等生产者"],
  },
  {
    id: "kfk-08-exactly-once-semantics-q2",
    chapter: "kfk-08-exactly-once-semantics",
    level: 1,
    question: "“第8章 精确一次性语义”的最小不变量是什么？",
    answer:
      "精确一次只在明确的Kafka读处理写边界成立；事务记录、偏移量与输出原子提交，外部副作用不被口号式纳入保证；需要配置、拓扑、偏移量、指标、故障轨迹和业务对账共同证明。",
    tags: ["Kafka权威指南第2版", "第8章 精确一次性语义", "生产者ID"],
  },
  {
    id: "kfk-08-exactly-once-semantics-q3",
    chapter: "kfk-08-exactly-once-semantics",
    level: 2,
    question: "怎样为“第8章 精确一次性语义”构造单变量反例？",
    answer:
      "固定消息、键、主题与副本，只改变acks、最少ISR、批次、消费者处理速度或单一故障点，再比较确认、可见偏移量和最终消息集合。",
    tags: ["Kafka权威指南第2版", "第8章 精确一次性语义", "事务ID"],
  },
  {
    id: "kfk-08-exactly-once-semantics-q4",
    chapter: "kfk-08-exactly-once-semantics",
    level: 2,
    question: "“第8章 精确一次性语义”为什么必须固定第2版边界？",
    answer:
      "2021/2022第2版固定了14章、2个附录及配置语境；后续版本只能作为差异材料，不能替代“区分幂等生产者与事务，解释生产者ID、序列号、事务ID、隔离级别和事务协调如何限定精确一次性语义”的正式分母。",
    tags: ["Kafka权威指南第2版", "第8章 精确一次性语义", "隔离级别"],
  },
  {
    id: "kfk-08-exactly-once-semantics-q5",
    chapter: "kfk-08-exactly-once-semantics",
    level: 3,
    question: "如何验证“第8章 精确一次性语义”的性能与交付语义？",
    answer:
      "固定消息大小、键分布、分区、副本与交付语义，测吞吐、P50/P95/P99、滞后、ISR、CPU、网络和磁盘，并独立对账。",
    tags: ["Kafka权威指南第2版", "第8章 精确一次性语义", "事务协调器"],
  },
  {
    id: "kfk-08-exactly-once-semantics-q6",
    chapter: "kfk-08-exactly-once-semantics",
    level: 3,
    question: "“第8章 精确一次性语义”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本配置、拓扑时序、重复写入反例、事务状态时序、隔离读实验、失败恢复轨迹与适用边界表、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kafka权威指南第2版", "第8章 精确一次性语义", "幂等生产者"],
  },
  {
    id: "kfk-09-building-data-pipelines-q1",
    chapter: "kfk-09-building-data-pipelines",
    level: 1,
    question: "为什么“第9章 构建数据管道”必须覆盖21个目录节点？",
    answer:
      "这些节点共同组成“依据及时性、可靠性、吞吐、格式、转换、安全、故障和耦合约束选择Connect API、客户端API或其他摄取框架”的结构、状态与证据链；漏项会使管道需求表、连接器配置、offset链路、单个消息转换测试、故障恢复与数据对账无法独立复现。",
    tags: ["Kafka权威指南第2版", "第9章 构建数据管道", "Kafka Connect"],
  },
  {
    id: "kfk-09-building-data-pipelines-q2",
    chapter: "kfk-09-building-data-pipelines",
    level: 1,
    question: "“第9章 构建数据管道”的最小不变量是什么？",
    answer:
      "source offset、Kafka offset与sink结果可关联，模式演化可兼容，重试和死信不会破坏可追踪性，扩缩容保持任务所有权清晰；需要配置、拓扑、偏移量、指标、故障轨迹和业务对账共同证明。",
    tags: ["Kafka权威指南第2版", "第9章 构建数据管道", "source connector"],
  },
  {
    id: "kfk-09-building-data-pipelines-q3",
    chapter: "kfk-09-building-data-pipelines",
    level: 2,
    question: "怎样为“第9章 构建数据管道”构造单变量反例？",
    answer:
      "固定消息、键、主题与副本，只改变acks、最少ISR、批次、消费者处理速度或单一故障点，再比较确认、可见偏移量和最终消息集合。",
    tags: ["Kafka权威指南第2版", "第9章 构建数据管道", "sink connector"],
  },
  {
    id: "kfk-09-building-data-pipelines-q4",
    chapter: "kfk-09-building-data-pipelines",
    level: 2,
    question: "“第9章 构建数据管道”为什么必须固定第2版边界？",
    answer:
      "2021/2022第2版固定了14章、2个附录及配置语境；后续版本只能作为差异材料，不能替代“依据及时性、可靠性、吞吐、格式、转换、安全、故障和耦合约束选择Connect API、客户端API或其他摄取框架”的正式分母。",
    tags: ["Kafka权威指南第2版", "第9章 构建数据管道", "单个消息转换"],
  },
  {
    id: "kfk-09-building-data-pipelines-q5",
    chapter: "kfk-09-building-data-pipelines",
    level: 3,
    question: "如何验证“第9章 构建数据管道”的性能与交付语义？",
    answer:
      "固定消息大小、键分布、分区、副本与交付语义，测吞吐、P50/P95/P99、滞后、ISR、CPU、网络和磁盘，并独立对账。",
    tags: ["Kafka权威指南第2版", "第9章 构建数据管道", "offset对账"],
  },
  {
    id: "kfk-09-building-data-pipelines-q6",
    chapter: "kfk-09-building-data-pipelines",
    level: 3,
    question: "“第9章 构建数据管道”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本配置、拓扑时序、管道需求表、连接器配置、offset链路、单个消息转换测试、故障恢复与数据对账、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kafka权威指南第2版", "第9章 构建数据管道", "Kafka Connect"],
  },
  {
    id: "kfk-10-cross-cluster-mirroring-q1",
    chapter: "kfk-10-cross-cluster-mirroring",
    level: 1,
    question: "为什么“第10章 跨集群数据镜像”必须覆盖18个目录节点？",
    answer:
      "这些节点共同组成“从跨数据中心现实约束比较星型、双活、主备与延展集群，部署、保护、调优MirrorMaker并评估替代方案”的结构、状态与证据链；漏项会使多集群拓扑决策、MirrorMaker配置、延迟与缺口仪表、切换演练和冲突处理手册无法独立复现。",
    tags: ["Kafka权威指南第2版", "第10章 跨集群数据镜像", "跨集群镜像"],
  },
  {
    id: "kfk-10-cross-cluster-mirroring-q2",
    chapter: "kfk-10-cross-cluster-mirroring",
    level: 1,
    question: "“第10章 跨集群数据镜像”的最小不变量是什么？",
    answer:
      "复制方向、主题命名、消费者位置、冲突所有权和故障切换条件明确；跨集群延迟和数据缺口可测量且能对账；需要配置、拓扑、偏移量、指标、故障轨迹和业务对账共同证明。",
    tags: ["Kafka权威指南第2版", "第10章 跨集群数据镜像", "星型架构"],
  },
  {
    id: "kfk-10-cross-cluster-mirroring-q3",
    chapter: "kfk-10-cross-cluster-mirroring",
    level: 2,
    question: "怎样为“第10章 跨集群数据镜像”构造单变量反例？",
    answer:
      "固定消息、键、主题与副本，只改变acks、最少ISR、批次、消费者处理速度或单一故障点，再比较确认、可见偏移量和最终消息集合。",
    tags: ["Kafka权威指南第2版", "第10章 跨集群数据镜像", "双活架构"],
  },
  {
    id: "kfk-10-cross-cluster-mirroring-q4",
    chapter: "kfk-10-cross-cluster-mirroring",
    level: 2,
    question: "“第10章 跨集群数据镜像”为什么必须固定第2版边界？",
    answer:
      "2021/2022第2版固定了14章、2个附录及配置语境；后续版本只能作为差异材料，不能替代“从跨数据中心现实约束比较星型、双活、主备与延展集群，部署、保护、调优MirrorMaker并评估替代方案”的正式分母。",
    tags: ["Kafka权威指南第2版", "第10章 跨集群数据镜像", "主备架构"],
  },
  {
    id: "kfk-10-cross-cluster-mirroring-q5",
    chapter: "kfk-10-cross-cluster-mirroring",
    level: 3,
    question: "如何验证“第10章 跨集群数据镜像”的性能与交付语义？",
    answer:
      "固定消息大小、键分布、分区、副本与交付语义，测吞吐、P50/P95/P99、滞后、ISR、CPU、网络和磁盘，并独立对账。",
    tags: ["Kafka权威指南第2版", "第10章 跨集群数据镜像", "MirrorMaker"],
  },
  {
    id: "kfk-10-cross-cluster-mirroring-q6",
    chapter: "kfk-10-cross-cluster-mirroring",
    level: 3,
    question: "“第10章 跨集群数据镜像”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本配置、拓扑时序、多集群拓扑决策、MirrorMaker配置、延迟与缺口仪表、切换演练和冲突处理手册、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kafka权威指南第2版", "第10章 跨集群数据镜像", "跨集群镜像"],
  },
  {
    id: "kfk-11-securing-kafka-q1",
    chapter: "kfk-11-securing-kafka",
    level: 1,
    question: "为什么“第11章 保护Kafka”必须覆盖19个目录节点？",
    answer:
      "这些节点共同组成“把安全协议、SSL、SASL、重新认证、加密、授权、审计、ZooKeeper安全和平台边界组合成最小权限体系”的结构、状态与证据链；漏项会使威胁模型、协议矩阵、证书与凭据轮换演练、ACL测试、审计样本和ZooKeeper加固清单无法独立复现。",
    tags: ["Kafka权威指南第2版", "第11章 保护Kafka", "安全协议"],
  },
  {
    id: "kfk-11-securing-kafka-q2",
    chapter: "kfk-11-securing-kafka",
    level: 1,
    question: "“第11章 保护Kafka”的最小不变量是什么？",
    answer:
      "客户端、broker与管理员身份可验证，传输保密，资源授权默认拒绝，密钥轮换不中断服务，审计能关联主体与动作；需要配置、拓扑、偏移量、指标、故障轨迹和业务对账共同证明。",
    tags: ["Kafka权威指南第2版", "第11章 保护Kafka", "SSL"],
  },
  {
    id: "kfk-11-securing-kafka-q3",
    chapter: "kfk-11-securing-kafka",
    level: 2,
    question: "怎样为“第11章 保护Kafka”构造单变量反例？",
    answer:
      "固定消息、键、主题与副本，只改变acks、最少ISR、批次、消费者处理速度或单一故障点，再比较确认、可见偏移量和最终消息集合。",
    tags: ["Kafka权威指南第2版", "第11章 保护Kafka", "SASL"],
  },
  {
    id: "kfk-11-securing-kafka-q4",
    chapter: "kfk-11-securing-kafka",
    level: 2,
    question: "“第11章 保护Kafka”为什么必须固定第2版边界？",
    answer:
      "2021/2022第2版固定了14章、2个附录及配置语境；后续版本只能作为差异材料，不能替代“把安全协议、SSL、SASL、重新认证、加密、授权、审计、ZooKeeper安全和平台边界组合成最小权限体系”的正式分母。",
    tags: ["Kafka权威指南第2版", "第11章 保护Kafka", "AclAuthorizer"],
  },
  {
    id: "kfk-11-securing-kafka-q5",
    chapter: "kfk-11-securing-kafka",
    level: 3,
    question: "如何验证“第11章 保护Kafka”的性能与交付语义？",
    answer:
      "固定消息大小、键分布、分区、副本与交付语义，测吞吐、P50/P95/P99、滞后、ISR、CPU、网络和磁盘，并独立对账。",
    tags: ["Kafka权威指南第2版", "第11章 保护Kafka", "审计"],
  },
  {
    id: "kfk-11-securing-kafka-q6",
    chapter: "kfk-11-securing-kafka",
    level: 3,
    question: "“第11章 保护Kafka”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本配置、拓扑时序、威胁模型、协议矩阵、证书与凭据轮换演练、ACL测试、审计样本和ZooKeeper加固清单、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kafka权威指南第2版", "第11章 保护Kafka", "安全协议"],
  },
  {
    id: "kfk-12-administering-kafka-q1",
    chapter: "kfk-12-administering-kafka",
    level: 1,
    question: "为什么“第12章 管理Kafka”必须覆盖31个目录节点？",
    answer:
      "这些节点共同组成“系统执行主题、消费者群组、动态配置、生产消费、分区管理、日志检查、副本验证及高风险底层操作”的结构、状态与证据链；漏项会使管理命令运行手册、变更快照、分区副本计划、日志诊断记录与危险操作审批模板无法独立复现。",
    tags: ["Kafka权威指南第2版", "第12章 管理Kafka", "主题操作"],
  },
  {
    id: "kfk-12-administering-kafka-q2",
    chapter: "kfk-12-administering-kafka",
    level: 1,
    question: "“第12章 管理Kafka”的最小不变量是什么？",
    answer:
      "每次管理操作都有对象、前置状态、预期状态、完成证据和回退；不可逆操作只在备份、停止边界和双人复核后执行；需要配置、拓扑、偏移量、指标、故障轨迹和业务对账共同证明。",
    tags: ["Kafka权威指南第2版", "第12章 管理Kafka", "消费者群组"],
  },
  {
    id: "kfk-12-administering-kafka-q3",
    chapter: "kfk-12-administering-kafka",
    level: 2,
    question: "怎样为“第12章 管理Kafka”构造单变量反例？",
    answer:
      "固定消息、键、主题与副本，只改变acks、最少ISR、批次、消费者处理速度或单一故障点，再比较确认、可见偏移量和最终消息集合。",
    tags: ["Kafka权威指南第2版", "第12章 管理Kafka", "动态配置"],
  },
  {
    id: "kfk-12-administering-kafka-q4",
    chapter: "kfk-12-administering-kafka",
    level: 2,
    question: "“第12章 管理Kafka”为什么必须固定第2版边界？",
    answer:
      "2021/2022第2版固定了14章、2个附录及配置语境；后续版本只能作为差异材料，不能替代“系统执行主题、消费者群组、动态配置、生产消费、分区管理、日志检查、副本验证及高风险底层操作”的正式分母。",
    tags: ["Kafka权威指南第2版", "第12章 管理Kafka", "首选首领选举"],
  },
  {
    id: "kfk-12-administering-kafka-q5",
    chapter: "kfk-12-administering-kafka",
    level: 3,
    question: "如何验证“第12章 管理Kafka”的性能与交付语义？",
    answer:
      "固定消息大小、键分布、分区、副本与交付语义，测吞吐、P50/P95/P99、滞后、ISR、CPU、网络和磁盘，并独立对账。",
    tags: ["Kafka权威指南第2版", "第12章 管理Kafka", "副本验证"],
  },
  {
    id: "kfk-12-administering-kafka-q6",
    chapter: "kfk-12-administering-kafka",
    level: 3,
    question: "“第12章 管理Kafka”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本配置、拓扑时序、管理命令运行手册、变更快照、分区副本计划、日志诊断记录与危险操作审批模板、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kafka权威指南第2版", "第12章 管理Kafka", "主题操作"],
  },
  {
    id: "kfk-13-monitoring-kafka-q1",
    chapter: "kfk-13-monitoring-kafka",
    level: 1,
    question: "为什么“第13章 监控Kafka”必须覆盖23个目录节点？",
    answer:
      "这些节点共同组成“从指标来源和应用健康出发建立SLI、SLO与告警，覆盖broker、主题分区、JVM、操作系统、日志、客户端、配额、滞后和端到端监控”的结构、状态与证据链；漏项会使指标字典、SLO预算、告警规则、非同步分区诊断树、客户端与端到端仪表盘无法独立复现。",
    tags: ["Kafka权威指南第2版", "第13章 监控Kafka", "指标"],
  },
  {
    id: "kfk-13-monitoring-kafka-q2",
    chapter: "kfk-13-monitoring-kafka",
    level: 1,
    question: "“第13章 监控Kafka”的最小不变量是什么？",
    answer:
      "每个告警绑定用户可见风险、时间窗口和处置动作；broker健康、客户端交付、消费者滞后与端到端新鲜度不能互相替代；需要配置、拓扑、偏移量、指标、故障轨迹和业务对账共同证明。",
    tags: ["Kafka权威指南第2版", "第13章 监控Kafka", "SLI"],
  },
  {
    id: "kfk-13-monitoring-kafka-q3",
    chapter: "kfk-13-monitoring-kafka",
    level: 2,
    question: "怎样为“第13章 监控Kafka”构造单变量反例？",
    answer:
      "固定消息、键、主题与副本，只改变acks、最少ISR、批次、消费者处理速度或单一故障点，再比较确认、可见偏移量和最终消息集合。",
    tags: ["Kafka权威指南第2版", "第13章 监控Kafka", "SLO"],
  },
  {
    id: "kfk-13-monitoring-kafka-q4",
    chapter: "kfk-13-monitoring-kafka",
    level: 2,
    question: "“第13章 监控Kafka”为什么必须固定第2版边界？",
    answer:
      "2021/2022第2版固定了14章、2个附录及配置语境；后续版本只能作为差异材料，不能替代“从指标来源和应用健康出发建立SLI、SLO与告警，覆盖broker、主题分区、JVM、操作系统、日志、客户端、配额、滞后和端到端监控”的正式分母。",
    tags: ["Kafka权威指南第2版", "第13章 监控Kafka", "非同步分区"],
  },
  {
    id: "kfk-13-monitoring-kafka-q5",
    chapter: "kfk-13-monitoring-kafka",
    level: 3,
    question: "如何验证“第13章 监控Kafka”的性能与交付语义？",
    answer:
      "固定消息大小、键分布、分区、副本与交付语义，测吞吐、P50/P95/P99、滞后、ISR、CPU、网络和磁盘，并独立对账。",
    tags: ["Kafka权威指南第2版", "第13章 监控Kafka", "消费者滞后"],
  },
  {
    id: "kfk-13-monitoring-kafka-q6",
    chapter: "kfk-13-monitoring-kafka",
    level: 3,
    question: "“第13章 监控Kafka”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本配置、拓扑时序、指标字典、SLO预算、告警规则、非同步分区诊断树、客户端与端到端仪表盘、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kafka权威指南第2版", "第13章 监控Kafka", "指标"],
  },
  {
    id: "kfk-14-stream-processing-q1",
    chapter: "kfk-14-stream-processing",
    level: 1,
    question: "为什么“第14章 流式处理”必须覆盖31个目录节点？",
    answer:
      "这些节点共同组成“用拓扑、时间、状态、流表二元性、窗口和处理保证解释设计模式，并完成Kafka Streams拓扑的构建、优化、测试、扩展与故障恢复”的结构、状态与证据链；漏项会使流处理拓扑、窗口与乱序样本、状态恢复演练、TopologyTestDriver测试和框架选型矩阵无法独立复现。",
    tags: ["Kafka权威指南第2版", "第14章 流式处理", "处理拓扑"],
  },
  {
    id: "kfk-14-stream-processing-q2",
    chapter: "kfk-14-stream-processing",
    level: 1,
    question: "“第14章 流式处理”的最小不变量是什么？",
    answer:
      "事件时间与处理时间不混淆，状态和变更日志可恢复，连接与窗口边界明确，乱序、重放和故障不会产生未说明结果；需要配置、拓扑、偏移量、指标、故障轨迹和业务对账共同证明。",
    tags: ["Kafka权威指南第2版", "第14章 流式处理", "事件时间"],
  },
  {
    id: "kfk-14-stream-processing-q3",
    chapter: "kfk-14-stream-processing",
    level: 2,
    question: "怎样为“第14章 流式处理”构造单变量反例？",
    answer:
      "固定消息、键、主题与副本，只改变acks、最少ISR、批次、消费者处理速度或单一故障点，再比较确认、可见偏移量和最终消息集合。",
    tags: ["Kafka权威指南第2版", "第14章 流式处理", "状态存储"],
  },
  {
    id: "kfk-14-stream-processing-q4",
    chapter: "kfk-14-stream-processing",
    level: 2,
    question: "“第14章 流式处理”为什么必须固定第2版边界？",
    answer:
      "2021/2022第2版固定了14章、2个附录及配置语境；后续版本只能作为差异材料，不能替代“用拓扑、时间、状态、流表二元性、窗口和处理保证解释设计模式，并完成Kafka Streams拓扑的构建、优化、测试、扩展与故障恢复”的正式分母。",
    tags: ["Kafka权威指南第2版", "第14章 流式处理", "流与表"],
  },
  {
    id: "kfk-14-stream-processing-q5",
    chapter: "kfk-14-stream-processing",
    level: 3,
    question: "如何验证“第14章 流式处理”的性能与交付语义？",
    answer:
      "固定消息大小、键分布、分区、副本与交付语义，测吞吐、P50/P95/P99、滞后、ISR、CPU、网络和磁盘，并独立对账。",
    tags: ["Kafka权威指南第2版", "第14章 流式处理", "时间窗口"],
  },
  {
    id: "kfk-14-stream-processing-q6",
    chapter: "kfk-14-stream-processing",
    level: 3,
    question: "“第14章 流式处理”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本配置、拓扑时序、流处理拓扑、窗口与乱序样本、状态恢复演练、TopologyTestDriver测试和框架选型矩阵、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kafka权威指南第2版", "第14章 流式处理", "处理拓扑"],
  },
  {
    id: "kfk-appendix-a-installation-q1",
    chapter: "kfk-appendix-a-installation",
    level: 1,
    question: "为什么“附录A 在其他操作系统中安装Kafka”必须覆盖6个目录节点？",
    answer:
      "这些节点共同组成“分别复现Windows与macOS上的Kafka安装路径，区分WSL、原生Java、Homebrew和手工安装的文件、进程与网络边界”的结构、状态与证据链；漏项会使Windows与macOS安装矩阵、环境探针、启动日志、端到端收发测试和清理脚本无法独立复现。",
    tags: ["Kafka权威指南第2版", "附录A 在其他操作系统中安装Kafka", "Windows"],
  },
  {
    id: "kfk-appendix-a-installation-q2",
    chapter: "kfk-appendix-a-installation",
    level: 1,
    question: "“附录A 在其他操作系统中安装Kafka”的最小不变量是什么？",
    answer:
      "Java版本、目录、监听地址、数据路径和启动停止步骤可由新环境重放，平台差异不改变Kafka协议与数据验收；需要配置、拓扑、偏移量、指标、故障轨迹和业务对账共同证明。",
    tags: ["Kafka权威指南第2版", "附录A 在其他操作系统中安装Kafka", "WSL"],
  },
  {
    id: "kfk-appendix-a-installation-q3",
    chapter: "kfk-appendix-a-installation",
    level: 2,
    question: "怎样为“附录A 在其他操作系统中安装Kafka”构造单变量反例？",
    answer:
      "固定消息、键、主题与副本，只改变acks、最少ISR、批次、消费者处理速度或单一故障点，再比较确认、可见偏移量和最终消息集合。",
    tags: ["Kafka权威指南第2版", "附录A 在其他操作系统中安装Kafka", "原生Java"],
  },
  {
    id: "kfk-appendix-a-installation-q4",
    chapter: "kfk-appendix-a-installation",
    level: 2,
    question: "“附录A 在其他操作系统中安装Kafka”为什么必须固定第2版边界？",
    answer:
      "2021/2022第2版固定了14章、2个附录及配置语境；后续版本只能作为差异材料，不能替代“分别复现Windows与macOS上的Kafka安装路径，区分WSL、原生Java、Homebrew和手工安装的文件、进程与网络边界”的正式分母。",
    tags: ["Kafka权威指南第2版", "附录A 在其他操作系统中安装Kafka", "macOS"],
  },
  {
    id: "kfk-appendix-a-installation-q5",
    chapter: "kfk-appendix-a-installation",
    level: 3,
    question: "如何验证“附录A 在其他操作系统中安装Kafka”的性能与交付语义？",
    answer:
      "固定消息大小、键分布、分区、副本与交付语义，测吞吐、P50/P95/P99、滞后、ISR、CPU、网络和磁盘，并独立对账。",
    tags: ["Kafka权威指南第2版", "附录A 在其他操作系统中安装Kafka", "Homebrew"],
  },
  {
    id: "kfk-appendix-a-installation-q6",
    chapter: "kfk-appendix-a-installation",
    level: 3,
    question: "“附录A 在其他操作系统中安装Kafka”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本配置、拓扑时序、Windows与macOS安装矩阵、环境探针、启动日志、端到端收发测试和清理脚本、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kafka权威指南第2版", "附录A 在其他操作系统中安装Kafka", "Windows"],
  },
  {
    id: "kfk-appendix-b-tools-q1",
    chapter: "kfk-appendix-b-tools",
    level: 1,
    question: "为什么“附录B 其他Kafka工具”必须覆盖5个目录节点？",
    answer:
      "这些节点共同组成“按综合平台、集群部署管理、监控查看、客户端开发库和流处理五类能力评估Kafka生态工具”的结构、状态与证据链；漏项会使工具能力矩阵、兼容性验证、最小权限记录、故障退出演练和替换成本评估无法独立复现。",
    tags: ["Kafka权威指南第2版", "附录B 其他Kafka工具", "综合平台"],
  },
  {
    id: "kfk-appendix-b-tools-q2",
    chapter: "kfk-appendix-b-tools",
    level: 1,
    question: "“附录B 其他Kafka工具”的最小不变量是什么？",
    answer:
      "工具选择由版本兼容、协议能力、权限边界、可观测性、恢复与退出成本决定，不由演示截图或功能数量决定；需要配置、拓扑、偏移量、指标、故障轨迹和业务对账共同证明。",
    tags: ["Kafka权威指南第2版", "附录B 其他Kafka工具", "集群管理"],
  },
  {
    id: "kfk-appendix-b-tools-q3",
    chapter: "kfk-appendix-b-tools",
    level: 2,
    question: "怎样为“附录B 其他Kafka工具”构造单变量反例？",
    answer:
      "固定消息、键、主题与副本，只改变acks、最少ISR、批次、消费者处理速度或单一故障点，再比较确认、可见偏移量和最终消息集合。",
    tags: ["Kafka权威指南第2版", "附录B 其他Kafka工具", "监控查看"],
  },
  {
    id: "kfk-appendix-b-tools-q4",
    chapter: "kfk-appendix-b-tools",
    level: 2,
    question: "“附录B 其他Kafka工具”为什么必须固定第2版边界？",
    answer:
      "2021/2022第2版固定了14章、2个附录及配置语境；后续版本只能作为差异材料，不能替代“按综合平台、集群部署管理、监控查看、客户端开发库和流处理五类能力评估Kafka生态工具”的正式分母。",
    tags: ["Kafka权威指南第2版", "附录B 其他Kafka工具", "客户端库"],
  },
  {
    id: "kfk-appendix-b-tools-q5",
    chapter: "kfk-appendix-b-tools",
    level: 3,
    question: "如何验证“附录B 其他Kafka工具”的性能与交付语义？",
    answer:
      "固定消息大小、键分布、分区、副本与交付语义，测吞吐、P50/P95/P99、滞后、ISR、CPU、网络和磁盘，并独立对账。",
    tags: ["Kafka权威指南第2版", "附录B 其他Kafka工具", "流处理框架"],
  },
  {
    id: "kfk-appendix-b-tools-q6",
    chapter: "kfk-appendix-b-tools",
    level: 3,
    question: "“附录B 其他Kafka工具”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本配置、拓扑时序、工具能力矩阵、兼容性验证、最小权限记录、故障退出演练和替换成本评估、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kafka权威指南第2版", "附录B 其他Kafka工具", "综合平台"],
  },
  {
    id: "kfk-official-final-review-q1",
    chapter: "kfk-official-final-review",
    level: 1,
    question: "为什么“第2版全书总复习”必须覆盖16个目录节点？",
    answer:
      "这些节点共同组成“贯通16个正式单元，设计一套可部署、可靠、安全、可监控、可跨集群恢复并支持流处理的数据平台”的结构、状态与证据链；漏项会使全书架构决策、容量与可靠性实验、故障演练、SLO仪表和独立交接包无法独立复现。",
    tags: ["Kafka权威指南第2版", "第2版全书总复习", "分区契约"],
  },
  {
    id: "kfk-official-final-review-q2",
    chapter: "kfk-official-final-review",
    level: 1,
    question: "“第2版全书总复习”的最小不变量是什么？",
    answer:
      "目录、拓扑、性能、交付语义、安全、运维和数据对账七类证据同时通过，任何单点成功不能平均掉失败门；需要配置、拓扑、偏移量、指标、故障轨迹和业务对账共同证明。",
    tags: ["Kafka权威指南第2版", "第2版全书总复习", "交付语义"],
  },
  {
    id: "kfk-official-final-review-q3",
    chapter: "kfk-official-final-review",
    level: 2,
    question: "怎样为“第2版全书总复习”构造单变量反例？",
    answer:
      "固定消息、键、主题与副本，只改变acks、最少ISR、批次、消费者处理速度或单一故障点，再比较确认、可见偏移量和最终消息集合。",
    tags: ["Kafka权威指南第2版", "第2版全书总复习", "事务边界"],
  },
  {
    id: "kfk-official-final-review-q4",
    chapter: "kfk-official-final-review",
    level: 2,
    question: "“第2版全书总复习”为什么必须固定第2版边界？",
    answer:
      "2021/2022第2版固定了14章、2个附录及配置语境；后续版本只能作为差异材料，不能替代“贯通16个正式单元，设计一套可部署、可靠、安全、可监控、可跨集群恢复并支持流处理的数据平台”的正式分母。",
    tags: ["Kafka权威指南第2版", "第2版全书总复习", "跨集群恢复"],
  },
  {
    id: "kfk-official-final-review-q5",
    chapter: "kfk-official-final-review",
    level: 3,
    question: "如何验证“第2版全书总复习”的性能与交付语义？",
    answer:
      "固定消息大小、键分布、分区、副本与交付语义，测吞吐、P50/P95/P99、滞后、ISR、CPU、网络和磁盘，并独立对账。",
    tags: ["Kafka权威指南第2版", "第2版全书总复习", "端到端SLO"],
  },
  {
    id: "kfk-official-final-review-q6",
    chapter: "kfk-official-final-review",
    level: 3,
    question: "“第2版全书总复习”独立交接必须包含哪些材料？",
    answer:
      "需要完整目录映射、版本配置、拓扑时序、全书架构决策、容量与可靠性实验、故障演练、SLO仪表和独立交接包、负载、故障、对账、停止、恢复、回退和责任人。",
    tags: ["Kafka权威指南第2版", "第2版全书总复习", "分区契约"],
  },
];
