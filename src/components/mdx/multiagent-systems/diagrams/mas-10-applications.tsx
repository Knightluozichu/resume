import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-10-applications",
  "title": "Chapter 10 Applications",
  "question": "比较航空管制、电子商务和社会仿真的代理建模收益",
  "actors": [
    "工作流代理",
    "分布感知代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "选择应用",
    "建立基线",
    "识别自治",
    "实现交互",
    "比较结果"
  ],
  "concepts": [
    "Chapter 10 Applications",
    "10.1 Agents for Workflow and Business Process Management",
    "10.2 Agents for Distributed Sensing",
    "10.3 Agents for Information Retrieval and Management",
    "10.4 Agents for Electronic Commerce",
    "10.5 Agents for Human--Computer Interfaces",
    "10.6 Agents for Virtual Environments",
    "10.7 Agents for Social Simulation",
    "10.8 Agents for X",
    "Agents for industrial systems management.",
    "Agents for Air-Traffic Control."
  ],
  "interventions": [
    {
      "label": "公开工作流",
      "detail": "让所有评审者看到工作流的定义，保持分布感知和信息检索不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验信息检索",
      "detail": "在信息检索进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过电子商务",
      "detail": "跳过电子商务直接追求社会仿真，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "工作流不稳定度",
    "信息检索联合收益",
    "社会仿真可追踪度"
  ],
  "partialNote": "协调开销超过适应收益时，应保留更简单的集中式方案。",
  "strategicNote": "拒绝原因：把任何分布式系统称为代理应用，却没有自治决策和策略交互。"
} as const;

export function Mas10ApplicationsModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function Mas10ApplicationsInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function Mas10ApplicationsEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
