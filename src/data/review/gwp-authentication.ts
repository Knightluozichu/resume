import type { ReviewQuestion } from "./types";

/** 认证 复习题 */
export const gwpAuthenticationQuestions: ReviewQuestion[] = [
  {
    id: "gwp-authentication-1",
    chapter: "gwp-authentication",
    level: 1,
    question: `JWT 由哪三部分组成？每部分的作用是什么？`,
    answer: `JWT 由 Header.Payload.Signature 三部分用点号连接组成。Header：JSON 对象，指定签名算法和类型（如 {\"alg\":\"HS256\",\"typ\":\"JWT\"}）。Payload：JSON 对象，包含声明（Claims）——用户 ID、过期时间等，Base64 编码后可被解码读取（不可放敏感信息）。Signature：用密钥对 Header+Payload 签名的结果，防止篡改——验证时重新计算签名并比对。`,
    tags: ["JWT", "结构", "基础"],
  },
  {
    id: "gwp-authentication-2",
    level: 2,
    chapter: "gwp-authentication",
    question: `Session-Cookie 和 JWT 的核心区别是什么？各自适合什么场景？`,
    answer: `核心区别在\"状态\"。Session-Cookie 有状态：服务器存储 Session 数据，Cookie 只存 Session ID。优点是可主动注销、安全可控；缺点是多服务器需共享 Session（Redis）、扩展复杂。适合传统 Web 应用、单体应用。JWT 无状态：令牌自包含用户信息和签名，服务器验签即可，不存储状态。优点是无需 Session 存储、天然支持分布式；缺点是无法主动注销（需黑名单）、Payload 可被解码。适合 API 服务、微服务、移动端、SSO。`,
    tags: ["Session", "JWT", "对比", "理解"],
  },
  {
    id: "gwp-authentication-3",
    level: 3,
    chapter: "gwp-authentication",
    question: `为什么密码不能用 MD5/SHA256 存储？bcrypt 的什么特性使其适合密码存储？`,
    answer: `MD5/SHA256 设计目的是\"快\"——GPU 每秒可计算数十亿次，数据库泄露后暴力破解成本极低。且无内置 salt，相同密码哈希相同，易受彩虹表攻击。bcrypt 适合密码存储因为：1) 自适应成本因子（Cost）——可随硬件提升增大，保持破解成本始终高昂（Cost=10 约需 60ms，Cost=12 约 240ms）；2) 内置 salt——每次哈希随机生成 salt 并嵌入结果，相同密码每次哈希不同，免疫彩虹表；3) 故意慢——与 MD5 的\"快\"相反，是安全特性。Go 中用 golang.org/x/crypto/bcrypt：GenerateFromPassword 生成哈希，CompareHashAndPassword 验证。`,
    tags: ["密码安全", "bcrypt", "XSS"],
  },
  {
    id: "gwp-authentication-4",
    level: 4,
    chapter: "gwp-authentication",
    question: `Cookie 的 HttpOnly、Secure、SameSite 三个安全属性各自防止什么攻击？如何组合使用？`,
    answer: `HttpOnly：禁止 JavaScript 通过 document.cookie 访问 Cookie，防止 XSS 攻击窃取 Session。Secure：Cookie 只通过 HTTPS 连接发送，防止中间人（MITM）在 HTTP 中截获。SameSite：控制跨站请求是否携带 Cookie——Strict 完全禁止跨站（防 CSRF 最强但影响体验）、Lax 允许顶层导航携带（默认值，平衡安全体验）、None 允许跨站（需配合 Secure）。组合使用：Set-Cookie: session=abc; HttpOnly; Secure; SameSite=Strict 构成深度防御——HttpOnly 防 XSS 窃取、Secure 防传输窃听、SameSite 防 CSRF 跨站利用。三者缺一都会留下攻击面。HTTPS 是硬性前提——没有 HTTPS，Secure 和 SameSite 都无意义。`,
    tags: ["Cookie安全", "XSS", "CSRF", "HTTPS", "综合"],
  },
];
