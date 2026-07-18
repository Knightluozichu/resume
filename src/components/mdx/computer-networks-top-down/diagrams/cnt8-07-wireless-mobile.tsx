"use client";

import { TopDownNetworkLab } from "./official-top-down-network-lab";

const config = {
  unitTitle: "第7章 无线网络和移动网络",
  focus:
    "从无线链路特征进入802.11、蓝牙、4G LTE、5G、移动性管理、漫游与高层协议影响",
  invariant:
    "接入、鉴别、无线资源、核心网隧道、位置状态与切换过程能共同解释移动设备在变化链路上的会话连续性",
  failure:
    "用有线碰撞模型解释隐藏终端，或只看信号强度不看关联、调度、核心网状态和切换，会误判无线故障",
  nodes: [
    "第7章 无线网络和移动网络",
    "7.1 概述",
    "7.2 无线链路和网络特征",
    "7.3 WiFi：802.11无线局域网",
    "7.3.1 802.11无线局域网体系结构",
    "7.3.2 802.11 MAC协议",
    "7.3.3 IEEE 802.11帧",
    "7.3.4 在相同的IP子网中的移动性",
    "7.3.5 802.11中的高级特色",
    "7.3.6 个人域网络：蓝牙",
    "7.4 蜂窝网络：4G和5G",
    "7.4.1 4G LTE蜂窝网络：架构和部件",
    "7.4.2 LTE协议栈",
    "7.4.3 LTE无线电接入网",
    "7.4.4 LTE附加功能：网络连接和功率管理",
    "7.4.5 全球蜂窝网络：网络的网络",
    "7.4.6 5G蜂窝网络",
    "7.5 移动性管理原理",
    "7.5.1 设备移动性：网络层视角",
    "7.5.2 归属网络和在被访网络漫游",
    "7.5.3 去往/来自移动设备的直接和间接路由",
    "7.6 实践中的移动性管理",
    "7.6.1 4G/5G网络的移动性管理",
    "7.6.2 移动IP",
    "7.7 无线和移动性：对高层协议的影响",
    "7.8 小结",
  ],
  links: [
    {
      label: "CSMA/CA",
      mechanism: "无线局域网通过侦听、随机退避与可选预约降低碰撞概率的访问机制",
      evidence: "应用报文与进程/端点状态",
    },
    {
      label: "隐藏终端",
      mechanism: "两个发送节点彼此不可听见但会在共同接收节点处相互干扰的情形",
      evidence: "运输序号、窗口、RTT与重传",
    },
    {
      label: "基站",
      mechanism: "为无线设备提供接入并连接移动核心网的无线网络节点",
      evidence: "转发、路由、邻居与链路表项",
    },
    {
      label: "切换",
      mechanism:
        "移动设备在保持服务时把接入关系从一个无线节点迁移到另一个的过程",
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

export function Cnt807WirelessMobileMapLab() {
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

export function Cnt807WirelessMobileExperimentLab() {
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

export function Cnt807WirelessMobileEvidenceLab() {
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
