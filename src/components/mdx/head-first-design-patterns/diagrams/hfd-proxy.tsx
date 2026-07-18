import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_HeadFirstDesignPatterns_HfdProxy
const officialQualityProps = {
  title: "第11章 代理模式",
  stages: ["第11章 代理模式", "远程代理", "虚拟代理", "保护代理", "动态代理"],
  sourceLabel: "O'Reilly Head First Design Patterns 2e",
} as const;

export function OfficialHeadFirstDesignPatternsHfdProxyMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialHeadFirstDesignPatternsHfdProxyExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialHeadFirstDesignPatternsHfdProxyEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
