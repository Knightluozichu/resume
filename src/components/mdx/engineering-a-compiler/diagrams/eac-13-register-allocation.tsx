import { OfficialEngineeringCompilerLab } from "./official-engineering-compiler-lab";

const data = {
  title: "第13章 寄存器分配",
  label: "第13章 寄存器分配",
  color: "#1d4ed8",
  soft: "#dbeafe",
  chain: [
    "计算活跃信息",
    "形成活动范围",
    "估算逐出成本",
    "构建冲突图",
    "着色与合并",
    "插入逐出代码",
  ],
  concepts: [
    "第13章 寄存器分配",
    "13.1 简介",
    "13.2 背景问题",
    "13.2.1 内存与寄存器",
    "13.2.2 分配与指派",
    "13.2.3 寄存器类别",
    "13.3 局部寄存器分配和指派",
    "13.3.1 自顶向下的局部寄存器分配",
    "13.3.2 自底向上的局部寄存器分配",
    "13.3.3 超越单个程序块",
    "13.4 全局寄存器分配和指派",
    "13.4.1 找到全局活动范围",
    "13.4.2 估算全局逐出代价",
    "13.4.3 冲突和冲突图",
    "13.4.4 自顶向下着色",
    "13.4.5 自底向上着色",
    "13.4.6 合并副本以减小度数",
    "13.4.7 比较自顶向下和自底向上全局分配器",
    "13.4.8 将机器约束编码到冲突图中",
    "13.5 高级主题",
    "13.5.1 图着色寄存器分配方法的变体",
    "13.5.2 静态单赋值形式上的全局寄存器分配",
    "13.6 小结和展望",
  ],
} as const;

export function Eac13RegisterAllocationMapLab() {
  return <OfficialEngineeringCompilerLab {...data} view="map" />;
}

export function Eac13RegisterAllocationExperimentLab() {
  return <OfficialEngineeringCompilerLab {...data} view="experiment" />;
}

export function Eac13RegisterAllocationEvidenceLab() {
  return <OfficialEngineeringCompilerLab {...data} view="evidence" />;
}
