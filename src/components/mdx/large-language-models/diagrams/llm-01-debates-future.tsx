import { OfficialLlmBookLab } from "./official-llm-book-lab";

const concepts = [
  "能力声明",
  "意识命题",
  "具身化",
  "世界模型",
  "沟通意图",
  "全面泛化",
] as const;

export function Llm01DebatesFutureModelLab() {
  return (
    <OfficialLlmBookLab
      title="第1章 大语言模型：辩论、争议与未来发展方向"
      concepts={concepts}
      accent="#b45309"
      view="model"
    />
  );
}
export function Llm01DebatesFutureExperimentLab() {
  return (
    <OfficialLlmBookLab
      title="第1章 大语言模型：辩论、争议与未来发展方向"
      concepts={concepts}
      accent="#b45309"
      view="experiment"
    />
  );
}
export function Llm01DebatesFutureEvidenceLab() {
  return (
    <OfficialLlmBookLab
      title="第1章 大语言模型：辩论、争议与未来发展方向"
      concepts={concepts}
      accent="#b45309"
      view="evidence"
    />
  );
}
