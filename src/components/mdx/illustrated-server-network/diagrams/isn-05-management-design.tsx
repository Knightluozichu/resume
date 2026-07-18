"use client";

import { ServerNetworkDesignLab } from "./official-server-network-design-lab";

const config = {
  unitTitle: "第5章 管理设计",
  snapshot: "《图解服务器端网络架构》2015年首版 / 场内基础设施设计",
  focus:
    "用NTP、SNMP、Syslog、CDP/LLDP、主机名、标签、密码和配置备份/恢复把网络变成可观察、可识别、可恢复的系统",
  nodes: [
    "5.1 管理技术",
    "5.1.1 用NTP同步时间",
    "专栏：NTP的工作原理非常简单",
    "5.1.2 用SNMP检测故障",
    "5.1.2.1 通过SNMP管理器和SNMP代理交换信息",
    "5.1.2.2 熟练掌握三种运作模式",
    "5.1.2.3 限制源IP地址",
    "5.1.3 用Syslog检测故障",
    "专栏：Syslog的工作原理非常简单",
    "5.1.4 传递设备信息",
    "5.1.4.1 CDP",
    "5.1.4.2 LLDP",
    "5.1.4.3 注意CDP和LLDP的数据安全问题",
    "5.2 管理设计",
    "5.2.1 确定主机名",
    "5.2.2 通过标签管理连接",
    "5.2.2.1 线缆标签",
    "5.2.2.2 本体标签",
    "5.2.3 设计密码",
    "5.2.4 管理设置信息",
    "5.2.4.1 在备份设计中应定义时机、方式和保存地点",
    "5.2.4.2 发生故障时执行恢复处理",
  ],
  invariant:
    "告警、日志、拓扑、设备、端口和配置都能用一致时间与唯一标识关联，并能在隔离环境按备份独立恢复",
  failure:
    "只保存配置文件而没有时间同步、日志来源、标签、凭据流程和恢复演练，故障时仍无法定位正确设备或确认恢复点",
  links: [
    {
      label: "NTP",
      mechanism:
        "让设备时钟沿分层时间源同步，为日志关联、认证和故障分析提供共同时间轴",
      evidence: "需求、拓扑与通信流",
    },
    {
      label: "SNMP",
      mechanism: "由管理器读取代理MIB、接收Trap/Inform并监测状态的网络管理协议",
      evidence: "接口、VLAN、地址与状态表",
    },
    {
      label: "Syslog",
      mechanism: "按设施与严重级别集中传递设备事件日志的机制",
      evidence: "容量、故障与恢复时间",
    },
    {
      label: "LLDP",
      mechanism: "跨厂商在相邻链路上传递设备与端口身份的链路层发现协议",
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

export function Isn05ManagementDesignPlanLab() {
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

export function Isn05ManagementDesignFaultLab() {
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

export function Isn05ManagementDesignEvidenceLab() {
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
