import { GameServerArchitectureEvidenceLab } from "./official-game-server-architecture-lab";

const nodes = [
  "定义事实源",
  "匹配访问模式",
  "写入内存",
  "持久化复制",
  "备份校验",
  "恢复签发",
] as const;

export function Gsa04BasicStorageMapLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="第4章 基础内容存储"
      label="游戏服务器架构与优化"
      nodes={nodes}
      mode="map"
    />
  );
}

export function Gsa04BasicStorageExperimentLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="正常、边界、失败与恢复"
      label="第4章 基础内容存储"
      nodes={nodes}
      mode="experiment"
    />
  );
}

export function Gsa04BasicStorageEvidenceLab() {
  return (
    <GameServerArchitectureEvidenceLab
      title="所有权、容量与恢复证据"
      label="第4章 基础内容存储"
      nodes={nodes}
      mode="evidence"
    />
  );
}
