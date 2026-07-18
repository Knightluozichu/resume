import { GameServerArchitectureEvidenceLab } from "./official-game-server-architecture-lab";

const nodes = [
  "划分状态键",
  "签发分区代际",
  "消费事件",
  "幂等应用",
  "保存检查点",
  "故障再平衡",
] as const;

export function Gsa12DistributedServersMapLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="第12章 分布式服务器"
      label="游戏服务器架构与优化"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gsa12DistributedServersExperimentLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="正常、边界、失败与恢复"
      label="第12章 分布式服务器"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gsa12DistributedServersEvidenceLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="所有权、容量与恢复证据"
      label="第12章 分布式服务器"
      nodes={nodes}
      mode="evidence"
    />
  );
}
