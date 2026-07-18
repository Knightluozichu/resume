"use client";

import { ServerNetworkDesignLab } from "./official-server-network-design-lab";

const config = {
  unitTitle: "2015年首版总复习与网络设计评审",
  snapshot: "《图解服务器端网络架构》2015年首版 / 场内基础设施设计",
  focus:
    "把6个正式单元、171个目录节点收束为需求、通信流、容量、故障与运营五道独立评审门",
  nodes: [
    "复习0 第0章：网络架构流程",
    "复习1 第1章：物理设计",
    "复习2 第2章：逻辑设计",
    "复习3 第3章：数据安全与负载均衡设计",
    "复习4 第4章：高可用性设计",
    "复习5 第5章：管理设计",
  ],
  invariant:
    "另一位工程师无需口头信息即可按图表实施、验证单故障、定位告警并从备份恢复",
  failure:
    "只展示一张漂亮拓扑和设备清单，不足以证明地址、允许流、回程、冗余容量、状态同步和恢复操作正确",
  links: [
    {
      label: "需求追溯",
      mechanism: "从业务和非功能需求到设计、配置、测试与运行证据的双向映射",
      evidence: "需求、拓扑与通信流",
    },
    {
      label: "通信矩阵",
      mechanism: "按源、目的、协议端口、方向、理由和责任人列出的允许流清单",
      evidence: "接口、VLAN、地址与状态表",
    },
    {
      label: "容量余量",
      mechanism: "在峰值、增长和单故障条件下仍可承载业务的剩余能力",
      evidence: "容量、故障与恢复时间",
    },
    {
      label: "故障域",
      mechanism:
        "会被同一原因同时影响的链路、设备、电源、机架、机房或管理依赖集合",
      evidence: "监控、日志、备份与复核人",
    },
  ],
  gates: [
    "首版目录与需求追溯",
    "物理/逻辑拓扑和正反向通信流",
    "容量、增长与单故障余量",
    "接口、地址、路由、NAT和策略表",
    "监控、日志、状态同步与恢复实验",
    "偏差、回退、责任人与复核人",
  ],
} as const;

export function IsnOfficialFinalReviewPlanLab() {
  return (
    <ServerNetworkDesignLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="plan"
    />
  );
}

export function IsnOfficialFinalReviewFaultLab() {
  return (
    <ServerNetworkDesignLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="fault"
    />
  );
}

export function IsnOfficialFinalReviewEvidenceLab() {
  return (
    <ServerNetworkDesignLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
