import { OfficialBlaBookLab } from "./official-bla-book-lab";

const concepts = [
  "Copilot",
  "AI编排器",
  "LangChain",
  "Haystack",
  "Semantic Kernel",
  "框架决策",
] as const;

export function Bla02LlmsForAiPoweredApplicationsFlowLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 2: LLMs for AI-Powered Applications"
      concepts={concepts}
      accent="#be123c"
      view="pipeline"
    />
  );
}

export function Bla02LlmsForAiPoweredApplicationsExperimentLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 2: LLMs for AI-Powered Applications"
      concepts={concepts}
      accent="#be123c"
      view="training"
    />
  );
}

export function Bla02LlmsForAiPoweredApplicationsEvidenceLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 2: LLMs for AI-Powered Applications"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
