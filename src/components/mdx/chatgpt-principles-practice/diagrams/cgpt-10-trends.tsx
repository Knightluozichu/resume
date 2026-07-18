import { OfficialCgptLab } from "./official-cgpt-lab";

const concepts = [
  "云边协同",
  "工具增强",
  "可控生成",
  "2C场景",
  "2B场景",
  "责任边界",
] as const;

export function Cgpt10TrendsArchitectureLab() {
  return (
    <OfficialCgptLab
      title="第10章 ChatGPT发展趋势"
      concepts={concepts}
      accent="#6d28d9"
      view="architecture"
    />
  );
}
export function Cgpt10TrendsTrainingLab() {
  return (
    <OfficialCgptLab
      title="第10章 ChatGPT发展趋势"
      concepts={concepts}
      accent="#6d28d9"
      view="training"
    />
  );
}
export function Cgpt10TrendsEvidenceLab() {
  return (
    <OfficialCgptLab
      title="第10章 ChatGPT发展趋势"
      concepts={concepts}
      accent="#6d28d9"
      view="evidence"
    />
  );
}
