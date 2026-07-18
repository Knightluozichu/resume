"use client";

import { ServerNetworkDesignLab } from "./official-server-network-design-lab";

const config = {
  unitTitle: "第2章 逻辑设计",
  snapshot: "《图解服务器端网络架构》2015年首版 / 场内基础设施设计",
  focus:
    "贯通以太网成帧、MAC交换、VLAN、ARP、IPv4、路由、NAT、DHCP、ICMP并形成可汇总的VLAN与地址设计",
  nodes: [
    "2.1 数据链路层的技术",
    "2.1.1 数据链路层是物理层的帮手",
    "专栏：用以太网标准进行成帧处理",
    "2.1.2 数据链路层的关键在于L2交换机的运作",
    "2.1.2.1 交换MAC地址",
    "2.1.2.2 通过VLAN将广播域分隔开",
    "2.1.3 ARP将逻辑和物理关联到一起",
    "2.1.3.1 ARP通过IP地址查询MAC地址",
    "2.1.3.2 抓取ARP包，观察它的写法",
    "2.1.3.3 有几个特殊的ARP",
    "2.2 网络层的技术",
    "2.2.1 网络是由网络层拼接起来的",
    "2.2.1.1 添加IP报头，进行分组化处理",
    "2.2.1.2 IP地址由32位构成",
    "2.2.2 将网段连接起来",
    "2.2.2.1 利用IP地址进行路由选择",
    "2.2.2.2 建立路由表",
    "2.2.2.3 整理路由表",
    "2.2.3 转换IP地址",
    "2.2.3.1 转换IP地址",
    "2.2.3.2 私网IP地址",
    "2.2.4 自动设置IP地址的DHCP",
    "2.2.4.1 DHCP的消息部分中包含着诸多的信息",
    "2.2.4.2 DHCP的原理非常简单",
    "2.2.4.3 对DHCP报文作中继处理",
    "2.2.5 用于故障排除的ICMP",
    "2.2.5.1 ICMP的关键在于类型和代码",
    "2.2.5.2 常见的类型和代码有四种组合",
    "2.2.5.3 出现问题时先尝试用ping去排除故障",
    "2.3 逻辑设计",
    "2.3.1 整理出所需的VLAN",
    "2.3.1.1 实际所需的VLAN会因为诸多因素而变化",
    "2.3.1.2 规定VLAN的ID",
    "2.3.2 在考虑数量增减的基础上分配IP地址",
    "2.3.2.1 IP地址的估算数量应高于当前所需数量",
    "2.3.2.2 按顺序排列网段，使之更容易汇总",
    "2.3.2.3 必须统一规定从何处开始分配IP地址",
    "2.3.3 路由选择以简为上",
    "2.3.3.1 考虑在路由选择中使用哪些协议",
    "2.3.3.2 考虑采用哪种路由选择方法",
    "2.3.3.3 将路径汇总以减少路径数量",
    "2.3.4 NAT要按入站和出站分别考虑",
    "2.3.4.1 NAT是在系统边界进行的",
    "2.3.4.2 通过入站通信转换地址",
    "2.3.4.3 通过出站通信转换地址",
  ],
  invariant:
    "每个广播域、IP网段、默认网关、路由与NAT方向都有唯一责任，正反向通信流均能由表项和报文证据解释",
  failure:
    "把VLAN、IP网段和安全区随意混用，或只验证去程不验证回程，会产生广播泄漏、地址冲突、非对称路由和NAT故障",
  links: [
    {
      label: "VLAN",
      mechanism: "在L2交换网络中划分广播域的逻辑标识与端口成员关系",
      evidence: "需求、拓扑与通信流",
    },
    {
      label: "ARP",
      mechanism: "在同一IPv4链路上把下一跳IP地址解析为MAC地址的协议",
      evidence: "接口、VLAN、地址与状态表",
    },
    {
      label: "路由表",
      mechanism: "按目的前缀选择下一跳与出接口的有序规则集合",
      evidence: "容量、故障与恢复时间",
    },
    {
      label: "NAT",
      mechanism: "在系统边界改写报文地址或端口并维护对应关系的机制",
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

export function Isn02LogicalDesignPlanLab() {
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

export function Isn02LogicalDesignFaultLab() {
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

export function Isn02LogicalDesignEvidenceLab() {
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
