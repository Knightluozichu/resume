import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-preface",
  "title": "Preface",
  "question": "为具有编程基础但未学博弈论的读者安排第二版学习路线",
  "actors": [
    "第二版代理",
    "读者基础代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "确认版次",
    "盘点先决",
    "选择路径",
    "绑定案例",
    "设置复核"
  ],
  "concepts": [
    "Preface",
    "What was left out and why",
    "Omissions and errors"
  ],
  "interventions": [
    {
      "label": "公开第二版",
      "detail": "让所有评审者看到第二版的定义，保持读者基础和四部分不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验四部分",
      "detail": "在四部分进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过新增主题",
      "detail": "跳过新增主题直接追求证据边界，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "第二版不稳定度",
    "四部分联合收益",
    "证据边界可追踪度"
  ],
  "partialNote": "读者若不能手算集合、概率和简单效用，应先补离散数学再进入决策章节。",
  "strategicNote": "拒绝原因：把现代大模型代理的术语倒灌为2009年教材的原始定义。"
} as const;

export function MasPrefaceModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function MasPrefaceInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function MasPrefaceEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
