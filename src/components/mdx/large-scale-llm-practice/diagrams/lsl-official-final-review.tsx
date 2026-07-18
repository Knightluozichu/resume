import { OfficialLslBookLab } from "./official-lsl-book-lab";

const concepts = ["来源", "数据", "模型", "训练", "应用", "评估"] as const;

export function LslOfficialFinalReviewPipelineLab() {
  return (
    <OfficialLslBookLab
      title="《大规模语言模型：从理论到实践》总复习"
      concepts={concepts}
      accent="#854d0e"
      view="pipeline"
    />
  );
}

export function LslOfficialFinalReviewTrainingLab() {
  return (
    <OfficialLslBookLab
      title="《大规模语言模型：从理论到实践》总复习"
      concepts={concepts}
      accent="#854d0e"
      view="training"
    />
  );
}

export function LslOfficialFinalReviewEvidenceLab() {
  return (
    <OfficialLslBookLab
      title="《大规模语言模型：从理论到实践》总复习"
      concepts={concepts}
      accent="#854d0e"
      view="evidence"
    />
  );
}
