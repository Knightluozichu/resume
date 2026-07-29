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
      "先预测：只比较设备标称吞吐或只画逻辑拓扑，会在连接峰值、线缆距离、端口模式、气流、电源或机架承重处失败。把预测写成“需求、正常路径、状态/表项、单故障路径、告警与恢复”五列，再接线、配置或测试。若结果与预测不同，先修正设计模型，不要把现场补丁当作架构成立。",
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
      "铜缆要核对类别、长度、布线环境与两端端口；光纤要核对单模/多模、波长、模块、连接器、距离和光功率。链路能力由最弱一段决定，不能只看交换机端口写着10GbE。",
    failure:
      "若只记住「核心机制深读」的设备名称而不追踪流量路径、故障域和容量边界，拓扑在切换、拥塞或链路中断时会暴露单点。",
    evidence:
      "画出「核心机制深读」的端到端报文路径，以抓包、路由与负载均衡状态验证正常流量，再注入链路或节点故障核对收敛结果。",
  },
];

export function Isn01PhysicalDesignDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第1章 物理设计：机制与证据"
      prompt="切换《第1章 物理设计》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第1章 物理设计》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Isn01PhysicalDesignMechanismMap() {
  return (
    <ChapterMechanismMap title="第1章 物理设计：机制路径" stages={STAGES} />
  );
}

export function Isn01PhysicalDesignFailureDiagram() {
  return (
    <ChapterFailureMatrix title="第1章 物理设计：失效与核验" stages={STAGES} />
  );
}
