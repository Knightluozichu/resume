import type { ReviewQuestion } from "./types";

export const siaFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "sia-fr-1",
    chapter: "sia-final-review",
    level: 3,
    question: "用一个电商下单请求串联全书八大主题，说明每个知识点的作用。",
    answer:
      "下单请求 POST /api/orders 的完整旅程：①Spring Boot（第7章）——order-service 用 @SpringBootApplication 自动配置 DispatcherServlet、内嵌 Tomcat、HikariCP 数据源，@EnableDiscoveryClient 注册到注册中心；②API网关（第8章）——Spring Cloud Gateway 路由请求到 order-service，前置鉴权和限流；③Spring MVC（第4章）——DispatcherServlet 调度到 @PostMapping(\"/orders\")，@RequestBody 反序列化 JSON，@Valid 校验参数；④IoC容器（第1章）——OrderService 由容器管理，构造器注入 OrderRepo 和 UserClient 依赖；⑤Spring Security（第6章）——@PreAuthorize(\"hasRole('USER')\") 校验用户已认证且有权限；⑥AOP（第3章）——@Transactional 声明式事务，AOP 织入开启/提交/回滚逻辑；⑦OpenFeign（第8章）——userClient.getById() 声明式远程调用 user-service，负载均衡+熔断降级；⑧Spring Data JPA（第5章）——orderRepo.save() 持久化，脏检查在事务提交时自动 INSERT。一次请求，八大知识点全部参与。",
    tags: ["知识串联", "全栈"],
  },
  {
    id: "sia-fr-2",
    chapter: "sia-final-review",
    level: 3,
    question: "Spring 技术栈的四个递进阶段是什么？为什么是这个顺序？",
    answer:
      "四阶段：①核心与装配（IoC+Bean装配）——解决对象怎么创建和连接，是所有功能的地基，没有容器就没有 Bean；②Web与切面（AOP+MVC）——在容器之上处理 HTTP 请求流转和横切关注点分离，AOP 依赖容器代理织入，MVC 依赖容器管理控制器 Bean；③数据与安全（JPA+Security）——生产级应用的标配，数据持久化和访问控制，建立在 Web 层之上（请求经过安全过滤链到达控制器，控制器调用 Repository）；④云原生（Boot+Cloud）——工程化与分布式治理，Boot 把前三层自动化，Cloud 把多个应用组成分布式系统。顺序由依赖决定：没有容器就没有 Bean（阶段一），没有容器和 Bean 就没有 AOP 代理和 MVC 控制器（阶段二），没有 Web 层就无需数据持久化和安全控制（阶段三），没有单个应用就谈不上微服务治理（阶段四）。",
    tags: ["架构", "递进阶段"],
  },
  {
    id: "sia-fr-3",
    chapter: "sia-final-review",
    level: 4,
    question: "盘点全书七个常见误区，每个给出正确实践。",
    answer:
      "①注解崇拜——会写 @Autowired 不等于懂 IoC，要理解控制反转为何松耦合；②单例有状态——单例 Bean 默共享实例，放可变字段导致并发数据竞争，正确实践是单例无状态（只放 final 依赖和线程安全容器）；③内部自调用——this.xxx() 指向原始对象不经过代理，@Transactional 失效，正确实践是注入自身代理 self.xxx() 或重构拆分；④懒加载 N+1——循环访问懒加载关联触发 N 次查询，正确实践用 JOIN FETCH 或 @EntityGraph 一次联表查出；⑤密码明文/MD5——快哈希可暴力破解，正确实践用 BCrypt 慢哈希（自适应成本+内置盐）；⑥雪崩重试——下游故障时无限重试放大流量级联崩溃，正确实践用熔断器三态状态机快速失败降级；⑦敏感配置进代码——数据库密码写 application.yml 进 git 即泄露，正确实践用环境变量注入+profile 隔离。",
    tags: ["误区", "最佳实践"],
  },
  {
    id: "sia-fr-4",
    chapter: "sia-final-review",
    level: 4,
    question: "在技术选型上，Spring 全栈各层有哪些推荐选择和应避免的选择？",
    answer:
      "注入方式：构造器注入（推荐）> setter注入（可选依赖）> 字段注入（不推荐）。装配方式：自动装配（推荐）> Java配置（第三方类）> XML配置（遗留）。查询方式：方法名派生（简单查询）> @Query JPQL（复杂查询）> Specification（动态条件）。密码存储：BCrypt（推荐）> Argon2（更强）>> MD5（禁用）>>> 明文（灾难）。配置注入：@ConfigurationProperties（推荐，类型安全批量绑定）> @Value（散落难维护）。服务调用：OpenFeign（声明式推荐）> RestTemplate（手动）> 直接HTTP（不推荐）。熔断器：Resilience4j（推荐）> Hystrix（已停止维护）。注册中心：Nacos（推荐，配置中心一体）> Eureka（简单）/ Consul。事务回滚：rollbackFor=Exception.class（推荐，覆盖受检异常）> 默认（只回滚 RuntimeException）。选型原则：优先框架推荐的现代方案，避免遗留和已知有坑的选择。",
    tags: ["技术选型", "对比"],
  },
];
