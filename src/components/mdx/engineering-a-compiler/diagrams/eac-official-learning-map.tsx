import { OfficialEngineeringCompilerLab } from "./official-engineering-compiler-lab";

const data = {
  title: "《编译器设计（第2版）》权威学习地图",
  label: "权威目录学习地图",
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
    "第二部分 从源码映射到IR",
    "第三部分 代码优化",
    "第四部分 编译器后端",
    "第1章 编译概观",
    "第2章 词法分析器",
    "第3章 语法分析器",
    "第4章 上下文相关分析",
    "第5章 中间表示",
    "第6章 过程抽象",
    "第7章 代码形式",
    "第8章 优化简介",
    "第9章 数据流分析",
    "第10章 标量优化",
    "第11章 指令选择",
    "第12章 指令调度",
    "第13章 寄存器分配",
    "附录A ILOC",
    "附录B 数据结构",
    "附录中的ILOC与数据结构",
  ],
} as const;

export function EacOfficialLearningMapMapLab() {
  return <OfficialEngineeringCompilerLab {...data} view="map" />;
}

export function EacOfficialLearningMapExperimentLab() {
  return <OfficialEngineeringCompilerLab {...data} view="experiment" />;
}

export function EacOfficialLearningMapEvidenceLab() {
  return <OfficialEngineeringCompilerLab {...data} view="evidence" />;
}
