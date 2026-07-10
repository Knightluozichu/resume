import type { ReviewQuestion } from "./types";

export const jfsAuthSecurityQuestions: ReviewQuestion[] = [
  {
    id: "jfs-auth-security-1",
    chapter: "jfs-auth-security",
    level: 2,
    question: `认证和授权的区别是什么？JWT 同时解决了吗？`,
    answer:
      `认证（authentication）是验证「你是谁」，如登录验证用户名密码。授权（authorization）是判断「你能做什么」，如这个用户能不能删除文章。JWT 主要解决认证——Payload 里存 userId/role 证明持有者身份，服务器验签信任身份。授权通常还需配合权限系统：JWT 告诉你「这是 role=admin 的用户」，至于 admin 能不能删文章要查权限表或 RBAC。JWT 的 role 字段可做粗粒度授权，细粒度仍需服务端判断。两者不能混淆：认证通过不等于有权操作，每个敏感操作仍要校验授权。`,
    tags: ["认证", "授权", "JWT"],
  },
  {
    id: "jfs-auth-security-2",
    chapter: "jfs-auth-security",
    level: 3,
    question: `CORS 是什么？为什么不能在生产用 \`cors({ origin: \"*\" })\`？`,
    answer:
      `CORS（跨域资源共享）是浏览器的安全机制：前端 JS 跨域请求时，浏览器要求目标服务器通过响应头明确放行该来源，否则拦截响应。它是「浏览器限制」不是服务器限制（curl 不受 CORS 约束）。生产中用 origin: \"*\" 的危害：①配合 credentials: true 时浏览器会拒绝（规范禁止 * 与凭证同时用）；②等于放行任意网站发跨域请求到你的 API，若用户已登录，恶意网站的请求会带上用户 Cookie（CSRF 风险）。正确做法是 origin 显式列出可信前端域名，用环境变量管理，凭证按需开启。`,
    tags: ["CORS", "跨域", "安全"],
  },
  {
    id: "jfs-auth-security-3",
    chapter: "jfs-auth-security",
    level: 3,
    question: `JWT 的 Payload 能放敏感信息吗？为什么？JWT 签发后如何吊销？`,
    answer:
      `不能。JWT 的 Payload 只是 base64 编码，不是加密——任何人都能解出来。只有 Signature 防篡改，不防窥视。把密码、密钥放进 Payload 等于明文泄露。正确做法：Payload 只放 userId/role 这类非敏感标识。JWT 签发后无法主动吊销（无状态代价），因为服务器不存 session，只要签名有效且未过期就信任。解决方式：①短有效期（如 1h）+ refresh token（长期有效，用于换新 access token，可存数据库便于吊销）；②在服务端维护黑名单（牺牲无状态，每次验签查黑名单）；③敏感操作（改密码/支付）要求重新认证。`,
    tags: ["JWT", "安全", "吊销"],
  },
  {
    id: "jfs-auth-security-4",
    chapter: "jfs-auth-security",
    level: 4,
    question: `OAuth 2.0 授权码流程的四个步骤是什么？为什么 client_secret 只在服务端？`,
    answer:
      `四步：①前端跳转到授权服务器，用户登录并同意授权；②授权服务器回调你的后端（redirect_uri），带一次性 code；③后端用 code + client_secret 向授权服务器换 access_token；④后端用 access_token 调用资源服务器取用户信息。client_secret 只在服务端是因为：前端是公开环境（代码可被反编译、网络可被抓包），secret 一旦泄露到前端，攻击者可冒充你的应用骗取用户授权。后端是受控环境，secret 不暴露给浏览器。这就是为什么 OAuth 流程必须有后端参与——前端只负责跳转和接收 code，换 token 这一步必须在服务端用 secret 完成。PKCE 是给纯前端（无后端）场景的变体，用 code_verifier 代替 secret。`,
    tags: ["OAuth", "授权码", "安全"],
  },
];
