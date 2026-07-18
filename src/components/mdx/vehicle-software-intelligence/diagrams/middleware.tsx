import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_VehicleSoftwareIntelligence_Middleware
const officialQualityProps = {
  title: "车载中间件",
  stages: [
    "车载中间件",
    "两种通信范式",
    "服务发现机制",
    "小结与练习",
    "名词解释",
  ],
  sourceLabel: "AUTOSAR R25-11 standards",
} as const;

export function OfficialVehicleSoftwareIntelligenceMiddlewareMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialVehicleSoftwareIntelligenceMiddlewareExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialVehicleSoftwareIntelligenceMiddlewareEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
