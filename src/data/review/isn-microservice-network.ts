import type { ReviewQuestion } from "./types";

export const isnMicroserviceNetworkQuestions: ReviewQuestion[] = [
  {
    id: "isn-ms-1",
    chapter: "isn-microservice-network",
    level: 1,
    question: "微服务间同步通信和异步通信的区别是什么？",
    answer: "同步通信（HTTP/gRPC）：直接调用等响应，实时反馈但依赖对方可用（B挂了A受影响，需熔断），适合查询/实时交易。异步通信（消息队列）：发完不等响应，解耦削峰、B挂了消息不丢但延迟高，适合日志/通知/削峰。gRPC基于HTTP/2和Protobuf比REST+JSON性能高3-10倍（二进制序列化+多路复用），微服务内部推荐gRPC，对外API推荐REST/HTTP。",
    tags: ["同步通信", "异步通信", "gRPC", "消息队列"],
  },
  {
    id: "isn-ms-2",
    chapter: "isn-microservice-network",
    level: 2,
    question: "服务发现的两种模式是什么？注册中心提供哪些核心能力？",
    answer: "服务发现两种模式：①客户端发现——调用方从注册中心拉实例列表，自己负载均衡选实例直接调用（代表Eureka+Ribbon）②服务端发现——调用方请求代理，代理从注册中心查实例并转发（代表Nginx+Consul）。注册中心核心能力：①服务注册——服务启动时注册自己的地址 ②服务发现——调用方查询目标服务实例列表 ③健康检查——定期检测实例是否存活，剔除故障实例 ④变更通知——实例增减时通知订阅者。常见注册中心：Consul/Eureka/Nacos/etcd。",
    tags: ["服务发现", "注册中心", "客户端发现", "服务端发现"],
  },
  {
    id: "isn-ms-3",
    chapter: "isn-microservice-network",
    level: 3,
    question: "什么是Sidecar模式？它的好处和代价是什么？",
    answer: "Sidecar模式是给每个服务实例旁边部署一个伴生代理进程（如Envoy）。所有进出服务的网络流量先经过Sidecar代理，由Sidecar统一处理负载均衡、熔断、重试、超时、链路追踪等治理逻辑。好处：治理逻辑与业务代码彻底解耦——换编程语言不需要重写治理逻辑，所有语言统一由Sidecar处理。代价：①每个实例多一个进程，内存和CPU开销 ②每次调用多一跳（服务→Sidecar→网络→Sidecar→服务），延迟略增。但对大多数场景，这个代价远小于「治理逻辑内嵌代码」的维护成本。",
    tags: ["Sidecar", "服务网格", "Envoy", "治理解耦"],
  },
  {
    id: "isn-ms-4",
    chapter: "isn-microservice-network",
    level: 4,
    question: "Istio提供哪些核心流量治理能力？如何用Istio实现金丝雀发布？",
    answer: "Istio四大核心能力：①流量路由——按版本/权重分发请求 ②负载均衡——多种算法（轮询/最少连接/随机）③熔断——后端异常时自动断开（连续5次失败熔断30秒）④链路追踪——全链路调用可视化。金丝雀发布实现：通过Istio的VirtualService配置流量权重规则——将90%流量路由到v1版本、10%流量路由到v2版本。观察v2的指标（错误率/延迟），如果正常逐步增加v2权重（20%→50%→100%），如果有问题立即将v2权重调回0%。整个过程只需修改VirtualService配置，无需重新部署服务，流量切换秒级生效。相比传统按机器比例发布，Istio的基于权重的金丝雀更精确、更灵活。",
    tags: ["Istio", "金丝雀发布", "流量路由", "熔断"],
  },
];
