import { OfficialLlmBookLab } from "./official-llm-book-lab";

const concepts = [
  "语言模型",
  "困惑度",
  "词元",
  "子词",
  "字符模型",
  "可学习分词",
] as const;

export function Llm02LanguageModelingTokenizationModelLab() {
  return (
    <OfficialLlmBookLab
      title="第2章 语言模型和分词"
      concepts={concepts}
      accent="#7c3aed"
      view="model"
    />
  );
}
export function Llm02LanguageModelingTokenizationExperimentLab() {
  return (
    <OfficialLlmBookLab
      title="第2章 语言模型和分词"
      concepts={concepts}
      accent="#7c3aed"
      view="experiment"
    />
  );
}
export function Llm02LanguageModelingTokenizationEvidenceLab() {
  return (
    <OfficialLlmBookLab
      title="第2章 语言模型和分词"
      concepts={concepts}
      accent="#7c3aed"
      view="evidence"
    />
  );
}
