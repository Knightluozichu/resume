import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-part-03-communication-cooperation",
  "title": "Part III Communication and Cooperation",
  "question": "三个组织的代理协商联合任务，但使用不同数据模型和权限",
  "actors": [
    "本体代理",
    "ACL代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "对齐语义",
    "发送消息",
    "形成承诺",
    "分配任务",
    "核对结果"
  ],
  "concepts": [
    "Part III Communication and Cooperation"
  ],
  "interventions": [
    {
      "label": "公开本体",
      "detail": "让所有评审者看到本体的定义，保持ACL和任务共享不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验任务共享",
      "detail": "在任务共享进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过协调",
      "detail": "跳过协调直接追求应用验证，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "本体不稳定度",
    "任务共享联合收益",
    "应用验证可追踪度"
  ],
  "partialNote": "没有共享语义和失败协议时，增加消息只会放大不一致。",
  "strategicNote": "拒绝原因：消息格式解析成功，却因本体版本不同对同一资源产生相反理解。"
} as const;

export function MasPart03CommunicationCooperationModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function MasPart03CommunicationCooperationInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function MasPart03CommunicationCooperationEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
