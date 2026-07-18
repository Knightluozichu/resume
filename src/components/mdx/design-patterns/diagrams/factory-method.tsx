import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_DesignPatterns_FactoryMethod
const officialQualityProps = {
  title: "工厂方法模式",
  stages: ["工厂方法模式", "意图", "适用性", "结构", "协作"],
  sourceLabel: "Pearson GoF 1st edition",
} as const;

export function OfficialDesignPatternsFactoryMethodMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialDesignPatternsFactoryMethodExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialDesignPatternsFactoryMethodEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
