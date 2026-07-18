import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_VehicleSoftwareIntelligence_PathPlanning
const officialQualityProps = {
  title: "路径规划",
  stages: [
    "路径规划",
    "全局规划",
    "局部规划",
    "行为预测与轨迹优化",
    "小结与练习",
  ],
  sourceLabel: "AUTOSAR R25-11 standards",
} as const;

export function OfficialVehicleSoftwareIntelligencePathPlanningMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialVehicleSoftwareIntelligencePathPlanningExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialVehicleSoftwareIntelligencePathPlanningEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
