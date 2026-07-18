import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutomotiveSystemsSpecialization_DrivetrainComponents
const officialQualityProps = {
  title: "传动系统与驱动布局",
  stages: [
    "传动系统与驱动布局",
    "传动系统的三个关键零件",
    "三种驱动布局",
    "常见误区",
    "小结与练习",
  ],
  sourceLabel: "Bosch Automotive Handbook",
} as const;

export function OfficialAutomotiveSystemsSpecializationDrivetrainComponentsMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutomotiveSystemsSpecializationDrivetrainComponentsExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutomotiveSystemsSpecializationDrivetrainComponentsEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
