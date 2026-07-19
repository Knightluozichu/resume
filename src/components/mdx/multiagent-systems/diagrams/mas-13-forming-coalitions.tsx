import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-13-forming-coalitions",
  "title": "Chapter 13 Forming Coalitions",
  "question": "三名运输代理共享路线，枚举八个联盟价值并分配节省",
  "actors": [
    "合作博弈代理",
    "核心代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "定义联盟值",
    "枚举结构",
    "检查核心",
    "计算贡献",
    "比较分配"
  ],
  "concepts": [
    "Chapter 13 Forming Coalitions",
    "13.1 Cooperative Games",
    "13.1.1 The Core",
    "13.1.2 The Shapley Value",
    "13.2 Computational and Representational Issues",
    "13.3 Modular Representations",
    "13.3.1 Induced Subgraphs",
    "13.3.2 Marginal Contribution Nets",
    "13.4 Representations for Simple Games",
    "13.4.1 Weighted Voting Games",
    "13.4.2 Network Flow Games",
    "13.5 Coalitional Games with Goals",
    "13.6 Coalition Structure Formation"
  ],
  "interventions": [
    {
      "label": "公开合作博弈",
      "detail": "让所有评审者看到合作博弈的定义，保持核心和Shapley值不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验Shapley值",
      "detail": "在Shapley值进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过紧凑表示",
      "detail": "跳过紧凑表示直接追求联盟结构，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "合作博弈不稳定度",
    "Shapley值联合收益",
    "联盟结构可追踪度"
  ],
  "partialNote": "公平分配可能不在核心，稳定分配也可能不满足选定公平公理。",
  "strategicNote": "拒绝原因：联盟总收益足够，却因分配让子联盟更愿意脱离。"
} as const;

export function Mas13FormingCoalitionsModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function Mas13FormingCoalitionsInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function Mas13FormingCoalitionsEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
