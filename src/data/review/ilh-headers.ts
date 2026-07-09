import type { ReviewQuestion } from "./types";

export const ilhHeadersQuestions: ReviewQuestion[] = [
  {
    id: "ilh-hd-1",
    chapter: "ilh-headers",
    level: 1,
    question: "HTTP首部分为哪四大类？各举两个例子。",
    answer: "四大类：①通用首部（请求和响应都能用，如Cache-Control/Connection/Date）②请求首部（仅请求用，如Host/Accept/User-Agent/Authorization）③响应首部（仅响应用，如Server/Location/Set-Cookie/WWW-Authenticate）④实体首部（描述消息体，如Content-Type/Content-Length/ETag/Last-Modified）。",
    tags: ["首部分类", "通用首部", "请求首部", "响应首部", "实体首部"],
  },
  {
    id: "ilh-hd-2",
    chapter: "ilh-headers",
    level: 2,
    question: "Cookie机制如何工作？它如何弥补HTTP无状态？",
    answer: "Cookie工作流程：①服务器在响应中通过Set-Cookie首部下发Cookie（如Set-Cookie: sid=abc123）②客户端保存Cookie ③后续对该域的请求自动携带Cookie首部（如Cookie: sid=abc123）④服务器根据Cookie识别同一客户端。Cookie弥补HTTP无状态——服务器能将多个请求关联到同一用户，实现登录状态保持。Cookie是请求首部，Set-Cookie是响应首部。",
    tags: ["Cookie", "Set-Cookie", "无状态", "会话管理"],
  },
  {
    id: "ilh-hd-3",
    chapter: "ilh-headers",
    level: 2,
    question: "Cookie有哪些安全属性？各自的作用是什么？",
    answer: "Cookie安全属性：①HttpOnly——禁止JavaScript通过document.cookie访问该Cookie，防止XSS攻击窃取Cookie ②Secure——该Cookie只在HTTPS连接中发送，防止中间人窃听 ③SameSite=Strict/Lax/None——控制跨站请求是否发送Cookie，防CSRF攻击（Strict完全不发，Lax部分发送，None允许但需配合Secure）。会话Cookie应同时设置HttpOnly+Secure+SameSite。",
    tags: ["Cookie", "HttpOnly", "Secure", "SameSite", "安全"],
  },
  {
    id: "ilh-hd-4",
    chapter: "ilh-headers",
    level: 3,
    question: "什么是内容协商？Accept和Content-Type首部的作用是什么？",
    answer: "内容协商是客户端通过Accept系列首部告知服务器能处理的内容类型，服务器返回最合适版本的过程。Accept是请求首部，告知服务器客户端能接受的MIME类型（如Accept: text/html, application/json）。Content-Type是实体首部，描述请求/响应主体的实际MIME类型（如Content-Type: application/json; charset=utf-8），告诉接收方如何解析消息体。Accept系列还包括Accept-Encoding（编码）、Accept-Language（语言）。",
    tags: ["内容协商", "Accept", "Content-Type", "MIME"],
  },
];
