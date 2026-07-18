import { OfficialGep1Lab } from "./official-gep1-lab";

const props = {
  unitId: "gep1-official-learning-map",
  title: "《游戏引擎原理与实践·卷1》权威学习地图",
  nodes: [
    "核定140个节点",
    "搭建底层系统",
    "建立对象资源",
    "组织场景资产",
    "验证LOD输出",
  ],
  focuses: ["目录完整", "生命周期", "对象身份", "空间组织", "画质预算"],
};

export function Gep1OfficialLearningMapMapLab() {
  return <OfficialGep1Lab {...props} initialView="map" />;
}
export function Gep1OfficialLearningMapExperimentLab() {
  return <OfficialGep1Lab {...props} initialView="experiment" />;
}
export function Gep1OfficialLearningMapEvidenceLab() {
  return <OfficialGep1Lab {...props} initialView="evidence" />;
}
