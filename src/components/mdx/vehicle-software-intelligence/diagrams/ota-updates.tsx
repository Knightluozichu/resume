import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_VehicleSoftwareIntelligence_OtaUpdates
const officialQualityProps = {
  title: "OTA 升级机制",
  stages: [
    "OTA 升级机制",
    "A/B 分区架构",
    "差分更新",
    "安全验证链与回滚保护",
    "小结与练习",
  ],
  sourceLabel: "AUTOSAR R25-11 standards",
} as const;

export function OfficialVehicleSoftwareIntelligenceOtaUpdatesMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialVehicleSoftwareIntelligenceOtaUpdatesExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialVehicleSoftwareIntelligenceOtaUpdatesEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
