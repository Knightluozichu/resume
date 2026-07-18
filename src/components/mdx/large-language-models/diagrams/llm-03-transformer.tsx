import { OfficialLlmBookLab } from "./official-llm-book-lab";

const concepts = [
  "自注意力",
  "位置嵌入",
  "长上下文",
  "外部记忆",
  "推测解码",
  "蒸馏",
] as const;

export function Llm03TransformerModelLab() {
  return (
    <OfficialLlmBookLab
      title="第3章 Transformer"
      concepts={concepts}
      accent="#be123c"
      view="model"
    />
  );
}
export function Llm03TransformerExperimentLab() {
  return (
    <OfficialLlmBookLab
      title="第3章 Transformer"
      concepts={concepts}
      accent="#be123c"
      view="experiment"
    />
  );
}
export function Llm03TransformerEvidenceLab() {
  return (
    <OfficialLlmBookLab
      title="第3章 Transformer"
      concepts={concepts}
      accent="#be123c"
      view="evidence"
    />
  );
}
