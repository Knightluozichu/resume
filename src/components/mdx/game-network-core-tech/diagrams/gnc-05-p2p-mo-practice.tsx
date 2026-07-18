import { GameNetworkCoreEvidenceLab } from "./official-game-network-core-lab";

const nodes = [
  "确定对局权威",
  "定义共享值",
  "排序竞争操作",
  "估算扇出带宽",
  "尝试NAT遍历",
  "中继降级签发",
] as const;

export function Gnc05P2pMoPracticeMapLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="第5章 [实践]P2P MO游戏开发：没有专用服务器的动作类游戏的实现"
      label="网络游戏核心技术与实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gnc05P2pMoPracticeExperimentLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第5章 [实践]P2P MO游戏开发：没有专用服务器的动作类游戏的实现"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gnc05P2pMoPracticeEvidenceLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="状态、成本与恢复证据"
      label="第5章 [实践]P2P MO游戏开发：没有专用服务器的动作类游戏的实现"
      nodes={nodes}
      mode="evidence"
    />
  );
}
