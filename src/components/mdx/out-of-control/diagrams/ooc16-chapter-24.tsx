import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-24",
  title: "第24章 九律",
  concepts: ["第24章 九律", "24.1 如何无中生有", "24.2 将宇宙据为己有"],
  nodes: [
    "分布与自下而上",
    "模块生长与边缘",
    "错误与多目标",
    "持久非均衡",
    "变化改变变化",
  ],
  focuses: ["九律全表", "涌现设计", "多目标", "非均衡", "适用边界"],
  model: {
    studio: "九律取舍矩阵",
    axisA: {
      label: "自下而上授权",
      levels: ["中央指定", "局部提案", "局部生成并审计"],
    },
    axisB: {
      label: "错误与多目标容纳",
      levels: ["零错误单目标", "允许试错", "多目标保留反例"],
    },
    outcomes: {
      success: "涌现设计收益",
      risk: "责任真空风险",
      evidence: "证据可追溯度",
    },
    fault: "九律被当成无需情境的保证公式",
    task: "为陌生系统选三条九律，并为每条写一项反例门禁",
    practiceMode: "design",
    riskEffects: [1, -1],
  },
} as const;

export function Ooc16Chapter24MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter24ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter24EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
