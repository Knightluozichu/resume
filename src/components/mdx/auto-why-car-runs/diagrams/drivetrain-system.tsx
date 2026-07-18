import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutoWhyCarRuns_DrivetrainSystem
const officialQualityProps = {
  title: "第 5 章：传动系统",
  stages: [
    "第5章 传动系统",
    "5.1 传动形式",
    "5.2 离合器",
    "5.3 传动轴和半轴",
    "5.4 差速器",
  ],
  sourceLabel: "机械工业出版社精装典藏第4版",
} as const;

export function OfficialAutoWhyCarRunsDrivetrainSystemMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutoWhyCarRunsDrivetrainSystemExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutoWhyCarRunsDrivetrainSystemEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
