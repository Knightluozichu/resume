"use client";

import { PhoenixArchitectureLab } from "./official-phoenix-architecture-lab";

const config = {
  unitTitle: "第5章 架构安全性",
  focus:
    "把认证、授权、凭证、保密、传输和验证串成端到端信任链，而不是零散安全组件清单",
  nodes: [
    "5.1 认证",
    "5.2 授权",
    "5.3 凭证",
    "5.4 保密",
    "5.5 传输",
    "5.6 验证",
  ],
  invariant:
    "每个敏感操作都能证明主体、权限、凭证来源、传输保护、输入验证和审计结果",
  gates: [
    "正式目录与2021版本边界",
    "机制、主体、状态与责任边界",
    "单变量基线和故障反例",
    "日志、追踪、指标与状态轨迹",
    "最终业务结果与持久状态对账",
    "停止、恢复、回退与责任人",
  ],
} as const;

export function Pha05SecurityPathLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="path"
    />
  );
}

export function Pha05SecurityTradeoffLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="tradeoff"
    />
  );
}

export function Pha05SecurityEvidenceLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
