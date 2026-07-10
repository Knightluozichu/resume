import type { ReviewQuestion } from "./types";

export const poaLayeredArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "poa-layered-architecture-01",
    chapter: "poa-layered-architecture",
    level: 1,
    question: `企业应用的三个主要分层是什么？各层职责是什么？`,
    answer: `三个主要分层：① 表现层（Presentation）——处理用户界面、控制器、视图渲染，负责与用户交互；② 领域层（Domain）——承载业务逻辑、领域模型和业务规则，是系统核心；③ 数据源层（Data Source）——管理数据库交互、消息系统和事务处理，负责持久化。层间只通过定义良好的接口通信，上层依赖下层，不可反向依赖。`,
    tags: ["分层架构", "三层架构", "关注点分离"],
  },
  {
    id: "poa-layered-architecture-02",
    chapter: "poa-layered-architecture",
    level: 1,
    question: `分层架构的主要优势有哪些？`,
    answer: `分层架构的四大优势：① 关注点分离——各层独立演化，互不干扰；② 可替换性——替换某一层（如换数据库）不影响其他层；③ 可测试性——逐层独立测试，领域层不依赖 UI 和 DB 即可测试；④ 标准化——层间接口清晰，团队协作分工明确。代价是层间通信的性能开销和额外的抽象复杂度。`,
    tags: ["分层优势", "可替换性", "可测试性"],
  },
  {
    id: "poa-layered-architecture-03",
    chapter: "poa-layered-architecture",
    level: 2,
    question: `三种领域逻辑模式分别适合什么场景？如何选择？`,
    answer: `选择依据是业务逻辑复杂度：① 事务脚本——每个业务过程对应一个方法，简单直接，适合简单逻辑的 CRUD 系统；② 表模块——以数据库表为单位组织逻辑，每个表对应一个模块类，适合中等复杂度且与表结构紧密对齐的系统；③ 领域模型——对象同时持有数据和行为，业务规则封装在对象内部，适合复杂领域逻辑。复杂领域可在领域模型之上加服务层封装用例，对外提供粗粒度 API。`,
    tags: ["领域逻辑模式", "模式选择", "复杂度"],
  },
  {
    id: "poa-layered-architecture-04",
    chapter: "poa-layered-architecture",
    level: 3,
    question: `在一个电商系统中，如何设计分层架构？请说明各层包含哪些组件。`,
    answer: `电商系统分层设计：① 表现层——REST API 控制器（OrderController）、GraphQL Resolvers、页面控制器，处理 HTTP 请求/响应、输入验证、格式转换；② 领域层——领域模型（Order、Product、Customer 对象含业务逻辑）、服务层（OrderService 封装下单、支付、退款用例）、领域规则（库存检查、价格计算、折扣策略）；③ 数据源层——数据映射器（OrderMapper、ProductMapper 负责对象-表映射）、网关（PaymentGateway 对接外部支付）、消息发布器（EventPublisher 发送领域事件）。层间通过接口通信：控制器调用服务层，服务层操作领域模型，数据映射器负责持久化。关键：领域层不依赖表现层和数据源层的实现细节。`,
    tags: ["架构设计", "电商系统", "实践应用"],
  },
];
