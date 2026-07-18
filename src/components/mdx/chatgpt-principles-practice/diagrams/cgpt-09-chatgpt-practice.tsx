import { OfficialCgptLab } from "./official-cgpt-lab";

const concepts = [
  "任务合同",
  "文档溯源",
  "SFT",
  "RM",
  "RL",
  "阶段门禁",
] as const;

export function Cgpt09ChatgptPracticeArchitectureLab() {
  return (
    <OfficialCgptLab
      title="第9章 类ChatGPT实战"
      concepts={concepts}
      accent="#0e7490"
      view="architecture"
    />
  );
}
export function Cgpt09ChatgptPracticeTrainingLab() {
  return (
    <OfficialCgptLab
      title="第9章 类ChatGPT实战"
      concepts={concepts}
      accent="#0e7490"
      view="training"
    />
  );
}
export function Cgpt09ChatgptPracticeEvidenceLab() {
  return (
    <OfficialCgptLab
      title="第9章 类ChatGPT实战"
      concepts={concepts}
      accent="#0e7490"
      view="evidence"
    />
  );
}
