import { OfficialCgptLab } from "./official-cgpt-lab";

const concepts = [
  "数据血缘",
  "模型合同",
  "训练轨迹",
  "对齐证据",
  "私有化闭环",
  "独立重放",
] as const;

export function CgptOfficialFinalReviewArchitectureLab() {
  return (
    <OfficialCgptLab
      title="《ChatGPT原理与实战》全书总复习"
      concepts={concepts}
      accent="#b91c1c"
      view="architecture"
    />
  );
}
export function CgptOfficialFinalReviewTrainingLab() {
  return (
    <OfficialCgptLab
      title="《ChatGPT原理与实战》全书总复习"
      concepts={concepts}
      accent="#b91c1c"
      view="training"
    />
  );
}
export function CgptOfficialFinalReviewEvidenceLab() {
  return (
    <OfficialCgptLab
      title="《ChatGPT原理与实战》全书总复习"
      concepts={concepts}
      accent="#b91c1c"
      view="evidence"
    />
  );
}
