import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_DesignPatterns_ChainOfResponsibility
const officialQualityProps = {
  title: "责任链模式",
  stages: ["责任链模式", "意图", "适用性", "结构", "协作"],
  sourceLabel: "Pearson GoF 1st edition",
} as const;

export function OfficialDesignPatternsChainOfResponsibilityMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialDesignPatternsChainOfResponsibilityExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialDesignPatternsChainOfResponsibilityEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
