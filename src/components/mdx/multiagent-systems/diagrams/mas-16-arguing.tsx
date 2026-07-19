import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-16-arguing",
  "title": "Chapter 16 Arguing",
  "question": "围绕资源分配建立四个论证的攻击图并比较 preferred extensions",
  "actors": [
    "论证类型代理",
    "攻击图代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "构造论证",
    "添加攻击",
    "应用语义",
    "加入偏好",
    "执行对话"
  ],
  "concepts": [
    "Chapter 16 Arguing",
    "16.1 Types of Argument",
    "16.2 Abstract Argumentation",
    "16.2.1 Preferred Extensions",
    "16.2.2 Credulous and Sceptical Acceptance",
    "16.2.3 Preferences in Abstract Argument Systems",
    "16.2.4 Values in Abstract Argument Systems",
    "16.3 Deductive Argumentation Systems",
    "16.4 Dialogue Systems",
    "16.5 Implemented Argumentation Systems"
  ],
  "interventions": [
    {
      "label": "公开论证类型",
      "detail": "让所有评审者看到论证类型的定义，保持攻击图和preferred扩展不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验preferred扩展",
      "detail": "在preferred扩展进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过价值偏好",
      "detail": "跳过价值偏好直接追求对话系统，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "论证类型不稳定度",
    "preferred扩展联合收益",
    "对话系统可追踪度"
  ],
  "partialNote": "形式可接受不等于事实正确，前提来源和领域验证仍需独立检查。",
  "strategicNote": "拒绝原因：把图上没有入边的论证直接判真，忽略语义与证据内容。"
} as const;

export function Mas16ArguingModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function Mas16ArguingInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function Mas16ArguingEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
