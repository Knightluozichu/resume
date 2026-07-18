"use client";

import { TopDownNetworkLab } from "./official-top-down-network-lab";

const config = {
  unitTitle: "第6章 链路层和局域网",
  focus:
    "掌握链路层服务、差错检测、共享信道协议、ARP与以太网交换、VLAN、链路虚拟化、数据中心网络和完整Web请求回顾",
  invariant:
    "同一链路上的帧交付能由成帧、差错检测、介质访问、MAC学习、VLAN边界和下一跳解析共同解释",
  failure:
    "把IP子网、VLAN、广播域和交换表混成同一概念，会在ARP、Trunk、环路和未知单播处产生错误设计",
  nodes: [
    "第6章 链路层和局域网",
    "6.1 链路层概述",
    "6.1.1 链路层提供的服务",
    "6.1.2 链路层在何处实现",
    "6.2 差错检测和纠正技术",
    "6.2.1 奇偶校验",
    "6.2.2 检验和方法",
    "6.2.3 循环冗余检测",
    "6.3 多路访问链路和协议",
    "6.3.1 信道划分协议",
    "6.3.2 随机接入协议",
    "6.3.3 轮流协议",
    "6.3.4 DOCSIS：用于电缆因特网接入的链路层协议",
    "6.4 交换局域网",
    "6.4.1 链路层寻址和ARP",
    "6.4.2 以太网",
    "6.4.3 链路层交换机",
    "6.4.4 虚拟局域网",
    "6.5 链路虚拟化：网络作为链路层",
    "6.6 数据中心网络",
    "6.6.1 数据中心体系结构",
    "6.6.2 数据中心网络的发展趋势",
    "6.7 回顾：Web页面请求的历程",
    "6.7.1 准备：DHCP、UDP、IP和以太网",
    "6.7.2 仍在准备：DNS和ARP",
    "6.7.3 仍在准备：域内路由选择到DNS服务器",
    "6.7.4 Web客户-服务器交互：TCP和HTTP",
    "6.8 小结",
  ],
  links: [
    {
      label: "CRC",
      mechanism: "把比特串视为多项式并用生成多项式余数检测突发错误的方法",
      evidence: "应用报文与进程/端点状态",
    },
    {
      label: "多路访问协议",
      mechanism: "协调多个节点共享同一广播信道发送机会的规则",
      evidence: "运输序号、窗口、RTT与重传",
    },
    {
      label: "MAC地址",
      mechanism: "链路层接口用于局部帧交付的标识",
      evidence: "转发、路由、邻居与链路表项",
    },
    {
      label: "ARP",
      mechanism: "在IPv4链路上把下一跳IP地址解析为MAC地址的协议",
      evidence: "安全握手、策略、告警与恢复",
    },
  ],
  gates: [
    "第8版节点与版本边界",
    "正常端到端报文时间线",
    "协议状态、表项与配置快照",
    "时延、吞吐、丢包和容量基线",
    "单变量故障、告警与恢复",
    "偏差说明、责任人与复核人",
  ],
} as const;

export function Cnt806LinkLansMapLab() {
  return (
    <TopDownNetworkLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="map"
    />
  );
}

export function Cnt806LinkLansExperimentLab() {
  return (
    <TopDownNetworkLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="experiment"
    />
  );
}

export function Cnt806LinkLansEvidenceLab() {
  return (
    <TopDownNetworkLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
