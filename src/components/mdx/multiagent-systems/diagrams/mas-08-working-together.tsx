import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-08-working-together",
  "title": "Chapter 8 Working Together",
  "question": "搜索队伍分区、共享发现、重分配失联成员的任务",
  "actors": [
    "合同网代理",
    "结果共享代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "分解任务",
    "公告竞标",
    "授予承诺",
    "共享结果",
    "协调恢复"
  ],
  "concepts": [
    "Chapter 8 Working Together",
    "8.1 Cooperative Distributed Problem Solving",
    "8.2 Task Sharing and Result Sharing",
    "8.2.1 Task sharing in the Contract Net",
    "8.3 Result Sharing",
    "8.4 Combining Task and Result Sharing",
    "8.5 Handling Inconsistency",
    "8.6 Coordination",
    "8.6.1 Coordination through partial global planning",
    "8.6.2 Coordination through joint intentions",
    "8.6.3 Coordination by mutual modelling",
    "8.6.4 Coordination by norms and social laws",
    "8.7 Multiagent Planning and Synchronization"
  ],
  "interventions": [
    {
      "label": "公开合同网",
      "detail": "让所有评审者看到合同网的定义，保持结果共享和不一致不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验不一致",
      "detail": "在不一致进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过联合意图",
      "detail": "跳过联合意图直接追求社会规范，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "合同网不稳定度",
    "不一致联合收益",
    "社会规范可追踪度"
  ],
  "partialNote": "任务依赖无法通过局部消息表达时，需要显式联合计划或中央协调。",
  "strategicNote": "拒绝原因：一个成员私下放弃任务，其他成员仍基于旧承诺等待。"
} as const;

export function Mas08WorkingTogetherModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function Mas08WorkingTogetherInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function Mas08WorkingTogetherEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
