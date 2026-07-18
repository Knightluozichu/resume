import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-05",
  title: "第5章 共同进化",
  nodes: [
    "选择局部策略",
    "改变共享环境",
    "他者同步适应",
    "收益地形移动",
    "维持动态可行",
  ],
  focuses: ["相互适应", "移动适应度", "动态平衡", "时间尺度", "无意图合作"],
} as const;

export function Ooc16Chapter05MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter05ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter05EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
