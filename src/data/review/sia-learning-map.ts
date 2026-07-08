import type { ReviewQuestion } from "./types";

export const siaLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "sia-lm-1",
    chapter: "sia-learning-map",
    level: 2,
    question: "《Spring in Action》全书的章节结构和递进逻辑是什么？",
    answer:
      "全书分为十个章节（含学习地图和复习），覆盖 Spring 的八大主题：①Spring核心与IoC——容器、Bean生命周期、依赖注入、控制反转实现松耦合；②Bean装配——自动装配、Java配置、XML配置、组件扫描、作用域；③面向切面编程——切面、切点、通知、织入、横切关注点分离；④Spring MVC——DispatcherServlet请求流程、控制器、RESTful设计；⑤数据访问与JPA——Repository接口、实体映射、方法名派生查询；⑥Spring Security——过滤链、认证、授权、密码编码；⑦Spring Boot——自动配置、起步依赖、内嵌服务器、外部化配置；⑧Spring Cloud微服务——服务注册、网关、Feign、熔断、配置中心。递进逻辑：先解决对象怎么创建和装配（IoC和Bean装配是地基），再处理请求流转和切面分离（MVC和AOP），然后持久化和安全（数据访问和Security），最后工程化和分布式（Boot和Cloud）。",
    tags: ["架构", "学习路径"],
  },
  {
    id: "sia-lm-2",
    chapter: "sia-learning-map",
    level: 2,
    question: "Spring 的核心理念是什么？控制反转（IoC）如何实现松耦合？",
    answer:
      "核心理念是控制反转（IoC）——把对象创建和依赖管理的权力从业务代码「反转」给容器。传统方式中对象自己 new 依赖，导致紧耦合（换实现就要改源码）。IoC 让对象只声明需要什么（@Autowired），容器负责创建和注入依赖。实现松耦合的机制：对象依赖接口而非具体实现，容器在运行时注入具体实现——生产注入真实实现，测试注入 mock，源码不动。这就是「面向接口编程」的落地。IoC 是思想，DI（依赖注入）是其实现方式。",
    tags: ["核心理念", "IoC"],
  },
  {
    id: "sia-lm-3",
    chapter: "sia-learning-map",
    level: 3,
    question: "用一条主线串联《Spring in Action》全书八大主题，说明它们之间的依赖关系。",
    answer:
      "主线：一个电商订单系统的设计与实现。①核心IoC——OrderService 由容器管理，依赖通过构造器注入；②Bean装配——@SpringBootApplication 启动组件扫描，@Service/@Repository 自动注册为 Bean；③AOP——@Transactional 声明式事务，AOP 织入开启/提交/回滚逻辑；④MVC——OrderController 用 @PostMapping 接收请求，DispatcherServlet 调度；⑤数据访问——OrderRepo extends JpaRepository，方法名派生查询零 SQL；⑥安全——@PreAuthorize 控制只有登录用户能下单，BCrypt 存密码；⑦Boot——starter-web 一个依赖搞定 MVC+Tomcat；⑧Cloud——@FeignClient 声明式调用 user-service，熔断器防级联。依赖关系：前两章是容器地基，3-4章在容器之上处理 Web 和切面，5-6章是生产标配，7-8章是工程化和分布式——前面的设计决策直接影响后面的实现。",
    tags: ["架构", "知识串联"],
  },
  {
    id: "sia-lm-4",
    chapter: "sia-learning-map",
    level: 4,
    question: "「会用 Spring 注解」和「懂 Spring」的区别是什么？如何判断一个人是否真正理解 Spring？",
    answer:
      "会用注解的人能写出 @Autowired、@RestController 让代码跑起来，但不理解背后原理。真正懂 Spring 的人能解释：为什么 IoC 实现松耦合（对象不自己 new 依赖，由容器注入，依赖可替换）；为什么构造器注入优于字段注入（不可变、可测试、暴露循环依赖）；为什么 AOP 用运行时代理而非编译期织入（Spring 选择 JDK 动态代理/CGLIB，非侵入式）；为什么 Spring Data JPA 只写接口就能查询（运行时动态代理根据方法名生成 JPQL）；为什么 Spring Boot 能自动配置（@ConditionalOnClass 根据类路径条件化装配）。判断标志：能否解释「Spring 为什么这样设计」而非只是「能跑起来」。把 Spring 当黑盒的人遇到 Bean 注入失败只会删注解重试；懂 Spring 的人会检查组件扫描路径、作用域、条件装配。",
    tags: ["核心理念", "最佳实践"],
  },
];
