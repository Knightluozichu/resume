import type { ReviewQuestion } from "./types";

export const ilhHttpsSecurityQuestions: ReviewQuestion[] = [
  {
    id: "ilh-hs-1",
    chapter: "ilh-https-security",
    level: 1,
    question: "HTTP有什么安全缺陷？HTTPS如何解决？",
    answer: "HTTP的三个安全缺陷：①明文传输——通信内容可被窃听 ②无法验证身份——可能连接到假冒服务器（中间人攻击）③无法验证完整性——内容可被篡改。HTTPS通过加密（解决窃听）、认证（解决身份伪造）、完整性保护（解决篡改）来解决。HTTPS = HTTP + 加密 + 认证 + 完整性保护。",
    tags: ["HTTP缺陷", "HTTPS", "安全"],
  },
  {
    id: "ilh-hs-2",
    chapter: "ilh-https-security",
    level: 2,
    question: "对称加密和非对称加密各有什么优缺点？HTTPS如何结合使用？",
    answer: "对称加密（共享密钥加密）：加密解密用同一密钥，速度快适合大量数据，缺点是密钥分配困难。非对称加密（公开密钥加密）：公钥加密私钥解密，无需传递私钥安全性高，缺点是速度慢不适合大量数据。HTTPS采用混合加密——用非对称加密在握手阶段安全传递对称密钥，再用对称密钥高效传输数据，兼顾安全与性能。",
    tags: ["对称加密", "非对称加密", "混合加密"],
  },
  {
    id: "ilh-hs-3",
    chapter: "ilh-https-security",
    level: 2,
    question: "简述SSL/TLS握手流程。",
    answer: "SSL/TLS握手流程：①客户端发送Client Hello（支持的TLS版本/加密套件/随机数A）②服务器回复Server Hello（选定套件/随机数B）并发送服务器证书和公钥 ③客户端验证证书，生成预主密钥，用服务器公钥加密后发送 ④双方用随机数A+随机数B+预主密钥生成相同的会话密钥，切换到加密通信。之后用会话密钥进行对称加密通信。",
    tags: ["SSL", "TLS", "握手流程"],
  },
  {
    id: "ilh-hs-4",
    chapter: "ilh-https-security",
    level: 3,
    question: "为什么需要数字证书？CA的作用是什么？",
    answer: "需要数字证书是因为非对称加密中客户端需要获取服务器公钥，但可能被中间人冒充发送假公钥——客户端无法分辨公钥是否属于真正的服务器。数字证书由CA（证书颁发机构）签发，证明公钥所有者身份。CA的作用是作为可信第三方——客户端预装CA根证书信任CA，CA验证服务器身份后签发证书，形成信任链：客户端信任CA→CA担保服务器→客户端信任服务器。客户端通过验证CA签名来确认证书真实性。",
    tags: ["数字证书", "CA", "中间人攻击", "信任链"],
  },
];
