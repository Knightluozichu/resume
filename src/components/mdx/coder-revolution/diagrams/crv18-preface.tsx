import { OfficialCrv18Lab } from "./official-crv18-lab";

const props = {
  unitId: "crv18-preface",
  title: "前言",
  nodes: ["作者动机", "故事方法", "读者对象", "使用边界", "勘误反馈"],
  focuses: ["Why优先", "类比边界", "基础要求", "独立阅读", "错误修正"],
} as const;

export function Crv18PrefaceModelLab() {
  return <OfficialCrv18Lab {...props} mode="model" />;
}
export function Crv18PrefaceFlowLab() {
  return <OfficialCrv18Lab {...props} mode="flow" />;
}
export function Crv18PrefaceEvidenceLab() {
  return <OfficialCrv18Lab {...props} mode="evidence" />;
}
