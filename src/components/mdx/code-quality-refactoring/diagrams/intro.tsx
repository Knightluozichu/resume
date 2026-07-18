import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_CodeQualityRefactoring_Intro
const officialQualityProps = {
  title: "整洁代码的意义",
  stages: [
    "整洁代码的意义",
    "痛点场景：烂代码长什么样",
    "解决方案：童子军规则",
    "常见误区",
    "误区 1：「能跑就行」",
  ],
  sourceLabel: "Pearson Clean Code + Fowler Refactoring",
} as const;

export function OfficialCodeQualityRefactoringIntroMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialCodeQualityRefactoringIntroExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialCodeQualityRefactoringIntroEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
