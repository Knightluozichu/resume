import type { ReviewQuestion } from "./types";

export const bdpWeb3IntegrationQuestions: ReviewQuestion[] = [
  {
    id: "bdp-web3-integration-01",
    chapter: "bdp-web3-integration",
    level: 1,
    question: "Web3 集成的数据通路包含哪四层？",
    answer: "四层为：前端层（React 组件、ethers.js/viem、MetaMask 钱包）、通信层（读操作 call 与写操作 transact）、网络层（RPC 节点与 JSON-RPC）、链上层（智能合约/EVM）。前端通过库编码 ABI，经 RPC 与链上合约交互。",
    tags: ["Web3 集成", "数据通路", "RPC", "分层"],
  },
  {
    id: "bdp-web3-integration-02",
    chapter: "bdp-web3-integration",
    level: 2,
    question: "读操作 call 与写操作 transact 的区别是什么？",
    answer: "读操作 call 不打包交易、不上链、免 Gas、即时返回，适合查询状态；写操作 transact 需要钱包签名、打包上链、消耗 Gas、需等待区块确认，适合修改状态。前端应把只读查询用 call，状态变更用 transact 并处理签名与确认。",
    tags: ["call", "transact", "Gas", "交易确认"],
  },
  {
    id: "bdp-web3-integration-03",
    chapter: "bdp-web3-integration",
    level: 2,
    question: "前端如何实时感知链上状态变化？事件监听的机制是什么？",
    answer: "合约通过 event 输出日志，前端用 contract.on 按主题（indexed 参数）过滤订阅事件。链上事件一旦出块即推送到前端，实现状态实时同步。事件日志不参与合约状态但可低成本检索，是链上到链下通信的主通道，配合 The Graph 等索引可做历史聚合。",
    tags: ["事件监听", "event", "indexed", "状态同步", "The Graph"],
  },
  {
    id: "bdp-web3-integration-04",
    chapter: "bdp-web3-integration",
    level: 3,
    question: "写交易出现丢包或 nonce 冲突时如何处理？revert reason 如何解码？",
    answer: "丢包与 nonce 冲突多因前端并发提交或 nonce 未同步：应维护待确认 nonce 队列、串行化提交、对超时交易用相同 nonce+更高 gas price 替换（speedup/cancel）。revert reason 通过解析交易回执的 revert 数据，按 ABI 解码自定义 error 或 require 字符串，前端据此向用户展示可读错误。",
    tags: ["nonce", "交易丢包", "revert reason", "错误解码", "鲁棒性"],
  },
];
