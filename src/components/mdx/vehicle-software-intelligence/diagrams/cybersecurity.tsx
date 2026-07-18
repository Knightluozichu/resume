import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_VehicleSoftwareIntelligence_Cybersecurity
const officialQualityProps = {
  title: "网络安全",
  stages: ["网络安全", "车载攻击面", "三道防线", "入侵检测", "小结与练习"],
  sourceLabel: "AUTOSAR R25-11 standards",
} as const;

export function OfficialVehicleSoftwareIntelligenceCybersecurityMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialVehicleSoftwareIntelligenceCybersecurityExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialVehicleSoftwareIntelligenceCybersecurityEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
