import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_VehicleSoftwareIntelligence_LearningMap
const officialQualityProps = {
  title: "车载软件与智能化学习地图",
  stages: [
    "车载软件与智能化学习地图",
    "核心概念",
    "常见误区",
    "小结与练习",
    "名词解释",
  ],
  sourceLabel: "AUTOSAR R25-11 standards",
} as const;

export function OfficialVehicleSoftwareIntelligenceLearningMapMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialVehicleSoftwareIntelligenceLearningMapExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialVehicleSoftwareIntelligenceLearningMapEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
