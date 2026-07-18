import { OfficialLlmBookLab } from "./official-llm-book-lab";

const concepts = [
  "证据链",
  "词元合同",
  "模型路径",
  "训练预算",
  "对齐门禁",
  "独立复核",
] as const;

export function LlmOfficialFinalReviewModelLab() {
  return (
    <OfficialLlmBookLab
      title="《大语言模型：基础与前沿》全书总复习"
      concepts={concepts}
      accent="#334155"
      view="model"
    />
  );
}
export function LlmOfficialFinalReviewExperimentLab() {
  return (
    <OfficialLlmBookLab
      title="《大语言模型：基础与前沿》全书总复习"
      concepts={concepts}
      accent="#334155"
      view="experiment"
    />
  );
}
export function LlmOfficialFinalReviewEvidenceLab() {
  return (
    <OfficialLlmBookLab
      title="《大语言模型：基础与前沿》全书总复习"
      concepts={concepts}
      accent="#334155"
      view="evidence"
    />
  );
}
