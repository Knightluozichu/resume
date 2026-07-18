import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-part-02",
  title: "第二部分 设计",
  nodes: ["模块", "表示", "组合", "接口", "复杂度"],
  focuses: ["10章", "设计原则", "开放格式", "进程协作", "演化成本"],
} as const;

export function TaoupPart02CompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupPart02RepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupPart02EvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
