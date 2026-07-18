import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutomotiveSystemsSpecialization_SteeringBrakeSystems
const officialQualityProps = {
  title: "转向与制动系统",
  stages: [
    "转向与制动系统",
    "转向：从液压到电子助力",
    "制动：从纯机械到主动安全",
    "常见误区",
    "小结与练习",
  ],
  sourceLabel: "Bosch Automotive Handbook",
} as const;

export function OfficialAutomotiveSystemsSpecializationSteeringBrakeSystemsMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutomotiveSystemsSpecializationSteeringBrakeSystemsExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutomotiveSystemsSpecializationSteeringBrakeSystemsEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
