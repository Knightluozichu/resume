import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-16-no-silver-bullet",
  title: "第16章：没有银弹",
  nodes: ["问题本质", "次要负担", "历史突破", "候选银弹", "渐进改进"],
  focuses: ["复杂性", "一致性", "可变性", "不可见性", "概念设计"],
} as const;

export function Tmm4016NoSilverBulletDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4016NoSilverBulletScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4016NoSilverBulletEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
