import { OfficialLlmBookLab } from "./official-llm-book-lab";

const concepts = [
  "上下文学习",
  "示范选择",
  "样本排序",
  "校准",
  "轻量级微调",
  "重新参数化",
] as const;

export function Llm05IclLightweightFinetuningModelLab() {
  return (
    <OfficialLlmBookLab
      title="第5章 上下文学习和轻量级微调"
      concepts={concepts}
      accent="#15803d"
      view="model"
    />
  );
}
export function Llm05IclLightweightFinetuningExperimentLab() {
  return (
    <OfficialLlmBookLab
      title="第5章 上下文学习和轻量级微调"
      concepts={concepts}
      accent="#15803d"
      view="experiment"
    />
  );
}
export function Llm05IclLightweightFinetuningEvidenceLab() {
  return (
    <OfficialLlmBookLab
      title="第5章 上下文学习和轻量级微调"
      concepts={concepts}
      accent="#15803d"
      view="evidence"
    />
  );
}
