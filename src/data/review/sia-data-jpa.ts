import type { ReviewQuestion } from "./types";

export const siaDataJpaQuestions: ReviewQuestion[] = [
  {
    id: "sia-dj-1",
    chapter: "sia-data-jpa",
    level: 2,
    question: `Spring Data JPA 为什么只写接口就能实现查询？`,
    answer:
      `Spring Data JPA 在运行时为 Repository 接口生成动态代理实现类。机制：①接口继承 JpaRepository，自动获得 save/findById/findAll/delete 等 CRUD 方法（基类 SimpleJpaRepository 已实现）；②自定义方法按命名约定解析——Spring 解析方法名（如 findByEmailAndAge）拆分成关键字，据此动态构造 JPQL 并生成查询；③@Query 注解的方法直接用提供的 JPQL/原生 SQL；④分页排序通过 Pageable 参数自动拼接 LIMIT/OFFSET/ORDER BY。整个过程在应用启动时由 RepositoryFactorySupport 扫描接口、生成代理、注册为 Bean。开发者只定义契约（接口），实现由框架生成——这是「Repository 模式」的极致。`,
    tags: ["Repository", "动态代理"],
  },
  {
    id: "sia-dj-2",
    chapter: "sia-data-jpa",
    level: 3,
    question: `什么是 N+1 查询问题？如何解决？`,
    answer:
      `N+1 问题：查询 N 条主实体（1 次 SQL），再逐条访问其懒加载关联实体（N 次 SQL），共 N+1 次查询。例如查 100 个订单再循环访问 order.getUser().getName()，产生 1+100=101 次 SQL，严重拖慢性能。三种解法：①JOIN FETCH——在 JPQL 中 JOIN FETCH o.user 一次性联表查出关联，1 次 SQL 搞定；②@EntityGraph——@EntityGraph(attributePaths={\"user\"}) 声明关联预加载，框架自动生成 JOIN；③DTO 投影——只 SELECT 需要的字段构造 DTO，避免加载整个关联实体。根本建议：列表查询场景优先 DTO 投影（只取必要字段），详情查询用 JOIN FETCH。同时警惕懒加载在事务外访问会抛 LazyInitializationException。`,
    tags: ["N+1问题", "懒加载"],
  },
  {
    id: "sia-dj-3",
    chapter: "sia-data-jpa",
    level: 3,
    question: `JPA 实体的四种状态是什么？脏检查如何工作？`,
    answer:
      `四种状态：①新建（new/transient）——new 创建未持久化，不在持久化上下文；②持久（managed）——被 EntityManager 管理，处于事务中，修改自动同步数据库；③游离（detached）——曾持久化但脱离了 EntityManager（事务提交后），修改不自动同步；④删除（removed）——标记删除，提交时执行 DELETE。脏检查：持久态对象被加载时 JPA 保存一份快照；事务提交时 JPA 逐个对比当前值与快照，发现变化就自动生成 UPDATE——所以持久态对象修改后不需要显式调用 save()。注意游离态修改后不自动同步需 merge()；save() 对新建实体执行 INSERT，对游离实体执行 merge+UPDATE。`,
    tags: ["实体状态", "脏检查"],
  },
  {
    id: "sia-dj-4",
    chapter: "sia-data-jpa",
    level: 4,
    question: `Spring Data JPA 的三种查询定义方式各适用于什么场景？`,
    answer:
      `①方法名派生查询（findByXxxAndYyyOrderByZzz）——适合简单查询，零 SQL，Spring 自动解析方法名为 JPQL。优点简洁，局限是方法名过长时可读性差且无法表达复杂逻辑（如子查询、聚合）。②@Query 自定义 JPQL/原生 SQL——适合复杂查询（联表、子查询、聚合）。@Query(\"SELECT o FROM Order o WHERE...\")，nativeQuery=true 用原生 SQL。优点灵活强大，缺点是 SQL 写死在注解中。③Specification（Criteria API）——适合运行时动态拼接查询条件（如多条件搜索框）。实现 Specification 接口用 Criteria 动态构建谓词，可与 JpaSpecificationExecutor 配合。缺点是代码冗长。选型：简单用方法名派生，复杂固定用 @Query，动态条件用 Specification。实践中方法名派生覆盖 70% 场景。`,
    tags: ["查询方式", "选型"],
  },
];
