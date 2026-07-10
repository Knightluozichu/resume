import type { ReviewQuestion } from "./types";

export const isnLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "isn-lm-1",
    chapter: "isn-learning-map",
    level: 1,
    question: `全书分为哪六大知识域？各自的核心内容是什么？`,
    answer: `六大知识域：①服务器网络基础（协议栈/TCP-UDP/端口套接字/服务器架构模型）②负载均衡机制（L4-L7负载均衡/调度算法/健康检查/会话保持）③高可用架构（冗余设计/主备双活/故障转移/VIP与VRRP）④DNS与CDN（域名解析/DNS负载均衡/CDN缓存回源/边缘节点）⑤防火墙与网络安全+反向代理网关（包过滤/状态检测/WAF/DDoS防御/ACL规则/Nginx反向代理/API网关/请求路由/限流）⑥微服务网络+性能调优（服务间通信/服务网格/Sidecar/Istio/TCP调优/零拷贝/连接池/监控链路追踪）。`,
    tags: ["学习地图", "知识体系", "概览"],
  },
  {
    id: "isn-lm-2",
    chapter: "isn-learning-map",
    level: 1,
    question: `服务端网络的四个核心设计原则是什么？`,
    answer: `四个核心设计原则：①分层架构——接入层、逻辑层、数据层各司其职，流量逐层过滤 ②流量分发——通过负载均衡将请求分散到多台服务器，避免单点过载 ③冗余容灾——关键组件至少双份，故障自动转移，服务持续可用 ④纵深防御——从网络边界到应用层逐层设防，安全不靠单点。`,
    tags: ["设计原则", "分层架构", "纵深防御"],
  },
  {
    id: "isn-lm-3",
    chapter: "isn-learning-map",
    level: 2,
    question: `推荐的学习路径是什么？为什么不能跳过服务器网络基础？`,
    answer: `推荐路径：服务器基础→负载均衡→高可用→DNS/CDN→安全/代理→微服务/性能→复习。不能跳过基础因为每步是下一步的前提：不懂TCP/UDP无法理解负载均衡的L4/L7差异；不懂端口与套接字无法理解反向代理的请求路由；不懂服务器架构模型无法理解高可用的主备/双活设计；不懂协议栈无法理解性能调优的TCP参数。`,
    tags: ["学习路径", "递进逻辑"],
  },
  {
    id: "isn-lm-4",
    chapter: "isn-learning-map",
    level: 3,
    question: `如果让你设计一个电商网站的服务端网络架构，你会如何应用六大知识域？`,
    answer: `①服务器基础：选择TCP协议，用Reactor模型（Nginx）处理高并发连接 ②负载均衡：LVS(L4)前端高速分发+Nginx(L7)基于URL路由（/api到应用、/static到CDN），用加权轮询适配异构服务器 ③高可用：Nginx用Keepalived+VIP主备切换，数据库主从复制+故障转移 ④DNS/CDN：DNS+GSLB按地域调度到最近机房，CDN缓存静态资源（图片/CSS/JS） ⑤安全：ACL默认拒绝+WAF防SQL注入/XSS+DDoS流量清洗 ⑥微服务/性能：API网关统一入口，Sidecar处理服务间治理，连接池复用+零拷贝+全链路追踪。`,
    tags: ["架构设计", "综合应用", "电商"],
  },
];
