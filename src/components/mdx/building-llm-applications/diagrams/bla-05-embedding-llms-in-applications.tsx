import { OfficialBlaBookLab } from "./official-bla-book-lab";

const concepts = [
  "模型适配器",
  "数据连接",
  "记忆",
  "链",
  "Agent",
  "密钥治理",
] as const;

export function Bla05EmbeddingLlmsInApplicationsFlowLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 5: Embedding LLMs within Your Applications"
      concepts={concepts}
      accent="#0369a1"
      view="pipeline"
    />
  );
}

export function Bla05EmbeddingLlmsInApplicationsExperimentLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 5: Embedding LLMs within Your Applications"
      concepts={concepts}
      accent="#0369a1"
      view="training"
    />
  );
}

export function Bla05EmbeddingLlmsInApplicationsEvidenceLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 5: Embedding LLMs within Your Applications"
      concepts={concepts}
      accent="#0369a1"
      view="evidence"
    />
  );
}
