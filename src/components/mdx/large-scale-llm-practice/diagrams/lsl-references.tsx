import { OfficialLslBookLab } from "./official-lsl-book-lab";

const concepts = [
  "来源定位",
  "版本快照",
  "实验配置",
  "逐样本结果",
  "限制披露",
  "独立复核",
] as const;

export function LslReferencesPipelineLab() {
  return (
    <OfficialLslBookLab
      title="参考文献与证据复核"
      concepts={concepts}
      accent="#b91c1c"
      view="pipeline"
    />
  );
}

export function LslReferencesTrainingLab() {
  return (
    <OfficialLslBookLab
      title="参考文献与证据复核"
      concepts={concepts}
      accent="#b91c1c"
      view="training"
    />
  );
}

export function LslReferencesEvidenceLab() {
  return (
    <OfficialLslBookLab
      title="参考文献与证据复核"
      concepts={concepts}
      accent="#b91c1c"
      view="evidence"
    />
  );
}
