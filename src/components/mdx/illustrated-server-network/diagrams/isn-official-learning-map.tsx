"use client";

import { ServerNetworkDesignLab } from "./official-server-network-design-lab";

const config = {
  unitTitle: "2015年首版权威学习地图",
  snapshot: "《图解服务器端网络架构》2015年首版 / 场内基础设施设计",
  focus:
    "把第0章和5个设计章、171个正式目录节点还原为从需求到运行的服务器端网络基础设计闭环",
  nodes: [
    "第0章 本书的用法",
    "第1章 物理设计",
    "第2章 逻辑设计",
    "第3章 数据安全设计和负载均衡设计",
    "第4章 高可用性设计",
    "第5章 管理设计",
  ],
  invariant:
    "任一设计决定都能回溯到需求、OSI责任层、容量上限、冗余路径、管理证据和恢复步骤",
  failure:
    "把本书改写成Nginx、CDN、微服务和Service Mesh专题，会遗漏线缆、机架、VLAN、路由、NAT、STP、FHRP及管理设计这些原书主干",
  links: [
    {
      label: "基础设计",
      mechanism:
        "把需求转成物理、逻辑、安全与负载均衡、高可用和管理规则的上游工程",
      evidence: "需求、拓扑与通信流",
    },
    {
      label: "物理设计",
      mechanism: "确定设备、线缆、端口、机架、电源与环境约束的设计活动",
      evidence: "接口、VLAN、地址与状态表",
    },
    {
      label: "逻辑设计",
      mechanism: "确定VLAN、地址、路由、NAT及协议边界的设计活动",
      evidence: "容量、故障与恢复时间",
    },
    {
      label: "高可用性",
      mechanism: "通过分层冗余和明确通信流减少单点故障并确保可恢复性",
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

export function IsnOfficialLearningMapPlanLab() {
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

export function IsnOfficialLearningMapFaultLab() {
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

export function IsnOfficialLearningMapEvidenceLab() {
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
