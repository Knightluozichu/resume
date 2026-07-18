import { OfficialTaoupLab } from "./official-taoup-lab";

const props = {
  unitId: "taoup-chapter-19-open-source",
  title: "第19章 开放源码：在Unix新社区中编程",
  nodes: ["问题共识", "补丁制作", "评审沟通", "发布分发", "许可证"],
  focuses: ["补丁实践", "项目命名", "开发实践", "沟通", "许可证"],
} as const;

export function TaoupChapter19OpenSourceCompositionLab() {
  return <OfficialTaoupLab {...props} mode="composition" />;
}
export function TaoupChapter19OpenSourceRepresentationLab() {
  return <OfficialTaoupLab {...props} mode="representation" />;
}
export function TaoupChapter19OpenSourceEvidenceLab() {
  return <OfficialTaoupLab {...props} mode="evidence" />;
}
