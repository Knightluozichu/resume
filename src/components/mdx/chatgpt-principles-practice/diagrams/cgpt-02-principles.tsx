import { OfficialCgptLab } from "./official-cgpt-lab";

const concepts = [
  "语言建模",
  "指令微调",
  "偏好数据",
  "奖励模型",
  "策略优化",
  "对齐局限",
] as const;

export function Cgpt02PrinciplesArchitectureLab() {
  return (
    <OfficialCgptLab
      title="第2章 ChatGPT原理解构"
      concepts={concepts}
      accent="#7c3aed"
      view="architecture"
    />
  );
}
export function Cgpt02PrinciplesTrainingLab() {
  return (
    <OfficialCgptLab
      title="第2章 ChatGPT原理解构"
      concepts={concepts}
      accent="#7c3aed"
      view="training"
    />
  );
}
export function Cgpt02PrinciplesEvidenceLab() {
  return (
    <OfficialCgptLab
      title="第2章 ChatGPT原理解构"
      concepts={concepts}
      accent="#7c3aed"
      view="evidence"
    />
  );
}
