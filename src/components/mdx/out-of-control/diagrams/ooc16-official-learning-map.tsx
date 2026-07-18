import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-official-learning-map",
  title: "《失控》权威学习地图",
  nodes: [
    "核定173节点",
    "建立24章依赖",
    "运行局部实验",
    "比较跨章机制",
    "综合九律边界",
  ],
  focuses: ["完整目录", "系统反馈", "生态网络", "人工进化", "九律综合"],
} as const;

export function Ooc16OfficialLearningMapMapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16OfficialLearningMapExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16OfficialLearningMapEvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
