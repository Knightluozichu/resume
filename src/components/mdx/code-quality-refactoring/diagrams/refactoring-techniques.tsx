import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_CodeQualityRefactoring_RefactoringTechniques
const officialQualityProps = {
  title: "重构手法",
  stages: [
    "重构手法",
    "痛点场景：大重构的翻车现场",
    "解决方案：安全重构四步",
    "四种常用手法",
    "1. 提取函数（Extract Function）",
  ],
  sourceLabel: "Pearson Clean Code + Fowler Refactoring",
} as const;

export function OfficialCodeQualityRefactoringRefactoringTechniquesMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialCodeQualityRefactoringRefactoringTechniquesExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialCodeQualityRefactoringRefactoringTechniquesEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
