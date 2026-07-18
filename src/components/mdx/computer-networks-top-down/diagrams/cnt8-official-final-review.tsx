"use client";

import { TopDownNetworkLab } from "./official-top-down-network-lab";

const config = {
  unitTitle: "原书第8版总复习与端到端诊断",
  focus:
    "把218个正式节点压缩为从应用意图、运输状态、转发与路由、局部链路、无线移动到多层安全的可复现诊断闭环",
  invariant:
    "面对任一正常或失败场景，都能先预测逐层状态与报文，再用单变量实验定位首个偏离模型的层和责任实体",
  failure:
    "从日志中挑一个异常直接归因会混淆根因与连锁反应，尤其会把应用超时误判为DNS、TCP、路由或无线中的任意一项",
  nodes: [
    "复核第1章：组成、性能与分层",
    "复核第2章：应用协议与套接字",
    "复核第3章：可靠运输与拥塞",
    "复核第4章：数据平面",
    "复核第5章：控制与管理平面",
    "复核第6章：链路与局域网",
    "复核第7章：无线与移动",
    "复核第8章：跨层安全",
    "复核218个正式节点",
    "完成独立端到端故障诊断",
  ],
  links: [
    {
      label: "端到端路径",
      mechanism: "从源应用进程经各层和中间网络到目的应用进程的完整通信链",
      evidence: "应用报文与进程/端点状态",
    },
    {
      label: "首个偏差",
      mechanism: "实际证据第一次偏离预期状态机或报文时间线的位置",
      evidence: "运输序号、窗口、RTT与重传",
    },
    {
      label: "单变量实验",
      mechanism: "固定其余条件只改变一个协议、路径、状态或故障因素的验证方法",
      evidence: "转发、路由、邻居与链路表项",
    },
    {
      label: "证据链",
      mechanism:
        "把需求、配置、状态、报文、指标、日志和结论按时间与实体关联的记录",
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

export function Cnt8OfficialFinalReviewMapLab() {
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

export function Cnt8OfficialFinalReviewExperimentLab() {
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

export function Cnt8OfficialFinalReviewEvidenceLab() {
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
