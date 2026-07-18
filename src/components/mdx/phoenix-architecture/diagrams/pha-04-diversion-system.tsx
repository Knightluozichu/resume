"use client";

import { PhoenixArchitectureLab } from "./official-phoenix-architecture-lab";

const config = {
  unitTitle: "第4章 透明多级分流系统",
  focus:
    "沿客户端缓存、DNS、传输、CDN、负载均衡和服务端缓存追踪请求如何逐级分流",
  nodes: [
    "4.1 客户端缓存",
    "4.2 域名解析",
    "4.3 传输链路",
    "4.4 内容分发网络",
    "4.5 负载均衡",
    "4.6 服务端缓存",
  ],
  invariant:
    "同一资源在每层都有可解释的键、版本、过期、失效和回源路径，命中率提升不能破坏正确性",
  gates: [
    "正式目录与2021版本边界",
    "机制、主体、状态与责任边界",
    "单变量基线和故障反例",
    "日志、追踪、指标与状态轨迹",
    "最终业务结果与持久状态对账",
    "停止、恢复、回退与责任人",
  ],
} as const;

export function Pha04DiversionSystemPathLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="path"
    />
  );
}

export function Pha04DiversionSystemTradeoffLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="tradeoff"
    />
  );
}

export function Pha04DiversionSystemEvidenceLab() {
  return (
    <PhoenixArchitectureLab
      {...config}
      nodes={[...config.nodes]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
