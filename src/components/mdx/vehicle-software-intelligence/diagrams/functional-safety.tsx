import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_VehicleSoftwareIntelligence_FunctionalSafety
const officialQualityProps = {
  title: "功能安全",
  stages: [
    "功能安全",
    "ASIL 等级评估",
    "V 模型开发流程",
    "安全机制",
    "小结与练习",
  ],
  sourceLabel: "AUTOSAR R25-11 standards",
} as const;

export function OfficialVehicleSoftwareIntelligenceFunctionalSafetyMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialVehicleSoftwareIntelligenceFunctionalSafetyExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialVehicleSoftwareIntelligenceFunctionalSafetyEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
