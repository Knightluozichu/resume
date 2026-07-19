import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-18",
  title: "第18章 有组织的变化之架构",
  concepts: [
    "第18章 有组织的变化之架构",
    "18.1 日常进化的革命",
    "18.2 绕开中心法则",
    "18.3 学习和进化之间的区别",
    "18.4 进化的进化",
    "18.5 进化解释一切",
  ],
  nodes: [
    "个体状态更新",
    "跨代差异保留",
    "环境重塑选择",
    "变化规则再变",
    "分层验证机制",
  ],
  focuses: ["快速进化", "信息回路", "学习进化", "元进化", "解释边界"],
  model: {
    studio: "三时间尺度变更台",
    axisA: {
      label: "跨代保留强度",
      levels: ["只改个体", "保留部分差异", "稳定遗传"],
    },
    axisB: {
      label: "规则元更新",
      levels: ["规则固定", "学习率变化", "变化方式演化"],
    },
    outcomes: {
      success: "跨环境适应度",
      risk: "机制混淆率",
      evidence: "证据可追溯度",
    },
    fault: "把个体学习结果误报成群体遗传变化",
    task: "用日志区分状态更新、跨代选择和元规则变化",
    practiceMode: "diagnosis",
    riskEffects: [-1, 1],
  },
} as const;

export function Ooc16Chapter18MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter18ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter18EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
