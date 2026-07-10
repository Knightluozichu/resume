import type { ReviewQuestion } from "./types";

export const metDappsOraclesQuestions: ReviewQuestion[] = [
  {
    id: "met-dapps-oracles-01",
    chapter: "met-dapps-oracles",
    level: 1,
    question: `DApp 的三层架构是什么？为什么说合约层是去中心化的核心？`,
    answer: `三层架构：① 前端层（Web 界面 + ethers.js/web3.js + 钱包连接）；② 合约层（智能合约 + 事件日志 + ABI 接口）；③ 存储/数据层（链上状态 + IPFS + 预言机）。合约层是去中心化核心，因为前端可中心化托管，但业务逻辑部署在链上不可篡改、由全网验证执行——这是 DApp 区别于传统应用的根本：规则可信、无需信任单一服务器。`,
    tags: ["DApp架构", "前端层", "合约层", "存储层", "去中心化"],
  },
  {
    id: "met-dapps-oracles-02",
    chapter: "met-dapps-oracles",
    level: 2,
    question: `智能合约为什么需要预言机？描述预言机的数据流。`,
    answer: `智能合约运行在 EVM 沙盒中，无法直接访问链外数据（价格、天气、API），但许多应用（如 DeFi 喂价）需要外部数据，因此需要预言机作为桥梁。数据流：① 外部数据源（API/价格源）→ ② 预言机节点采集并用私钥签名 → ③ 预言机合约聚合多节点数据验证后写入链上 → ④ 业务合约消费数据触发逻辑 → ⑤ 用户通过前端看到结果。`,
    tags: ["预言机", "数据流", "沙盒", "喂价", "链外数据"],
  },
  {
    id: "met-dapps-oracles-03",
    chapter: "met-dapps-oracles",
    level: 2,
    question: `入站预言机与出站预言机有什么区别？各举一个应用场景。`,
    answer: `入站预言机：链下数据 → 链上，最常见类型，如价格喂价（Chainlink 将 ETH/USD 价格写入链上供 DeFi 协议使用）、事件触发（天气数据触发保险理赔）。出站预言机：链上事件 → 链下，如链上支付触发线下物流发货、物联网设备控制。入站解决合约「看不到外部世界」的问题，出站解决「链上事件无法直接驱动链下系统」的问题。`,
    tags: ["入站预言机", "出站预言机", "喂价", "物联网"],
  },
  {
    id: "met-dapps-oracles-04",
    chapter: "met-dapps-oracles",
    level: 3,
    question: `去中心化预言机如何解决单一预言机的信任问题？`,
    answer: `单一预言机是中心化单点——可被收买、宕机或篡改数据。去中心化预言机（如 Chainlink）通过：① 多节点独立采集数据，避免单点故障；② 聚合算法（中位数/去极值平均）消除异常值；③ 经济激励——节点质押代币，作恶会被惩罚（slashing）；④ 声誉系统——历史准确率高的节点权重更高。这样即使部分节点作恶或宕机，聚合结果仍可信，将信任从单一实体分散到去中心化网络。`,
    tags: ["去中心化预言机", "Chainlink", "多节点聚合", "经济激励", "slashing"],
  },
];
