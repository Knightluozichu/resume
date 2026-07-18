import { GameServerArchitectureEvidenceLab } from "./official-game-server-architecture-lab";

const nodes = [
  "分类状态",
  "选择路由键",
  "建立集群",
  "连接数据库",
  "租约调度",
  "故障接管",
] as const;

export function Gsa07ServerInteractionsMapLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="第7章 游戏服务器的交互"
      label="游戏服务器架构与优化"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gsa07ServerInteractionsExperimentLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="正常、边界、失败与恢复"
      label="第7章 游戏服务器的交互"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gsa07ServerInteractionsEvidenceLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="所有权、容量与恢复证据"
      label="第7章 游戏服务器的交互"
      nodes={nodes}
      mode="evidence"
    />
  );
}
