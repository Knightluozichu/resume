import { ReviewQuestion } from "./types";

export const hdgHttpsSslQuestions: ReviewQuestion[] = [
  {
    id: "hdg-https-ssl-1",
    chapter: "hdg-https-ssl",
    level: 1,
    question: `HTTPS 相比 HTTP 增加了什么？TLS 提供的三大安全保证是什么？`,
    answer:
      `HTTPS = HTTP + TLS/SSL，在 HTTP 和 TCP 之间插入 TLS 加密层，使用端口 443。三大保证：①机密性——对称加密（AES）加密数据，防窃听 ②认证——X.509 证书+CA 签名链验证服务器身份，防冒充 ③完整性——HMAC（SHA-256）防篡改。`,
    tags: ["HTTPS", "TLS", "机密性", "认证", "完整性"],
  },
  {
    id: "hdg-https-ssl-2",
    chapter: "hdg-https-ssl",
    level: 2,
    question: `描述 TLS 握手的主要步骤。为什么握手用非对称加密而数据传输用对称加密？`,
    answer:
      `TLS 握手：①ClientHello（版本+加密套件+随机数）②ServerHello+证书+随机数 ③客户端验证证书 ④ClientKeyExchange（公钥加密预主密钥）⑤双方计算会话密钥 ⑥ChangeCipherSpec+Finished。用两种加密因为非对称加密安全但慢（适合握手一次性密钥协商），对称加密快（适合大量数据传输），两者配合实现安全与性能平衡。`,
    tags: ["TLS握手", "非对称加密", "对称加密", "密钥协商"],
  },
  {
    id: "hdg-https-ssl-3",
    chapter: "hdg-https-ssl",
    level: 2,
    question: `X.509 证书的验证链是怎样的？验证过程检查哪些内容？`,
    answer:
      `验证链：服务器证书由中间 CA 签发，中间 CA 由根 CA 签发，根 CA 预装在系统/浏览器中（信任锚）。验证过程：①逐级用上级 CA 公钥验证下级证书签名 ②检查域名匹配（SAN/CN 与访问域名一致）③检查有效期（当前时间在起止时间内）。任一环节失败则浏览器显示安全警告。`,
    tags: ["X.509", "证书", "CA", "验证链", "PKI"],
  },
  {
    id: "hdg-https-ssl-4",
    chapter: "hdg-https-ssl",
    level: 1,
    question: `TLS 密码套件 TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384 各部分分别表示什么？`,
    answer:
      `密码套件四部分：①ECDHE——密钥交换算法（非对称，用于协商对称密钥）②RSA——认证算法（非对称，用于证书签名验证）③AES_256_GCM——对称加密算法（用于数据传输加密）④SHA384——哈希算法（用于完整性校验/MAC）。四者配合提供完整的 TLS 安全通信。`,
    tags: ["TLS", "密码套件", "ECDHE", "AES", "SHA"],
  },
];
