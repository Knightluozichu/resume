import { OfficialPoeaa24Lab } from "./official-poeaa24-lab";

const props = {
  unitId: "poeaa24-official-learning-map",
  title: "《企业应用架构模式》权威学习地图",
  nodes: ["应用边界", "叙述选择", "模式族", "模式协作", "架构证据"],
  focuses: ["76个正式单元", "119个目录节点", "18章", "51个模式", "10个模式族"],
} as const;

export function Poeaa24OfficialLearningMapBoundaryLab() {
  return <OfficialPoeaa24Lab {...props} mode="boundary" />;
}
export function Poeaa24OfficialLearningMapMappingLab() {
  return <OfficialPoeaa24Lab {...props} mode="mapping" />;
}
export function Poeaa24OfficialLearningMapTransactionLab() {
  return <OfficialPoeaa24Lab {...props} mode="transaction" />;
}
