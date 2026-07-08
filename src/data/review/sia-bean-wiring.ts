import type { ReviewQuestion } from "./types";

export const siaBeanWiringQuestions: ReviewQuestion[] = [
  {
    id: "sia-bw-1",
    chapter: "sia-bean-wiring",
    level: 2,
    question: "三种 Bean 装配方式各有什么优劣？分别适用于什么场景？",
    answer:
      "①自动装配（@Component + @Autowired）：最简洁，Spring Boot 默认方式，适合自己开发的类——加注解即可，组件扫描自动发现。优点零配置；局限是无法装配无法修改源码的第三方类。②Java配置（@Configuration + @Bean）：类型安全、可重构、IDE 友好，适合装配第三方库的类（如 HikariDataSource 无法加 @Component）。可精确控制实例化逻辑。③XML配置：冗长、不类型安全、无编译期检查，仅用于遗留项目兼容。现代 Spring 项目应优先自动装配，第三方类用 Java 配置，避免 XML。",
    tags: ["装配方式", "组件扫描"],
  },
  {
    id: "sia-bw-2",
    chapter: "sia-bean-wiring",
    level: 3,
    question: "@Autowired 按类型注入遇到多个候选时怎么办？",
    answer:
      "三种解法：①@Qualifier(\"beanName\")——在注入点指定具体 Bean 名称，最精确最常用；②@Primary——在某个实现类上标记为「首选」，多候选时容器自动选它，适合有一个明确默认实现的场景；③@Resource(name=\"beanName\")——JSR-250 注解，按名称注入。实践中优先 @Qualifier（精确控制每个注入点），@Primary 用于全局默认（如主数据源）。注意 @Autowired 默认 required=true，找不到候选会报错；@Autowired(required=false) 允许不注入。默认 Bean 名 = 类名首字母小写。",
    tags: ["自动装配", "歧义消除"],
  },
  {
    id: "sia-bw-3",
    chapter: "sia-bean-wiring",
    level: 3,
    question: "为什么单例 Bean 不能有可变实例字段？应该怎么处理有状态场景？",
    answer:
      "单例 Bean 整个容器只有一个实例，被所有请求共享。如果有可变实例字段（如 private List cache），多线程并发访问会共享这个字段，导致数据竞争、脏读、ConcurrentModificationException。处理方式：①单例 Bean 保持无状态——只放 final 依赖和线程安全容器（ConcurrentHashMap、AtomicReference）；②需要独立状态用 prototype 作用域——每次注入新实例；③请求级状态用 request 作用域；④会话级状态用 session 作用域；⑤方法内局部变量天然线程安全（每个线程有独立栈帧）。核心原则：有状态用短作用域，无状态才用 singleton。误判作用域是 Spring 并发 bug 的头号来源。",
    tags: ["作用域", "并发安全"],
  },
  {
    id: "sia-bw-4",
    chapter: "sia-bean-wiring",
    level: 4,
    question: "条件化装配（@Conditional）的原理是什么？Spring Boot 的自动配置如何利用它？",
    answer:
      "@Conditional 让 Bean 按条件注册——实现 Condition 接口的 matches 方法返回 true 才装配 Bean。Spring Boot 在此基础上提供预置条件注解：@ConditionalOnClass（classpath 有指定类）、@ConditionalOnMissingBean（容器没有该类型 Bean）、@ConditionalOnProperty（配置项匹配）、@ConditionalOnBean（容器有指定 Bean）。自动配置原理：@EnableAutoConfiguration 扫描 META-INF/spring/AutoConfiguration.imports 列出的配置类，每个用 @Conditional 判断是否生效。最关键的是 @ConditionalOnMissingBean——保证「用户自定义优先」：只有容器没有自定义实现时才装配默认 Bean，开发者可随时定义自己的 Bean 覆盖默认。这就是「约定优于配置」而非「配置凌驾一切」。",
    tags: ["条件化装配", "自动配置"],
  },
];
