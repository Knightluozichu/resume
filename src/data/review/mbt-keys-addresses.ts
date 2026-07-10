import type { ReviewQuestion } from "./types";

export const mbtKeysAddressesQuestions: ReviewQuestion[] = [
  {
    id: "mbt-keys-addresses-01",
    chapter: "mbt-keys-addresses",
    level: 1,
    question: `从私钥到比特币地址的完整推导链路是什么？`,
    answer: `推导链路为：随机数 → 私钥 k（256 位）→ 椭圆曲线乘法 K = k × G（secp256k1）→ 公钥 K → SHA256 + RIPEMD160 双哈希 → 公钥哈希（20 字节）→ 加版本前缀和校验码 → Base58Check 编码 → 比特币地址。整个链路是单向的，无法从地址反推私钥。`,
    tags: ["推导链路", "私钥", "公钥", "地址", "Base58Check"],
  },
  {
    id: "mbt-keys-addresses-02",
    chapter: "mbt-keys-addresses",
    level: 2,
    question: `为什么椭圆曲线乘法是单向的？这在比特币中有什么安全意义？`,
    answer: `椭圆曲线 secp256k1 上 k × G 已知 k 求 K 很快，但已知 K 反求 k 是离散对数问题，目前没有多项式时间解法。这意味着公钥可以公开而不泄露私钥。比特币正是利用这一单向性：私钥签名、公钥验证，攻击者即使知道公钥也无法伪造签名，保障了资金安全。`,
    tags: ["椭圆曲线", "单向性", "离散对数", "安全原理"],
  },
  {
    id: "mbt-keys-addresses-03",
    chapter: "mbt-keys-addresses",
    level: 2,
    question: `Base58Check 编码相比 Base58 增加了什么？为什么需要它？`,
    answer: `Base58Check 在 Base58 基础上增加了 4 字节校验码（对「版本前缀 + 公钥哈希」做双 SHA256 取前 4 字节）。校验码的作用是检测输入错误：输入一个错误字符会导致校验失败，避免用户误将比特币发到拼错的地址。这是防止因笔误丢失资金的重要安全机制。`,
    tags: ["Base58Check", "校验码", "错误检测", "安全机制"],
  },
  {
    id: "mbt-keys-addresses-04",
    chapter: "mbt-keys-addresses",
    level: 3,
    question: `P2PKH、P2SH 和 Bech32 三种地址的区别和使用场景是什么？`,
    answer: `P2PKH（1 开头，版本字节 0x00）：支付到公钥哈希，传统地址用 Base58Check 编码，最常见。P2SH（3 开头，版本字节 0x05）：支付到脚本哈希，支持多签等复杂脚本，收款方只需提供脚本哈希。Bech32（bc1 开头）：隔离见证原生地址，用 Bech32 编码，见证数据移出交易，手续费更低。现代推荐使用 Bech32 以享受隔离见证优势。`,
    tags: ["P2PKH", "P2SH", "Bech32", "地址类型", "隔离见证"],
  },
];
