"use client";

import { PhoenixArchitectureLab } from "./official-phoenix-architecture-lab";

const config = {
  unitTitle: "附录B 部署Kubernetes集群",
  focus:
    "固定2021版演示环境，完成Kubernetes集群部署、镜像与依赖准备，并形成可重放基线",
  nodes: ["附录B 部署Kubernetes集群"],
  invariant:
    "节点、网络、存储、入口、证书和示例工作负载均通过检查，环境版本与书中实验可追溯",
  gates: [
    "正式目录与2021版本边界",
    "机制、主体、状态与责任边界",
    "单变量基线和故障反例",
    "日志、追踪、指标与状态轨迹",
    "最终业务结果与持久状态对账",
    "停止、恢复、回退与责任人",
  ],
} as const;

export function PhaAppendixBKubernetesPathLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="path"
    />
  );
}

export function PhaAppendixBKubernetesTradeoffLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="tradeoff"
    />
  );
}

export function PhaAppendixBKubernetesEvidenceLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
