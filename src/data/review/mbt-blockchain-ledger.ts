import type { ReviewQuestion } from "./types";

export const mbtBlockchainLedgerQuestions: ReviewQuestion[] = [
  {
    id: "mbt-blockchain-ledger-01",
    chapter: "mbt-blockchain-ledger",
    level: 1,
    question: `区块链的区块头包含哪些核心字段？`,
    answer: `区块头包含：前一个区块的哈希（PrevHash）、默克尔根（MerkleRoot）、Nonce、难度目标、时间戳、版本号。区块头是区块的固定大小摘要（80 字节），矿工对区块头进行 PoW 哈希竞争。每个区块通过 PrevHash 指向前一个区块，形成哈希链。`,
    tags: ["区块头", "PrevHash", "MerkleRoot", "Nonce", "哈希链"],
  },
  {
    id: "mbt-blockchain-ledger-02",
    chapter: "mbt-blockchain-ledger",
    level: 2,
    question: `默克尔树在区块链中的作用是什么？`,
    answer: `默克尔树将区块内所有交易两两哈希、逐层向上合并，最终生成一个根哈希（MerkleRoot）存入区块头。作用：1）高效验证某交易是否在区块中（只需 log(n) 个哈希组成的 Merkle 路径）；2）任何交易被篡改都会导致 MerkleRoot 变化，进而改变区块哈希，使篡改立即暴露；3）SPV 轻节点只需区块头即可验证交易，无需下载完整区块数据。`,
    tags: ["默克尔树", "MerkleRoot", "SPV", "验证", "不可篡改"],
  },
  {
    id: "mbt-blockchain-ledger-03",
    chapter: "mbt-blockchain-ledger",
    level: 2,
    question: `为什么说区块链是「不可篡改」的？篡改的代价是什么？`,
    answer: `篡改任意交易 → MerkleRoot 变化 → 区块哈希变化 → 后续所有区块的 PrevHash 失效 → 需重新计算所有后续区块的 PoW。由于每个区块的 PoW 需要海量哈希尝试，重新计算整个链条的计算量超过全网算力，实际不可行。链越长、确认数越多，篡改难度越大。这就是区块链不可篡改的密码学+经济保障。`,
    tags: ["不可篡改", "哈希链", "PoW", "篡改代价"],
  },
  {
    id: "mbt-blockchain-ledger-04",
    chapter: "mbt-blockchain-ledger",
    level: 3,
    question: `SPV 轻节点如何在不下载完整区块链的情况下验证交易？`,
    answer: `SPV 轻节点只下载区块头（~50MB），不存完整交易。验证流程：1）向全节点请求目标交易的 Merkle 路径（从该交易到 MerkleRoot 的所有兄弟哈希）；2）用 Merkle 路径重新计算 MerkleRoot，与区块头中的 MerkleRoot 比对；3）检查该区块是否在已知的最长链中，且后续有足够确认数。SPV 信任最长链上的交易已由全网共识验证，以极低存储代价实现交易验证。`,
    tags: ["SPV", "轻节点", "Merkle路径", "验证", "区块头"],
  },
];
