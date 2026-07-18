import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_ArchitectureDomainDesign_CqrsEventSourcing
const officialQualityProps = {
  title: "CQRS 与事件溯源",
  stages: ["CQRS 与事件溯源", "核心概念", "常见误区", "小结与练习", "名词解释"],
  sourceLabel: "Pearson DDD + Clean Architecture",
} as const;

export function OfficialArchitectureDomainDesignCqrsEventSourcingMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialArchitectureDomainDesignCqrsEventSourcingExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialArchitectureDomainDesignCqrsEventSourcingEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
