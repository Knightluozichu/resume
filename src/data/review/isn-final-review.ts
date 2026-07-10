import type { ReviewQuestion } from "./types";

export const isnFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "isn-fr-1",
    chapter: "isn-final-review",
    level: 1,
    question: `一个用户请求从DNS解析到获得响应，经过服务端网络的哪些层？`,
    answer: `端到端请求流转经过七层：①DNS解析——本地DNS→根DNS→顶级域→权威DNS返回IP ②CDN边缘节点——命中缓存直接返回，未命中回源 ③负载均衡层——LVS(L4)高速分发→Nginx(L7)基于HTTP路由 ④安全过滤层——WAF检测SQL注入/XSS→防火墙ACL规则过滤 ⑤反向代理/网关层——SSL终结→限流→认证 ⑥微服务层——API网关路由→Sidecar代理→服务间gRPC调用 ⑦性能保障——连接池复用→零拷贝传输→全链路追踪监控。每层解决一个核心问题。`,
    tags: ["端到端", "请求流转", "七层架构"],
  },
  {
    id: "isn-fr-2",
    chapter: "isn-final-review",
    level: 2,
    question: `服务端网络的五条核心设计原则是什么？`,
    answer: `五条核心设计原则：①分层架构——接入层/逻辑层/数据层各司其职，流量逐层过滤 ②消除单点——关键组件至少双份，故障自动转移 ③纵深防御——网络层+应用层逐层设防，不靠单点 ④就近服务——CDN边缘缓存+GSLB地域调度降低延迟 ⑤可观测性——指标监控+链路追踪+日志聚合全链路可见。`,
    tags: ["设计原则", "分层架构", "纵深防御", "可观测性"],
  },
  {
    id: "isn-fr-3",
    chapter: "isn-final-review",
    level: 3,
    question: `负载均衡和高可用分别如何选型？说出推荐方案和理由。`,
    answer: `负载均衡选型：①高速L4转发→LVS（内核态性能最高）②HTTP内容路由→Nginx（L7灵活路由+SSL终结）③全球地域调度→DNS+GSLB（按地域返回最近机房）④微服务内部→Envoy/Sidecar（与服务网格集成）。高可用选型：①Nginx高可用→Keepalived+VIP（主备秒级切换）②数据库容灾→主从复制+故障转移（数据不丢+服务不断）③异地容灾→双活/多活（机房级容灾）④防脑裂→仲裁节点+Fencing（避免双Master）。选型原则：没有银弹、按需求选型、组合使用、渐进演进。`,
    tags: ["选型", "负载均衡", "高可用", "架构决策"],
  },
  {
    id: "isn-fr-4",
    chapter: "isn-final-review",
    level: 4,
    question: `如果你要从零设计一个百万QPS的服务端网络架构，你会如何分层设计？`,
    answer: `百万QPS分层设计：①DNS层——DNS+GSLB按地域调度到多机房，分散流量入口 ②CDN层——静态资源全走CDN边缘缓存（可挡60-80%流量），动态请求回源 ③接入层——LVS(L4)做高速TCP分发（DR模式单机可达百万级并发），Keepalived+VIP保证LVS高可用 ④路由层——Nginx(L7)做SSL终结+HTTP路由+限流，Keepalived保证Nginx高可用 ⑤安全层——WAF防应用层攻击（SQL注入/XSS/CC），DDoS流量清洗防带宽耗尽 ⑥网关层——API网关统一认证+限流+协议转换 ⑦服务层——微服务Sidecar(Envoy)处理服务间治理（负载均衡/熔断/重试），gRPC内部通信 ⑧性能层——连接池复用+sendfile零拷贝+epoll多路复用 ⑨监控层——Prometheus指标+Jaeger链路追踪+ELK日志，全链路可观测。关键：每层水平扩展（无状态服务直接加机器），有状态层（数据库/Redis）用分片+主从。`,
    tags: ["架构设计", "百万QPS", "分层设计", "综合应用"],
  },
];
