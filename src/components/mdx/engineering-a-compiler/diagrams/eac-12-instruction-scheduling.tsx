import { OfficialEngineeringCompilerLab } from "./official-engineering-compiler-lab";

const data = {
  title: "第12章 指令调度",
  label: "第12章 指令调度",
  color: "#b45309",
  soft: "#fef3c7",
  chain: [
    "构建依赖DAG",
    "标注延迟资源",
    "维护就绪集合",
    "执行优先级调度",
    "扩展跨块区域",
    "验证流水线周期",
  ],
  concepts: [
    "第12章 指令调度",
    "12.1 简介",
    "12.2 指令调度问题",
    "12.2.1 度量调度质量的其他方式",
    "12.2.2 是什么使调度这样难",
    "12.3 局部表调度",
    "12.3.1 算法",
    "12.3.2 调度具有可变延迟的操作",
    "12.3.3 扩展算法",
    "12.3.4 在表调度算法中打破平局",
    "12.3.5 前向表调度与后向表调度",
    "12.3.6 提高表调度的效率",
    "12.4 区域性调度",
    "12.4.1 调度扩展基本程序块",
    "12.4.2 跟踪调度",
    "12.4.3 通过复制构建适当的上下文环境",
    "12.5 高级主题",
    "12.5.1 软件流水线的策略",
    "12.5.2 用于实现软件流水线的算法",
    "12.6 小结和展望",
  ],
} as const;

export function Eac12InstructionSchedulingMapLab() {
  return <OfficialEngineeringCompilerLab {...data} view="map" />;
}

export function Eac12InstructionSchedulingExperimentLab() {
  return <OfficialEngineeringCompilerLab {...data} view="experiment" />;
}

export function Eac12InstructionSchedulingEvidenceLab() {
  return <OfficialEngineeringCompilerLab {...data} view="evidence" />;
}
