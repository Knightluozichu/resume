import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_DesignPatterns_FinalReview
const officialQualityProps = {
  title: "设计模式总复习",
  stages: [
    "设计模式总复习",
    "23 模式全景",
    "一句话记忆",
    "创建型（5 个）——「对象怎么创建」",
    "结构型（7 个）——「类与对象怎么组合」",
  ],
  sourceLabel: "Pearson GoF 1st edition",
} as const;

export function OfficialDesignPatternsFinalReviewMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialDesignPatternsFinalReviewExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialDesignPatternsFinalReviewEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
