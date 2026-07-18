import { OfficialBlaBookLab } from "./official-bla-book-lab";

const concepts = [
  "专有模型",
  "开源模型",
  "任务适配",
  "延迟",
  "许可",
  "模型路由",
] as const;

export function Bla03ChoosingAnLlmFlowLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 3: Choosing an LLM for Your Application"
      concepts={concepts}
      accent="#4d7c0f"
      view="pipeline"
    />
  );
}

export function Bla03ChoosingAnLlmExperimentLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 3: Choosing an LLM for Your Application"
      concepts={concepts}
      accent="#4d7c0f"
      view="training"
    />
  );
}

export function Bla03ChoosingAnLlmEvidenceLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 3: Choosing an LLM for Your Application"
      concepts={concepts}
      accent="#4d7c0f"
      view="evidence"
    />
  );
}
