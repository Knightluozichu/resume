import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_AutoWhyCarRuns_LearningMap
const officialQualityProps = {
  title: "汽车为什么会跑：全书学习地图",
  stages: [
    "汽车为什么会跑：全书学习地图",
    "材料状态",
    "一条主线",
    "四个问题",
    "入门边界",
  ],
  sourceLabel: "机械工业出版社精装典藏第4版",
} as const;

export function OfficialAutoWhyCarRunsLearningMapMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialAutoWhyCarRunsLearningMapExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialAutoWhyCarRunsLearningMapEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
