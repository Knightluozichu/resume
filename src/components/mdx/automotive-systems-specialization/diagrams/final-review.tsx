import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutomotiveSystemsSpecialization_FinalReview
const officialQualityProps = {
  title: "全书回顾与系统全景",
  stages: [
    "全书回顾与系统全景",
    "传统燃油 vs 新能源逐层对比",
    "哪些经验是共享的",
    "常见误区",
    "小结与练习",
  ],
  sourceLabel: "Bosch Automotive Handbook",
} as const;

export function OfficialAutomotiveSystemsSpecializationFinalReviewMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutomotiveSystemsSpecializationFinalReviewExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutomotiveSystemsSpecializationFinalReviewEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
