import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_DesignPatterns_Composite
const officialQualityProps = {
  title: "组合模式",
  stages: ["组合模式", "意图", "适用性", "结构", "协作"],
  sourceLabel: "Pearson GoF 1st edition",
} as const;

export function OfficialDesignPatternsCompositeMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialDesignPatternsCompositeExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialDesignPatternsCompositeEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
