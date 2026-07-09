import type { ReviewQuestion } from "./types";

export const mbtMiningConsensusQuestions: ReviewQuestion[] = [
  {
    id: "mbt-mining-consensus-01",
    chapter: "mbt-mining-consensus",
    level: 1,
    question: "比特币挖矿的完整流程是什么？",
    answer: "挖矿流程分五步：1）收集交易——从内存池选取待打包交易；2）构造区块——计算 Merkle 树，组装区块头；3）哈希竞争——遍历 Nonce 值对区块头做双重 SHA256；4）难度检查——判断哈希结果是否小于难度目标值；5）广播区块——找到合法 Nonce 后广播区块，获得出块奖励和手续费。",
    tags: ["挖矿流程", "PoW", "Nonce", "区块奖励"],
  },
  {
    id: "mbt-mining-consensus-02",
    chapter: "mbt-mining-consensus",
    level: 2,
    question: "比特币的难度调整机制如何工作？",
    answer: "比特币目标出块时间为 10 分钟/块，每 2016 块（约两周）调整一次难度。调整公式：新难度 = 旧难度 ×（实际出块时间 / 期望出块时间）。算力上升导致出块太快时，目标值变小（难度上调），需要更多哈希尝试；算力下降导致出块太慢时，目标值变大（难度下调）。调整幅度限制在 4 倍以内，防止剧烈波动。",
    tags: ["难度调整", "出块时间", "算力", "目标值"],
  },
  {
    id: "mbt-mining-consensus-03",
    chapter: "mbt-mining-consensus",
    level: 2,
    question: "最长链原则如何解决分叉问题？",
    answer: "当两个矿工几乎同时出块时会产生临时分叉。最长链原则规定：节点始终接受累积工作量最大的链为有效链。后续矿工在分叉之一继续出块，最终某条链变得更长，另一条链被废弃（孤立块）。分叉解决后，废弃链上的交易回到内存池重新打包。这保证了网络最终一致性，无需中央协调即可解决冲突。",
    tags: ["最长链原则", "分叉", "共识", "累积工作量"],
  },
  {
    id: "mbt-mining-consensus-04",
    chapter: "mbt-mining-consensus",
    level: 3,
    question: "PoW 共识如何在去中心化环境下保障安全？攻击者需要付出什么代价？",
    answer: "PoW 要求矿工投入真实算力成本（电力+硬件）才能出块，攻击者必须控制全网 51% 以上算力才可能篡改近期交易。即使如此，也只能修改自己的交易（双花），无法窃取他人私钥或凭空造币。攻击成本（持续 51% 算力）远高于潜在收益，且攻击行为会被网络察觉导致比特币暴跌，攻击者持有的比特币也贬值。这种经济博弈使 PoW 在实践中极为安全。",
    tags: ["PoW", "51%攻击", "安全", "经济博弈", "去中心化"],
  },
];
