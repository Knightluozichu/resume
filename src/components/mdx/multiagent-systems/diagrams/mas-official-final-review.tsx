import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-official-final-review",
  "title": "An Introduction to MultiAgent Systems 第二版总复习",
  "question": "设计三个自主代理共享稀缺资源并处理消息丢失与策略偏离",
  "actors": [
    "参与者代理",
    "信息代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "冻结模型",
    "运行交互",
    "执行机制",
    "验证性质",
    "回退复盘"
  ],
  "concepts": [
    "Preface",
    "Part I Setting the Scene",
    "Chapter 1 Introduction",
    "Part II Intelligent Autonomous Agents",
    "Chapter 2 Intelligent Agents",
    "Chapter 3 Deductive Reasoning Agents",
    "Chapter 4 Practical Reasoning Agents",
    "Chapter 5 Reactive and Hybrid Agents",
    "Part III Communication and Cooperation",
    "Chapter 6 Understanding Each Other",
    "Chapter 7 Communicating",
    "Chapter 8 Working Together",
    "Chapter 9 Methodologies",
    "Chapter 10 Applications",
    "Part IV Multiagent Decision Making",
    "Chapter 11 Multiagent Interactions",
    "Chapter 12 Making Group Decisions",
    "Chapter 13 Forming Coalitions",
    "Chapter 14 Allocating Scarce Resources",
    "Chapter 15 Bargaining",
    "Chapter 16 Arguing",
    "Chapter 17 Logical Foundations",
    "Coda",
    "Appendix A -- A History Lesson",
    "Appendix B -- Afterword"
  ],
  "interventions": [
    {
      "label": "公开参与者",
      "detail": "让所有评审者看到参与者的定义，保持信息和协议不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验协议",
      "detail": "在协议进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过效用",
      "detail": "跳过效用直接追求联合轨迹，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "参与者不稳定度",
    "协议联合收益",
    "联合轨迹可追踪度"
  ],
  "partialNote": "任一阶段无法使用同一输入和版本重放时，全书复习不得通过。",
  "strategicNote": "拒绝原因：架构、通信和博弈章节各自使用不同参与者与效用，结果无法拼接。"
} as const;

export function MasOfficialFinalReviewModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function MasOfficialFinalReviewInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function MasOfficialFinalReviewEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
