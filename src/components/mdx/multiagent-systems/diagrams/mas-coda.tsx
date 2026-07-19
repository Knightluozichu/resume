import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-coda",
  "title": "Coda",
  "question": "复盘一个从感知代理扩展到拍卖协作的完整系统",
  "actors": [
    "架构代理",
    "语义代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "回看自治",
    "连接通信",
    "检查协作",
    "复核机制",
    "提出问题"
  ],
  "concepts": [
    "Coda"
  ],
  "interventions": [
    {
      "label": "公开架构",
      "detail": "让所有评审者看到架构的定义，保持语义和合作不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验合作",
      "detail": "在合作进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过集体决策",
      "detail": "跳过集体决策直接追求研究边界，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "架构不稳定度",
    "合作联合收益",
    "研究边界可追踪度"
  ],
  "partialNote": "跨章对象、时间或信息模型不一致时，应停止综合并回到共同基线。",
  "strategicNote": "拒绝原因：各章模型单独成立，却无法在同一系统中保持一致假设。"
} as const;

export function MasCodaModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function MasCodaInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function MasCodaEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
