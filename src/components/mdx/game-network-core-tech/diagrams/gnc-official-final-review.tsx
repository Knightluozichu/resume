import { GameNetworkCoreEvidenceLab } from "./official-game-network-core-lab";

const nodes = [
  "复现网络循环",
  "比较物理逻辑架构",
  "跑通K Online",
  "跑通J Multiplayer",
  "注入运营故障",
  "团队接管签发",
] as const;

export function GncOfficialFinalReviewMapLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="《网络游戏核心技术与实战》全书总复习"
      label="网络游戏核心技术与实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function GncOfficialFinalReviewExperimentLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="《网络游戏核心技术与实战》全书总复习"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function GncOfficialFinalReviewEvidenceLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="状态、成本与恢复证据"
      label="《网络游戏核心技术与实战》全书总复习"
      nodes={nodes}
      mode="evidence"
    />
  );
}
