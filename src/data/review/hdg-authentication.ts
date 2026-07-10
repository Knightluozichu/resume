import { ReviewQuestion } from "./types";

export const hdgAuthenticationQuestions: ReviewQuestion[] = [
  {
    id: "hdg-authentication-1",
    chapter: "hdg-authentication",
    level: 1,
    question: `HTTP 认证的挑战-应答机制是怎样的？401 和 403 有什么区别？`,
    answer:
      `挑战-应答：①客户端请求受保护资源（无凭证）②服务器返回 401 + WWW-Authenticate 挑战 ③客户端提供凭证（Authorization 首部）④服务器验证返回 200 或 401。401 Unauthorized 表示需要认证（未提供或无效凭证），403 Forbidden 表示认证通过但无权限访问该资源。`,
    tags: ["认证", "挑战-应答", "401", "403"],
  },
  {
    id: "hdg-authentication-2",
    chapter: "hdg-authentication",
    level: 2,
    question: `Basic 认证的流程是什么？为什么必须配合 HTTPS 使用？`,
    answer:
      `Basic 认证流程：客户端将「用户名:密码」Base64 编码放入 Authorization 首部发送。必须配合 HTTPS 因为 Base64 是编码不是加密，可完全可逆解码。HTTP 明文传输时中间人可直接截获 Authorization 首部并解码出密码。HTTPS 的 TLS 加密保证凭证不被截获。`,
    tags: ["Basic认证", "Base64", "HTTPS", "安全"],
  },
  {
    id: "hdg-authentication-3",
    chapter: "hdg-authentication",
    level: 2,
    question: `Digest 认证相比 Basic 认证有什么改进？它有什么局限？`,
    answer:
      `改进：①不传输明文密码，用 MD5 哈希摘要 ②nonce 防重放攻击。局限：①MD5 已不安全（碰撞攻击）②不支持加盐（彩虹表攻击）③配置复杂 ④浏览器无法 logout。现代应用更推荐 HTTPS+Basic 或 JWT/OAuth。`,
    tags: ["Digest认证", "MD5", "nonce", "安全"],
  },
  {
    id: "hdg-authentication-4",
    chapter: "hdg-authentication",
    level: 1,
    question: `Cookie 的三个安全属性 HttpOnly、Secure、SameSite 分别防御什么攻击？`,
    answer:
      `HttpOnly：JavaScript 无法读取 Cookie，防御 XSS 窃取。Secure：Cookie 仅在 HTTPS 传输，防御中间人截获。SameSite：控制跨站请求是否携带 Cookie（Strict/Lax/None），防御 CSRF 攻击。敏感 Cookie 应同时设置三个属性。`,
    tags: ["Cookie", "HttpOnly", "Secure", "SameSite", "安全"],
  },
];
