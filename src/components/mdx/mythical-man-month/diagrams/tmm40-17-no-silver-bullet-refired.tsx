import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-17-no-silver-bullet-refired",
  title: "第17章：再论“没有银弹”",
  nodes: ["原命题", "批评证据", "语义澄清", "候选技术", "复核结论"],
  focuses: ["数量级门槛", "时间窗口", "质量生产率", "复用学习成本", "铜弹组合"],
} as const;

export function Tmm4017NoSilverBulletRefiredDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4017NoSilverBulletRefiredScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4017NoSilverBulletRefiredEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
