import type { ReviewQuestion } from "./types";

export const kgaRoutingPluginsQuestions: ReviewQuestion[] = [
  {
    id: "kga-rp-1",
    chapter: "kga-routing-plugins",
    level: 2,
    question: "Kong的Route匹配规则有哪些维度？请求是如何匹配到Route并路由到Service的？",
    answer: "Route匹配维度：①protocols——协议匹配（http/https/grpc/grpcs/tcp/tls），请求必须使用Route声明的协议。②methods——HTTP方法匹配（GET/POST/PUT/DELETE等），不设置则匹配所有方法。③hosts——Host头匹配，支持通配符（如*.example.com匹配api.example.com和app.example.com）。④paths——URL路径匹配，支持前缀匹配（默认）和正则匹配。前缀匹配：path=/api匹配/api、/api/users、/api/v1/orders等所有以/api开头的路径。正则匹配：paths中用~前缀表示正则（如~/api/v[0-9]+/.*）。⑤headers——自定义请求头匹配，如x-custom-header:value。⑥snis——TLS SNI匹配（HTTPS场景）。匹配优先级：Kong按以下规则排序选择最佳匹配的Route——①protocols匹配数最多的优先；②methods匹配数最多的优先；③hosts通配符少的优先（精确匹配优于通配符）；④paths路径长的优先（更具体的路径优先）；⑤headers匹配数多的优先。路由流程：Client请求到达Proxy端口 → Kong按优先级遍历所有Route进行匹配 → 匹配到唯一Route → 获取Route关联的Service → 根据Service的host/port/protocol构造upstream请求 → 如Service关联Upstream则负载均衡选择Target → 转发请求到后端。配置示例：POST /routes {paths:[\"/api/v1\"], methods:[\"GET\",\"POST\"], service:{id:\"xxx\"}}，表示GET/POST请求到/api/v1开头路径时路由到指定Service。",
    tags: ["Route匹配", "路由规则", "Service", "匹配优先级"],
  },
  {
    id: "kga-rp-2",
    chapter: "kga-routing-plugins",
    level: 1,
    question: "如何用Admin API创建Service和Route？请给出完整的配置示例。",
    answer: "创建Service：POST http://localhost:8001/services，body示例：{\"name\":\"user-service\",\"url\":\"http://user-service.internal:8080\"}或分字段{\"name\":\"user-service\",\"protocol\":\"http\",\"host\":\"user-service.internal\",\"port\":8080,\"path\":\"/api/users\"}。url字段等价于protocol://host:port/path的简写。创建成功返回Service对象含id字段。创建Route并关联Service：POST http://localhost:8001/services/{service-id-or-name}/routes，body示例：{\"name\":\"user-route\",\"paths\":[\"/users\"],\"methods\":[\"GET\",\"POST\",\"PUT\",\"DELETE\"],\"strip_path\":true}。strip_path=true表示转发到后端时去掉匹配的路径前缀（/users/123 → 后端收到/123）。也可先创建Route再关联：POST /routes {\"name\":\"user-route\",\"paths\":[\"/users\"],\"service\":{\"id\":\"xxx\"}}。验证：GET http://localhost:8000/users/123 → Kong匹配user-route → 路由到user-service → 转发http://user-service.internal:8080/123（strip_path去掉了/users前缀）。关键配置项：①strip_path——是否剥离匹配的路径前缀，默认true；②preserve_host——是否将客户端原始Host头转发给后端，默认false；③https_redirect_status_code——HTTP转HTTPS的重定向码，默认426。",
    tags: ["Admin API", "Service配置", "Route配置", "strip_path"],
  },
  {
    id: "kga-rp-3",
    chapter: "kga-routing-plugins",
    level: 2,
    question: "Kong插件的作用域有哪些层级？同一请求多个层级的插件如何叠加执行？",
    answer: "插件作用域四个层级（从宽到窄）：①全局(global)——不关联任何实体，作用于所有Route的所有请求。配置：POST /plugins {\"name\":\"rate-limiting\",\"config\":{...}}，不设service_id/route_id/consumer_id。②Service级——关联某个Service，作用于路由到该Service的所有请求。配置：POST /services/{id}/plugins {\"name\":\"...\",\"config\":{...}}。③Route级——关联某个Route，作用于匹配该Route的请求。配置：POST /routes/{id}/plugins。④Consumer级——关联某个Consumer，作用于该Consumer发起的所有请求（需先通过认证插件识别Consumer身份）。配置：POST /consumers/{id}/plugins。叠加规则：同一请求可能命中多个层级的同名插件，Kong的策略是「只执行最具体的那一个」——Consumer级 > Route级 > Service级 > 全局。例如全局配了rate-limiting(100/min)，Route级也配了rate-limiting(200/min)，则该Route的请求只执行Route级的200/min配置，全局的被覆盖。不同名插件叠加：不同插件各自独立执行，如全局配了prometheus(监控) + Route级配了jwt(认证) + Consumer级配了rate-limiting(限流)，三者都执行，按各自priority排序在请求生命周期中执行。核心原则：同名插件取最具体作用域配置（覆盖），不同名插件各自生效（叠加），执行顺序按priority排序。",
    tags: ["插件作用域", "全局", "Service", "Route", "Consumer", "叠加规则"],
  },
  {
    id: "kga-rp-4",
    chapter: "kga-routing-plugins",
    level: 3,
    question: "Kong的Upstream和Target如何实现负载均衡？支持哪些均衡算法和健康检查机制？",
    answer: "Upstream/Target负载均衡：Upstream是一个命名的负载均衡池，包含多个Target（后端实例地址）。Service的host指向Upstream名称（而非直接IP），Kong在转发时从Upstream的Target列表中按算法选择一个Target转发。创建Upstream：POST /upstreams {\"name\":\"user-upstream\",\"algorithm\":\"round-robin\",\"healthchecks\":{...}}。添加Target：POST /upstreams/{name}/targets {\"target\":\"10.0.0.1:8080\",\"weight\":100}、{\"target\":\"10.0.0.2:8080\",\"weight\":50}。关联Service：PUT /services/{id} {\"host\":\"user-upstream\"}（host=Upstream名而非IP）。均衡算法：①round-robin（默认）——按weight权重轮询，weight越大被选中概率越高，加权轮询；②least-connections——选择当前活跃连接数最少的Target，适合请求耗时差异大的场景；③一致性哈希(consistent-hashing)——可按consumer/ip/header/path/cookie等维度哈希，同一key固定路由到同一Target，适合会话保持和缓存命中。健康检查：①主动健康检查(Active)——Kong周期性向Target发送HTTP/TCP探测请求，连续N次失败标记为unhealthy，连续M次成功恢复healthy。配置healthchecks.active.healthy/unhealthy参数。②被动健康检查(Passive)——根据实际请求结果判断，连续N个5xx错误或超时标记为unhealthy，不主动探测节省资源。两种可结合使用。核心：Upstream=负载均衡池，Target=后端实例，algorithm=选择策略，healthchecks=故障自动剔除与恢复，实现后端服务的高可用负载均衡。",
    tags: ["Upstream", "Target", "负载均衡", "健康检查", "round-robin"],
  },
];
