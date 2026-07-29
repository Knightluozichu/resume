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
      "先预测：把VLAN、IP网段和安全区随意混用，或只验证去程不验证回程，会产生广播泄漏、地址冲突、非对称路由和NAT故障。把预测写成“需求、正常路径、状态/表项、单故障路径、告警与恢复”五列，再接线、配置或测试。若结果与预测不同，先修正设计模型，不要把现场补丁当作架构成立。",
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
      "交换机从入站帧学习源MAC与端口映射，再按目的MAC查表；未知单播与广播会在VLAN内泛洪。VLAN通过端口成员和802.1Q标签隔离广播域，Trunk必须在两端一致允许所需VLAN。",
    failure:
      "若只记住「核心机制深读」的设备名称而不追踪流量路径、故障域和容量边界，拓扑在切换、拥塞或链路中断时会暴露单点。",
    evidence:
      "画出「核心机制深读」的端到端报文路径，以抓包、路由与负载均衡状态验证正常流量，再注入链路或节点故障核对收敛结果。",
  },
];

export function Isn02LogicalDesignDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第2章 逻辑设计：机制与证据"
      prompt="切换《第2章 逻辑设计》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第2章 逻辑设计》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Isn02LogicalDesignMechanismMap() {
  return (
    <ChapterMechanismMap title="第2章 逻辑设计：机制路径" stages={STAGES} />
  );
}

export function Isn02LogicalDesignFailureDiagram() {
  return (
    <ChapterFailureMatrix title="第2章 逻辑设计：失效与核验" stages={STAGES} />
  );
}
