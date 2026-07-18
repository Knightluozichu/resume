import { GameNetworkCoreEvidenceLab } from "./official-game-network-core-lab";

const nodes = [
  "计算机诞生",
  "电子游戏出现",
  "局域网对战",
  "互联网商业化",
  "网页平台扩张",
  "移动生态重组",
] as const;

export function Gnc01HistoryEvolutionMapLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="第1章 网络游戏的历史和演化：游戏进入了网络世界"
      label="网络游戏核心技术与实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gnc01HistoryEvolutionExperimentLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第1章 网络游戏的历史和演化：游戏进入了网络世界"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gnc01HistoryEvolutionEvidenceLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="状态、成本与恢复证据"
      label="第1章 网络游戏的历史和演化：游戏进入了网络世界"
      nodes={nodes}
      mode="evidence"
    />
  );
}
