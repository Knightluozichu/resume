import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "定义训练目标",
  "绘制物理部署",
  "创建授权任务",
  "绑定分队与学员",
  "启动仿真实例",
  "收集结果并签发",
] as const;

export function Ucn06SimulationArchitectureMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第6章 虚拟仿真训练系统的架构和模块"
      label="第2篇 Unity实战（客户端）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn06SimulationArchitectureExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第6章 虚拟仿真训练系统的架构和模块"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn06SimulationArchitectureEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第6章 虚拟仿真训练系统的架构和模块"
      nodes={nodes}
      mode="evidence"
    />
  );
}
