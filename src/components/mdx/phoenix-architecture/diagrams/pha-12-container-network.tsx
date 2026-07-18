"use client";

import { PhoenixArchitectureLab } from "./official-phoenix-architecture-lab";

const config = {
  unitTitle: "第12章 容器间网络",
  focus: "从Linux网络虚拟化到CNI生态追踪容器包路径、地址分配、转发与策略责任",
  nodes: ["12.1 Linux网络虚拟化", "12.2 容器网络与生态"],
  invariant:
    "Pod或容器地址、路由、转发、封装、策略和服务发现能逐跳解释，MTU与故障域有实测证据",
  gates: [
    "正式目录与2021版本边界",
    "机制、主体、状态与责任边界",
    "单变量基线和故障反例",
    "日志、追踪、指标与状态轨迹",
    "最终业务结果与持久状态对账",
    "停止、恢复、回退与责任人",
  ],
} as const;

export function Pha12ContainerNetworkPathLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="path"
    />
  );
}

export function Pha12ContainerNetworkTradeoffLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="tradeoff"
    />
  );
}

export function Pha12ContainerNetworkEvidenceLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
