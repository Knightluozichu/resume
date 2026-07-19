import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-11-multiagent-interactions",
  "title": "Chapter 11 Multiagent Interactions",
  "question": "手算双人两行动囚徒困境并改变一次重复博弈贴现",
  "actors": [
    "效用偏好代理",
    "占优策略代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "列行动集",
    "填写收益",
    "标最佳响应",
    "找均衡",
    "比较效率"
  ],
  "concepts": [
    "Chapter 11 Multiagent Interactions",
    "11.1 Utilities and Preferences",
    "11.2 Setting the Scene",
    "11.3 Solution Concepts and Solution Properties",
    "11.3.1 Dominant Strategies",
    "11.3.2 Nash Equilibria",
    "11.3.3 Pareto Efficiency",
    "11.3.4 Maximising Social Welfare",
    "11.4 Competitive and Zero-Sum Interactions",
    "11.5 The Prisoner's Dilemma",
    "11.5.1 The shadow of the future",
    "11.5.2 Program Equilibria",
    "11.6 Other Symmetric 2 x2 Interactions",
    "11.7 Representing Multiagent Scenarios",
    "11.8 Dependence Relations in Multiagent Systems"
  ],
  "interventions": [
    {
      "label": "公开效用偏好",
      "detail": "让所有评审者看到效用偏好的定义，保持占优策略和纳什均衡不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验纳什均衡",
      "detail": "在纳什均衡进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过帕累托",
      "detail": "跳过帕累托直接追求社会福利，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "效用偏好不稳定度",
    "纳什均衡联合收益",
    "社会福利可追踪度"
  ],
  "partialNote": "均衡不保证合作或公平；没有重复和未来价值时不能凭愿望支持合作。",
  "strategicNote": "拒绝原因：把高社会福利结果误称为纳什均衡，未检查单方偏离。"
} as const;

export function Mas11MultiagentInteractionsModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function Mas11MultiagentInteractionsInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function Mas11MultiagentInteractionsEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
