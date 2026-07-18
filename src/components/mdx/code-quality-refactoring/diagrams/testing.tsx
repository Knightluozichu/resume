import { OfficialCourseLab } from "../../official-course-lab";

// OFFICIAL_QUALITY_WRAPPER_CodeQualityRefactoring_Testing
const officialQualityProps = {
  title: "单元测试",
  stages: [
    "单元测试",
    "痛点场景：没有测试，改代码像拆炸弹",
    "解决方案：测试金字塔",
    "AAA 模式：一个测试的三段式",
    "TDD：红绿重构",
  ],
  sourceLabel: "Pearson Clean Code + Fowler Refactoring",
} as const;

export function OfficialCodeQualityRefactoringTestingMapLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="map" />;
}

export function OfficialCodeQualityRefactoringTestingExperimentLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="experiment" />;
}

export function OfficialCodeQualityRefactoringTestingEvidenceLab() {
  return <OfficialCourseLab {...officialQualityProps} mode="evidence" />;
}
