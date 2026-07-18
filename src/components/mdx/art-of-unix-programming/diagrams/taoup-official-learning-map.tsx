import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-official-learning-map",
  title: "《UNIX编程艺术》权威学习地图",
  nodes: ["背景语境", "设计原则", "实现工具", "社区机制", "全书证据"],
  focuses: ["31个正式单元", "383个目录节点", "4部分", "20章", "4附录"],
} as const;

export function TaoupOfficialLearningMapCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupOfficialLearningMapRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupOfficialLearningMapEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
