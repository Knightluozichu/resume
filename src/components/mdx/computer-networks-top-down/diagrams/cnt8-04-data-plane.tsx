"use client";

import { TopDownNetworkLab } from "./official-top-down-network-lab";

const config = {
  unitTitle: "第4章 网络层：数据平面",
  focus:
    "分离转发与路由，剖析路由器输入、交换、输出、排队和调度，并掌握IPv4编址、NAT、IPv6、泛化转发、SDN与中间盒",
  invariant:
    "任一分组的本地处理都能由匹配字段、转发表项、队列和调度动作解释，地址转换与返回路径保持可逆状态",
  failure:
    "只查看路由表而忽略输入匹配、交换能力、输出队列、ACL/NAT和中间盒状态，会把数据平面丢包错误归因于路由协议",
  nodes: [
    "第4章 网络层：数据平面",
    "4.1 网络层概述",
    "4.1.1 转发和路由选择：数据平面和控制平面",
    "4.1.2 网络服务模型",
    "4.2 路由器工作原理",
    "4.2.1 输入端口处理和基于目的地转发",
    "4.2.2 交换",
    "4.2.3 输出端口处理",
    "4.2.4 何处出现排队",
    "4.2.5 分组调度",
    "4.3 网际协议：IPv4、寻址、IPv6及其他",
    "4.3.1 IPv4数据报格式",
    "4.3.2 IPv4编址",
    "4.3.3 网络地址转换",
    "4.3.4 IPv6",
    "4.4 泛化转发和SDN",
    "4.4.1 匹配",
    "4.4.2 操作",
    "4.4.3 运行中的匹配加操作的OpenFlow例子",
    "4.5 中间盒",
    "4.6 小结",
  ],
  links: [
    {
      label: "转发",
      mechanism: "路由器在本地依据转发表把到达分组移到适当输出端口的动作",
      evidence: "应用报文与进程/端点状态",
    },
    {
      label: "最长前缀匹配",
      mechanism: "在多个目的前缀中选择位数最长且匹配目标地址的规则",
      evidence: "运输序号、窗口、RTT与重传",
    },
    {
      label: "NAT",
      mechanism: "在边界改写地址或端口并维护映射状态的网络地址转换机制",
      evidence: "转发、路由、邻居与链路表项",
    },
    {
      label: "泛化转发",
      mechanism: "按多个首部字段匹配并执行转发、丢弃、改写等动作的模型",
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

export function Cnt804DataPlaneMapLab() {
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

export function Cnt804DataPlaneExperimentLab() {
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

export function Cnt804DataPlaneEvidenceLab() {
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
