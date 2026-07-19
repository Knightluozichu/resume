import { AgentOutcomeLab } from "./agent-outcome-lab";

const shared = {
  "unitId": "mas-part-01-setting-scene",
  "title": "Part I Setting the Scene",
  "question": "判断一组微服务是否真的构成多智能体系统",
  "actors": [
    "自治代理",
    "环境代理",
    "共享环境 / 机制"
  ],
  "stages": [
    "界定环境",
    "识别自治",
    "列出交互",
    "比较对象",
    "决定建模"
  ],
  "concepts": [
    "Part I Setting the Scene"
  ],
  "interventions": [
    {
      "label": "公开自治",
      "detail": "让所有评审者看到自治的定义，保持环境和目标不变。",
      "instabilityDelta": -14,
      "welfareDelta": 8,
      "traceDelta": 12
    },
    {
      "label": "校验目标",
      "detail": "在目标进入联合状态前检查输入、版本和允许范围。",
      "instabilityDelta": -9,
      "welfareDelta": 12,
      "traceDelta": 16
    },
    {
      "label": "绕过依赖",
      "detail": "跳过依赖直接追求适用性，观察局部收益怎样破坏联合性质。",
      "instabilityDelta": 20,
      "welfareDelta": -16,
      "traceDelta": -18
    }
  ],
  "metricLabels": [
    "自治不稳定度",
    "目标联合收益",
    "适用性可追踪度"
  ],
  "partialNote": "若组件行为完全由中央程序决定且没有局部选择，代理抽象通常只增加术语。",
  "strategicNote": "拒绝原因：把普通对象重命名为代理，却没有独立目标、局部观察或行为控制权。"
} as const;

export function MasPart01SettingSceneModelLab() {
  return <AgentOutcomeLab {...shared} mode="model" baseline={[40,68,66]} />;
}

export function MasPart01SettingSceneInteractionLab() {
  return <AgentOutcomeLab {...shared} mode="interaction" baseline={[44,64,60]} />;
}

export function MasPart01SettingSceneEvidenceLab() {
  return <AgentOutcomeLab {...shared} mode="evidence" baseline={[34,72,74]} />;
}
