import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-04-practical-reasoning-agents",
  "title": "Chapter 4 Practical Reasoning Agents",
  "question": "配送代理在新订单、道路封闭与已有承诺之间重新规划",
  "actors": [
    "审议代理",
    "手段目的代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "更新信念",
    "审议愿望",
    "承诺意图",
    "生成计划",
    "重考虑"
  ],
  "concepts": [
    "Chapter 4 Practical Reasoning Agents",
    "4.1 Practical Reasoning = Deliberation + Means-Ends Reasoning",
    "4.2 Means--Ends Reasoning",
    "4.3 Implementing a Practical Reasoning Agent",
    "4.4 The Procedural Reasoning System"
  ],
  "interventions": [
    {
      "label": "公开审议",
      "detail": "让所有评审者看到审议的定义，保持手段目的和BDI不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验BDI",
      "detail": "在BDI进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过承诺",
      "detail": "跳过承诺直接追求PRS，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "审议不稳定度",
    "BDI联合收益",
    "PRS可追踪度"
  ],
  "partialNote": "重考虑太频繁导致抖动，太少导致僵化；策略必须由环境变化率验证。",
  "strategicNote": "拒绝原因：环境已让计划不可行，代理仍因过度承诺继续执行。"
} as const;

export function Mas04PracticalReasoningAgentsModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function Mas04PracticalReasoningAgentsInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function Mas04PracticalReasoningAgentsEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
