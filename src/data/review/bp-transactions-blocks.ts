import type { ReviewQuestion } from "./types";

export const bpTransactionsBlocksQuestions: ReviewQuestion[] = [
  {
    id: "bp-tx-01",
    chapter: "bp-transactions-blocks",
    level: 1,
    question: `一笔区块链交易的基本结构包含哪些部分？`,
    answer: `交易基本结构包含四部分：交易输入（引用之前的 UTXO 或账户余额）、交易输出（指定接收地址和金额）、数字签名（用私钥签名证明授权）、手续费（激励矿工打包）。在 UTXO 模型中，输入花费旧 UTXO，输出创建新 UTXO。`,
    tags: ["交易结构", "UTXO", "输入输出", "数字签名", "手续费"],
  },
  {
    id: "bp-tx-02",
    chapter: "bp-transactions-blocks",
    level: 1,
    question: `区块头包含哪些关键字段？Merkle 树的作用是什么？`,
    answer: `区块头包含：版本号、前区块哈希、Merkle 根、时间戳、难度目标、Nonce 随机数。Merkle 树将区块内所有交易两两哈希向上聚合，最终生成一个根哈希存入区块头。它的作用是高效验证某笔交易是否在区块中，SPV 轻节点只需 Merkle 路径即可验证，无需下载全量交易数据。`,
    tags: ["区块头", "Merkle树", "Merkle根", "SPV", "轻节点"],
  },
  {
    id: "bp-tx-03",
    chapter: "bp-transactions-blocks",
    level: 2,
    question: `简述交易从创建到上链确认的完整生命周期。`,
    answer: `交易生命周期为：1. 发送方创建交易并用私钥签名；2. 将交易广播至 P2P 网络；3. 全网节点验证交易（签名有效性、UTXO 未花费、金额非负、无双花）；4. 矿工将有效交易打包进新区块；5. 新区块经共识确认后上链，交易完成最终确认。`,
    tags: ["交易生命周期", "广播", "验证", "打包", "上链确认"],
  },
  {
    id: "bp-tx-04",
    chapter: "bp-transactions-blocks",
    level: 2,
    question: `什么是双花问题？区块链如何防止双花？`,
    answer: `双花问题是指同一笔数字资产被花费两次的攻击行为。区块链通过 UTXO 模型（每个 UTXO 只能被花费一次）和共识机制（矿工只确认先到达的有效交易，后到的重复花费交易会被拒绝）共同防止双花。在 PoW 中还需等待足够确认数（如比特币 6 个确认）来防止通过重组链进行双花攻击。`,
    tags: ["双花问题", "UTXO", "确认数", "共识机制", "链重组"],
  },
];
