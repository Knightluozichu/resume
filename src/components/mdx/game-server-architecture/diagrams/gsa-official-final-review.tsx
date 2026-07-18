import { GameServerArchitectureEvidenceLab } from "./official-game-server-architecture-lab";

const nodes = [
  "认证连接",
  "选择大厅房间",
  "进入实时会话",
  "结算存储",
  "故障接管",
  "容量选型签发",
] as const;

export function GsaOfficialFinalReviewMapLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="《游戏服务器架构与优化》全书总复习"
      label="游戏服务器架构与优化"
      nodes={nodes}
      mode="map"
    />
  );
}

export function GsaOfficialFinalReviewExperimentLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="正常、边界、失败与恢复"
      label="《游戏服务器架构与优化》全书总复习"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function GsaOfficialFinalReviewEvidenceLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="所有权、容量与恢复证据"
      label="《游戏服务器架构与优化》全书总复习"
      nodes={nodes}
      mode="evidence"
    />
  );
}
