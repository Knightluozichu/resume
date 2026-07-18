import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_ArchitectureDomainDesign_FinalReview
const officialQualityProps = {
  title: "全书回顾与架构决策",
  stages: [
    "全书回顾与架构决策",
    "核心概念",
    "常见误区",
    "小结与练习",
    "名词解释",
  ],
  sourceLabel: "Pearson DDD + Clean Architecture",
} as const;

export function OfficialArchitectureDomainDesignFinalReviewMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialArchitectureDomainDesignFinalReviewExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialArchitectureDomainDesignFinalReviewEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
