import { OfficialTmm40BookLab } from "./official-tmm40-book-lab";

const props = {
  unitId: "tmm40-translator-preface",
  title: "译者序：把经典经验放回工程语境",
  nodes: ["原始语境", "译名选择", "工程命题", "现代映射", "证据边界"],
  focuses: ["历史坐标", "术语一致", "适用条件", "迁移差异", "引用责任"],
} as const;

export function Tmm40TranslatorPrefaceDependencyLab() {
  return <OfficialTmm40BookLab {...props} mode="dependency" />;
}

export function Tmm40TranslatorPrefaceScheduleLab() {
  return <OfficialTmm40BookLab {...props} mode="schedule" />;
}

export function Tmm40TranslatorPrefaceEvidenceLab() {
  return <OfficialTmm40BookLab {...props} mode="evidence" />;
}
