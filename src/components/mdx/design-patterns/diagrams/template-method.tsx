import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_DesignPatterns_TemplateMethod
const officialQualityProps = {
  title: "模板方法模式",
  stages: ["模板方法模式", "意图", "适用性", "结构", "协作"],
  sourceLabel: "Pearson GoF 1st edition",
} as const;

export function OfficialDesignPatternsTemplateMethodMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialDesignPatternsTemplateMethodExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialDesignPatternsTemplateMethodEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
