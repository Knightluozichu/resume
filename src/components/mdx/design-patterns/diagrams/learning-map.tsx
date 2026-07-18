import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_DesignPatterns_LearningMap
const officialQualityProps = {
  title: "全书学习地图",
  stages: ["全书学习地图", "23 种模式一览", "推荐学习路径", "怎么用这本书"],
  sourceLabel: "Pearson GoF 1st edition",
} as const;

export function OfficialDesignPatternsLearningMapMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialDesignPatternsLearningMapExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialDesignPatternsLearningMapEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
