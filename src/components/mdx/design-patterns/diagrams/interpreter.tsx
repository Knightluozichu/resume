import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_DesignPatterns_Interpreter
const officialQualityProps = {
  title: "解释器模式",
  stages: ["解释器模式", "意图", "适用性", "结构", "协作"],
  sourceLabel: "Pearson GoF 1st edition",
} as const;

export function OfficialDesignPatternsInterpreterMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialDesignPatternsInterpreterExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialDesignPatternsInterpreterEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
