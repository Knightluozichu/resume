import { OfficialCgptLab } from "./official-cgpt-lab";

const concepts = [
  "自回归",
  "规模化",
  "上下文学习",
  "Codex",
  "InstructGPT",
  "文本摘要",
] as const;

export function Cgpt07GptSeriesArchitectureLab() {
  return (
    <OfficialCgptLab
      title="第7章 GPT系列模型分析"
      concepts={concepts}
      accent="#4338ca"
      view="architecture"
    />
  );
}
export function Cgpt07GptSeriesTrainingLab() {
  return (
    <OfficialCgptLab
      title="第7章 GPT系列模型分析"
      concepts={concepts}
      accent="#4338ca"
      view="training"
    />
  );
}
export function Cgpt07GptSeriesEvidenceLab() {
  return (
    <OfficialCgptLab
      title="第7章 GPT系列模型分析"
      concepts={concepts}
      accent="#4338ca"
      view="evidence"
    />
  );
}
