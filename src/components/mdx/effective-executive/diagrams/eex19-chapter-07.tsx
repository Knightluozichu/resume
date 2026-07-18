import { OfficialEex19Lab } from "./official-eex19-lab";

const props = {
  unitId: "eex19-chapter-07",
  title: "第7章 有效的决策",
  nodes: [
    "提出竞争见解",
    "约定事实检验",
    "组织反面意见",
    "选择并承诺行动",
    "跟踪现实反馈",
  ],
  focuses: ["见解假设", "事实标准", "建设性异议", "工具边界", "执行反馈"],
} as const;

export function Eex19Chapter07MapLab() {
  return <OfficialEex19Lab {...props} mode="map" />;
}
export function Eex19Chapter07ExperimentLab() {
  return <OfficialEex19Lab {...props} mode="experiment" />;
}
export function Eex19Chapter07EvidenceLab() {
  return <OfficialEex19Lab {...props} mode="evidence" />;
}
