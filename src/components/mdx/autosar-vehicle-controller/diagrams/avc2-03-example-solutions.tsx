import { OfficialAvc2BookLab } from "./official-avc2-book-lab";

const props = {
  unitId: "avc2-03-example-solutions",
  title: "第3章：本书示例及AUTOSAR系统解决方案介绍",
  nodes: ["需求基线", "总体方案", "系统设计", "AUTOSAR架构", "工具方案"],
  focuses: ["开发需求", "方案边界", "系统接口", "架构映射", "ETAS工具链"],
} as const;

export function Avc203ExampleSolutionsArchitectureLab() {
  return <OfficialAvc2BookLab {...props} mode="architecture" />;
}

export function Avc203ExampleSolutionsConfigurationLab() {
  return <OfficialAvc2BookLab {...props} mode="configuration" />;
}

export function Avc203ExampleSolutionsEvidenceLab() {
  return <OfficialAvc2BookLab {...props} mode="evidence" />;
}
