import type { ReviewQuestion } from "./types";

export const hpm4OfficialQuestions: ReviewQuestion[] = [
  {
    id: "hpm4-official-learning-map-q1",
    chapter: "hpm4-official-learning-map",
    level: 1,
    question: "为什么“第4版权威学习地图”必须覆盖7个正式节点？",
    answer:
      "这些节点共同组成“用SLO和证据驱动从单实例架构、查询优化走向复制、恢复、云与合规运营”的服务目标、机制、负载、故障和证据链，缺项会使17页学习路线、章节依赖图、MySQL 8.0实验仓和全书验收表无法复现。",
    tags: ["高性能MySQL", "第4版", "第4版权威学习地图"],
  },
  {
    id: "hpm4-official-learning-map-q2",
    chapter: "hpm4-official-learning-map",
    level: 1,
    question: "“第4版权威学习地图”的最小运行不变量是什么？",
    answer:
      "13章与2附录全部有正式节点、实验基线、失败演练和独立交付物；必须由固定版本与负载、压力数据、故障反例和业务对账共同证明。",
    tags: ["高性能MySQL", "第4版", "第4版权威学习地图"],
  },
  {
    id: "hpm4-official-learning-map-q3",
    chapter: "hpm4-official-learning-map",
    level: 2,
    question: "怎样为“第4版权威学习地图”构造最小反例？",
    answer:
      "把“把高性能等同参数调优，跳过用户SLO、查询语义、恢复演练和组织控制”写成待证假设，只改变缓存、并发、分布或故障时点之一，再比较证据。",
    tags: ["高性能MySQL", "第4版", "第4版权威学习地图"],
  },
  {
    id: "hpm4-official-learning-map-q4",
    chapter: "hpm4-official-learning-map",
    level: 2,
    question: "“第4版权威学习地图”为什么必须先写SLO和预测？",
    answer:
      "SLO固定用户价值，预测固定结果、等待与失败终点，防止观察结果后反向编写解释。",
    tags: ["高性能MySQL", "第4版", "第4版权威学习地图"],
  },
  {
    id: "hpm4-official-learning-map-q5",
    chapter: "hpm4-official-learning-map",
    level: 3,
    question: "如何验证“第4版权威学习地图”中的性能结论？",
    answer:
      "固定版本、Schema、数据与负载，重复测量分位延迟、吞吐、错误、实际扫描和等待，同时独立核对结果。",
    tags: ["高性能MySQL", "第4版", "第4版权威学习地图"],
  },
  {
    id: "hpm4-official-learning-map-q6",
    chapter: "hpm4-official-learning-map",
    level: 3,
    question: "“第4版权威学习地图”独立交接需要哪些材料？",
    answer:
      "需要SLO、版本配置、Schema数据、负载脚本、17页学习路线、章节依赖图、MySQL 8.0实验仓和全书验收表、故障演练、业务对账和回退条件。",
    tags: ["高性能MySQL", "第4版", "第4版权威学习地图"],
  },
  {
    id: "hpm4-ch01-mysql-architecture-q1",
    chapter: "hpm4-ch01-mysql-architecture",
    level: 1,
    question: "为什么“第1章 MySQL架构”必须覆盖19个正式节点？",
    answer:
      "这些节点共同组成“从连接进入MySQL逻辑层，经优化器到InnoDB事务、页、日志与复制的完整请求路径”的服务目标、机制、负载、故障和证据链，缺项会使一次事务的连接、计划、锁、版本、日志和复制事件联合轨迹无法复现。",
    tags: ["高性能MySQL", "第4版", "第1章 MySQL架构"],
  },
  {
    id: "hpm4-ch01-mysql-architecture-q2",
    chapter: "hpm4-ch01-mysql-architecture",
    level: 1,
    question: "“第1章 MySQL架构”的最小运行不变量是什么？",
    answer:
      "提交结果满足隔离与持久性，读视图、锁和日志边界可解释，原子DDL不留下半完成元数据；必须由固定版本与负载、压力数据、故障反例和业务对账共同证明。",
    tags: ["高性能MySQL", "第4版", "第1章 MySQL架构"],
  },
  {
    id: "hpm4-ch01-mysql-architecture-q3",
    chapter: "hpm4-ch01-mysql-architecture",
    level: 2,
    question: "怎样为“第1章 MySQL架构”构造最小反例？",
    answer:
      "把“把MySQL当成单体SQL解释器，忽略服务层与InnoDB分工，或把MVCC误认为完全无锁”写成待证假设，只改变缓存、并发、分布或故障时点之一，再比较证据。",
    tags: ["高性能MySQL", "第4版", "第1章 MySQL架构"],
  },
  {
    id: "hpm4-ch01-mysql-architecture-q4",
    chapter: "hpm4-ch01-mysql-architecture",
    level: 2,
    question: "“第1章 MySQL架构”为什么必须先写SLO和预测？",
    answer:
      "SLO固定用户价值，预测固定结果、等待与失败终点，防止观察结果后反向编写解释。",
    tags: ["高性能MySQL", "第4版", "第1章 MySQL架构"],
  },
  {
    id: "hpm4-ch01-mysql-architecture-q5",
    chapter: "hpm4-ch01-mysql-architecture",
    level: 3,
    question: "如何验证“第1章 MySQL架构”中的性能结论？",
    answer:
      "固定版本、Schema、数据与负载，重复测量分位延迟、吞吐、错误、实际扫描和等待，同时独立核对结果。",
    tags: ["高性能MySQL", "第4版", "第1章 MySQL架构"],
  },
  {
    id: "hpm4-ch01-mysql-architecture-q6",
    chapter: "hpm4-ch01-mysql-architecture",
    level: 3,
    question: "“第1章 MySQL架构”独立交接需要哪些材料？",
    answer:
      "需要SLO、版本配置、Schema数据、负载脚本、一次事务的连接、计划、锁、版本、日志和复制事件联合轨迹、故障演练、业务对账和回退条件。",
    tags: ["高性能MySQL", "第4版", "第1章 MySQL架构"],
  },
  {
    id: "hpm4-ch02-reliability-monitoring-q1",
    chapter: "hpm4-ch02-reliability-monitoring",
    level: 1,
    question: "为什么“第2章 可靠性工程世界中的监控”必须覆盖16个正式节点？",
    answer:
      "这些节点共同组成“从用户可感知的成功、延迟和错误定义SLI、SLO与可消耗的错误预算”的服务目标、机制、负载、故障和证据链，缺项会使服务目录、SLI查询、SLO看板、错误预算策略和告警演练无法复现。",
    tags: ["高性能MySQL", "第4版", "第2章 可靠性工程世界中的监控"],
  },
  {
    id: "hpm4-ch02-reliability-monitoring-q2",
    chapter: "hpm4-ch02-reliability-monitoring",
    level: 1,
    question: "“第2章 可靠性工程世界中的监控”的最小运行不变量是什么？",
    answer:
      "每个告警对应可操作的用户风险，统计窗口、分母、分位数和缺失数据处理规则固定；必须由固定版本与负载、压力数据、故障反例和业务对账共同证明。",
    tags: ["高性能MySQL", "第4版", "第2章 可靠性工程世界中的监控"],
  },
  {
    id: "hpm4-ch02-reliability-monitoring-q3",
    chapter: "hpm4-ch02-reliability-monitoring",
    level: 2,
    question: "怎样为“第2章 可靠性工程世界中的监控”构造最小反例？",
    answer:
      "把“为所有指标设置静态阈值，导致告警很多却无法说明用户影响和剩余风险”写成待证假设，只改变缓存、并发、分布或故障时点之一，再比较证据。",
    tags: ["高性能MySQL", "第4版", "第2章 可靠性工程世界中的监控"],
  },
  {
    id: "hpm4-ch02-reliability-monitoring-q4",
    chapter: "hpm4-ch02-reliability-monitoring",
    level: 2,
    question: "“第2章 可靠性工程世界中的监控”为什么必须先写SLO和预测？",
    answer:
      "SLO固定用户价值，预测固定结果、等待与失败终点，防止观察结果后反向编写解释。",
    tags: ["高性能MySQL", "第4版", "第2章 可靠性工程世界中的监控"],
  },
  {
    id: "hpm4-ch02-reliability-monitoring-q5",
    chapter: "hpm4-ch02-reliability-monitoring",
    level: 3,
    question: "如何验证“第2章 可靠性工程世界中的监控”中的性能结论？",
    answer:
      "固定版本、Schema、数据与负载，重复测量分位延迟、吞吐、错误、实际扫描和等待，同时独立核对结果。",
    tags: ["高性能MySQL", "第4版", "第2章 可靠性工程世界中的监控"],
  },
  {
    id: "hpm4-ch02-reliability-monitoring-q6",
    chapter: "hpm4-ch02-reliability-monitoring",
    level: 3,
    question: "“第2章 可靠性工程世界中的监控”独立交接需要哪些材料？",
    answer:
      "需要SLO、版本配置、Schema数据、负载脚本、服务目录、SLI查询、SLO看板、错误预算策略和告警演练、故障演练、业务对账和回退条件。",
    tags: ["高性能MySQL", "第4版", "第2章 可靠性工程世界中的监控"],
  },
  {
    id: "hpm4-ch03-performance-schema-q1",
    chapter: "hpm4-ch03-performance-schema",
    level: 1,
    question: "为什么“第3章 Performance Schema”必须覆盖24个正式节点？",
    answer:
      "这些节点共同组成“用插桩、消费者表和sys视图把线程、语句、等待、锁、内存与错误连接起来”的服务目标、机制、负载、故障和证据链，缺项会使Performance Schema配置清单、热点语句报告、元数据锁图和开销对照无法复现。",
    tags: ["高性能MySQL", "第4版", "第3章 Performance Schema"],
  },
  {
    id: "hpm4-ch03-performance-schema-q2",
    chapter: "hpm4-ch03-performance-schema",
    level: 1,
    question: "“第3章 Performance Schema”的最小运行不变量是什么？",
    answer:
      "观测开销受控，摘要维度与时间窗口明确，重置和采样不会被误读为业务归零；必须由固定版本与负载、压力数据、故障反例和业务对账共同证明。",
    tags: ["高性能MySQL", "第4版", "第3章 Performance Schema"],
  },
  {
    id: "hpm4-ch03-performance-schema-q3",
    chapter: "hpm4-ch03-performance-schema",
    level: 2,
    question: "怎样为“第3章 Performance Schema”构造最小反例？",
    answer:
      "把“一次性开启全部插桩后直接比较历史数据，忽略内存、采样、摘要重置与观测开销”写成待证假设，只改变缓存、并发、分布或故障时点之一，再比较证据。",
    tags: ["高性能MySQL", "第4版", "第3章 Performance Schema"],
  },
  {
    id: "hpm4-ch03-performance-schema-q4",
    chapter: "hpm4-ch03-performance-schema",
    level: 2,
    question: "“第3章 Performance Schema”为什么必须先写SLO和预测？",
    answer:
      "SLO固定用户价值，预测固定结果、等待与失败终点，防止观察结果后反向编写解释。",
    tags: ["高性能MySQL", "第4版", "第3章 Performance Schema"],
  },
  {
    id: "hpm4-ch03-performance-schema-q5",
    chapter: "hpm4-ch03-performance-schema",
    level: 3,
    question: "如何验证“第3章 Performance Schema”中的性能结论？",
    answer:
      "固定版本、Schema、数据与负载，重复测量分位延迟、吞吐、错误、实际扫描和等待，同时独立核对结果。",
    tags: ["高性能MySQL", "第4版", "第3章 Performance Schema"],
  },
  {
    id: "hpm4-ch03-performance-schema-q6",
    chapter: "hpm4-ch03-performance-schema",
    level: 3,
    question: "“第3章 Performance Schema”独立交接需要哪些材料？",
    answer:
      "需要SLO、版本配置、Schema数据、负载脚本、Performance Schema配置清单、热点语句报告、元数据锁图和开销对照、故障演练、业务对账和回退条件。",
    tags: ["高性能MySQL", "第4版", "第3章 Performance Schema"],
  },
  {
    id: "hpm4-ch04-os-hardware-q1",
    chapter: "hpm4-ch04-os-hardware",
    level: 1,
    question: "为什么“第4章 操作系统和硬件优化”必须覆盖18个正式节点？",
    answer:
      "这些节点共同组成“把CPU、工作集、存储、RAID、网络、文件系统和交换行为映射到MySQL等待”的服务目标、机制、负载、故障和证据链，缺项会使资源饱和图、工作集估算、fio与数据库负载对照和故障恢复记录无法复现。",
    tags: ["高性能MySQL", "第4版", "第4章 操作系统和硬件优化"],
  },
  {
    id: "hpm4-ch04-os-hardware-q2",
    chapter: "hpm4-ch04-os-hardware",
    level: 1,
    question: "“第4章 操作系统和硬件优化”的最小运行不变量是什么？",
    answer:
      "硬件变更由瓶颈证据驱动，持久性设置不因追求基准速度而被削弱；必须由固定版本与负载、压力数据、故障反例和业务对账共同证明。",
    tags: ["高性能MySQL", "第4版", "第4章 操作系统和硬件优化"],
  },
  {
    id: "hpm4-ch04-os-hardware-q3",
    chapter: "hpm4-ch04-os-hardware",
    level: 2,
    question: "怎样为“第4章 操作系统和硬件优化”构造最小反例？",
    answer:
      "把“看到高CPU就增加CPU，或关闭刷盘和写屏障换取漂亮延迟却失去持久性”写成待证假设，只改变缓存、并发、分布或故障时点之一，再比较证据。",
    tags: ["高性能MySQL", "第4版", "第4章 操作系统和硬件优化"],
  },
  {
    id: "hpm4-ch04-os-hardware-q4",
    chapter: "hpm4-ch04-os-hardware",
    level: 2,
    question: "“第4章 操作系统和硬件优化”为什么必须先写SLO和预测？",
    answer:
      "SLO固定用户价值，预测固定结果、等待与失败终点，防止观察结果后反向编写解释。",
    tags: ["高性能MySQL", "第4版", "第4章 操作系统和硬件优化"],
  },
  {
    id: "hpm4-ch04-os-hardware-q5",
    chapter: "hpm4-ch04-os-hardware",
    level: 3,
    question: "如何验证“第4章 操作系统和硬件优化”中的性能结论？",
    answer:
      "固定版本、Schema、数据与负载，重复测量分位延迟、吞吐、错误、实际扫描和等待，同时独立核对结果。",
    tags: ["高性能MySQL", "第4版", "第4章 操作系统和硬件优化"],
  },
  {
    id: "hpm4-ch04-os-hardware-q6",
    chapter: "hpm4-ch04-os-hardware",
    level: 3,
    question: "“第4章 操作系统和硬件优化”独立交接需要哪些材料？",
    answer:
      "需要SLO、版本配置、Schema数据、负载脚本、资源饱和图、工作集估算、fio与数据库负载对照和故障恢复记录、故障演练、业务对账和回退条件。",
    tags: ["高性能MySQL", "第4版", "第4章 操作系统和硬件优化"],
  },
  {
    id: "hpm4-ch05-server-settings-q1",
    chapter: "hpm4-ch05-server-settings",
    level: 1,
    question: "为什么“第5章 优化服务器设置”必须覆盖23个正式节点？",
    answer:
      "这些节点共同组成“用最小配置、容量预算和逐项实验管理MySQL 8.0系统变量”的服务目标、机制、负载、故障和证据链，缺项会使配置来源账本、内存上界模型、变更前后状态快照和回退文件无法复现。",
    tags: ["高性能MySQL", "第4版", "第5章 优化服务器设置"],
  },
  {
    id: "hpm4-ch05-server-settings-q2",
    chapter: "hpm4-ch05-server-settings",
    level: 1,
    question: "“第5章 优化服务器设置”的最小运行不变量是什么？",
    answer:
      "全局、会话和持久化值来源清楚，总内存不超预算，耐久和只读保护保持启用；必须由固定版本与负载、压力数据、故障反例和业务对账共同证明。",
    tags: ["高性能MySQL", "第4版", "第5章 优化服务器设置"],
  },
  {
    id: "hpm4-ch05-server-settings-q3",
    chapter: "hpm4-ch05-server-settings",
    level: 2,
    question: "怎样为“第5章 优化服务器设置”构造最小反例？",
    answer:
      "把“复制网上的巨大配置模板，或把每连接缓冲区乘数漏掉后把内存分给缓冲池”写成待证假设，只改变缓存、并发、分布或故障时点之一，再比较证据。",
    tags: ["高性能MySQL", "第4版", "第5章 优化服务器设置"],
  },
  {
    id: "hpm4-ch05-server-settings-q4",
    chapter: "hpm4-ch05-server-settings",
    level: 2,
    question: "“第5章 优化服务器设置”为什么必须先写SLO和预测？",
    answer:
      "SLO固定用户价值，预测固定结果、等待与失败终点，防止观察结果后反向编写解释。",
    tags: ["高性能MySQL", "第4版", "第5章 优化服务器设置"],
  },
  {
    id: "hpm4-ch05-server-settings-q5",
    chapter: "hpm4-ch05-server-settings",
    level: 3,
    question: "如何验证“第5章 优化服务器设置”中的性能结论？",
    answer:
      "固定版本、Schema、数据与负载，重复测量分位延迟、吞吐、错误、实际扫描和等待，同时独立核对结果。",
    tags: ["高性能MySQL", "第4版", "第5章 优化服务器设置"],
  },
  {
    id: "hpm4-ch05-server-settings-q6",
    chapter: "hpm4-ch05-server-settings",
    level: 3,
    question: "“第5章 优化服务器设置”独立交接需要哪些材料？",
    answer:
      "需要SLO、版本配置、Schema数据、负载脚本、配置来源账本、内存上界模型、变更前后状态快照和回退文件、故障演练、业务对账和回退条件。",
    tags: ["高性能MySQL", "第4版", "第5章 优化服务器设置"],
  },
  {
    id: "hpm4-ch06-schema-design-q1",
    chapter: "hpm4-ch06-schema-design",
    level: 1,
    question: "为什么“第6章 Schema设计与管理”必须覆盖18个正式节点？",
    answer:
      "这些节点共同组成“以取值域、比较语义、行宽、索引和演进成本选择MySQL数据类型与变更流程”的服务目标、机制、负载、故障和证据链，缺项会使类型决策表、行宽估算、Schema迁移流水线和兼容性验证无法复现。",
    tags: ["高性能MySQL", "第4版", "第6章 Schema设计与管理"],
  },
  {
    id: "hpm4-ch06-schema-design-q2",
    chapter: "hpm4-ch06-schema-design",
    level: 1,
    question: "“第6章 Schema设计与管理”的最小运行不变量是什么？",
    answer:
      "类型表达业务域而不截断数据，标识符稳定紧凑，Schema变更可审计、可回滚且兼容应用；必须由固定版本与负载、压力数据、故障反例和业务对账共同证明。",
    tags: ["高性能MySQL", "第4版", "第6章 Schema设计与管理"],
  },
  {
    id: "hpm4-ch06-schema-design-q3",
    chapter: "hpm4-ch06-schema-design",
    level: 2,
    question: "怎样为“第6章 Schema设计与管理”构造最小反例？",
    answer:
      "把“只按当前样例选最小类型，或用字符串、ENUM和JSON回避真正的约束与迁移设计”写成待证假设，只改变缓存、并发、分布或故障时点之一，再比较证据。",
    tags: ["高性能MySQL", "第4版", "第6章 Schema设计与管理"],
  },
  {
    id: "hpm4-ch06-schema-design-q4",
    chapter: "hpm4-ch06-schema-design",
    level: 2,
    question: "“第6章 Schema设计与管理”为什么必须先写SLO和预测？",
    answer:
      "SLO固定用户价值，预测固定结果、等待与失败终点，防止观察结果后反向编写解释。",
    tags: ["高性能MySQL", "第4版", "第6章 Schema设计与管理"],
  },
  {
    id: "hpm4-ch06-schema-design-q5",
    chapter: "hpm4-ch06-schema-design",
    level: 3,
    question: "如何验证“第6章 Schema设计与管理”中的性能结论？",
    answer:
      "固定版本、Schema、数据与负载，重复测量分位延迟、吞吐、错误、实际扫描和等待，同时独立核对结果。",
    tags: ["高性能MySQL", "第4版", "第6章 Schema设计与管理"],
  },
  {
    id: "hpm4-ch06-schema-design-q6",
    chapter: "hpm4-ch06-schema-design",
    level: 3,
    question: "“第6章 Schema设计与管理”独立交接需要哪些材料？",
    answer:
      "需要SLO、版本配置、Schema数据、负载脚本、类型决策表、行宽估算、Schema迁移流水线和兼容性验证、故障演练、业务对账和回退条件。",
    tags: ["高性能MySQL", "第4版", "第6章 Schema设计与管理"],
  },
  {
    id: "hpm4-ch07-indexing-q1",
    chapter: "hpm4-ch07-indexing",
    level: 1,
    question: "为什么“第7章 创建高性能索引”必须覆盖18个正式节点？",
    answer:
      "这些节点共同组成“从访问模式、选择性、列顺序、聚簇布局和覆盖能力设计可维护索引”的服务目标、机制、负载、故障和证据链，缺项会使候选索引矩阵、EXPLAIN ANALYZE对照、页密度与写入成本报告无法复现。",
    tags: ["高性能MySQL", "第4版", "第7章 创建高性能索引"],
  },
  {
    id: "hpm4-ch07-indexing-q2",
    chapter: "hpm4-ch07-indexing",
    level: 1,
    question: "“第7章 创建高性能索引”的最小运行不变量是什么？",
    answer:
      "目标查询扫描行与回表次数受控，新增索引收益覆盖写放大、空间和维护成本；必须由固定版本与负载、压力数据、故障反例和业务对账共同证明。",
    tags: ["高性能MySQL", "第4版", "第7章 创建高性能索引"],
  },
  {
    id: "hpm4-ch07-indexing-q3",
    chapter: "hpm4-ch07-indexing",
    level: 2,
    question: "怎样为“第7章 创建高性能索引”构造最小反例？",
    answer:
      "把“看到慢查询就逐列建索引，或把key字段非空误当成所有谓词都由索引完成”写成待证假设，只改变缓存、并发、分布或故障时点之一，再比较证据。",
    tags: ["高性能MySQL", "第4版", "第7章 创建高性能索引"],
  },
  {
    id: "hpm4-ch07-indexing-q4",
    chapter: "hpm4-ch07-indexing",
    level: 2,
    question: "“第7章 创建高性能索引”为什么必须先写SLO和预测？",
    answer:
      "SLO固定用户价值，预测固定结果、等待与失败终点，防止观察结果后反向编写解释。",
    tags: ["高性能MySQL", "第4版", "第7章 创建高性能索引"],
  },
  {
    id: "hpm4-ch07-indexing-q5",
    chapter: "hpm4-ch07-indexing",
    level: 3,
    question: "如何验证“第7章 创建高性能索引”中的性能结论？",
    answer:
      "固定版本、Schema、数据与负载，重复测量分位延迟、吞吐、错误、实际扫描和等待，同时独立核对结果。",
    tags: ["高性能MySQL", "第4版", "第7章 创建高性能索引"],
  },
  {
    id: "hpm4-ch07-indexing-q6",
    chapter: "hpm4-ch07-indexing",
    level: 3,
    question: "“第7章 创建高性能索引”独立交接需要哪些材料？",
    answer:
      "需要SLO、版本配置、Schema数据、负载脚本、候选索引矩阵、EXPLAIN ANALYZE对照、页密度与写入成本报告、故障演练、业务对账和回退条件。",
    tags: ["高性能MySQL", "第4版", "第7章 创建高性能索引"],
  },
  {
    id: "hpm4-ch08-query-optimization-q1",
    chapter: "hpm4-ch08-query-optimization",
    level: 1,
    question: "为什么“第8章 查询性能优化”必须覆盖28个正式节点？",
    answer:
      "这些节点共同组成“从响应时间分解、访问行数、执行计划和客户端传输定位查询瓶颈”的服务目标、机制、负载、故障和证据链，缺项会使慢查询样本、EXPLAIN ANALYZE差异、结果校验和上线回归门无法复现。",
    tags: ["高性能MySQL", "第4版", "第8章 查询性能优化"],
  },
  {
    id: "hpm4-ch08-query-optimization-q2",
    chapter: "hpm4-ch08-query-optimization",
    level: 1,
    question: "“第8章 查询性能优化”的最小运行不变量是什么？",
    answer:
      "优化后结果集合和事务语义不变，实际扫描、排序、临时表与网络字节有可重复下降；必须由固定版本与负载、压力数据、故障反例和业务对账共同证明。",
    tags: ["高性能MySQL", "第4版", "第8章 查询性能优化"],
  },
  {
    id: "hpm4-ch08-query-optimization-q3",
    chapter: "hpm4-ch08-query-optimization",
    level: 2,
    question: "怎样为“第8章 查询性能优化”构造最小反例？",
    answer:
      "把“只看EXPLAIN估计或总耗时，忽略锁等待、结果传输、缓存状态与结果语义变化”写成待证假设，只改变缓存、并发、分布或故障时点之一，再比较证据。",
    tags: ["高性能MySQL", "第4版", "第8章 查询性能优化"],
  },
  {
    id: "hpm4-ch08-query-optimization-q4",
    chapter: "hpm4-ch08-query-optimization",
    level: 2,
    question: "“第8章 查询性能优化”为什么必须先写SLO和预测？",
    answer:
      "SLO固定用户价值，预测固定结果、等待与失败终点，防止观察结果后反向编写解释。",
    tags: ["高性能MySQL", "第4版", "第8章 查询性能优化"],
  },
  {
    id: "hpm4-ch08-query-optimization-q5",
    chapter: "hpm4-ch08-query-optimization",
    level: 3,
    question: "如何验证“第8章 查询性能优化”中的性能结论？",
    answer:
      "固定版本、Schema、数据与负载，重复测量分位延迟、吞吐、错误、实际扫描和等待，同时独立核对结果。",
    tags: ["高性能MySQL", "第4版", "第8章 查询性能优化"],
  },
  {
    id: "hpm4-ch08-query-optimization-q6",
    chapter: "hpm4-ch08-query-optimization",
    level: 3,
    question: "“第8章 查询性能优化”独立交接需要哪些材料？",
    answer:
      "需要SLO、版本配置、Schema数据、负载脚本、慢查询样本、EXPLAIN ANALYZE差异、结果校验和上线回归门、故障演练、业务对账和回退条件。",
    tags: ["高性能MySQL", "第4版", "第8章 查询性能优化"],
  },
  {
    id: "hpm4-ch09-replication-q1",
    chapter: "hpm4-ch09-replication",
    level: 1,
    question: "为什么“第9章 复制”必须覆盖33个正式节点？",
    answer:
      "这些节点共同组成“用binlog、GTID、并行回放、半同步与拓扑管理副本进度和故障切换”的服务目标、机制、负载、故障和证据链，缺项会使GTID集合、延迟分解、切换runbook、一致性校验和故障演练无法复现。",
    tags: ["高性能MySQL", "第4版", "第9章 复制"],
  },
  {
    id: "hpm4-ch09-replication-q2",
    chapter: "hpm4-ch09-replication",
    level: 1,
    question: "“第9章 复制”的最小运行不变量是什么？",
    answer:
      "每个已确认事务在目标拓扑有唯一身份，晋升不会丢失已承诺写入或产生双主分叉；必须由固定版本与负载、压力数据、故障反例和业务对账共同证明。",
    tags: ["高性能MySQL", "第4版", "第9章 复制"],
  },
  {
    id: "hpm4-ch09-replication-q3",
    chapter: "hpm4-ch09-replication",
    level: 2,
    question: "怎样为“第9章 复制”构造最小反例？",
    answer:
      "把“只看Seconds_Behind_Source判定健康，或在旧源未隔离时直接晋升副本”写成待证假设，只改变缓存、并发、分布或故障时点之一，再比较证据。",
    tags: ["高性能MySQL", "第4版", "第9章 复制"],
  },
  {
    id: "hpm4-ch09-replication-q4",
    chapter: "hpm4-ch09-replication",
    level: 2,
    question: "“第9章 复制”为什么必须先写SLO和预测？",
    answer:
      "SLO固定用户价值，预测固定结果、等待与失败终点，防止观察结果后反向编写解释。",
    tags: ["高性能MySQL", "第4版", "第9章 复制"],
  },
  {
    id: "hpm4-ch09-replication-q5",
    chapter: "hpm4-ch09-replication",
    level: 3,
    question: "如何验证“第9章 复制”中的性能结论？",
    answer:
      "固定版本、Schema、数据与负载，重复测量分位延迟、吞吐、错误、实际扫描和等待，同时独立核对结果。",
    tags: ["高性能MySQL", "第4版", "第9章 复制"],
  },
  {
    id: "hpm4-ch09-replication-q6",
    chapter: "hpm4-ch09-replication",
    level: 3,
    question: "“第9章 复制”独立交接需要哪些材料？",
    answer:
      "需要SLO、版本配置、Schema数据、负载脚本、GTID集合、延迟分解、切换runbook、一致性校验和故障演练、故障演练、业务对账和回退条件。",
    tags: ["高性能MySQL", "第4版", "第9章 复制"],
  },
  {
    id: "hpm4-ch10-backup-recovery-q1",
    chapter: "hpm4-ch10-backup-recovery",
    level: 1,
    question: "为什么“第10章 备份与恢复”必须覆盖25个正式节点？",
    answer:
      "这些节点共同组成“从RPO、RTO与故障模型选择逻辑、物理、快照、增量和binlog恢复链”的服务目标、机制、负载、故障和证据链，缺项会使备份清单、校验哈希、时间点恢复演练、RPO/RTO实测和删除事故复盘无法复现。",
    tags: ["高性能MySQL", "第4版", "第10章 备份与恢复"],
  },
  {
    id: "hpm4-ch10-backup-recovery-q2",
    chapter: "hpm4-ch10-backup-recovery",
    level: 1,
    question: "“第10章 备份与恢复”的最小运行不变量是什么？",
    answer:
      "备份可验证、可解密、可定位时间点并在目标RTO内恢复到独立环境；必须由固定版本与负载、压力数据、故障反例和业务对账共同证明。",
    tags: ["高性能MySQL", "第4版", "第10章 备份与恢复"],
  },
  {
    id: "hpm4-ch10-backup-recovery-q3",
    chapter: "hpm4-ch10-backup-recovery",
    level: 2,
    question: "怎样为“第10章 备份与恢复”构造最小反例？",
    answer:
      "把“把复制副本当备份，或只记录备份任务成功却从不恢复和核对业务数据”写成待证假设，只改变缓存、并发、分布或故障时点之一，再比较证据。",
    tags: ["高性能MySQL", "第4版", "第10章 备份与恢复"],
  },
  {
    id: "hpm4-ch10-backup-recovery-q4",
    chapter: "hpm4-ch10-backup-recovery",
    level: 2,
    question: "“第10章 备份与恢复”为什么必须先写SLO和预测？",
    answer:
      "SLO固定用户价值，预测固定结果、等待与失败终点，防止观察结果后反向编写解释。",
    tags: ["高性能MySQL", "第4版", "第10章 备份与恢复"],
  },
  {
    id: "hpm4-ch10-backup-recovery-q5",
    chapter: "hpm4-ch10-backup-recovery",
    level: 3,
    question: "如何验证“第10章 备份与恢复”中的性能结论？",
    answer:
      "固定版本、Schema、数据与负载，重复测量分位延迟、吞吐、错误、实际扫描和等待，同时独立核对结果。",
    tags: ["高性能MySQL", "第4版", "第10章 备份与恢复"],
  },
  {
    id: "hpm4-ch10-backup-recovery-q6",
    chapter: "hpm4-ch10-backup-recovery",
    level: 3,
    question: "“第10章 备份与恢复”独立交接需要哪些材料？",
    answer:
      "需要SLO、版本配置、Schema数据、负载脚本、备份清单、校验哈希、时间点恢复演练、RPO/RTO实测和删除事故复盘、故障演练、业务对账和回退条件。",
    tags: ["高性能MySQL", "第4版", "第10章 备份与恢复"],
  },
  {
    id: "hpm4-ch11-scaling-q1",
    chapter: "hpm4-ch11-scaling",
    level: 1,
    question: "为什么“第11章 扩展MySQL”必须覆盖19个正式节点？",
    answer:
      "这些节点共同组成“按读写瓶颈选择功能拆分、读池、排队和分片，并量化协调成本”的服务目标、机制、负载、故障和证据链，缺项会使工作负载模型、容量曲线、读池健康门、分片路由和再平衡演练无法复现。",
    tags: ["高性能MySQL", "第4版", "第11章 扩展MySQL"],
  },
  {
    id: "hpm4-ch11-scaling-q2",
    chapter: "hpm4-ch11-scaling",
    level: 1,
    question: "“第11章 扩展MySQL”的最小运行不变量是什么？",
    answer:
      "路由稳定，读一致性符合合同，分片热点、跨片事务与再平衡有明确处理策略；必须由固定版本与负载、压力数据、故障反例和业务对账共同证明。",
    tags: ["高性能MySQL", "第4版", "第11章 扩展MySQL"],
  },
  {
    id: "hpm4-ch11-scaling-q3",
    chapter: "hpm4-ch11-scaling",
    level: 2,
    question: "怎样为“第11章 扩展MySQL”构造最小反例？",
    answer:
      "把“在单机查询和Schema尚未优化前先分片，或把副本读延迟隐藏在业务结果中”写成待证假设，只改变缓存、并发、分布或故障时点之一，再比较证据。",
    tags: ["高性能MySQL", "第4版", "第11章 扩展MySQL"],
  },
  {
    id: "hpm4-ch11-scaling-q4",
    chapter: "hpm4-ch11-scaling",
    level: 2,
    question: "“第11章 扩展MySQL”为什么必须先写SLO和预测？",
    answer:
      "SLO固定用户价值，预测固定结果、等待与失败终点，防止观察结果后反向编写解释。",
    tags: ["高性能MySQL", "第4版", "第11章 扩展MySQL"],
  },
  {
    id: "hpm4-ch11-scaling-q5",
    chapter: "hpm4-ch11-scaling",
    level: 3,
    question: "如何验证“第11章 扩展MySQL”中的性能结论？",
    answer:
      "固定版本、Schema、数据与负载，重复测量分位延迟、吞吐、错误、实际扫描和等待，同时独立核对结果。",
    tags: ["高性能MySQL", "第4版", "第11章 扩展MySQL"],
  },
  {
    id: "hpm4-ch11-scaling-q6",
    chapter: "hpm4-ch11-scaling",
    level: 3,
    question: "“第11章 扩展MySQL”独立交接需要哪些材料？",
    answer:
      "需要SLO、版本配置、Schema数据、负载脚本、工作负载模型、容量曲线、读池健康门、分片路由和再平衡演练、故障演练、业务对账和回退条件。",
    tags: ["高性能MySQL", "第4版", "第11章 扩展MySQL"],
  },
  {
    id: "hpm4-ch12-mysql-cloud-q1",
    chapter: "hpm4-ch12-mysql-cloud",
    level: 1,
    question: "为什么“第12章 云端的MySQL”必须覆盖9个正式节点？",
    answer:
      "这些节点共同组成“比较托管服务、Aurora、Cloud SQL与自管虚拟机的责任、限制和成本”的服务目标、机制、负载、故障和证据链，缺项会使云责任矩阵、产品能力对照、成本模型和区域故障演练无法复现。",
    tags: ["高性能MySQL", "第4版", "第12章 云端的MySQL"],
  },
  {
    id: "hpm4-ch12-mysql-cloud-q2",
    chapter: "hpm4-ch12-mysql-cloud",
    level: 1,
    question: "“第12章 云端的MySQL”的最小运行不变量是什么？",
    answer:
      "SLO、备份、故障切换、版本、参数与数据出口责任都有明确所有者和验证方法；必须由固定版本与负载、压力数据、故障反例和业务对账共同证明。",
    tags: ["高性能MySQL", "第4版", "第12章 云端的MySQL"],
  },
  {
    id: "hpm4-ch12-mysql-cloud-q3",
    chapter: "hpm4-ch12-mysql-cloud",
    level: 2,
    question: "怎样为“第12章 云端的MySQL”构造最小反例？",
    answer:
      "把“把托管数据库理解为无需运维，忽略产品限制、维护窗口、数据出口和责任边界”写成待证假设，只改变缓存、并发、分布或故障时点之一，再比较证据。",
    tags: ["高性能MySQL", "第4版", "第12章 云端的MySQL"],
  },
  {
    id: "hpm4-ch12-mysql-cloud-q4",
    chapter: "hpm4-ch12-mysql-cloud",
    level: 2,
    question: "“第12章 云端的MySQL”为什么必须先写SLO和预测？",
    answer:
      "SLO固定用户价值，预测固定结果、等待与失败终点，防止观察结果后反向编写解释。",
    tags: ["高性能MySQL", "第4版", "第12章 云端的MySQL"],
  },
  {
    id: "hpm4-ch12-mysql-cloud-q5",
    chapter: "hpm4-ch12-mysql-cloud",
    level: 3,
    question: "如何验证“第12章 云端的MySQL”中的性能结论？",
    answer:
      "固定版本、Schema、数据与负载，重复测量分位延迟、吞吐、错误、实际扫描和等待，同时独立核对结果。",
    tags: ["高性能MySQL", "第4版", "第12章 云端的MySQL"],
  },
  {
    id: "hpm4-ch12-mysql-cloud-q6",
    chapter: "hpm4-ch12-mysql-cloud",
    level: 3,
    question: "“第12章 云端的MySQL”独立交接需要哪些材料？",
    answer:
      "需要SLO、版本配置、Schema数据、负载脚本、云责任矩阵、产品能力对照、成本模型和区域故障演练、故障演练、业务对账和回退条件。",
    tags: ["高性能MySQL", "第4版", "第12章 云端的MySQL"],
  },
  {
    id: "hpm4-ch13-compliance-q1",
    chapter: "hpm4-ch13-compliance",
    level: 1,
    question: "为什么“第13章 MySQL的合规性”必须覆盖15个正式节点？",
    answer:
      "这些节点共同组成“把外部法规要求转成密钥、最小权限、职责分离、变更和恢复控制”的服务目标、机制、负载、故障和证据链，缺项会使数据分类、控制矩阵、权限审计、变更日志和恢复证据包无法复现。",
    tags: ["高性能MySQL", "第4版", "第13章 MySQL的合规性"],
  },
  {
    id: "hpm4-ch13-compliance-q2",
    chapter: "hpm4-ch13-compliance",
    level: 1,
    question: "“第13章 MySQL的合规性”的最小运行不变量是什么？",
    answer:
      "敏感数据范围明确，访问可归因，密钥可轮换，变更与恢复证据完整且不可由单人伪造；必须由固定版本与负载、压力数据、故障反例和业务对账共同证明。",
    tags: ["高性能MySQL", "第4版", "第13章 MySQL的合规性"],
  },
  {
    id: "hpm4-ch13-compliance-q3",
    chapter: "hpm4-ch13-compliance",
    level: 2,
    question: "怎样为“第13章 MySQL的合规性”构造最小反例？",
    answer:
      "把“把合规当一次性文档工作，或给共享管理员账户过宽权限后用人工审批补救”写成待证假设，只改变缓存、并发、分布或故障时点之一，再比较证据。",
    tags: ["高性能MySQL", "第4版", "第13章 MySQL的合规性"],
  },
  {
    id: "hpm4-ch13-compliance-q4",
    chapter: "hpm4-ch13-compliance",
    level: 2,
    question: "“第13章 MySQL的合规性”为什么必须先写SLO和预测？",
    answer:
      "SLO固定用户价值，预测固定结果、等待与失败终点，防止观察结果后反向编写解释。",
    tags: ["高性能MySQL", "第4版", "第13章 MySQL的合规性"],
  },
  {
    id: "hpm4-ch13-compliance-q5",
    chapter: "hpm4-ch13-compliance",
    level: 3,
    question: "如何验证“第13章 MySQL的合规性”中的性能结论？",
    answer:
      "固定版本、Schema、数据与负载，重复测量分位延迟、吞吐、错误、实际扫描和等待，同时独立核对结果。",
    tags: ["高性能MySQL", "第4版", "第13章 MySQL的合规性"],
  },
  {
    id: "hpm4-ch13-compliance-q6",
    chapter: "hpm4-ch13-compliance",
    level: 3,
    question: "“第13章 MySQL的合规性”独立交接需要哪些材料？",
    answer:
      "需要SLO、版本配置、Schema数据、负载脚本、数据分类、控制矩阵、权限审计、变更日志和恢复证据包、故障演练、业务对账和回退条件。",
    tags: ["高性能MySQL", "第4版", "第13章 MySQL的合规性"],
  },
  {
    id: "hpm4-appendix-a-upgrading-q1",
    chapter: "hpm4-appendix-a-upgrading",
    level: 1,
    question: "为什么“附录A 升级MySQL”必须覆盖9个正式节点？",
    answer:
      "这些节点共同组成“用发布说明、真实流量对照、灰度副本和自动化runbook降低版本升级风险”的服务目标、机制、负载、故障和证据链，缺项会使兼容性矩阵、pt-upgrade对照、灰度结果和自动升级runbook无法复现。",
    tags: ["高性能MySQL", "第4版", "附录A 升级MySQL"],
  },
  {
    id: "hpm4-appendix-a-upgrading-q2",
    chapter: "hpm4-appendix-a-upgrading",
    level: 1,
    question: "“附录A 升级MySQL”的最小运行不变量是什么？",
    answer:
      "新旧版本结果与错误差异已知，升级目标不承载写流量，失败可由升级前备份恢复；必须由固定版本与负载、压力数据、故障反例和业务对账共同证明。",
    tags: ["高性能MySQL", "第4版", "附录A 升级MySQL"],
  },
  {
    id: "hpm4-appendix-a-upgrading-q3",
    chapter: "hpm4-appendix-a-upgrading",
    level: 2,
    question: "怎样为“附录A 升级MySQL”构造最小反例？",
    answer:
      "把“把小版本升级视为无风险原地替换，忽略sql_mode、变量弃用和不可降级的数据格式”写成待证假设，只改变缓存、并发、分布或故障时点之一，再比较证据。",
    tags: ["高性能MySQL", "第4版", "附录A 升级MySQL"],
  },
  {
    id: "hpm4-appendix-a-upgrading-q4",
    chapter: "hpm4-appendix-a-upgrading",
    level: 2,
    question: "“附录A 升级MySQL”为什么必须先写SLO和预测？",
    answer:
      "SLO固定用户价值，预测固定结果、等待与失败终点，防止观察结果后反向编写解释。",
    tags: ["高性能MySQL", "第4版", "附录A 升级MySQL"],
  },
  {
    id: "hpm4-appendix-a-upgrading-q5",
    chapter: "hpm4-appendix-a-upgrading",
    level: 3,
    question: "如何验证“附录A 升级MySQL”中的性能结论？",
    answer:
      "固定版本、Schema、数据与负载，重复测量分位延迟、吞吐、错误、实际扫描和等待，同时独立核对结果。",
    tags: ["高性能MySQL", "第4版", "附录A 升级MySQL"],
  },
  {
    id: "hpm4-appendix-a-upgrading-q6",
    chapter: "hpm4-appendix-a-upgrading",
    level: 3,
    question: "“附录A 升级MySQL”独立交接需要哪些材料？",
    answer:
      "需要SLO、版本配置、Schema数据、负载脚本、兼容性矩阵、pt-upgrade对照、灰度结果和自动升级runbook、故障演练、业务对账和回退条件。",
    tags: ["高性能MySQL", "第4版", "附录A 升级MySQL"],
  },
  {
    id: "hpm4-appendix-b-kubernetes-q1",
    chapter: "hpm4-appendix-b-kubernetes",
    level: 1,
    question: "为什么“附录B Kubernetes上的MySQL”必须覆盖5个正式节点？",
    answer:
      "这些节点共同组成“评估Kubernetes为MySQL提供资源、控制平面和自动化是否值得新增故障复杂度”的服务目标、机制、负载、故障和证据链，缺项会使责任边界、Operator能力矩阵、Pod与卷故障演练和退出方案无法复现。",
    tags: ["高性能MySQL", "第4版", "附录B Kubernetes上的MySQL"],
  },
  {
    id: "hpm4-appendix-b-kubernetes-q2",
    chapter: "hpm4-appendix-b-kubernetes",
    level: 1,
    question: "“附录B Kubernetes上的MySQL”的最小运行不变量是什么？",
    answer:
      "数据卷生命周期独立于Pod，资源与节点隔离明确，备份、恢复、升级和控制平面故障均有答案；必须由固定版本与负载、压力数据、故障反例和业务对账共同证明。",
    tags: ["高性能MySQL", "第4版", "附录B Kubernetes上的MySQL"],
  },
  {
    id: "hpm4-appendix-b-kubernetes-q3",
    chapter: "hpm4-appendix-b-kubernetes",
    level: 2,
    question: "怎样为“附录B Kubernetes上的MySQL”构造最小反例？",
    answer:
      "把“因为组织已有Kubernetes就迁移数据库，未定义控制平面、持久卷与有状态故障语义”写成待证假设，只改变缓存、并发、分布或故障时点之一，再比较证据。",
    tags: ["高性能MySQL", "第4版", "附录B Kubernetes上的MySQL"],
  },
  {
    id: "hpm4-appendix-b-kubernetes-q4",
    chapter: "hpm4-appendix-b-kubernetes",
    level: 2,
    question: "“附录B Kubernetes上的MySQL”为什么必须先写SLO和预测？",
    answer:
      "SLO固定用户价值，预测固定结果、等待与失败终点，防止观察结果后反向编写解释。",
    tags: ["高性能MySQL", "第4版", "附录B Kubernetes上的MySQL"],
  },
  {
    id: "hpm4-appendix-b-kubernetes-q5",
    chapter: "hpm4-appendix-b-kubernetes",
    level: 3,
    question: "如何验证“附录B Kubernetes上的MySQL”中的性能结论？",
    answer:
      "固定版本、Schema、数据与负载，重复测量分位延迟、吞吐、错误、实际扫描和等待，同时独立核对结果。",
    tags: ["高性能MySQL", "第4版", "附录B Kubernetes上的MySQL"],
  },
  {
    id: "hpm4-appendix-b-kubernetes-q6",
    chapter: "hpm4-appendix-b-kubernetes",
    level: 3,
    question: "“附录B Kubernetes上的MySQL”独立交接需要哪些材料？",
    answer:
      "需要SLO、版本配置、Schema数据、负载脚本、责任边界、Operator能力矩阵、Pod与卷故障演练和退出方案、故障演练、业务对账和回退条件。",
    tags: ["高性能MySQL", "第4版", "附录B Kubernetes上的MySQL"],
  },
  {
    id: "hpm4-official-final-review-q1",
    chapter: "hpm4-official-final-review",
    level: 1,
    question: "为什么“第4版全书复习与生产验收”必须覆盖15个正式节点？",
    answer:
      "这些节点共同组成“从用户SLO追踪到查询、页、锁、日志、副本、备份、分片和审计证据”的服务目标、机制、负载、故障和证据链，缺项会使生产就绪评审、容量与故障演练、合规证据包和102题复习记录无法复现。",
    tags: ["高性能MySQL", "第4版", "第4版全书复习与生产验收"],
  },
  {
    id: "hpm4-official-final-review-q2",
    chapter: "hpm4-official-final-review",
    level: 1,
    question: "“第4版全书复习与生产验收”的最小运行不变量是什么？",
    answer:
      "任何性能或可靠性结论都能由固定负载、计划与等待、故障恢复和业务对账重现；必须由固定版本与负载、压力数据、故障反例和业务对账共同证明。",
    tags: ["高性能MySQL", "第4版", "第4版全书复习与生产验收"],
  },
  {
    id: "hpm4-official-final-review-q3",
    chapter: "hpm4-official-final-review",
    level: 2,
    question: "怎样为“第4版全书复习与生产验收”构造最小反例？",
    answer:
      "把“只在理想基准中证明快，却无法回答故障时丢多少数据、多久恢复和谁负责”写成待证假设，只改变缓存、并发、分布或故障时点之一，再比较证据。",
    tags: ["高性能MySQL", "第4版", "第4版全书复习与生产验收"],
  },
  {
    id: "hpm4-official-final-review-q4",
    chapter: "hpm4-official-final-review",
    level: 2,
    question: "“第4版全书复习与生产验收”为什么必须先写SLO和预测？",
    answer:
      "SLO固定用户价值，预测固定结果、等待与失败终点，防止观察结果后反向编写解释。",
    tags: ["高性能MySQL", "第4版", "第4版全书复习与生产验收"],
  },
  {
    id: "hpm4-official-final-review-q5",
    chapter: "hpm4-official-final-review",
    level: 3,
    question: "如何验证“第4版全书复习与生产验收”中的性能结论？",
    answer:
      "固定版本、Schema、数据与负载，重复测量分位延迟、吞吐、错误、实际扫描和等待，同时独立核对结果。",
    tags: ["高性能MySQL", "第4版", "第4版全书复习与生产验收"],
  },
  {
    id: "hpm4-official-final-review-q6",
    chapter: "hpm4-official-final-review",
    level: 3,
    question: "“第4版全书复习与生产验收”独立交接需要哪些材料？",
    answer:
      "需要SLO、版本配置、Schema数据、负载脚本、生产就绪评审、容量与故障演练、合规证据包和102题复习记录、故障演练、业务对账和回退条件。",
    tags: ["高性能MySQL", "第4版", "第4版全书复习与生产验收"],
  },
];
