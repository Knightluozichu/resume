import { ReviewQuestion } from "./types";

export const hdgLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "hdg-learning-map-1",
    chapter: "hdg-learning-map",
    level: 1,
    question: `HTTP 权威指南的四大知识域分别解决什么核心问题？`,
    answer:
      `四大知识域：①HTTP 基础——解决「报文怎么构造、资源怎么定位」，是后续章节的地基 ②中间基础设施——解决「中间层怎么转发/缓存/转换请求」 ③安全与认证——解决「身份怎么验证、通信怎么加密」 ④部署与整合——解决「Web 站点怎么部署、全书知识怎么串联」。`,
    tags: ["HTTP", "知识体系", "四大知识域"],
  },
  {
    id: "hdg-learning-map-2",
    chapter: "hdg-learning-map",
    level: 2,
    question: `描述一个 HTTPS 请求从发起到收到响应的完整生命周期的主要阶段。`,
    answer:
      `URL 解析 → DNS 查询 → TCP/TLS 连接建立 → 代理转发 → 缓存查询 → 认证鉴权 → 内容协商 → 服务器处理（虚拟主机路由+负载均衡）→ 响应返回 → 连接关闭（持久连接保持或释放）。`,
    tags: ["HTTP", "请求生命周期", "端到端流程"],
  },
  {
    id: "hdg-learning-map-3",
    chapter: "hdg-learning-map",
    level: 1,
    question: `HTTP 的四大设计原则是什么？无状态协议有什么优缺点？`,
    answer:
      `四大原则：①无状态——每个请求独立 ②请求-响应——一问一答 ③文本协议——可读可调试 ④分层扩展——代理/网关/缓存可透明插入。无状态的优点：简化服务器实现、提高可扩展性（任何服务器都能处理任何请求）。缺点：状态维持需要额外机制（Cookie/Session/Token）。`,
    tags: ["HTTP", "无状态", "设计原则"],
  },
  {
    id: "hdg-learning-map-4",
    chapter: "hdg-learning-map",
    level: 2,
    question: `四大知识域之间有什么依赖关系？举例说明跨域知识关联。`,
    answer:
      `依赖链：基础 → 基础设施（代理转发需理解报文）→ 安全（认证首部在报文中，加密在连接上）→ 部署（虚拟主机靠 Host 首部，负载均衡靠代理）。跨域关联示例：缓存依赖代理作为载体（基础设施域内），Basic 认证依赖 HTTPS 保证安全（安全域内），虚拟主机靠 Host 首部而 Host 是报文首部（基础↔部署）。`,
    tags: ["HTTP", "知识关联", "依赖关系"],
  },
];
