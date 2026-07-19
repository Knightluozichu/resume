import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-part-02-intelligent-autonomous-agents",
  "title": "Part II Intelligent Autonomous Agents",
  "question": "为移动机器人同时处理长期任务、局部避障和故障停机",
  "actors": [
    "抽象架构代理",
    "演绎推理代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "环境合同",
    "架构候选",
    "决策轨迹",
    "冲突仲裁",
    "性质复核"
  ],
  "concepts": [
    "Part II Intelligent Autonomous Agents"
  ],
  "interventions": [
    {
      "label": "公开抽象架构",
      "detail": "让所有评审者看到抽象架构的定义，保持演绎推理和BDI不变。",
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
      "label": "绕过反应层",
      "detail": "跳过反应层直接追求混合仲裁，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "抽象架构不稳定度",
    "BDI联合收益",
    "混合仲裁可追踪度"
  ],
  "partialNote": "复杂架构只有在新增层改善可测性质且冲突可解释时才值得保留。",
  "strategicNote": "拒绝原因：为同时拥有推理与反应层就宣称混合架构可靠，却没有冲突优先级。"
} as const;

export function MasPart02IntelligentAutonomousAgentsModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function MasPart02IntelligentAutonomousAgentsInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function MasPart02IntelligentAutonomousAgentsEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
