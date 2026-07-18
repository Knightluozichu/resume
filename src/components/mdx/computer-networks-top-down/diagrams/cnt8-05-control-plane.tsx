"use client";

import { TopDownNetworkLab } from "./official-top-down-network-lab";

const config = {
  unitTitle: "第5章 网络层：控制平面",
  focus:
    "从链路状态与距离向量算法进入OSPF、BGP、SDN控制器、ICMP以及SNMP和NETCONF/YANG网络管理",
  invariant:
    "每条转发规则都有可追溯的拓扑或策略输入、算法选择、控制消息、收敛状态、管理配置和故障证据",
  failure:
    "把最短路径等同于域间最佳路由，或只看控制邻居不验证数据平面，会忽略BGP策略、收敛瞬态和配置漂移",
  nodes: [
    "第5章 网络层：控制平面",
    "5.1 概述",
    "5.2 路由选择算法",
    "5.2.1 链路状态路由选择算法",
    "5.2.2 距离向量路由选择算法",
    "5.3 因特网中自治系统内部的路由选择：OSPF",
    "5.4 ISP之间的路由选择：BGP",
    "5.4.1 BGP的作用",
    "5.4.2 通告BGP路由信息",
    "5.4.3 确定好的路由",
    "5.4.4 IP任播",
    "5.4.5 路由选择策略",
    "5.4.6 拼装在一起：在因特网中呈现",
    "5.5 SDN控制平面",
    "5.5.1 SDN控制平面：SDN控制器和SDN网络控制应用程序",
    "5.5.2 OpenFlow协议",
    "5.5.3 数据平面和控制平面交互的例子",
    "5.5.4 SDN的过去与未来",
    "5.6 ICMP：因特网控制报文协议",
    "5.7 网络管理、SNMP和NETCONF/YANG",
    "5.7.1 网络管理框架",
    "5.7.2 简单网络管理协议和管理信息库",
    "5.7.3 NETCONF和YANG",
    "5.8 小结",
  ],
  links: [
    {
      label: "链路状态",
      mechanism: "让节点获得拓扑与链路代价后独立计算最短路径的路由方法",
      evidence: "应用报文与进程/端点状态",
    },
    {
      label: "距离向量",
      mechanism: "节点与邻居迭代交换目的距离并按Bellman-Ford关系更新的路由方法",
      evidence: "运输序号、窗口、RTT与重传",
    },
    {
      label: "OSPF",
      mechanism: "在自治系统内部传播链路状态并计算路由的域内协议",
      evidence: "转发、路由、邻居与链路表项",
    },
    {
      label: "BGP",
      mechanism: "在自治系统之间通告前缀可达性和路径属性并执行策略的协议",
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

export function Cnt805ControlPlaneMapLab() {
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

export function Cnt805ControlPlaneExperimentLab() {
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

export function Cnt805ControlPlaneEvidenceLab() {
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
