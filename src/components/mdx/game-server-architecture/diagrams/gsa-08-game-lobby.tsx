import { GameServerArchitectureEvidenceLab } from "./official-game-server-architecture-lab";

const nodes = [
  "认证账户",
  "选择游戏区",
  "加载社交",
  "创建房间",
  "签发票据",
  "游戏服接管",
] as const;

export function Gsa08GameLobbyMapLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="第8章 游戏大厅"
      label="游戏服务器架构与优化"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gsa08GameLobbyExperimentLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="正常、边界、失败与恢复"
      label="第8章 游戏大厅"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gsa08GameLobbyEvidenceLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="所有权、容量与恢复证据"
      label="第8章 游戏大厅"
      nodes={nodes}
      mode="evidence"
    />
  );
}
