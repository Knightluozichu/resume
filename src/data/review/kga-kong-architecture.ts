import type { ReviewQuestion } from "./types";

export const kgaKongArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "kga-ka-1",
    chapter: "kga-kong-architecture",
    level: 2,
    question: "Kong基于OpenResty架构，请说明OpenResty与Nginx的关系，以及Kong如何利用Nginx worker进程模型？",
    answer: "OpenResty关系：OpenResty = Nginx + LuaJIT + 一系列Lua库。Nginx是高性能Web服务器/反向代理，采用事件驱动（epoll/kqueue）多进程架构；LuaJIT是Lua语言的即时编译器，性能接近C；OpenResty在Nginx的请求处理阶段嵌入Lua执行能力，使得可以用Lua脚本动态处理请求，而不仅靠静态配置文件。Kong就是用OpenResty构建的——用Lua编写插件逻辑，在Nginx的rewrite/access/header_filter/body_filter/log等阶段执行。Nginx worker进程模型：①Nginx采用master-worker架构，master进程管理多个worker进程（通常=CPU核数）；②每个worker进程是单线程、事件驱动、非阻塞的，可处理数万并发连接；③worker进程之间相互独立，一个worker崩溃不影响其他worker，master会自动拉起新worker。Kong利用方式：①Kong的插件代码在worker进程的Lua协程中执行，不阻塞worker的事件循环，保持高并发；②每个worker独立加载Kong配置和插件，配置变更通过Admin API写入数据库，worker周期性轮询/事件通知刷新本地缓存；③Kong利用Nginx的shared dict（共享内存字典）在worker间共享数据（如限流计数器、缓存），实现无锁高性能。核心：Kong = Nginx事件驱动 + LuaJIT动态扩展 + 共享内存跨worker通信。",
    tags: ["OpenResty", "Nginx", "worker模型", "事件驱动"],
  },
  {
    id: "kga-ka-2",
    chapter: "kga-kong-architecture",
    level: 2,
    question: "Kong的五大核心数据模型（Service/Route/Consumer/Plugin/Upstream）分别是什么？它们之间的关系如何？",
    answer: "五大核心实体：①Service——代表一个后端微服务/API，包含协议(scheme)、主机(host)、端口(port)、路径(path)等信息，是Route路由的终点。一个Service = 一个后端服务。②Route——定义请求匹配规则（path/method/host/headers/protocols），匹配成功后路由到关联的Service。一个Service可关联多个Route（不同路径/域名指向同一服务）。Route是请求入口，Service是路由出口。③Consumer——代表API的调用者（用户/应用/客户端），用于标识谁在调用API。Consumer可关联多个Credential（凭证），如JWT密钥、API Key等。认证插件验证Credential后关联到Consumer。④Plugin——代表一个插件配置实例，可作用于全局(all)、某个Service、某个Route或某个Consumer。Plugin有name(插件名)和config(配置)字段，按priority排序执行。⑤Upstream——Service的负载均衡后端池，包含多个Target（目标地址host:port+weight），支持健康检查和故障转移。Service可直接指向单个host:port，也可指向Upstream实现负载均衡。关系链：Client请求 → Route(匹配) → Service(路由目标) → Upstream(负载均衡) → Target(具体后端实例)。Plugin可挂在Route/Service/Consumer/全局上，Consumer通过Credential被认证插件识别。Route:Service = N:1，Service:Upstream = 1:1(可选)，Upstream:Target = 1:N，Consumer:Credential = 1:N，Plugin:任意实体 = N:1。",
    tags: ["数据模型", "Service", "Route", "Consumer", "Plugin", "Upstream"],
  },
  {
    id: "kga-ka-3",
    chapter: "kga-kong-architecture",
    level: 2,
    question: "Kong的Admin API和Proxy分别监听什么端口？它们的职责有什么区别？",
    answer: "两个监听端口：①Proxy端口（默认8000 HTTP / 8443 HTTPS）——代理数据面端口，所有客户端API请求通过此端口进入，Kong在此执行路由匹配、插件链处理、请求转发。这是生产流量的入口，必须对外暴露。②Admin API端口（默认8001 HTTP / 8444 HTTPS）——管理控制面端口，通过RESTful HTTP API管理Kong的所有配置实体（Service/Route/Consumer/Plugin/Upstream等），支持CRUD操作。Admin API是Kong的配置管理接口，用于动态增删路由、配置插件、管理消费者。职责区别：Proxy端口处理「数据面流量」——客户端到后端服务的实际API请求，关注性能和路由；Admin API端口处理「控制面操作」——运维/CI-CD对Kong配置的管理操作，关注配置正确性和安全性。安全原则：①Admin API绝不能暴露到公网——攻击者可通过Admin API篡改路由、窃取Consumer凭证、植入恶意插件，相当于拿到Kong的完全控制权；②生产环境Admin API应限制在内网/VPN/localhost访问，或通过Hybrid模式由控制面节点专门管理；③Admin API可配置认证插件（如basic-auth）增加一层保护；④Proxy端口可安全暴露到公网，由认证/安全插件保护后端API。Hybrid模式下：Control Plane节点运行Admin API（不处理Proxy流量），Data Plane节点运行Proxy（不暴露Admin API），彻底隔离控制面与数据面。",
    tags: ["Admin API", "Proxy", "端口", "控制面", "数据面"],
  },
  {
    id: "kga-ka-4",
    chapter: "kga-kong-architecture",
    level: 3,
    question: "Kong的请求处理生命周期是怎样的？插件在哪些阶段执行？",
    answer: "Kong请求处理生命周期（基于Nginx + OpenResty的phase机制）：①rewrite阶段——URL重写，对应Kong插件kong.rewrite()handler，在路由匹配之前执行，可修改请求URI。②access阶段——访问控制，对应kong.access()handler，在路由匹配之后、请求转发之前执行，可修改请求头/查询参数/认证校验/决定是否终止请求。这是认证、安全、限流插件的主要执行阶段。③upstream连接——Kong将请求转发到Service/Upstream指向的后端服务。④header_filter阶段——响应头过滤，对应kong.header_filter()handler，后端响应头返回后、发送给客户端之前执行，可修改/增删响应头。⑤body_filter阶段——响应体过滤，对应kong.body_filter()handler，后端响应体分块返回时逐块执行，可修改响应体。⑥log阶段——日志记录，对应kong.log()handler，请求结束后执行，可记录日志/指标/追踪，不影响响应。插件执行顺序：同一阶段内多个插件按priority字段（数值越大越先执行）排序执行。例如CORS(priority=2000)在JWT(priority=1450)之前执行，Key Auth(priority=1250)在Rate Limiting(priority=910)之前执行。插件可只实现需要的阶段handler，不必全部实现。核心认知：Kong插件 = Nginx生命周期阶段 + Lua handler + priority排序，开发者通过实现rewrite/access/header_filter/body_filter/log等handler在请求处理的不同节点插入自定义逻辑。",
    tags: ["生命周期", "插件阶段", "Nginx phase", "priority"],
  },
];
