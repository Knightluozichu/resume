import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_VehicleSoftwareIntelligence_FinalReview
const officialQualityProps = {
  title: "全书回顾与系统全景",
  stages: [
    "全书回顾与系统全景",
    "从传统汽车到智能汽车的软件演进",
    "自动驾驶等级与章节对应",
    "小结与练习",
    "名词解释",
  ],
  sourceLabel: "AUTOSAR R25-11 standards",
} as const;

export function OfficialVehicleSoftwareIntelligenceFinalReviewMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialVehicleSoftwareIntelligenceFinalReviewExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialVehicleSoftwareIntelligenceFinalReviewEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
