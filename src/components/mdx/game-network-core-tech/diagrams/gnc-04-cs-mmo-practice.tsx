import { GameNetworkCoreEvidenceLab } from "./official-game-network-core-lab";

const nodes = [
  "冻结策划约束",
  "估算并发成本",
  "选择分区方式",
  "定义协议数据库",
  "构建可玩原型",
  "自动压测签发",
] as const;

export function Gnc04CsMmoPracticeMapLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="第4章 [实践]C/S MMO游戏开发：长期运行的游戏服务器"
      label="网络游戏核心技术与实战"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gnc04CsMmoPracticeExperimentLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="正常、边界、失败与恢复样本"
      label="第4章 [实践]C/S MMO游戏开发：长期运行的游戏服务器"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gnc04CsMmoPracticeEvidenceLab() {
  return (
    <GameNetworkCoreEvidenceLab
      title="状态、成本与恢复证据"
      label="第4章 [实践]C/S MMO游戏开发：长期运行的游戏服务器"
      nodes={nodes}
      mode="evidence"
    />
  );
}
