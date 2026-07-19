import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-17-logical-foundations",
  "title": "Chapter 17 Logical Foundations",
  "question": "三名代理只看到局部卡片，判断个体、共同与分布知识",
  "actors": [
    "知识信念代理",
    "可能世界代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "列可能世界",
    "画可达关系",
    "解释模态",
    "加入群体",
    "验证性质"
  ],
  "concepts": [
    "Chapter 17 Logical Foundations",
    "17.1 Logics for Knowledge and Belief",
    "17.1.1 Possible-Worlds Semantics for Modal Logics",
    "17.1.2 Normal Modal Logics",
    "17.1.3 Normal Modal Logics as Epistemic Logics",
    "17.1.4 Logical Omniscience",
    "17.1.5 Axioms for Knowledge and Belief",
    "17.1.6 Multiagent Epistemic Logics",
    "17.1.7 Common and Distributed Knowledge",
    "17.2 Logics for Mental States",
    "17.2.1 Cohen and Levesque's Intention Logic",
    "17.2.2 Modelling speech acts",
    "17.3 Logics for Cooperation",
    "17.3.1 Incomplete Information",
    "17.3.2 Cooperation Logics for Social Choice",
    "17.4 Putting Logic to Work",
    "17.4.1 Logic in specification",
    "17.4.2 Logic in implementation",
    "17.4.3 Logic in Verification"
  ],
  "interventions": [
    {
      "label": "公开知识信念",
      "detail": "让所有评审者看到知识信念的定义，保持可能世界和逻辑全知不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验逻辑全知",
      "detail": "在逻辑全知进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过共同知识",
      "detail": "跳过共同知识直接追求规范验证，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "知识信念不稳定度",
    "逻辑全知联合收益",
    "规范验证可追踪度"
  ],
  "partialNote": "形式证明只对给定模型成立；模型遗漏环境行为时，证明不能保证实现。",
  "strategicNote": "拒绝原因：把分布知识误写成每个成员都知道，或假设代理逻辑全知而不披露。"
} as const;

export function Mas17LogicalFoundationsModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function Mas17LogicalFoundationsInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function Mas17LogicalFoundationsEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
