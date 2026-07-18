import { OfficialEngineeringCompilerLab } from "./official-engineering-compiler-lab";

const data = {
  title: "第8章 优化简介",
  label: "第8章 优化简介",
  color: "#1d4ed8",
  soft: "#dbeafe",
  chain: [
    "定义可观察语义",
    "选定优化范围",
    "分析候选",
    "应用变换",
    "验证等价性",
    "测量成本收益",
  ],
  concepts: [
    "第三部分 代码优化",
    "第8章 优化简介",
    "8.1 简介",
    "8.2 背景",
    "8.2.1 例子",
    "8.2.2 对优化的考虑",
    "8.2.3 优化的时机",
    "8.3 优化的范围",
    "8.4 局部优化",
    "8.4.1 局部值编号",
    "8.4.2 树高平衡",
    "8.5 区域优化",
    "8.5.1 超局部值编号",
    "8.5.2 循环展开",
    "8.6 全局优化",
    "8.6.1 利用活动信息查找未初始化变量",
    "8.6.2 全局代码置放",
    "8.7 过程间优化",
    "8.7.1 内联替换",
    "8.7.2 过程置放",
    "8.7.3 针对过程间优化的编译器组织结构",
    "8.8 小结和展望",
  ],
} as const;

export function Eac08IntroductionOptimizationMapLab() {
  return <OfficialEngineeringCompilerLab {...data} view="map" />;
}

export function Eac08IntroductionOptimizationExperimentLab() {
  return <OfficialEngineeringCompilerLab {...data} view="experiment" />;
}

export function Eac08IntroductionOptimizationEvidenceLab() {
  return <OfficialEngineeringCompilerLab {...data} view="evidence" />;
}
