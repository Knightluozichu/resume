"use client";

import { ServerNetworkDesignLab } from "./official-server-network-design-lab";

const config = {
  unitTitle: "第3章 数据安全设计和负载均衡设计",
  snapshot: "《图解服务器端网络架构》2015年首版 / 场内基础设施设计",
  focus:
    "从TCP/UDP与端口进入防火墙、目的NAT和健康检查，再用HTTP、SSL、FTP、DNS理解应用通信并完成纵深防御与负载均衡设计",
  nodes: [
    "3.1 传输层的技术",
    "3.1.1 通过端口号划分服务器进程",
    "3.1.1.1 传输层使用TCP和UDP两种协议",
    "3.1.1.2 TCP的工作原理比较复杂",
    "3.1.1.3 MTU和MSS的差异在于对象层不同",
    "3.1.2 用防火墙守卫系统",
    "3.1.2.1 基于连接进行控制",
    "3.1.2.2 状态检测和包过滤之间的区别",
    "3.1.2.3 防火墙在不断进步",
    "3.1.3 通过负载均衡器分散服务器的负荷",
    "3.1.3.1 目的NAT是服务器负载均衡技术的基础",
    "3.1.3.2 通过健康检查监控服务器的状态",
    "3.1.3.3 熟练掌握可选功能",
    "3.2 从会话层到应用层的技术",
    "3.2.1 HTTP支撑着互联网",
    "3.2.1.1 HTTP/1.0和HTTP/1.1的TCP连接用法大相径庭",
    "3.2.1.2 HTTP因请求和响应而得以成立",
    "3.2.2 用SSL保护数据",
    "3.2.2.1 防止窃听、篡改和冒充",
    "3.2.2.2 通过SSL可以给各种各样的应用程序协议加密",
    "3.2.2.3 SSL使用混合加密方式进行加密",
    "3.2.2.4 消息摘要是消息的概要",
    "3.2.2.5 SSL中执行着大量的处理",
    "3.2.2.6 用客户端证书对客户端进行认证",
    "3.2.3 用FTP传输文件",
    "3.2.3.1 主动模式使用特定的端口",
    "3.2.3.2 被动模式改变使用的端口",
    "3.2.3.3 FTP就应该当作FTP去处理",
    "3.2.4 用DNS解析名称",
    "3.2.4.1 用UDP进行名称解析",
    "3.2.4.2 用TCP进行区域传输",
    "3.3 数据安全设计与负载均衡设计",
    "3.3.1 数据安全设计",
    "3.3.1.1 整理出真正需要的通信",
    "3.3.1.2 通过多级防御提高安全系数",
    "3.3.1.3 默认启动的服务应控制在最小范围内",
    "3.3.2 负载均衡设计",
    "3.3.2.1 要高效地均衡负载",
    "3.3.2.2 启用哪些可选功能",
  ],
  invariant:
    "每条允许流和负载均衡虚拟服务都写明五元组、连接状态、地址转换、应用协议、健康判据、返回路径与最小权限",
  failure:
    "只开一个宽泛端口或只看负载均衡VIP可达，会遗漏动态端口、SSL处理、DNS TCP/UDP差异、健康检查与回程NAT状态",
  links: [
    {
      label: "五元组",
      mechanism: "由源IP、目的IP、源端口、目的端口和传输协议标识的通信流",
      evidence: "需求、拓扑与通信流",
    },
    {
      label: "状态检测",
      mechanism: "跟踪连接建立与方向，只允许属于合法会话的后续报文",
      evidence: "接口、VLAN、地址与状态表",
    },
    {
      label: "目的NAT",
      mechanism: "把客户端访问的虚拟目的地址转换为真实服务器地址的负载均衡基础",
      evidence: "容量、故障与恢复时间",
    },
    {
      label: "健康检查",
      mechanism: "以TCP、HTTP或应用事务持续判断后端是否可接收新流量",
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

export function Isn03SecurityLoadBalancingPlanLab() {
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

export function Isn03SecurityLoadBalancingFaultLab() {
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

export function Isn03SecurityLoadBalancingEvidenceLab() {
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
