import { OfficialEngineeringCompilerLab } from "./official-engineering-compiler-lab";

const data = {
  title: "第9章 数据流分析",
  label: "第9章 数据流分析",
  color: "#be123c",
  soft: "#ffe4e6",
  chain: [
    "建立CFG",
    "定义格与方向",
    "实现传递函数",
    "迭代到不动点",
    "构造SSA",
    "检查过程间摘要",
  ],
  concepts: [
    "第9章 数据流分析",
    "9.1 简介",
    "9.2 迭代数据流分析",
    "9.2.1 支配性",
    "9.2.2 活动变量分析",
    "9.2.3 数据流分析的局限性",
    "9.2.4 其他数据流问题",
    "9.3 静态单赋值形式",
    "9.3.1 构造静态单赋值形式的简单方法",
    "9.3.2 支配边界",
    "9.3.3 放置φ函数",
    "9.3.4 重命名",
    "9.3.5 从静态单赋值形式到其他形式的转换",
    "9.3.6 使用静态单赋值形式",
    "9.4 过程间分析",
    "9.4.1 构建调用图",
    "9.4.2 过程间常量传播",
    "9.5 高级主题",
    "9.5.1 结构性数据流算法和可归约性",
    "9.5.2 加速计算支配性的迭代框架算法",
    "9.6 小结和展望",
  ],
} as const;

export function Eac09DataFlowAnalysisMapLab() {
  return <OfficialEngineeringCompilerLab {...data} view="map" />;
}

export function Eac09DataFlowAnalysisExperimentLab() {
  return <OfficialEngineeringCompilerLab {...data} view="experiment" />;
}

export function Eac09DataFlowAnalysisEvidenceLab() {
  return <OfficialEngineeringCompilerLab {...data} view="evidence" />;
}
