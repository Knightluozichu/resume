import { GameNetworkCoreEvidenceLab } from "./official-game-network-core-lab";

const nodes = [
  "锁定版本",
  "映射九章",
  "建立四层模型",
  "完成两类案例",
  "贯通运营设施",
  "团队交付签发",
] as const;

export function GncOfficialLearningMapMapLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="《网络游戏核心技术与实战》权威学习地图"
      label="网络游戏核心技术与实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function GncOfficialLearningMapExperimentLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="《网络游戏核心技术与实战》权威学习地图"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function GncOfficialLearningMapEvidenceLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="状态、成本与恢复证据"
      label="《网络游戏核心技术与实战》权威学习地图"
      nodes={nodes}
      mode="evidence"
    />
  );
}
