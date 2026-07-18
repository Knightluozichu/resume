"use client";

import { ServerNetworkDesignLab } from "./official-server-network-design-lab";

const config = {
  unitTitle: "第1章 物理设计",
  snapshot: "《图解服务器端网络架构》2015年首版 / 场内基础设施设计",
  focus:
    "从物理层规格、串联/单路并联拓扑、设备容量、OS、线缆、端口、机架、电源和承重完成可施工设计",
  nodes: [
    "1.1 物理层的技术",
    "1.1.1 物理层里有多种规格",
    "1.1.1.1 规格整理好后物理层就会水落石出",
    "1.1.1.2 双绞线电缆有两大要素——类和传输距离",
    "1.1.1.3 光纤光缆是用玻璃制成的",
    "1.2 物理设计",
    "1.2.1 服务器端有两种结构类型",
    "1.2.1.1 采用串联式结构管理起来更方便",
    "1.2.1.2 采用单路并联式结构更容易扩展",
    "1.2.2 选用设备时应参考考查项的最大值",
    "1.2.2.1 应用程序不同吞吐率也就不同",
    "1.2.2.2 新增连接数和并发连接数都要考虑",
    "1.2.3 选择稳定可靠的OS版本",
    "专栏：不懂就问是捷径",
    "1.2.4 根据实际配置和使用目的选择线缆",
    "1.2.4.1 远距离传输选择光纤光缆",
    "1.2.4.2 追求宽频带和高可靠性时选择光纤",
    "1.2.4.3 通过大小分类决定使用哪种双绞线电缆",
    "1.2.4.4 预先决定好使用线缆的颜色",
    "1.2.5 端口的物理设计出乎意料地重要",
    "1.2.5.1 必须统一规划连接到哪里",
    "1.2.5.2 速率和双工、Auto MDI/MDI-X的设置也要统一规划",
    "1.2.6 巧妙地配置设备",
    "1.2.6.1 将核心交换机和汇聚交换机置于中央部位",
    "1.2.6.2 要考虑设备中空气吸入和排出的方向",
    "1.2.6.3 从两套系统获取电源",
    "1.2.6.4 切莫超过最大承重",
  ],
  invariant:
    "端到端链路的介质、速率、双工、距离、连接器、端口、供电、散热和承重均在规格范围内且留有容量余量",
  failure:
    "只比较设备标称吞吐或只画逻辑拓扑，会在连接峰值、线缆距离、端口模式、气流、电源或机架承重处失败",
  links: [
    {
      label: "双绞线电缆",
      mechanism: "以类别、速率、频率、连接器和最大传输距离共同约束的铜缆介质",
      evidence: "需求、拓扑与通信流",
    },
    {
      label: "光纤光缆",
      mechanism: "以单模/多模、波长、模块、连接器和光功率预算约束的光介质",
      evidence: "接口、VLAN、地址与状态表",
    },
    {
      label: "吞吐率",
      mechanism: "设备在特定报文与功能条件下实际可转发的数据量",
      evidence: "容量、故障与恢复时间",
    },
    {
      label: "并发连接数",
      mechanism: "设备同时维持的连接状态数量，与每秒新增连接数是不同容量维度",
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

export function Isn01PhysicalDesignPlanLab() {
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

export function Isn01PhysicalDesignFaultLab() {
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

export function Isn01PhysicalDesignEvidenceLab() {
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
