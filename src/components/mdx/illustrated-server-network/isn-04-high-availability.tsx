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
      "先预测：设备成双不等于高可用；若忽略STP阻塞、FHRP网关、状态同步、回程路径和故障后容量，切换会形成环路、黑洞或连接中断。把预测写成“需求、正常路径、状态/表项、单故障路径、告警与恢复”五列，再接线、配置或测试。若结果与预测不同，先修正设计模型，不要把现场补丁当作架构成立。",
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
      "链路聚合提高并行带宽并容忍成员故障，服务器网卡绑定形成逻辑接口，设备堆叠或虚拟化把多机作为逻辑节点。若两条链路仍共用模块、电源或管道，它们不是独立冗余。",
    failure:
      "若只记住「核心机制深读」的设备名称而不追踪流量路径、故障域和容量边界，拓扑在切换、拥塞或链路中断时会暴露单点。",
    evidence:
      "画出「核心机制深读」的端到端报文路径，以抓包、路由与负载均衡状态验证正常流量，再注入链路或节点故障核对收敛结果。",
  },
];

export function Isn04HighAvailabilityDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第4章 高可用性设计：机制与证据"
      prompt="切换《第4章 高可用性设计》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第4章 高可用性设计》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Isn04HighAvailabilityMechanismMap() {
  return (
    <ChapterMechanismMap title="第4章 高可用性设计：机制路径" stages={STAGES} />
  );
}

export function Isn04HighAvailabilityFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第4章 高可用性设计：失效与核验"
      stages={STAGES}
    />
  );
}
