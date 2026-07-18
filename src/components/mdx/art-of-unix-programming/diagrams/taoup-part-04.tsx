import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-part-04",
  title: "第四部分 社区",
  nodes: ["开放标准", "可移植性", "文档传播", "社区协作", "未来演化"],
  focuses: ["4章", "标准过程", "国际化", "结构文档", "开放许可"],
} as const;

export function TaoupPart04CompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupPart04RepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupPart04EvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
