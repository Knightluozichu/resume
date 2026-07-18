import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_ArchitectureDomainDesign_LayeredArchitecture
const officialQualityProps = {
  title: "分层架构",
  stages: ["分层架构", "核心概念", "常见误区", "小结与练习", "名词解释"],
  sourceLabel: "Pearson DDD + Clean Architecture",
} as const;

export function OfficialArchitectureDomainDesignLayeredArchitectureMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialArchitectureDomainDesignLayeredArchitectureExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialArchitectureDomainDesignLayeredArchitectureEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
