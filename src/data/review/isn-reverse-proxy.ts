import type { ReviewQuestion } from "./types";

export const isnReverseProxyQuestions: ReviewQuestion[] = [
  {
    id: "isn-rp-1",
    chapter: "isn-reverse-proxy",
    level: 1,
    question: "反向代理和正向代理的区别是什么？",
    answer: "反向代理和正向代理区别：①代理对象——正向代理代理客户端，反向代理代理服务端 ②客户端感知——正向代理客户端知道需配置（如VPN），反向代理客户端无感知 ③谁知道它——正向代理客户端知道，反向代理服务端知道 ④典型场景——正向代理用于VPN/翻墙/客户端缓存，反向代理用于Nginx/负载均衡/网关。",
    tags: ["反向代理", "正向代理", "代理对比"],
  },
  {
    id: "isn-rp-2",
    chapter: "isn-reverse-proxy",
    level: 2,
    question: "反向代理能承担哪些职责？SSL终结的利弊是什么？",
    answer: "反向代理能承担的职责：负载均衡（分发请求）、SSL终结（解密HTTPS后端用明文）、缓存（缓存响应减少后端压力）、安全过滤（WAF拦截攻击）、限流（控制请求速率）、请求路由（按URL/域名分发到不同后端）、协议转换（HTTP转gRPC）。SSL终结利弊：利——后端无需配SSL证书简化部署、Nginx可查看HTTP内容做路由和WAF、证书集中管理；弊——Nginx到后端是明文传输，同机房内网可接受，跨机房需加IPSec或让后端也启用HTTPS（端到端加密）。",
    tags: ["反向代理", "SSL终结", "职责"],
  },
  {
    id: "isn-rp-3",
    chapter: "isn-reverse-proxy",
    level: 3,
    question: "API网关的六大核心功能是什么？",
    answer: "API网关六大核心功能：①请求路由——按URL/域名分发到不同后端微服务 ②认证鉴权——统一校验JWT Token/OAuth2，无效返回401 ③限流熔断——控制请求速率防止雪崩，超限返回429 ④协议转换——HTTP↔gRPC/HTTP↔WebSocket ⑤日志监控——记录请求日志和指标（请求量/延迟/错误率） ⑥响应聚合——BFF模式一个请求聚合多个后端响应。代表实现：Kong、Spring Cloud Gateway、APISIX。",
    tags: ["API网关", "认证", "限流", "协议转换"],
  },
  {
    id: "isn-rp-4",
    chapter: "isn-reverse-proxy",
    level: 4,
    question: "令牌桶和漏桶限流算法有什么区别？各适合什么场景？",
    answer: "令牌桶：桶以固定速率补充令牌（如10个/秒），桶有最大容量（如100）。请求消耗令牌——有令牌放行无则拒绝。允许短时突发（桶满时100个请求瞬间通过），长期平均速率受补充速率限制。漏桶：桶以固定速率漏出请求（如10个/秒），桶满则拒绝。无论来多少请求输出恒定，不允许突发。区别：令牌桶允许突发流量（适合实际业务有波峰的场景），漏桶输出恒定平滑（适合需要严格匀速的场景如对接外部限速API）。生产环境通常选令牌桶——业务流量天然有突发，令牌桶既能限流又不至于在突发时完全拒绝合理请求。Nginx的limit_req模块默认用漏桶（可配置burst允许突发）。",
    tags: ["令牌桶", "漏桶", "限流算法", "突发流量"],
  },
];
