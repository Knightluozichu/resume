import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-03-deductive-reasoning-agents",
  "title": "Chapter 3 Deductive Reasoning Agents",
  "question": "仓库代理根据库存、通道与安全规则证明一次搬运动作合法",
  "actors": [
    "定理证明代理",
    "规则库代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "编码信念",
    "提出目标",
    "搜索证明",
    "选择动作",
    "执行复核"
  ],
  "concepts": [
    "Chapter 3 Deductive Reasoning Agents",
    "3.1 Agents as Theorem Provers",
    "3.2 Agent-Oriented Programming",
    "3.3 Concurrent MetateM"
  ],
  "interventions": [
    {
      "label": "公开定理证明",
      "detail": "让所有评审者看到定理证明的定义，保持规则库和不完备性不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验不完备性",
      "detail": "在不完备性进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过时效",
      "detail": "跳过时效直接追求反模型，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "定理证明不稳定度",
    "不完备性联合收益",
    "反模型可追踪度"
  ],
  "partialNote": "无法在行动截止前完成推理时，应采用受限规则或反应层。",
  "strategicNote": "拒绝原因：证明完成后环境已经改变，代理仍执行基于旧信念的行动。"
} as const;

export function Mas03DeductiveReasoningAgentsModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function Mas03DeductiveReasoningAgentsInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function Mas03DeductiveReasoningAgentsEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
