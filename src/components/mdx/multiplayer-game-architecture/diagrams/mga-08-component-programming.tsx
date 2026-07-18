import { MultiplayerArchitectureEvidenceLab } from "./official-multiplayer-architecture-lab";

const nodes = [
  "注册System依赖",
  "划分线程类别",
  "Awake池化对象",
  "提交主动销毁",
  "调度时间堆",
  "取消重入后签发",
] as const;

export function Mga08ComponentProgrammingMapLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="第8章 深入学习组件式编程"
      label="多人在线游戏架构实战：基于C++的分布式游戏编程"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Mga08ComponentProgrammingExperimentLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="正常、边界与失败样本"
      label="第8章 深入学习组件式编程"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Mga08ComponentProgrammingEvidenceLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="所有权、代际与恢复证据"
      label="第8章 深入学习组件式编程"
      nodes={nodes}
      mode="evidence"
    />
  );
}
