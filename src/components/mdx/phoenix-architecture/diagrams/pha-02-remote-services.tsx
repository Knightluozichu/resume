"use client";

import { PhoenixArchitectureLab } from "./official-phoenix-architecture-lab";

const config = {
  unitTitle: "第2章 访问远程服务",
  focus:
    "比较RPC与REST的抽象、协议、语义和演进方式，建立远程调用绝不等价于本地调用的边界",
  nodes: ["2.1 远程服务调用", "2.2 REST设计风格"],
  invariant:
    "契约、超时、幂等、版本与失败语义必须跨客户端和服务端一致，传输成功不等于业务成功",
  gates: [
    "正式目录与2021版本边界",
    "机制、主体、状态与责任边界",
    "单变量基线和故障反例",
    "日志、追踪、指标与状态轨迹",
    "最终业务结果与持久状态对账",
    "停止、恢复、回退与责任人",
  ],
} as const;

export function Pha02RemoteServicesPathLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="path"
    />
  );
}

export function Pha02RemoteServicesTradeoffLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="tradeoff"
    />
  );
}

export function Pha02RemoteServicesEvidenceLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
