import type { ReviewQuestion } from "./types";

export const gncEncryptionQuestions: ReviewQuestion[] = [
  {
    id: "gnc-encryption-1",
    chapter: "gnc-encryption",
    level: 2,
    question: "游戏通信面临的三大威胁是什么？各自如何防御？",
    answer:
      "三大威胁：①窃听——攻击者抓包读取明文内容（密码、道具、坐标），防御用加密把明文变密文；②篡改——攻击者修改传输中的数据包（把移动 1 米改成 100 米），防御用认证加密（AEAD）让篡改被检测到；③重放——攻击者录下「拾取极品装备」的包反复发送，防御用序号+时间戳让旧包被拒绝。三层防御分别对应加密、认证标签、序号防重放，缺一不可。",
    tags: ["安全威胁", "窃听", "篡改", "重放"],
  },
  {
    id: "gnc-encryption-2",
    chapter: "gnc-encryption",
    level: 3,
    question: "AES-GCM 如何同时防窃听和防篡改？为什么适合游戏数据包加密？",
    answer:
      "AES-GCM 是 AEAD（认证加密）算法，一个操作同时完成两件事：①加密——用 AES-CTR 把明文加密成密文防窃听；②认证——用 Galois 域乘法计算 16 字节认证标签附在密文后。解密时先验证 tag，不匹配说明被篡改则丢弃。适合游戏的原因：①对称加密速度快，现代 CPU 有 AES-NI 硬件指令，加密 100 字节包不到 1 微秒；②一个算法同时防窃听和篡改，不需要额外算 HMAC，效率高于两步方案；③每包独立加密，适合 UDP 的不可靠无序特性。",
    tags: ["AES-GCM", "AEAD", "加密", "认证"],
  },
  {
    id: "gnc-encryption-3",
    chapter: "gnc-encryption",
    level: 3,
    question: "ECDHE 的「前向保密」是什么意思？为什么对游戏重要？",
    answer:
      "前向保密指即使服务器的长期私钥将来被泄露，也无法解密过去已传输的通信内容。ECDHE 每次连接都生成临时（Ephemeral）公私钥对用于密钥交换，共享密钥只存在于内存中、连接结束即销毁。攻击者即使日后拿到长期私钥，也无法还原已销毁的临时密钥对，因而无法解密历史抓包。对游戏尤为重要：玩家可能长期录制网络流量，如果没有前向保密，服务器密钥一旦泄露所有历史通信（含密码、交易）都暴露。",
    tags: ["ECDHE", "前向保密", "密钥交换"],
  },
  {
    id: "gnc-encryption-4",
    chapter: "gnc-encryption",
    level: 4,
    question: "DTLS 如何为 UDP 提供 TLS 级别的安全保障？它针对 UDP 做了哪些适配？",
    answer:
      "DTLS（Datagram TLS）把 TLS 的加密+认证+完整性保证搬到 UDP 上。针对 UDP 不可靠性的适配：①握手包加序号和重传机制——TLS 依赖 TCP 的可靠握手，DTLS 自己实现握手包重传防丢包导致握手失败；②记录层独立加密每个包——TLS 面向流可以跨包做 MAC，DTLS 每个包独立加密+认证，一个包丢不影响其他包的解密；③防重放窗口——用序号窗口拒绝重放包。DTLS 提供了 TLS 级别的安全，是 QUIC 安全层的基础，游戏可直接用 DTLS 或借鉴其设计实现更轻量的包加密。",
    tags: ["DTLS", "TLS", "UDP", "安全"],
  },
];
