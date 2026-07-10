import { ReviewQuestion } from "./types";

export const hdgHttpMessagesQuestions: ReviewQuestion[] = [
  {
    id: "hdg-http-messages-1",
    chapter: "hdg-http-messages",
    level: 1,
    question: `HTTP 请求报文和响应报文的三段式结构分别是什么？空行的作用是什么？`,
    answer:
      `请求报文：①请求行（方法 URL 版本）②首部（键值对）③请求体。响应报文：①状态行（版本 状态码 短语）②首部 ③响应体。空行（CRLF）标志首部块结束——服务器/客户端读到空行就知道首部已读完，后面是主体。`,
    tags: ["HTTP", "报文结构", "请求", "响应"],
  },
  {
    id: "hdg-http-messages-2",
    chapter: "hdg-http-messages",
    level: 2,
    question: `持久连接和非持久连接有什么区别？为什么 HTTP/1.1 默认使用持久连接？`,
    answer:
      `非持久连接每个请求建立独立 TCP 连接（每对象 2 RTT），持久连接复用 TCP 连接（首个 2 RTT，后续 1 RTT）。HTTP/1.1 默认持久连接的原因：①减少 TCP 握手延迟 ②减少服务器连接开销 ③TCP 拥塞窗口复用提高吞吐 ④流水线模式进一步减少等待。`,
    tags: ["HTTP", "持久连接", "TCP", "延迟"],
  },
  {
    id: "hdg-http-messages-3",
    chapter: "hdg-http-messages",
    level: 1,
    question: `HTTP 方法的幂等性和安全性分别是什么？哪些方法是幂等的？`,
    answer:
      `幂等性：同一请求执行多次与一次效果相同。安全性：不修改服务器状态。GET/PUT/DELETE 是幂等的，POST 不是。GET/HEAD/OPTIONS 是安全的。幂等性影响重试策略（幂等可安全重试）和缓存行为（安全方法可缓存）。`,
    tags: ["HTTP", "方法", "幂等性", "安全性"],
  },
  {
    id: "hdg-http-messages-4",
    chapter: "hdg-http-messages",
    level: 2,
    question: `HTTP 状态码的五大分类是什么？304 和 401 分别表示什么？`,
    answer:
      `五大分类：1xx 信息性、2xx 成功、3xx 重定向、4xx 客户端错误、5xx 服务器错误。304 Not Modified 表示缓存副本仍有效（条件请求验证通过，无响应体）。401 Unauthorized 表示需要认证（服务器返回 WWW-Authenticate 挑战）。`,
    tags: ["HTTP", "状态码", "缓存", "认证"],
  },
];
