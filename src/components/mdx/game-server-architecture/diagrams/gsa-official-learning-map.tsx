import { GameServerArchitectureEvidenceLab } from "./official-game-server-architecture-lab";

const nodes = [
  "核准书目",
  "建立网络入口",
  "固定存储事实",
  "演进游戏拓扑",
  "签发实时容量",
  "完成语言选型",
] as const;

export function GsaOfficialLearningMapMapLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="《游戏服务器架构与优化》权威学习地图"
      label="游戏服务器架构与优化"
      nodes={nodes}
      mode="map"
    />
  );
}

export function GsaOfficialLearningMapExperimentLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="正常、边界、失败与恢复"
      label="《游戏服务器架构与优化》权威学习地图"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function GsaOfficialLearningMapEvidenceLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="所有权、容量与恢复证据"
      label="《游戏服务器架构与优化》权威学习地图"
      nodes={nodes}
      mode="evidence"
    />
  );
}
