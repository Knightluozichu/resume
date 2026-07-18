import { OfficialOpt23Lab } from "./official-opt23-lab";

const props = {
  unitId: "opt-23-official-learning-map",
  title: "《引导工具箱》权威学习地图",
  nodes: [
    "核定59个节点",
    "识别会议阶段",
    "选择最小工具",
    "运行参与实验",
    "复核行动兑现",
  ],
  focuses: ["完整目录", "阶段匹配", "参与平衡", "收敛质量", "执行兑现"],
} as const;

export function Opt23OfficialLearningMapMapLab() {
  return <OfficialOpt23Lab {...props} mode="map" />;
}
export function Opt23OfficialLearningMapExperimentLab() {
  return <OfficialOpt23Lab {...props} mode="experiment" />;
}
export function Opt23OfficialLearningMapEvidenceLab() {
  return <OfficialOpt23Lab {...props} mode="evidence" />;
}
