import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-09-methodologies",
  "title": "Chapter 9 Methodologies",
  "question": "为应急响应系统从组织目标推导代理、角色和会话协议",
  "actors": [
    "AAII代理",
    "Gaia代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "判断适用",
    "分析目标",
    "定义角色",
    "设计协议",
    "映射实现"
  ],
  "concepts": [
    "Chapter 9 Methodologies",
    "9.1 When is an Agent-Based Solution Appropriate?",
    "9.2 Agent-Oriented Analysis and Design",
    "9.2.1 The AAII methodology",
    "9.2.2 Gaia",
    "9.2.3 Tropos",
    "9.2.4 Prometheus",
    "9.2.5 Agent UML",
    "9.2.6 Agents in Z",
    "9.3 Pitfalls of Agent Development",
    "9.4 Mobile Agents"
  ],
  "interventions": [
    {
      "label": "公开AAII",
      "detail": "让所有评审者看到AAII的定义，保持Gaia和Tropos不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验Tropos",
      "detail": "在Tropos进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过Prometheus",
      "detail": "跳过Prometheus直接追求开发陷阱，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "AAII不稳定度",
    "Tropos联合收益",
    "开发陷阱可追踪度"
  ],
  "partialNote": "若组织结构简单且自治不明显，普通领域建模可能比代理方法更清晰。",
  "strategicNote": "拒绝原因：角色图与最终代码脱节，协议变化没有回写目标和测试。"
} as const;

export function Mas09MethodologiesModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function Mas09MethodologiesInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function Mas09MethodologiesEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
