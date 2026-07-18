import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-20th-anniversary-preface",
  title: "20周年纪念版序言：旧命题的新检验",
  nodes: ["原版命题", "二十年证据", "保留判断", "修订判断", "再验证"],
  focuses: ["时间跨度", "观点清单", "反例", "修订理由", "可重复检验"],
} as const;

export function Tmm4020thAnniversaryPrefaceDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm4020thAnniversaryPrefaceScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm4020thAnniversaryPrefaceEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
