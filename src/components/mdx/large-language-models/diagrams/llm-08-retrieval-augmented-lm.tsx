import { OfficialLlmBookLab } from "./official-llm-book-lab";

const concepts = [
  "检索器",
  "数据存储",
  "词元级检索",
  "多跳推理",
  "黑盒模型",
  "视觉检索",
] as const;

export function Llm08RetrievalAugmentedLmModelLab() {
  return (
    <OfficialLlmBookLab
      title="第8章 检索增强型语言模型"
      concepts={concepts}
      accent="#c2410c"
      view="model"
    />
  );
}
export function Llm08RetrievalAugmentedLmExperimentLab() {
  return (
    <OfficialLlmBookLab
      title="第8章 检索增强型语言模型"
      concepts={concepts}
      accent="#c2410c"
      view="experiment"
    />
  );
}
export function Llm08RetrievalAugmentedLmEvidenceLab() {
  return (
    <OfficialLlmBookLab
      title="第8章 检索增强型语言模型"
      concepts={concepts}
      accent="#c2410c"
      view="evidence"
    />
  );
}
