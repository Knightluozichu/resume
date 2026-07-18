"use client";

import { ServerNetworkDesignLab } from "./official-server-network-design-lab";

const config = {
  unitTitle: "第0章 本书的用法",
  snapshot: "《图解服务器端网络架构》2015年首版 / 场内基础设施设计",
  focus:
    "掌握网络架构六阶段，并把基础设计拆成物理、逻辑、安全与负载均衡、高可用和管理五类交付物",
  nodes: [
    "0.1 网络架构的流程",
    "0.1.1 网络架构分为六个阶段",
    "0.1.1.1 需求定义",
    "0.1.1.2 基础设计",
    "0.1.1.3 详细设计",
    "0.1.1.4 架构",
    "0.1.1.5 测试",
    "0.1.1.6 运行",
    "0.1.2 网络架构的重点是基础设计",
    "0.1.2.1 物理设计",
    "0.1.2.2 逻辑设计",
    "0.1.2.3 安全设计与负载均衡设计",
    "0.1.2.4 高可用性设计",
    "0.1.2.5 管理设计",
  ],
  invariant:
    "每个基础设计决定都能找到需求来源、详细设计承接项、测试方法和运行责任人",
  failure:
    "直接采购设备或复制既有配置再补文档，会让容量、通信、安全与恢复假设无法验证",
  links: [
    {
      label: "需求定义",
      mechanism: "确认业务目标、范围、流量、可用性、安全、管理和约束的阶段",
      evidence: "需求、拓扑与通信流",
    },
    {
      label: "基础设计",
      mechanism: "规定架构方式、地址策略、安全区、冗余和管理等全局规则的阶段",
      evidence: "接口、VLAN、地址与状态表",
    },
    {
      label: "详细设计",
      mechanism: "把基础规则细化为设备、接口、参数、配置与步骤的阶段",
      evidence: "容量、故障与恢复时间",
    },
    {
      label: "测试",
      mechanism: "用正常、边界和故障场景证明设计满足需求的阶段",
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

export function Isn00BookUsagePlanLab() {
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

export function Isn00BookUsageFaultLab() {
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

export function Isn00BookUsageEvidenceLab() {
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
