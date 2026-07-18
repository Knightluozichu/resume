import { OfficialOoc16Lab } from "./official-ooc16-lab";

const props = {
  unitId: "ooc16-chapter-13",
  title: "第13章 上帝的游戏",
  nodes: [
    "编码世界规则",
    "让代理参与",
    "运行反事实",
    "观察涌现社会",
    "回查模型缺口",
  ],
  focuses: ["模拟权力", "交互理论", "具身参与", "分布协同", "有限放权"],
} as const;

export function Ooc16Chapter13MapLab() {
  return <OfficialOoc16Lab {...props} mode="map" />;
}
export function Ooc16Chapter13ExperimentLab() {
  return <OfficialOoc16Lab {...props} mode="experiment" />;
}
export function Ooc16Chapter13EvidenceLab() {
  return <OfficialOoc16Lab {...props} mode="evidence" />;
}
