import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_ArchitectureDomainDesign_BoundedContext
const officialQualityProps = {
  title: "限界上下文",
  stages: ["限界上下文", "核心概念", "常见误区", "小结与练习", "名词解释"],
  sourceLabel: "Pearson DDD + Clean Architecture",
} as const;

export function OfficialArchitectureDomainDesignBoundedContextMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialArchitectureDomainDesignBoundedContextExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialArchitectureDomainDesignBoundedContextEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
