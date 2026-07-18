"use client";

import { TopDownNetworkLab } from "./official-top-down-network-lab";

const config = {
  unitTitle: "第2章 应用层",
  focus:
    "从进程通信与运输服务需求进入HTTP、电子邮件、DNS、P2P、视频/CDN和UDP/TCP套接字编程",
  invariant:
    "每个应用协议都能说明通信进程、寻址、报文格式与次序、运输服务、状态位置、缓存或复制策略以及失败语义",
  failure:
    "只记端口号而不区分应用状态、运输连接、缓存一致性和命名依赖，会在代理、CDN、DNS或并发连接处误判",
  nodes: [
    "第2章 应用层",
    "2.1 网络应用原理",
    "2.1.1 网络应用体系结构",
    "2.1.2 进程通信",
    "2.1.3 可供应用程序使用的运输服务",
    "2.1.4 因特网提供的运输服务",
    "2.1.5 应用层协议",
    "2.1.6 本书涉及的网络应用",
    "2.2 Web和HTTP",
    "2.2.1 HTTP概述",
    "2.2.2 非持续连接和持续连接",
    "2.2.3 HTTP报文格式",
    "2.2.4 用户与服务器的交互：cookie",
    "2.2.5 Web缓存",
    "2.2.6 HTTP/2",
    "2.3 因特网中的电子邮件",
    "2.3.1 SMTP",
    "2.3.2 邮件报文格式",
    "2.3.3 邮件访问协议",
    "2.4 DNS：因特网的目录服务",
    "2.4.1 DNS提供的服务",
    "2.4.2 DNS工作机理概述",
    "2.4.3 DNS记录和报文",
    "2.5 P2P文件分发",
    "2.6 视频流和内容分发网",
    "2.6.1 因特网视频",
    "2.6.2 HTTP流和DASH",
    "2.6.3 内容分发网",
    "2.6.4 学习案例：Netflix和YouTube",
    "2.7 套接字编程：生成网络应用",
    "2.7.1 UDP套接字编程",
    "2.7.2 TCP套接字编程",
    "2.8 小结",
  ],
  links: [
    {
      label: "套接字",
      mechanism: "应用进程与运输层之间发送和接收报文的编程接口",
      evidence: "应用报文与进程/端点状态",
    },
    {
      label: "HTTP",
      mechanism: "定义Web客户与服务器交换请求和响应报文语义的应用层协议",
      evidence: "运输序号、窗口、RTT与重传",
    },
    {
      label: "DNS",
      mechanism: "把主机名等名称映射为资源记录并由分层服务器协作提供的目录服务",
      evidence: "转发、路由、邻居与链路表项",
    },
    {
      label: "CDN",
      mechanism: "把内容副本部署到多个边缘位置并按策略选择交付节点的系统",
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

export function Cnt802ApplicationMapLab() {
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

export function Cnt802ApplicationExperimentLab() {
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

export function Cnt802ApplicationEvidenceLab() {
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
