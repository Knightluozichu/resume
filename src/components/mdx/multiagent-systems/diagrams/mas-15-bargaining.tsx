import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-15-bargaining",
  "title": "Chapter 15 Bargaining",
  "question": "两名代理对资源份额轮流出价，分别设置耐心与急迫玩家",
  "actors": [
    "议价参数代理",
    "轮流出价代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "声明保留值",
    "设置时限",
    "生成报价",
    "接受拒绝",
    "更新策略"
  ],
  "concepts": [
    "Chapter 15 Bargaining",
    "15.1 Negotiation Parameters",
    "15.2 Bargaining for Resource Division",
    "15.2.1 Patient Players",
    "15.2.2 Impatient Players",
    "15.2.3 Negotiation Decision Functions",
    "15.2.4 Applications of Alternating Offers",
    "15.3 Bargaining for Task Allocation",
    "15.3.1 The Monotonic Concession Protocol",
    "15.3.2 The Zeuthen Strategy",
    "15.3.3 Deception",
    "15.4 Bargaining for Resource Allocation"
  ],
  "interventions": [
    {
      "label": "公开议价参数",
      "detail": "让所有评审者看到议价参数的定义，保持轮流出价和让步协议不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验让步协议",
      "detail": "在让步协议进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过Zeuthen",
      "detail": "跳过Zeuthen直接追求欺骗，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "议价参数不稳定度",
    "让步协议联合收益",
    "欺骗可追踪度"
  ],
  "partialNote": "对手模型不可靠时，精细策略可能比简单可解释规则更脆弱。",
  "strategicNote": "拒绝原因：比较报价金额却忽略双方贴现率和拒绝后的外部选项。"
} as const;

export function Mas15BargainingModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function Mas15BargainingInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function Mas15BargainingEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
