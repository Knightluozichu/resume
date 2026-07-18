import { GameServerArchitectureEvidenceLab } from "./official-game-server-architecture-lab";

const nodes = [
  "加载赛季",
  "匹配对局",
  "签发结果",
  "更新评分",
  "记经济账",
  "热更验收",
] as const;

export function Gsa10LadderEconomyMapLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="第10章 天梯和经济系统"
      label="游戏服务器架构与优化"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gsa10LadderEconomyExperimentLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="正常、边界、失败与恢复"
      label="第10章 天梯和经济系统"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gsa10LadderEconomyEvidenceLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="所有权、容量与恢复证据"
      label="第10章 天梯和经济系统"
      nodes={nodes}
      mode="evidence"
    />
  );
}
