import type { ReviewQuestion } from "./types";

export const mbtTransactionsQuestions: ReviewQuestion[] = [
  {
    id: "mbt-transactions-01",
    chapter: "mbt-transactions",
    level: 1,
    question: "比特币交易的基本结构包含哪些部分？",
    answer: "一笔交易包含：输入（Inputs，引用前一笔 UTXO，包含 txid + vout + 解锁脚本）、输出（Outputs，创建新的 UTXO，包含锁定脚本 + 金额）、以及其他字段（版本号、锁定时间、见证数据）。输入消费已有 UTXO，输出创建新 UTXO，手续费 = 输入总额 - 输出总额。",
    tags: ["交易结构", "输入", "输出", "UTXO"],
  },
  {
    id: "mbt-transactions-02",
    chapter: "mbt-transactions",
    level: 2,
    question: "UTXO 模型与账户模型有什么本质区别？",
    answer: "UTXO 模型没有账户和余额概念，资金以「未花费交易输出」形式存在。每笔交易消费若干 UTXO 作为输入，创建若干新 UTXO 作为输出。UTXO 一次性消费，不可部分花费（需找零）。账户模型维护一个全局余额状态，交易直接增减余额。UTXO 模型天然支持并行验证，更适合无状态验证；账户模型更直观但需维护全局状态。",
    tags: ["UTXO", "账户模型", "对比", "并行验证"],
  },
  {
    id: "mbt-transactions-03",
    chapter: "mbt-transactions",
    level: 2,
    question: "解锁脚本和锁定脚本如何配合工作？",
    answer: "锁定脚本（ScriptPubKey）定义了花费该 UTXO 的条件，附加在交易输出上。解锁脚本（ScriptSig）提供满足条件的证明（如签名+公钥），附加在交易输入上。验证时将解锁脚本和锁定脚本拼接执行，若结果为 TRUE 则交易有效。以 P2PKH 为例，解锁脚本提供签名和公钥，锁定脚本用 OP_DUP OP_HASH160 验证公钥哈希匹配后再用 OP_CHECKSIG 验证签名。",
    tags: ["解锁脚本", "锁定脚本", "脚本验证", "P2PKH"],
  },
  {
    id: "mbt-transactions-04",
    chapter: "mbt-transactions",
    level: 3,
    question: "P2WPKH 隔离见证交易与传统 P2PKH 交易有何区别？带来什么优势？",
    answer: "P2WPKH 将签名数据（见证数据）从解锁脚本中移出，放在交易的一个独立「见证」字段中。传统 P2PKH 的签名数据嵌入在输入脚本中，占用区块空间且存在交易延展性问题（签名可被第三方修改导致 txid 变化）。SegWit 修复了延展性（txid 不再受签名影响），同时将见证数据以折扣方式计入区块权重，实际增加了区块容量，降低了手续费。",
    tags: ["P2WPKH", "隔离见证", "交易延展性", "区块容量", "手续费"],
  },
];
