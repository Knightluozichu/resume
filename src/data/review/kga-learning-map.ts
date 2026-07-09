import type { ReviewQuestion } from "./types";

export const kgaLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "kga-lm-1",
    chapter: "kga-learning-map",
    level: 1,
    question: "全书分为哪四个部分？各自的核心内容和递进逻辑是什么？",
    answer: "全书分四个部分：第一部分「基础概念」——全书学习地图（知识体系全景、三条核心主线、推荐学习路径）、API网关基础（什么是API网关、核心职责、Kong的定位与优势）；第二部分「核心架构」——Kong架构（OpenResty/Nginx事件驱动模型、Nginx worker进程模型、Admin API与Proxy双端口、数据模型Service/Route/Consumer/Plugin/Upstream）、路由与插件（Route匹配规则path/method/host/headers、Service配置与Upstream负载均衡、Plugin作用域全局/路由/服务/消费者级、请求生命周期插件执行顺序priority）；第三部分「安全与流量」——认证与授权（JWT/OAuth2/Key Auth/HMAC/LDAP/OpenID Connect、多认证插件组合策略、Consumer与Credential关联）、安全插件（CORS跨域、ACL访问控制、IP Restriction黑白名单、Bot Detection机器人检测）、流量控制（Rate Limiting计数器/漏桶/令牌桶算法、Proxy Cache缓存、Request/Response Transformer请求响应改写、熔断与请求终止）；第四部分「部署与进阶」——部署与高可用（Docker部署、Kubernetes Ingress Controller、DB模式PostgreSQL vs DB-less声明式配置、Hybrid模式控制面与数据面分离、集群高可用）、高级主题（自定义Lua插件开发、PDK插件开发工具包、Kong Mesh基于Kuma的Service Mesh、Serverless无服务器插件）、全书复习整合。递进逻辑：从什么是API网关到Kong架构怎么工作到安全流量怎么控制到怎么部署扩展。",
    tags: ["学习地图", "知识体系", "四部分递进"],
  },
  {
    id: "kga-lm-2",
    chapter: "kga-learning-map",
    level: 2,
    question: "贯穿全书的三条核心主线是什么？它们在哪些交汇点形成闭环？",
    answer: "主线一「代理路由」：Client → Route → Service → Upstream → Target，回答「请求怎么转发」。Route负责匹配入站请求（path/method/host/headers），匹配成功后路由到关联的Service，Service指向Upstream实现负载均衡，Upstream包含多个Target实现后端服务池。主线二「插件扩展」：Plugin → Consumer → Credential → ACL，回答「横切关注点怎么处理」。Plugin是Kong的核心扩展机制，按priority排序在请求/响应生命周期执行；Consumer标识API调用者，Credential是认证凭证，ACL控制访问权限。插件链覆盖认证、安全、流量、转换等横切关注点。主线三「部署运维」：DB模式/DB-less → Cluster → Hybrid → Mesh，回答「怎么部署、怎么扩展」。三个交汇点：①Route-Service-Plugin是代理路由与插件扩展的交汇——路由匹配成功后触发插件链执行，是请求处理的枢纽；②Consumer-Credential-Plugin是插件扩展与安全流量的交汇——消费者凭证触发认证插件，认证通过后ACL插件控制访问权限；③DB-less-Hybrid-Mesh是部署运维与扩展能力的交汇——声明式配置保证一致性，Hybrid模式分离控制面与数据面，Mesh扩展到Service Mesh全栈服务治理。",
    tags: ["三条主线", "交汇点", "核心认知"],
  },
  {
    id: "kga-lm-3",
    chapter: "kga-learning-map",
    level: 2,
    question: "为什么学习Kong要遵循'基础概念→核心架构→安全与流量→部署与进阶'的顺序？",
    answer: "顺序依据：每一步是下一步的前提。基础概念（API网关定义/核心职责/Kong定位）是理解Kong为何存在的业务背景；核心架构（OpenResty/Nginx模型/数据模型Service-Route-Consumer-Plugin/路由匹配/插件机制）建立在基础概念之上，需先理解API网关职责才能理解Kong如何用架构实现这些职责；安全与流量（认证授权/安全插件/流量控制）建立在核心架构之上，需先理解Route-Service-Plugin模型才能理解认证插件如何在请求生命周期中执行；部署与进阶（Docker/K8s/DB-less/Hybrid/自定义插件/Mesh）建立在完整理解之上，需先理解单机架构和插件机制才能理解集群部署和自定义插件开发。跳过基础的风险：①不懂API网关职责无法理解Kong各组件的设计目标；②不懂Route-Service-Plugin数据模型无法配置路由和插件；③不懂请求生命周期无法正确组合认证和安全插件；④不懂OpenResty/Nginx模型无法进行自定义插件开发和性能调优。",
    tags: ["学习路径", "递进逻辑", "依赖关系"],
  },
  {
    id: "kga-lm-4",
    chapter: "kga-learning-map",
    level: 3,
    question: "Kong的核心设计哲学是什么？它与Nginx、APISIX等API网关有什么本质区别？",
    answer: "核心设计哲学：以插件化扩展为核心，通过Route-Service抽象解耦路由与后端，通过数据库/声明式配置管理实体，实现高性能、可扩展、云原生的API网关。四大技术特点：①OpenResty架构——基于Nginx事件驱动+LuaJIT，单进程异步非阻塞，单机可达数万RPS；②插件化扩展——所有横切关注点（认证/安全/流量/转换）都通过插件实现，插件按priority排序在Nginx请求生命周期执行，可热加载无需重启；③数据模型抽象——Service/Route/Consumer/Plugin/Upstream五大核心实体，通过Admin API或声明式配置管理，解耦路由匹配与后端服务；④多模式部署——DB模式（PostgreSQL持久化）、DB-less（声明式配置）、Hybrid模式（控制面+数据面分离），适配从开发到生产到云原生的全场景。与Nginx的区别：Nginx是通用Web服务器/反向代理，需手写配置文件和Lua脚本实现网关功能；Kong在Nginx+OpenResty之上封装了API网关抽象，提供Admin API和插件生态，开箱即用。与APISIX的区别：Kong基于OpenResty(LuaJIT)生态成熟插件丰富；APISIX同样基于OpenResty但用etcd做配置中心支持实时动态配置，架构更云原生。Kong擅长企业级稳定性和插件生态，APISIX擅长动态配置和高性能路由。",
    tags: ["设计哲学", "Kong vs Nginx", "Kong vs APISIX", "插件化"],
  },
];
