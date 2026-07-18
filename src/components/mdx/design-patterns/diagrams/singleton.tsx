import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_DesignPatterns_Singleton
const officialQualityProps = {
  title: "单例模式",
  stages: ["单例模式", "意图", "适用性", "结构", "协作"],
  sourceLabel: "Pearson GoF 1st edition",
} as const;

export function OfficialDesignPatternsSingletonMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialDesignPatternsSingletonExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialDesignPatternsSingletonEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
