import type { ReviewQuestion } from "./types";

export const kgaApiGatewayIntroQuestions: ReviewQuestion[] = [
  {
    id: "kga-agi-1",
    chapter: "kga-api-gateway-intro",
    level: 1,
    question: "什么是API网关？它在微服务架构中解决什么核心问题？",
    answer: "API网关是微服务架构中的统一入口层，位于客户端与后端微服务之间，作为所有外部请求的反向代理和流量管理枢纽。核心问题：①入口统一——没有网关时客户端需直接调用多个微服务，地址分散、协议多样、认证逻辑重复，网关提供统一入口地址；②横切关注点集中——认证、限流、日志、监控、CORS等逻辑在每个微服务中重复实现，网关集中处理避免代码重复；③解耦——客户端不直接依赖具体微服务地址，后端服务可自由拆分合并、灰度发布，网关屏蔽后端变化；④协议转换——外部HTTP/HTTPS请求可转换为内部gRPC/Thrift等协议调用。API网关是微服务治理的基础设施，Kong是其中最流行的开源实现之一。",
    tags: ["API网关", "微服务", "核心职责"],
  },
  {
    id: "kga-agi-2",
    chapter: "kga-api-gateway-intro",
    level: 2,
    question: "API网关的五大核心职责是什么？请分别说明。",
    answer: "五大核心职责：①反向代理与路由——接收所有外部请求，根据URL路径、HTTP方法、Host头等匹配规则将请求转发到对应的后端微服务，支持路径重写、负载均衡；②认证与授权——集中处理身份认证（JWT/OAuth2/Key Auth等），验证请求者身份和访问权限，微服务无需各自实现认证逻辑；③流量控制——限流（Rate Limiting）防止后端被压垮，熔断（Circuit Breaking）防止级联故障，缓存（Caching）减少后端压力，请求/响应转换适配不同客户端；④安全防护——CORS跨域控制、IP黑白名单、Bot检测、请求体大小限制、TLS终止，保护后端服务免受恶意攻击；⑤可观测性——统一日志记录、指标采集（Prometheus）、分布式追踪（Zipkin/Jaeger），全链路请求可视化。这五项职责对应Kong的插件体系：路由对应Route/Service、认证对应JWT/Key-Auth插件、流量对应Rate-Limiting/Proxy-Cache、安全对应CORS/IP-Restriction、可观测对应File-Log/Prometheus/Zipkin插件。",
    tags: ["核心职责", "路由", "认证", "流量控制", "安全", "可观测性"],
  },
  {
    id: "kga-agi-3",
    chapter: "kga-api-gateway-intro",
    level: 2,
    question: "Kong是什么？它有哪些核心特性和优势？",
    answer: "Kong是一个开源的、云原生的、高性能API网关和微服务管理平台，基于OpenResty（Nginx+LuaJIT）构建。核心特性：①高性能——基于Nginx事件驱动模型，单进程异步非阻塞，单机可达数万RPS，延迟亚毫秒级；②插件化架构——认证、安全、流量、转换、可观测等功能全部以插件形式提供，插件用Lua编写在Nginx生命周期内执行，可热加载无需重启；③多协议支持——HTTP/HTTPS、gRPC、WebSocket、TCP、UDP、TLS_passthrough，覆盖API网关全部协议场景；④多平台部署——Docker、Kubernetes（Ingress Controller）、VM裸机、DB模式/DB-less/Hybrid模式，适配从开发到生产到云原生全场景；⑤Admin API——RESTful管理接口，所有配置通过HTTP API管理，支持自动化CI/CD集成；⑥生态系统——Kong Inc.商业支持、丰富的官方/社区插件、Kong Mesh（Service Mesh）、Kong Enterprise（企业版）。优势：开源成熟（GitHub 40k+ star）、插件生态丰富（100+官方插件）、性能优异、平台无关、云原生友好。",
    tags: ["Kong定义", "核心特性", "OpenResty", "插件化"],
  },
  {
    id: "kga-agi-4",
    chapter: "kga-api-gateway-intro",
    level: 3,
    question: "Kong与Nginx直接做反向代理相比有什么区别？为什么选择Kong而不是手写Nginx+Lua？",
    answer: "区别与选型理由：①抽象层级——Nginx是通用Web服务器/反向代理，配置通过nginx.conf文件，需要手动编写location、proxy_pass、limit_req等指令；Kong在Nginx+OpenResty之上封装了API网关抽象（Service/Route/Consumer/Plugin），通过Admin API或声明式配置管理，无需手写Nginx配置。②插件生态——Nginx实现认证/限流/日志需要手写Lua脚本或安装第三方模块，维护成本高；Kong提供100+官方插件（JWT/OAuth2/Rate-Limiting/CORS/Prometheus等），开箱即用且经过生产验证。③动态配置——Nginx修改配置需要reload，短暂中断连接；Kong通过Admin API动态增删路由和插件，无需重启（DB模式实时生效，DB-less模式reconcile生效）。④管理界面——Nginx无管理界面；Kong提供Admin API和Kong Manager GUI。⑤生态——Nginx是独立项目；Kong有完整生态（Kong Mesh/Kong Enterprise/Kong Insomnia API设计）。选Kong的理由：当需要API网关级别的功能（统一认证/限流/监控/多协议）时，Kong比手写Nginx+Lua开发效率高10倍、维护成本低、插件经过生产验证。选Nginx直接代理的理由：只需要简单反向代理和静态文件服务，不需要API网关功能，Nginx更轻量。Kong本质是Nginx的API网关超集——底层就是Nginx+OpenResty，但封装了网关抽象和插件生态。",
    tags: ["Kong vs Nginx", "选型决策", "API网关", "动态配置"],
  },
];
