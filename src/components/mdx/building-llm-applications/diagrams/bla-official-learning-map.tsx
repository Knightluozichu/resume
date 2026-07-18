import { OfficialBlaBookLab } from "./official-bla-book-lab";

const concepts = ["模型", "编排", "提示", "应用", "微调", "治理"] as const;

export function BlaOfficialLearningMapFlowLab() {
  return (
    <OfficialBlaBookLab
      title="Building LLM Powered Applications 权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="pipeline"
    />
  );
}

export function BlaOfficialLearningMapExperimentLab() {
  return (
    <OfficialBlaBookLab
      title="Building LLM Powered Applications 权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="training"
    />
  );
}

export function BlaOfficialLearningMapEvidenceLab() {
  return (
    <OfficialBlaBookLab
      title="Building LLM Powered Applications 权威学习地图"
      concepts={concepts}
      accent="#0f766e"
      view="evidence"
    />
  );
}
