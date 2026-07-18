"use client";

import { ServerNetworkDesignLab } from "./official-server-network-design-lab";

const config = {
  unitTitle: "第4章 高可用性设计",
  snapshot: "《图解服务器端网络架构》2015年首版 / 场内基础设施设计",
  focus:
    "按物理、数据链路、网络、传输到应用层配置链路聚合、网卡绑定、设备虚拟化、STP、FHRP及防火墙/负载均衡冗余并理清通信流",
  nodes: [
    "4.1 冗余技术",
    "4.1.1 物理层的冗余技术",
    "4.1.1.1 将多条物理链路集结成一条逻辑链路",
    "4.1.1.2 将多个物理网卡集结成一个逻辑网卡",
    "4.1.1.3 将多台物理设备集结成一台逻辑设备",
    "4.1.1.4 当上行链路中断时，让下行链路也随之中断",
    "4.1.2 数据链路层的冗余技术",
    "4.1.2.1 STP的关键在于根网桥和阻塞端口",
    "4.1.2.2 STP有三种",
    "4.1.2.3 同时启用多项可选功能",
    "4.1.2.4 利用BPDU切断桥接环路",
    "4.1.3 网络层的冗余技术",
    "4.1.3.1 FHRP",
    "4.1.3.2 利用路由协议确保通往上层设备的路径",
    "4.1.4 从传输层到应用层的冗余技术",
    "4.1.4.1 防火墙的冗余技术",
    "4.1.4.2 负载均衡器的冗余技术",
    "4.2 高可用性设计",
    "4.2.1 高可用性设计",
    "4.2.1.1 串联式结构",
    "4.2.1.2 单路并联式结构",
    "4.2.2 理清通信流",
    "4.2.2.1 串联式结构",
    "4.2.2.2 单路并联式结构",
  ],
  invariant:
    "任一链路或单台设备故障后，剩余路径无环、状态一致、容量足够，正反向流量按设计恢复且管理面能观察到切换",
  failure:
    "设备成双不等于高可用；若忽略STP阻塞、FHRP网关、状态同步、回程路径和故障后容量，切换会形成环路、黑洞或连接中断",
  links: [
    {
      label: "链路聚合",
      mechanism: "把多条物理链路组合成一条逻辑链路以增加容量和冗余",
      evidence: "需求、拓扑与通信流",
    },
    {
      label: "STP",
      mechanism: "通过选根网桥和阻塞冗余端口消除二层桥接环路的协议族",
      evidence: "接口、VLAN、地址与状态表",
    },
    {
      label: "BPDU",
      mechanism: "交换机之间交换生成树信息并保护拓扑的控制报文",
      evidence: "容量、故障与恢复时间",
    },
    {
      label: "FHRP",
      mechanism: "让多台三层设备共同提供一个虚拟默认网关的第一跳冗余协议",
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

export function Isn04HighAvailabilityPlanLab() {
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

export function Isn04HighAvailabilityFaultLab() {
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

export function Isn04HighAvailabilityEvidenceLab() {
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
