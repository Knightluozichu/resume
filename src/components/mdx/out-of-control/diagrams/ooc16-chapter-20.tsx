import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-20",
  title: "第20章 沉睡的蝴蝶",
  concepts: [
    "第20章 沉睡的蝴蝶",
    "20.1 无序之有序",
    "20.2 反直觉的网络数学",
    "20.3 迭坐，喷涌，自催化",
    "20.4 值得一问的问题",
    "20.5 自调节的活系统",
  ],
  nodes: [
    "增加关系密度",
    "跨越连通阈值",
    "形成自催化环",
    "由选择检验功能",
    "反馈调节自身",
  ],
  focuses: ["自发秩序", "网络阈值", "自催化", "选择耦合", "自调节"],
  model: {
    studio: "自催化网络阈值台",
    axisA: {
      label: "关系密度",
      levels: ["碎片化", "接近阈值", "高度连通"],
    },
    axisB: {
      label: "功能选择反馈",
      levels: ["不筛选", "弱筛选", "持续反馈"],
    },
    outcomes: {
      success: "自调节闭合度",
      risk: "脆弱级联率",
      evidence: "证据可追溯度",
    },
    fault: "连通出现被误当成功能已经出现",
    task: "逐步增加连接并识别自催化闭环首次形成的时点",
    practiceMode: "calculation",
    riskEffects: [1, -1],
  },
} as const;

export function Ooc16Chapter20MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter20ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter20EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
