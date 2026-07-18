import { OfficialLlmBookLab } from "./official-llm-book-lab";

const concepts = [
  "因果目标",
  "掩码目标",
  "前缀目标",
  "束搜索",
  "核采样",
  "停止条件",
] as const;

export function Llm04PretrainingDecodingModelLab() {
  return (
    <OfficialLlmBookLab
      title="第4章 预训练目标和解码策略"
      concepts={concepts}
      accent="#0369a1"
      view="model"
    />
  );
}
export function Llm04PretrainingDecodingExperimentLab() {
  return (
    <OfficialLlmBookLab
      title="第4章 预训练目标和解码策略"
      concepts={concepts}
      accent="#0369a1"
      view="experiment"
    />
  );
}
export function Llm04PretrainingDecodingEvidenceLab() {
  return (
    <OfficialLlmBookLab
      title="第4章 预训练目标和解码策略"
      concepts={concepts}
      accent="#0369a1"
      view="evidence"
    />
  );
}
