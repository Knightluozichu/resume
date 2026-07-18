import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_ArchitectureDomainDesign_DependencyInversion
const officialQualityProps = {
  title: "依赖倒置与架构边界",
  stages: [
    "依赖倒置与架构边界",
    "核心概念",
    "常见误区",
    "小结与练习",
    "名词解释",
  ],
  sourceLabel: "Pearson DDD + Clean Architecture",
} as const;

export function OfficialArchitectureDomainDesignDependencyInversionMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialArchitectureDomainDesignDependencyInversionExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialArchitectureDomainDesignDependencyInversionEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
