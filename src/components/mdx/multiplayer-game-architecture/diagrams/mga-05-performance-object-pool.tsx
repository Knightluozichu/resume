import { MultiplayerArchitectureEvidenceLab } from "./official-multiplayer-architecture-lab";

const nodes = [
  "固定性能基线",
  "采样CPU热点",
  "检查内存与泄漏",
  "判断池化对象",
  "实现重置和代际",
  "高水位回收后签发",
] as const;

export function Mga05PerformanceObjectPoolMapLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="第5章 性能优化与对象池"
      label="多人在线游戏架构实战：基于C++的分布式游戏编程"
      nodes={nodes}
      mode="map"
    />
  );
}
export function Mga05PerformanceObjectPoolExperimentLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="正常、边界与失败样本"
      label="第5章 性能优化与对象池"
      nodes={nodes}
      mode="experiment"
    />
  );
}
export function Mga05PerformanceObjectPoolEvidenceLab() {
  return (
    <MultiplayerArchitectureEvidenceLab
      title="所有权、代际与恢复证据"
      label="第5章 性能优化与对象池"
      nodes={nodes}
      mode="evidence"
    />
  );
}
