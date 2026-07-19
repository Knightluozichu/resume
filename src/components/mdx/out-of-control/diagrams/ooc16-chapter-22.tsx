import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-22",
  title: "第22章 预言机",
  concepts: [
    "第22章 预言机",
    "22.1 接球的大脑",
    "22.2 混沌的另一面",
    "22.3 具有正面意义的短视",
    "22.4 从可预测性范围里挣大钱",
    "22.5 前瞻：内视行动",
    "22.6 预测的多样性",
    "22.7 以万变求不变",
    "22.8 系统存在的目的就是揭示未来",
    "22.9 全球模型的诸多问题",
    "22.10 舵手是大家",
  ],
  nodes: [
    "观察局部线索",
    "生成短期预期",
    "立即采取动作",
    "读取偏差反馈",
    "多人共同转舵",
  ],
  focuses: ["具身预测", "混沌边界", "局部窗口", "控制预测", "模型反身性"],
  model: {
    studio: "局部预测转舵台",
    axisA: {
      label: "预测时间跨度",
      levels: ["全局长期", "局部中期", "动作级短期"],
    },
    axisB: {
      label: "模型多样性",
      levels: ["单一模型", "两个模型", "异质模型组合"],
    },
    outcomes: {
      success: "可行动准确度",
      risk: "过度确信率",
      evidence: "证据可追溯度",
    },
    fault: "预测发布后改变了被预测对象",
    task: "把一次全球预言改写为可反馈的短期行动循环",
    practiceMode: "simulation",
    riskEffects: [-1, -1],
  },
} as const;

export function Ooc16Chapter22MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter22ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter22EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
