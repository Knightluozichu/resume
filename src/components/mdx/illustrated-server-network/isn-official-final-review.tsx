"use client";

import {
  ChapterDecisionLab,
  ChapterFailureMatrix,
  ChapterMechanismMap,
  type DecisionStage,
} from "../chapter-decision-lab";

const STAGES: readonly DecisionStage[] = [
  {
    label: "从一条可证伪的通信流开始",
    mechanism:
      "先预测：只展示一张漂亮拓扑和设备清单，不足以证明地址、允许流、回程、冗余容量、状态同步和恢复操作正确。把预测写成“需求、正常路径、状态/表项、单故障路径、告警与恢复”五列，再接线、配置或测试。若结果与预测不同，先修正设计模型，不要把现场补丁当作架构成立。",
    failure:
      "若只记住「从一条可证伪的通信流开始」的设备名称而不追踪流量路径、故障域和容量边界，拓扑在切换、拥塞或链路中断时会暴露单点。",
    evidence:
      "画出「从一条可证伪的通信流开始」的端到端报文路径，以抓包、路由与负载均衡状态验证正常流量，再注入链路或节点故障核对收敛结果。",
  },
  {
    label: "核心词汇与首版边界",
    mechanism:
      "这些词汇固定在2015年首版语境。第2版新增或更新的技术、云上托管网络、容器网络和Service Mesh可以另行比较，但不改变本页目录分母。",
    failure:
      "若只记住「核心词汇与首版边界」的设备名称而不追踪流量路径、故障域和容量边界，拓扑在切换、拥塞或链路中断时会暴露单点。",
    evidence:
      "画出「核心词汇与首版边界」的端到端报文路径，以抓包、路由与负载均衡状态验证正常流量，再注入链路或节点故障核对收敛结果。",
  },
  {
    label: "核心机制深读",
    mechanism:
      "每项拓扑、设备、VLAN、地址、路由、安全、均衡、冗余和管理决定都引用需求；每项需求都至少有设计和测试承接。例外必须有风险、期限和责任人。",
    failure:
      "若只记住「核心机制深读」的设备名称而不追踪流量路径、故障域和容量边界，拓扑在切换、拥塞或链路中断时会暴露单点。",
    evidence:
      "画出「核心机制深读」的端到端报文路径，以抓包、路由与负载均衡状态验证正常流量，再注入链路或节点故障核对收敛结果。",
  },
];

export function IsnOfficialFinalReviewDecisionLab() {
  return (
    <ChapterDecisionLab
      title="2015年首版总复习与网络设计评审：机制与证据"
      prompt="切换《2015年首版总复习与网络设计评审》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《2015年首版总复习与网络设计评审》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function IsnOfficialFinalReviewMechanismMap() {
  return (
    <ChapterMechanismMap
      title="2015年首版总复习与网络设计评审：机制路径"
      stages={STAGES}
    />
  );
}

export function IsnOfficialFinalReviewFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="2015年首版总复习与网络设计评审：失效与核验"
      stages={STAGES}
    />
  );
}
