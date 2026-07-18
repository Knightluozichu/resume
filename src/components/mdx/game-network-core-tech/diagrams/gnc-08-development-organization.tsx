import { GameNetworkCoreEvidenceLab } from "./official-game-network-core-lab";

const nodes = [
  "冻结策划边界",
  "拆分系统责任",
  "定义完成标准",
  "交付可玩增量",
  "演练维护升级",
  "文档移交签发",
] as const;

export function Gnc08DevelopmentOrganizationMapLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="第8章 网络游戏的开发体制：团队管理的挑战"
      label="网络游戏核心技术与实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gnc08DevelopmentOrganizationExperimentLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第8章 网络游戏的开发体制：团队管理的挑战"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gnc08DevelopmentOrganizationEvidenceLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="状态、成本与恢复证据"
      label="第8章 网络游戏的开发体制：团队管理的挑战"
      nodes={nodes}
      mode="evidence"
    />
  );
}
