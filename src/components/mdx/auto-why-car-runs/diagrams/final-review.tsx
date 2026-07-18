import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutoWhyCarRuns_FinalReview
const officialQualityProps = {
  title: "全书总复习：汽车为什么会跑",
  stages: [
    "全书总复习：汽车为什么会跑",
    "总复习目标",
    "汽车构造全局知识地图",
    "完整动力链路",
    "燃油车",
  ],
  sourceLabel: "机械工业出版社精装典藏第4版",
} as const;

export function OfficialAutoWhyCarRunsFinalReviewMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutoWhyCarRunsFinalReviewExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutoWhyCarRunsFinalReviewEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
