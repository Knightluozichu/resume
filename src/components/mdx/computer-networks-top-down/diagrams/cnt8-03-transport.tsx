"use client";

import { TopDownNetworkLab } from "./official-top-down-network-lab";

const config = {
  unitTitle: "第3章 运输层",
  focus:
    "解释端到端复用、UDP、可靠数据传输、TCP连接与流量控制、拥塞原因以及经典和现代拥塞控制演化",
  invariant:
    "可靠性、流量控制与拥塞控制分别对应链路错误、接收方容量和网络容量，状态机与序号空间能解释每次发送、确认、超时和窗口变化",
  failure:
    "把接收窗口当拥塞窗口、把一次超时当单一原因或忽略重传歧义，会得到错误的吞吐与恢复结论",
  nodes: [
    "第3章 运输层",
    "3.1 概述和运输层服务",
    "3.1.1 运输层和网络层的关系",
    "3.1.2 因特网运输层概述",
    "3.2 多路复用与多路分解",
    "3.3 无连接运输：UDP",
    "3.3.1 UDP报文段结构",
    "3.3.2 UDP检验和",
    "3.4 可靠数据传输原理",
    "3.4.1 构造可靠数据传输协议",
    "3.4.2 流水线可靠数据传输协议",
    "3.4.3 回退N步",
    "3.4.4 选择重传",
    "3.5 面向连接的运输：TCP",
    "3.5.1 TCP连接",
    "3.5.2 TCP报文段结构",
    "3.5.3 往返时间的估计与超时",
    "3.5.4 可靠数据传输",
    "3.5.5 流量控制",
    "3.5.6 TCP连接管理",
    "3.6 拥塞控制原理",
    "3.6.1 拥塞原因与代价",
    "3.6.2 拥塞控制方法",
    "3.7 TCP拥塞控制",
    "3.7.1 经典的TCP拥塞控制",
    "3.7.2 网络辅助明确拥塞通告和基于时延的拥塞控制",
    "3.7.3 公平性",
    "3.8 运输层功能的演化",
    "3.9 小结",
  ],
  links: [
    {
      label: "多路分解",
      mechanism: "运输层依据端点标识把到达报文段交给正确套接字的过程",
      evidence: "应用报文与进程/端点状态",
    },
    {
      label: "可靠数据传输",
      mechanism: "在丢失、损坏、重复或乱序信道上向上层提供正确有序数据的机制",
      evidence: "运输序号、窗口、RTT与重传",
    },
    {
      label: "接收窗口",
      mechanism: "接收方通告的可用缓冲空间，用于端到端流量控制",
      evidence: "转发、路由、邻居与链路表项",
    },
    {
      label: "拥塞窗口",
      mechanism: "发送方依据网络拥塞信号限制的在途数据上限",
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

export function Cnt803TransportMapLab() {
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

export function Cnt803TransportExperimentLab() {
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

export function Cnt803TransportEvidenceLab() {
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
