import { OfficialDragonCompilerLab } from "./official-dragon-compiler-lab";

const data = {
  title: "第10章 指令级并行性",
  label: "第10章 指令级并行性",
  color: "#0f766e",
  soft: "#ccfbf1",
  chain: [
    "冻结机器模型",
    "建立依赖图",
    "计算优先级",
    "安排发射周期",
    "检查资源冲突",
    "测量吞吐与压力",
  ],
  concepts: [
    "第10章 指令级并行性",
    "10.1 处理器体系结构",
    "10.1.1 指令流水线和分支延迟",
    "10.1.2 流水线化执行",
    "10.1.3 多指令发射",
    "10.2 代码调度约束",
    "10.2.1 数据依赖",
    "10.2.2 寻找内存访问之间的依赖",
    "10.2.3 寄存器使用和并行性之间的权衡",
    "10.2.4 寄存器分配和代码调度的阶段顺序",
    "10.2.5 控制依赖",
    "10.2.6 对推测执行的支持",
    "10.2.7 一个基本机器模型",
    "10.3 基本块调度",
    "10.3.1 数据依赖图",
    "10.3.2 基本块的列表调度",
    "10.3.3 带优先级的拓扑排序",
    "10.4 全局代码调度",
    "10.4.1 基本代码移动",
    "10.4.2 向上代码移动",
    "10.4.3 向下代码移动",
    "10.4.4 更新数据依赖",
    "10.4.5 全局调度算法",
    "10.4.6 高级代码移动技术",
    "10.4.7 和动态调度器的交互",
    "10.5 软件流水线",
    "10.5.1 引言",
    "10.5.2 循环的软件流水线",
    "10.5.3 寄存器分配和代码生成",
    "10.5.4 Do-Across循环",
    "10.5.5 软件流水线的目标和约束",
    "10.5.6 一个软件流水线算法",
    "10.5.7 无环数据依赖图的调度",
    "10.5.8 有环依赖图的调度",
    "10.5.9 流水线算法的改进",
    "10.5.10 模变量扩展",
    "10.5.11 条件语句",
    "10.5.12 对软件流水线的硬件支持",
  ],
} as const;

export function Dbc10InstructionLevelParallelismMapLab() {
  return <OfficialDragonCompilerLab {...data} view="map" />;
}

export function Dbc10InstructionLevelParallelismExperimentLab() {
  return <OfficialDragonCompilerLab {...data} view="experiment" />;
}

export function Dbc10InstructionLevelParallelismEvidenceLab() {
  return <OfficialDragonCompilerLab {...data} view="evidence" />;
}
