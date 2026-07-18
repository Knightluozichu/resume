import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-06-passing-the-word",
  title: "第6章：贯彻执行",
  nodes: ["架构意图", "正式手册", "答疑决策", "实现对照", "产品检验"],
  focuses: ["规格说明", "形式语义", "决策日志", "多重实现", "一致性测试"],
} as const;

export function Tmm4006PassingTheWordDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4006PassingTheWordScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4006PassingTheWordEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
