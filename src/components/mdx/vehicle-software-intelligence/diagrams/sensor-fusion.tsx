import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_VehicleSoftwareIntelligence_SensorFusion
const officialQualityProps = {
  title: "传感器融合",
  stages: [
    "传感器融合",
    "前融合与后融合",
    "卡尔曼滤波",
    "数据关联与时空对齐",
    "小结与练习",
  ],
  sourceLabel: "AUTOSAR R25-11 standards",
} as const;

export function OfficialVehicleSoftwareIntelligenceSensorFusionMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialVehicleSoftwareIntelligenceSensorFusionExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialVehicleSoftwareIntelligenceSensorFusionEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
