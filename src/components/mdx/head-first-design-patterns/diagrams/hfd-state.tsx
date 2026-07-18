import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_HeadFirstDesignPatterns_HfdState
const officialQualityProps = {
  title: "第10章 状态模式",
  stages: ["第10章 状态模式", "状态机", "状态对象", "上下文", "状态转移"],
  sourceLabel: "O'Reilly Head First Design Patterns 2e",
} as const;

export function OfficialHeadFirstDesignPatternsHfdStateMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialHeadFirstDesignPatternsHfdStateExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialHeadFirstDesignPatternsHfdStateEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
