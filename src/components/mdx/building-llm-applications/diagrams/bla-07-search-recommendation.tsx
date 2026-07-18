import { OfficialBlaBookLab } from "./official-bla-book-lab";

const concepts = [
  "K近邻",
  "矩阵分解",
  "冷启动",
  "内容推荐",
  "排序指标",
  "推荐解释",
] as const;

export function Bla07SearchRecommendationFlowLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 7: Search and Recommendation Engines with LLMs"
      concepts={concepts}
      accent="#4338ca"
      view="pipeline"
    />
  );
}

export function Bla07SearchRecommendationExperimentLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 7: Search and Recommendation Engines with LLMs"
      concepts={concepts}
      accent="#4338ca"
      view="training"
    />
  );
}

export function Bla07SearchRecommendationEvidenceLab() {
  return (
    <OfficialBlaBookLab
      title="Chapter 7: Search and Recommendation Engines with LLMs"
      concepts={concepts}
      accent="#4338ca"
      view="evidence"
    />
  );
}
