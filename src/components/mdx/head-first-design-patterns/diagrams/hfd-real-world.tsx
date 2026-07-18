import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_HeadFirstDesignPatterns_HfdRealWorld
const officialQualityProps = {
  title: "第13章 真实世界中的模式",
  stages: [
    "第13章 真实世界中的模式",
    "模式定义",
    "模式分类",
    "模式选择",
    "KISS",
  ],
  sourceLabel: "O'Reilly Head First Design Patterns 2e",
} as const;

export function OfficialHeadFirstDesignPatternsHfdRealWorldMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialHeadFirstDesignPatternsHfdRealWorldExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialHeadFirstDesignPatternsHfdRealWorldEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
