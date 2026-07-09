import type { ReviewQuestion } from "./types";

export const mbtWalletsUsageQuestions: ReviewQuestion[] = [
  {
    id: "mbt-wallets-usage-01",
    chapter: "mbt-wallets-usage",
    level: 1,
    question: "HD 钱包（分层确定性钱包）的核心原理是什么？",
    answer: "HD 钱包从一个种子（Seed）推导出主密钥，再通过确定性路径（如 m/0'/0/0）逐层派生子密钥和地址。推导使用 HMAC-SHA512，分为硬化推导（需要父私钥）和普通推导（只需父公钥）。只需备份一个种子即可恢复整棵密钥树的所有地址，极大简化了备份和恢复流程。",
    tags: ["HD钱包", "种子", "主密钥", "推导路径", "BIP32"],
  },
  {
    id: "mbt-wallets-usage-02",
    chapter: "mbt-wallets-usage",
    level: 2,
    question: "BIP39 助记词的生成流程是什么？",
    answer: "流程：1）生成 128~256 位随机熵；2）对熵做 SHA256 取前几位作为校验码；3）将「熵+校验码」按 11 位分组，每组映射到 BIP39 词表（2048 个词）中的一个词；4）得到 12~24 个助记词；5）用 PBKDF2 函数将助记词（可选加密码）拉伸成 512 位种子；6）种子用于推导 HD 钱包主密钥。助记词是人类可读的种子备份形式。",
    tags: ["BIP39", "助记词", "随机熵", "PBKDF2", "词表"],
  },
  {
    id: "mbt-wallets-usage-03",
    chapter: "mbt-wallets-usage",
    level: 2,
    question: "非确定性钱包、HD 钱包和硬件钱包各有什么优缺点？",
    answer: "非确定性钱包：每把私钥独立随机生成，需逐个备份，丢失任何一个则该地址资金丢失，不推荐使用。HD 钱包（推荐）：一棵树从一个种子推导，只需备份助记词即可恢复全部密钥，支持无限地址生成。硬件钱包：私钥隔离在专用硬件内，签名时私钥不出设备，即使连接受感染电脑也不泄露私钥，安全性最高，适合大额资产存储。",
    tags: ["钱包类型", "非确定性", "HD钱包", "硬件钱包", "安全性"],
  },
  {
    id: "mbt-wallets-usage-04",
    chapter: "mbt-wallets-usage",
    level: 3,
    question: "硬化推导（hardened derivation）与普通推导的区别是什么？为什么需要硬化推导？",
    answer: "普通推导（如 m/0/0）只需父公钥即可推导子公钥，方便观察钱包（只存公钥就能生成地址）。硬化推导（如 m/0'/0）需要父私钥才能推导。如果普通推导的父公钥泄露，攻击者可以推导出所有子公钥；如果某个子私钥也泄露，攻击者甚至可推导出父私钥（密钥泄露风险）。硬化推导切断了这条攻击路径：即使子私钥泄露，也无法反推父级，保障了密钥树的分层安全。",
    tags: ["硬化推导", "普通推导", "密钥安全", "BIP32", "观察钱包"],
  },
];
