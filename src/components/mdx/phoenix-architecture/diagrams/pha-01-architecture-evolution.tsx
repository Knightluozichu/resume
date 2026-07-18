"use client";

import { PhoenixArchitectureLab } from "./official-phoenix-architecture-lab";

const config = {
  unitTitle: "第1章 服务架构演进史",
  focus:
    "从原始分布式、单体、SOA、微服务、后微服务到无服务，解释架构演进解决了什么、又引入了什么",
  nodes: [
    "1.1 原始分布式时代",
    "1.2 单体系统时代",
    "1.3 SOA时代",
    "1.4 微服务时代",
    "1.5 后微服务时代",
    "1.6 无服务时代",
  ],
  invariant:
    "每次架构选择都同时写出业务驱动力、收益、代价与退出条件，不能把时间顺序误写成优劣排名",
  gates: [
    "正式目录与2021版本边界",
    "机制、主体、状态与责任边界",
    "单变量基线和故障反例",
    "日志、追踪、指标与状态轨迹",
    "最终业务结果与持久状态对账",
    "停止、恢复、回退与责任人",
  ],
} as const;

export function Pha01ArchitectureEvolutionPathLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="path"
    />
  );
}

export function Pha01ArchitectureEvolutionTradeoffLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="tradeoff"
    />
  );
}

export function Pha01ArchitectureEvolutionEvidenceLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
