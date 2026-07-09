import type { ReviewQuestion } from "./types";

export const ddiFoundationsQuestions: ReviewQuestion[] = [
  {
    id: "ddi-fn-1",
    chapter: "ddi-foundations",
    level: 2,
    question: "数据系统的三大设计目标是什么？各自需要关注哪些问题？",
    answer: "三大目标：①可靠性（Reliability）——系统在故障（硬件故障/软件错误/人为失误）情况下仍能持续正确运行，通过容错机制实现；②可扩展性（Scalability）——系统在负载增长时仍能保持良好性能，需要描述负载参数（如QPS/读写比）和量化性能指标（吞吐量/延迟），关键是延迟的百分位值（p95/p99）；③可维护性（Maintainability）——系统可运维（运维友好）、简洁（降低复杂度）、可演化（易于修改），核心是「为未来维护系统的人（包括自己）而设计」。",
    tags: ["可靠性", "可扩展性", "可维护性", "设计目标"],
  },
  {
    id: "ddi-fn-2",
    chapter: "ddi-foundations",
    level: 2,
    question: "LSM-Tree和B-Tree两种存储引擎的核心区别是什么？各自适合什么场景？",
    answer: "LSM-Tree（日志合并树）：写入时追加到内存表，满了刷盘为SSTable，后台合并压缩。写优化——顺序写入速度快；但读需查多层，可能放大。适合写密集场景。B-Tree：固定大小的页组成的树，写时原地更新页。读优化——每条记录有确定位置，读路径短；但写需随机IO和WAL。适合读密集场景。关键区别：LSM-Tree追加写+后台合并（写优化），B-Tree原地更新+页面管理（读优化）。两者都用了WAL保证崩溃恢复，但数据组织方式根本不同。",
    tags: ["LSM-Tree", "B-Tree", "存储引擎", "写优化", "读优化"],
  },
  {
    id: "ddi-fn-3",
    chapter: "ddi-foundations",
    level: 2,
    question: "关系模型、文档模型和图模型各自适合什么场景？它们的关键区别是什么？",
    answer: "关系模型：数据组织为表（行+列），用SQL查询，Schema在写时强制。适合结构化数据、复杂查询、多表关联场景（如银行交易）。文档模型：数据组织为文档（JSON/XML），Schema可选（读时模式），适合数据结构自包含、一对多关系天然嵌套的场景（如CMS、用户画像）。图模型：数据组织为顶点和边，适合多对多关系密集、需要图遍历的场景（如社交网络、知识图谱）。关键区别在于数据的关系结构：一对多用文档，多对多用图，混合用关系。",
    tags: ["关系模型", "文档模型", "图模型", "数据模型", "Schema"],
  },
  {
    id: "ddi-fn-4",
    chapter: "ddi-foundations",
    level: 2,
    question: "向前兼容和向后兼容分别是什么？为什么数据演化需要两者兼顾？",
    answer: "向前兼容（Forward Compatibility）：新代码能读旧数据——旧版本写入的数据格式，新版本仍能正确解析。向后兼容（Backward Compatibility）：旧代码能读新数据——新版本写入的数据格式，旧版本仍能正确解析（忽略不认识的字段）。两者兼顾的原因：系统升级通常是滚动升级（非原子切换），新旧版本代码会同时运行。向前兼容让新代码能处理旧节点产生的数据，向后兼容让旧代码能处理新节点产生的数据。常见编码格式：JSON/XML灵活但冗余且类型弱；Thift/Protobuf/Avro有schema、紧凑、支持演化，Avro尤其适合Schema频繁变化的场景。",
    tags: ["向前兼容", "向后兼容", "编码演化", "滚动升级", "Protobuf"],
  },
];
