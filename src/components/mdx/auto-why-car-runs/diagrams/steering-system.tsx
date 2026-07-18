import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutoWhyCarRuns_SteeringSystem
const officialQualityProps = {
  title: "第 7 章：转向系统",
  stages: ["第7章 转向系统", "7.1 转向形式", "7.2 转向助力", "7.3 四轮转向"],
  sourceLabel: "机械工业出版社精装典藏第4版",
} as const;

export function OfficialAutoWhyCarRunsSteeringSystemMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutoWhyCarRunsSteeringSystemExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutoWhyCarRunsSteeringSystemEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
