import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutomotiveSystemsSpecialization_EvMotorController
const officialQualityProps = {
  title: "电机与电机控制器",
  stages: [
    "电机与电机控制器",
    "电驱替代发动机",
    "逆变器：DC 到 AC",
    "PMSM 与 MCU 控制策略",
    "电机特性曲线",
  ],
  sourceLabel: "Bosch Automotive Handbook",
} as const;

export function OfficialAutomotiveSystemsSpecializationEvMotorControllerMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutomotiveSystemsSpecializationEvMotorControllerExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutomotiveSystemsSpecializationEvMotorControllerEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
