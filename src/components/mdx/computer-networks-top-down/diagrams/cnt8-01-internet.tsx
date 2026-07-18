"use client";

import { TopDownNetworkLab } from "./official-top-down-network-lab";

const config = {
  unitTitle: "第1章 计算机网络和因特网",
  focus:
    "从具体构成与服务定义因特网，建立网络边缘、网络核心、分组交换性能、协议分层、安全威胁和历史演化的总模型",
  invariant:
    "每次端到端交付都能解释接入链路、核心交换、发送与传播边界、排队与丢包、吞吐瓶颈和逐层封装",
  failure:
    "把带宽当作传输速度或忽略排队、协议开销与瓶颈链路，会让时延和吞吐预测在负载变化时失效",
  nodes: [
    "第1章 计算机网络和因特网",
    "1.1 什么是因特网",
    "1.1.1 具体构成描述",
    "1.1.2 服务描述",
    "1.1.3 什么是协议",
    "1.2 网络边缘",
    "1.2.1 接入网",
    "1.2.2 物理媒介",
    "1.3 网络核心",
    "1.3.1 分组交换",
    "1.3.2 电路交换",
    "1.3.3 网络的网络",
    "1.4 分组交换网中的时延、丢包和吞吐量",
    "1.4.1 分组交换网中的时延",
    "1.4.2 排队时延和丢包",
    "1.4.3 端到端时延",
    "1.4.4 计算机网络中的吞吐量",
    "1.5 协议层次及其服务模型",
    "1.5.1 分层的体系结构",
    "1.5.2 封装",
    "1.6 面对攻击的网络",
    "1.7 计算机网络和因特网的历史",
    "1.7.1 分组交换的发展：1961～1972",
    "1.7.2 专用网络和网络互联：1972～1980",
    "1.7.3 网络的激增：1980～1990",
    "1.7.4 因特网爆炸：20世纪90年代",
    "1.7.5 新发展",
    "1.8 小结",
  ],
  links: [
    {
      label: "分组交换",
      mechanism: "把报文切成分组并在共享链路上逐跳存储转发的交换方式",
      evidence: "应用报文与进程/端点状态",
    },
    {
      label: "排队时延",
      mechanism: "分组在输出链路可发送之前等待其他分组完成发送的时间",
      evidence: "运输序号、窗口、RTT与重传",
    },
    {
      label: "吞吐量",
      mechanism: "单位时间内端到端成功交付的有效数据量，受路径瓶颈限制",
      evidence: "转发、路由、邻居与链路表项",
    },
    {
      label: "协议栈",
      mechanism: "按服务依赖组织的一组分层协议及其接口",
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

export function Cnt801InternetMapLab() {
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

export function Cnt801InternetExperimentLab() {
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

export function Cnt801InternetEvidenceLab() {
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
