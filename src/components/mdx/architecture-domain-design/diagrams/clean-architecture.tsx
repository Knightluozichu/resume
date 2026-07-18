import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_ArchitectureDomainDesign_CleanArchitecture
const officialQualityProps = {
  title: "整洁架构",
  stages: ["整洁架构", "核心概念", "常见误区", "小结与练习", "名词解释"],
  sourceLabel: "Pearson DDD + Clean Architecture",
} as const;

export function OfficialArchitectureDomainDesignCleanArchitectureMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialArchitectureDomainDesignCleanArchitectureExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialArchitectureDomainDesignCleanArchitectureEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
