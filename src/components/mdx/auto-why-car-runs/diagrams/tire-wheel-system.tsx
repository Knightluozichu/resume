import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutoWhyCarRuns_TireWheelSystem
const officialQualityProps = {
  title: "第 10 章：车轮轮胎",
  stages: [
    "第10章 车轮轮胎",
    "10.1 轮胎造型",
    "10.2 轮胎构造",
    "10.3 轮胎性能",
  ],
  sourceLabel: "机械工业出版社精装典藏第4版",
} as const;

export function OfficialAutoWhyCarRunsTireWheelSystemMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutoWhyCarRunsTireWheelSystemExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutoWhyCarRunsTireWheelSystemEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
