import { UnityCppEvidenceLab } from "./official-unity-cpp-evidence-lab";

const nodes = [
  "创建空工程",
  "挂载首个脚本",
  "编译并读取日志",
  "进入训练场",
  "切换人物与车辆",
  "完成任务并回放",
] as const;

export function Ucn02HelloSimulationMapLab() {
  return (
    <UnityCppEvidenceLab
      title="第2章 编写Hello World与仿真系统体验"
      label="第1篇 Unity基础（客户端）"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Ucn02HelloSimulationExperimentLab() {
  return (
    <UnityCppEvidenceLab
      title="正常、边界与失败样本"
      label="第2章 编写Hello World与仿真系统体验"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Ucn02HelloSimulationEvidenceLab() {
  return (
    <UnityCppEvidenceLab
      title="所有权、代际与恢复证据"
      label="第2章 编写Hello World与仿真系统体验"
      nodes={nodes}
      mode="evidence"
    />
  );
}
