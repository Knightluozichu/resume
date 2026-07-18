import { GameNetworkCoreEvidenceLab } from "./official-game-network-core-lab";

const nodes = [
  "发现与匹配",
  "建立会话",
  "交流和社交",
  "保存成绩",
  "更新与运营",
  "支付账本签发",
] as const;

export function Gnc06AuxiliarySystemsMapLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="第6章 网络游戏的辅助系统：完善游戏服务的必要机制"
      label="网络游戏核心技术与实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gnc06AuxiliarySystemsExperimentLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第6章 网络游戏的辅助系统：完善游戏服务的必要机制"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gnc06AuxiliarySystemsEvidenceLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="状态、成本与恢复证据"
      label="第6章 网络游戏的辅助系统：完善游戏服务的必要机制"
      nodes={nodes}
      mode="evidence"
    />
  );
}
