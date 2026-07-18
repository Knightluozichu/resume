import { OfficialBlaBookLab } from "./official-bla-book-lab";

const concepts = [
  "GPT-4V",
  "DALL-E 3",
  "AutoGen",
  "小语言模型",
  "企业案例",
  "趋势雷达",
] as const;

export function Bla13EmergingTrendsFlowLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 13: Emerging Trends and Innovations"
      concepts={concepts}
      accent="#2563eb"
      view="pipeline"
    />
  );
}

export function Bla13EmergingTrendsExperimentLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 13: Emerging Trends and Innovations"
      concepts={concepts}
      accent="#2563eb"
      view="training"
    />
  );
}

export function Bla13EmergingTrendsEvidenceLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 13: Emerging Trends and Innovations"
      concepts={concepts}
      accent="#2563eb"
      view="evidence"
    />
  );
}
