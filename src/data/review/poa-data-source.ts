import type { ReviewQuestion } from "./types";

export const poaDataSourceQuestions: ReviewQuestion[] = [
  {
    id: "poa-data-source-01",
    chapter: "poa-data-source",
    level: 1,
    question: `表数据入口和行数据入口的区别是什么？`,
    answer: `表数据入口（Table Data Gateway）：一个对象充当整张数据库表的网关，提供 findAll/findById/insert/update/delete 等方法，返回 Record Set 供上层使用，对象本身不对应单行记录。行数据入口（Row Data Gateway）：每行数据库记录对应一个对象实例，对象只含数据加持久化方法（update/delete 操作自身行），无业务逻辑。表数据入口是表级网关，行数据入口是行级代理，后者粒度更细。`,
    tags: ["表数据入口", "行数据入口", "数据源模式"],
  },
  {
    id: "poa-data-source-02",
    chapter: "poa-data-source",
    level: 2,
    question: `活动记录模式和数据映射器模式的核心区别是什么？`,
    answer: `核心区别在于领域对象是否知道持久化：① 活动记录——领域对象同时承载数据、业务行为和持久化方法（save/delete 操作自身），对象直接调用数据库 API，简单但领域逻辑与数据库耦合。② 数据映射器——独立的映射器对象负责持久化，领域对象完全不知道数据库的存在，最高解耦但最复杂。活动记录适合中等复杂度的单表逻辑（如 Rails ActiveRecord），数据映射器适合复杂领域模型（如 Hibernate/TypeORM 的核心思想）。`,
    tags: ["活动记录", "数据映射器", "解耦程度"],
  },
  {
    id: "poa-data-source-03",
    chapter: "poa-data-source",
    level: 2,
    question: `四种数据源架构模式的解耦程度如何递进？分别适合配合哪种领域逻辑模式？`,
    answer: `解耦程度递进：表数据入口（表级网关）→ 行数据入口（行级代理）→ 活动记录（+ 领域逻辑）→ 数据映射器（完全解耦）。配合关系：① 事务脚本 + 表数据入口——简单系统，过程直接调用网关方法；② 表模块 + 表数据入口——中等复杂，模块基于 Record Set 操作；③ 活动记录——中等复杂度单表逻辑，对象自带持久化；④ 领域模型 + 数据映射器——复杂领域，映射器独立于领域对象存在。从表入口到数据映射器，领域逻辑与数据库逐步解耦。`,
    tags: ["解耦递进", "模式配合", "架构选择"],
  },
  {
    id: "poa-data-source-04",
    chapter: "poa-data-source",
    level: 3,
    question: `在一个使用领域模型的内容管理系统中，为什么应该选择数据映射器而非活动记录？`,
    answer: `选择数据映射器的理由：① 领域对象纯净——CMS 的 Article、Comment、User 对象只需关注业务规则（权限校验、内容验证、评论树构建），不应被 save()/delete() 等持久化方法污染；② 多表映射——一个 Article 领域对象可能映射到 articles 表 + article_tags 关联表 + article_meta 元数据表，活动记录难以处理跨表映射，数据映射器可以封装复杂映射逻辑；③ 可测试性——领域对象不依赖数据库，可以纯内存测试；④ 可替换数据源——将来可能从 MySQL 迁移到 MongoDB，只需替换映射器，领域对象不变。代价：需要编写映射器类和元数据配置，初始成本较高，但长期维护收益大。活动记录虽然简单，但在复杂领域模型中会导致对象职责混乱，领域逻辑被持久化代码侵入。`,
    tags: ["数据映射器", "内容管理", "实践应用"],
  },
];
