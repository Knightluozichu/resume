import type { ReviewQuestion } from "./types";

export const siaSpringBootQuestions: ReviewQuestion[] = [
  {
    id: "sia-sb-1",
    chapter: "sia-spring-boot",
    level: 2,
    question: `Spring Boot 的自动配置是如何工作的？@ConditionalOnMissingBean 为什么重要？`,
    answer:
      `自动配置原理：①@EnableAutoConfiguration 扫描 META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports 列出的配置类；②每个配置类用 @Conditional 及其派生注解（@ConditionalOnClass/@ConditionalOnBean/@ConditionalOnProperty）判断是否生效——classpath 有对应依赖且满足条件才装配 Bean；③例如有 MySQL 驱动+配置了数据源 URL，DataSourceAutoConfiguration 才装配 DataSource Bean。@ConditionalOnMissingBean 极其重要：它保证「用户自定义优先」——只有容器中没有该类型 Bean 时自动配置才创建默认实现。开发者可随时定义自己的 Bean 覆盖默认行为，这就是「约定优于配置」而非「配置凌驾一切」——框架给合理默认值，但开发者随时可覆盖。调试时加 --debug 可看 ConditionEvaluationReport。`,
    tags: ["自动配置", "Conditional"],
  },
  {
    id: "sia-sb-2",
    chapter: "sia-spring-boot",
    level: 3,
    question: `起步依赖（starter）解决了什么问题？`,
    answer:
      `起步依赖解决依赖管理的三大痛点：①版本协调——一个 starter 包含一组经过兼容性测试的依赖，版本由 spring-boot-starter-parent 统一管理，开发者无需手动指定 version，避免版本冲突；②依赖聚合——spring-boot-starter-web 一个依赖自动引入 spring-webmvc + tomcat + jackson + validation，不用逐个查找添加；③传递依赖优化——starter 只引入「启动」所需的最小依赖集。命名约定：官方 starter 为 spring-boot-starter-{name}，第三方为 {name}-spring-boot-starter。实践建议：用 starter 而非手动加单个依赖，让 Spring Boot 管理版本协调。常用：starter-web（MVC+Tomcat）、starter-data-jpa（JPA+Hibernate）、starter-security、starter-actuator（监控）、starter-test。`,
    tags: ["起步依赖", "依赖管理"],
  },
  {
    id: "sia-sb-3",
    chapter: "sia-spring-boot",
    level: 3,
    question: `外部化配置的优先级是什么？生产环境敏感配置应该怎么处理？`,
    answer:
      `优先级从高到低：①命令行参数（--server.port=9090）；②环境变量（SERVER_PORT=9090）；③application-{profile}.yml（按 profile 激活）；④application.yml（默认）；⑤默认值（Spring Boot 内置）。高优先级覆盖低优先级，同一 key 以最高优先级为准。生产敏感配置处理：①绝不进代码仓库——数据库密码、API Key、JWT 密钥等敏感信息不放 application.yml，用环境变量注入（\${DB_PASSWORD}）；②多环境用 profile——application-prod.yml 覆盖生产配置，用 spring.profiles.active=prod 激活；③容器化部署——Docker/K8s 通过环境变量或 Secret 注入；④类型安全绑定——用 @ConfigurationProperties 批量绑定而非散落 @Value；⑤ddl-auto 生产用 validate。`,
    tags: ["外部化配置", "优先级"],
  },
  {
    id: "sia-sb-4",
    chapter: "sia-spring-boot",
    level: 4,
    question: `Spring Boot「约定优于配置」体现在哪些方面？开发者如何覆盖默认约定？`,
    answer:
      `约定优于配置体现在：①自动配置——classpath 有什么依赖就自动装配什么 Bean（有 MySQL 驱动就配 DataSource、有 Tomcat 就配内嵌服务器）；②合理默认值——server.port 默认 8080、datasource 默认 HikariCP、日志默认 INFO 控制台输出；③起步依赖——一个 starter 搞定一组协调版本依赖；④内嵌服务器——java -jar 直接运行无需部署 WAR。覆盖方式：①自定义 Bean 覆盖自动配置——@ConditionalOnMissingBean 保证自定义优先，定义自己的 DataSource Bean 就覆盖默认；②application.yml 修改默认值——server.port=9090；③@Conditional 排除——@SpringBootApplication(exclude=DataSourceAutoConfiguration.class) 排除不需要的自动配置；④环境变量/命令行参数覆盖配置；⑤profile 隔离多环境。核心理念：框架给合理默认，但绝不强制——开发者随时可覆盖。`,
    tags: ["约定优于配置", "覆盖默认"],
  },
];
