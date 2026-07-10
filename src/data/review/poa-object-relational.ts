import type { ReviewQuestion } from "./types";

export const poaObjectRelationalQuestions: ReviewQuestion[] = [
  {
    id: "poa-object-relational-01",
    chapter: "poa-object-relational",
    level: 1,
    question: "什么是元数据映射？为什么它是 ORM 框架的核心？",
    answer: "元数据映射（Metadata Mapping）：用元数据（配置文件或注解）描述领域对象与数据库表之间的对应关系——哪个类映射哪张表、哪个属性映射哪列、引用关系如何映射外键等。映射器基于这些元数据自动完成对象的 CRUD 操作。它是 ORM 框架的核心，因为：① 消除手写 SQL——映射器根据元数据自动生成 SQL；② 集中管理映射规则——修改映射只需改元数据，不改代码；③ 支持多数据库——同一套元数据可翻译为不同数据库方言。",
    tags: ["元数据映射", "ORM 核心", "映射机制"],
  },
  {
    id: "poa-object-relational-02",
    chapter: "poa-object-relational",
    level: 2,
    question: "标识映射和工作单元分别解决什么问题？它们如何协同？",
    answer: "标识映射（Identity Map）：在一个工作范围内（如一次请求/事务），确保每个数据库行只加载为一个对象实例，避免同一记录被多次查询产生不一致的对象。工作单元（Unit of Work）：维护一次业务操作中所有被修改的对象变更列表，在 commit 时统一将变更同步到数据库，保证事务一致性。协同方式：标识映射防止重复加载，工作单元跟踪所有变更——查询时先查标识映射，命中则复用；修改对象时工作单元记录变更；提交时工作单元遍历变更列表统一执行 SQL。两者共同保证了「一个事务内一个对象一份变更」的 ORM 基本契约。",
    tags: ["标识映射", "工作单元", "ORM 协同"],
  },
  {
    id: "poa-object-relational-03",
    chapter: "poa-object-relational",
    level: 2,
    question: "延迟加载有哪几种实现方式？各自的原理是什么？",
    answer: "延迟加载（Lazy Load）四种方式：① 虚代理（Lazy Initialization）——字段首次被访问时才从数据库加载，用 getter 方法检查是否已加载，未加载则触发查询；② 值占位符（Value Holder）——用一个包装对象代替实际值，首次访问时通过占位符触发加载；③ 重写（Virtual Proxy）——子类化目标对象，在子类中实现延迟加载逻辑，首次访问方法时加载真实数据并委托；④ 查询对象延迟——利用查询对象在真正迭代结果时才执行 SQL。延迟加载的好处是减少不必要的数据传输，缺点是可能产生 N+1 查询问题，需要配合批量加载策略。",
    tags: ["延迟加载", "虚代理", "性能优化"],
  },
  {
    id: "poa-object-relational-04",
    chapter: "poa-object-relational",
    level: 3,
    question: "资源库模式如何抽象数据访问？它与数据映射器有什么关系？",
    answer: "资源库（Repository）模式：将数据访问抽象为类似集合的接口，上层代码通过 add/remove/findByCriteria 等方法操作领域对象，仿佛操作内存集合，不感知底层数据库。与数据映射器的关系：资源库是数据映射器之上更高层的抽象——数据映射器负责具体的对象-表映射和 SQL 执行，资源库封装映射器并向领域层提供面向领域的查询接口。例如 OrderRepository.findByCustomer(customerId) 内部调用 OrderMapper 查询并组装领域对象。资源库的价值：① 领域层只依赖集合接口，不依赖 ORM 细节；② 查询逻辑集中管理，可替换实现（如换为内存缓存）；③ 测试时可注入 Mock Repository。在 DDD 中，资源库是聚合根的持久化入口。",
    tags: ["资源库", "数据映射器", "抽象层次"],
  },
];
