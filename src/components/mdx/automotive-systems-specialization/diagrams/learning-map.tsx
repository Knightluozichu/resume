import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutomotiveSystemsSpecialization_LearningMap
const officialQualityProps = {
  title: "汽车系统专项学习地图",
  stages: [
    "汽车系统专项学习地图",
    "核心概念",
    "常见误区",
    "小结与练习",
    "名词解释",
  ],
  sourceLabel: "Bosch Automotive Handbook",
} as const;

export function OfficialAutomotiveSystemsSpecializationLearningMapMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutomotiveSystemsSpecializationLearningMapExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutomotiveSystemsSpecializationLearningMapEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
