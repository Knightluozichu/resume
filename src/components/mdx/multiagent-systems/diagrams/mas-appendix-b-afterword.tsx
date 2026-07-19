import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-appendix-b-afterword",
  "title": "Appendix B -- Afterword",
  "question": "从后记提取一项可证伪的研究问题并设计复核",
  "actors": [
    "作者视角代理",
    "时代语境代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "识别观点",
    "绑定日期",
    "拆出主张",
    "查找证据",
    "形成问题"
  ],
  "concepts": [
    "Appendix B -- Afterword"
  ],
  "interventions": [
    {
      "label": "公开作者视角",
      "detail": "让所有评审者看到作者视角的定义，保持时代语境和事实主张不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验事实主张",
      "detail": "在事实主张进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过研究问题",
      "detail": "跳过研究问题直接追求后续证据，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "作者视角不稳定度",
    "事实主张联合收益",
    "后续证据可追踪度"
  ],
  "partialNote": "观点没有明确可观察后果时，只保留为阅读背景。",
  "strategicNote": "拒绝原因：把作者的展望句当成已经验证的技术性质。"
} as const;

export function MasAppendixBAfterwordModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function MasAppendixBAfterwordInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function MasAppendixBAfterwordEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
