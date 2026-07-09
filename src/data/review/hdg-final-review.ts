import { ReviewQuestion } from "../types";

export const hdgFinalReviewQuestions: ReviewQuestion[] = [
  {
    id: "hdg-final-review-1",
    chapter: "hdg-final-review",
    level: 2,
    question: "描述一个 HTTPS 请求的端到端完整流程，标注每步涉及的知识域。",
    answer:
      "①URL 解析（基础域）②DNS 查询 ③TLS 握手（安全域）④构造请求报文（基础域）⑤代理转发（基础设施域）⑥缓存查询（基础设施域）⑦认证鉴权（安全域）⑧内容协商（基础设施域）⑨服务器处理含虚拟主机路由和负载均衡（部署域）⑩响应返回 ⑪连接关闭（基础域）。一个请求贯穿全书所有章节。",
    tags: ["端到端", "请求流程", "知识整合"],
  },
  {
    id: "hdg-final-review-2",
    chapter: "hdg-final-review",
    level: 2,
    question: "代理、网关和隧道有什么区别？各举一个使用场景。",
    answer:
      "代理：同协议转发（HTTP↔HTTP），对服务器透明。场景：企业正向代理过滤上网。网关：异协议转换（HTTP↔FTP），对客户端透明。场景：HTTP/POP3 网关通过 Web 读取邮件。隧道：CONNECT 盲转发，不解析数据，双方透明。场景：HTTPS 经 HTTP 代理穿透——代理盲转发 TLS 加密数据。",
    tags: ["代理", "网关", "隧道", "对比"],
  },
  {
    id: "hdg-final-review-3",
    chapter: "hdg-final-review",
    level: 1,
    question: "HTTP 协议的五大设计原则是什么？无状态设计有什么优缺点？",
    answer:
      "五大原则：①无状态——每个请求独立 ②请求-响应——一问一答 ③文本协议——可读可调试 ④分层架构——中间层可透明插入 ⑤首部驱动——功能通过首部协商。无状态优点：简化服务器实现、提高可扩展性。缺点：状态维持需额外机制（Cookie/Session/Token）。",
    tags: ["HTTP", "设计原则", "无状态", "REST"],
  },
  {
    id: "hdg-final-review-4",
    chapter: "hdg-final-review",
    level: 2,
    question: "举例说明跨章节知识关联：缓存与代理、认证与 HTTPS、报文与 URL 之间分别有什么关系？",
    answer:
      "缓存与代理：缓存部署在代理层，代理是缓存的物理载体，条件请求经代理转发。认证与 HTTPS：Basic 认证须配 HTTPS（Base64 明文凭证需 TLS 保护），TLS 证书本身是服务器认证机制。报文与 URL：URL 路径出现在请求报文的请求行，Host 首部是 URL 的 host 部分（用于虚拟主机），URL 编码影响首部值。",
    tags: ["知识关联", "缓存", "认证", "HTTPS", "报文"],
  },
];
