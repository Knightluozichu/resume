import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_VehicleSoftwareIntelligence_SmartCockpit
const officialQualityProps = {
  title: "智能座舱架构",
  stages: ["智能座舱架构", "核心概念", "常见误区", "小结与练习", "名词解释"],
  sourceLabel: "AUTOSAR R25-11 standards",
} as const;

export function OfficialVehicleSoftwareIntelligenceSmartCockpitMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialVehicleSoftwareIntelligenceSmartCockpitExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialVehicleSoftwareIntelligenceSmartCockpitEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
