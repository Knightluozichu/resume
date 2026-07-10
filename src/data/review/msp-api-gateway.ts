import type { ReviewQuestion } from "./types";

export const mspApiGatewayQuestions: ReviewQuestion[] = [
  {
    id: "msp-gw-1",
    chapter: "msp-api-gateway",
    level: 1,
    question: `API网关有哪些核心职责？为什么微服务需要API网关？`,
    answer:
      `API网关核心职责：①请求路由——将外部请求路由到对应后端服务②请求聚合——将多个服务调用结果合并为一个响应减少客户端往返③协议转换——外部HTTP转内部gRPC④认证授权——统一身份验证传递用户身份给后端⑤限流熔断——在边缘层保护后端服务⑥缓存——缓存热点响应减轻后端压力⑦日志监控——统一记录请求日志和指标。需要API网关因为：没有网关时客户端直接调用各服务，存在客户端耦合服务地址、客户端拼装数据多次往返耗电耗流量、认证逻辑分散每个服务各自实现、无法统一限流缺少统一入口控制流量等问题。`,
    tags: ["API网关", "请求路由", "请求聚合", "认证授权", "限流"],
  },
  {
    id: "msp-gw-2",
    chapter: "msp-api-gateway",
    level: 2,
    question: `什么是BFF模式？它和普通API网关有什么区别？`,
    answer:
      `BFF（Backend for Frontend）是为每种客户端提供专用后端的API网关模式。区别：普通API网关用一个网关服务所有客户端，不同客户端需求不同导致网关变臃肿；BFF为Web、iOS、Android等各自部署一个专用网关，每个BFF只为一类客户端定制。BFF核心价值：①精确裁剪数据——移动端返回精简数据省流量②定制聚合逻辑——Web端需更多关联数据③独立演进——改iOS不影响Android。代价是网关数量增加运维成本上升。适合客户端类型多、差异大的场景。普通网关适合客户端类型少、需求统一的场景。`,
    tags: ["BFF", "Backend for Frontend", "API网关", "客户端定制"],
  },
  {
    id: "msp-gw-3",
    chapter: "msp-api-gateway",
    level: 1,
    question: `API网关有哪些反模式？如何避免？`,
    answer:
      `三大反模式：①网关含业务逻辑——网关变成第二个单体，业务逻辑应留在后端服务。对策：网关只做路由/聚合/边缘功能，不做业务处理。②网关直连数据库——网关耦合数据模型，违反独立数据所有权。对策：网关只调用服务API，不直接访问任何数据库。③单一网关做所有事——膨胀难维护。对策：用BFF拆分，每种客户端一个专用网关。核心原则：网关是基础设施层而非业务层，保持轻量。聚合逻辑应简单（拼装而非业务处理），否则网关退化为第二个单体。`,
    tags: ["反模式", "网关含业务逻辑", "直连数据库", "BFF"],
  },
  {
    id: "msp-gw-4",
    chapter: "msp-api-gateway",
    level: 2,
    question: `API网关和服务网格（Service Mesh）分别负责什么方向？`,
    answer:
      `API网关负责北南向（外部→内部）通信：客户端←→网关←→服务。处理认证/限流/聚合/协议转换等边缘功能，是外部客户端访问内部服务的统一入口。服务网格（Service Mesh）负责东西向（服务↔服务）通信：服务+Sidecar←→服务+Sidecar。通过Sidecar代理拦截服务间所有流量，提供负载均衡/熔断/重试/可观测等能力，与业务代码解耦。二者互补：网关管外部接入，服务网格管内部通信。典型实现如API网关用Kong/Spring Cloud Gateway，服务网格用Istio（Envoy Sidecar）。`,
    tags: ["API网关", "服务网格", "Service Mesh", "北南向", "东西向"],
  },
];
