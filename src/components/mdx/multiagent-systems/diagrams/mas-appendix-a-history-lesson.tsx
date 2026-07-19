import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-appendix-a-history-lesson",
  "title": "Appendix A -- A History Lesson",
  "question": "比较两个时期关于自治协作的愿景与可运行证据",
  "actors": [
    "分布式AI代理",
    "代理浪潮代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "定位时期",
    "记录愿景",
    "检查条件",
    "寻找结果",
    "比较迁移"
  ],
  "concepts": [
    "Appendix A -- A History Lesson"
  ],
  "interventions": [
    {
      "label": "公开分布式AI",
      "detail": "让所有评审者看到分布式AI的定义，保持代理浪潮和计算条件不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验计算条件",
      "detail": "在计算条件进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过评价证据",
      "detail": "跳过评价证据直接追求后见偏差，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "分布式AI不稳定度",
    "计算条件联合收益",
    "后见偏差可追踪度"
  ],
  "partialNote": "没有同期材料支持的因果结论应降级为解释假设。",
  "strategicNote": "拒绝原因：用今天成功的系统回写早期研究者当时并未拥有的能力。"
} as const;

export function MasAppendixAHistoryLessonModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function MasAppendixAHistoryLessonInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function MasAppendixAHistoryLessonEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
