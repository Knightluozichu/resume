"use client";

import { PhoenixArchitectureLab } from "./official-phoenix-architecture-lab";

const config = {
  unitTitle: "第7章 从类库到服务",
  focus:
    "重建服务发现、网关路由和客户端负载均衡三条连接链，明确注册、解析、选择与转发责任",
  nodes: ["7.1 服务发现", "7.2 网关路由", "7.3 客户端负载均衡"],
  invariant:
    "服务实例变化后，注册表、客户端视图、路由和健康状态在约定窗口内收敛，陈旧节点不会无限接流量",
  gates: [
    "正式目录与2021版本边界",
    "机制、主体、状态与责任边界",
    "单变量基线和故障反例",
    "日志、追踪、指标与状态轨迹",
    "最终业务结果与持久状态对账",
    "停止、恢复、回退与责任人",
  ],
} as const;

export function Pha07LibraryToServicePathLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="path"
    />
  );
}

export function Pha07LibraryToServiceTradeoffLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="tradeoff"
    />
  );
}

export function Pha07LibraryToServiceEvidenceLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
