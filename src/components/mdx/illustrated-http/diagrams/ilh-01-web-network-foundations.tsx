"use client";

import { IllustratedHttpLab } from "./official-illustrated-http-lab";

const config = {
  unitTitle: "第1章 了解Web及网络基础",
  snapshot: "《图解HTTP》2014年4月首版 / HTTP/1.1时代",
  focus: "理解Web的诞生、TCP/IP四层封装、IP/TCP/DNS协作以及URI的标识与语法",
  nodes: [
    "1.1 使用HTTP协议访问Web",
    "1.2 HTTP的诞生",
    "1.2.1 为知识共享而规划Web",
    "1.2.2 Web成长时代",
    "1.2.3 驻足不前的HTTP",
    "1.3 网络基础TCP/IP",
    "1.3.1 TCP/IP协议族",
    "1.3.2 TCP/IP的分层管理",
    "1.3.3 TCP/IP通信传输流",
    "1.4 与HTTP关系密切的协议：IP、TCP和DNS",
    "1.4.1 负责传输的IP协议",
    "1.4.2 确保可靠性的TCP协议",
    "1.5 负责域名解析的DNS服务",
    "1.6 各种协议与HTTP协议的关系",
    "1.7 URI和URL",
    "1.7.1 统一资源标识符",
    "1.7.2 URI格式",
  ],
  invariant:
    "输入一个URI后，能按DNS解析、TCP连接、HTTP交换、分层封装的顺序说明每一步的地址、数据单位和责任",
  failure:
    "把HTTP等同于整个互联网，或把IP地址、MAC地址、域名和URI混为一谈，会导致故障定位跨错层",
  links: [
    {
      label: "TCP/IP协议族",
      mechanism: "围绕互联网通信形成的一组分层协议，而不只是TCP和IP两个协议",
      evidence: "请求行、目标URI与时间线",
    },
    {
      label: "封装",
      mechanism: "发送端逐层添加首部、接收端逐层去除首部的过程",
      evidence: "原始首部、主体边界与状态码",
    },
    {
      label: "IP",
      mechanism: "在网络层按IP地址选择路径并尽力交付数据包的协议",
      evidence: "正常/失败对照和状态前后值",
    },
    {
      label: "TCP",
      mechanism: "在传输层提供可靠、有序字节流的协议",
      evidence: "缓存、会话或安全边界复核",
    },
  ],
  gates: [
    "首版目录节点与2014年技术边界",
    "原始请求行、状态行与首部",
    "主体边界、编码和表示元数据",
    "连接、中介、缓存或会话状态",
    "单变量失败与无副作用证明",
    "恢复、限制、责任人与复核人",
  ],
} as const;

export function Ilh01WebNetworkFoundationsFlowLab() {
  return (
    <IllustratedHttpLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="flow"
    />
  );
}

export function Ilh01WebNetworkFoundationsExperimentLab() {
  return (
    <IllustratedHttpLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="experiment"
    />
  );
}

export function Ilh01WebNetworkFoundationsEvidenceLab() {
  return (
    <IllustratedHttpLab
      {...config}
      nodes={[...config.nodes]}
      links={[...config.links]}
      gates={[...config.gates]}
      mode="evidence"
    />
  );
}
