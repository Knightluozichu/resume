import { OfficialMasBookLab } from "./official-mas-book-lab";

const concepts = [
  "范围合同",
  "删减说明",
  "勘误",
  "版本边界",
  "学习路径",
  "复现清单",
] as const;

export function MasPrefaceModelLab() {
  return (
    <OfficialMasBookLab
      title="Preface"
      concepts={concepts}
      accent="#b45309"
      view="pipeline"
    />
  );
}

export function MasPrefaceGameLab() {
  return (
    <OfficialMasBookLab
      title="Preface"
      concepts={concepts}
      accent="#b45309"
      view="training"
    />
  );
}

export function MasPrefaceEvidenceLab() {
  return (
    <OfficialMasBookLab
      title="Preface"
      concepts={concepts}
      accent="#b45309"
      view="evidence"
    />
  );
}
