import type { ReviewQuestion } from "./types";

export const metAccountsKeysQuestions: ReviewQuestion[] = [
  {
    id: "met-accounts-keys-01",
    chapter: "met-accounts-keys",
    level: 1,
    question: `描述以太坊从私钥到地址的完整推导链，每一步用什么算法？`,
    answer: `推导链为：① 私钥——256 位随机数，使用 secp256k1 椭圆曲线；② 公钥——私钥经椭圆曲线乘法得到 512 位（x,y 坐标）；③ 公钥哈希——对公钥做 Keccak-256 哈希，取后 20 字节；④ 地址——加 0x 前缀得到 42 字符地址。整个过程单向不可逆。`,
    tags: ["密钥推导", "私钥", "公钥", "地址", "secp256k1", "Keccak-256"],
  },
  {
    id: "met-accounts-keys-02",
    chapter: "met-accounts-keys",
    level: 2,
    question: `ECDSA 签名的 r、s、v 分别是什么？v 的作用是什么？`,
    answer: `ECDSA 签名产出 r、s、v 三元组。r 和 s 是签名的数学分量，由椭圆曲线运算生成。v 是恢复标识符（recovery id），用于从签名和消息哈希反推出签名者的公钥，从而验证签名者地址。v 还包含链 ID 信息，用于防止跨链重放攻击。`,
    tags: ["ECDSA", "签名", "rsv", "恢复标识符", "防重放"],
  },
  {
    id: "met-accounts-keys-03",
    chapter: "met-accounts-keys",
    level: 2,
    question: `EIP-55 地址校验的原理是什么？它如何检测输入错误？`,
    answer: `EIP-55 对地址做 Keccak-256 哈希，按哈希结果的每一位决定对应地址字符的大小写：若哈希对应位大于等于 8，则地址字符大写，否则小写。这不改变地址本身（地址本不分大小写），但能检测输入错误——输错一个字符会导致大小写校验失败。大多数钱包和交易所默认使用 EIP-55 编码。`,
    tags: ["EIP-55", "地址校验", "Keccak-256", "大小写编码"],
  },
  {
    id: "met-accounts-keys-04",
    chapter: "met-accounts-keys",
    level: 3,
    question: `EOA 与 CA 有哪些区别？为什么说合约账户不能主动发起交易？`,
    answer: `EOA 由私钥控制，可主动发起交易，状态仅含 nonce 和余额，无代码无存储。CA 由合约代码控制，含 EVM 字节码和存储，状态含余额+nonce+存储+代码，不能主动发起交易——因为合约没有私钥，无法对交易签名。合约只能被 EOA 发起的交易或其他合约调用时被动执行。EOA 是交易发起者，CA 是执行者，这是以太坊账户模型的核心约束。`,
    tags: ["EOA", "CA", "账户模型", "交易发起", "私钥"],
  },
];
