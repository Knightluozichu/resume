import { OfficialBlaBookLab } from "./official-bla-book-lab";

const concepts = [
  "基础模型",
  "LLM",
  "Transformer",
  "预训练",
  "模型评估",
  "定制模型",
] as const;

export function Bla01IntroductionToLargeLanguageModelsFlowLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 1: Introduction to Large Language Models"
      concepts={concepts}
      accent="#1d4ed8"
      view="pipeline"
    />
  );
}

export function Bla01IntroductionToLargeLanguageModelsExperimentLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 1: Introduction to Large Language Models"
      concepts={concepts}
      accent="#1d4ed8"
      view="training"
    />
  );
}

export function Bla01IntroductionToLargeLanguageModelsEvidenceLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 1: Introduction to Large Language Models"
      concepts={concepts}
      accent="#1d4ed8"
      view="evidence"
    />
  );
}
