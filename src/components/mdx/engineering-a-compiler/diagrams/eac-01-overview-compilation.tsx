import { OfficialEngineeringCompilerLab } from "./official-engineering-compiler-lab";

const data = {
  title: "第1章 编译概观",
  label: "第1章 编译概观",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "固定源程序",
    "检查前端IR",
    "运行优化器",
    "选择目标指令",
    "比较机器行为",
    "归档阶段证据",
  ],
  concepts: [
    "第一部分 编译器前端",
    "第1章 编译概观",
    "1.1 简介",
    "1.2 编译器结构",
    "1.3 转换概述",
    "1.3.1 前端",
    "1.3.2 优化器",
    "1.3.3 后端",
    "1.4 小结和展望",
  ],
} as const;

export function Eac01OverviewCompilationMapLab() {
  return <OfficialEngineeringCompilerLab {...data} view="map" />;
}

export function Eac01OverviewCompilationExperimentLab() {
  return <OfficialEngineeringCompilerLab {...data} view="experiment" />;
}

export function Eac01OverviewCompilationEvidenceLab() {
  return <OfficialEngineeringCompilerLab {...data} view="evidence" />;
}
