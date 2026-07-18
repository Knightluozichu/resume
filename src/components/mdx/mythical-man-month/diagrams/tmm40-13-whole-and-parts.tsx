import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-13-whole-and-parts",
  title: "第13章：整体部分",
  nodes: ["防错设计", "单元证据", "接口契约", "增量集成", "系统诊断"],
  focuses: ["缺陷预防", "构件调试", "集成顺序", "首差", "回归基线"],
} as const;

export function Tmm4013WholeAndPartsDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4013WholeAndPartsScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4013WholeAndPartsEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
