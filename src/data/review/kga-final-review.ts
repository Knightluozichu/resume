import type { ReviewQuestion } from "./types";

export const kgaFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "kga-fr-1",
    chapter: "kga-final-review",
    level: 3,
    question: "请描述Kong处理一个API请求的完整全链路流程，从客户端请求到后端响应返回。",
    answer: "完整请求处理全链路：①客户端发起HTTP请求到Kong Proxy端口(8000/8443)——如GET /api/v1/users/123 Authorization: Bearer jwt-token。②Nginx接收连接——Nginx worker进程epoll事件循环接收TCP连接，解析HTTP请求。③rewrite阶段——Kong执行所有启用插件的rewrite()handler（按priority排序），可修改URI。④路由匹配——Kong遍历所有Route，按protocols/methods/hosts/paths/headers优先级匹配，找到匹配的Route，获取关联的Service。⑤access阶段——Kong执行所有启用插件的access()handler（按priority排序）：IP Restriction(3000)检查IP → Bot Detection(2500)检测机器人 → CORS(2000)处理预检 → JWT(1450)验证令牌识别Consumer → Key Auth(1250)验证API Key → ACL(950)检查Consumer group权限 → Rate Limiting(910)检查限流 → Request Transformer(801)改写请求头/参数。任一插件失败(如认证失败返回401)则kong.response.exit()终止请求。⑥请求转发——Kong根据Service的host/port/protocol构造upstream请求：如Service关联Upstream则按algorithm(round-robin/least-connections)选择健康Target → 转发请求到后端(如http://10.0.0.1:8080/users/123，strip_path已去掉/api/v1前缀)。⑦后端处理——后端微服务处理业务逻辑，返回HTTP响应(如200 OK + JSON body)。⑧header_filter阶段——Kong执行所有插件的header_filter()handler：CORS添加Access-Control-Allow-Origin头 → Response Transformer(801)改写响应头 → Proxy Cache判断是否缓存响应。⑨body_filter阶段——Kong执行body_filter()handler逐块处理响应体：Response Transformer可修改响应体内容。⑩响应返回——Kong将最终响应返回客户端，添加X-Kong-Proxy-Latency/X-Kong-Upstream-Latency等头。⑪log阶段——请求结束后Kong执行log()handler：File-Log记录日志 → Prometheus采集指标 → Zipkin上报追踪。全链路公式：Client → Nginx(连接) → rewrite(插件) → Route(匹配) → access(插件链) → Upstream(转发) → 后端 → header_filter(插件) → body_filter(插件) → Client → log(插件)。",
    tags: ["全链路", "请求处理", "插件链", "生命周期", "Route匹配"],
  },
  {
    id: "kga-fr-2",
    chapter: "kga-final-review",
    level: 3,
    question: "Kong的三条核心主线在哪些交汇点形成闭环？请详细解释每个交汇点的意义。",
    answer: "三个交汇点：①Route-Service-Plugin（代理路由与插件扩展的交汇）——路由匹配成功后触发插件链执行，是请求处理的枢纽。Route定义了哪些请求被匹配，Service定义了匹配后转发到哪里，Plugin定义了转发前后做什么处理。三者交汇在access阶段：Route匹配成功 → 加载关联Service → 执行Route/Service/全局级插件的access()handler → 转发到Service指向的后端。这个交汇点体现了Kong「路由-插件-后端」三层解耦设计：路由规则、横切逻辑、后端服务各自独立配置，通过实体关联组合。②Consumer-Credential-Plugin（插件扩展与安全流量的交汇）——消费者凭证触发认证插件，认证通过后ACL插件控制访问权限。Consumer标识谁在调用，Credential是认证凭证(API Key/JWT密钥)，Plugin执行认证和授权逻辑。交汇流程：Client请求携带Credential → 认证插件(JWT/Key-Auth)验证Credential → 查找Credential关联的Consumer → 注入X-Consumer-Id → ACL插件检查Consumer的group权限 → Rate Limiting按Consumer限流。这个交汇点体现了Kong「认证-授权-限流」安全治理链：身份验证→权限控制→频率控制逐层过滤。③DB-less-Hybrid-Mesh（部署运维与扩展能力的交汇）——声明式配置保证一致性，Hybrid模式分离控制面与数据面，Mesh扩展到服务网格。DB-less用声明式配置文件管理实体（GitOps版本控制），Hybrid模式用CP/DP分离实现大规模安全部署，Mesh将网关能力扩展到东西向流量。交汇体现：DB-less声明式配置在CP节点管理 → CP推送到多个DP节点 → DP无状态水平扩展 → Mesh Sidecar延伸到服务间通信。这个交汇点体现了Kong「配置-部署-网格」云原生演进路径：声明式→分离→网格全栈治理。三个交汇点串联全书四部分知识：路由插件解决请求处理、Consumer插件解决安全治理、部署模式解决云原生扩展，交汇点体现了Kong的设计精妙——Route-Service解耦路由与后端、Plugin机制扩展横切关注点、多模式部署适配全场景。",
    tags: ["三条主线", "交汇点", "Route-Service-Plugin", "Consumer-Credential-Plugin", "DB-less-Hybrid-Mesh"],
  },
  {
    id: "kga-fr-3",
    chapter: "kga-final-review",
    level: 3,
    question: "Kong与Nginx、APISIX、TyK等API网关相比有什么异同？如何选型？",
    answer: "API网关对比选型：①Kong——基于OpenResty(Nginx+LuaJIT)，插件生态最丰富(100+官方插件)，DB/DB-less/Hybrid多模式部署，Admin API管理，K8s Ingress Controller支持。优势：生态成熟(GitHub 40k+star)、插件丰富、企业版支持、Kong Mesh生态。劣势：DB模式依赖PostgreSQL、配置不够实时(需DB轮询)、Lua插件开发门槛。适合：企业级生产环境、需要丰富插件和商业支持。②Nginx——通用Web服务器/反向代理，性能极高但无API网关抽象。需手写nginx.conf + Lua脚本实现网关功能。优势：极致性能、轻量稳定、全球最广泛使用。劣势：无Admin API、无插件生态、配置非动态(需reload)、开发成本高。适合：简单反向代理/静态文件/负载均衡。③APISIX——同样基于OpenResty，但用etcd做配置中心支持实时动态配置，架构更云原生。优势：etcd实时配置(毫秒级生效)、路由性能优异( radixtree)、插件热加载、云原生设计。劣势：依赖etcd、生态不如Kong成熟、社区较小。适合：云原生环境、需要实时动态配置、高性能路由。④TyK——基于Go语言开发的API网关，不依赖OpenResty。优势：Go语言易于开发扩展、部署简单(单一二进制)、Dashboard管理界面完善。劣势：性能不如OpenResty方案、插件生态较小、社区较小。适合：Go技术栈团队、中小规模部署。选型建议：①企业级+丰富插件+商业支持 → Kong；②云原生+实时动态配置+高性能 → APISIX；③Go技术栈+简单部署 → TyK；④极致性能+简单代理 → Nginx；⑤需要Service Mesh → Kong Mesh/Istio。核心差异维度：底层运行时(OpenResty vs Go)、配置中心(DB vs etcd vs 无)、插件生态(Kong最丰富)、动态配置能力(APISIX最强)、部署复杂度(TyK最简)。",
    tags: ["Kong vs Nginx", "Kong vs APISIX", "Kong vs TyK", "选型决策", "API网关对比"],
  },
  {
    id: "kga-fr-4",
    chapter: "kga-final-review",
    level: 4,
    question: "如果让你为一个大型电商平台设计基于Kong的API网关生产架构，你会如何设计？请综合运用全书知识。",
    answer: "大型电商Kong API网关架构设计：①部署架构——Hybrid模式：1个CP节点(内网，运行Admin API+PostgreSQL) + 多个DP节点(多机房，运行Proxy，无Admin API暴露)。DP节点按机房部署，通过WAN从CP拉取配置。K8s部署用KIC+DB-less，ConfigMap管理声明式配置，GitOps CI/CD。②路由设计——按业务域划分Route：/users/* → 用户服务、/orders/* → 订单服务、/products/* → 商品服务、/payments/* → 支付服务。每个Service关联Upstream(多Target负载均衡+健康检查)，支持蓝绿/金丝雀通过权重控制。③认证授权——JWT插件统一认证(网关验签，后端无需验证)：用户JWT(claims含user_id和role)、商家JWT(claims含merchant_id)。ACL插件按group控制：user-group访问用户API、merchant-group访问商家API、admin-group访问管理API。OAuth2插件对接第三方应用授权。④安全防护——IP Restriction(管理API白名单内网) + Bot Detection(拦截爬虫，保护商品价格) + Rate Limiting(按Consumer限流：普通100/min、VIP 1000/min、未认证10/min) + CORS(限制前端域名)。⑤流量控制——Proxy Cache缓存商品列表/详情(GET请求，TTL=60s) + Rate Limiting(支付API严格限流防刷) + Request Transformer(注入X-Consumer-Id给后端) + Upstream健康检查(后端故障自动剔除)。⑥可观测性——Prometheus插件采集指标(QPS/延迟/错误率/429率) → Grafana看板 → AlertManager告警(错误率>5%告警、429率>10%告警)。File-Log/HTTP-Log记录请求日志到ELK。Zipkin插件分布式追踪(全链路请求可视化)。⑦高可用——多DP节点+Pod水平扩展(HPA按CPU自动扩缩)、Upstream多Target+健康检查自动故障转移、PostgreSQL主从复制+Patroni高可用、跨机房DP部署+DNS故障切换。⑧配置管理——decK工具管理声明式配置 → Git版本控制 → CI/CD自动部署(kong deploy -s)。配置变更走PR review流程，禁止直接Admin API操作。⑨灰度发布——Upstream Target权重控制(新版本10%流量灰度) + Request Transformer按header路由(测试用户路由到新版本)。⑩自定义插件——开发电商专用插件：如「促销限购插件」(access阶段查Redis判断用户是否超限购数量)、「风控插件」(access阶段调风控服务判断请求风险)。总结：Kong = 统一入口(Hybrid多机房) + 路由解耦(Route-Service-Upstream) + 安全治理(JWT+ACL+IP+Bot+RateLimit) + 流量控制(Cache+Transform+健康检查) + 可观测(Prometheus+Zipkin+Log) + 扩展能力(自定义插件+Mesh)。",
    tags: ["生产架构", "电商", "全栈设计", "Hybrid", "认证授权", "流量控制", "可观测性", "高可用"],
  },
];
