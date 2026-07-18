import { GameServerArchitectureEvidenceLab } from "./official-game-server-architecture-lab";

const nodes = [
  "定义SLO",
  "测单机曲线",
  "加入心跳",
  "校验漂移",
  "故障拉起",
  "容量留余",
] as const;

export function Gsa11CapacityClientOptimizationMapLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="第11章 服务器承载量和客户端优化方案"
      label="游戏服务器架构与优化"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gsa11CapacityClientOptimizationExperimentLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="正常、边界、失败与恢复"
      label="第11章 服务器承载量和客户端优化方案"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gsa11CapacityClientOptimizationEvidenceLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="所有权、容量与恢复证据"
      label="第11章 服务器承载量和客户端优化方案"
      nodes={nodes}
      mode="evidence"
    />
  );
}
