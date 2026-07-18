import { GameServerArchitectureEvidenceLab } from "./official-game-server-architecture-lab";

const nodes = [
  "识别玩法频率",
  "选择连接模型",
  "确定权威状态",
  "划分地图区域",
  "迁移实体",
  "边界重放",
] as const;

export function Gsa06GameServerFoundationsMapLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="第6章 游戏服务器初探"
      label="游戏服务器架构与优化"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gsa06GameServerFoundationsExperimentLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="正常、边界、失败与恢复"
      label="第6章 游戏服务器初探"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gsa06GameServerFoundationsEvidenceLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="所有权、容量与恢复证据"
      label="第6章 游戏服务器初探"
      nodes={nodes}
      mode="evidence"
    />
  );
}
