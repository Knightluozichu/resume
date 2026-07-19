import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-07",
  title: "第7章 控制的兴起",
  concepts: [
    "第7章 控制的兴起",
    "7.1 古希腊的第一个人工自我",
    "7.2 机械自我的成熟",
    "7.3 抽水马桶：套套逻辑的原型",
    "7.4 自我能动派",
  ],
  nodes: [
    "感知当前状态",
    "与目标比较",
    "产生偏差信号",
    "执行校正动作",
    "重新感知结果",
  ],
  focuses: ["人工自我", "机械反馈", "负反馈", "自我因果", "闭环能动"],
  model: {
    studio: "机械反馈调速器",
    axisA: {
      label: "反馈增益",
      levels: ["不足", "适中", "过强"],
    },
    axisB: {
      label: "执行延迟",
      levels: ["长延迟", "可测延迟", "近实时"],
    },
    outcomes: {
      success: "目标跟踪度",
      risk: "振荡幅度",
      evidence: "证据可追溯度",
    },
    fault: "校正动作晚到并再次放大偏差",
    task: "根据偏差—动作—新状态轨迹诊断闭环振荡",
    practiceMode: "calculation",
    riskEffects: [1, -1],
  },
} as const;

export function Ooc16Chapter07MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter07ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter07EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
