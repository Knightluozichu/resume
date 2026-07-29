"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "主机与路由",
    mechanism: "先确认接口、地址、路由、邻居和网络命名空间。",
    failure: "在宿主机观察容器故障，或忽略策略路由。",
    evidence: "ip addr/route/neigh、nsenter 与时间戳。",
  },
  {
    label: "连接与进程",
    mechanism: "用 ss/lsof 把 socket 状态映射到 PID、fd 和监听队列。",
    failure: "只看端口存在，不看 SYN backlog、TIME_WAIT 或进程重启。",
    evidence: "ss -tanp、进程启动时间与 fd 清单。",
  },
  {
    label: "线上字节",
    mechanism: "tcpdump 按五元组抓取握手、重传、窗口和 FIN/RST。",
    failure: "抓错接口、过滤条件过宽，或用单包解释长期趋势。",
    evidence: "pcap、序列号、RTT/retrans 指标与应用 trace。",
  },
];

export function NetworkEvidenceCommandLab() {
  return (
    <ChapterDecisionLab
      title="网络故障现象到命令证据的映射"
      prompt="选择故障层级，组合能证伪假设的命令，而不是堆砌工具输出。"
      stages={STAGES}
      conclusion="命令只是观测窗口；诊断质量取决于时间、命名空间、五元组和进程上下文是否对齐。"
    />
  );
}

export function NetworkEvidenceCommandMechanismMap() {
  return (
    <ChapterMechanismMap title="网络故障现象到命令证据的映射" stages={STAGES} />
  );
}

export function NetworkEvidenceCommandFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="网络故障现象到命令证据的映射"
      stages={STAGES}
    />
  );
}
