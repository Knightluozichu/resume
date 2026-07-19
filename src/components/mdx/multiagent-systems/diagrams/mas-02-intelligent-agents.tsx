import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-02-intelligent-agents",
  "title": "Chapter 2 Intelligent Agents",
  "question": "把恒温器、对象服务、专家系统和自主机器人放入同一判定表",
  "actors": [
    "代理与对象代理",
    "专家系统代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "接收感知",
    "更新状态",
    "解释目标",
    "选择行动",
    "观察后果"
  ],
  "concepts": [
    "Chapter 2 Intelligent Agents",
    "2.1 Intelligent Agents",
    "2.2 Agents and Objects",
    "2.3 Agents and Expert Systems",
    "2.4 Agents as Intentional Systems",
    "2.5 Abstract Architectures for Intelligent Agents",
    "2.6 How to Tell an Agent What to Do"
  ],
  "interventions": [
    {
      "label": "公开代理与对象",
      "detail": "让所有评审者看到代理与对象的定义，保持专家系统和意向系统不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验意向系统",
      "detail": "在意向系统进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过抽象架构",
      "detail": "跳过抽象架构直接追求任务指令，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "代理与对象不稳定度",
    "意向系统联合收益",
    "任务指令可追踪度"
  ],
  "partialNote": "高层意向词不能替代实现语义，必须能落到输入、状态与行动。",
  "strategicNote": "拒绝原因：用‘想要’和‘相信’解释行为，却没有可执行的状态或选择规则。"
} as const;

export function Mas02IntelligentAgentsModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function Mas02IntelligentAgentsInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function Mas02IntelligentAgentsEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
