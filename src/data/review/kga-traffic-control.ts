import type { ReviewQuestion } from "./types";

export const kgaTrafficControlQuestions: ReviewQuestion[] = [
  {
    id: "kga-tc-1",
    chapter: "kga-traffic-control",
    level: 2,
    question: `Kong的Rate Limiting插件支持哪些限流算法？各自的原理和适用场景是什么？`,
    answer: `Rate Limiting插件支持三种限流算法：①计数器算法(Counter)——config.policy=local或cluster时使用，在固定时间窗口内累计请求数，超过阈值拒绝。原理：每个时间窗口（如每秒/每分钟）维护一个计数器，请求到达+1，超过limit则返回429。优点：实现简单性能高；缺点：有临界突发问题（窗口边界处可能瞬间2倍流量）。Kong默认用此算法，config.limit + config.window_size定义窗口和阈值。②漏桶算法(Leaky Bucket)——Kong通过Response Transformer或自定义插件可实现，请求如水滴入桶，桶以固定速率漏水（处理请求），桶满则拒绝。优点：平滑输出速率；缺点：无法应对合理突发。③令牌桶算法(Token Bucket)——config中不直接提供，但可通过配置limit+window_size模拟。以固定速率向桶中放令牌，请求消耗令牌，桶空则拒绝。优点：允许一定突发（桶中令牌可累积），平滑限流同时保留突发能力。Kong Rate Limiting关键配置：config.limit(请求数阈值)、config.window_size(时间窗口秒数)、config.policy(限流策略：local单机/shared_dict跨worker/cluster跨节点数据库/redis跨节点Redis)、config.hide_client_headers(是否隐藏X-RateLimit-*响应头)、config.error_code(超限返回状态码默认429)、config.limit_by(限流维度：consumer/ip/credential/service/header)。适用场景：local策略适合单机/不在乎精确限流的场景；cluster策略适合需要全局限流的集群部署(依赖数据库有性能开销)；redis策略适合高性能分布式限流(推荐)。按consumer限流适合按用户限流，按ip限流适合防DDoS。`,
    tags: ["Rate Limiting", "限流算法", "计数器", "令牌桶", "漏桶"],
  },
  {
    id: "kga-tc-2",
    chapter: "kga-traffic-control",
    level: 2,
    question: `Kong的Proxy Cache插件如何工作？缓存key是如何生成的？如何控制缓存行为？`,
    answer: `Proxy Cache插件原理：Kong在转发请求到后端之前检查缓存，命中则直接返回缓存响应(不转发后端)，未命中则转发后端并将响应缓存。工作流程：Client请求 → Proxy Cache插件检查缓存key → 命中返回缓存(加X-Cache-Status:Hit) → 未命中转发后端 → 后端响应 → 缓存响应 → 返回客户端(加X-Cache-Status:Miss)。缓存key生成：默认key = 请求方法 + URI路径 + 查询参数，可配置config.cache_method和config.cache_uri控制。例如GET /api/users?page=1的key可能为"GET|/api/users|page=1"。配置：POST /plugins {\"name\":\"proxy-cache\",\"config\":{\"response_code\":[200,301],\"request_method\":[\"GET\",\"HEAD\"],\"content_type\":[\"text/plain\",\"application/json\"],\"cache_ttl\":300,\"cache_size\":128,\"strategy\":\"memory\"}}。关键配置：response_code(缓存哪些状态码的响应)、request_method(缓存哪些方法的请求)、content_type(缓存哪些内容类型)、cache_ttl(缓存存活时间秒)、cache_size(缓存条目数上限)、strategy(存储策略：memory内存/shared_dict共享内存/redis)。缓存控制：①响应头Cache-Control: no-store → Kong不缓存该响应；②Cache-Control: max-age=N → 覆盖cache_ttl；③X-Cache-Status响应头标识缓存状态——Hit(命中)/Miss(未命中)/Refresh(过期重新获取)/Bypass(不缓存)。缓存失效：POST /routes/{id}/plugins/proxy-cache/invalidate 可手动清除缓存。适用场景：①GET请求读多写少的API(如商品列表、文章详情)；②后端响应不频繁变化的数据(如配置信息)；③减轻后端读压力。注意：POST/PUT/DELETE等写操作不应缓存，需配置正确的request_method。`,
    tags: ["Proxy Cache", "缓存", "缓存key", "TTL", "X-Cache-Status"],
  },
  {
    id: "kga-tc-3",
    chapter: "kga-traffic-control",
    level: 2,
    question: `Kong的Request Transformer和Response Transformer插件能做什么？请给出典型应用场景。`,
    answer: `Request Transformer插件——在请求转发到后端之前修改请求，支持add/append/remove/rename/replace操作。可修改的请求部分：headers(请求头)、querystring(查询参数)、body(请求体JSON字段)。配置示例：POST /plugins {\"name\":\"request-transformer\",\"config\":{\"add\":{\"headers\":[\"X-Forwarded-By:Kong\"],\"querystring\":[\"source:gateway\"]},\"remove\":{\"headers\":[\"X-Sensitive-Data\"]},\"rename\":{\"headers\":[\"X-Old-Name:X-New-Name\"]},\"replace\":{\"uri\":\"/api/v2/users\"}}}。操作说明：add(添加新值)、append(追加值到已有字段)、remove(删除字段)、rename(重命名字段)、replace(替换值)。Response Transformer插件——在后端响应返回客户端之前修改响应，同样支持add/append/remove/rename/replace操作。可修改：headers(响应头)、json(响应体JSON字段)。配置示例：POST /plugins {\"name\":\"response-transformer\",\"config\":{\"add\":{\"headers\":[\"X-Powered-By:Kong-Gateway\"]},\"remove\":{\"headers\":[\"X-Internal-Debug\"]},\"replace\":{\"json\":[\"status:success\"]}}}。典型应用场景：①请求头注入——add X-Forwarded-By:Kong让后端知道请求经过网关；注入X-Consumer-Id让后端识别调用者(配合认证插件)。②敏感信息移除——remove客户端传入的X-Sensitive-Data头，防止后端被注入攻击。③API版本迁移——replace uri将/api/v1/替换为/api/v2/，实现透明版本升级。④响应标准化——add X-Powered-By头标识网关；remove后端内部调试头(X-Internal-Debug)不泄露给客户端。⑤字段重命名——rename headers将后端旧字段名转为客户端期望的新字段名。⑥请求/响应体改写——修改JSON body字段(如添加/删除/重命名JSON字段)，适配不同客户端版本的数据格式。注意：body改写需要解析请求/响应体有性能开销，大量请求场景慎用。`,
    tags: ["Request Transformer", "Response Transformer", "请求改写", "响应改写"],
  },
  {
    id: "kga-tc-4",
    chapter: "kga-traffic-control",
    level: 3,
    question: `在Kong中如何实现熔断和请求终止？请说明相关插件的配置和使用场景。`,
    answer: `熔断与请求终止相关插件：①Request Termination插件——直接终止请求返回指定响应，不做任何转发。配置：POST /plugins {\"name\":\"request-termination\",\"config\":{\"status_code\":503,\"message\":\"Service under maintenance\",\"content_type\":\"application/json\"}}。使用场景：服务维护期间临时下线某个API（返回503而非502）；紧急故障时快速切断某Route流量；灰度发布时关闭旧版本API。优点：配置即时生效无需修改后端。②熔断——Kong开源版没有专门的熔断插件，但可通过以下方式实现：a) Upstream健康检查+被动健康检查——当后端Target连续返回5xx/超时时被标记unhealthy，Kong自动停止转发到该Target，相当于自动熔断。配置healthchecks.passive.unhealthy.http_failures=3等参数。b) Request Termination + 外部监控——Prometheus监控后端错误率，当超过阈值时通过Admin API动态添加Request Termination插件熔断该Route，恢复后删除插件。c) Kong Enterprise版提供Rate Limiting Advanced和Proxy Cache Advanced支持更精细的熔断策略。③Rate Limiting配合——限流是熔断的前置防线，通过限制请求频率防止后端过载导致熔断。配置不同Consumer不同限额，优先保障核心服务。④整体流量治理策略——a) 正常流量：Rate Limiting限流(防止过载) + Proxy Cache缓存(减轻压力)；b) 后端故障：Upstream被动健康检查自动剔除故障节点 + 剩余节点继续服务；c) 全部故障：Request Termination快速失败返回503 + 降级响应(可用Response Transformer返回缓存数据)；d) 紧急维护：Request Termination直接下线API。核心认知：Kong的流量控制是多层组合——限流防过载、缓存减压力、健康检查自动剔除故障、Request Termination手动紧急熔断，形成从预防到自动到手动的完整流量治理链。`,
    tags: ["熔断", "Request Termination", "健康检查", "流量治理", "降级"],
  },
];
