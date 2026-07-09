import type { ReviewQuestion } from "./types";

export const bpWalletsAccountsQuestions: ReviewQuestion[] = [
  {
    id: "bp-wallet-01",
    chapter: "bp-wallets-accounts",
    level: "L1",
    question: "区块链钱包的核心功能是什么？私钥、公钥和地址之间是什么关系？",
    answer: "钱包的核心功能是管理密钥对和签名交易，而非存储资产（资产在链上）。派生关系为：私钥通过椭圆曲线乘法生成公钥 → 公钥经哈希运算（SHA-256 + RIPEMD-160）生成公钥哈希 → 加版本前缀并 Base58Check 编码得到区块链地址。私钥是根本，丢失私钥等于丢失资产控制权。",
    tags: ["钱包", "私钥", "公钥", "地址", "密钥派生"],
  },
  {
    id: "bp-wallet-02",
    chapter: "bp-wallets-accounts",
    level: "L1",
    question: "什么是 HD 钱包？助记词的作用是什么？",
    answer: "HD（分层确定性）钱包通过 BIP32/BIP44 协议从主密钥按树形路径派生子密钥，一棵树可管理无限多地址。助记词（BIP39）是 12 或 24 个英文单词，是主密钥的人类可读形式。只需备份助记词即可恢复整个钱包的所有密钥，极大简化了备份和恢复流程。",
    tags: ["HD钱包", "助记词", "BIP32", "BIP39", "BIP44"],
  },
  {
    id: "bp-wallet-03",
    chapter: "bp-wallets-accounts",
    level: "L2",
    question: "冷钱包、热钱包和硬件钱包的区别是什么？如何选择？",
    answer: "冷钱包是完全离线存储私钥的钱包，安全性最高但使用不便，适合大额长期存储；热钱包是联网运行的钱包，便捷高效但面临网络攻击风险，适合日常小额使用；硬件钱包是专用物理设备，私钥永不离开设备，兼顾安全与便捷。选择原则：大额资产用冷钱包/硬件钱包，日常交易用热钱包。",
    tags: ["冷钱包", "热钱包", "硬件钱包", "安全原则", "资产管理"],
  },
  {
    id: "bp-wallet-04",
    chapter: "bp-wallets-accounts",
    level: "L2",
    question: "UTXO 模型和账户模型有什么区别？各有什么优劣？",
    answer: "UTXO 模型（比特币）：以未花费交易输出为单位，输入花费旧 UTXO、输出创建新 UTXO，天然防双花，支持并行验证，隐私性好但编程复杂。账户模型（以太坊）：全局状态树记录每个账户余额，类似银行直接加减，合约友好、状态清晰，但需 Nonce 防重放，串行执行。UTXO 更安全，账户模型更灵活。",
    tags: ["UTXO模型", "账户模型", "比特币", "以太坊", "状态管理"],
  },
];
