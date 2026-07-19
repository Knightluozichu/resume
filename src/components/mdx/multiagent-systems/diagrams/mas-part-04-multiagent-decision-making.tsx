import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-part-04-multiagent-decision-making",
  "title": "Part IV Multiagent Decision Making",
  "question": "多个自利代理竞争资源并需要形成可解释的集体结果",
  "actors": [
    "效用代理",
    "社会选择代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "冻结参与者",
    "声明偏好",
    "运行机制",
    "计算结果",
    "检查性质"
  ],
  "concepts": [
    "Part IV Multiagent Decision Making"
  ],
  "interventions": [
    {
      "label": "公开效用",
      "detail": "让所有评审者看到效用的定义，保持社会选择和联盟不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验联盟",
      "detail": "在联盟进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过机制设计",
      "detail": "跳过机制设计直接追求逻辑性质，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "效用不稳定度",
    "联盟联合收益",
    "逻辑性质可追踪度"
  ],
  "partialNote": "任何性质都必须绑定精确定义和前提，不能由单次仿真结果推断。",
  "strategicNote": "拒绝原因：看到总福利最高就宣称机制公平、稳定且不可操纵。"
} as const;

export function MasPart04MultiagentDecisionMakingModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function MasPart04MultiagentDecisionMakingInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function MasPart04MultiagentDecisionMakingEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
