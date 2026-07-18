import { OfficialCgptLab } from "./official-cgpt-lab";

const concepts = [
  "生成式模型",
  "对话上下文",
  "词元",
  "概率解码",
  "能力边界",
  "任务验收",
] as const;

export function Cgpt01UnderstandingChatgptArchitectureLab() {
  return (
    <OfficialCgptLab
      title="第1章 了解ChatGPT"
      concepts={concepts}
      accent="#b45309"
      view="architecture"
    />
  );
}
export function Cgpt01UnderstandingChatgptTrainingLab() {
  return (
    <OfficialCgptLab
      title="第1章 了解ChatGPT"
      concepts={concepts}
      accent="#b45309"
      view="training"
    />
  );
}
export function Cgpt01UnderstandingChatgptEvidenceLab() {
  return (
    <OfficialCgptLab
      title="第1章 了解ChatGPT"
      concepts={concepts}
      accent="#b45309"
      view="evidence"
    />
  );
}
