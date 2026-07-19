import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-06-understanding-each-other",
  "title": "Chapter 6 Understanding Each Other",
  "question": "两个医疗调度代理交换设备能力和占用状态",
  "actors": [
    "本体构件代理",
    "OWL代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "抽取概念",
    "定义关系",
    "写入公理",
    "交换实例",
    "检查推理"
  ],
  "concepts": [
    "Chapter 6 Understanding Each Other",
    "6.1 Ontology Fundamentals",
    "6.1.1 Ontology Building Blocks",
    "6.1.2 An Ontology of Ontologies",
    "6.2 Ontology Languages",
    "6.2.1 XML -- Ad Hoc Ontologies",
    "6.2.2 OWL -- The Web Ontology Language",
    "6.2.3 KIF -- Ontologies in First-Order Logic",
    "6.3 RDF",
    "6.4 Constructing an Ontology",
    "6.5 Software Tools for Ontologies"
  ],
  "interventions": [
    {
      "label": "公开本体构件",
      "detail": "让所有评审者看到本体构件的定义，保持OWL和KIF不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验KIF",
      "detail": "在KIF进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过RDF",
      "detail": "跳过RDF直接追求版本对齐，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "本体构件不稳定度",
    "KIF联合收益",
    "版本对齐可追踪度"
  ],
  "partialNote": "需要封闭校验时应增加形状或应用约束，不能假装 OWL 自动补齐。",
  "strategicNote": "拒绝原因：接收方把未声明事实当作假，把开放世界语义误当闭世界校验。"
} as const;

export function Mas06UnderstandingEachOtherModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function Mas06UnderstandingEachOtherInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function Mas06UnderstandingEachOtherEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
