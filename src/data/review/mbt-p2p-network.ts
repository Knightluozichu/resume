import type { ReviewQuestion } from "./types";

export const mbtP2pNetworkQuestions: ReviewQuestion[] = [
  {
    id: "mbt-p2p-network-01",
    chapter: "mbt-p2p-network",
    level: 1,
    question: `比特币网络中有哪些节点类型？它们的功能差异是什么？`,
    answer: `三种节点类型：全节点（Full Node）存储完整区块链（约 500GB），独立验证所有交易和区块，不依赖第三方信任；矿工节点（Miner）是全节点加挖矿功能，收集交易并竞争出块，获得区块奖励和手续费；SPV 轻节点（Light）只存区块头（约 50MB），用 Merkle 证明验证交易，手机钱包常用此模式。`,
    tags: ["节点类型", "全节点", "矿工节点", "SPV", "轻节点"],
  },
  {
    id: "mbt-p2p-network-02",
    chapter: "mbt-p2p-network",
    level: 1,
    question: `比特币 P2P 网络中的关键消息有哪些？`,
    answer: `关键消息包括：version（握手与版本协商）、inv（通告交易或区块哈希）、getdata（请求具体数据内容）、tx / block（传输交易或区块数据）、addr（节点发现，交换已知节点地址）。节点通过这些消息完成发现、握手、数据通告和传输，实现无中心服务器的对等通信。`,
    tags: ["P2P消息", "version", "inv", "getdata", "Gossip"],
  },
  {
    id: "mbt-p2p-network-03",
    chapter: "mbt-p2p-network",
    level: 2,
    question: `Gossip 协议如何在比特币网络中传播交易和区块？`,
    answer: `节点收到新交易或区块后，先验证有效性，然后向相邻节点发送 inv 消息通告哈希。邻居节点未见过该哈希则回复 getdata 请求完整数据。收到数据后验证并继续向其他邻居通告，形成 Gossip 传播。这种洪泛式传播确保交易和区块快速扩散到全网，通常几秒内可达大部分节点。每个节点独立验证，不信任任何来源。`,
    tags: ["Gossip", "传播", "inv", "洪泛", "独立验证"],
  },
  {
    id: "mbt-p2p-network-04",
    chapter: "mbt-p2p-network",
    level: 2,
    question: `全节点和 SPV 轻节点在安全性与信任模型上有何区别？`,
    answer: `全节点独立验证所有交易和区块，不依赖任何第三方，安全性最高但存储和带宽开销大。SPV 轻节点只存区块头，通过 Merkle 证明验证交易是否在某个区块中，但无法验证交易合法性（如双花），需信任全节点提供的 Merkle 证明和最长链。SPV 在安全性与资源之间做了取舍：牺牲部分安全性换取极低存储，适合移动设备等资源受限场景。`,
    tags: ["全节点", "SPV", "信任模型", "安全性", "资源取舍"],
  },
];
