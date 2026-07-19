import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chinese-preface",
  title: "致《失控》中文版",
  concepts: ["致《失控》中文版"],
  nodes: [
    "冻结原始主张",
    "标记时间边界",
    "寻找实现证据",
    "登记反例偏差",
    "更新适用范围",
  ],
  focuses: ["版本语境", "预测命中", "事后偏差", "技术迁移", "证据边界"],
  model: {
    studio: "预测复盘时间轴",
    axisA: {
      label: "原始主张冻结度",
      levels: ["只留印象", "保留摘要", "保留原时点文本"],
    },
    axisB: {
      label: "反例采样强度",
      levels: ["只找命中", "命中与偏差", "主动找未实现项"],
    },
    outcomes: {
      success: "历史可解释度",
      risk: "事后偏差",
      evidence: "证据可追溯度",
    },
    fault: "用今天的术语反写1994年的预测",
    task: "把一条技术预测拆成原始主张、后来实现和仍未成立三栏",
    practiceMode: "diagnosis",
    riskEffects: [-1, -1],
  },
} as const;

export function Ooc16ChinesePrefaceMapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16ChinesePrefaceExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16ChinesePrefaceEvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
