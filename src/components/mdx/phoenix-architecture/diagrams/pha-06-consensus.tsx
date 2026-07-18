"use client";

import { PhoenixArchitectureLab } from "./official-phoenix-architecture-lab";

const config = {
  unitTitle: "第6章 分布式共识",
  focus:
    "用Paxos、Multi Paxos与Gossip区分强共识、复制日志和最终传播，不把算法名称等同系统保证",
  nodes: ["6.1 Paxos", "6.2 Multi Paxos", "6.3 Gossip协议"],
  invariant:
    "在节点故障、消息延迟、重复和分区下，安全性不被破坏；活性结论明确依赖多数派与时序假设",
  gates: [
    "正式目录与2021版本边界",
    "机制、主体、状态与责任边界",
    "单变量基线和故障反例",
    "日志、追踪、指标与状态轨迹",
    "最终业务结果与持久状态对账",
    "停止、恢复、回退与责任人",
  ],
} as const;

export function Pha06ConsensusPathLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="path"
    />
  );
}

export function Pha06ConsensusTradeoffLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="tradeoff"
    />
  );
}

export function Pha06ConsensusEvidenceLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
