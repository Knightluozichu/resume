import { OfficialTpp20Lab } from "./official-tpp20-lab";

const props = {
  unitId: "tpp20-official-learning-map",
  title: "《程序员修炼之道（第2版）》权威学习地图",
  nodes: ["务实哲学", "变更方法", "基础工具", "编码并发", "项目交付"],
  focuses: ["69个正式单元", "168个目录节点", "9章", "53个Topic", "99条提示"],
} as const;

export function Tpp20OfficialLearningMapSystemLab() {
  return <OfficialTpp20Lab {...props} mode="system" />;
}

export function Tpp20OfficialLearningMapFeedbackLab() {
  return <OfficialTpp20Lab {...props} mode="feedback" />;
}

export function Tpp20OfficialLearningMapEvidenceLab() {
  return <OfficialTpp20Lab {...props} mode="evidence" />;
}
