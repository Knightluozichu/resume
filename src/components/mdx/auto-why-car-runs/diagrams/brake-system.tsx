import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutoWhyCarRuns_BrakeSystem
const officialQualityProps = {
  title: "第 8 章：制动系统",
  stages: [
    "第8章 制动系统",
    "8.1 制动系统形式",
    "8.2 驻车制动",
    "8.3 陶瓷复合制动盘",
    "8.4 制动助力器",
  ],
  sourceLabel: "机械工业出版社精装典藏第4版",
} as const;

export function OfficialAutoWhyCarRunsBrakeSystemMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutoWhyCarRunsBrakeSystemExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutoWhyCarRunsBrakeSystemEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
