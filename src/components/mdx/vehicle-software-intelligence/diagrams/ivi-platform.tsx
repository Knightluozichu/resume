import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_VehicleSoftwareIntelligence_IviPlatform
const officialQualityProps = {
  title: "车载信息娱乐平台",
  stages: [
    "车载信息娱乐平台",
    "双系统共存方案",
    "核心概念",
    "小结与练习",
    "名词解释",
  ],
  sourceLabel: "AUTOSAR R25-11 standards",
} as const;

export function OfficialVehicleSoftwareIntelligenceIviPlatformMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialVehicleSoftwareIntelligenceIviPlatformExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialVehicleSoftwareIntelligenceIviPlatformEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
