"use client";

import { PhoenixArchitectureLab } from "./official-phoenix-architecture-lab";

const config = {
  unitTitle: "2021纸书版总复习与架构评审",
  focus:
    "贯通演进、架构师视角、分布式基石、不可变基础设施与方法论，完成一次端到端架构评审",
  nodes: [
    "第1章 服务架构演进史",
    "第2章 访问远程服务",
    "第3章 事务处理",
    "第4章 透明多级分流系统",
    "第5章 架构安全性",
    "第6章 分布式共识",
    "第7章 从类库到服务",
    "第8章 流量治理",
    "第9章 可靠通信",
    "第10章 可观测性",
    "第11章 虚拟化容器",
    "第12章 容器间网络",
    "第13章 持久化存储",
    "第14章 资源与调度",
    "第15章 服务网格",
    "第16章 向微服务迈进",
    "附录A 技术演示工程实践",
    "附录B 部署Kubernetes集群",
  ],
  invariant:
    "任何方案都同时给出业务目标、机制、代价、故障反例、观测证据、停止条件和回退路径",
  gates: [
    "正式目录与2021版本边界",
    "机制、主体、状态与责任边界",
    "单变量基线和故障反例",
    "日志、追踪、指标与状态轨迹",
    "最终业务结果与持久状态对账",
    "停止、恢复、回退与责任人",
  ],
} as const;

export function PhaOfficialFinalReviewPathLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="path"
    />
  );
}

export function PhaOfficialFinalReviewTradeoffLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="tradeoff"
    />
  );
}

export function PhaOfficialFinalReviewEvidenceLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
