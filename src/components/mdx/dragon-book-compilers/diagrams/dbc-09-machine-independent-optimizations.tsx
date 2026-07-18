import { OfficialDragonCompilerLab } from "./official-dragon-compiler-lab";

const data = {
  title: "第9章 机器无关优化",
  label: "第9章 机器无关优化",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "建立CFG",
    "定义数据流值",
    "迭代到不动点",
    "验证安全条件",
    "执行代码变换",
    "差分运行行为",
  ],
  concepts: [
    "第9章 机器无关优化",
    "9.1 优化的主要来源",
    "9.1.1 冗余的原因",
    "9.1.2 贯穿全章的例子：快速排序",
    "9.1.3 保持语义的变换",
    "9.1.4 全局公共子表达式",
    "9.1.5 复制传播",
    "9.1.6 死代码消除",
    "9.1.7 代码移动",
    "9.1.8 归纳变量和强度削弱",
    "9.2 数据流分析简介",
    "9.2.1 数据流抽象",
    "9.2.2 数据流分析模式",
    "9.2.3 基本块上的数据流模式",
    "9.2.4 到达定义",
    "9.2.5 活跃变量分析",
    "9.2.6 可用表达式",
    "9.2.7 本节总结",
    "9.3 数据流分析基础",
    "9.3.1 半格",
    "9.3.2 转移函数",
    "9.3.3 通用框架的迭代算法",
    "9.3.4 数据流解的含义",
    "9.4 常量传播",
    "9.4.1 常量传播框架的数据流值",
    "9.4.2 常量传播框架的交汇运算",
    "9.4.3 常量传播框架的转移函数",
    "9.4.4 常量传播框架的单调性",
    "9.4.5 常量传播框架的非分配性",
    "9.4.6 结果的解释",
    "9.5 部分冗余消除",
    "9.5.1 冗余的来源",
    "9.5.2 是否可以消除所有冗余",
    "9.5.3 惰性代码移动问题",
    "9.5.4 表达式的预期执行",
    "9.5.5 惰性代码移动算法",
    "9.6 流图中的循环",
    "9.6.1 支配结点",
    "9.6.2 深度优先排序",
    "9.6.3 深度优先生成树中的边",
    "9.6.4 回边和可归约性",
    "9.6.5 流图的深度",
    "9.6.6 自然循环",
    "9.6.7 迭代数据流算法的收敛速度",
    "9.7 基于区域的分析",
    "9.7.1 区域",
    "9.7.2 可归约流图的区域层次结构",
    "9.7.3 基于区域分析的概述",
    "9.7.4 对转移函数的必要假设",
    "9.7.5 基于区域的分析算法",
    "9.7.6 处理不可归约流图",
    "9.8 符号分析",
    "9.8.1 引用变量的仿射表达式",
    "9.8.2 数据流问题的形式化",
    "9.8.3 基于区域的符号分析",
  ],
} as const;

export function Dbc09MachineIndependentOptimizationsMapLab() {
  return <OfficialDragonCompilerLab {...data} view="map" />;
}

export function Dbc09MachineIndependentOptimizationsExperimentLab() {
  return <OfficialDragonCompilerLab {...data} view="experiment" />;
}

export function Dbc09MachineIndependentOptimizationsEvidenceLab() {
  return <OfficialDragonCompilerLab {...data} view="evidence" />;
}
