"use client";

import { TopDownNetworkLab } from "./official-top-down-network-lab";

const config = {
  unitTitle: "原书第8版权威学习地图",
  focus:
    "沿应用层、运输层、网络层数据平面、网络层控制平面、链路层、无线移动与安全自顶向下追踪一条端到端通信",
  invariant:
    "任一网络结论都能定位到层、协议实体、报文或状态、性能边界、失败路径以及可复现证据",
  failure:
    "按设备名或零散协议背诵会切断跨层因果，也会把第7版退役内容或第9版新增内容误当成第8版正文",
  nodes: [
    "版本门：中文版与英文原版第8版",
    "第1章 计算机网络和因特网",
    "第2章 应用层",
    "第3章 运输层",
    "第4章 网络层：数据平面",
    "第5章 网络层：控制平面",
    "第6章 链路层和局域网",
    "第7章 无线网络和移动网络",
    "第8章 计算机网络中的安全",
    "端到端证据链与版次复核",
  ],
  links: [
    {
      label: "协议",
      mechanism: "定义通信实体交换报文的格式、次序以及发送或接收动作的规则",
      evidence: "应用报文与进程/端点状态",
    },
    {
      label: "服务模型",
      mechanism: "某一层向上一层承诺提供的能力集合，而非内部实现细节",
      evidence: "运输序号、窗口、RTT与重传",
    },
    {
      label: "封装",
      mechanism: "数据向下穿越协议栈时逐层添加本层控制信息的过程",
      evidence: "转发、路由、邻居与链路表项",
    },
    {
      label: "数据平面",
      mechanism: "在单台网络设备中按既有规则逐包执行转发的本地功能",
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

export function Cnt8OfficialLearningMapMapLab() {
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

export function Cnt8OfficialLearningMapExperimentLab() {
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

export function Cnt8OfficialLearningMapEvidenceLab() {
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
