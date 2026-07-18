import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_ArchitectureDomainDesign_WhatIsArchitecture
const officialQualityProps = {
  title: "什么是架构",
  stages: ["什么是架构", "核心概念", "常见误区", "小结与练习", "名词解释"],
  sourceLabel: "Pearson DDD + Clean Architecture",
} as const;

export function OfficialArchitectureDomainDesignWhatIsArchitectureMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialArchitectureDomainDesignWhatIsArchitectureExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialArchitectureDomainDesignWhatIsArchitectureEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
