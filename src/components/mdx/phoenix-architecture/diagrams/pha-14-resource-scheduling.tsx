"use client";

import { PhoenixArchitectureLab } from "./official-phoenix-architecture-lab";

const config = {
  unitTitle: "第14章 资源与调度",
  focus:
    "以资源模型、QoS、驱逐与默认调度器解释请求如何从声明到节点选择和运行保障",
  nodes: [
    "14.1 资源模型",
    "14.2 服务质量与优先级",
    "14.3 驱逐机制",
    "14.4 默认调度器",
  ],
  invariant:
    "requests、limits、优先级、节点容量和实际使用量能够解释调度、节流、驱逐与恢复结果",
  gates: [
    "正式目录与2021版本边界",
    "机制、主体、状态与责任边界",
    "单变量基线和故障反例",
    "日志、追踪、指标与状态轨迹",
    "最终业务结果与持久状态对账",
    "停止、恢复、回退与责任人",
  ],
} as const;

export function Pha14ResourceSchedulingPathLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="path"
    />
  );
}

export function Pha14ResourceSchedulingTradeoffLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="tradeoff"
    />
  );
}

export function Pha14ResourceSchedulingEvidenceLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
