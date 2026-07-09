import type { ReviewQuestion } from "./types";

export const metTokensStandardsQuestions: ReviewQuestion[] = [
  {
    id: "met-tokens-standards-01",
    chapter: "met-tokens-standards",
    level: 1,
    question: "ERC-20 的核心方法有哪些？approve 和 transferFrom 的配合机制是什么？",
    answer: "核心方法：transfer（直接转账）、approve（授权额度）、transferFrom（代为转账）、balanceOf（查余额）、totalSupply（查总量）。approve/transferFrom 配合：持有者先用 approve 授权第三方（如 DEX）可动用的额度，第三方再用 transferFrom 从持有者账户转出代币。这实现了委托转账，是 DEX、借贷协议等 DeFi 应用的基础——合约无需持有者私钥即可在授权范围内操作代币。",
    tags: ["ERC-20", "approve", "transferFrom", "授权机制", "委托转账"],
  },
  {
    id: "met-tokens-standards-02",
    chapter: "met-tokens-standards",
    level: 2,
    question: "ERC-721 与 ERC-20 的根本区别是什么？NFT 为什么不可互换？",
    answer: "ERC-20 是同质化代币，每个代币等价可互换（像纸币）；ERC-721 是非同质化代币（NFT），每个代币有唯一 tokenId，不可互换不可分割。NFT 不可互换是因为每个 tokenId 对应独立的 ownerOf 记录和独立的 tokenURI 元数据，代表独一无二的资产——就像每件艺术品都不同。ERC-20 用 mapping(address=>uint) 记余额，ERC-721 用 mapping(uint256=>address) 记每个 tokenId 的持有者。",
    tags: ["ERC-721", "ERC-20", "NFT", "非同质化", "tokenId", "同质化"],
  },
  {
    id: "met-tokens-standards-03",
    chapter: "met-tokens-standards",
    level: 3,
    question: "ERC-1155 相比 ERC-721 有哪些优势？批量转移为什么能省 Gas？",
    answer: "ERC-1155 优势：① 单合约管理多种代币（同质化+非同质化混合），减少部署与管理开销；② safeBatchTransferFrom 支持一次转移多种代币；③ 半同质化——同一 ID 可有多个实例。批量转移省 Gas 因为：单次交易只需支付一次基础交易成本（21000 Gas 起步）和一次调用开销，而多次单独转移需多次交易各自承担固定成本。批量转移 N 件物品的 Gas 远低于 N 次单独转移的总和。",
    tags: ["ERC-1155", "ERC-721", "批量转移", "Gas优化", "多代币"],
  },
  {
    id: "met-tokens-standards-04",
    chapter: "met-tokens-standards",
    level: 2,
    question: "为什么说标准化是以太坊生态爆发的基础设施？",
    answer: "标准化带来三大价值：① 统一接口——钱包无需为每种代币单独适配，一个 ERC-20 实现兼容所有 ERC-20 代币；② 即插即用——DEX、借贷协议自动支持新发行的合规代币，无需人工对接；③ 可组合性——代币像乐高积木在协议间自由流转组合，催生 DeFi 的乐高生态。没有 ERC 标准，每个代币都是孤岛，无法形成网络效应；有了标准，任何新代币立即可被整个生态复用，这是以太坊应用爆发的根基。",
    tags: ["标准化", "可组合性", "即插即用", "网络效应", "DeFi乐高"],
  },
];
