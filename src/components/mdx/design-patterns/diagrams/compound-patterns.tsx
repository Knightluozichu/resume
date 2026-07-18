import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_DesignPatterns_CompoundPatterns
const officialQualityProps = {
  title: "复合模式",
  stages: [
    "复合模式",
    "什么是复合模式",
    "经典案例：MVC",
    "模式如何协同",
    "常见误区",
  ],
  sourceLabel: "Pearson GoF 1st edition",
} as const;

export function OfficialDesignPatternsCompoundPatternsMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialDesignPatternsCompoundPatternsExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialDesignPatternsCompoundPatternsEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
