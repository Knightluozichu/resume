import type { ReviewQuestion } from "./types";

export const ilhLearningMapQuestions: ReviewQuestion[] = [
  {
    id: "ilh-lm-1",
    chapter: "ilh-learning-map",
    level: 1,
    question: `全书分为哪八大知识域？各自的核心内容是什么？`,
    answer: `八大知识域：①HTTP基础（TCP/IP协议栈/URI/请求响应模型/无状态）②HTTP方法（GET/POST/PUT/DELETE/幂等性/安全方法）③状态码（2xx/3xx/4xx/5xx分类与含义）④HTTP首部（通用/请求/响应/实体首部/Cookie机制）⑤HTTPS与安全（加密原理/SSL-TLS握手/数字证书/公钥密码体系）⑥认证与授权（BASIC/Digest/Session+Cookie/Token+JWT）⑦缓存机制（强缓存/协商缓存/Cache-Control/ETag）⑧Web架构与未来（HTTP2/HTTP3/WebSocket/CDN/代理网关隧道）。`,
    tags: ["学习地图", "知识体系", "概览"],
  },
  {
    id: "ilh-lm-2",
    chapter: "ilh-learning-map",
    level: 1,
    question: `HTTP协议的四个核心设计哲学是什么？`,
    answer: `四个核心设计哲学：①无状态——服务器不保留客户端状态，每个请求独立处理 ②请求-响应——客户端发起请求，服务器返回响应，一问一答模型 ③文本协议——HTTP报文是纯文本，可读性好易于调试 ④可扩展首部——通过首部字段扩展功能，不改变协议核心。`,
    tags: ["HTTP", "设计哲学", "无状态"],
  },
  {
    id: "ilh-lm-3",
    chapter: "ilh-learning-map",
    level: 2,
    question: `推荐的学习路径是什么？为什么不能跳过HTTP基础？`,
    answer: `推荐路径：HTTP基础→方法/状态码→首部→HTTPS→认证→缓存→Web架构→复习。不能跳过基础因为每步是下一步的前提：不懂TCP/IP协议栈无法理解HTTP在网络中的位置；不懂请求-响应模型无法理解方法/状态码/首部；不懂无状态特性无法理解为什么需要Cookie/Session/Token；不懂明文传输无法理解为什么需要HTTPS加密。`,
    tags: ["学习路径", "递进逻辑"],
  },
  {
    id: "ilh-lm-4",
    chapter: "ilh-learning-map",
    level: 2,
    question: `「无状态」为什么既是优点也是缺点？`,
    answer: `无状态的优点是简化了服务器设计、提高了可扩展性——任意服务器都能处理任意请求，无需共享状态。缺点是无法保持用户登录状态等会话信息，需要通过Cookie和Session机制来弥补，这引入了额外的状态管理复杂性。`,
    tags: ["无状态", "优缺点", "Cookie"],
  },
];
