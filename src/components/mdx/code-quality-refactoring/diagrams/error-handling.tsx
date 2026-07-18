import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_CodeQualityRefactoring_ErrorHandling
const officialQualityProps = {
  title: "错误处理",
  stages: [
    "错误处理",
    "痛点场景：错误处理淹没主逻辑",
    "解决方案：用异常分离正常与异常路径",
    "三种方式怎么选",
    "try-catch 最佳实践",
  ],
  sourceLabel: "Pearson Clean Code + Fowler Refactoring",
} as const;

export function OfficialCodeQualityRefactoringErrorHandlingMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialCodeQualityRefactoringErrorHandlingExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialCodeQualityRefactoringErrorHandlingEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
