import { OfficialEex19Lab } from "./official-eex19-lab";

const props = {
  unitId: "eex19-chapter-06",
  title: "第6章 决策的要素",
  nodes: [
    "分类问题性质",
    "写明边界条件",
    "推导正确方案",
    "落实行动责任",
    "用反馈验证",
  ],
  focuses: ["问题分类", "案例证据", "边界条件", "行动承诺", "反馈检验"],
} as const;

export function Eex19Chapter06MapLab() {
  return <OfficialEex19Lab {...props} mode="map" />;
}
export function Eex19Chapter06ExperimentLab() {
  return <OfficialEex19Lab {...props} mode="experiment" />;
}
export function Eex19Chapter06EvidenceLab() {
  return <OfficialEex19Lab {...props} mode="evidence" />;
}
