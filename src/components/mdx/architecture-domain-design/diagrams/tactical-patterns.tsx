import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_ArchitectureDomainDesign_TacticalPatterns
const officialQualityProps = {
  title: "战术模式",
  stages: ["战术模式", "核心概念", "常见误区", "小结与练习", "名词解释"],
  sourceLabel: "Pearson DDD + Clean Architecture",
} as const;

export function OfficialArchitectureDomainDesignTacticalPatternsMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialArchitectureDomainDesignTacticalPatternsExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialArchitectureDomainDesignTacticalPatternsEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
