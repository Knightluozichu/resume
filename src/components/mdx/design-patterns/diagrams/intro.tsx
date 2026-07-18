import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_DesignPatterns_Intro
const officialQualityProps = {
  title: "什么是设计模式",
  stages: [
    "什么是设计模式",
    "一个场景：没有模式的世界",
    "设计模式是什么",
    "模式背后的原则：SOLID",
    "逐条拆解",
  ],
  sourceLabel: "Pearson GoF 1st edition",
} as const;

export function OfficialDesignPatternsIntroMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialDesignPatternsIntroExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialDesignPatternsIntroEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
