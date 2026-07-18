import { OfficialGea3Lab } from "./official-gea3-lab";

const props = {
  unitId: "gea3-official-learning-map",
  title: "《游戏引擎架构》第3版权威学习地图",
  nodes: [
    "核定132个节点",
    "建立五部地图",
    "追踪一帧数据",
    "运行瓶颈实验",
    "跨系统复核",
  ],
  focuses: ["目录完整", "层级依赖", "实时预算", "资产身份", "调试证据"],
};

export function Gea3OfficialLearningMapMapLab() {
  return <OfficialGea3Lab {...props} initialView="map" />;
}

export function Gea3OfficialLearningMapExperimentLab() {
  return <OfficialGea3Lab {...props} initialView="experiment" />;
}

export function Gea3OfficialLearningMapEvidenceLab() {
  return <OfficialGea3Lab {...props} initialView="evidence" />;
}
