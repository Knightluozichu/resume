import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-09",
  title: "第9章 “冒出”的生态圈",
  nodes: [
    "设定人工边界",
    "投入多样生命",
    "运行代谢循环",
    "捕捉意外角色",
    "调整而不抹平",
  ],
  focuses: ["共同驾驶", "边缘物种", "季节控制", "尺度实验", "生命技术"],
} as const;

export function Ooc16Chapter09MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter09ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter09EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
