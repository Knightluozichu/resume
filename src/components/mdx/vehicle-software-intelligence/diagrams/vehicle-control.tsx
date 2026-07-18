import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_VehicleSoftwareIntelligence_VehicleControl
const officialQualityProps = {
  title: "车辆控制",
  stages: ["车辆控制", "纵向控制", "横向控制", "反馈回路", "小结与练习"],
  sourceLabel: "AUTOSAR R25-11 standards",
} as const;

export function OfficialVehicleSoftwareIntelligenceVehicleControlMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialVehicleSoftwareIntelligenceVehicleControlExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialVehicleSoftwareIntelligenceVehicleControlEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
