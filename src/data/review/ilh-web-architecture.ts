import type { ReviewQuestion } from "./types";

export const ilhWebArchitectureQuestions: ReviewQuestion[] = [
  {
    id: "ilh-wa-1",
    chapter: "ilh-web-architecture",
    level: 1,
    question: `HTTP/1.1相比HTTP/1.0有哪些核心改进？`,
    answer: `HTTP/1.1的核心改进：①持久连接（Keep-Alive）——一个TCP连接可发送多个请求，避免每次请求都重新建立连接 ②管道化——可连续发送请求不等响应（但浏览器普遍禁用，队头阻塞） ③Host首部——支持虚拟主机（一个IP多个域名） ④范围请求——Range首部支持断点续传 ⑤缓存控制——Cache-Control/ETag等增强缓存机制。`,
    tags: ["HTTP1.0", "HTTP1.1", "持久连接", "虚拟主机"],
  },
  {
    id: "ilh-wa-2",
    chapter: "ilh-web-architecture",
    level: 2,
    question: `什么是队头阻塞？HTTP/2和HTTP/3如何解决？`,
    answer: `队头阻塞是多个请求复用同一连接时，前面请求处理慢阻塞后面请求的现象。HTTP/1.1管道化存在应用层队头阻塞——必须按序响应，第一个响应慢后续全等。HTTP/2通过多路复用解决了应用层队头阻塞——将请求/响应拆为二进制帧，多个请求的帧在同一TCP连接上并行传输。但TCP层仍有队头阻塞——TCP保证有序，一个包丢了后面全等。HTTP/3改用QUIC/UDP彻底消除队头阻塞。`,
    tags: ["队头阻塞", "HTTP2", "HTTP3", "多路复用", "QUIC"],
  },
  {
    id: "ilh-wa-3",
    chapter: "ilh-web-architecture",
    level: 2,
    question: `WebSocket和传统HTTP有什么区别？适用什么场景？`,
    answer: `传统HTTP是请求-响应模型——只有客户端能发起请求，服务器不能主动推送。WebSocket建立连接后是全双工通信——服务器可主动推送消息，客户端也可随时发送。WebSocket通过HTTP Upgrade握手建立连接后升级协议，建立持久双向连接。适用场景：聊天室、实时通知、股票行情、协同编辑等需要服务器主动推送的实时通信场景。`,
    tags: ["WebSocket", "全双工", "实时通信"],
  },
  {
    id: "ilh-wa-4",
    chapter: "ilh-web-architecture",
    level: 3,
    question: `XSS和CSRF是什么？如何防御？`,
    answer: `XSS（跨站脚本攻击）：攻击者向页面注入恶意JavaScript，在其他用户浏览器中执行，窃取Cookie或篡改页面。防御：输出HTML实体转义、CSP（限制脚本来源）、HttpOnly Cookie防窃取。CSRF（跨站请求伪造）：诱导已登录用户在不知情下发送请求（利用Cookie自动携带）。防御：CSRF Token（请求携带随机Token攻击者无法获取）、Referer检查、SameSite Cookie属性。Token认证不依赖Cookie天然免疫CSRF。`,
    tags: ["XSS", "CSRF", "Web安全", "防御"],
  },
];
