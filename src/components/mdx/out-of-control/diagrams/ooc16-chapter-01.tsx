import { OfficialOoc16Studio } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-01",
  title: "第1章 人造与天生",
  concepts: [
    "第1章 人造与天生",
    "1.1 新生物文明",
    "1.2 生物逻辑的胜利",
    "1.3 学会向我们的创造物低头",
  ],
  nodes: [
    "识别机械假设",
    "引入生物属性",
    "允许局部自治",
    "观察涌现结果",
    "设置协同边界",
  ],
  focuses: ["新生物文明", "生物逻辑", "放弃全控", "活系统", "责任边界"],
  model: {
    studio: "机械—生物设计连续谱",
    axisA: {
      label: "局部自治",
      levels: ["逐步命令", "边界内自治", "规则自修改"],
    },
    axisB: {
      label: "反馈可见度",
      levels: ["结果不可见", "关键事件留痕", "全链路可回放"],
    },
    outcomes: {
      success: "环境适应度",
      risk: "责任漂移",
      evidence: "证据可追溯度",
    },
    fault: "自治提升但没有收回权限",
    task: "为一台会适应环境的设备划定培育边界与停机条件",
    practiceMode: "design",
    riskEffects: [1, -1],
  },
} as const;

export function Ooc16Chapter01MapLab() {
  return <OfficialOoc16Studio {...props} mode="map" />;
}

export function Ooc16Chapter01ExperimentLab() {
  return <OfficialOoc16Studio {...props} mode="experiment" />;
}

export function Ooc16Chapter01EvidenceLab() {
  return <OfficialOoc16Studio {...props} mode="evidence" />;
}
