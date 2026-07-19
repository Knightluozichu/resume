import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-official-learning-map",
  "title": "An Introduction to MultiAgent Systems 第二版权威学习地图",
  "question": "为完整第二版课程安排先决关系、计算练习和回退点",
  "actors": [
    "25个单元代理",
    "197个节点代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "场景判断",
    "自治架构",
    "通信合作",
    "集体决策",
    "全书复核"
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
      "label": "公开25个单元",
      "detail": "让所有评审者看到25个单元的定义，保持197个节点和四部分不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验四部分",
      "detail": "在四部分进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过联合证据",
      "detail": "跳过联合证据直接追求发布门禁，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "25个单元不稳定度",
    "四部分联合收益",
    "发布门禁可追踪度"
  ],
  "partialNote": "目录词出现不等于理解；缺少联合轨迹或练习时覆盖仍记为零。",
  "strategicNote": "拒绝原因：只列出章节标题，却无法定位联合状态、计算或故障验证。"
} as const;

export function MasOfficialLearningMapModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function MasOfficialLearningMapInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function MasOfficialLearningMapEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
