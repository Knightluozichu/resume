import { OfficialLlmBookLab } from "./official-llm-book-lab";

const concepts = [
  "视觉编码器",
  "视觉提示",
  "多模态对齐",
  "学习前缀",
  "交叉注意力",
  "视觉指令",
] as const;

export function Llm11VisionLanguageModelsModelLab() {
  return (
    <OfficialLlmBookLab
      title="第11章 视觉语言模型"
      concepts={concepts}
      accent="#b91c1c"
      view="model"
    />
  );
}
export function Llm11VisionLanguageModelsExperimentLab() {
  return (
    <OfficialLlmBookLab
      title="第11章 视觉语言模型"
      concepts={concepts}
      accent="#b91c1c"
      view="experiment"
    />
  );
}
export function Llm11VisionLanguageModelsEvidenceLab() {
  return (
    <OfficialLlmBookLab
      title="第11章 视觉语言模型"
      concepts={concepts}
      accent="#b91c1c"
      view="evidence"
    />
  );
}
