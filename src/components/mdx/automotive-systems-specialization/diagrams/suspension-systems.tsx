import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutomotiveSystemsSpecialization_SuspensionSystems
const officialQualityProps = {
  title: "悬架系统与车身姿态控制",
  stages: [
    "悬架系统与车身姿态控制",
    "悬架要解决什么问题",
    "弹簧与减震器",
    "三种悬架结构",
    "常见误区",
  ],
  sourceLabel: "Bosch Automotive Handbook",
} as const;

export function OfficialAutomotiveSystemsSpecializationSuspensionSystemsMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutomotiveSystemsSpecializationSuspensionSystemsExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutomotiveSystemsSpecializationSuspensionSystemsEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
