import type { ReviewQuestion } from "../review-questions";

export const phaOfficialQuestions: ReviewQuestion[] = [
  {
    chapter: "pha-official-learning-map",
    tags: ["凤凰架构", "2021纸书版", "2021纸书版权威学习地图", "五部分结构"],
    id: "pha-official-learning-map-q1",
    level: 1,
    question: "为什么“2021纸书版权威学习地图”必须覆盖23个正式目录节点？",
    answer:
      "这些节点共同组成“建立5部分、16章、2附录的依赖图，固定2021纸书版与作者v1.0.20210629快照边界”的机制与证据链；漏项会使完整目录映射、五部分依赖图、版本边界、实验与复习索引无法独立复现。",
  },
  {
    chapter: "pha-official-learning-map",
    tags: ["凤凰架构", "2021纸书版", "2021纸书版权威学习地图", "五部分结构"],
    id: "pha-official-learning-map-q2",
    level: 1,
    question: "“2021纸书版权威学习地图”的最小不变量是什么？",
    answer:
      "18个原书单元和77个唯一正式节点全部可达，每个结论都能回指纸书目录、作者快照和可复现实验。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-official-learning-map",
    tags: ["凤凰架构", "2021纸书版", "2021纸书版权威学习地图", "五部分结构"],
    id: "pha-official-learning-map-q3",
    level: 2,
    question: "怎样为“2021纸书版权威学习地图”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-official-learning-map",
    tags: ["凤凰架构", "2021纸书版", "2021纸书版权威学习地图", "五部分结构"],
    id: "pha-official-learning-map-q4",
    level: 2,
    question: "“2021纸书版权威学习地图”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-official-learning-map",
    tags: ["凤凰架构", "2021纸书版", "2021纸书版权威学习地图", "五部分结构"],
    id: "pha-official-learning-map-q5",
    level: 3,
    question: "如何验证“2021纸书版权威学习地图”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-official-learning-map",
    tags: ["凤凰架构", "2021纸书版", "2021纸书版权威学习地图", "五部分结构"],
    id: "pha-official-learning-map-q6",
    level: 3,
    question: "“2021纸书版权威学习地图”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、完整目录映射、五部分依赖图、版本边界、实验与复习索引、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-01-architecture-evolution",
    tags: ["凤凰架构", "2021纸书版", "第1章 服务架构演进史", "DCE"],
    id: "pha-01-architecture-evolution-q1",
    level: 1,
    question: "为什么“第1章 服务架构演进史”必须覆盖6个正式目录节点？",
    answer:
      "这些节点共同组成“从原始分布式、单体、SOA、微服务、后微服务到无服务，解释架构演进解决了什么、又引入了什么”的机制与证据链；漏项会使六时代对照表、能力迁移图、复杂性账本、选型退出条件无法独立复现。",
  },
  {
    chapter: "pha-01-architecture-evolution",
    tags: ["凤凰架构", "2021纸书版", "第1章 服务架构演进史", "DCE"],
    id: "pha-01-architecture-evolution-q2",
    level: 1,
    question: "“第1章 服务架构演进史”的最小不变量是什么？",
    answer:
      "每次架构选择都同时写出业务驱动力、收益、代价与退出条件，不能把时间顺序误写成优劣排名。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-01-architecture-evolution",
    tags: ["凤凰架构", "2021纸书版", "第1章 服务架构演进史", "DCE"],
    id: "pha-01-architecture-evolution-q3",
    level: 2,
    question: "怎样为“第1章 服务架构演进史”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-01-architecture-evolution",
    tags: ["凤凰架构", "2021纸书版", "第1章 服务架构演进史", "DCE"],
    id: "pha-01-architecture-evolution-q4",
    level: 2,
    question: "“第1章 服务架构演进史”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-01-architecture-evolution",
    tags: ["凤凰架构", "2021纸书版", "第1章 服务架构演进史", "DCE"],
    id: "pha-01-architecture-evolution-q5",
    level: 3,
    question: "如何验证“第1章 服务架构演进史”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-01-architecture-evolution",
    tags: ["凤凰架构", "2021纸书版", "第1章 服务架构演进史", "DCE"],
    id: "pha-01-architecture-evolution-q6",
    level: 3,
    question: "“第1章 服务架构演进史”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、六时代对照表、能力迁移图、复杂性账本、选型退出条件、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-02-remote-services",
    tags: ["凤凰架构", "2021纸书版", "第2章 访问远程服务", "RPC"],
    id: "pha-02-remote-services-q1",
    level: 1,
    question: "为什么“第2章 访问远程服务”必须覆盖2个正式目录节点？",
    answer:
      "这些节点共同组成“比较RPC与REST的抽象、协议、语义和演进方式，建立远程调用绝不等价于本地调用的边界”的机制与证据链；漏项会使远程调用时序、RPC与REST决策表、失败语义矩阵、兼容性契约无法独立复现。",
  },
  {
    chapter: "pha-02-remote-services",
    tags: ["凤凰架构", "2021纸书版", "第2章 访问远程服务", "RPC"],
    id: "pha-02-remote-services-q2",
    level: 1,
    question: "“第2章 访问远程服务”的最小不变量是什么？",
    answer:
      "契约、超时、幂等、版本与失败语义必须跨客户端和服务端一致，传输成功不等于业务成功。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-02-remote-services",
    tags: ["凤凰架构", "2021纸书版", "第2章 访问远程服务", "RPC"],
    id: "pha-02-remote-services-q3",
    level: 2,
    question: "怎样为“第2章 访问远程服务”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-02-remote-services",
    tags: ["凤凰架构", "2021纸书版", "第2章 访问远程服务", "RPC"],
    id: "pha-02-remote-services-q4",
    level: 2,
    question: "“第2章 访问远程服务”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-02-remote-services",
    tags: ["凤凰架构", "2021纸书版", "第2章 访问远程服务", "RPC"],
    id: "pha-02-remote-services-q5",
    level: 3,
    question: "如何验证“第2章 访问远程服务”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-02-remote-services",
    tags: ["凤凰架构", "2021纸书版", "第2章 访问远程服务", "RPC"],
    id: "pha-02-remote-services-q6",
    level: 3,
    question: "“第2章 访问远程服务”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、远程调用时序、RPC与REST决策表、失败语义矩阵、兼容性契约、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-03-transactions",
    tags: ["凤凰架构", "2021纸书版", "第3章 事务处理", "ACID"],
    id: "pha-03-transactions-q1",
    level: 1,
    question: "为什么“第3章 事务处理”必须覆盖4个正式目录节点？",
    answer:
      "这些节点共同组成“从本地ACID走向全局、共享与分布式事务，区分原子提交、补偿与最终一致的保证范围”的机制与证据链；漏项会使事务状态机、隔离异常表、补偿日志、端到端对账无法独立复现。",
  },
  {
    chapter: "pha-03-transactions",
    tags: ["凤凰架构", "2021纸书版", "第3章 事务处理", "ACID"],
    id: "pha-03-transactions-q2",
    level: 1,
    question: "“第3章 事务处理”的最小不变量是什么？",
    answer:
      "业务不变量在成功、超时、重复、回滚失败和恢复后都可对账，协调器状态不能代替业务事实。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-03-transactions",
    tags: ["凤凰架构", "2021纸书版", "第3章 事务处理", "ACID"],
    id: "pha-03-transactions-q3",
    level: 2,
    question: "怎样为“第3章 事务处理”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-03-transactions",
    tags: ["凤凰架构", "2021纸书版", "第3章 事务处理", "ACID"],
    id: "pha-03-transactions-q4",
    level: 2,
    question: "“第3章 事务处理”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-03-transactions",
    tags: ["凤凰架构", "2021纸书版", "第3章 事务处理", "ACID"],
    id: "pha-03-transactions-q5",
    level: 3,
    question: "如何验证“第3章 事务处理”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-03-transactions",
    tags: ["凤凰架构", "2021纸书版", "第3章 事务处理", "ACID"],
    id: "pha-03-transactions-q6",
    level: 3,
    question: "“第3章 事务处理”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、事务状态机、隔离异常表、补偿日志、端到端对账、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-04-diversion-system",
    tags: ["凤凰架构", "2021纸书版", "第4章 透明多级分流系统", "缓存一致性"],
    id: "pha-04-diversion-system-q1",
    level: 1,
    question: "为什么“第4章 透明多级分流系统”必须覆盖6个正式目录节点？",
    answer:
      "这些节点共同组成“沿客户端缓存、DNS、传输、CDN、负载均衡和服务端缓存追踪请求如何逐级分流”的机制与证据链；漏项会使六级请求路径、缓存键版本表、命中回源指标、故障降级演练无法独立复现。",
  },
  {
    chapter: "pha-04-diversion-system",
    tags: ["凤凰架构", "2021纸书版", "第4章 透明多级分流系统", "缓存一致性"],
    id: "pha-04-diversion-system-q2",
    level: 1,
    question: "“第4章 透明多级分流系统”的最小不变量是什么？",
    answer:
      "同一资源在每层都有可解释的键、版本、过期、失效和回源路径，命中率提升不能破坏正确性。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-04-diversion-system",
    tags: ["凤凰架构", "2021纸书版", "第4章 透明多级分流系统", "缓存一致性"],
    id: "pha-04-diversion-system-q3",
    level: 2,
    question: "怎样为“第4章 透明多级分流系统”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-04-diversion-system",
    tags: ["凤凰架构", "2021纸书版", "第4章 透明多级分流系统", "缓存一致性"],
    id: "pha-04-diversion-system-q4",
    level: 2,
    question: "“第4章 透明多级分流系统”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-04-diversion-system",
    tags: ["凤凰架构", "2021纸书版", "第4章 透明多级分流系统", "缓存一致性"],
    id: "pha-04-diversion-system-q5",
    level: 3,
    question: "如何验证“第4章 透明多级分流系统”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-04-diversion-system",
    tags: ["凤凰架构", "2021纸书版", "第4章 透明多级分流系统", "缓存一致性"],
    id: "pha-04-diversion-system-q6",
    level: 3,
    question: "“第4章 透明多级分流系统”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、六级请求路径、缓存键版本表、命中回源指标、故障降级演练、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-05-security",
    tags: ["凤凰架构", "2021纸书版", "第5章 架构安全性", "认证"],
    id: "pha-05-security-q1",
    level: 1,
    question: "为什么“第5章 架构安全性”必须覆盖6个正式目录节点？",
    answer:
      "这些节点共同组成“把认证、授权、凭证、保密、传输和验证串成端到端信任链，而不是零散安全组件清单”的机制与证据链；漏项会使信任边界图、权限判定表、凭证生命周期、威胁与审计清单无法独立复现。",
  },
  {
    chapter: "pha-05-security",
    tags: ["凤凰架构", "2021纸书版", "第5章 架构安全性", "认证"],
    id: "pha-05-security-q2",
    level: 1,
    question: "“第5章 架构安全性”的最小不变量是什么？",
    answer:
      "每个敏感操作都能证明主体、权限、凭证来源、传输保护、输入验证和审计结果。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-05-security",
    tags: ["凤凰架构", "2021纸书版", "第5章 架构安全性", "认证"],
    id: "pha-05-security-q3",
    level: 2,
    question: "怎样为“第5章 架构安全性”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-05-security",
    tags: ["凤凰架构", "2021纸书版", "第5章 架构安全性", "认证"],
    id: "pha-05-security-q4",
    level: 2,
    question: "“第5章 架构安全性”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-05-security",
    tags: ["凤凰架构", "2021纸书版", "第5章 架构安全性", "认证"],
    id: "pha-05-security-q5",
    level: 3,
    question: "如何验证“第5章 架构安全性”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-05-security",
    tags: ["凤凰架构", "2021纸书版", "第5章 架构安全性", "认证"],
    id: "pha-05-security-q6",
    level: 3,
    question: "“第5章 架构安全性”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、信任边界图、权限判定表、凭证生命周期、威胁与审计清单、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-06-consensus",
    tags: ["凤凰架构", "2021纸书版", "第6章 分布式共识", "Paxos"],
    id: "pha-06-consensus-q1",
    level: 1,
    question: "为什么“第6章 分布式共识”必须覆盖3个正式目录节点？",
    answer:
      "这些节点共同组成“用Paxos、Multi Paxos与Gossip区分强共识、复制日志和最终传播，不把算法名称等同系统保证”的机制与证据链；漏项会使消息时序、多数派交集证明、分区反例、收敛轨迹无法独立复现。",
  },
  {
    chapter: "pha-06-consensus",
    tags: ["凤凰架构", "2021纸书版", "第6章 分布式共识", "Paxos"],
    id: "pha-06-consensus-q2",
    level: 1,
    question: "“第6章 分布式共识”的最小不变量是什么？",
    answer:
      "在节点故障、消息延迟、重复和分区下，安全性不被破坏；活性结论明确依赖多数派与时序假设。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-06-consensus",
    tags: ["凤凰架构", "2021纸书版", "第6章 分布式共识", "Paxos"],
    id: "pha-06-consensus-q3",
    level: 2,
    question: "怎样为“第6章 分布式共识”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-06-consensus",
    tags: ["凤凰架构", "2021纸书版", "第6章 分布式共识", "Paxos"],
    id: "pha-06-consensus-q4",
    level: 2,
    question: "“第6章 分布式共识”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-06-consensus",
    tags: ["凤凰架构", "2021纸书版", "第6章 分布式共识", "Paxos"],
    id: "pha-06-consensus-q5",
    level: 3,
    question: "如何验证“第6章 分布式共识”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-06-consensus",
    tags: ["凤凰架构", "2021纸书版", "第6章 分布式共识", "Paxos"],
    id: "pha-06-consensus-q6",
    level: 3,
    question: "“第6章 分布式共识”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、消息时序、多数派交集证明、分区反例、收敛轨迹、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-07-library-to-service",
    tags: ["凤凰架构", "2021纸书版", "第7章 从类库到服务", "服务发现"],
    id: "pha-07-library-to-service-q1",
    level: 1,
    question: "为什么“第7章 从类库到服务”必须覆盖3个正式目录节点？",
    answer:
      "这些节点共同组成“重建服务发现、网关路由和客户端负载均衡三条连接链，明确注册、解析、选择与转发责任”的机制与证据链；漏项会使发现时序、路由规则表、实例视图差异、摘除恢复演练无法独立复现。",
  },
  {
    chapter: "pha-07-library-to-service",
    tags: ["凤凰架构", "2021纸书版", "第7章 从类库到服务", "服务发现"],
    id: "pha-07-library-to-service-q2",
    level: 1,
    question: "“第7章 从类库到服务”的最小不变量是什么？",
    answer:
      "服务实例变化后，注册表、客户端视图、路由和健康状态在约定窗口内收敛，陈旧节点不会无限接流量。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-07-library-to-service",
    tags: ["凤凰架构", "2021纸书版", "第7章 从类库到服务", "服务发现"],
    id: "pha-07-library-to-service-q3",
    level: 2,
    question: "怎样为“第7章 从类库到服务”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-07-library-to-service",
    tags: ["凤凰架构", "2021纸书版", "第7章 从类库到服务", "服务发现"],
    id: "pha-07-library-to-service-q4",
    level: 2,
    question: "“第7章 从类库到服务”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-07-library-to-service",
    tags: ["凤凰架构", "2021纸书版", "第7章 从类库到服务", "服务发现"],
    id: "pha-07-library-to-service-q5",
    level: 3,
    question: "如何验证“第7章 从类库到服务”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-07-library-to-service",
    tags: ["凤凰架构", "2021纸书版", "第7章 从类库到服务", "服务发现"],
    id: "pha-07-library-to-service-q6",
    level: 3,
    question: "“第7章 从类库到服务”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、发现时序、路由规则表、实例视图差异、摘除恢复演练、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-08-traffic-governance",
    tags: ["凤凰架构", "2021纸书版", "第8章 流量治理", "超时"],
    id: "pha-08-traffic-governance-q1",
    level: 1,
    question: "为什么“第8章 流量治理”必须覆盖2个正式目录节点？",
    answer:
      "这些节点共同组成“将超时、重试、熔断、隔离、降级与限流组合成有容量上界的故障控制系统”的机制与证据链；漏项会使调用预算表、熔断状态机、隔离舱容量、过载恢复曲线无法独立复现。",
  },
  {
    chapter: "pha-08-traffic-governance",
    tags: ["凤凰架构", "2021纸书版", "第8章 流量治理", "超时"],
    id: "pha-08-traffic-governance-q2",
    level: 1,
    question: "“第8章 流量治理”的最小不变量是什么？",
    answer:
      "故障时请求放大受控、关键链路保留容量、恢复不会形成二次洪峰，策略结果可由指标解释。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-08-traffic-governance",
    tags: ["凤凰架构", "2021纸书版", "第8章 流量治理", "超时"],
    id: "pha-08-traffic-governance-q3",
    level: 2,
    question: "怎样为“第8章 流量治理”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-08-traffic-governance",
    tags: ["凤凰架构", "2021纸书版", "第8章 流量治理", "超时"],
    id: "pha-08-traffic-governance-q4",
    level: 2,
    question: "“第8章 流量治理”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-08-traffic-governance",
    tags: ["凤凰架构", "2021纸书版", "第8章 流量治理", "超时"],
    id: "pha-08-traffic-governance-q5",
    level: 3,
    question: "如何验证“第8章 流量治理”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-08-traffic-governance",
    tags: ["凤凰架构", "2021纸书版", "第8章 流量治理", "超时"],
    id: "pha-08-traffic-governance-q6",
    level: 3,
    question: "“第8章 流量治理”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、调用预算表、熔断状态机、隔离舱容量、过载恢复曲线、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-09-reliable-communication",
    tags: ["凤凰架构", "2021纸书版", "第9章 可靠通信", "零信任"],
    id: "pha-09-reliable-communication-q1",
    level: 1,
    question: "为什么“第9章 可靠通信”必须覆盖2个正式目录节点？",
    answer:
      "这些节点共同组成“以零信任与服务安全重构东西向通信，让身份、策略、加密和审计随每次调用传播”的机制与证据链；漏项会使通信信任图、身份签发链、策略判定日志、轮换故障演练无法独立复现。",
  },
  {
    chapter: "pha-09-reliable-communication",
    tags: ["凤凰架构", "2021纸书版", "第9章 可靠通信", "零信任"],
    id: "pha-09-reliable-communication-q2",
    level: 1,
    question: "“第9章 可靠通信”的最小不变量是什么？",
    answer:
      "网络位置不授予隐式信任，每次服务调用都验证工作负载身份、最小权限、传输完整性和策略版本。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-09-reliable-communication",
    tags: ["凤凰架构", "2021纸书版", "第9章 可靠通信", "零信任"],
    id: "pha-09-reliable-communication-q3",
    level: 2,
    question: "怎样为“第9章 可靠通信”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-09-reliable-communication",
    tags: ["凤凰架构", "2021纸书版", "第9章 可靠通信", "零信任"],
    id: "pha-09-reliable-communication-q4",
    level: 2,
    question: "“第9章 可靠通信”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-09-reliable-communication",
    tags: ["凤凰架构", "2021纸书版", "第9章 可靠通信", "零信任"],
    id: "pha-09-reliable-communication-q5",
    level: 3,
    question: "如何验证“第9章 可靠通信”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-09-reliable-communication",
    tags: ["凤凰架构", "2021纸书版", "第9章 可靠通信", "零信任"],
    id: "pha-09-reliable-communication-q6",
    level: 3,
    question: "“第9章 可靠通信”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、通信信任图、身份签发链、策略判定日志、轮换故障演练、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-10-observability",
    tags: ["凤凰架构", "2021纸书版", "第10章 可观测性", "日志"],
    id: "pha-10-observability-q1",
    level: 1,
    question: "为什么“第10章 可观测性”必须覆盖3个正式目录节点？",
    answer:
      "这些节点共同组成“用事件日志、链路追踪和聚合度量回答发生了什么、请求经过哪里以及系统整体趋势”的机制与证据链；漏项会使遥测关联图、Trace样本、指标基数预算、告警到根因演练无法独立复现。",
  },
  {
    chapter: "pha-10-observability",
    tags: ["凤凰架构", "2021纸书版", "第10章 可观测性", "日志"],
    id: "pha-10-observability-q2",
    level: 1,
    question: "“第10章 可观测性”的最小不变量是什么？",
    answer:
      "同一请求能以稳定标识关联日志、跨度和指标，采样与聚合不会掩盖关键失败，成本有明确预算。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-10-observability",
    tags: ["凤凰架构", "2021纸书版", "第10章 可观测性", "日志"],
    id: "pha-10-observability-q3",
    level: 2,
    question: "怎样为“第10章 可观测性”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-10-observability",
    tags: ["凤凰架构", "2021纸书版", "第10章 可观测性", "日志"],
    id: "pha-10-observability-q4",
    level: 2,
    question: "“第10章 可观测性”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-10-observability",
    tags: ["凤凰架构", "2021纸书版", "第10章 可观测性", "日志"],
    id: "pha-10-observability-q5",
    level: 3,
    question: "如何验证“第10章 可观测性”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-10-observability",
    tags: ["凤凰架构", "2021纸书版", "第10章 可观测性", "日志"],
    id: "pha-10-observability-q6",
    level: 3,
    question: "“第10章 可观测性”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、遥测关联图、Trace样本、指标基数预算、告警到根因演练、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-11-containers",
    tags: ["凤凰架构", "2021纸书版", "第11章 虚拟化容器", "Namespace"],
    id: "pha-11-containers-q1",
    level: 1,
    question: "为什么“第11章 虚拟化容器”必须覆盖3个正式目录节点？",
    answer:
      "这些节点共同组成“从容器历史、镜像构建到应用封装，解释不可变交付如何改变环境一致性与责任边界”的机制与证据链；漏项会使隔离边界图、镜像层清单、构建溯源、重建一致性测试无法独立复现。",
  },
  {
    chapter: "pha-11-containers",
    tags: ["凤凰架构", "2021纸书版", "第11章 虚拟化容器", "Namespace"],
    id: "pha-11-containers-q2",
    level: 1,
    question: "“第11章 虚拟化容器”的最小不变量是什么？",
    answer:
      "镜像内容可追溯、运行时差异受控、配置与状态外置，重建实例与原实例满足同一声明。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-11-containers",
    tags: ["凤凰架构", "2021纸书版", "第11章 虚拟化容器", "Namespace"],
    id: "pha-11-containers-q3",
    level: 2,
    question: "怎样为“第11章 虚拟化容器”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-11-containers",
    tags: ["凤凰架构", "2021纸书版", "第11章 虚拟化容器", "Namespace"],
    id: "pha-11-containers-q4",
    level: 2,
    question: "“第11章 虚拟化容器”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-11-containers",
    tags: ["凤凰架构", "2021纸书版", "第11章 虚拟化容器", "Namespace"],
    id: "pha-11-containers-q5",
    level: 3,
    question: "如何验证“第11章 虚拟化容器”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-11-containers",
    tags: ["凤凰架构", "2021纸书版", "第11章 虚拟化容器", "Namespace"],
    id: "pha-11-containers-q6",
    level: 3,
    question: "“第11章 虚拟化容器”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、隔离边界图、镜像层清单、构建溯源、重建一致性测试、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-12-container-network",
    tags: ["凤凰架构", "2021纸书版", "第12章 容器间网络", "Network Namespace"],
    id: "pha-12-container-network-q1",
    level: 1,
    question: "为什么“第12章 容器间网络”必须覆盖2个正式目录节点？",
    answer:
      "这些节点共同组成“从Linux网络虚拟化到CNI生态追踪容器包路径、地址分配、转发与策略责任”的机制与证据链；漏项会使逐跳包路径、地址路由表、MTU实验、策略命中证据无法独立复现。",
  },
  {
    chapter: "pha-12-container-network",
    tags: ["凤凰架构", "2021纸书版", "第12章 容器间网络", "Network Namespace"],
    id: "pha-12-container-network-q2",
    level: 1,
    question: "“第12章 容器间网络”的最小不变量是什么？",
    answer:
      "Pod或容器地址、路由、转发、封装、策略和服务发现能逐跳解释，MTU与故障域有实测证据。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-12-container-network",
    tags: ["凤凰架构", "2021纸书版", "第12章 容器间网络", "Network Namespace"],
    id: "pha-12-container-network-q3",
    level: 2,
    question: "怎样为“第12章 容器间网络”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-12-container-network",
    tags: ["凤凰架构", "2021纸书版", "第12章 容器间网络", "Network Namespace"],
    id: "pha-12-container-network-q4",
    level: 2,
    question: "“第12章 容器间网络”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-12-container-network",
    tags: ["凤凰架构", "2021纸书版", "第12章 容器间网络", "Network Namespace"],
    id: "pha-12-container-network-q5",
    level: 3,
    question: "如何验证“第12章 容器间网络”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-12-container-network",
    tags: ["凤凰架构", "2021纸书版", "第12章 容器间网络", "Network Namespace"],
    id: "pha-12-container-network-q6",
    level: 3,
    question: "“第12章 容器间网络”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、逐跳包路径、地址路由表、MTU实验、策略命中证据、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-13-persistent-storage",
    tags: ["凤凰架构", "2021纸书版", "第13章 持久化存储", "PV"],
    id: "pha-13-persistent-storage-q1",
    level: 1,
    question: "为什么“第13章 持久化存储”必须覆盖2个正式目录节点？",
    answer:
      "这些节点共同组成“从Kubernetes存储抽象到CSI生态，区分卷生命周期、声明绑定、供应、挂载与数据耐久性”的机制与证据链；漏项会使卷生命周期、绑定供应轨迹、节点故障实验、数据对账无法独立复现。",
  },
  {
    chapter: "pha-13-persistent-storage",
    tags: ["凤凰架构", "2021纸书版", "第13章 持久化存储", "PV"],
    id: "pha-13-persistent-storage-q2",
    level: 1,
    question: "“第13章 持久化存储”的最小不变量是什么？",
    answer:
      "工作负载重调度、节点故障和卷重挂载后，数据、访问模式和回收策略仍符合声明。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-13-persistent-storage",
    tags: ["凤凰架构", "2021纸书版", "第13章 持久化存储", "PV"],
    id: "pha-13-persistent-storage-q3",
    level: 2,
    question: "怎样为“第13章 持久化存储”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-13-persistent-storage",
    tags: ["凤凰架构", "2021纸书版", "第13章 持久化存储", "PV"],
    id: "pha-13-persistent-storage-q4",
    level: 2,
    question: "“第13章 持久化存储”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-13-persistent-storage",
    tags: ["凤凰架构", "2021纸书版", "第13章 持久化存储", "PV"],
    id: "pha-13-persistent-storage-q5",
    level: 3,
    question: "如何验证“第13章 持久化存储”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-13-persistent-storage",
    tags: ["凤凰架构", "2021纸书版", "第13章 持久化存储", "PV"],
    id: "pha-13-persistent-storage-q6",
    level: 3,
    question: "“第13章 持久化存储”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、卷生命周期、绑定供应轨迹、节点故障实验、数据对账、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-14-resource-scheduling",
    tags: ["凤凰架构", "2021纸书版", "第14章 资源与调度", "Requests"],
    id: "pha-14-resource-scheduling-q1",
    level: 1,
    question: "为什么“第14章 资源与调度”必须覆盖4个正式目录节点？",
    answer:
      "这些节点共同组成“以资源模型、QoS、驱逐与默认调度器解释请求如何从声明到节点选择和运行保障”的机制与证据链；漏项会使资源账本、QoS判定表、驱逐次序实验、调度打分轨迹无法独立复现。",
  },
  {
    chapter: "pha-14-resource-scheduling",
    tags: ["凤凰架构", "2021纸书版", "第14章 资源与调度", "Requests"],
    id: "pha-14-resource-scheduling-q2",
    level: 1,
    question: "“第14章 资源与调度”的最小不变量是什么？",
    answer:
      "requests、limits、优先级、节点容量和实际使用量能够解释调度、节流、驱逐与恢复结果。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-14-resource-scheduling",
    tags: ["凤凰架构", "2021纸书版", "第14章 资源与调度", "Requests"],
    id: "pha-14-resource-scheduling-q3",
    level: 2,
    question: "怎样为“第14章 资源与调度”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-14-resource-scheduling",
    tags: ["凤凰架构", "2021纸书版", "第14章 资源与调度", "Requests"],
    id: "pha-14-resource-scheduling-q4",
    level: 2,
    question: "“第14章 资源与调度”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-14-resource-scheduling",
    tags: ["凤凰架构", "2021纸书版", "第14章 资源与调度", "Requests"],
    id: "pha-14-resource-scheduling-q5",
    level: 3,
    question: "如何验证“第14章 资源与调度”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-14-resource-scheduling",
    tags: ["凤凰架构", "2021纸书版", "第14章 资源与调度", "Requests"],
    id: "pha-14-resource-scheduling-q6",
    level: 3,
    question: "“第14章 资源与调度”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、资源账本、QoS判定表、驱逐次序实验、调度打分轨迹、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-15-service-mesh",
    tags: ["凤凰架构", "2021纸书版", "第15章 服务网格", "数据平面"],
    id: "pha-15-service-mesh-q1",
    level: 1,
    question: "为什么“第15章 服务网格”必须覆盖2个正式目录节点？",
    answer:
      "这些节点共同组成“从透明通信的重现到服务网格生态，分清数据平面、控制平面和业务服务的责任”的机制与证据链；漏项会使网格控制链、策略下发轨迹、旁路故障实验、开销对照无法独立复现。",
  },
  {
    chapter: "pha-15-service-mesh",
    tags: ["凤凰架构", "2021纸书版", "第15章 服务网格", "数据平面"],
    id: "pha-15-service-mesh-q2",
    level: 1,
    question: "“第15章 服务网格”的最小不变量是什么？",
    answer:
      "流量策略、身份与遥测可由控制面下发并在数据面验证，旁路、失联和升级时业务结果可控。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-15-service-mesh",
    tags: ["凤凰架构", "2021纸书版", "第15章 服务网格", "数据平面"],
    id: "pha-15-service-mesh-q3",
    level: 2,
    question: "怎样为“第15章 服务网格”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-15-service-mesh",
    tags: ["凤凰架构", "2021纸书版", "第15章 服务网格", "数据平面"],
    id: "pha-15-service-mesh-q4",
    level: 2,
    question: "“第15章 服务网格”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-15-service-mesh",
    tags: ["凤凰架构", "2021纸书版", "第15章 服务网格", "数据平面"],
    id: "pha-15-service-mesh-q5",
    level: 3,
    question: "如何验证“第15章 服务网格”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-15-service-mesh",
    tags: ["凤凰架构", "2021纸书版", "第15章 服务网格", "数据平面"],
    id: "pha-15-service-mesh-q6",
    level: 3,
    question: "“第15章 服务网格”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、网格控制链、策略下发轨迹、旁路故障实验、开销对照、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-16-forward-microservices",
    tags: ["凤凰架构", "2021纸书版", "第16章 向微服务迈进", "业务能力"],
    id: "pha-16-forward-microservices-q1",
    level: 1,
    question: "为什么“第16章 向微服务迈进”必须覆盖4个正式目录节点？",
    answer:
      "这些节点共同组成“按目的、前提、边界与治理判断是否以及如何拆分微服务，让组织能力与技术边界同步演进”的机制与证据链；漏项会使拆分动机表、能力成熟度门槛、上下文关系图、迁移回退计划无法独立复现。",
  },
  {
    chapter: "pha-16-forward-microservices",
    tags: ["凤凰架构", "2021纸书版", "第16章 向微服务迈进", "业务能力"],
    id: "pha-16-forward-microservices-q2",
    level: 1,
    question: "“第16章 向微服务迈进”的最小不变量是什么？",
    answer:
      "每个拆分都有可量化驱动力、自治前提、业务边界、治理成本和可逆迁移路径。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-16-forward-microservices",
    tags: ["凤凰架构", "2021纸书版", "第16章 向微服务迈进", "业务能力"],
    id: "pha-16-forward-microservices-q3",
    level: 2,
    question: "怎样为“第16章 向微服务迈进”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-16-forward-microservices",
    tags: ["凤凰架构", "2021纸书版", "第16章 向微服务迈进", "业务能力"],
    id: "pha-16-forward-microservices-q4",
    level: 2,
    question: "“第16章 向微服务迈进”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-16-forward-microservices",
    tags: ["凤凰架构", "2021纸书版", "第16章 向微服务迈进", "业务能力"],
    id: "pha-16-forward-microservices-q5",
    level: 3,
    question: "如何验证“第16章 向微服务迈进”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-16-forward-microservices",
    tags: ["凤凰架构", "2021纸书版", "第16章 向微服务迈进", "业务能力"],
    id: "pha-16-forward-microservices-q6",
    level: 3,
    question: "“第16章 向微服务迈进”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、拆分动机表、能力成熟度门槛、上下文关系图、迁移回退计划、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-appendix-a-projects",
    tags: ["凤凰架构", "2021纸书版", "附录A 技术演示工程实践", "Bookstore"],
    id: "pha-appendix-a-projects-q1",
    level: 1,
    question: "为什么“附录A 技术演示工程实践”必须覆盖1个正式目录节点？",
    answer:
      "这些节点共同组成“用同一书店业务对照单体、Spring Cloud、Kubernetes、Istio与AWS Lambda五种架构实现”的机制与证据链；漏项会使五实现矩阵、运行环境清单、同负载对照、责任迁移图无法独立复现。",
  },
  {
    chapter: "pha-appendix-a-projects",
    tags: ["凤凰架构", "2021纸书版", "附录A 技术演示工程实践", "Bookstore"],
    id: "pha-appendix-a-projects-q2",
    level: 1,
    question: "“附录A 技术演示工程实践”的最小不变量是什么？",
    answer:
      "各实现保持相同业务行为和可比输入，只改变架构与基础设施，差异能回指部署、通信和治理责任。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-appendix-a-projects",
    tags: ["凤凰架构", "2021纸书版", "附录A 技术演示工程实践", "Bookstore"],
    id: "pha-appendix-a-projects-q3",
    level: 2,
    question: "怎样为“附录A 技术演示工程实践”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-appendix-a-projects",
    tags: ["凤凰架构", "2021纸书版", "附录A 技术演示工程实践", "Bookstore"],
    id: "pha-appendix-a-projects-q4",
    level: 2,
    question: "“附录A 技术演示工程实践”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-appendix-a-projects",
    tags: ["凤凰架构", "2021纸书版", "附录A 技术演示工程实践", "Bookstore"],
    id: "pha-appendix-a-projects-q5",
    level: 3,
    question: "如何验证“附录A 技术演示工程实践”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-appendix-a-projects",
    tags: ["凤凰架构", "2021纸书版", "附录A 技术演示工程实践", "Bookstore"],
    id: "pha-appendix-a-projects-q6",
    level: 3,
    question: "“附录A 技术演示工程实践”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、五实现矩阵、运行环境清单、同负载对照、责任迁移图、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-appendix-b-kubernetes",
    tags: ["凤凰架构", "2021纸书版", "附录B 部署Kubernetes集群", "Kubeadm"],
    id: "pha-appendix-b-kubernetes-q1",
    level: 1,
    question: "为什么“附录B 部署Kubernetes集群”必须覆盖1个正式目录节点？",
    answer:
      "这些节点共同组成“固定2021版演示环境，完成Kubernetes集群部署、镜像与依赖准备，并形成可重放基线”的机制与证据链；漏项会使版本锁定表、部署记录、组件健康证据、清理回退脚本无法独立复现。",
  },
  {
    chapter: "pha-appendix-b-kubernetes",
    tags: ["凤凰架构", "2021纸书版", "附录B 部署Kubernetes集群", "Kubeadm"],
    id: "pha-appendix-b-kubernetes-q2",
    level: 1,
    question: "“附录B 部署Kubernetes集群”的最小不变量是什么？",
    answer:
      "节点、网络、存储、入口、证书和示例工作负载均通过检查，环境版本与书中实验可追溯。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-appendix-b-kubernetes",
    tags: ["凤凰架构", "2021纸书版", "附录B 部署Kubernetes集群", "Kubeadm"],
    id: "pha-appendix-b-kubernetes-q3",
    level: 2,
    question: "怎样为“附录B 部署Kubernetes集群”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-appendix-b-kubernetes",
    tags: ["凤凰架构", "2021纸书版", "附录B 部署Kubernetes集群", "Kubeadm"],
    id: "pha-appendix-b-kubernetes-q4",
    level: 2,
    question: "“附录B 部署Kubernetes集群”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-appendix-b-kubernetes",
    tags: ["凤凰架构", "2021纸书版", "附录B 部署Kubernetes集群", "Kubeadm"],
    id: "pha-appendix-b-kubernetes-q5",
    level: 3,
    question: "如何验证“附录B 部署Kubernetes集群”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-appendix-b-kubernetes",
    tags: ["凤凰架构", "2021纸书版", "附录B 部署Kubernetes集群", "Kubeadm"],
    id: "pha-appendix-b-kubernetes-q6",
    level: 3,
    question: "“附录B 部署Kubernetes集群”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、版本锁定表、部署记录、组件健康证据、清理回退脚本、故障、业务对账、停止、恢复、回退和责任人。",
  },
  {
    chapter: "pha-official-final-review",
    tags: ["凤凰架构", "2021纸书版", "2021纸书版总复习与架构评审", "演进"],
    id: "pha-official-final-review-q1",
    level: 1,
    question: "为什么“2021纸书版总复习与架构评审”必须覆盖18个正式目录节点？",
    answer:
      "这些节点共同组成“贯通演进、架构师视角、分布式基石、不可变基础设施与方法论，完成一次端到端架构评审”的机制与证据链；漏项会使跨章依赖图、架构决策记录、故障证据包、上线与回退评审无法独立复现。",
  },
  {
    chapter: "pha-official-final-review",
    tags: ["凤凰架构", "2021纸书版", "2021纸书版总复习与架构评审", "演进"],
    id: "pha-official-final-review-q2",
    level: 1,
    question: "“2021纸书版总复习与架构评审”的最小不变量是什么？",
    answer:
      "任何方案都同时给出业务目标、机制、代价、故障反例、观测证据、停止条件和回退路径。必须用版本、状态轨迹、遥测、故障与业务对账共同证明。",
  },
  {
    chapter: "pha-official-final-review",
    tags: ["凤凰架构", "2021纸书版", "2021纸书版总复习与架构评审", "演进"],
    id: "pha-official-final-review-q3",
    level: 2,
    question: "怎样为“2021纸书版总复习与架构评审”构造单变量反例？",
    answer:
      "固定2021快照、业务、数据、负载和观测窗口，只改变一个架构变量或故障条件，比较组件状态与最终业务结果。",
  },
  {
    chapter: "pha-official-final-review",
    tags: ["凤凰架构", "2021纸书版", "2021纸书版总复习与架构评审", "演进"],
    id: "pha-official-final-review-q4",
    level: 2,
    question: "“2021纸书版总复习与架构评审”为什么必须固定2021纸书版？",
    answer:
      "作者官网持续演进；正式分母来自2021年6月纸书目录和v1.0.20210629快照，后续内容只能作为迁移差异。",
  },
  {
    chapter: "pha-official-final-review",
    tags: ["凤凰架构", "2021纸书版", "2021纸书版总复习与架构评审", "演进"],
    id: "pha-official-final-review-q5",
    level: 3,
    question: "如何验证“2021纸书版总复习与架构评审”的性能与恢复结论？",
    answer:
      "重复测P50、P95、P99、错误、饱和度、恢复时间和最终业务集合，并保留请求到持久状态的关联证据。",
  },
  {
    chapter: "pha-official-final-review",
    tags: ["凤凰架构", "2021纸书版", "2021纸书版总复习与架构评审", "演进"],
    id: "pha-official-final-review-q6",
    level: 3,
    question: "“2021纸书版总复习与架构评审”独立交接必须包含什么？",
    answer:
      "需要目录映射、版本环境、决策记录、跨章依赖图、架构决策记录、故障证据包、上线与回退评审、故障、业务对账、停止、恢复、回退和责任人。",
  },
];
