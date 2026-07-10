import type { ReviewQuestion } from "./types";

export const cntNetworkSecurityQuestions: ReviewQuestion[] = [
  {
    id: "cnt-ns-1",
    chapter: "cnt-network-security",
    level: 1,
    question: `对称加密和公钥加密各自的特点是什么？为什么实际中使用混合加密？`,
    answer: `对称加密：发送方和接收方共享同一密钥，加密解密用同一密钥（如AES）。速度快适合大量数据，但密钥分发困难。公钥加密：密钥对（公钥公开+私钥保密），公钥加密只能私钥解密，私钥签名可用公钥验证（如RSA）。解决密钥分发问题支持数字签名，但计算慢（比对称慢100-1000倍）。实际使用混合加密的原因：公钥加密太慢不适合大量数据，对称加密密钥分发困难。混合加密先用公钥加密（或Diffie-Hellman交换）协商对称会话密钥（128-256位），然后用对称密钥加密大量数据，兼顾安全性和效率。`,
    tags: ["对称加密", "公钥加密", "混合加密", "AES", "RSA"],
  },
  {
    id: "cnt-ns-2",
    chapter: "cnt-network-security",
    level: 2,
    question: `TLS握手的主要步骤是什么？前向安全为什么重要？`,
    answer: `TLS握手主要步骤：①ClientHello——客户端发送密码套件列表和客户端随机数 ②ServerHello+证书——服务器选定密码套件，返回服务器随机数和证书（含公钥） ③客户端验证证书（CA签名链、域名、有效期、吊销状态） ④密钥交换——用RSA或Diffie-Hellman协商预主密钥 ⑤双方用预主密钥+两个随机数派生会话密钥 ⑥ChangeCipherSpec+Finished——切换加密模式，加密验证握手完整性。前向安全重要的原因：如果攻击者录制了所有加密流量，日后获取服务器私钥可解密所有历史流量。前向安全使用临时Diffie-Hellman（DHE/ECDHE），每次连接生成临时密钥对，连接结束后销毁，即使私钥泄露也无法恢复历史流量。TLS 1.3强制前向安全。`,
    tags: ["TLS", "握手", "前向安全", "证书"],
  },
  {
    id: "cnt-ns-3",
    chapter: "cnt-network-security",
    level: 2,
    question: `IPsec的隧道模式和传输模式有什么区别？VPN如何使用IPsec？`,
    answer: `传输模式：保护IP载荷，IP头不变，适合主机到主机直接通信。隧道模式：将整个原始IP包（含IP头）加密后封装在新IP包中，添加新IP头，适合网络到网络VPN。VPN使用IPsec隧道模式：VPN网关A将内网主机的原始IP包加密封装在新IP包中，通过互联网传输到VPN网关B，B解封装还原原始IP包转发给内网目的主机。核心协议：ESP（加密+完整性+认证）、AH（仅完整性）、IKE（密钥交换和安全关联协商）。IPsec在IP层工作，对上层透明——任何TCP/UDP流量都自动加密。`,
    tags: ["IPsec", "隧道模式", "传输模式", "VPN"],
  },
  {
    id: "cnt-ns-4",
    chapter: "cnt-network-security",
    level: 3,
    question: `防火墙的默认拒绝原则是什么？IDS和IPS的区别是什么？`,
    answer: `防火墙默认拒绝原则：只允许明确放行的流量，其余全部拒绝。这是最安全的设计——未知流量默认被阻断，需要管理员显式添加放行规则。IDS与IPS的区别：IDS（入侵检测系统）旁路部署，检测到攻击只发告警，不阻断流量；IPS（入侵防御系统）串联部署，检测到攻击直接阻断。检测方法：基于签名——匹配已知攻击特征（类似杀毒软件），准确率高但无法检测未知攻击（零日漏洞）；基于异常——建立正常行为基线，偏离则告警，可检测未知攻击但误报率高。现代防火墙通常集成IDS/IPS功能。`,
    tags: ["防火墙", "默认拒绝", "IDS", "IPS"],
  },
];
