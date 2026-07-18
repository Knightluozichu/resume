import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_DesignPatterns_Adapter
const officialQualityProps = {
  title: "适配器模式",
  stages: ["适配器模式", "意图", "适用性", "结构", "协作"],
  sourceLabel: "Pearson GoF 1st edition",
} as const;

export function OfficialDesignPatternsAdapterMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialDesignPatternsAdapterExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialDesignPatternsAdapterEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
