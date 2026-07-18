"use client";

import { PhoenixArchitectureLab } from "./official-phoenix-architecture-lab";

const config = {
  unitTitle: "第16章 向微服务迈进",
  focus:
    "按目的、前提、边界与治理判断是否以及如何拆分微服务，让组织能力与技术边界同步演进",
  nodes: [
    "16.1 目的：微服务的驱动力",
    "16.2 前提：微服务需要的条件",
    "16.3 边界：微服务的粒度",
    "16.4 治理：理解系统复杂性",
  ],
  invariant:
    "每个拆分都有可量化驱动力、自治前提、业务边界、治理成本和可逆迁移路径",
  gates: [
    "正式目录与2021版本边界",
    "机制、主体、状态与责任边界",
    "单变量基线和故障反例",
    "日志、追踪、指标与状态轨迹",
    "最终业务结果与持久状态对账",
    "停止、恢复、回退与责任人",
  ],
} as const;

export function Pha16ForwardMicroservicesPathLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="path"
    />
  );
}

export function Pha16ForwardMicroservicesTradeoffLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="tradeoff"
    />
  );
}

export function Pha16ForwardMicroservicesEvidenceLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
