import type { ReviewQuestion } from "../review-questions";

export const ddi1OfficialQuestions: ReviewQuestion[] = [
  {
    id: "ddi-official-learning-map-q1",
    chapter: "ddi-official-learning-map",
    level: 1,
    question: "为什么“第1版权威学习地图”必须覆盖7个页面节点？",
    answer:
      "节点组成“沿系统目标、数据表示、单机存储、分布式协调和派生数据五条因果链完成12章与术语表”的状态、顺序、故障与证据链；缺项会让15页路线、章节依赖图、跨章实验仓、版本边界表和全书清单无法复现。",
    tags: ["DDIA", "第1版", "第1版权威学习地图"],
  },
  {
    id: "ddi-official-learning-map-q2",
    chapter: "ddi-official-learning-map",
    level: 1,
    question: "“第1版权威学习地图”的最小运行不变量是什么？",
    answer:
      "3部分、12章与术语表都有独立页面、目录节点、交互实验、失败反例和交付物；需要正常历史、压力、故障与独立对账共同证明。",
    tags: ["DDIA", "第1版", "第1版权威学习地图"],
  },
  {
    id: "ddi-official-learning-map-q3",
    chapter: "ddi-official-learning-map",
    level: 2,
    question: "怎样为“第1版权威学习地图”构造最小反例？",
    answer:
      "把“按产品名跳读，或把2026英文第2版章节静默混入2018中文第1版路线”写成假设，只改变一个故障条件再检查结果。",
    tags: ["DDIA", "第1版", "第1版权威学习地图"],
  },
  {
    id: "ddi-official-learning-map-q4",
    chapter: "ddi-official-learning-map",
    level: 2,
    question: "“第1版权威学习地图”为什么必须先写预测？",
    answer:
      "预测固定用户结果、状态和失败终点，防止观察后反向编造“沿系统目标、数据表示、单机存储、分布式协调和派生数据五条因果链完成12章与术语表”的解释。",
    tags: ["DDIA", "第1版", "第1版权威学习地图"],
  },
  {
    id: "ddi-official-learning-map-q5",
    chapter: "ddi-official-learning-map",
    level: 3,
    question: "如何验证“第1版权威学习地图”的性能与语义？",
    answer:
      "固定输入，测分位延迟、吞吐、错误和资源，并独立证明“3部分、12章与术语表都有独立页面、目录节点、交互实验、失败反例和交付物”。",
    tags: ["DDIA", "第1版", "第1版权威学习地图"],
  },
  {
    id: "ddi-official-learning-map-q6",
    chapter: "ddi-official-learning-map",
    level: 3,
    question: "“第1版权威学习地图”独立交接需要哪些材料？",
    answer:
      "需要版本目录、契约、15页路线、章节依赖图、跨章实验仓、版本边界表和全书清单、故障历史、对账、停止、恢复和回退。",
    tags: ["DDIA", "第1版", "第1版权威学习地图"],
  },
  {
    id: "ddi-01-reliable-scalable-maintainable-applications-q1",
    chapter: "ddi-01-reliable-scalable-maintainable-applications",
    level: 1,
    question:
      "为什么“第1章 可靠、可扩展与可维护的应用系统”必须覆盖15个页面节点？",
    answer:
      "节点组成“把数据库、缓存、索引与消息系统视为一个数据系统，用可靠性、可扩展性和可维护性约束架构”的状态、顺序、故障与证据链；缺项会让服务目标表、负载画像、故障树、容量曲线与可维护性评审无法复现。",
    tags: ["DDIA", "第1版", "第1章 可靠、可扩展与可维护的应用系统"],
  },
  {
    id: "ddi-01-reliable-scalable-maintainable-applications-q2",
    chapter: "ddi-01-reliable-scalable-maintainable-applications",
    level: 1,
    question: "“第1章 可靠、可扩展与可维护的应用系统”的最小运行不变量是什么？",
    answer:
      "故障、负载增长或团队变更时，系统仍保持数据正确性、用户SLO和可理解的运维边界；需要正常历史、压力、故障与独立对账共同证明。",
    tags: ["DDIA", "第1版", "第1章 可靠、可扩展与可维护的应用系统"],
  },
  {
    id: "ddi-01-reliable-scalable-maintainable-applications-q3",
    chapter: "ddi-01-reliable-scalable-maintainable-applications",
    level: 2,
    question: "怎样为“第1章 可靠、可扩展与可维护的应用系统”构造最小反例？",
    answer:
      "把“只以节点在线定义可靠性，只用日均QPS定义规模，并把复杂性转移给值班人员”写成假设，只改变一个故障条件再检查结果。",
    tags: ["DDIA", "第1版", "第1章 可靠、可扩展与可维护的应用系统"],
  },
  {
    id: "ddi-01-reliable-scalable-maintainable-applications-q4",
    chapter: "ddi-01-reliable-scalable-maintainable-applications",
    level: 2,
    question: "“第1章 可靠、可扩展与可维护的应用系统”为什么必须先写预测？",
    answer:
      "预测固定用户结果、状态和失败终点，防止观察后反向编造“把数据库、缓存、索引与消息系统视为一个数据系统，用可靠性、可扩展性和可维护性约束架构”的解释。",
    tags: ["DDIA", "第1版", "第1章 可靠、可扩展与可维护的应用系统"],
  },
  {
    id: "ddi-01-reliable-scalable-maintainable-applications-q5",
    chapter: "ddi-01-reliable-scalable-maintainable-applications",
    level: 3,
    question: "如何验证“第1章 可靠、可扩展与可维护的应用系统”的性能与语义？",
    answer:
      "固定输入，测分位延迟、吞吐、错误和资源，并独立证明“故障、负载增长或团队变更时，系统仍保持数据正确性、用户SLO和可理解的运维边界”。",
    tags: ["DDIA", "第1版", "第1章 可靠、可扩展与可维护的应用系统"],
  },
  {
    id: "ddi-01-reliable-scalable-maintainable-applications-q6",
    chapter: "ddi-01-reliable-scalable-maintainable-applications",
    level: 3,
    question: "“第1章 可靠、可扩展与可维护的应用系统”独立交接需要哪些材料？",
    answer:
      "需要版本目录、契约、服务目标表、负载画像、故障树、容量曲线与可维护性评审、故障历史、对账、停止、恢复和回退。",
    tags: ["DDIA", "第1版", "第1章 可靠、可扩展与可维护的应用系统"],
  },
  {
    id: "ddi-02-data-models-query-languages-q1",
    chapter: "ddi-02-data-models-query-languages",
    level: 1,
    question: "为什么“第2章 数据模型与查询语言”必须覆盖16个页面节点？",
    answer:
      "节点组成“从业务关系与访问模式比较关系、文档和图模型，并理解声明式查询如何分离意图与执行”的状态、顺序、故障与证据链；缺项会让领域关系图、查询工作负载、模型对照、迁移计划与结果对账无法复现。",
    tags: ["DDIA", "第1版", "第2章 数据模型与查询语言"],
  },
  {
    id: "ddi-02-data-models-query-languages-q2",
    chapter: "ddi-02-data-models-query-languages",
    level: 1,
    question: "“第2章 数据模型与查询语言”的最小运行不变量是什么？",
    answer:
      "数据模型忠实表达关系与约束，查询接口允许实现演进，迁移后结果集合和业务语义一致；需要正常历史、压力、故障与独立对账共同证明。",
    tags: ["DDIA", "第1版", "第2章 数据模型与查询语言"],
  },
  {
    id: "ddi-02-data-models-query-languages-q3",
    chapter: "ddi-02-data-models-query-languages",
    level: 2,
    question: "怎样为“第2章 数据模型与查询语言”构造最小反例？",
    answer:
      "把“因为对象像JSON就选文档库，或因为SQL成熟就忽略高扇出关系与图遍历成本”写成假设，只改变一个故障条件再检查结果。",
    tags: ["DDIA", "第1版", "第2章 数据模型与查询语言"],
  },
  {
    id: "ddi-02-data-models-query-languages-q4",
    chapter: "ddi-02-data-models-query-languages",
    level: 2,
    question: "“第2章 数据模型与查询语言”为什么必须先写预测？",
    answer:
      "预测固定用户结果、状态和失败终点，防止观察后反向编造“从业务关系与访问模式比较关系、文档和图模型，并理解声明式查询如何分离意图与执行”的解释。",
    tags: ["DDIA", "第1版", "第2章 数据模型与查询语言"],
  },
  {
    id: "ddi-02-data-models-query-languages-q5",
    chapter: "ddi-02-data-models-query-languages",
    level: 3,
    question: "如何验证“第2章 数据模型与查询语言”的性能与语义？",
    answer:
      "固定输入，测分位延迟、吞吐、错误和资源，并独立证明“数据模型忠实表达关系与约束，查询接口允许实现演进，迁移后结果集合和业务语义一致”。",
    tags: ["DDIA", "第1版", "第2章 数据模型与查询语言"],
  },
  {
    id: "ddi-02-data-models-query-languages-q6",
    chapter: "ddi-02-data-models-query-languages",
    level: 3,
    question: "“第2章 数据模型与查询语言”独立交接需要哪些材料？",
    answer:
      "需要版本目录、契约、领域关系图、查询工作负载、模型对照、迁移计划与结果对账、故障历史、对账、停止、恢复和回退。",
    tags: ["DDIA", "第1版", "第2章 数据模型与查询语言"],
  },
  {
    id: "ddi-03-storage-retrieval-q1",
    chapter: "ddi-03-storage-retrieval",
    level: 1,
    question: "为什么“第3章 数据存储与检索”必须覆盖15个页面节点？",
    answer:
      "节点组成“沿写路径、读路径和后台维护理解日志结构、B树、列存与物化聚合的成本模型”的状态、顺序、故障与证据链；缺项会让写读路径图、索引基准、放大系数、压缩对照与恢复验证无法复现。",
    tags: ["DDIA", "第1版", "第3章 数据存储与检索"],
  },
  {
    id: "ddi-03-storage-retrieval-q2",
    chapter: "ddi-03-storage-retrieval",
    level: 1,
    question: "“第3章 数据存储与检索”的最小运行不变量是什么？",
    answer:
      "存储布局在崩溃恢复、并发写和真实分布下返回正确结果，读写空间放大与尾延迟可度量；需要正常历史、压力、故障与独立对账共同证明。",
    tags: ["DDIA", "第1版", "第3章 数据存储与检索"],
  },
  {
    id: "ddi-03-storage-retrieval-q3",
    chapter: "ddi-03-storage-retrieval",
    level: 2,
    question: "怎样为“第3章 数据存储与检索”构造最小反例？",
    answer:
      "把“只比较单次查询平均耗时，不计压实、缓存、写放大、恢复和空间回收”写成假设，只改变一个故障条件再检查结果。",
    tags: ["DDIA", "第1版", "第3章 数据存储与检索"],
  },
  {
    id: "ddi-03-storage-retrieval-q4",
    chapter: "ddi-03-storage-retrieval",
    level: 2,
    question: "“第3章 数据存储与检索”为什么必须先写预测？",
    answer:
      "预测固定用户结果、状态和失败终点，防止观察后反向编造“沿写路径、读路径和后台维护理解日志结构、B树、列存与物化聚合的成本模型”的解释。",
    tags: ["DDIA", "第1版", "第3章 数据存储与检索"],
  },
  {
    id: "ddi-03-storage-retrieval-q5",
    chapter: "ddi-03-storage-retrieval",
    level: 3,
    question: "如何验证“第3章 数据存储与检索”的性能与语义？",
    answer:
      "固定输入，测分位延迟、吞吐、错误和资源，并独立证明“存储布局在崩溃恢复、并发写和真实分布下返回正确结果，读写空间放大与尾延迟可度量”。",
    tags: ["DDIA", "第1版", "第3章 数据存储与检索"],
  },
  {
    id: "ddi-03-storage-retrieval-q6",
    chapter: "ddi-03-storage-retrieval",
    level: 3,
    question: "“第3章 数据存储与检索”独立交接需要哪些材料？",
    answer:
      "需要版本目录、契约、写读路径图、索引基准、放大系数、压缩对照与恢复验证、故障历史、对账、停止、恢复和回退。",
    tags: ["DDIA", "第1版", "第3章 数据存储与检索"],
  },
  {
    id: "ddi-04-encoding-evolution-q1",
    chapter: "ddi-04-encoding-evolution",
    level: 1,
    question: "为什么“第4章 数据编码与演化”必须覆盖11个页面节点？",
    answer:
      "节点组成“把对象转换为稳定字节，并以向前、向后兼容约束数据库、服务和消息的独立演进”的状态、顺序、故障与证据链；缺项会让Schema演化矩阵、兼容测试、滚动升级演练、消息样本与回滚记录无法复现。",
    tags: ["DDIA", "第1版", "第4章 数据编码与演化"],
  },
  {
    id: "ddi-04-encoding-evolution-q2",
    chapter: "ddi-04-encoding-evolution",
    level: 1,
    question: "“第4章 数据编码与演化”的最小运行不变量是什么？",
    answer:
      "新旧代码与新旧数据在滚动升级、回滚和异步消费期间互操作，未知字段不破坏语义；需要正常历史、压力、故障与独立对账共同证明。",
    tags: ["DDIA", "第1版", "第4章 数据编码与演化"],
  },
  {
    id: "ddi-04-encoding-evolution-q3",
    chapter: "ddi-04-encoding-evolution",
    level: 2,
    question: "怎样为“第4章 数据编码与演化”构造最小反例？",
    answer:
      "把“只验证最新生产者和消费者，忽略旧数据、默认值、未知字段与回滚方向”写成假设，只改变一个故障条件再检查结果。",
    tags: ["DDIA", "第1版", "第4章 数据编码与演化"],
  },
  {
    id: "ddi-04-encoding-evolution-q4",
    chapter: "ddi-04-encoding-evolution",
    level: 2,
    question: "“第4章 数据编码与演化”为什么必须先写预测？",
    answer:
      "预测固定用户结果、状态和失败终点，防止观察后反向编造“把对象转换为稳定字节，并以向前、向后兼容约束数据库、服务和消息的独立演进”的解释。",
    tags: ["DDIA", "第1版", "第4章 数据编码与演化"],
  },
  {
    id: "ddi-04-encoding-evolution-q5",
    chapter: "ddi-04-encoding-evolution",
    level: 3,
    question: "如何验证“第4章 数据编码与演化”的性能与语义？",
    answer:
      "固定输入，测分位延迟、吞吐、错误和资源，并独立证明“新旧代码与新旧数据在滚动升级、回滚和异步消费期间互操作，未知字段不破坏语义”。",
    tags: ["DDIA", "第1版", "第4章 数据编码与演化"],
  },
  {
    id: "ddi-04-encoding-evolution-q6",
    chapter: "ddi-04-encoding-evolution",
    level: 3,
    question: "“第4章 数据编码与演化”独立交接需要哪些材料？",
    answer:
      "需要版本目录、契约、Schema演化矩阵、兼容测试、滚动升级演练、消息样本与回滚记录、故障历史、对账、停止、恢复和回退。",
    tags: ["DDIA", "第1版", "第4章 数据编码与演化"],
  },
  {
    id: "ddi-05-replication-q1",
    chapter: "ddi-05-replication",
    level: 1,
    question: "为什么“第5章 复制”必须覆盖20个页面节点？",
    answer:
      "节点组成“比较单主、多主与无主复制的传播、冲突、读取保证和故障恢复”的状态、顺序、故障与证据链；缺项会让复制时序图、滞后分布、切换演练、冲突样本和读一致性测试无法复现。",
    tags: ["DDIA", "第1版", "第5章 复制"],
  },
  {
    id: "ddi-05-replication-q2",
    chapter: "ddi-05-replication",
    level: 1,
    question: "“第5章 复制”的最小运行不变量是什么？",
    answer:
      "滞后、宕机、分区和重试下，确认语义、冲突规则与读取保证可解释且可验证；需要正常历史、压力、故障与独立对账共同证明。",
    tags: ["DDIA", "第1版", "第5章 复制"],
  },
  {
    id: "ddi-05-replication-q3",
    chapter: "ddi-05-replication",
    level: 2,
    question: "怎样为“第5章 复制”构造最小反例？",
    answer:
      "把“把副本数等同数据安全，把多数成功等同强一致，并忽略超时写可能已提交”写成假设，只改变一个故障条件再检查结果。",
    tags: ["DDIA", "第1版", "第5章 复制"],
  },
  {
    id: "ddi-05-replication-q4",
    chapter: "ddi-05-replication",
    level: 2,
    question: "“第5章 复制”为什么必须先写预测？",
    answer:
      "预测固定用户结果、状态和失败终点，防止观察后反向编造“比较单主、多主与无主复制的传播、冲突、读取保证和故障恢复”的解释。",
    tags: ["DDIA", "第1版", "第5章 复制"],
  },
  {
    id: "ddi-05-replication-q5",
    chapter: "ddi-05-replication",
    level: 3,
    question: "如何验证“第5章 复制”的性能与语义？",
    answer:
      "固定输入，测分位延迟、吞吐、错误和资源，并独立证明“滞后、宕机、分区和重试下，确认语义、冲突规则与读取保证可解释且可验证”。",
    tags: ["DDIA", "第1版", "第5章 复制"],
  },
  {
    id: "ddi-05-replication-q6",
    chapter: "ddi-05-replication",
    level: 3,
    question: "“第5章 复制”独立交接需要哪些材料？",
    answer:
      "需要版本目录、契约、复制时序图、滞后分布、切换演练、冲突样本和读一致性测试、故障历史、对账、停止、恢复和回退。",
    tags: ["DDIA", "第1版", "第5章 复制"],
  },
  {
    id: "ddi-06-partitioning-q1",
    chapter: "ddi-06-partitioning",
    level: 1,
    question: "为什么“第6章 分区”必须覆盖14个页面节点？",
    answer:
      "节点组成“按键范围或哈希分散数据与请求，控制热点、二级索引、再平衡和路由变化”的状态、顺序、故障与证据链；缺项会让键分布直方图、分区映射、再平衡演练、路由追踪与跨分区报告无法复现。",
    tags: ["DDIA", "第1版", "第6章 分区"],
  },
  {
    id: "ddi-06-partitioning-q2",
    chapter: "ddi-06-partitioning",
    level: 1,
    question: "“第6章 分区”的最小运行不变量是什么？",
    answer:
      "归属变化期间没有丢失、重复拥有或错误路由，热点与再平衡成本受控；需要正常历史、压力、故障与独立对账共同证明。",
    tags: ["DDIA", "第1版", "第6章 分区"],
  },
  {
    id: "ddi-06-partitioning-q3",
    chapter: "ddi-06-partitioning",
    level: 2,
    question: "怎样为“第6章 分区”构造最小反例？",
    answer:
      "把“假设哈希天然均匀、自动再平衡天然安全，让热点键或全局索引拖垮集群”写成假设，只改变一个故障条件再检查结果。",
    tags: ["DDIA", "第1版", "第6章 分区"],
  },
  {
    id: "ddi-06-partitioning-q4",
    chapter: "ddi-06-partitioning",
    level: 2,
    question: "“第6章 分区”为什么必须先写预测？",
    answer:
      "预测固定用户结果、状态和失败终点，防止观察后反向编造“按键范围或哈希分散数据与请求，控制热点、二级索引、再平衡和路由变化”的解释。",
    tags: ["DDIA", "第1版", "第6章 分区"],
  },
  {
    id: "ddi-06-partitioning-q5",
    chapter: "ddi-06-partitioning",
    level: 3,
    question: "如何验证“第6章 分区”的性能与语义？",
    answer:
      "固定输入，测分位延迟、吞吐、错误和资源，并独立证明“归属变化期间没有丢失、重复拥有或错误路由，热点与再平衡成本受控”。",
    tags: ["DDIA", "第1版", "第6章 分区"],
  },
  {
    id: "ddi-06-partitioning-q6",
    chapter: "ddi-06-partitioning",
    level: 3,
    question: "“第6章 分区”独立交接需要哪些材料？",
    answer:
      "需要版本目录、契约、键分布直方图、分区映射、再平衡演练、路由追踪与跨分区报告、故障历史、对账、停止、恢复和回退。",
    tags: ["DDIA", "第1版", "第6章 分区"],
  },
  {
    id: "ddi-07-transactions-q1",
    chapter: "ddi-07-transactions",
    level: 1,
    question: "为什么“第7章 事务”必须覆盖13个页面节点？",
    answer:
      "节点组成“用事务边界与隔离级别管理并发交错和部分失败，比较快照、锁与SSI”的状态、顺序、故障与证据链；缺项会让事务历史、异常复现、隔离矩阵、重试协议和不变量对账无法复现。",
    tags: ["DDIA", "第1版", "第7章 事务"],
  },
  {
    id: "ddi-07-transactions-q2",
    chapter: "ddi-07-transactions",
    level: 1,
    question: "“第7章 事务”的最小运行不变量是什么？",
    answer:
      "业务不变量在指定隔离和重试策略下保持，提交、回滚与未知结果都有处理；需要正常历史、压力、故障与独立对账共同证明。",
    tags: ["DDIA", "第1版", "第7章 事务"],
  },
  {
    id: "ddi-07-transactions-q3",
    chapter: "ddi-07-transactions",
    level: 2,
    question: "怎样为“第7章 事务”构造最小反例？",
    answer:
      "把“看到ACID就假设所有异常被阻止，或在未知提交后无条件重试非幂等操作”写成假设，只改变一个故障条件再检查结果。",
    tags: ["DDIA", "第1版", "第7章 事务"],
  },
  {
    id: "ddi-07-transactions-q4",
    chapter: "ddi-07-transactions",
    level: 2,
    question: "“第7章 事务”为什么必须先写预测？",
    answer:
      "预测固定用户结果、状态和失败终点，防止观察后反向编造“用事务边界与隔离级别管理并发交错和部分失败，比较快照、锁与SSI”的解释。",
    tags: ["DDIA", "第1版", "第7章 事务"],
  },
  {
    id: "ddi-07-transactions-q5",
    chapter: "ddi-07-transactions",
    level: 3,
    question: "如何验证“第7章 事务”的性能与语义？",
    answer:
      "固定输入，测分位延迟、吞吐、错误和资源，并独立证明“业务不变量在指定隔离和重试策略下保持，提交、回滚与未知结果都有处理”。",
    tags: ["DDIA", "第1版", "第7章 事务"],
  },
  {
    id: "ddi-07-transactions-q6",
    chapter: "ddi-07-transactions",
    level: 3,
    question: "“第7章 事务”独立交接需要哪些材料？",
    answer:
      "需要版本目录、契约、事务历史、异常复现、隔离矩阵、重试协议和不变量对账、故障历史、对账、停止、恢复和回退。",
    tags: ["DDIA", "第1版", "第7章 事务"],
  },
  {
    id: "ddi-08-trouble-distributed-systems-q1",
    chapter: "ddi-08-trouble-distributed-systems",
    level: 1,
    question: "为什么“第8章 分布式系统的麻烦”必须覆盖17个页面节点？",
    answer:
      "节点组成“承认网络、时钟和进程只能提供不完整信息，用超时、仲裁与隔离令牌管理不确定性”的状态、顺序、故障与证据链；缺项会让故障时间线、延迟分布、时钟误差、进程暂停实验与隔离验证无法复现。",
    tags: ["DDIA", "第1版", "第8章 分布式系统的麻烦"],
  },
  {
    id: "ddi-08-trouble-distributed-systems-q2",
    chapter: "ddi-08-trouble-distributed-systems",
    level: 1,
    question: "“第8章 分布式系统的麻烦”的最小运行不变量是什么？",
    answer:
      "节点不把本地时间、沉默或单方观察误当全局事实，过期参与者不能破坏资源；需要正常历史、压力、故障与独立对账共同证明。",
    tags: ["DDIA", "第1版", "第8章 分布式系统的麻烦"],
  },
  {
    id: "ddi-08-trouble-distributed-systems-q3",
    chapter: "ddi-08-trouble-distributed-systems",
    level: 2,
    question: "怎样为“第8章 分布式系统的麻烦”构造最小反例？",
    answer:
      "把“把超时等同对方死亡，把墙钟当严格顺序，并让恢复后的旧主继续写资源”写成假设，只改变一个故障条件再检查结果。",
    tags: ["DDIA", "第1版", "第8章 分布式系统的麻烦"],
  },
  {
    id: "ddi-08-trouble-distributed-systems-q4",
    chapter: "ddi-08-trouble-distributed-systems",
    level: 2,
    question: "“第8章 分布式系统的麻烦”为什么必须先写预测？",
    answer:
      "预测固定用户结果、状态和失败终点，防止观察后反向编造“承认网络、时钟和进程只能提供不完整信息，用超时、仲裁与隔离令牌管理不确定性”的解释。",
    tags: ["DDIA", "第1版", "第8章 分布式系统的麻烦"],
  },
  {
    id: "ddi-08-trouble-distributed-systems-q5",
    chapter: "ddi-08-trouble-distributed-systems",
    level: 3,
    question: "如何验证“第8章 分布式系统的麻烦”的性能与语义？",
    answer:
      "固定输入，测分位延迟、吞吐、错误和资源，并独立证明“节点不把本地时间、沉默或单方观察误当全局事实，过期参与者不能破坏资源”。",
    tags: ["DDIA", "第1版", "第8章 分布式系统的麻烦"],
  },
  {
    id: "ddi-08-trouble-distributed-systems-q6",
    chapter: "ddi-08-trouble-distributed-systems",
    level: 3,
    question: "“第8章 分布式系统的麻烦”独立交接需要哪些材料？",
    answer:
      "需要版本目录、契约、故障时间线、延迟分布、时钟误差、进程暂停实验与隔离验证、故障历史、对账、停止、恢复和回退。",
    tags: ["DDIA", "第1版", "第8章 分布式系统的麻烦"],
  },
  {
    id: "ddi-09-consistency-consensus-q1",
    chapter: "ddi-09-consistency-consensus",
    level: 1,
    question: "为什么“第9章 一致性与共识”必须覆盖16个页面节点？",
    answer:
      "节点组成“用线性一致、因果与全序广播描述可见顺序，再理解原子提交、共识与成员协调”的状态、顺序、故障与证据链；缺项会让历史检查、因果图、共识日志、成员变更与提交恢复记录无法复现。",
    tags: ["DDIA", "第1版", "第9章 一致性与共识"],
  },
  {
    id: "ddi-09-consistency-consensus-q2",
    chapter: "ddi-09-consistency-consensus",
    level: 1,
    question: "“第9章 一致性与共识”的最小运行不变量是什么？",
    answer:
      "决定满足顺序与唯一性，任期和提交证据可追溯，少数故障不产生两个已提交事实；需要正常历史、压力、故障与独立对账共同证明。",
    tags: ["DDIA", "第1版", "第9章 一致性与共识"],
  },
  {
    id: "ddi-09-consistency-consensus-q3",
    chapter: "ddi-09-consistency-consensus",
    level: 2,
    question: "怎样为“第9章 一致性与共识”构造最小反例？",
    answer:
      "把“把副本收敛等同线性一致，把两阶段提交等同容错共识，只测稳定领导者”写成假设，只改变一个故障条件再检查结果。",
    tags: ["DDIA", "第1版", "第9章 一致性与共识"],
  },
  {
    id: "ddi-09-consistency-consensus-q4",
    chapter: "ddi-09-consistency-consensus",
    level: 2,
    question: "“第9章 一致性与共识”为什么必须先写预测？",
    answer:
      "预测固定用户结果、状态和失败终点，防止观察后反向编造“用线性一致、因果与全序广播描述可见顺序，再理解原子提交、共识与成员协调”的解释。",
    tags: ["DDIA", "第1版", "第9章 一致性与共识"],
  },
  {
    id: "ddi-09-consistency-consensus-q5",
    chapter: "ddi-09-consistency-consensus",
    level: 3,
    question: "如何验证“第9章 一致性与共识”的性能与语义？",
    answer:
      "固定输入，测分位延迟、吞吐、错误和资源，并独立证明“决定满足顺序与唯一性，任期和提交证据可追溯，少数故障不产生两个已提交事实”。",
    tags: ["DDIA", "第1版", "第9章 一致性与共识"],
  },
  {
    id: "ddi-09-consistency-consensus-q6",
    chapter: "ddi-09-consistency-consensus",
    level: 3,
    question: "“第9章 一致性与共识”独立交接需要哪些材料？",
    answer:
      "需要版本目录、契约、历史检查、因果图、共识日志、成员变更与提交恢复记录、故障历史、对账、停止、恢复和回退。",
    tags: ["DDIA", "第1版", "第9章 一致性与共识"],
  },
  {
    id: "ddi-10-batch-processing-q1",
    chapter: "ddi-10-batch-processing",
    level: 1,
    question: "为什么“第10章 批处理”必须覆盖14个页面节点？",
    answer:
      "节点组成“把不可变输入转为可重跑的派生输出，从Unix管道走向MapReduce、连接和数据流”的状态、顺序、故障与证据链；缺项会让输入快照、批处理DAG、连接计划、重跑对账和输出发布记录无法复现。",
    tags: ["DDIA", "第1版", "第10章 批处理"],
  },
  {
    id: "ddi-10-batch-processing-q2",
    chapter: "ddi-10-batch-processing",
    level: 1,
    question: "“第10章 批处理”的最小运行不变量是什么？",
    answer:
      "相同版本输入与代码可重建结果，失败任务不污染最终输出，来源和完成边界可审计；需要正常历史、压力、故障与独立对账共同证明。",
    tags: ["DDIA", "第1版", "第10章 批处理"],
  },
  {
    id: "ddi-10-batch-processing-q3",
    chapter: "ddi-10-batch-processing",
    level: 2,
    question: "怎样为“第10章 批处理”构造最小反例？",
    answer:
      "把“直接修改线上派生状态，把任务成功当结果正确，忽略倾斜键和部分输出”写成假设，只改变一个故障条件再检查结果。",
    tags: ["DDIA", "第1版", "第10章 批处理"],
  },
  {
    id: "ddi-10-batch-processing-q4",
    chapter: "ddi-10-batch-processing",
    level: 2,
    question: "“第10章 批处理”为什么必须先写预测？",
    answer:
      "预测固定用户结果、状态和失败终点，防止观察后反向编造“把不可变输入转为可重跑的派生输出，从Unix管道走向MapReduce、连接和数据流”的解释。",
    tags: ["DDIA", "第1版", "第10章 批处理"],
  },
  {
    id: "ddi-10-batch-processing-q5",
    chapter: "ddi-10-batch-processing",
    level: 3,
    question: "如何验证“第10章 批处理”的性能与语义？",
    answer:
      "固定输入，测分位延迟、吞吐、错误和资源，并独立证明“相同版本输入与代码可重建结果，失败任务不污染最终输出，来源和完成边界可审计”。",
    tags: ["DDIA", "第1版", "第10章 批处理"],
  },
  {
    id: "ddi-10-batch-processing-q6",
    chapter: "ddi-10-batch-processing",
    level: 3,
    question: "“第10章 批处理”独立交接需要哪些材料？",
    answer:
      "需要版本目录、契约、输入快照、批处理DAG、连接计划、重跑对账和输出发布记录、故障历史、对账、停止、恢复和回退。",
    tags: ["DDIA", "第1版", "第10章 批处理"],
  },
  {
    id: "ddi-11-stream-processing-q1",
    chapter: "ddi-11-stream-processing",
    level: 1,
    question: "为什么“第11章 流处理”必须覆盖14个页面节点？",
    answer:
      "节点组成“把持续事件作为有序可重放日志，连接CDC、事件时间、流连接和容错状态”的状态、顺序、故障与证据链；缺项会让事件Schema、分区顺序、窗口测试、检查点恢复与端到端对账无法复现。",
    tags: ["DDIA", "第1版", "第11章 流处理"],
  },
  {
    id: "ddi-11-stream-processing-q2",
    chapter: "ddi-11-stream-processing",
    level: 1,
    question: "“第11章 流处理”的最小运行不变量是什么？",
    answer:
      "重复、乱序、迟到、重启和回放下，状态与外部副作用满足声明语义；需要正常历史、压力、故障与独立对账共同证明。",
    tags: ["DDIA", "第1版", "第11章 流处理"],
  },
  {
    id: "ddi-11-stream-processing-q3",
    chapter: "ddi-11-stream-processing",
    level: 2,
    question: "怎样为“第11章 流处理”构造最小反例？",
    answer:
      "把“声称恰好一次却不约束外部副作用，用处理时间掩盖迟到，把确认等同业务完成”写成假设，只改变一个故障条件再检查结果。",
    tags: ["DDIA", "第1版", "第11章 流处理"],
  },
  {
    id: "ddi-11-stream-processing-q4",
    chapter: "ddi-11-stream-processing",
    level: 2,
    question: "“第11章 流处理”为什么必须先写预测？",
    answer:
      "预测固定用户结果、状态和失败终点，防止观察后反向编造“把持续事件作为有序可重放日志，连接CDC、事件时间、流连接和容错状态”的解释。",
    tags: ["DDIA", "第1版", "第11章 流处理"],
  },
  {
    id: "ddi-11-stream-processing-q5",
    chapter: "ddi-11-stream-processing",
    level: 3,
    question: "如何验证“第11章 流处理”的性能与语义？",
    answer:
      "固定输入，测分位延迟、吞吐、错误和资源，并独立证明“重复、乱序、迟到、重启和回放下，状态与外部副作用满足声明语义”。",
    tags: ["DDIA", "第1版", "第11章 流处理"],
  },
  {
    id: "ddi-11-stream-processing-q6",
    chapter: "ddi-11-stream-processing",
    level: 3,
    question: "“第11章 流处理”独立交接需要哪些材料？",
    answer:
      "需要版本目录、契约、事件Schema、分区顺序、窗口测试、检查点恢复与端到端对账、故障历史、对账、停止、恢复和回退。",
    tags: ["DDIA", "第1版", "第11章 流处理"],
  },
  {
    id: "ddi-12-future-data-systems-q1",
    chapter: "ddi-12-future-data-systems",
    level: 1,
    question: "为什么“第12章 数据系统的未来”必须覆盖16个页面节点？",
    answer:
      "节点组成“以数据流组合专用工具，并把端到端正确性、验证、隐私和伦理纳入设计”的状态、顺序、故障与证据链；缺项会让数据血缘、视图重建、约束验证、审计日志与隐私影响评估无法复现。",
    tags: ["DDIA", "第1版", "第12章 数据系统的未来"],
  },
  {
    id: "ddi-12-future-data-systems-q2",
    chapter: "ddi-12-future-data-systems",
    level: 1,
    question: "“第12章 数据系统的未来”的最小运行不变量是什么？",
    answer:
      "权威输入、派生关系和约束可追踪可重建，系统及时且完整，用户风险有责任边界；需要正常历史、压力、故障与独立对账共同证明。",
    tags: ["DDIA", "第1版", "第12章 数据系统的未来"],
  },
  {
    id: "ddi-12-future-data-systems-q3",
    chapter: "ddi-12-future-data-systems",
    level: 2,
    question: "怎样为“第12章 数据系统的未来”构造最小反例？",
    answer:
      "把“堆叠工具却没有权威源和恢复路径，以低延迟替代正确性，把预测能力当采集许可”写成假设，只改变一个故障条件再检查结果。",
    tags: ["DDIA", "第1版", "第12章 数据系统的未来"],
  },
  {
    id: "ddi-12-future-data-systems-q4",
    chapter: "ddi-12-future-data-systems",
    level: 2,
    question: "“第12章 数据系统的未来”为什么必须先写预测？",
    answer:
      "预测固定用户结果、状态和失败终点，防止观察后反向编造“以数据流组合专用工具，并把端到端正确性、验证、隐私和伦理纳入设计”的解释。",
    tags: ["DDIA", "第1版", "第12章 数据系统的未来"],
  },
  {
    id: "ddi-12-future-data-systems-q5",
    chapter: "ddi-12-future-data-systems",
    level: 3,
    question: "如何验证“第12章 数据系统的未来”的性能与语义？",
    answer:
      "固定输入，测分位延迟、吞吐、错误和资源，并独立证明“权威输入、派生关系和约束可追踪可重建，系统及时且完整，用户风险有责任边界”。",
    tags: ["DDIA", "第1版", "第12章 数据系统的未来"],
  },
  {
    id: "ddi-12-future-data-systems-q6",
    chapter: "ddi-12-future-data-systems",
    level: 3,
    question: "“第12章 数据系统的未来”独立交接需要哪些材料？",
    answer:
      "需要版本目录、契约、数据血缘、视图重建、约束验证、审计日志与隐私影响评估、故障历史、对账、停止、恢复和回退。",
    tags: ["DDIA", "第1版", "第12章 数据系统的未来"],
  },
  {
    id: "ddi-glossary-q1",
    chapter: "ddi-glossary",
    level: 1,
    question: "为什么“术语表”必须覆盖30个页面节点？",
    answer:
      "节点组成“把跨12章术语绑定到可观察语义、失败边界和相邻概念，形成设计评审共同语言”的状态、顺序、故障与证据链；缺项会让30项术语卡、概念依赖图、保证对照表与评审记录无法复现。",
    tags: ["DDIA", "第1版", "术语表"],
  },
  {
    id: "ddi-glossary-q2",
    chapter: "ddi-glossary",
    level: 1,
    question: "“术语表”的最小运行不变量是什么？",
    answer:
      "同一术语在架构、代码、监控和演练中含义一致，任何保证都声明范围与反例；需要正常历史、压力、故障与独立对账共同证明。",
    tags: ["DDIA", "第1版", "术语表"],
  },
  {
    id: "ddi-glossary-q3",
    chapter: "ddi-glossary",
    level: 2,
    question: "怎样为“术语表”构造最小反例？",
    answer:
      "把“用最终一致、高可用、恰好一次等标签代替可检验定义”写成假设，只改变一个故障条件再检查结果。",
    tags: ["DDIA", "第1版", "术语表"],
  },
  {
    id: "ddi-glossary-q4",
    chapter: "ddi-glossary",
    level: 2,
    question: "“术语表”为什么必须先写预测？",
    answer:
      "预测固定用户结果、状态和失败终点，防止观察后反向编造“把跨12章术语绑定到可观察语义、失败边界和相邻概念，形成设计评审共同语言”的解释。",
    tags: ["DDIA", "第1版", "术语表"],
  },
  {
    id: "ddi-glossary-q5",
    chapter: "ddi-glossary",
    level: 3,
    question: "如何验证“术语表”的性能与语义？",
    answer:
      "固定输入，测分位延迟、吞吐、错误和资源，并独立证明“同一术语在架构、代码、监控和演练中含义一致，任何保证都声明范围与反例”。",
    tags: ["DDIA", "第1版", "术语表"],
  },
  {
    id: "ddi-glossary-q6",
    chapter: "ddi-glossary",
    level: 3,
    question: "“术语表”独立交接需要哪些材料？",
    answer:
      "需要版本目录、契约、30项术语卡、概念依赖图、保证对照表与评审记录、故障历史、对账、停止、恢复和回退。",
    tags: ["DDIA", "第1版", "术语表"],
  },
  {
    id: "ddi-official-final-review-q1",
    chapter: "ddi-official-final-review",
    level: 1,
    question: "为什么“第1版全书总复习”必须覆盖13个页面节点？",
    answer:
      "节点组成“从用户不变量反向串联12章，完成数据模型、存储、复制、事务和派生视图设计”的状态、顺序、故障与证据链；缺项会让全书架构评审、故障剧本、跨章追踪矩阵、恢复演练和口试无法复现。",
    tags: ["DDIA", "第1版", "第1版全书总复习"],
  },
  {
    id: "ddi-official-final-review-q2",
    chapter: "ddi-official-final-review",
    level: 1,
    question: "“第1版全书总复习”的最小运行不变量是什么？",
    answer:
      "架构结论可追溯到第1版目录节点、明确保证、故障历史、性能数据和独立对账；需要正常历史、压力、故障与独立对账共同证明。",
    tags: ["DDIA", "第1版", "第1版全书总复习"],
  },
  {
    id: "ddi-official-final-review-q3",
    chapter: "ddi-official-final-review",
    level: 2,
    question: "怎样为“第1版全书总复习”构造最小反例？",
    answer:
      "把“用平均分掩盖缺章，以组件在线替代数据正确，以工具清单替代因果证据”写成假设，只改变一个故障条件再检查结果。",
    tags: ["DDIA", "第1版", "第1版全书总复习"],
  },
  {
    id: "ddi-official-final-review-q4",
    chapter: "ddi-official-final-review",
    level: 2,
    question: "“第1版全书总复习”为什么必须先写预测？",
    answer:
      "预测固定用户结果、状态和失败终点，防止观察后反向编造“从用户不变量反向串联12章，完成数据模型、存储、复制、事务和派生视图设计”的解释。",
    tags: ["DDIA", "第1版", "第1版全书总复习"],
  },
  {
    id: "ddi-official-final-review-q5",
    chapter: "ddi-official-final-review",
    level: 3,
    question: "如何验证“第1版全书总复习”的性能与语义？",
    answer:
      "固定输入，测分位延迟、吞吐、错误和资源，并独立证明“架构结论可追溯到第1版目录节点、明确保证、故障历史、性能数据和独立对账”。",
    tags: ["DDIA", "第1版", "第1版全书总复习"],
  },
  {
    id: "ddi-official-final-review-q6",
    chapter: "ddi-official-final-review",
    level: 3,
    question: "“第1版全书总复习”独立交接需要哪些材料？",
    answer:
      "需要版本目录、契约、全书架构评审、故障剧本、跨章追踪矩阵、恢复演练和口试、故障历史、对账、停止、恢复和回退。",
    tags: ["DDIA", "第1版", "第1版全书总复习"],
  },
];
