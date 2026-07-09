import type { ReviewQuestion } from "./types";

export const bdpDefiNftPracticeQuestions: ReviewQuestion[] = [
  {
    id: "bdp-defi-nft-practice-01",
    chapter: "bdp-defi-nft-practice",
    level: 1,
    question: "DeFi 协议栈的四大核心组件是什么？",
    answer: "四大组件：DEX 去中心化交易所（如 Uniswap AMM，恒定乘积 x*y=k，流动性池与滑点）、借贷（如 Aave/Compound，超额抵押与清算）、预言机（如 Chainlink 报价与 TWAP）、衍生品（永续合约与合成资产、杠杆与资金费率）。",
    tags: ["DeFi", "DEX", "借贷", "预言机", "衍生品"],
  },
  {
    id: "bdp-defi-nft-practice-02",
    chapter: "bdp-defi-nft-practice",
    level: 2,
    question: "ERC-721 与 ERC-1155 的区别是什么？各自适合什么场景？",
    answer: "ERC-721 是非同质化标准，每个 tokenId 唯一，适合独一无二的艺术品、收藏品、虚拟土地；ERC-1155 支持同质与非质混合，可批量转账多个代币，Gas 更省，适合游戏道具、半同质化物品（多份装备同 id 不同数量）。需要批量与混合属性选 1155，需要纯粹唯一性选 721。",
    tags: ["ERC-721", "ERC-1155", "NFT", "代币标准"],
  },
  {
    id: "bdp-defi-nft-practice-03",
    chapter: "bdp-defi-nft-practice",
    level: 2,
    question: "什么是 DeFi 的「乐高式可组合性」？举一个组合实例。",
    answer: "乐高式可组合性指 DeFi 协议彼此开放接口可互相调用，像积木一样堆叠。例如：抵押资产存入借贷池 → 借出稳定币 → 投入 DEX 做市成为 LP → LP 凭证再抵押入另一协议生息。NFT 也可作抵押品或绑定收益策略。组合带来效率也叠加风险。",
    tags: ["可组合性", "Money Legos", "流动性挖矿", "组合实例"],
  },
  {
    id: "bdp-defi-nft-practice-04",
    chapter: "bdp-defi-nft-practice",
    level: 3,
    question: "为什么协议组合越多风险越大？如何防范连环清算？",
    answer: "组合越多，依赖链越长，单点漏洞或预言机失真会沿调用链放大：一处协议被攻击或价格异常，触发抵押率下降，引发跨协议连环清算与流动性枯竭。防范需：使用时间加权预言机（TWAP）防瞬时操纵、设置合理抵押率与清算阈值、避免过度依赖单一协议、压力测试极端行情与分叉主网验证清算路径。",
    tags: ["连环清算", "风险叠加", "TWAP", "压力测试", "DeFi 风险"],
  },
];
