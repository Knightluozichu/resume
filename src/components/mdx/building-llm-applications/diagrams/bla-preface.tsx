import { OfficialBlaBookLab } from "./official-bla-book-lab";

const concepts = [
  "目标读者",
  "内容范围",
  "环境清单",
  "配套资源",
  "版本边界",
  "复现合同",
] as const;

export function BlaPrefaceFlowLab() {
  return (
    <OfficialBlaBookLab
      title="Preface"
      concepts={concepts}
      accent="#b45309"
      view="pipeline"
    />
  );
}

export function BlaPrefaceExperimentLab() {
  return (
    <OfficialBlaBookLab
      title="Preface"
      concepts={concepts}
      accent="#b45309"
      view="training"
    />
  );
}

export function BlaPrefaceEvidenceLab() {
  return (
    <OfficialBlaBookLab
      title="Preface"
      concepts={concepts}
      accent="#b45309"
      view="evidence"
    />
  );
}
