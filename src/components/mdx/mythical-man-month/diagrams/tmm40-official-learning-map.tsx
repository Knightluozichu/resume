import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-official-learning-map",
  title: "《人月神话》40周年版权威学习地图",
  nodes: ["系统产品", "计划组织", "架构沟通", "集成质量", "长期复核"],
  focuses: ["24个正式单元", "143个节点", "观点依赖", "实验顺序", "证据闭环"],
} as const;

export function Tmm40OfficialLearningMapDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm40OfficialLearningMapScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm40OfficialLearningMapEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
