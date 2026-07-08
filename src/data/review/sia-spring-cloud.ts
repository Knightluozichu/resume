import type { ReviewQuestion } from "./types";

export const siaSpringCloudQuestions: ReviewQuestion[] = [
  {
    id: "sia-cl-1",
    chapter: "sia-spring-cloud",
    level: 2,
    question: "服务注册中心解决什么问题？它是如何工作的？",
    answer:
      "注册中心解决「服务实例动态增减时的互相发现问题」。机制：①每个微服务启动时向注册中心注册自己的地址（IP:端口）和服务名；②注册中心维护「服务名 → 实例列表」的映射，并用心跳检测实例存活（超时未心跳则剔除）；③调用方从注册中心拉取（或订阅推送）目标服务的实例列表，选一个发起调用。解决了硬编码地址的问题——实例扩容/缩容/迁移时自动感知，不用改配置。常见实现：Eureka（AP，最终一致）、Nacos（AP/CP可切换）、Consul。注意：注册中心通常集群部署保证高可用，客户端缓存实例列表防止注册中心宕机导致无法发现。",
    tags: ["服务注册", "Eureka"],
  },
  {
    id: "sia-cl-2",
    chapter: "sia-spring-cloud",
    level: 3,
    question: "熔断器的三态状态机是什么？它如何防止雪崩？",
    answer:
      "三态：①CLOSED（关闭）——正常状态，请求放行到下游，同时统计失败率；②OPEN（打开）——失败率超阈值时触发，请求直接快速失败（不调下游），返回降级响应——保护下游不被持续冲击；③HALF_OPEN（半开）——OPEN 等待超时后进入，放行少量探测请求：成功则转 CLOSED 恢复正常，失败则转 OPEN 继续熔断。防雪崩原理：下游故障时，调用方不无限重试（重试会放大流量导致级联崩溃），而是快速失败降级——下游得到恢复时间，上游线程不因等待而耗尽。熔断器保护的是「系统整体」而非单次调用——宁可部分功能降级，不要全盘崩溃。配置：failure-rate-threshold（失败率阈值）、wait-duration-in-open-state（打开持续时间）、sliding-window-size（统计窗口）。",
    tags: ["熔断器", "防雪崩"],
  },
  {
    id: "sia-cl-3",
    chapter: "sia-spring-cloud",
    level: 3,
    question: "OpenFeign 如何简化微服务间调用？",
    answer:
      "OpenFeign 是声明式 HTTP 客户端——只定义接口（像调本地方法），框架自动生成实现。机制：①@FeignClient(name=\"user-service\") 声明接口为远程调用代理，name 指向注册中心的服务名；②接口方法用 @GetMapping/@PostMapping 声明 HTTP 路径和参数；③运行时 Feign 创建动态代理，调用方法时自动：从注册中心发现 user-service 实例 → LoadBalancer 负载均衡选一个 → 构建 HTTP 请求 → 发送 → 反序列化响应。开发者不写 RestTemplate/HttpClient 代码，像调本地方法一样调远程。额外能力：①fallback 降级——服务故障时返回默认值；②与熔断器集成；③请求拦截器（加鉴权头）；④日志级别配置。大幅减少样板代码，是微服务间调用的首选。",
    tags: ["OpenFeign", "声明式调用"],
  },
  {
    id: "sia-cl-4",
    chapter: "sia-spring-cloud",
    level: 4,
    question: "微服务架构相比单体架构有哪些优势和代价？Spring Cloud 如何应对这些代价？",
    answer:
      "优势：①独立部署——改一个服务不影响其他，部署快；②独立扩容——按需扩容热点服务而非整体；③技术栈自由——每个服务可选最合适的技术；④故障隔离——一个服务崩溃不拖垮整体。代价与应对：①服务互相发现难——注册中心（Eureka/Nacos）解决；②请求需统一入口和鉴权——API网关（Spring Cloud Gateway）解决；③远程调用样板代码多——OpenFeign 声明式调用解决；④故障级联扩散——熔断器（Resilience4j）快速失败降级；⑤配置分散难管理——配置中心（Config/Nacos）集中管理+动态刷新；⑥调用链跨服务难排查——分布式链路追踪（Sleuth+Zipkin）用 traceId 串联；⑦分布式事务复杂——最终一致性方案（Saga/消息）。Spring Cloud 全家桶覆盖了微服务治理的完整需求。",
    tags: ["微服务架构", "Spring Cloud"],
  },
];
