import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-first-edition-preface",
  title: "第1版序言：经验、样本与外推边界",
  nodes: ["项目样本", "观察事实", "经验概括", "适用边界", "读者验证"],
  focuses: ["OS/360", "样本偏差", "管理尺度", "系统软件", "外推条件"],
} as const;

export function Tmm40FirstEditionPrefaceDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm40FirstEditionPrefaceScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm40FirstEditionPrefaceEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
