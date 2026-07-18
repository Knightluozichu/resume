import { GameNetworkCoreEvidenceLab } from "./official-game-network-core-lab";

const nodes = [
  "量化响应预算",
  "选择物理拓扑",
  "分配状态权威",
  "确定同步方式",
  "处理环境竞争",
  "容量安全签发",
] as const;

export function Gnc03OnlineGameArchitectureMapLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="第3章 网络游戏的架构：挑战游戏的可玩性和技术限制"
      label="网络游戏核心技术与实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gnc03OnlineGameArchitectureExperimentLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第3章 网络游戏的架构：挑战游戏的可玩性和技术限制"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gnc03OnlineGameArchitectureEvidenceLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="状态、成本与恢复证据"
      label="第3章 网络游戏的架构：挑战游戏的可玩性和技术限制"
      nodes={nodes}
      mode="evidence"
    />
  );
}
