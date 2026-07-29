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
      "先预测：只开一个宽泛端口或只看负载均衡VIP可达，会遗漏动态端口、SSL处理、DNS TCP/UDP差异、健康检查与回程NAT状态。把预测写成“需求、正常路径、状态/表项、单故障路径、告警与恢复”五列，再接线、配置或测试。若结果与预测不同，先修正设计模型，不要把现场补丁当作架构成立。",
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
      "端口区分同一主机上的服务进程，TCP用握手、序列、确认、窗口和结束维护可靠连接，UDP不维护连接。MTU限制IP包，MSS限制TCP数据部分；错误的MTU/MSS会造成分片或黑洞。",
    failure:
      "若只记住「核心机制深读」的设备名称而不追踪流量路径、故障域和容量边界，拓扑在切换、拥塞或链路中断时会暴露单点。",
    evidence:
      "画出「核心机制深读」的端到端报文路径，以抓包、路由与负载均衡状态验证正常流量，再注入链路或节点故障核对收敛结果。",
  },
];

export function Isn03SecurityLoadBalancingDecisionLab() {
  return (
    <ChapterDecisionLab
      title="第3章 数据安全设计和负载均衡设计：机制与证据"
      prompt="切换《第3章 数据安全设计和负载均衡设计》的三个关键教学阶段，先解释机制，再用运行与失败证据验证结论。"
      stages={STAGES}
      conclusion="学完《第3章 数据安全设计和负载均衡设计》后，应能从输入和前置条件推导状态变化，并用可重复的构建、运行或边界测试证明结果。"
    />
  );
}

export function Isn03SecurityLoadBalancingMechanismMap() {
  return (
    <ChapterMechanismMap
      title="第3章 数据安全设计和负载均衡设计：机制路径"
      stages={STAGES}
    />
  );
}

export function Isn03SecurityLoadBalancingFailureDiagram() {
  return (
    <ChapterFailureMatrix
      title="第3章 数据安全设计和负载均衡设计：失效与核验"
      stages={STAGES}
    />
  );
}
