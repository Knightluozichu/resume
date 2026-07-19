import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-05-reactive-hybrid-agents",
  "title": "Chapter 5 Reactive and Hybrid Agents",
  "question": "机器人在动态走廊中同时避障、追踪路线并遵守安全区",
  "actors": [
    "包容架构代理",
    "情境自动机代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "读取环境",
    "触发反应",
    "更新计划",
    "层间仲裁",
    "执行回放"
  ],
  "concepts": [
    "Chapter 5 Reactive and Hybrid Agents",
    "5.1 Reactive Agents",
    "5.1.1 The Subsumption Architecture",
    "5.1.2 PENGI",
    "5.1.3 Situated automata",
    "5.1.4 The Agent Network Architecture",
    "5.1.5 The Limitations of Reactive Agents",
    "5.2 Hybrid Agents",
    "5.2.1 TouringMachines",
    "5.2.2 InteRRaP",
    "5.2.3 3T",
    "5.2.4 Stanley"
  ],
  "interventions": [
    {
      "label": "公开包容架构",
      "detail": "让所有评审者看到包容架构的定义，保持情境自动机和反应限制不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验反应限制",
      "detail": "在反应限制进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过混合分层",
      "detail": "跳过混合分层直接追求仲裁，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "包容架构不稳定度",
    "反应限制联合收益",
    "仲裁可追踪度"
  ],
  "partialNote": "当层间协议比任务本身更复杂时，应减少层级或重新分配职责。",
  "strategicNote": "拒绝原因：规划层要求前进而安全层要求停车，仲裁器没有确定优先级。"
} as const;

export function Mas05ReactiveHybridAgentsModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function Mas05ReactiveHybridAgentsInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function Mas05ReactiveHybridAgentsEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
