import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutomotiveSystemsSpecialization_BatteryManagement
const officialQualityProps = {
  title: "电池管理系统",
  stages: [
    "电池管理系统",
    "电池包的三级结构",
    "SOC 与 SOH 估算",
    "均衡、热管理与安全",
    "常见误区",
  ],
  sourceLabel: "Bosch Automotive Handbook",
} as const;

export function OfficialAutomotiveSystemsSpecializationBatteryManagementMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutomotiveSystemsSpecializationBatteryManagementExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutomotiveSystemsSpecializationBatteryManagementEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
