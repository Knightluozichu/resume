import { GameNetworkCoreEvidenceLab } from "./official-game-network-core-lab";

const nodes = [
  "识别物理节点",
  "定义共享空间",
  "描述状态进展",
  "加入商业约束",
  "分配组织职责",
  "成本风险签发",
] as const;

export function Gnc02WhatIsOnlineGameMapLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="第2章 何为网络游戏：网络游戏面面观"
      label="网络游戏核心技术与实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gnc02WhatIsOnlineGameExperimentLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第2章 何为网络游戏：网络游戏面面观"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gnc02WhatIsOnlineGameEvidenceLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="状态、成本与恢复证据"
      label="第2章 何为网络游戏：网络游戏面面观"
      nodes={nodes}
      mode="evidence"
    />
  );
}
