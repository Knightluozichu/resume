import { OfficialAvc2BookLab } from "./official-avc2-book-lab";

const props = {
  unitId: "avc2-official-learning-map",
  title: "《AUTOSAR规范与车用控制器软件开发》权威学习地图",
  nodes: ["需求与架构", "SWC设计", "系统配置", "ECU实现", "验证演进"],
  focuses: ["140节点", "工件链", "RTE/BSW", "MCAL集成", "安全证据"],
} as const;

export function Avc2OfficialLearningMapArchitectureLab() {
  return <OfficialAvc2BookLab {...props} mode="architecture" />;
}

export function Avc2OfficialLearningMapConfigurationLab() {
  return <OfficialAvc2BookLab {...props} mode="configuration" />;
}

export function Avc2OfficialLearningMapEvidenceLab() {
  return <OfficialAvc2BookLab {...props} mode="evidence" />;
}
