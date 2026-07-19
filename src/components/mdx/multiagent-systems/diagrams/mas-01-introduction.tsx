import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-01-introduction",
  "title": "Chapter 1 Introduction",
  "question": "两个配送代理共享道路、充电点和时间窗时定义联合任务",
  "actors": [
    "自治实体代理",
    "局部信息代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "定义代理",
    "描述环境",
    "列出观察",
    "组合行动",
    "评价结果"
  ],
  "concepts": [
    "Chapter 1 Introduction",
    "1.1 The Vision Thing",
    "1.2 Some Views of the Field",
    "1.2.1 Agents as a paradigm for software engineering",
    "1.2.2 Agents as a tool for understanding human societies",
    "1.3 Frequently Asked Questions (FAQ)"
  ],
  "interventions": [
    {
      "label": "公开自治实体",
      "detail": "让所有评审者看到自治实体的定义，保持局部信息和联合行动不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验联合行动",
      "detail": "在联合行动进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过社会视角",
      "detail": "跳过社会视角直接追求常见误解，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "自治实体不稳定度",
    "联合行动联合收益",
    "常见误解可追踪度"
  ],
  "partialNote": "若没有相互影响的联合行动，问题可拆成独立任务，不必使用多智能体机制。",
  "strategicNote": "拒绝原因：只测每个代理单独完成任务，不记录联合状态和相互干扰。"
} as const;

export function Mas01IntroductionModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function Mas01IntroductionInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function Mas01IntroductionEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
