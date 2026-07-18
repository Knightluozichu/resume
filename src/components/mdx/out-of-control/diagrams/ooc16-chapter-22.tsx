import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-22",
  title: "第22章 预言机",
  nodes: [
    "观察局部线索",
    "生成短期预期",
    "立即采取动作",
    "读取偏差反馈",
    "多人共同转舵",
  ],
  focuses: ["具身预测", "混沌边界", "局部窗口", "控制预测", "模型反身性"],
} as const;

export function Ooc16Chapter22MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter22ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter22EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
