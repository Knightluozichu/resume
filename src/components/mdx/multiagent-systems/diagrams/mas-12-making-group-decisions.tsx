import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-12-making-group-decisions",
  "title": "Chapter 12 Making Group Decisions",
  "question": "三名代理对三个方案排序，比较四种投票规则与议程变化",
  "actors": [
    "社会选择代理",
    "plurality代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "收集排序",
    "选择规则",
    "计算得分",
    "处理平票",
    "测试操纵"
  ],
  "concepts": [
    "Chapter 12 Making Group Decisions",
    "12.1 Social Welfare Functions and Social Choice Functions",
    "12.2 Voting Procedures",
    "12.2.1 Plurality",
    "12.2.2 Sequential Majority Elections",
    "12.2.3 The Borda Count",
    "12.2.4 The Slater Ranking",
    "12.3 Desirable Properties for Voting Procedures",
    "12.3.1 Arrow's Theorem",
    "12.4 Strategic Manipulation"
  ],
  "interventions": [
    {
      "label": "公开社会选择",
      "detail": "让所有评审者看到社会选择的定义，保持plurality和Borda不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验Borda",
      "detail": "在Borda进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过Arrow",
      "detail": "跳过Arrow直接追求策略操纵，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "社会选择不稳定度",
    "Borda联合收益",
    "策略操纵可追踪度"
  ],
  "partialNote": "没有同时满足全部理想性质的通用规则，必须公开取舍和议程。",
  "strategicNote": "拒绝原因：只保存第一选择，导致无法重算 Borda 或识别策略投票。"
} as const;

export function Mas12MakingGroupDecisionsModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function Mas12MakingGroupDecisionsInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function Mas12MakingGroupDecisionsEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
