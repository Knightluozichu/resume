import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-07-babel",
  title: "第7章：为什么巴比伦塔会失败",
  nodes: ["共同目标", "信息产生", "手册同步", "职责划分", "组织协调"],
  focuses: ["沟通网络", "信息时效", "工作手册", "职责边界", "组织树"],
} as const;

export function Tmm4007BabelDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4007BabelScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4007BabelEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
