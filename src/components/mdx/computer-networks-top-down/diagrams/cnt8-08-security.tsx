"use client";

import { TopDownNetworkLab } from "./official-top-down-network-lab";

const config = {
  unitTitle: "第8章 计算机网络中的安全",
  focus:
    "从威胁模型和密码学原理建立完整性、签名、端点鉴别、邮件、TLS、IPsec、无线/蜂窝鉴别、防火墙与入侵检测",
  invariant:
    "每项安全结论都明确保护目标、信任根、密钥归属、握手新鲜性、保护范围、失败模式和可审计证据",
  failure:
    "把加密等同于完整安全，或不验证证书身份、随机数、密钥方向和策略边界，会留下重放、中间人和错误放行",
  nodes: [
    "第8章 计算机网络中的安全",
    "8.1 什么是网络安全",
    "8.2 密码学原理",
    "8.2.1 对称密钥密码体制",
    "8.2.2 公开密钥加密",
    "8.3 报文完整性和数字签名",
    "8.3.1 密码散列函数",
    "8.3.2 报文鉴别码",
    "8.3.3 数字签名",
    "8.4 端点鉴别",
    "8.5 安全电子邮件",
    "8.5.1 安全电子邮件概述",
    "8.5.2 PGP",
    "8.6 使TCP连接安全：TLS",
    "8.6.1 宏观描述",
    "8.6.2 更完整的描述",
    "8.7 网络层安全性：IPsec和虚拟专用网",
    "8.7.1 IPsec和虚拟专用网",
    "8.7.2 AH协议和ESP协议",
    "8.7.3 安全关联",
    "8.7.4 IPsec数据报",
    "8.7.5 IKE：IPsec中的密钥管理",
    "8.8 实现安全的无线局域网和4G/5G蜂窝网络",
    "8.8.1 802.11无线局域网中的鉴别和密钥协商",
    "8.8.2 4G/5G蜂窝网络中的鉴别和密钥协商",
    "8.9 运行安全性：防火墙和入侵检测系统",
    "8.9.1 防火墙",
    "8.9.2 入侵检测系统",
    "8.10 小结",
  ],
  links: [
    {
      label: "机密性",
      mechanism: "使未获授权的观察者无法理解受保护信息的安全属性",
      evidence: "应用报文与进程/端点状态",
    },
    {
      label: "报文鉴别码",
      mechanism: "使用共享密钥验证报文完整性和来源真实性的短标签",
      evidence: "运输序号、窗口、RTT与重传",
    },
    {
      label: "数字签名",
      mechanism: "用私钥生成并可由公钥验证来源与完整性的密码学结果",
      evidence: "转发、路由、邻居与链路表项",
    },
    {
      label: "TLS",
      mechanism: "在可靠运输之上协商身份与密钥并保护应用字节流的安全协议",
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

export function Cnt808SecurityMapLab() {
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

export function Cnt808SecurityExperimentLab() {
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

export function Cnt808SecurityEvidenceLab() {
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
