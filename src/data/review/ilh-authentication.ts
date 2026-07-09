import type { ReviewQuestion } from "./types";

export const ilhAuthenticationQuestions: ReviewQuestion[] = [
  {
    id: "ilh-au-1",
    chapter: "ilh-authentication",
    level: 1,
    question: "认证和授权有什么区别？各自对应的HTTP状态码是什么？",
    answer: "认证（Authentication）验证「你是谁？」——验证用户身份，手段如密码/验证码/生物识别，失败返回401 Unauthorized。授权（Authorization）控制「你能做什么？」——控制资源访问权限，手段如角色/权限/ACL，失败返回403 Forbidden。先认证再授权——先确认身份，再检查权限。",
    tags: ["认证", "授权", "401", "403"],
  },
  {
    id: "ilh-au-2",
    chapter: "ilh-authentication",
    level: 2,
    question: "BASIC认证的工作原理是什么？它有什么安全问题？",
    answer: "BASIC认证流程：①服务器返回401+WWW-Authenticate: Basic ②客户端将「用户名:密码」做Base64编码后放在Authorization首部发送 ③服务器解码验证返回200或401。安全问题：Base64只是编码不是加密，解码即可还原明文密码，因此BASIC认证必须配合HTTPS使用，否则等于明文传输密码。现在BASIC认证很少单独使用。",
    tags: ["BASIC认证", "Base64", "安全问题"],
  },
  {
    id: "ilh-au-3",
    chapter: "ilh-authentication",
    level: 2,
    question: "Session认证和Token认证各有什么优缺点？",
    answer: "Session认证优点：服务器可主动注销Session、管理用户状态。缺点：有状态（服务器需存储Session占内存）、扩展性差（多服务器需共享Session如用Redis）、有CSRF风险（Cookie自动发送）。Token/JWT认证优点：无状态（服务器不存储，任意服务器可验证）、扩展性好（适合分布式）、无CSRF风险。缺点：Token签发后过期前一直有效难以主动注销（需维护黑名单）、Token较大每次请求都携带。",
    tags: ["Session", "Token", "JWT", "认证对比"],
  },
  {
    id: "ilh-au-4",
    chapter: "ilh-authentication",
    level: 3,
    question: "JWT的结构是什么？为什么说JWT是无状态的？",
    answer: "JWT由三部分组成：Header（头部，指定签名算法如HS256和类型JWT）+ Payload（载荷，包含用户信息声明如sub/name/exp）+ Signature（签名，用密钥对Base64(Header)+Base64(Payload)做HMAC签名）。三部分用点号连接。JWT是无状态的因为它是自包含的——Payload中直接包含用户信息，服务器只需用密钥验证签名即可信任Payload内容，无需查Session数据库。任意服务器只要有密钥就能验证Token，天然适合分布式系统。",
    tags: ["JWT", "无状态", "Token", "分布式"],
  },
];
