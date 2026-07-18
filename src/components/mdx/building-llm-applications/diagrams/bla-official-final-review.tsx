import { OfficialBlaBookLab } from "./official-bla-book-lab";

const concepts = ["任务", "模型", "编排", "工具", "评测", "发布"] as const;

export function BlaOfficialFinalReviewFlowLab() {
  return (
    <OfficialBlaBookLab
      title="Building LLM Powered Applications 全书总复习"
      concepts={concepts}
      accent="#6d28d9"
      view="pipeline"
    />
  );
}

export function BlaOfficialFinalReviewExperimentLab() {
  return (
    <OfficialBlaBookLab
      title="Building LLM Powered Applications 全书总复习"
      concepts={concepts}
      accent="#6d28d9"
      view="training"
    />
  );
}

export function BlaOfficialFinalReviewEvidenceLab() {
  return (
    <OfficialBlaBookLab
      title="Building LLM Powered Applications 全书总复习"
      concepts={concepts}
      accent="#6d28d9"
      view="evidence"
    />
  );
}
